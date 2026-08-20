#!/usr/bin/env node
// Reports per-locale translation completeness against English, run in CI on
// every push/PR. Not a build step: this project intentionally ships
// package-tracker-card.js as-is, straight to the browser, no bundler
// involved. The file itself can't be require()'d directly either, since
// its classes extend HTMLElement at module scope, evaluated immediately
// even outside a browser; only the TRANSLATIONS object itself is pulled
// out here, via the same narrow regex + indirect eval already used to
// verify this by hand while reviewing translation PRs.
//
// A locale missing some keys is expected and fine (resolveTr falls back to
// English per key, see package-tracker-card.js), so that alone doesn't fail
// this check, it's just reported for visibility. A key that exists in a
// locale but not in English at all is almost always a typo of the real key
// name, silently wasting whatever text a translator wrote for it since
// nothing will ever read that key, so that does fail the check, unless it's
// listed below: a deliberate, opt-in, locale-specific key that other
// locales read with a fallback (e.g. `tr.day_num_suffix || ''`) rather than
// requiring, so it's intentionally absent from English.
const LOCALE_SPECIFIC_KEYS = new Set([
  'day_num_suffix', // ordinal-dot suffix after a day number, e.g. Czech "20. srpna"
]);

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'package-tracker-card.js');
const src = fs.readFileSync(filePath, 'utf8');

const match = src.match(/const TRANSLATIONS = \{([\s\S]*?)\n\};\n/);
if (!match) {
  console.error('Could not find the TRANSLATIONS object in package-tracker-card.js');
  process.exit(1);
}

const TRANSLATIONS = (0, eval)('(function(){ const TRANSLATIONS = {' + match[1] + '}; return TRANSLATIONS; })()');

const baseKeys = new Set(Object.keys(TRANSLATIONS.en));
let hasUnknownKeys = false;

for (const lang of Object.keys(TRANSLATIONS).sort()) {
  if (lang === 'en') continue;
  const keys = new Set(Object.keys(TRANSLATIONS[lang]));
  const missing = [...baseKeys].filter((k) => !keys.has(k));
  const unknown = [...keys].filter((k) => !baseKeys.has(k) && !LOCALE_SPECIFIC_KEYS.has(k));

  const total = baseKeys.size;
  const have = total - missing.length;
  console.log(`${lang}: ${have}/${total} keys`);
  if (missing.length) {
    console.log(`  missing (falls back to English): ${missing.join(', ')}`);
  }
  if (unknown.length) {
    hasUnknownKeys = true;
    console.log(`  unknown key(s), not in English at all, likely a typo: ${unknown.join(', ')}`);
  }
}

if (hasUnknownKeys) {
  console.error('\nFound translation key(s) with no English counterpart. Fix the typo, or add the key to English too if it is intentionally locale-specific.');
  process.exit(1);
}
