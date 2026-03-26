const CARD_VERSION = '0.1.0';

// ─── Carriers ─────────────────────────────────────────────────────────────────

const CARRIERS_FALLBACK = {"abf":"ABF Freight","acs":"ACS Courier","adrexo":"Colis Privé","airroad":"AirRoad","aliex":"AliExpress Shipping (Cainiao)","allegro":"Allegro One","allied":"Allied Express","amshipfr":"Amazon Shipping France","amshipit":"Amazon Shipping Italy","amshipuk":"Amazon Shipping UK","amzlae":"Amazon UAE","amzlau":"Amazon Australia","amzlbe":"Amazon Belgium","amzlbr":"Amazon Brazil","amzlca":"Amazon Canada","amzlde":"Amazon Germany","amzleg":"Amazon Egypt","amzles":"Amazon Spain","amzlfr":"Amazon France","amzlie":"Amazon Ireland","amzlin":"Amazon India","amzlit":"Amazon Italy","amzljp":"Amazon Japan","amzlmx":"Amazon Mexico","amzlnl":"Amazon Netherlands","amzlpl":"Amazon Poland","amzlsa":"Amazon Saudi Arabia","amzlse":"Amazon Sweden","amzlsg":"Amazon Singapore","amzltr":"Amazon Turkey","amzluk":"Amazon UK","amzlus":"Amazon US","anc":"ANC Delivers","anpost":"Anpost","aramex":"Aramex","at":"Austrian Post","au":"Australia Post","bartol":"Bartolini","blp":"Belpost","bluedart":"Blue Dart","bpost":"Bpost","bring":"Bring","canpar":"Canpar","cems":"China Post EMS","ceska":"Česká pošta","ceva":"Ceva Logistics","china":"China Post","chrono":"Chronopost","cor":"Correos","corbra":"Correios","cp":"Canada Post","ctt":"CTT","cyclpcode":"Cycloon","dachser":"Dachser","dao365":"DAO365","dhl":"DHL Express","dhlfreight":"DHL Freight","dhlgf":"DHL Global Forwarding","dhlgm":"DHL Global Mail","dhlnl":"DHL Netherlands","dhlpoland":"DHL Poland","dhlsc":"DHL Supply Chain","dhluk":"DHL Parcel UK","dicom":"GLS Canada","dk":"Post Danmark","dp":"Deutsche Post","dpd":"DPD Germany","dpdat":"DPD Austria","dpdgroup":"DPD Group","dpdie":"DPD Ireland","dpdpoland":"DPD Poland","dpduk":"DPD UK","dsv":"DSV","dtdc":"DTDC India","dx":"DX","dynalogic":"Dynalogic","easyship":"Easyship","econt":"Econt Express","ee":"Eesti Post","elta":"Elta","emirates":"Emirates Post","ems":"EMS Russian Post","fedex":"FedEx","fedpl":"FedEx Poland","gls":"GLS","glsit":"GLS Italy","gobolt":"GoBolt","geodis":"Geodis","gso":"GLS US","hermes":"Hermes","hk":"Hongkong Post","hr":"Hrvatska pošta","hung":"Magyar Posta","il":"Israel Post","imile":"iMile","in":"India Post","indon":"Indonesia Post","inpost":"InPost Paczkomaty","inpostit":"InPost Italy","inpostuk":"InPost UK","it":"Poste Italiane","jp":"Japan Post","kerry":"Kerry Express","kor":"Korea Post","lp":"La poste (Colissimo)","lv":"Latvijas Pasts","malpos":"Malaysia Post","malta":"MaltaPost","meest":"Meest","mrw":"MRW","myher":"Evri","naqel":"Naqel Express","newp":"Nova Poshta","nor":"Norway Post","nzp":"New Zealand Post","ocs":"OCS Worldwide","ont":"OnTrac","p2g":"Parcel2Go","paack":"Paack","packeta":"Packeta","pandion":"Pandion","pbi":"PBI - Pitney Bowes","phlpost":"Philpost","pilot":"Pilot Freight","planzer":"Planzer","poland":"Poczta Polska","posti":"Posti Finland - Itella","postnord":"Postnord Logistics","ppl":"PPL","prfc":"Parcelforce","puro":"Purolator","px":"4PX","redjep":"Instabox Red je pakketje","relay":"Mondial Relay","rm":"Royal Mail","rp":"Russian Post","sagawa":"Sagawa Express","sch":"DB Schenker","se":"Swedish Post","sendle":"Sendle","seur":"SEUR","sf":"SF Express","sing":"SingPost","slovak":"Slovenská pošta","slv":"Pošta Slovenije","speedpak":"SpeedPAK","star":"StarTrack Express","swiss":"Swiss Post","thai":"Thailand Post","tnt":"TNT","tntau":"TNT Australia","tntfr":"TNT France","tntit":"TNT Italy","tntp":"PostNL","tntpit":"PostNL (International)","tntuk":"TNT UK","toll":"Toll - Team Global Express","tourline":"CTT Express","trnkrpcode":"Trunkrs","turk":"PTT","tw":"Taiwan (Chunghwa) Post","ubi":"UBI Smart Parcel","ukr":"Ukrpost","uniuni":"UniUni","ups":"UPS","upsmi":"UPS MI","usps":"USPS","veho":"Veho","venipak":"Venipak","vinted":"Vinted Go","whistl":"Whistl","xdp":"XDP","yamato":"Yamato","yanwen":"Yanwen","yodel":"Yodel","yun":"Yun Express","zel":"Zeleris","pholder":"Placeholder Deliveries"};

let carriersCache = null, carriersFetchPromise = null;

function fetchCarriers() {
  if (carriersCache) return Promise.resolve(carriersCache);
  if (carriersFetchPromise) return carriersFetchPromise;
  carriersFetchPromise = fetch('https://api.parcel.app/external/supported_carriers.json')
    .then(r => r.json())
    .then(d => { carriersCache = d; return d; })
    .catch(() => { carriersCache = CARRIERS_FALLBACK; return CARRIERS_FALLBACK; });
  return carriersFetchPromise;
}

function carrierName(code, carriers) {
  if (!code) return null;
  return (carriers && carriers[code]) || CARRIERS_FALLBACK[code] || code;
}

// ─── Brand icons ──────────────────────────────────────────────────────────────

const BRAND_ICONS = {
  // Verified available in custom-brand-icons
  postnl: 'phu:postnl', tntp: 'phu:postnl', tntpit: 'phu:postnl',
  dhl: 'phu:dhl', dhlnl: 'phu:dhl', dhluk: 'phu:dhl', dhlgm: 'phu:dhl', dhlfreight: 'phu:dhl', dhlsc: 'phu:dhl',
  rm: 'phu:royalmail',
  usps: 'phu:usps',
  ups: 'phu:ups-dlv', upsmi: 'phu:ups-dlv',
  fedex: 'phu:fedex', fedpl: 'phu:fedex',
};

function isBrandIconsAvailable() {
  try { return 'phu' in (window.customIconsets || {}); } catch { return false; }
}

function waitForBrandIcons(timeout = 5000) {
  if (isBrandIconsAvailable()) return Promise.resolve(true);
  return new Promise(resolve => {
    const start = Date.now();
    const iv    = setInterval(() => {
      if (isBrandIconsAvailable())      { clearInterval(iv); resolve(true);  return; }
      if (Date.now() - start > timeout) { clearInterval(iv); resolve(false); }
    }, 100);
  });
}

function getBrandIcon(code) {
  if (!code || !isBrandIconsAvailable()) return null;
  return BRAND_ICONS[code.toLowerCase()] || null;
}

// ─── Translations ────────────────────────────────────────────────────────────

