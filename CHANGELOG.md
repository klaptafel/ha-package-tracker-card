# Changelog

All notable changes to this project are documented here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/). Versions before 1.2.0 are not retroactively documented: see git history / GitHub releases for those.

## [Unreleased]

### Added

- **Dragonfly Shipping source** — supports [ha-parcel-integrations/ha-dragonfly](https://github.com/ha-parcel-integrations/ha-dragonfly)
  (Dragonfly Shipping / dragonflyshipping.nl). Two source types:
  `dragonfly_incoming` and `dragonfly_delivered`, auto-detected like the
  other canonical carriers. Parcels map to the existing "Dragonfly
  Netherlands" carrier entry, with its brand icon slot ready for whenever
  custom-brand-icons adds a Dragonfly logo.

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
