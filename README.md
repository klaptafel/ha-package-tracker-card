[![Made for Home Assistant](https://img.shields.io/badge/Made%20for-Home%20Assistant-blue?style=for-the-badge&logo=homeassistant)](https://www.home-assistant.io/)
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge)](https://github.com/hacs/integration)

# Package Tracker Card: Home Assistant parcel tracking card

> [!NOTE]
> This card is vibe coded

A Home Assistant Lovelace card that shows your packages from multiple carrier integrations in one clean, unified view.

[![Package Tracker Card](images/preview.png)](images/preview.png)

---

## Features

- **Works out of the box**: add the card with no configuration at all and it shows every package it recognizes automatically, no `sources` list required.
- **One card, multiple sources**: combine integrations from multiple carriers side by side, deduplicated automatically when the same parcel shows up through more than one source.
- **Expandable detail per package**: tracking code (tap to copy), full event timeline, and package size/weight when the carrier provides it.
- **Auto-detecting editor**: want to narrow the card down to specific integrations or accounts instead? Open the editor, click **+** next to a detected one, done. Multiple accounts of the same integration are detected and managed separately. No YAML required either way.
- **Recipient per account**: give each account a name and every package from it shows whose it is, so one card works for a whole household.
- **Filter & layout options**: filter by carrier, status, direction, or delivery window; single combined card or split incoming/outgoing cards.

---

## Installation

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=klaptafel&repository=ha-package-tracker-card&category=plugin)

1. Go to **HACS** → three-dot menu → **Custom repositories**.
2. Enter `https://github.com/klaptafel/ha-package-tracker-card`, category **Dashboard**, click **Add**.
3. Find **Package Tracker Card** and click **Download**.

---

## Configuration

The visual editor covers everything: **Sources**, **Filter**, **Appearance**.

### Sources

`sources` is optional. Leave it empty (or omit it) and the card shows everything it recognizes automatically; use `filter` (below) to narrow that down per card instance. Add specific sources here instead to limit a card to just those.

- Any integration/carrier from [ha-parcel-integrations](https://github.com/ha-parcel-integrations) (e.g. PostNL, DHL, DPD) is detected automatically the moment it's installed.
- [jmdevita/parcel-ha](https://github.com/jmdevita/parcel-ha): a third-party aggregator covering several carriers generically; works alongside a carrier's own integration too, the card merges parcels automatically.

| Option    | Default  | Description                                                                                          |
| --------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `sources` | `[]` | List of sources. An ha-parcel-integrations source just needs `entity`; others also need `type`. Empty or omitted shows everything auto-detected instead. |

#### Recipient per account

Sharing one card between several people? Give each account a **Recipient** in the editor and its name appears in front of every package from that account, e.g. `Mirella · Silky Smooth Underwear`. The field sits under the account in the **Sources** tab, right where you pick its entities; it applies to all of that account's sensors at once (incoming, delivered, outgoing, letters). Leave it empty and nothing is shown, exactly as before.

Since the name is stored on the source itself, the account has to be added first (the **+** next to it) — with nothing added the card auto-detects everything and there's no entry to attach a name to. In YAML:

```yaml
sources:
  - entity: sensor.rononline_gmail_com_postnl_incoming_parcels
    label: Ron
  - entity: sensor.mirelladejong17_gmail_com_postnl_incoming_parcels
    label: Mirella
```

Turn the names off again without removing them under **Appearance** → **Recipient**.

### Filter

| Option        | Default | Description                                                                                  |
| ------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `state`       | `all`   | `all`, `enroute`, or `delivered`.                                                               |
| `direction`   | -       | `incoming` or `outgoing`.                                                                      |
| `carriers`    | -       | Filter by one or more carrier codes, e.g. `[dpdgpcode]`. The editor offers these as a dropdown populated from your own sources; easier than looking codes up. The older singular `carrier` (string) still works for existing configs. |
| `slot_active` | `false` | Active delivery window only.                                                                   |
| `date`        | -       | Relative day. `0` = today, `1` = tomorrow, `-1` = yesterday.                                    |

### Appearance

**Layout**

| Option    | Default  | Description                                    |
| --------- | -------- | ---------------------------------------------- |
| `layout`  | `single` | `single` or `split`.                           |
| `max`     | `5`      | Maximum packages to show.                      |

**Show**

| Option            | Default | Description                                                                                   |
| ----------------- | ------- | ----------------------------------------------------------------------------------------------- |
| `recipient`       | `true`  | Recipient name in front of the package name, for accounts that have a `label` (see [Recipient per account](#recipient-per-account)). |
| `status`          | `true`  | Status line.                                                                                     |
| `carrier`         | `true`  | Carrier name.                                                                                    |
| `brand_icon`      | `true`  | Carrier logo. Requires [custom-brand-icons](https://github.com/elax46/custom-brand-icons).        |
| `details`         | `true`  | Expandable chevron with extra info per package: event timeline, tracking code, package size, or letter scan. |
| `badge`           | `true`  | Days until delivery on the icon.                                                                 |
| `location`        | `false` | Last known location.                                                                              |

**Behaviour**

| Option            | Default | Description                                |
| ----------------- | ------- | ------------------------------------------- |
| `dim_delivered`   | `true`  | Delivered packages at reduced opacity.      |
| `hide_when_empty` | `false` | Hide the card when there are no packages.   |