const TRANSLATIONS = {
  en: {
    days: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    today: 'today', tomorrow: 'tomorrow', yesterday: 'yesterday',
    days_ago: (n) => n + ' days ago',
    delivered_today: 'Delivered today.',
    delivered_yesterday: 'Delivered yesterday.',
    delivered_on: (day) => 'Delivered ' + day + '.',
    slot_any_moment: 'Delivery expected any moment.',
    slot_all_day: (day) => 'Delivery expected ' + day + '.',
    slot_late: (day, time) => 'Delivery was expected ' + (day === 'today' ? '' : day + ' ') + 'before ' + time + '.',
    slot_within_minutes: (m) => 'Delivery expected within ' + m + ' ' + pl(m, 'minute', 'minutes') + '.',
    slot_within_hour: (h) => 'Delivery expected within ' + h + ' ' + pl(h, 'hour', 'hours') + '.',
    slot_within: (h, m) => 'Delivery expected within ' + h + ' ' + pl(h, 'hour', 'hours') + ' and ' + m + ' ' + pl(m, 'minute', 'minutes') + '.',
    delivery_between: (day, from, to) => 'Delivery ' + day + ' between ' + from + ' - ' + to + '.',
    delivery_before: (day, to) => 'Delivery ' + day + ' before ' + to + '.',
    delivery_on: (day) => 'Delivery ' + day + '.',
    delivery_around: (day, start) => 'Delivery ' + day + ' around ' + start + '.',
    no_packages: 'No packages',
    not_found: ' — not found',
    install_integration: 'Install integration',
    add: 'Add',
    status: 'Status', status_desc: 'Status line below the name',
    carrier: 'Carrier', carrier_desc: 'Name of the carrier',
    carrier_logo: 'Carrier logo', carrier_logo_desc: 'Carrier logo next to the name.', carrier_logo_link: 'Requires custom-brand-icons',
    carrier_logo_requires_carrier: 'Enable Carrier to use this setting.',
    badge: 'Badge', badge_desc: 'Days until delivery, shown on the icon',
    dim_delivered: 'Dim delivered packages', dim_delivered_desc: 'Show delivered packages at reduced opacity',
    location: 'Location', location_desc: 'Last known location, if available',
    layout: 'Card', single_card: 'Single card', split_cards: 'Separate cards',
    max_packages: 'Maximum amount of packages',
    show: 'Fields',
    behaviour: 'Behaviour',
    filter_status: 'Status', enroute: 'En route', delivered: 'Delivered', all: 'All',
    filter_direction: 'Direction', incoming: 'Incoming', outgoing: 'Outgoing',
    filter_date_label: 'Specific day', filter_date: 'Date', filter_date_desc: '0 = today  ·  -1 = yesterday  ·  1 = tomorrow  ·  Empty = no filter',
    filter_slot: 'Time slot', filter_slot_active: 'Active delivery window only', filter_slot_desc: 'Show only packages whose delivery window is currently active', filter_slot_requires_enroute: 'Set Status filter to En route to enable this.',
    filter_carrier: 'Carrier', carrier_code: 'Carrier code', carrier_code_desc: 'e.g. dpdgroup, fedex — ',
    all_codes: 'all codes',
    hide_when_empty: 'Hide when empty', hide_when_empty_desc: 'Hide the card when there are no packages to show',
    parcel_row_label: 'Raw data',
    entity_hint_postnl: 'Look for a sensor with enroute and delivered attributes. Usually named postnl_delivery or postnl_bezorging.',
    entity_hint_postnl_sent: 'Look for a sensor with enroute and delivered attributes. Usually named postnl_distribution.',
    entity_hint_parcel: 'Look for a sensor with a deliveries attribute. Usually named parcel_raw_shipment_data.',
    advanced: 'Advanced',
    sources_auto_detect_notice: 'Sources are auto-detected from your Home Assistant integrations. Add the ones you want to track.',
    integration_postnl: 'PostNL (Incoming)', integration_postnl_sent: 'PostNL (Outgoing)',
    sources_tab: 'Sources', filter_tab: 'Filter', display_tab: 'Appearance',
  },
  nl: {
    days: ['zondag','maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag'],
    months: ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'],
    today: 'vandaag', tomorrow: 'morgen', yesterday: 'gisteren',
    days_ago: (n) => n + ' dagen geleden',
    delivered_today: 'Vandaag bezorgd.',
    delivered_yesterday: 'Gisteren bezorgd.',
    delivered_on: (day) => day.charAt(0).toUpperCase() + day.slice(1) + ' bezorgd.',
    slot_any_moment: 'Levering verwacht elk moment.',
    slot_all_day: (day) => 'Levering verwacht ' + day + '.',
    slot_late: (day, time) => 'Levering werd verwacht ' + (day === 'vandaag' ? '' : day + ' ') + 'voor ' + time + '.',
    slot_within_minutes: (m) => 'Levering verwacht binnen ' + m + ' minuten.',
    slot_within_hour: (h) => 'Levering verwacht binnen ' + h + ' uur.',
    slot_within: (h, m) => 'Levering verwacht binnen ' + h + ' uur en ' + m + ' minuten.',
    delivery_between: (day, from, to) => 'Levering ' + day + ' tussen ' + from + ' - ' + to + '.',
    delivery_before: (day, to) => 'Levering ' + day + ' voor ' + to + '.',
    delivery_on: (day) => 'Levering ' + day + '.',
    delivery_around: (day, start) => 'Levering ' + day + ' rond ' + start + '.',
    no_packages: 'Geen pakketjes',
    not_found: ' — niet gevonden',
    install_integration: 'Installeer integratie',
    add: 'Toevoegen',
    status: 'Status', status_desc: 'Statusregel onder de naam',
    carrier: 'Bezorgdienst', carrier_desc: 'Naam van de bezorgdienst',
    carrier_logo: 'Bezorgdienst logo', carrier_logo_desc: 'Logo van de bezorgdienst naast de naam.', carrier_logo_link: 'Vereist custom-brand-icons',
    carrier_logo_requires_carrier: 'Zet Bezorgdienst aan om deze instelling te gebruiken.',
    badge: 'Badge', badge_desc: 'Dagen tot levering, weergegeven op het icoon',
    dim_delivered: 'Dim bezorgde pakketten', dim_delivered_desc: 'Bezorgde pakketten met verminderde helderheid weergeven',
    location: 'Locatie', location_desc: 'Laatste bekende locatie, indien beschikbaar',
    layout: 'Kaart', single_card: 'Enkele kaart', split_cards: 'Losse kaarten',
    max_packages: 'Maximum aantal pakketjes',
    show: 'Velden',
    behaviour: 'Gedrag',
    filter_status: 'Status', enroute: 'Onderweg', delivered: 'Bezorgd', all: 'Alles',
    filter_direction: 'Richting', incoming: 'Ontvangen', outgoing: 'Verstuurd',
    filter_date_label: 'Specifieke dag', filter_date: 'Datum', filter_date_desc: '0 = vandaag  ·  -1 = gisteren  ·  1 = morgen  ·  Leeg = geen filter',
    filter_slot: 'Tijdslot', filter_slot_active: 'Alleen actief leveringstijdslot', filter_slot_desc: 'Toont alleen pakketjes waarvan het leveringstijdslot op dit moment actief is', filter_slot_requires_enroute: 'Stel de Status filter in op Onderweg om dit in te schakelen.',
    filter_carrier: 'Bezorgdienst', carrier_code: 'Code bezorgdienst', carrier_code_desc: 'bijv. dpdgroup, fedex — ',
    all_codes: 'alle codes',
    hide_when_empty: 'Verberg bij leeg', hide_when_empty_desc: 'Verberg de kaart als er geen pakketjes zijn om te tonen',
    parcel_row_label: 'Ruwe data',
    entity_hint_postnl: 'Zoek naar een sensor met enroute en delivered attributen. Meestal genaamd postnl_bezorging of postnl_delivery.',
    entity_hint_postnl_sent: 'Zoek naar een sensor met enroute en delivered attributen. Meestal genaamd postnl_distribution.',
    entity_hint_parcel: 'Zoek naar een sensor met een deliveries attribuut. Meestal genaamd parcel_raw_shipment_data.',
    advanced: 'Geavanceerd',
    sources_auto_detect_notice: 'Bronnen worden automatisch gedetecteerd vanuit je Home Assistant integraties. Voeg de gewenste toe.',
    integration_postnl: 'PostNL (Ontvangen)', integration_postnl_sent: 'PostNL (Verstuurd)',
    sources_tab: 'Bronnen', filter_tab: 'Filter', display_tab: 'Weergave',
  },
};

// pl(n, one, other) — minimal pluralisation helper (EN only needs it)
function pl(n, one, other) { return n === 1 ? one : other; }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function daysUntil(date) {
  const today = new Date(); today.setHours(0,0,0,0);
  const d = new Date(date); d.setHours(0,0,0,0);
  return Math.round((d - today) / 86400000);
}

function formatDay(date, tr) {
  const diff = daysUntil(date), d = new Date(date);
  if (diff === 0) return tr.today;
  if (diff === 1) return tr.tomorrow;
  if (diff > 0 && diff < 7) return tr.days[d.getDay()];
  if (diff < 0) { const a = Math.abs(diff); return a === 1 ? tr.yesterday : tr.days_ago(a); }
  return tr.days[d.getDay()] + ' ' + d.getDate() + ' ' + tr.months[d.getMonth()];
}

function formatTime(d) {
  return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
}

function ensurePeriod(s) { return s && !s.endsWith('.') ? s + '.' : (s || ''); }

function formatDeliveredText(date, tr) {
  const day = formatDay(date, tr);
  if (day === tr.today)     return tr.delivered_today;
  if (day === tr.yesterday) return tr.delivered_yesterday;
  return tr.delivered_on(day);
}

function isSlotActive(from, to) {
  if (!from || !to) return false;
  const now = new Date();
  return now >= new Date(from) && now <= new Date(to);
}

