#!/usr/bin/env node
// Tests for the opt-in translate_events feature, run in CI on every push/PR.
// Not a build step and not a test framework: this project intentionally ships
// package-tracker-card.js as-is, straight to the browser, no bundler and no
// dependencies involved, so this is plain node with its own three-line
// check() and a hand-written DOM shim.
//
// The card can't be require()'d directly (its classes extend HTMLElement at
// module scope, evaluated immediately even outside a browser), so the whole
// file is evaluated in a vm context with just enough browser stubbed out --
// the same "eval the real file rather than a copy of it" approach
// check-translations.js already takes for TRANSLATIONS. The alternative,
// slicing out the functions under test by line number or marker comment,
// silently rots the moment anything above them moves.
//
// What's actually being pinned down here, and why it needs a test at all:
//
// - line1Translatable. Machine translation may only ever touch the carrier's
//   own untranslated sentence; anything built from TRANSLATIONS is already in
//   the UI language and would be garbled by a round trip through Google. The
//   flag is set independently in two mappers over two unrelated payload
//   shapes, and a third mapper deliberately never sets it, so all three are
//   covered here.
// - What leaves the browser, and when. The feature is opt-in and sends
//   carrier text to a third party, so the conditions under which a request
//   happens at all are a documented promise (translate_events_desc), not an
//   implementation detail: nothing while the switch is off, nothing for
//   already-localized text, and -- the easy one to misread -- text does go
//   out for a collapsed row, because expanding only toggles a CSS class.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const filePath = path.join(__dirname, '..', 'package-tracker-card.js');
const src = fs.readFileSync(filePath, 'utf8');

// ─── Minimal DOM shim ─────────────────────────────────────────────────────────
// Only what mk/mkIcon/renderRow actually touch. Elements keep their children
// so a rendered row can be walked afterwards to read the text that ended up
// on screen (find(), below) -- that's what the renderRow tests assert on.
function makeDocument() {
  class El {
    constructor(tag) {
      this.tagName = tag; this.children = []; this.className = '';
      this._text = ''; this.attrs = {}; this.dataset = {};
      this.style = { cssText: '', color: '', setProperty() {} };
      this.classList = {
        _s: new Set(),
        add(c) { this._s.add(c); },
        remove(c) { this._s.delete(c); },
        contains(c) { return this._s.has(c); },
        toggle(c) { this._s.has(c) ? this._s.delete(c) : this._s.add(c); return this._s.has(c); },
      };
    }
    get textContent() { return this._text; }
    set textContent(v) { this._text = v; this.children = []; }
    appendChild(c) { this.children.push(c); return c; }
    remove() {}
    setAttribute(k, v) { this.attrs[k] = v; }
    getAttribute(k) { return this.attrs[k]; }
    addEventListener() {}
    querySelector() { return null; }
    // Depth-first collect of every descendant carrying a given class name.
    find(cls, out = []) {
      if (String(this.className).split(' ').includes(cls)) out.push(this);
      for (const c of this.children) if (c.find) c.find(cls, out);
      return out;
    }
  }
  return {
    createElement: (t) => new El(t),
    createTextNode: (t) => { const e = new El('#text'); e._text = t; return e; },
    addEventListener() {},
  };
}

// A fresh context per test: translateCache and translateInFlight live at
// module scope, so tests would otherwise leak cache hits into each other and
// pass for the wrong reason.
function loadCard(fetchImpl) {
  const document = makeDocument();
  const store = {};
  const sandbox = {
    document,
    HTMLElement: class { attachShadow() { return document.createElement('div'); } },
    customElements: { get: () => null, define() {} },
    window: { customCards: [], open() {} },
    navigator: {},
    localStorage: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = v; },
    },
    fetch: fetchImpl,
    AbortController: class { constructor() { this.signal = {}; } abort() {} },
    setTimeout, clearTimeout, console,
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(src + `
;globalThis.__api = { resolveCanonicalDeliverySlot, mapCanonicalParcel, mapPostnlLetter,
                      mkItem, renderRow, resolveTr, INTEGRATIONS };`, sandbox);
  return {
    api: sandbox.__api,
    cachedKeys: () => Object.keys(JSON.parse(store['package-tracker-card-translate-cache'] || '{}')).length,
  };
}

// ─── Fake endpoints ───────────────────────────────────────────────────────────
// Shaped like the real response: [[[chunk, ...], ...], null, detectedLang].
// Each input line comes back prefixed 'CS:', with the '\n' separators kept at
// the boundaries they arrived on -- except where a mock deliberately drops one.
function okResponse(outLines) {
  return {
    ok: true,
    json: () => Promise.resolve([
      outLines.map((l, i) => [l + (i < outLines.length - 1 ? '\n' : ''), '', null, null]),
      null, 'en',
    ]),
  };
}

function readQ(url) {
  return decodeURIComponent(new URL(url).searchParams.get('q'));
}

