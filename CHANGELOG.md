# Changelog

All notable changes to this project are documented here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/). Versions before 1.2.0 are not retroactively documented: see git history / GitHub releases for those.

## [2.1.0] - 2026-08-07

Sixteen carriers that previously showed a blank icon now get their real logo, now that custom-brand-icons has added them: Dragonfly, Cainiao, InPost, Vinted Go, An Post, Australia Post, Austrian Post, Bring, CTT, Japan Post, La Poste, New Zealand Post, Poczta Polska, Mondial Relay, Swiss Post, and SunYou. Also added three carriers this card's list was missing (J&T Express, Redur, Rincos) and a few missing postcode-tracking variants (Colis Privé, Mondial Relay, PostNL), catching the full carrier list up to Parcel's own current list.

### Added
- Brand icons for 16 carriers that previously showed no logo, now that custom-brand-icons has added them (2026.07.2 through 2026.07.5): Dragonfly, Cainiao (ha-cainiao's own generically-detected carrier name, separate from the existing AliExpress/Cainiao entry), InPost, Vinted Go, An Post, Australia Post, Austrian Post, Bring, CTT, Japan Post, La Poste (Colissimo), New Zealand Post, Poczta Polska, Mondial Relay, Swiss Post, and SunYou (Sypost).
- J&T Express, Redur, and Rincos as Parcel (jmdevita/parcel-ha) carriers, plus postcode-tracking variants for Colis Privé, Mondial Relay, and PostNL. All 6 confirmed against Parcel's own [supported_carriers.json](https://api.parcel.app/external/supported_carriers.json), which this card's carrier list had fallen 5 entries behind (J&T Express also gets its new custom-brand-icons logo).

## [2.0.0] - 2026-07-30

**🚀 Any ha-parcel-integrations carrier is now recognized automatically**
[Every carrier in that organization](https://github.com/ha-parcel-integrations#integrations) (PostNL, DHL NL, DPD, GLS, Dragonfly, Vinted Go, and whatever joins next) exposes its parcels the same way. This card now reads that convention directly from your entities, so a brand-new family member shows up in the Sources editor and on the card the moment you install it. Existing configs for these carriers keep working as-is and migrate to the simpler new shape automatically the next time they're saved through the editor.

**🎉 Cards now work with zero configuration**
Add the card with no `sources` list at all and it shows every package it recognizes automatically; use `filter` to narrow that down for a specific card instance instead (e.g. one account only). Adding any explicit source switches that card back to showing just what's listed, same as before. Existing configs that already list sources are unaffected either way.

**⚠️ Breaking: Parcel Aggregator and the original arjenbos/ha-postnl integration are no longer supported**
- If you use [Parcel Aggregator](https://github.com/ha-parcel-integrations/ha-parcel-aggregator): you won't notice anything. It only ever relayed carriers you already had installed as their own ha-parcel-integrations member, and that member is now read directly (see above), so your packages keep showing up exactly as before, no action needed on your end.
- If you use the original [arjenbos/ha-postnl](https://github.com/arjenbos/ha-postnl) integration: you'll stop seeing PostNL packages through this card. Install [ha-parcel-integrations/ha-postnl](https://github.com/ha-parcel-integrations/ha-postnl) instead, the actively maintained PostNL integration it was superseded by; the Sources editor picks it up automatically once it's installed.

Either way, any old `parcel_aggregator_*` or `postnl_incoming`/`postnl_outgoing` source still in your config is automatically dropped the next time it's saved, no crash.

<hr>

*While you're here: tired of the ever growing update list? [Update Manager](https://github.com/HA-Update-Manager/ha-update-manager) is a new integration that lets you set your own rules for which updates install automatically, and holds off if the community has already flagged a release as broken.*

### Added
- Generic detection for any current or future ha-parcel-integrations family member: the Sources editor now
  discovers these carriers straight from your Home Assistant entities, grouped per account where relevant
  (including that account's own PostNL Letters, shown alongside its parcel rows instead of separately),
  without needing a dedicated entry in this card for each one.
- A plain empty-state message with a link to this README when no supported integration is detected or
  configured at all, replacing the per-integration "not yet installed" prompts removed below.
- `sources` is now optional. Leave it empty and the card shows everything it recognizes automatically
  instead of nothing; use `filter` to narrow that down for a specific card instance (e.g. one account only).
  Adding any explicit source switches that card back to showing just what's listed, same as before.
- A link to the [ha-parcel-integrations](https://github.com/ha-parcel-integrations) organization page next
  to each carrier the Sources editor discovers, so you can always find its specific repo even though this
  card no longer keeps its own list of member repos.
- A configured source whose entity is later renamed or removed now shows up in its own small section in
  the Sources editor with a working remove button, instead of silently becoming invisible with no way to
  clean it up short of editing the YAML by hand.

### Changed
- Sources for a recognized family carrier no longer need a `type` in the config; just `entity`. Existing
  configs with the old `type` value are migrated to this simpler shape automatically the next time the
  Sources editor saves a change. Non-family sources (the plain "parcel" integration, PostNL's Letters) are
  unaffected.
- The "not yet installed, click to install" prompts are removed from the Sources editor entirely, including
  for the one remaining integration that still used them (jmdevita/parcel-ha): they can't be shown for
  something detected live from your entities, and by now only served that single case, no longer worth a
  whole separate "more integrations" toggle.
- Two accounts of the same recognized carrier now always get their own separate row in the Sources editor,
  even if one of them has no device name in Home Assistant (it gets a generic "Account N" label instead).

### Removed
- Parcel Aggregator support (see breaking-change note above): its own `INTEGRATIONS` entries, carrier-name
  resolution, and CARRIERS code mappings are gone from this card.
- The original arjenbos/ha-postnl integration (see breaking-change note above).

## [1.6.0] - 2026-07-27

**Trunkrs and AliExpress Shipping (Cainiao) now have brand icons**
Both carriers already appeared in the carrier list; they just didn't have a logo yet. Now that
custom-brand-icons has added them, install/update that companion resource to see the icons.

**Parcel Aggregator now recognizes brand-new family carriers automatically**
If you use Parcel Aggregator to combine several carriers into one set of sensors, parcels from Trunkrs,
Cainiao, Hermes and Correos now show their real name and brand icon there too, instead of a plain
lowercase label with no logo. Most future carriers added to the family will pick this up automatically as
well, without needing an update to this card.

### Added
- Brand icons for **AliExpress Shipping (Cainiao)** and **Trunkrs**, now that custom-brand-icons has added
  `phu:cainiao`/`phu:trunkrs` (both carriers already existed in the list, just without a logo slot filled
  in yet).
- Four new ha-parcel-integrations family members (Trunkrs, Cainiao, Hermes, Correos) now get a proper
  name and icon when their parcels come through a Parcel Aggregator source, instead of falling back to
  the raw, lowercased carrier label with no logo. No new dedicated source type for any of them: the
  aggregator already auto-discovers every family integration on its own, so this card only needed the
  `parcel_aggregator` carrier-code mapping, not a native per-carrier integration the way DHL NL/PostNL/
  DPD/GLS/Dragonfly have.
- A brand-new family carrier reaching this card only through the Parcel Aggregator (no explicit
  `parcel_aggregator` CARRIERS entry of its own yet) now gets the aggregator's own correctly-cased name
  automatically (e.g. "Trunkrs", not "trunkrs"), and a guessed `phu:<carrier>` icon that works whenever
  the icon's slug happens to match the lowercased carrier name (true for every family carrier so far).
  Guessing wrong is harmless: custom-brand-icons' own icon lookup returns nothing for an unrecognised
  name rather than erroring, so ha-icon just renders empty instead of showing a broken icon. A carrier
  whose real icon slug doesn't match its name (like GLS's `gls-group`) still needs an explicit
  `parcel_aggregator` code/icon pair, same as before.

## [1.5.0] - 2026-07-18

**Adds a "More integrations" collapsible section to the Sources editor**
Once at least one supported integration is detected as installed, the remaining not-yet-installed integrations move behind a toggle instead of always being listed inline, keeping the list manageable as the supported family keeps growing.

**Fixes the card footer and documentation links**
Both pointed at a URL missing the `ha-` prefix and so 404'd.

### Added
- A "More integrations" collapsible section in the Sources editor: once at least one supported integration is detected as installed, the remaining not-yet-installed integrations move behind a toggle instead of always being listed inline. A card with nothing installed yet still shows the full list, so there's still something to discover on first open.

### Changed
- `aggregatedBy` (hides an individual carrier's source once Parcel Aggregator is detected) now defaults on for every carrier built from the shared canonical entry factory, instead of being hand-placed on one type per carrier group; new integrations added to the family get this automatically.

### Fixed
- The footer link and `documentationURL` both pointed to `github.com/klaptafel/package-tracker-card` instead of `github.com/klaptafel/ha-package-tracker-card`, a 404. Present since the project's first release.

## [1.4.0] - 2026-07-17

**Adds Dragonfly Shipping support**
A new package source for Dragonfly Shipping (dragonflyshipping.nl).

**Adds a Parcel Aggregator source**
Merges several carriers into one set of sensors; once detected, the editor hides the individual carriers it covers to avoid double-counting the same parcels.

**Carrier integration links updated**
Links throughout the README and editor now point to the integrations' new shared home.

### Added

- **Dragonfly Shipping source** — supports [ha-parcel-integrations/ha-dragonfly](https://github.com/ha-parcel-integrations/ha-dragonfly)
  (Dragonfly Shipping / dragonflyshipping.nl). Two source types:
  `dragonfly_incoming` and `dragonfly_delivered`, auto-detected like the
  other canonical carriers. Parcels map to the "Dragonfly" carrier entry,
  with its brand icon slot ready for whenever custom-brand-icons adds a
  Dragonfly logo.

- **Parcel Aggregator source** — supports
  [ha-parcel-integrations/ha-parcel-aggregator](https://github.com/ha-parcel-integrations/ha-parcel-aggregator),
  which merges DHL NL, PostNL, DPD, GLS, and Dragonfly into one set of
  sensors. Four source types (`parcel_aggregator_incoming/outgoing/
  delivered/outgoing_delivered`) resolve each parcel's carrier badge and
  icon from its own `carrier` label, so it always shows the right brand
  regardless of which carrier a given parcel came from. Once detected,
  the editor offers only the aggregator and hides the five individual
  carriers to avoid double-counting the same parcels; any of them you'd
  already configured on their own stay put.

### Changed

- **Carrier integration links point to their new home** — PostNL, DHL NL,
  DPD, and GLS (all originally peternijssen's) have moved to the shared
  [ha-parcel-integrations](https://github.com/ha-parcel-integrations) org;
  every link in the README and in the editor's "not installed" download
  links now points there instead of the old per-maintainer repos.

- **Dropped the "Beta" badge from every source** (GLS, Dragonfly, Parcel
  Aggregator) in the Sources tab. All three read data through the same
  well-established canonical `parcels` shape the stable carriers already
  use, so the extra warning wasn't earning its keep.

## [1.3.1] - 2026-07-14

Fixes a bug where one malfunctioning source could crash the whole card instead of just showing an error for that one source, and a broken "Open in HACS" badge link. Also some internal cleanup with no visible effect.

### Fixed
- The "Open your Home Assistant instance" HACS badge in the README used an invalid category (`dashboard`), which made the link error out; now uses `plugin`, the correct HACS category for a Lovelace card.
- One source's `collect()` throwing (e.g. an integration shipping an unexpected attribute shape) could previously crash the whole card's render, taking down every other source's already-working packages too; now caught and logged per source.

### Changed
- `findPostnlLetterImage` now builds an id → entity_picture lookup once per `collect()` call instead of rescanning all of `hass.states` for every letter.
- `_collectItems()` now caches each source's collected items keyed by that source's `last_updated`, only re-running `collect()` for sources that actually changed instead of every source on every relevant `hass` tick.
- `mapCanonicalParcel()` split into smaller named helpers (`resolveCanonicalName`, `resolveCanonicalPackageSize`, `resolveCanonicalEvents`, `resolveCanonicalDeliverySlot`) for readability; no behavior change.
- The 14 near-identical DHL NL/DPD/GLS/PostNL-canonical `INTEGRATIONS` entries now go through a shared `mkCanonicalEntry()` factory instead of each repeating the same `hasAttrs`/`collect` boilerplate; verified field-for-field against the previous entries, no behavior change.

## [1.3.0] - 2026-07-13

Adds support for PostNL/DHL NL/DPD's newer "outgoing, delivered" parcels: returns that have arrived back with the sender now show up as their own "Outgoing (delivered)" entry instead of being lumped in with regular deliveries. Carrier status text is now more descriptive (showing the carrier's own wording instead of a generic phrase), rows are aligned more closely with Home Assistant's native Tile card look, and a handful of small bugs are fixed: icons no longer drift toward the middle on long entries, PostNL letterbox parcels keep their scan photo, and editor fields no longer lose focus while you're typing in them.

### Added
- Detection support for the new `outgoing_delivered_parcels` sensor added by PostNL 4.3.0+/DHL NL 2.4.0+/DPD 2.4.0+, shown as "Outgoing (delivered)" instead of being misclassified as a regular delivered parcel. Its entity_id also happens to contain the plain "Outgoing" type's hint as a substring (e.g. `postnl_outgoing_delivered_parcels` contains `postnl_outgoing`), which tied in the hint-scoring disambiguation and made detection fall back to "Incoming" instead; same collision already excluded between "Delivered" and "Outgoing (delivered)", now also excluded between "Outgoing" and "Outgoing (delivered)" for all three carriers. This is what caused the Sources tab's "Outgoing (delivered)" entity picker to show every entity unfiltered instead of just the relevant sensor, and made it get silently skipped by the group auto-fill button.
- `stripDefaults()`/`deepEqual()` so only non-default config is written back to YAML.
- `customElements.define` guards, `documentationURL`/`version` on `window.customCards.push`.
- `getGridOptions()` for the Sections dashboard view.

### Changed
- Row layout, icon size, padding, and typography brought in line with Home Assistant's native Tile card (24px icon glyph, 36px icon background, matching font tokens with fallback values matching HA's actual token definitions), including a 1px alignment fix to match `ha-card`'s real border-box behavior.
- README title given an SEO-friendly subtitle (": Home Assistant parcel tracking card"), matching the rest of this HACS collection.

### Fixed
- Icon no longer sinks to vertical center on rows with long/multi-line content; stays anchored to the top like short rows do.
- PostNL `LetterboxParcel` items (announced as both a letter and a package) now keep the letterbox scan photo after merging. More generally, PostNL's human-readable `raw_status` (e.g. "Bezorger is onderweg") is now always preferred as the primary status line over the translated canonical status ("In transit.") whenever it's not DHL NL/DPD-style machine code; not just when the canonical status is literally "unknown", since it's consistently more specific either way.
- Missing whitespace between an expanded parcel's image and its timeline.
- Empty state now names the specific source entity that couldn't be found, instead of failing silently.
- The editor's numeric `ha-form` fields (e.g. "Max packages", a filter's day count) could lose focus after a single keystroke. Cause: `setConfig()`'s `_ownFire` guard was a single-use boolean, and this file's version had no timeout fallback at all: if Lovelace's echo of our own `config-changed` never arrived (or arrived more than once), the flag could either stay stuck `true` forever (silently ignoring the next real external change) or let a genuine echo fall through to a destructive `_renderTab()` mid-edit, both confirmed possible in practice. Replaced with a content-based check: `_fire()` now remembers exactly what it last dispatched, and `setConfig()` compares the incoming config against that (via the existing `deepEqual()`) instead of relying on a flag; every echo is caught regardless of timing or count, and a stuck flag can no longer happen.
- `getStubConfig()` spread the entire `CARD_DEFAULTS` object into a freshly-added card's initial config, writing a full `show:`/`filter:` block into the YAML instead of just `sources: []`. This initial config never goes through `stripDefaults()` (that only runs on later edits), so it was the one place defaults leaked into stored config verbatim, defeating the point of having `stripDefaults()` at all. Now returns just `{ sources: [] }`; `setConfig()` already merges `CARD_DEFAULTS` in at runtime, so nothing is lost.