function formatTimeRemaining(toDate, tr, fromDate) {
  if (fromDate) { const f = new Date(fromDate); if (f.getHours() === 0 && f.getMinutes() === 0) return tr.slot_all_day(formatDay(f, tr)); }
  const to   = new Date(toDate);
  const rawDiff = Math.round((to - new Date()) / 60000);
  const diff  = rawDiff > 0 ? Math.ceil(rawDiff / 5) * 5 : rawDiff; // round up to next 5 min
  if (diff < 0) return tr.slot_late(formatDay(to, tr), formatTime(to));
  if (diff === 0) return tr.slot_any_moment;
  const h = Math.floor(diff / 60), m = diff % 60;
  if (h > 0 && m > 0) return tr.slot_within(h, m);
  if (h > 0)          return tr.slot_within_hour(h);
  return tr.slot_within_minutes(m);
}

function buildParcelUrl(code, tracking) {
  if (!code || !tracking) return null;
  return 'https://parcel.app/webtrack.php?platform=web&type=' + encodeURIComponent(code) + '&code=' + encodeURIComponent(tracking);
}

// ─── Normalised item model ────────────────────────────────────────────────────

function mkItem(overrides) {
  return {
    name: '', line1: null, line2: null, location: null,
    icon: 'mdi:package-variant', color: 'grey',
    deliveryDate: null, slotActive: false, delivered: false,
    carrierCode: null, carrier: null, brandIcon: null,
    tapUrl: null, source: null, direction: 'incoming', slotEnd: null, trackingCode: null,
    ...overrides,
  };
}

// ─── Status mappings ──────────────────────────────────────────────────────────
// Defined before INTEGRATIONS so they can be referenced directly in _map methods.

function postnlStatus(status) {
  const s = (status || '').toLowerCase();
  if (s.includes('verwacht'))             return { icon: 'mdi:clock-alert',    color: 'var(--amber-color, #FFC107)' };
  if (s.includes('bij postnl'))           return { icon: 'mdi:package-down',   color: 'blue'   };
  if (s.includes('gesorteerd'))           return { icon: 'mdi:sort-variant',   color: 'purple' };
  if (s.includes('onderweg'))             return { icon: 'mdi:truck-delivery', color: 'orange' };
  if (s.includes('gemist'))              return { icon: 'mdi:account-alert',  color: 'red'    };
  if (s.includes('bezorgd bij de buren')) return { icon: 'mdi:home-account',   color: 'green'  };
  if (s.includes('bezorgd'))             return { icon: 'mdi:check-circle',   color: 'green'  };
  if (s.includes('af te halen'))          return { icon: 'mdi:storefront',     color: 'purple' };
  if (s.includes('vertraagd'))           return { icon: 'mdi:alert-circle',   color: 'red'    };
  return { icon: 'mdi:package-variant', color: 'grey' };
}

function parcelStatus(code) {
  return ({
    0: { icon: 'mdi:check-circle',   color: 'green'  },
    1: { icon: 'mdi:sort-variant',   color: 'purple' },
    2: { icon: 'mdi:package-down',   color: 'blue'   },
    3: { icon: 'mdi:storefront',     color: 'purple' },
    4: { icon: 'mdi:truck-delivery', color: 'orange' },
    5: { icon: 'mdi:help-circle',    color: 'grey'   },
    6: { icon: 'mdi:account-alert',  color: 'red'    },
    7: { icon: 'mdi:alert-circle',   color: 'red'    },
    8: { icon: 'mdi:clock-start',    color: 'var(--amber-color, #FFC107)' },
  })[code] || { icon: 'mdi:package-variant', color: 'grey' };
}

// ─── Integration registry ─────────────────────────────────────────────────────
// To add a new integration: add one entry here. Nothing else needs to change.
//
// Each entry defines:
//   label       — human readable name (editor)
//   icon        — MDI icon for editor source list
//   platforms   — integration platform strings (hass.entities[id].platform)
//   entityHints — fallback: strings that may appear in entity IDs
//   hasAttrs    — (attrs) => bool — confirms the right entity by attribute shape
//   collect     — (attrs, ctx) => item[] — maps raw sensor data to normalised items
//
// ctx = { carriers, tr } — shared context passed to collect

const INTEGRATIONS = {

  postnl: {
    group:       'postnl',
    groupLabel:  'PostNL',
    rowLabel:    'Incoming',
    rowLabelKey: 'incoming',
    entityHintText: 'entity_hint_postnl',
    labelKey:    'integration_postnl',
    label:       'PostNL (Incoming)',   // fallback
    icon:        'mdi:mailbox',
    direction:   'incoming',
    url:         'https://github.com/michaelarnauts/ha-postnl',
    platforms:   ['postnl'],
    entityHints: ['deliver', 'ontvang', 'bezorg', 'lever', 'inbound', 'inkom', 'binnenkom', 'receiv', 'incom'],
    hasAttrs:    (a) => a.enroute !== undefined || a.delivered !== undefined,
    collect(attrs, ctx) {
      return [
        ...(attrs.enroute   || []).map(i => this._map(i, false, ctx.tr)),
        ...(attrs.delivered || []).map(i => this._map(i, true,  ctx.tr)),
      ];
    },
    _map(item, delivered, tr) {
      const { icon, color } = postnlStatus(item.status_message);
      let deliveryDate = null, line1 = null, line2 = null, slotActive = false, slotEnd = null;
      if (delivered && item.delivery_date) {
        const d = new Date(item.delivery_date);
        if (!isNaN(d)) { deliveryDate = d; line1 = formatDeliveredText(d, tr); }
      } else if (!delivered && item.planned_from) {
        const from = new Date(item.planned_from);
        const to   = item.planned_to ? new Date(item.planned_to) : null;
        if (!isNaN(from) && daysUntil(from) >= 0) {
          deliveryDate = from;
          slotActive   = to ? isSlotActive(item.planned_from, item.planned_to) : false;
          slotEnd      = to;
          const pastSlot = to && !slotActive && new Date() > to;
          line1 = ensurePeriod(item.status_message || '');
          if (slotActive || pastSlot) {
            line2 = formatTimeRemaining(to, tr, from);
          } else if (to) {
            line2 = tr.delivery_between(formatDay(from, tr), formatTime(from), formatTime(to));
          } else {
            line2 = tr.delivery_on(formatDay(from, tr));
          }
        }
      }
      if (!line1) line1 = ensurePeriod(item.status_message || '');
      return mkItem({ name: (item.name || '').trim(), line1, line2, icon, color,
        deliveryDate, slotActive, delivered,
        carrierCode: 'postnl', carrier: 'PostNL', brandIcon: getBrandIcon('postnl'),
        tapUrl: item.url || null, source: 'postnl', direction: 'incoming', slotEnd,
        trackingCode: item.key || null });
    },
  },

  postnl_sent: {
    group:       'postnl',
    groupLabel:  'PostNL',
    rowLabel:    'Outgoing',
    rowLabelKey: 'outgoing',
    entityHintText: 'entity_hint_postnl_sent',
    labelKey:    'integration_postnl_sent',
    label:       'PostNL (Outgoing)',   // fallback
    icon:        'mdi:mailbox-up',
    direction:   'outgoing',
    url:         'https://github.com/michaelarnauts/ha-postnl',
    platforms:   ['postnl'],
    entityHints: ['distribut', 'verstu', 'verzend', 'uitgang', 'uitgaand', 'outgo', 'outbound', 'sent', 'shipment', 'shipping'],
    hasAttrs:    (a) => a.enroute !== undefined || a.delivered !== undefined,
    collect(attrs, ctx) {
      return [
        ...(attrs.enroute   || []).map(i => this._map(i, ctx.tr)),
        ...(attrs.delivered || []).map(i => this._map(i, ctx.tr)),
      ];
    },
    _map(item, tr) {
      const { icon, color } = postnlStatus(item.status_message);
      const delivered = !!item.delivered;
      let deliveryDate = null, line1 = null;
      if (item.delivery_date) {
        const d = new Date(item.delivery_date);
        if (!isNaN(d)) { deliveryDate = d; line1 = formatDeliveredText(d, tr); }
      }
      if (!line1) line1 = ensurePeriod(item.status_message || '');
      return mkItem({ name: (item.name || '').trim(), line1, icon, color,
        deliveryDate, delivered,
        carrierCode: 'postnl', carrier: 'PostNL', brandIcon: getBrandIcon('postnl'),
        tapUrl: item.url || null, source: 'postnl_sent', direction: 'outgoing',
        trackingCode: item.key || null });
    },
  },

  parcel: {
    group:       'parcel',
    groupLabel:  'Parcel',
    rowLabel:    'Raw data',
    rowLabelKey: 'parcel_row_label',
    entityHintText: 'entity_hint_parcel',
    labelKey:    null,
    label:       'Parcel',
    icon:        'mdi:package-variant',
    direction:   'incoming',
    url:         'https://github.com/jmdevita/parcel-ha',
    platforms:   ['parcel'],
    entityHints: ['parcel', 'pakket', 'pakje', 'zending', 'packag', 'shipment', 'tracking', 'raw', 'data'],
    hasAttrs:    (a) => a.deliveries !== undefined,
    collect(attrs, ctx) {
      return (attrs.deliveries || []).map(i => this._map(i, ctx.carriers, ctx.tr));
    },
    _map(item, carriers, tr) {
      const statusCode  = item.status_code ?? 5; // 5 = unknown when missing
      const delivered   = statusCode === 0;
      const { icon, color } = parcelStatus(statusCode);
      const carrierCode = item.carrier_code || null;
      const firstEvent  = Array.isArray(item.events) ? item.events[0] : null;
      let deliveryDate = null, line1 = null, line2 = null, slotActive = false;
      if (item.date_expected) {
        const d = new Date(item.date_expected.replace(' ', 'T'));
        if (!isNaN(d)) {
          deliveryDate = d;
          const day = formatDay(d, tr), start = formatTime(d);
          const end = item.date_expected_end ? formatTime(new Date(item.date_expected_end.replace(' ', 'T'))) : null;
          if (delivered || daysUntil(d) < 0) {
            line1 = formatDeliveredText(d, tr);
          } else {
            slotActive = item.date_expected_end
              ? isSlotActive(item.date_expected.replace(' ','T'), item.date_expected_end.replace(' ','T'))
              : false;
            line1 = ensurePeriod(firstEvent?.event || '');
            const endStr    = item.date_expected_end?.replace(' ','T') || null;
            const pastSlotP = endStr && !slotActive && new Date() > new Date(endStr);
            if      ((slotActive || pastSlotP) && endStr) line2 = formatTimeRemaining(endStr, tr, item.date_expected.replace(' ','T'));
            else if (start === '00:00' && end) line2 = tr.delivery_before(day, end);
            else if (start === '00:00')        line2 = tr.delivery_on(day);
            else if (end)                      line2 = tr.delivery_between(day, start, end);
            else                               line2 = tr.delivery_around(day, start);
          }
        }
      }
      if (!line1) line1 = ensurePeriod(firstEvent?.event || '');
      return mkItem({ name: (item.description || '').trim(), line1, line2,
        location: firstEvent?.location || null,
        icon, color, deliveryDate, slotActive, delivered, carrierCode,
        carrier:   carrierName(carrierCode, carriers),
        brandIcon: getBrandIcon(carrierCode),
        tapUrl:    buildParcelUrl(carrierCode, item.tracking_number),
        source:    'parcel', direction: 'incoming',
        slotEnd:   item.date_expected_end ? new Date(item.date_expected_end.replace(' ','T')) : null,
        trackingCode: item.tracking_number || null });
    },
  },

};