// ─── Tiny assertion harness ───────────────────────────────────────────────────
let failures = 0;
let currentCase = '';
function testCase(name) { currentCase = name; console.log('\n' + name); }
function check(what, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) failures++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${what}: ${JSON.stringify(got)}${ok ? '' : ` (expected ${JSON.stringify(want)})`}`);
}

// Translation results land in a .then() chain, so every assertion has to wait
// for the microtask queue plus the (mocked, immediate) fetches to drain.
function settle() {
  return new Promise((resolve) => setTimeout(resolve, 50));
}

async function main() {
  // ── line1Translatable ─────────────────────────────────────────────────────
  // Only the carrier's own sentence may be translated. Everything built from
  // TRANSLATIONS (canonicalParcelStatusLine, formatDeliveredText, the slot
  // phrasings) is already in the UI language.
  testCase('line1Translatable: canonical parcel family');
  {
    const { api } = loadCard(() => Promise.reject(new Error('unused')));
    const tr = api.resolveTr('cs');
    const flag = (p) => api.resolveCanonicalDeliverySlot(p, tr).line1Translatable;
    check('raw sentence', flag({ status: 'in_transit', raw_status: 'Parcel is on its way' }), true);
    check('machine-code raw_status', flag({ status: 'in_transit', raw_status: 'IN_TRANSIT' }), false);
    check('no raw_status at all', flag({ status: 'in_transit' }), false);
    check('delivered (our own phrasing wins)',
      flag({ status: 'delivered', raw_status: 'Parcel handed over', delivered_at: '2026-08-20T10:00:00' }), false);
    check('delivery slot keeps the raw sentence',
      flag({ status: 'out_for_delivery', raw_status: 'Courier is on the way',
             planned_from: '2026-08-23T10:00:00', planned_to: '2026-08-23T12:00:00' }), true);
    check('delivery slot with machine-code raw_status',
      flag({ status: 'out_for_delivery', raw_status: 'OUT_FOR_DELIVERY', planned_from: '2026-08-23T10:00:00' }), false);
    check('unparsable planned_from falls through to the status line',
      flag({ status: 'in_transit', raw_status: 'Parcel is on its way', planned_from: 'nonsense' }), true);
    check('mkItem default', api.mkItem({}).line1Translatable, false);
  }

  // The `parcel` integration (Česká pošta, Packeta, ...) has no raw_status at
  // all and builds line1 from the newest event's own text, so it sets the same
  // flag from a completely different payload shape. Both mappers are covered
  // because neither can answer the question for the other.
  testCase('line1Translatable: parcel integration');
  {
    const { api } = loadCard(() => Promise.reject(new Error('unused')));
    const tr = api.resolveTr('cs');
    const map = (o) => api.INTEGRATIONS.parcel._map(o, tr);

    const inTransit = map({
      description: 'Balík', carrier_code: 'ceska', status_code: 2, tracking_number: 'CZ9',
      events: [{ date: '2026-08-22T09:00:00', event: 'Consignment is on its way to the delivery depot' }],
    });
    check('line1 is the carrier sentence', inTransit.line1, 'Consignment is on its way to the delivery depot.');
    check('flagged translatable', inTransit.line1Translatable, true);

    check('delivered (our own phrasing wins)', map({
      description: 'Balík', carrier_code: 'ceska', status_code: 0, tracking_number: 'CZ8',
      events: [{ date: '2026-08-20T09:00:00', event: 'Delivered to the addressee' }],
    }).line1Translatable, false);

    check('no events, nothing to translate', map({
      description: 'Balík', carrier_code: 'ceska', status_code: 2, tracking_number: 'CZ7', events: [],
    }).line1Translatable, false);

    const slot = map({
      description: 'Balík', carrier_code: 'ceska', status_code: 2, tracking_number: 'CZ6',
      timestamp_expected: '2099-08-23T10:00:00', timestamp_expected_end: '2099-08-23T12:00:00',
      events: [{ date: '2026-08-22T09:00:00', event: 'Out for delivery' }],
    });
    check('delivery slot keeps the carrier sentence', slot.line1, 'Out for delivery.');
    check('flagged translatable', slot.line1Translatable, true);
  }

  // The third line1 builder. Its line1 is always built from `tr`, so the
  // mkItem default is the right answer -- asserted so that a letter growing a
  // free-form carrier sentence later can't quietly start leaking it to Google.
  testCase('line1Translatable: PostNL letters never set the flag');
  {
    const { api } = loadCard(() => Promise.reject(new Error('unused')));
    const tr = api.resolveTr('cs');
    const letter = api.mapPostnlLetter({ id: 'L1', date: '2026-08-22', title: '22 augustus' }, tr, new Map());
    check('flag stays false', letter.line1Translatable, false);
  }

  // ── renderRow ─────────────────────────────────────────────────────────────
  // line1 is handed to translateEventTexts after the timeline batch, so when
  // it repeats the newest event's sentence (the common case) it attaches to
  // that in-flight request rather than firing a second one.
  testCase('renderRow: main line shares the timeline request');
  {
    let requests = [];
    const { api, cachedKeys } = loadCard((url) => {
      const q = readQ(url);
      requests.push(q.split('\n').length);
      return Promise.resolve(okResponse(q.split('\n').map((l) => 'CS:' + l)));
    });
    const tr = api.resolveTr('cs');
    const item = api.mapCanonicalParcel({
      status: 'in_transit', raw_status: 'Parcel arrived at the depot', barcode: 'CZ1',
      history: [
        { status: 'registered', raw_status: 'Shipment data received', timestamp: '2026-08-21T08:00:00' },
        { status: 'in_transit', raw_status: 'Parcel arrived at the depot', timestamp: '2026-08-22T09:00:00' },
      ],
    }, tr, { carrierGroup: 'dpd', carrierCode: 'dpd' });
    check('item.line1Translatable', item.line1Translatable, true);

    const show = { status: true, translate_events: true, badge: false, location: false, carrier: false };
    const hass = { language: 'cs' };
    const row = api.renderRow(item, show, tr, new Set(['CZ1']), hass);
    await settle();

    check('main line translated', row.find('line1')[0].textContent, 'CS:Parcel arrived at the depot.');
    check('timeline translated', row.find('event-text').map((e) => e.textContent),
      ['CS:Parcel arrived at the depot.', 'CS:Shipment data received.']);
    check('one request for main line + timeline together', requests.length, 1);
    check('entries cached', cachedKeys(), 2);

    const before = requests.length;
    const row2 = api.renderRow(item, show, tr, new Set(['CZ1']), hass);
    await settle();
    check('re-render adds no request', requests.length, before);
    check('re-render served from cache', row2.find('line1')[0].textContent, 'CS:Parcel arrived at the depot.');
  }

  // Privacy-relevant and easy to get wrong when reading the code: the detail
  // box (and with it the event batch) is built whenever the row has events,
  // and expanding only toggles a CSS class. Text therefore goes to the
  // endpoint as soon as the card renders, with the timeline still collapsed.
  // translate_events_desc says exactly that in all three locales, so this
  // pins the behaviour that claim describes.
  testCase('translation is eager: a collapsed row still sends its text');
  {
    let sent = [];
    const { api } = loadCard((url) => {
      sent.push(readQ(url).split('\n'));
      return Promise.resolve(okResponse(readQ(url).split('\n').map((l) => 'CS:' + l)));
    });
    const tr = api.resolveTr('cs');
    const item = api.mapCanonicalParcel({
      status: 'in_transit', raw_status: 'Parcel arrived at the depot', barcode: 'CZ4',
      history: [
        { status: 'registered', raw_status: 'Shipment data received', timestamp: '2026-08-21T08:00:00' },
        { status: 'in_transit', raw_status: 'Parcel arrived at the depot', timestamp: '2026-08-22T09:00:00' },
      ],
    }, tr, { carrierGroup: 'dpd', carrierCode: 'dpd' });
    // Empty openItems: nothing is expanded.
    const row = api.renderRow(item, { status: true, translate_events: true }, tr, new Set(), { language: 'cs' });
    await settle();
    check('text sent while collapsed', sent, [['Parcel arrived at the depot.', 'Shipment data received.']]);
    check('main line translated anyway', row.find('line1')[0].textContent, 'CS:Parcel arrived at the depot.');
  }

  // The switch is opt-in and off by default; nothing may leave the browser
  // until it's turned on.
  testCase('renderRow: nothing is sent while translate_events is off');
  {
    let requests = 0;
    const { api } = loadCard(() => { requests++; return Promise.reject(new Error('should not be called')); });
    const tr = api.resolveTr('cs');
    const item = api.mapCanonicalParcel({
      status: 'in_transit', raw_status: 'Parcel arrived at the depot', barcode: 'CZ2',
      history: [{ status: 'in_transit', raw_status: 'Parcel arrived at the depot', timestamp: '2026-08-22T09:00:00' }],
    }, tr, { carrierGroup: 'dpd', carrierCode: 'dpd' });
    const row = api.renderRow(item, { status: true, translate_events: false }, tr, new Set(['CZ2']), { language: 'cs' });
    await settle();
    check('requests sent', requests, 0);
    check('main line left untouched', row.find('line1')[0].textContent, 'Parcel arrived at the depot.');
  }

  // Text already built from TRANSLATIONS must never be offered for
  // translation, in the timeline or on the main line -- a round trip through
  // Google would feed already-Czech text back as if it were English.
  testCase('localized text is never sent for translation');
  {
    let sent = [];
    const { api } = loadCard((url) => {
      sent.push(readQ(url));
      return Promise.resolve(okResponse(readQ(url).split('\n').map((l) => 'CS:' + l)));
    });
    const tr = api.resolveTr('cs');
    const item = api.mapCanonicalParcel({
      status: 'in_transit', raw_status: 'IN_TRANSIT', barcode: 'CZ3',
      history: [{ status: 'in_transit', raw_status: 'IN_TRANSIT', timestamp: '2026-08-22T09:00:00' }],
    }, tr, { carrierGroup: 'dpd', carrierCode: 'dpd' });
    api.renderRow(item, { status: true, translate_events: true }, tr, new Set(['CZ3']), { language: 'cs' });
    await settle();
    check('nothing sent', sent, []);
  }

  console.log(failures ? `\n${failures} check(s) failed.` : '\nAll checks passed.');
  process.exit(failures ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