// ─── Integration helpers ──────────────────────────────────────────────────────

// Returns all entities that are candidates for a given integration type.
// Candidate = matching platform (or entityHint) AND hasAttrs passes.
function candidatesForType(type, hass) {
  if (!hass) return [];
  const def = INTEGRATIONS[type];
  if (!def) return [];
  const results = [];
  for (const [entityId, info] of Object.entries(hass.entities || {})) {
    const platform = (info.platform || '').toLowerCase();
    const attrs    = hass.states[entityId]?.attributes;
    if (!attrs) continue;
    const platformMatch = def.platforms?.some(p => platform.includes(p));
    if (!platformMatch) continue;
    if (!def.hasAttrs(attrs)) continue;
    results.push(entityId);
  }
  return results;
}

// Returns true if the platform group for this type has any entities at all
function isPlatformInstalled(type, hass) {
  if (!hass) return false;
  const def = INTEGRATIONS[type];
  if (!def) return false;
  return Object.values(hass.entities || {}).some(info =>
    def.platforms?.some(p => (info.platform || '').toLowerCase().includes(p))
  );
}

// Split an entity ID into segments: sensor.postnl_verstuurd → ['postnl', 'verstuurd']
function entitySegments(entityId) {
  return entityId.toLowerCase().replace(/^[^.]+\./, '').split(/[_\-]/);
}

// Score a hint against an entity ID:
// 3 = exact segment match ('verstuurd' matches segment 'verstuurd')
// 2 = prefix segment match ('verstu' matches segment 'verstuurd')
// 1 = substring match anywhere in the full entity ID
// 0 = no match
function hintScore(hint, entityId) {
  const h        = hint.toLowerCase();
  const segments = entitySegments(entityId);
  if (segments.includes(h)) return 3;
  if (segments.some(s => s.startsWith(h))) return 2;
  if (entityId.toLowerCase().includes(h)) return 1;
  return 0;
}

// Disambiguate among candidate types using entity ID hints.
// Returns the best type, or null if ambiguous or no match.
function bestTypeByHints(entityId, types) {
  let bestType = null, bestScore = 0, ambiguous = false;
  for (const type of types) {
    const def   = INTEGRATIONS[type];
    const score = Math.max(0, ...(def.entityHints || []).map(h => hintScore(h, entityId)));
    if (score > bestScore) { bestScore = score; bestType = type; ambiguous = false; }
    else if (score > 0 && score === bestScore) { ambiguous = true; }
  }
  return (bestScore > 0 && !ambiguous) ? bestType : null;
}

function detectTypeFromHass(entityId, hass) {
  if (!entityId) return null;
  const platform = (hass?.entities?.[entityId]?.platform || '').toLowerCase();

  // Narrow to types whose platform matches
  const platformTypes = Object.entries(INTEGRATIONS)
    .filter(([, def]) => def.platforms?.some(p => platform.includes(p)))
    .map(([type]) => type);

  if (platformTypes.length === 1) return platformTypes[0];
  if (platformTypes.length > 1) {
    // Multiple types share this platform — use hints to disambiguate
    return bestTypeByHints(entityId, platformTypes) || platformTypes[0];
  }

  // No platform match — try hints across all types (fallback for missing platform info)
  return bestTypeByHints(entityId, Object.keys(INTEGRATIONS));
}

let _discoverCache = null, _discoverCacheKey = null;

function discoverSources(hass) {
  if (!hass) return [];
  const cacheKey = Object.keys(hass.entities || {}).sort().join(',');
  if (cacheKey === _discoverCacheKey) return _discoverCache;
  const found = [];
  for (const entityId of Object.keys(hass.entities || {})) {
    const attrs = hass.states[entityId]?.attributes;
    if (!attrs) continue;
    const type = detectTypeFromHass(entityId, hass);
    if (!type || !INTEGRATIONS[type].hasAttrs(attrs)) continue;
    found.push({ entity: entityId, type });
  }
  _discoverCacheKey = cacheKey;
  _discoverCache    = found;
  return found;
}

// ─── Filtering ────────────────────────────────────────────────────────────────

function applyFilter(items, filter) {
  if (!filter) return items;
  let r = items;
  const state = filter.state || 'enroute';
  if (state === 'enroute')   r = r.filter(i => !i.delivered);
  if (state === 'delivered') r = r.filter(i => i.delivered);
  if (filter.carrier) {
    const fc = filter.carrier.toLowerCase();
    r = r.filter(i => i.carrierCode?.toLowerCase() === fc);
  }
  if (filter.date !== undefined && filter.date !== null) {
    if (typeof filter.date === 'object') {
      const { from = null, to = null } = filter.date;
      r = r.filter(i => {
        if (!i.deliveryDate) return false;
        const d = daysUntil(i.deliveryDate);
        return (from === null || d >= from) && (to === null || d <= to);
      });
    } else {
      const t = parseInt(filter.date);
      r = r.filter(i => i.deliveryDate && daysUntil(i.deliveryDate) === t);
    }
  }
  if (filter.direction && filter.direction !== 'all') {
    r = r.filter(i => i.direction === filter.direction);
  }
  if (filter.slot_active) r = r.filter(i => i.slotActive);
  return r;
}

// ─── Card CSS ─────────────────────────────────────────────────────────────────

const CARD_CSS = `
  :host {
    display: block;
    font-family: var(--ha-font-family-body, inherit);
    -webkit-font-smoothing: var(--ha-font-smoothing, auto);
  }
  :host(.hidden) { display: none !important; margin: 0 !important; padding: 0 !important; min-height: 0 !important; }
  .row { display: flex; align-items: center; padding: 12px 16px; gap: 14px; }
  .single .row { border-bottom: 1px solid var(--divider-color, rgba(0,0,0,.08)); }
  .single .row:last-child { border-bottom: none; }
  .row.delivered { opacity: .45; }
  .icon-container { position: relative; flex-shrink: 0; }
  .icon-wrap {
    width: 38px; height: 38px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }
  .icon-wrap.clickable {
    cursor: pointer; position: relative; overflow: hidden;
    -webkit-tap-highlight-color: transparent;
  }
  ha-icon   { --mdc-icon-size: 20px; pointer-events: none; display: flex; }
  ha-ripple { position: absolute; inset: 0; }
  .badge {
    position: absolute; top: -2px; right: -2px; width: 16px; height: 16px; border-radius: 50%;
    color: var(--card-background-color, #fff);
    font-size: var(--ha-font-size-2xs, 10px); font-weight: var(--ha-font-weight-bold, 600); line-height: 16px;
    display: flex; align-items: center; justify-content: center; pointer-events: none; overflow: hidden;
  }
  .content { flex: 1; min-width: 0; }
  .name {
    font-size: var(--ha-font-size-m, 14px); font-weight: var(--ha-font-weight-medium, 500);
    color: var(--primary-text-color); line-height: var(--ha-line-height-condensed, 1.3);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .line1, .line2, .location {
    font-size: var(--ha-font-size-s, 12px); color: var(--primary-text-color);
    line-height: var(--ha-line-height-condensed, 1.3); margin-top: 3px;
  }
  .carrier {
    font-size: var(--ha-font-size-xs, 11px); color: var(--secondary-text-color);
    line-height: var(--ha-line-height-condensed, 1.3);
    margin-top: 6px; display: flex; align-items: center; gap: 3px;
  }
  .carrier ha-icon { flex-shrink: 0; position: relative; top: 0; }
  .split-wrapper { display: flex; flex-direction: column; gap: 8px; }
  .empty {
    padding: 28px 16px; text-align: center; color: var(--secondary-text-color);
    font-size: var(--ha-font-size-s, 12px);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
  }
`;

function mk(tag, cls, text) {
  const el = document.createElement(tag);
  if (cls)  el.className   = cls;
  if (text) el.textContent = text;
  return el;
}

function renderRow(item, show) {
  const hex  = item.color || 'grey';
  const days = (!item.delivered && item.deliveryDate) ? daysUntil(item.deliveryDate) : null;

  // Icon wrap
  const iconWrap = mk('div', 'icon-wrap' + (item.tapUrl ? ' clickable' : ''));
  if (item.tapUrl) {
    iconWrap.dataset.url = item.tapUrl;
    const ripple = document.createElement('ha-ripple');
    iconWrap.appendChild(ripple);
    const bg = mk('div');
    bg.style.cssText = 'background:' + hex + ';opacity:.15;position:absolute;inset:0;border-radius:50%;pointer-events:none;';
    iconWrap.appendChild(bg);
  }
  const haIcon = document.createElement('ha-icon');
  haIcon.setAttribute('icon', item.icon);
  haIcon.style.color = hex;
  iconWrap.appendChild(haIcon);

  // Badge
  const iconContainer = mk('div', 'icon-container');
  iconContainer.appendChild(iconWrap);
  if (show.badge && (days !== null || item.slotActive)) {
    const badge = mk('div', 'badge');
    badge.style.background = item.slotActive ? 'var(--success-color,#43A047)' : 'var(--disabled-color,#9E9E9E)';
    if (!item.slotActive) badge.textContent = days > 9 ? '9+' : String(days);
    iconContainer.appendChild(badge);
  }

  // Content
  const content = mk('div', 'content');
  content.appendChild(mk('div', 'name', item.name || '—'));
  if (show.location && item.location)  content.appendChild(mk('div', 'location', item.location));
  if (show.status && item.line1)       content.appendChild(mk('div', 'line1',    item.line1));
  if (item.line2)                      content.appendChild(mk('div', 'line2',    item.line2));
  if (show.carrier && item.carrier) {
    const carrier = mk('span', 'carrier');
    if (show.brand_icon !== false && item.brandIcon) {
      const ico = document.createElement('ha-icon');
      ico.setAttribute('icon', item.brandIcon);
      ico.style.setProperty('--mdc-icon-size', '14px');
      carrier.appendChild(ico);
    }
    carrier.appendChild(document.createTextNode(item.carrier));
    content.appendChild(carrier);
  }

  // Row
  const row = mk('div', 'row' + (item.delivered && show.dim_delivered !== false ? ' delivered' : ''));
  row.appendChild(iconContainer);
  row.appendChild(content);
  return row;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CARD
// ═══════════════════════════════════════════════════════════════════════════════

class PackageTrackerCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = '<style>' + CARD_CSS + '</style><div id="root"></div>';
    this._root       = this.shadowRoot.getElementById('root');
    this._carriers   = CARRIERS_FALLBACK;
    this._lastHashes    = {};
    this._lastLang     = null;
    this._countdownTimer = null;
    this._built         = false;
  }

  connectedCallback() {
    fetchCarriers().then(c => { this._carriers = c; this._render(); });
    if (!isBrandIconsAvailable()) {
      waitForBrandIcons().then(ok => { if (ok) this._render(); });
    }
    this._startCountdownTimer();
  }

  disconnectedCallback() {
    clearInterval(this._countdownTimer);
    this._countdownTimer = null;
  }

  _startCountdownTimer() {
    clearInterval(this._countdownTimer);
    // Re-render every 5 minutes — only meaningful if there's an active slot
    this._countdownTimer = setInterval(() => {
      if (this._hasActiveSlot()) this._render();
    }, 5 * 60 * 1000);
  }

  _hasActiveSlot() {
    if (!this._hass || !this._config) return false;
    const tr  = TRANSLATIONS[this._hass.language] || TRANSLATIONS['en'];
    const ctx = { carriers: this._carriers, tr };
    for (const source of this._config.sources) {
      const def   = INTEGRATIONS[source.type];
      const attrs = source.entity ? this._hass.states[source.entity]?.attributes : null;
      if (!def || !attrs) continue;
      if (def.collect(attrs, ctx).some(i => i.slotActive)) return true;
    }
    return false;
  }

  setConfig(config) {
    if (!config) throw new Error('package-tracker-card: missing config');
    if (!Array.isArray(config.sources)) throw new Error('package-tracker-card: sources must be an array');
    this._config = {
      max: 5, layout: 'single', ...config,
      show:   { carrier: true, status: true, badge: true, dim_delivered: true, location: false, brand_icon: true, hide_when_empty: false, ...(config.show   || {}) },
      filter: { state: 'all',                                                                                       ...(config.filter || {}) },
    };
    this._lastHashes = {};
    if (this._countdownTimer) this._startCountdownTimer();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    let changed = !this._built;
    if (hass.language !== this._lastLang) { this._lastLang = hass.language; changed = true; }
    for (const { entity } of this._config.sources) {
      if (!entity) continue;
      // Compare last_changed instead of serializing attributes — much cheaper
      const ts = hass.states[entity]?.last_changed ?? null;
      if (ts !== this._lastHashes[entity]) { this._lastHashes[entity] = ts; changed = true; }
    }
    if (changed) this._render();
  }

  _collectItems() {
    const lang = this._hass.language || 'en';
    const ctx   = { carriers: this._carriers, tr: TRANSLATIONS[lang] || TRANSLATIONS['en'] };
    const items = [];
    for (const source of this._config.sources) {
      const def = INTEGRATIONS[source.type];
      if (!def || !source.entity) continue;
      const attrs = this._hass.states[source.entity]?.attributes;
      if (!attrs) continue;
      items.push(...def.collect(attrs, ctx));
    }
    // Deduplicate by tracking code — first source wins
    const seen = new Set();
    return items.filter(i => {
      if (!i.trackingCode) return true;
      if (seen.has(i.trackingCode)) return false;
      seen.add(i.trackingCode); return true;
    });
  }

  _sortItems(items) {
    const now   = new Date();
    const today = new Date(); today.setHours(0,0,0,0);

    // Priority group for enroute items:
    // 0 = active slot (sort by slot end asc)
    // 1 = past slot / late (sort by slot end asc)
    // 2 = today (sort by deliveryDate asc)
    // 3 = future (sort by deliveryDate asc)
    // 4 = no date
    function priority(item) {
      if (item.delivered) return 5;
      if (item.slotActive) return 0;
      if (item.slotEnd && now > item.slotEnd) return 1; // past slot
      if (item.deliveryDate) {
        const d = new Date(item.deliveryDate); d.setHours(0,0,0,0);
        return d.getTime() === today.getTime() ? 2 : 3;
      }
      return 4;
    }

    return [...items].sort((a, b) => {
      const pa = priority(a), pb = priority(b);
      if (pa !== pb) return pa - pb;
      // Within delivered: newest first
      if (a.delivered) return (b.deliveryDate || 0) - (a.deliveryDate || 0);
      // Within active/past slot: earliest slot end first
      if (pa <= 1) return (a.slotEnd || a.deliveryDate || 0) - (b.slotEnd || b.deliveryDate || 0);
      // Within today/future: earliest first
      if (a.deliveryDate && b.deliveryDate) return a.deliveryDate - b.deliveryDate;
      return 0;
    });
  }

  _render() {
    if (!this._hass || !this._config) return;
    this._built = true;
    let items = applyFilter(this._sortItems(this._collectItems()), this._config.filter);
    if (this._config.max) items = items.slice(0, this._config.max);
    const show   = this._config.show;
    const layout = this._config.layout || 'single';
    const tr     = TRANSLATIONS[this._hass.language] || TRANSLATIONS['en'];

    if (!items.length && show.hide_when_empty) {
      this.classList.add('hidden');
      this._root.innerHTML = '';
      return;
    }
    this.classList.remove('hidden');
    this._root.innerHTML = '';

    if (!items.length) {
      const card  = document.createElement('ha-card');
      const empty = mk('div', 'empty');
      const ico   = document.createElement('ha-icon');
      ico.setAttribute('icon', 'mdi:package-variant');
      ico.style.cssText = '--mdc-icon-size:32px;opacity:.3;';
      empty.appendChild(ico);
      empty.appendChild(mk('div', null, tr.no_packages));
      card.appendChild(empty);
      this._root.appendChild(card);
      return;
    }

    const buildRow = (item) => {
      const row = renderRow(item, show);
      if (item.tapUrl) row.querySelector('.icon-wrap.clickable')
        ?.addEventListener('click', () => window.open(item.tapUrl, '_blank'));
      return row;
    };

    if (layout === 'split') {
      const wrapper = mk('div', 'split-wrapper');
      for (const item of items) {
        const card = document.createElement('ha-card');
        card.appendChild(buildRow(item));
        wrapper.appendChild(card);
      }
      this._root.appendChild(wrapper);
    } else {
      const card   = document.createElement('ha-card');
      const single = mk('div', 'single');
      for (const item of items) single.appendChild(buildRow(item));
      card.appendChild(single);
      this._root.appendChild(card);
    }
  }

  getCardSize() {
    if (this._config?.show?.hide_when_empty && this.style.display === 'none') return 0;
    return 3;
  }

  static getConfigElement() { return document.createElement('package-tracker-card-editor'); }
  static getStubConfig()    { return { sources: [], layout: 'single', max: 5,  filter: { state: 'all'     }, show: { carrier: true, status: true, badge: true } }; }
}

customElements.define('package-tracker-card', PackageTrackerCard);

// ═══════════════════════════════════════════════════════════════════════════════
// EDITOR
// ═══════════════════════════════════════════════════════════════════════════════

const EDITOR_CSS = `
  :host { display: block; }
  ha-form { display: block; }
  .editor-card { border: 1px solid var(--divider-color); border-radius: var(--ha-card-border-radius, 12px); overflow: hidden; background: var(--ha-card-background, var(--card-background-color, #fff)); }
  .tab-bar { display: flex; border-bottom: 1px solid var(--divider-color); }
  .tab-btn { flex: 1; padding: 12px 4px; border: none; background: none; font-family: inherit; font-size: 13px; font-weight: 500; color: var(--secondary-text-color); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: color .15s, border-color .15s; }
  .tab-btn:hover  { color: var(--primary-text-color); }
  .tab-btn.active { color: var(--primary-color); border-bottom-color: var(--primary-color); font-weight: 600; }
  .tab-content { padding: 16px; }
  .item-list { display: flex; flex-direction: column; gap: 16px; }
  .source-group { border: 1px solid var(--divider-color); border-radius: 8px; overflow: hidden; }
  .item-entry { border-bottom: 1px solid var(--divider-color); }
  .item-entry:last-child { border-bottom: none; }
  .item-row { display: flex; align-items: center; gap: 4px; min-height: 44px; padding: 0 4px 0 12px; }
  .row-label-wrap { flex: 1; min-width: 0; }
  .row-label { font-size: 14px; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .unconfigured .row-label { color: var(--secondary-text-color); }
  .row-sub { font-size: 11px; color: var(--secondary-text-color); margin-top: 1px; opacity: .75; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .row-action { width: 36px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .add-btn { --mdc-icon-button-size: 36px; --mdc-icon-size: 18px; color: var(--primary-color); }
  .delete-btn { --mdc-icon-button-size: 36px; --mdc-icon-size: 18px; color: var(--secondary-text-color); }
  .delete-btn:hover { color: var(--error-color, #db4437); }
  .item-body { padding: 8px 12px 14px; }
  .body-label { font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--secondary-text-color); margin: 14px 0 4px; }
  .body-label:first-child { margin-top: 6px; }
  .body-label-sub { font-size: 11px; color: var(--secondary-text-color); opacity: .7; margin: -2px 0 4px; }
  .section-label { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--secondary-text-color); margin: 24px 0 0; }
  .section-label:first-child { margin-top: 0; }
  .settings-group { margin-top: 8px; }
  .srow { display: flex; align-items: center; justify-content: space-between; min-height: 48px; padding: 4px 2px; border-bottom: 1px solid var(--divider-color); gap: 8px; }
  .srow.srow-disabled { opacity: .45; pointer-events: none; }
  .settings-group .srow:last-child { border-bottom: none; }
  .srow-text { flex: 1; min-width: 0; }
  .srow-label { font-size: 14px; color: var(--primary-text-color); display: block; }
  .srow-desc  { font-size: 12px; color: var(--secondary-text-color); display: block; margin-top: 1px; }
  .srow ha-textfield { width: 110px; --text-field-padding: 0 8px; }
  .srow ha-textfield::part(root)  { height: 36px; }
  .srow ha-textfield::part(input) { height: 36px; }
  ha-switch { flex-shrink: 0; }
  .advanced-toggle { background: none; border: none; font-family: inherit; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--secondary-text-color); cursor: pointer; padding: 0; display: flex; align-items: center; gap: 6px; margin-top: 20px; width: 100%; }
  .advanced-toggle ha-icon { --mdc-icon-size: 14px; transition: transform .15s; }
  .advanced-toggle.open ha-icon { transform: rotate(180deg); }
  .advanced-content { margin-top: 8px; }
  .text-btn { background: none; border: none; font-family: inherit; font-size: var(--ha-font-size-s, 12px); color: var(--primary-color); cursor: pointer; padding: 4px 0; white-space: nowrap; }
  .text-btn:hover { text-decoration: underline; }
  .version-link { display: block; font-size: 11px; color: var(--secondary-text-color); text-decoration: none; text-align: center; padding: 10px 16px 12px; border-top: 1px solid var(--divider-color); }
  .version-link:hover { text-decoration: underline; }
`;

class PackageTrackerCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config   = null;
    this._hass     = null;
    this._built    = false;
    this._ownFire  = false;
    this._tab           = 'sources';
    this._filterAdvOpen = false;
    this._sourceExpanded = {};
  }

  set hass(hass) {
    this._hass = hass;
    this.shadowRoot.querySelectorAll('ha-form').forEach(f => { f.hass = hass; });
  }

  setConfig(config) {
    if (!this._built) { this._config = this._normalize(config); this._init(); return; }
    if (this._ownFire) { this._ownFire = false; return; }
    this._config = this._normalize(config);
    this._renderTab();
  }

  _normalize(config) {
    return {
      sources: [], layout: 'single', max: 5,
      ...config,
      show:   { carrier: true, status: true, badge: true, dim_delivered: true, location: false, brand_icon: true, hide_when_empty: false, ...(config.show   || {}) },
      filter: { state: 'all',                                                                                       ...(config.filter || {}) },
    };
  }

  _fire(config) {
    this._config  = config;
    this._ownFire = true;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
  }

  _fireAndRender(config) { this._fire(config); this._ownFire = false; this._renderTab(); }

  _init() {
    this._built = true;
    const root = this.shadowRoot;
    root.innerHTML = '';
    root.appendChild(Object.assign(document.createElement('style'), { textContent: EDITOR_CSS }));

    const card   = document.createElement('div'); card.className   = 'editor-card';
    const tabBar = document.createElement('div'); tabBar.className = 'tab-bar';

    const uiTr = TRANSLATIONS[this._hass?.language] || TRANSLATIONS['en'];
    [['sources', uiTr.sources_tab], ['filter', uiTr.filter_tab], ['appearance', uiTr.display_tab]].forEach(([id, label]) => {
      const btn = Object.assign(document.createElement('button'), {
        className: 'tab-btn' + (id === this._tab ? ' active' : ''), textContent: label,
      });
      btn.dataset.tab = id;
      btn.addEventListener('click', () => {
        if (this._tab === id) return;
        this._tab = id;
        tabBar.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === id));
        this._renderTab();
      });
      tabBar.appendChild(btn);
    });
    card.appendChild(tabBar);

    this._content = document.createElement('div'); this._content.className = 'tab-content';
    card.appendChild(this._content);
    card.appendChild(Object.assign(document.createElement('a'), {
      href: 'https://github.com/klaptafel/package-tracker-card',
      target: '_blank', rel: 'noopener noreferrer',
      className: 'version-link', textContent: 'Package Tracker Card v' + CARD_VERSION,
    }));

    root.appendChild(card);
    this._renderTab();
  }

  _renderTab() {
    this._content.innerHTML = '';
    if      (this._tab === 'sources')    this._renderSources();
    else if (this._tab === 'filter')     this._renderFilter();
    else if (this._tab === 'appearance') this._renderWeergave();
    if (this._hass) this.shadowRoot.querySelectorAll('ha-form').forEach(f => { f.hass = this._hass; });
  }

  // ── Sources ───────────────────────────────────────────────────────────────

  _renderSources() {
    const root    = this._content;
    const sources = this._config.sources || [];
    const uiTr    = TRANSLATIONS[this._hass?.language] || TRANSLATIONS['en'];

    const saveGroup = (groupTypes, updatedForGroup) => {
      const others = sources.filter(s => !groupTypes.includes(s.type));
      this._fireAndRender({ ...this._config, sources: [...others, ...updatedForGroup] });
    };

    const notice = document.createElement('p');
    notice.style.cssText = 'margin:0 0 16px;font-size:13px;color:var(--secondary-text-color);line-height:1.4;';
    notice.textContent = uiTr.sources_auto_detect_notice;
    root.appendChild(notice);

    const groups = new Map();
    for (const [type, def] of Object.entries(INTEGRATIONS)) {
      const g = def.group || type;
      if (!groups.has(g)) groups.set(g, { label: def.groupLabel || g, url: def.url, types: [] });
      groups.get(g).types.push(type);
    }

    const list = document.createElement('div'); list.className = 'item-list';

    for (const [, group] of groups) {
      const platformOk  = group.types.some(t => this._hass && isPlatformInstalled(t, this._hass));
      const groupActive = group.types.some(t => sources.some(s => s.type === t));

      const groupEl = document.createElement('div'); groupEl.className = 'source-group';

      // Header
      const header = document.createElement('div');
      header.style.cssText = 'display:flex;align-items:center;padding:0 8px 0 14px;min-height:52px;';

      header.appendChild(Object.assign(document.createElement('div'), {
        textContent: group.label,
        style: 'flex:1;font-size:14px;font-weight:500;color:' + (platformOk || groupActive ? 'var(--primary-text-color)' : 'var(--disabled-color,#9e9e9e)') + ';',
      }));

      const btnWrap = document.createElement('div'); btnWrap.className = 'row-action';

      if (groupActive) {
        // Trash button — removes all sources for this group
        const delBtn = document.createElement('ha-icon-button'); delBtn.className = 'delete-btn';
        const delIco = document.createElement('ha-icon'); delIco.setAttribute('icon', 'mdi:delete-outline');
        delBtn.appendChild(delIco);
        delBtn.addEventListener('click', () => saveGroup(group.types, []));
        btnWrap.appendChild(delBtn);
      } else if (platformOk) {
        // Add button — ha-icon-button, blue
        const addBtn = document.createElement('ha-icon-button'); addBtn.className = 'add-btn';
        const addIco = document.createElement('ha-icon'); addIco.setAttribute('icon', 'mdi:plus');
        addBtn.appendChild(addIco);
        addBtn.addEventListener('click', () => {
          const toAdd = [];
          for (const type of group.types) {
            const candidates = this._hass ? candidatesForType(type, this._hass) : [];
            const usedByOthers = sources.filter(s => s.type !== type).map(s => s.entity).filter(Boolean);
            const available = candidates.filter(e =>
              detectTypeFromHass(e, this._hass) === type && !usedByOthers.includes(e)
            );
            if (available.length) toAdd.push({ type, entity: available[0] });
          }
          saveGroup(group.types, toAdd);
        });
        btnWrap.appendChild(addBtn);
      } else if (group.url) {
        // Not installed — install link
        const link = document.createElement('a');
        link.href = group.url; link.target = '_blank'; link.rel = 'noopener';
        link.style.cssText = 'font-size:12px;color:var(--primary-color);white-space:nowrap;margin-right:4px;';
        link.textContent = uiTr.install_integration;
        btnWrap.appendChild(link);
      }

      header.appendChild(btnWrap);
      groupEl.appendChild(header);

      // Body — only shown when group is active
      if (groupActive) {
        const body = document.createElement('div');
        body.style.cssText = 'border-top:1px solid var(--divider-color);';

        group.types.forEach((type, ti) => {
          const def          = INTEGRATIONS[type];
          const sourceIdx    = sources.findIndex(s => s.type === type);
          const stored       = sourceIdx !== -1 ? sources[sourceIdx].entity : null;
          const entityExists = stored ? !!this._hass?.states[stored] : false;
          const candidates   = this._hass ? candidatesForType(type, this._hass) : [];
          const usedByOthers = sources.filter(s => s.type !== type).map(s => s.entity).filter(Boolean);
          const available    = candidates.filter(e =>
            detectTypeFromHass(e, this._hass) === type && !usedByOthers.includes(e)
          );
          const rowLabel     = (def.rowLabelKey && uiTr[def.rowLabelKey]) || def.rowLabel;
          const currentEntity = stored || null; // auto-fill only happens on initial add

          const section = document.createElement('div');
          section.style.cssText = 'padding:10px 12px 12px;' + (ti > 0 ? 'border-top:1px solid var(--divider-color);' : '');

          section.appendChild(Object.assign(document.createElement('div'), {
            className: 'body-label', textContent: rowLabel, style: 'margin-top:0;',
          }));

          if (!currentEntity && def.entityHintText && uiTr[def.entityHintText]) {
            section.appendChild(Object.assign(document.createElement('div'), {
              className: 'body-label-sub', textContent: uiTr[def.entityHintText],
            }));
          }
          if (stored && !entityExists) {
            const e = Object.assign(document.createElement('div'), {
              className: 'body-label-sub', textContent: stored + uiTr.not_found,
            });
            e.style.color = 'var(--error-color,#db4437)';
            section.appendChild(e);
          }

          const entityForm = document.createElement('ha-form');
          entityForm.schema = [{ name: 'entity', selector: { entity: {
            ...(available.length ? { include_entities: [...available, ...(stored ? [stored] : [])] } : {}),
            exclude_entities: usedByOthers,
          } } }];
          entityForm.data         = { entity: currentEntity };
          entityForm.computeLabel = () => '';
          if (this._hass) entityForm.hass = this._hass;
          entityForm.addEventListener('value-changed', (e) => {
            const entity = e.detail.value.entity ?? null;
            // Rebuild all types in this group
            const groupSources = group.types.map(t => {
              if (t === type) return entity ? { type: t, entity } : null;
              const ex = sources.find(s => s.type === t);
              return ex || null;
            }).filter(Boolean);
            saveGroup(group.types, groupSources);
          });
          section.appendChild(entityForm);
          body.appendChild(section);
        });

        groupEl.appendChild(body);
      }

      list.appendChild(groupEl);
    }

    root.appendChild(list);
  }

  // ── Filter ────────────────────────────────────────────────────────────────

  _renderFilter() {
    const root   = this._content;
    const filter = this._config.filter || {};
    const save   = (f) => this._fireAndRender({ ...this._config, filter: f });
    const upd    = (key, val) => { const f = { ...filter }; if (val !== undefined && val !== null && val !== '') f[key] = val; else delete f[key]; save(f); };
    const uiTr   = TRANSLATIONS[this._hass?.language] || TRANSLATIONS['en'];

    root.appendChild(Object.assign(document.createElement('div'), { className: 'section-label', textContent: uiTr.filter_status }));
    const statusGroup = document.createElement('div'); statusGroup.className = 'settings-group';
    const statusForm  = document.createElement('ha-form');
    statusForm.schema = [{ name: 'state', selector: { select: { options: [
      { value: 'enroute',   label: uiTr.enroute },
      { value: 'delivered', label: uiTr.delivered },
      { value: 'all',       label: uiTr.all },
    ] } } }];
    statusForm.data = { state: filter.state || 'enroute' };
    statusForm.computeLabel = () => '';
    statusForm.addEventListener('value-changed', (e) => { if (e.detail.value.state) save({ ...filter, state: e.detail.value.state }); });
    statusGroup.appendChild(statusForm);
    root.appendChild(statusGroup);

    // Direction filter — only show when both incoming and outgoing are configured
    const activeTypes    = (this._config.sources || []).map(s => s.type).filter(Boolean);
    const hasIncoming    = activeTypes.some(t => INTEGRATIONS[t]?.direction === 'incoming');
    const hasOutgoing    = activeTypes.some(t => INTEGRATIONS[t]?.direction === 'outgoing');
    if (hasIncoming && hasOutgoing) {
      root.appendChild(Object.assign(document.createElement('div'), { className: 'section-label', textContent: uiTr.filter_direction }));
      const dirGroup = document.createElement('div'); dirGroup.className = 'settings-group';
      const dirForm  = document.createElement('ha-form');
      dirForm.schema = [{ name: 'direction', selector: { select: { options: [
        { value: 'all',      label: uiTr.all },
        { value: 'incoming', label: uiTr.incoming },
        { value: 'outgoing', label: uiTr.outgoing },
      ] } } }];
      dirForm.data = { direction: filter.direction || 'all' };
      dirForm.computeLabel = () => '';
      dirForm.addEventListener('value-changed', (e) => upd('direction', e.detail.value.direction !== 'all' ? e.detail.value.direction : undefined));
      dirGroup.appendChild(dirForm);
      root.appendChild(dirGroup);
    }

    // Advanced (collapsible)
    const advBtn = document.createElement('button');
    advBtn.className = 'advanced-toggle' + (this._filterAdvOpen ? ' open' : '');
    const advIco = document.createElement('ha-icon'); advIco.setAttribute('icon', 'mdi:chevron-down');
    advBtn.appendChild(advIco);
    advBtn.appendChild(document.createTextNode(' ' + (uiTr.advanced || 'Advanced')));
    const advContent = document.createElement('div');
    advContent.className = 'advanced-content';
    advContent.style.display = this._filterAdvOpen ? '' : 'none';
    advBtn.addEventListener('click', () => {
      this._filterAdvOpen = !this._filterAdvOpen;
      advBtn.classList.toggle('open', this._filterAdvOpen);
      advContent.style.display = this._filterAdvOpen ? '' : 'none';
    });

    // Specific day
    advContent.appendChild(Object.assign(document.createElement('div'), { className: 'section-label', style: 'margin-top:0', textContent: uiTr.filter_date }));
    const dateGroup = document.createElement('div'); dateGroup.className = 'settings-group';
    dateGroup.appendChild(this._mkNumberRow(uiTr.filter_date_label || uiTr.filter_date, filter.date, null, null, '', uiTr.filter_date_desc, (val) => upd('date', val !== '' ? Number(val) : undefined)));
    advContent.appendChild(dateGroup);

    // Time slot
    advContent.appendChild(Object.assign(document.createElement('div'), { className: 'section-label', textContent: uiTr.filter_slot }));
    const slotGroup = document.createElement('div'); slotGroup.className = 'settings-group';
    const slotDisabled = (filter.state || 'enroute') !== 'enroute';
    const slotRow = this._mkToggleRow(uiTr.filter_slot_active, !!filter.slot_active, slotDisabled ? null : uiTr.filter_slot_desc,
      (val) => upd('slot_active', val || undefined),
      { disabled: slotDisabled, disabledReason: uiTr.filter_slot_requires_enroute }
    );
    slotGroup.appendChild(slotRow);
    advContent.appendChild(slotGroup);

    // Carrier
    advContent.appendChild(Object.assign(document.createElement('div'), { className: 'section-label', textContent: uiTr.filter_carrier }));
    const carrierGroup = document.createElement('div'); carrierGroup.className = 'settings-group';
    const carrierRow   = document.createElement('div'); carrierRow.className = 'srow';
    const ct = document.createElement('div'); ct.className = 'srow-text';
    ct.appendChild(Object.assign(document.createElement('span'), { className: 'srow-label', textContent: uiTr.carrier_code }));
    const cd = Object.assign(document.createElement('span'), { className: 'srow-desc' });
    cd.innerHTML = uiTr.carrier_code_desc + '<a href="https://parcel.app/supported-carriers" target="_blank" rel="noopener" style="color:var(--primary-color)">' + uiTr.all_codes + '</a>';
    ct.appendChild(cd); carrierRow.appendChild(ct);
    const cf = document.createElement('ha-textfield');
    cf.value = filter.carrier || ''; cf.setAttribute('placeholder', 'dpdgroup'); cf.style.width = '120px';
    cf.addEventListener('change', () => upd('carrier', cf.value));
    carrierRow.appendChild(cf); carrierGroup.appendChild(carrierRow);
    advContent.appendChild(carrierGroup);

    root.appendChild(advBtn);
    root.appendChild(advContent);
  }

  // ── Weergave ──────────────────────────────────────────────────────────────

  _renderWeergave() {
    const root  = this._content;
    const c     = this._config;
    const show  = c.show || {};
    const uiTr  = TRANSLATIONS[this._hass?.language] || TRANSLATIONS['en'];

    root.appendChild(Object.assign(document.createElement('div'), { className: 'section-label', textContent: uiTr.layout }));
    const layoutGroup = document.createElement('div'); layoutGroup.className = 'settings-group';
    const layoutForm  = document.createElement('ha-form');
    layoutForm.schema = [{ name: 'layout', selector: { select: { options: [
      { value: 'single', label: uiTr.single_card },
      { value: 'split',  label: uiTr.split_cards },
    ] } } }];
    layoutForm.data = { layout: c.layout || 'single' };
    layoutForm.computeLabel = () => '';
    layoutForm.addEventListener('value-changed', (e) => { if (e.detail.value.layout) this._fireAndRender({ ...c, layout: e.detail.value.layout }); });
    layoutGroup.appendChild(layoutForm);
    layoutGroup.appendChild(this._mkNumberRow(uiTr.max_packages, c.max || 10, 1, 50, '', null, (val) => this._fireAndRender({ ...c, max: val !== '' ? Number(val) : 10 })));
    root.appendChild(layoutGroup);

    root.appendChild(Object.assign(document.createElement('div'), { className: 'section-label', textContent: uiTr.show }));
    const showGroup = document.createElement('div'); showGroup.className = 'settings-group';
    const mkShow = (label, key, desc) => this._mkToggleRow(label, show[key] !== false, desc,
      (val) => this._fireAndRender({ ...c, show: { ...show, [key]: val } })
    );
    showGroup.appendChild(mkShow(uiTr.status,   'status',   uiTr.status_desc));
    showGroup.appendChild(mkShow(uiTr.carrier,  'carrier',  uiTr.carrier_desc));
    const carrierOff = show.carrier === false;
    const brandRow = this._mkToggleRow(uiTr.carrier_logo, show.brand_icon !== false, carrierOff ? null : uiTr.carrier_logo_desc,
      (val) => this._fireAndRender({ ...c, show: { ...show, brand_icon: val } }),
      { disabled: carrierOff, disabledReason: uiTr.carrier_logo_requires_carrier }
    );
    if (!carrierOff && uiTr.carrier_logo_link) {
      const descEl = brandRow.querySelector('.srow-desc');
      if (descEl) {
        const link = document.createElement('a');
        link.href = 'https://github.com/elax46/custom-brand-icons';
        link.target = '_blank'; link.rel = 'noopener';
        link.style.color = 'var(--primary-color)';
        link.textContent = uiTr.carrier_logo_link;
        descEl.appendChild(document.createTextNode(' '));
        descEl.appendChild(link);
      }
    }
    showGroup.appendChild(brandRow);
    showGroup.appendChild(mkShow(uiTr.badge,    'badge',    uiTr.badge_desc));
    showGroup.appendChild(this._mkToggleRow(uiTr.location, !!show.location, uiTr.location_desc,
      (val) => this._fireAndRender({ ...c, show: { ...show, location: val } })
    ));
    root.appendChild(showGroup);

    root.appendChild(Object.assign(document.createElement('div'), { className: 'section-label', textContent: uiTr.behaviour }));
    const behavGroup = document.createElement('div'); behavGroup.className = 'settings-group';
    behavGroup.appendChild(mkShow(uiTr.dim_delivered,  'dim_delivered',  uiTr.dim_delivered_desc));
    behavGroup.appendChild(mkShow(uiTr.hide_when_empty,'hide_when_empty', uiTr.hide_when_empty_desc));
    root.appendChild(behavGroup);
  }

  // ── DOM helpers ───────────────────────────────────────────────────────────

  _mkToggleRow(label, checked, description, onChange, { disabled = false, disabledReason = null } = {}) {
    const row = document.createElement('div'); row.className = 'srow' + (disabled ? ' srow-disabled' : '');
    const tw  = document.createElement('div'); tw.className  = 'srow-text';
    tw.appendChild(Object.assign(document.createElement('span'), { className: 'srow-label', textContent: label }));
    const desc = disabled ? disabledReason : description;
    if (desc) tw.appendChild(Object.assign(document.createElement('span'), { className: 'srow-desc', textContent: desc }));
    const sw = document.createElement('ha-switch'); sw.checked = checked;
    if (disabled) sw.setAttribute('disabled', '');
    else sw.addEventListener('change', () => onChange(sw.checked));
    row.append(tw, sw);
    return row;
  }

  _mkNumberRow(label, value, min, max, unit, description, onChange) {
    const row = document.createElement('div'); row.className = 'srow';
    const tw  = document.createElement('div'); tw.className  = 'srow-text';
    tw.appendChild(Object.assign(document.createElement('span'), { className: 'srow-label', textContent: label }));
    if (description) tw.appendChild(Object.assign(document.createElement('span'), { className: 'srow-desc', textContent: description }));
    const field = document.createElement('ha-textfield');
    field.type = 'number';
    if (min !== null) field.setAttribute('min', min);
    if (max !== null) field.setAttribute('max', max);
    if (unit) field.setAttribute('suffix', unit);
    field.setAttribute('no-spinner', '');
    field.value = (value !== undefined && value !== null) ? value : '';
    field.addEventListener('change', () => onChange(field.value));
    row.append(tw, field);
    return row;
  }
}

customElements.define('package-tracker-card-editor', PackageTrackerCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'package-tracker-card', name: 'Package Tracker Card',
  description: 'Track packages from PostNL and Parcel integrations.',
  preview: true,
});