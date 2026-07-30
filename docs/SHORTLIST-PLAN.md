# Shortlist / Favorites — plan

Status: **Phase 0 + availability pass BUILT 2026-07-30** (uncommitted; see
"Implementation status" at the end of §3 area / the admin checklist below).
Plan written 2026-07-30.
Goal: the best scale-selection system in handpans — keeps people exploring,
builds a first-party data asset, and converts.
ESP: **Mailchimp** (active audience, kept — see §5 Storage).

## Admin checklist (Ralf — theme code is done, these are store-side)

1. **Rename titles in admin** to match the CSV (drop " - 440Hz", "E-Amara" →
   "E Amara"). Renaming does not change handles. The theme's `remove:` filters
   stay as a safety net until go-live.
2. **Inventory policy per class** — verify in admin what the CSV now encodes:
   range instruments `continue`, one-offs `deny`. The five in-stock Premium
   (Pygmy 21, Aegean 18, Ashakiran 19 Spotted, Amara 20, Aavartan 17) were
   flipped deny→continue in the CSV.
3. **Specials classified (Ralf, 2026-07-30) — CSV updated, mirror in admin:**
   D Kurd 14 = production model (policy `continue`); E Equinox 19 and
   E Asha 20 = one-offs (`one-off` tag, policy `deny`).
4. **D Kurd 13 (Ralf, 2026-07-30) — CSV updated, mirror in admin:** qty **8**,
   `ships:2026-08-20`. Badge reads "Made for you — ships 20 August 2026" and
   flips itself to "In stock" when the date passes.
5. **Elements PARKED until product photos exist** (Ralf, 2026-07-30). CSV rows
   kept but set to status **draft**; `productHandle` commented out in
   `ayasa-data.js` so the cards render unlinked with "Coming soon" (no heart,
   no dead link). To launch them: photos on the products → status active →
   uncomment the three `productHandle` lines. Note: **no `free-tshirt` tag** —
   assumed a Premium perk; add it if Elements should include the shirt.
6. **Instruments collection**: if it's a manual list, make it automated with
   condition "inventory stock > 0" OR just rely on the theme's one-off
   filtering (already live). Automated is the cleaner backstop.
7. **Shopify Flow** (level 1): create "variant inventory reached 0 → email
   ralf@" for products tagged `instrument`, excluding `one-off`.
8. **Enable double opt-in** (Settings → Notifications → double opt-in) — the
   waitlist popup uses the customer form, which marks signups as subscribed;
   double opt-in makes that consent GDPR-clean and logged.
9. **Range-section copy**: the Elements grid heading still says
   "New · built in the UK" / "tuned and finished in Britain"
   (`sections/ayasa-range.liquid` schema defaults) — now wrong for the EU
   store where EU makers build Elements. Ralf is drafting the wording in a
   Google Doc; swap it in before go-live.
10. **440 Hz**: with the suffix gone from titles, state the tuning once
    somewhere permanent (product spec line / Ember Steel section).
11. **Connect Mailchimp** (decided 2026-07-30): install the official
    "Mailchimp: Email Marketing" app (by Intuit) from the Shopify App Store and
    connect it to the **existing active audience** — one audience, segments by
    tag. Shopify customer tags (`shortlist-waitlist`, `newsletter`,
    `wants:{handle}`, `notify-availability`) sync as Mailchimp tags;
    subscribe/unsubscribe syncs both ways. Availability-improved send list in
    Mailchimp = tag `notify-availability` AND tag `wants:{scale}`. Keep double
    opt-in on in ONE system only (see §5). Then verify the pipeline once:
    popup signup → Shopify customer with tags → same contact + tags in
    Mailchimp.

---

## 1. Naming

Heart icon (universal affordance, no explanation needed) + the word
**"Shortlist"** everywhere in text ("Your shortlist", "Add to shortlist").

"Favorites" reads like a browser bookmark. "Shortlist" reads like someone
deciding on a €2,500 instrument, and it *implies comparison* — which is the
feature that actually sells.

---

## 2. Three decisions to make up front

### 2.1 Do NOT gate the first favorite behind an account — recommended

Ralf's question: make an account mandatory?

**Recommendation: no. Local-first, then a soft prompt at 2–3 favorites.**

Reasoning:

- Favoriting is a *micro-commitment*. It works because it costs nothing. Put a
  signup wall in front of it and most people don't sign up — they just don't
  favorite. You lose the behaviour that generates the data.
- The retargeting you actually care about (Meta / Google custom audiences) fires
  from the **pixel**, not from an account. Anonymous browsers are retargetable.
  Accounts only add *email* as a channel. So gating buys email addresses at the
  cost of favorite volume — and fewer favorites means fewer pixel events too.
  Bad trade.
- The value exchange only exists once there's something to save. At 0 favorites,
  "make an account" is a toll. At 3 favorites, "save your shortlist so you can
  come back to it on your phone" is a *service* — and that's the moment consent
  conversion is highest and the intent signal is strongest.

So: **free to favorite, prompted to save.** The prompt at 2–3 favorites converts
better than a wall at 0, and the people who accept are pre-qualified.

If accounts are used: Shopify **new customer accounts** (email one-time code, no
password) rather than classic accounts. Far less friction, no password to forget.

### 2.2 The pre-checked newsletter box won't fly in the EU

Two specific problems with "pre-checked newsletter + bundled into the terms":

- Under GDPR, consent must be an unambiguous affirmative act. **Pre-ticked boxes
  are explicitly not valid consent.** If a competitor or a customer complains,
  the whole list's consent basis is in question.
- Bundling marketing consent into "accept the terms" also fails — consent has to
  be freely given and separate, not a condition of using the feature.

What to do instead, which converts *better* anyway:

- **Unchecked** box, but framed as a benefit rather than a subscription:
  *"Email me when one of my shortlisted scales is back in stock, plus the
  occasional note from the workshop."* People tick that. They don't tick
  "subscribe to our newsletter".
- **Separate, granular:** one tick for shortlist/stock notifications, one for
  marketing. Terms acceptance stays its own thing.
- **Existing customers** are easier: under Dutch/EU soft opt-in you can email
  your own customers about similar products with a clear opt-out. So the
  purchase-based list needs no tick at all.
- Log consent (timestamp, wording shown, IP) — Shopify/Mailchimp do this if the
  form is wired through them.

Net effect: a smaller list that's legally clean and actually opens emails. For a
maker with a few hundred instruments a year, list *quality* is the whole game.

### 2.3 The heart is never primary while a working buy button exists

Corrected after Ralf's note (2026-07-30): built-to-order is **paid in full
upfront**, so it is a live, revenue-generating sale, not a waiting list. Lumping
it in with sold-out was wrong.

### 2.3b Availability simplified to two states (Ralf, 2026-07-30)

Agreed change: collapse availability to **two** states, matching the product page
wording everywhere.

| State | Card / badge | Buy button | Heart |
|---|---|---|---|
| In stock | "Directly available" · ships in 1–2 working days | Add to cart | secondary, quiet |
| Everything else | **"Ships on DD-MM-YYYY"** | live, full price upfront | secondary, quiet |

"Built to order — approx. 2 / 6 / 8 months" is retired. The three Elements models
get a ship date too (proposed `01-12-2026`), replacing "Launching 2026 — register
interest".

Why this is better:

- **One rule for the heart, everywhere.** Two states means the heart is always
  secondary — no per-state styling, no `canBuy` flag needed. It deletes the
  problem from §2.3 rather than solving it.
- **A date is a commitment; "approx. 8 months" is a hedge.** Concrete dates read
  as a real plan and convert better.
- **Card and product page finally agree.** Today a card says "Built to order —
  approx. 8 months" while its product page says "Pre-order — ships 12-03-2027".
  Same instrument, two framings — that erodes trust at exactly the wrong moment.
- **No dead ends.** Every card becomes a possible sale, which with
  payment-upfront is the whole point.

#### Blocker: the three Elements models aren't buyable

`assets/ayasa-data.js:225-262` — all three Elements entries have **no
`productHandle`** and carry `rrp` instead. `modelCard()` keys off exactly that
(`const linked = !m.rrp`) to render them as deliberately unclickable cards
showing "RRP £2,160 inc VAT".

So a ship date on an Elements card promises a delivery for something a visitor
cannot buy or reserve — *worse* than "register interest", which at least matches
what the card can do. "Ships on 01-12-2026" with no way to act is a frustration.

This needs a commercial decision first, not a copy change:

- **Ayasa sells them direct** → create the three Shopify products, real prices,
  `ships:2026-12-01` tag, drop `rrp`. Then the two-state model works and the cards
  become clickable. Note this is a shift from RRP (a *recommended* price for UK
  dealers) to Ayasa's own retail price — check it doesn't undercut the distributor.
- **UK dealers sell them** → keep RRP-only cards, and the second state for these
  is "Available from December 2026 · find a UK dealer" with a dealer link. Not a
  ship date, because Ayasa isn't shipping them.
- **Not decided yet** → keep "Launching 2026 — register interest" and point the
  heart at the waitlist. This is the honest interim, and it's a perfect fit for
  the Phase 0 popup.

### 2.3c EU/worldwide vs UK — and the Elements blocker resolved (Ralf, 2026-07-30)

**This store is EU + worldwide. The UK gets its own version** (separate pricing,
invoicing bounced to the UK company; possibly its own Shopify — decision pending,
not solved here).

EU makers are now starting to build Elements, so **EU Elements are products Ayasa
sells direct.** That resolves the §2.3b blocker: option one, direct sale.

EU Elements lineup — *different from the UK catalogue*:

| Model | Notes | Price | vs UK catalogue |
|---|---|---|---|
| Elements D Kurd 13 | as today | **€2,500** | keep, EUR price |
| Elements D Kurd 15 | D Kurd 13 **+ E5, F5** topside | **€2,800** | **new** |
| Elements E Amara 15 | E Amara 13 **+ C3, D3** bottom | **€2,900** | replaces the 13 |
| ~~Elements D Kurd 11~~ | — | — | **UK only, drop from EU** |
| ~~Elements E Amara 13~~ | — | — | **UK only, superseded by the 15** |

Note-count check: both new maps verify (1 ding + 12 top + 2 bottom = 15). The
existing `VERIFY:` on the E Amara 13 topside layout (`ayasa-data.js:255`) carries
over to the 15.

#### Decided: Shopify product setup for the three EU Elements

Titles carry the full range name; **ship date `01-12-2026` for all three** (Ralf,
2026-07-30 — "for now", revisit when EU production is scheduled).

| Shopify title | Recommended handle | Price | Tag |
|---|---|---|---|
| Ayasa Elements D Kurd 13 | `elements-d-kurd-13` | €2,500 | `ships:2026-12-01` |
| Ayasa Elements D Kurd 15 | `elements-d-kurd-15` | €2,800 | `ships:2026-12-01` |
| Ayasa Elements E Amara 15 | `elements-e-amara-15` | €2,900 | `ships:2026-12-01` |

Plus on each: `instrument` tag (drives the case picker and scale switcher —
`ayasa-product.liquid:6`), inventory tracking **off** (see §2.3b detail 1), and the
matching `productHandle` written back into `MODELS` with `rrp` deleted.

**On the handles** — worth deciding deliberately, because handles are effectively
permanent (changing one later breaks URLs, SEO and every hardcoded `productHandle`
in `ayasa-data.js`). Premium uses `{scale}-ember-steel`, e.g.
`d-kurd-19-ember-steel`, `fis-low-pygmy-21-ember-steel`.

Recommend `elements-d-kurd-13` — dropping both `ayasa-` (redundant on
ayasainstruments.com, and no Premium handle carries it) and `-ember-steel` (it
distinguishes nothing within Elements, where there's only one material). The handle
is set independently of the title in Shopify, so the title stays the full "Ayasa
Elements D Kurd 13".

Two knock-on notes, both deliberate rather than oversights:

- Premium titles carry "Ember Steel" (the theme upgrades it to "Ember Steel®" —
  `ayasa-collection.liquid:56`), Elements titles won't. Fine, but it's a visible
  inconsistency between the two grids — worth being sure it's the intent, given
  Elements *are* the same Ember Steel®.
#### Decided: drop " - 440Hz" from all titles (Ralf, 2026-07-30)

Every instrument is 440 Hz, so the suffix is noise in every title. Dropped from
Elements *and* Premium.

Resulting title pattern:

| Range | Title |
|---|---|
| Premium | `D Aegean 18 - Ember Steel` → displays as "D Aegean 18 - Ember Steel®" |
| Elements | `Ayasa Elements D Kurd 13` |

**It lives in `import/products.csv`, not just in admin.** Every row carries it, so
renaming in admin alone means the next re-import silently brings it back. Fix the
CSV in the same pass.

The CSV also reveals *why* the theme has two `remove:` filters — the titles are
inconsistent:

```
D Ashakiran 19 - Ember Steel- 440Hz - Spotted     ← no space before the dash
F# Low Pygmy 21 - Ember Steel - 440Hz
E-Amara 20 Ember Steel - Scratched - 440Hz        ← "E-Amara", no dash before Ember
```

Hence `remove: ' - 440Hz' | remove: '- 440Hz'` (`ayasa-collection.liquid:56`,
`ayasa-product.liquid:56`). Worth normalising the other inconsistencies (`E-Amara`
→ `E Amara`) in the same edit.

**Renaming does not change handles.** Shopify keeps the existing handle on a title
change, so `d-aegean-18-ember-steel` and every `productHandle` in `ayasa-data.js`
survive untouched. No URL or SEO breakage.

**Keep both `remove:` filters for now** as a safety net against a missed product,
and add "strip the 440Hz title filters" to the go-live cleanup list once all titles
are verified renamed.

One thing to preserve: 432 vs 440 Hz is a real distinction buyers search on. With
it out of the titles, state it once somewhere permanent — a spec line on the product
page or the Ember Steel section — so the buyer who cares still gets the answer.

#### `rrp` and `range` got conflated — separate them

This is the important structural consequence. `modelCard()` decides clickability
with `const linked = !m.rrp` (`assets/ayasa.js:35`), so **`rrp` is currently doing
two unrelated jobs**: naming the product line *and* meaning "not sold here".

- `range: "elements"` is **editorial** — the branding, the separate grid, the
  "Ayasa Elements" heading. Keep it.
- `rrp` was a **distribution model** — a *recommended* price for UK dealers, in £
  inc VAT, on a card with nothing to click.

Elements ≠ RRP-only. That was only ever true because Ayasa didn't sell them. Now
it does, in the EU. So **`rrp` becomes UK-only** and drops out of the EU data.

The payoff is that this needs almost no new code. Per EU Elements model: add
`productHandle`, delete `rrp`, set the ship date. `linked` flips to true, the card
becomes clickable, and `swapLinkPrices()` (`assets/ayasa.js:494`) already fetches
the live price from `/products/{handle}.js` — the same path Premium uses. **No
hardcoded prices; the €2,500 / €2,800 / €2,900 live in Shopify only.**

Consequence for the shortlist: with Elements purchasable, **every card in both
grids has a working buy button**, so the heart is uniformly secondary. §2.3's
`canBuy` flag is no longer needed at all.

#### Don't build market-switching into `MODELS` yet

`MODELS` is one flat array with no market dimension. Tempting to add
`markets: ["eu"]`. Recommend **not** — it's speculative complexity for a decision
not yet made. If the UK becomes its own Shopify store, each store's
`ayasa-data.js` describes only its own market and no flag is ever needed. Adding
one now risks building the wrong abstraction and then maintaining it.

Worth knowing for that later conversation: Shopify **Markets** handles
multi-currency and region-specific pricing inside a single store, so *prices and
catalogue are not the blocker*. The blocker is that invoicing must come from the
UK company — one store means one merchant of record, and Markets does not change
that. So the separate-store instinct is probably right, and the reason is the
**invoicing entity**, not the price list.

Shortlist impact if the UK does split: shortlists are per-store (different domain
→ different `localStorage`, likely a separate Mailchimp audience). A UK visitor won't
carry an EU shortlist across. Acceptable; just don't promise otherwise in copy.

#### The new lineup is a gift to the compare view

D Kurd 13 (€2,500) and D Kurd 15 (€2,800) differ by **exactly two notes** — E5 and
F5. That is the single best possible argument for §4.1's compare view, and a clean
upsell: anyone shortlisting the 13 is a prime target for *"for €300 more you get E5
and F5 on top."* Concrete, honest, and it only exists because of this lineup.

`family` already supports it — Elements D Kurd 13/15 and Premium D Kurd 19 all sit
in `d-minor`, so family-level audiences (§6) and compare grouping work unchanged.

#### Positioning risk: Elements beside Premium

If Elements are "basically the same as Premium as products", a shortlist and
compare view will put a €2,500 Elements next to a €2,800+ Premium — and the
unanswered question *"why is this one cheaper, is it worse?"* kills the sale for
both. The range copy answers it well today ("Not a 'beginner handpan': a real
one", tuned in Britain by experienced makers), but that argument currently lives
in a section heading the compare view won't show.

**The compare view needs a one-line, per-range "what you're paying for" note**, or
cross-range comparison will quietly cost sales rather than win them. Cheap to add
if designed in now; awkward to retrofit.

#### Three details to get right

1. **Inventory model — DECIDED (Ralf, 2026-07-30). Two product classes:**

   | Class | Examples | Inventory | When stock hits 0 |
   |---|---|---|---|
   | **Range instruments** (repeatable — all Premium scales, all EU Elements) | D Kurd 19, Ayasa Elements D Kurd 13 | tracking on, policy **`continue`**, permanent `ships:` tag | buy button stays live; badge flips to "Made for you — ships {date}" |
   | **One-offs** (finite — scratched / spotted / prototypes / trade-ins) | E Amara 20 Scratched, F# Kurd 20 prototype | tracking on, policy **`deny`**, stock 1–5 | **disappears from the website entirely** |

   Tag one-offs (`one-off`) so theme and collections can tell the classes apart.
   Today `import/products.csv` has *everything* as `shopify,1,deny` — range
   instruments need flipping to `continue` with real quantities.

   **Batch/restock model (Ralf, 2026-07-30):** existing `ships:` dates in the
   store stay exactly as they are — production is already planned against them.
   `2026-12-01` applies only to the three new Elements, **8 pcs each**. Standing
   rule: when a range instrument's stock sells out, add a new batch of **8 pcs
   with a ships date 6 months out** (manually shortened whenever production
   allows — dates and quantities are always editable in admin; any automation
   only sets defaults).

   **Consequence: the badge must key off the DATE, not the quantity.** Under the
   batch model a product can have qty 8 *and* a future ships date (the Elements
   on day one are exactly this). "Quantity > 0 → directly available" would show
   them as in stock. Correct logic:

   - ships date **in the future** → "Made for you — ships 1 December 2026"
   - ships date past/absent **and** qty > 0 → "Directly available · ships in 1–2
     working days"
   - date past **and** qty ≤ 0 → fallback "Made for you — currently in
     production" (the sold-out-awaiting-restock gap; closes as soon as the new
     batch + date are entered)

   This is better than the quantity-driven version: when a batch physically
   arrives, the date passes and the badge **flips itself to "Directly
   available"** — no admin action at all. The only discipline is updating the
   date if production slips.

   **Date storage — REVISED at implementation (2026-07-30): the `ships:` tag
   stays canonical; the metafield is deferred.** The deciding fact: the
   JS-rendered cards (range grids, scale switcher, keep-exploring) read
   availability live from `/products/{handle}.js`, which exposes **tags but not
   metafields**. A metafield would need a second data path for the same date.
   Since level 1 is manual anyway (a human edits the tag), the tag costs
   nothing now. Revisit only if Flow automation (level 2) happens — Flow can
   write metafields but can't dynamically strip dated tags; at that point add
   the metafield as the write target and keep mirroring it to the tag.

   **Automating the restock rule — possible at three levels:**
   1. **Manual + notification (recommended start):** Shopify Flow (free) emails
      on "variant qty reached 0" for `instrument`-tagged, non-`one-off` products;
      Ralf enters qty 8 + new date. At Ayasa volume this is a few times a month,
      and every restock gets a human sanity check on the date.
   2. **Full auto via Flow:** same trigger → adjust inventory +8 → set
      `ships_on` = today + 6 months (Flow's Liquid can do the date math). Works,
      but a blind +6 months with no human look is exactly how a wrong public
      date happens; only worth it if restocks become frequent.
   3. Do nothing and eyeball the shop — the failure mode is the badge lying
      ("Directly available" with nothing ready) until someone notices. Avoid:
      the fallback state above exists to make this gap visible, not permanent.

   With date-keyed badges, `continue` on range instruments remains right: the
   buy button never dies, and the badge (not the button) tells the buyer what
   shipping reality to expect.

   Hiding sold-out one-offs needs **all** of these, not just the first:
   - **Shop grid:** make the instruments collection automated with condition
     "inventory stock > 0" — sold-out one-offs drop out on their own. (Check
     whether the current collection is manual; a manual list needs hand-pruning,
     which is exactly the chore to avoid.)
   - **Scale switcher "Find something special"** (`SCALES` in `ayasa-data.js`,
     hardcoded): `fetchPrice()` already fetches `/products/{handle}.js`, which
     includes `available` — extend it to hide unavailable specials client-side,
     so the switcher self-prunes too.
   - **Direct links** (Google, shared URLs): the product page still exists. It
     renders the disabled "Sold out" state — correct and honest for a one-off
     someone else bought. So "Sold out" survives in exactly one place: a
     direct-linked, gone-forever one-off. Never in a grid.
   - **Search:** sold-out one-offs still surface via storefront search
     (`sections/search.liquid`) — filter `product.available` there too.

2. **Badge copy — DECIDED: "Made for you — ships 1 December 2026"** (named month,
   unambiguous worldwide; `01-12-2026` reads as 12 January in the US). The
   product-page pre-order button gets the same treatment: "Pre-order — ships
   1 December 2026".
2. **Dates go stale in public.** On 15-12-2026 a card still reading "Ships on
   01-12-2026" is visibly broken. Either commit to a maintenance discipline, or add
   a fallback in `availability-badge.liquid` for a past date ("Ships within X
   weeks"). Cheap now, embarrassing later.
3. **Use a named month.** `01-12-2026` reads as 12 January to a US customer.
   "Ships 1 December 2026" is unambiguous in every locale — worth it on an order
   paid in full upfront.

#### Keep the reason for the wait

"Built to order" said *why* there's a wait — someone is making this for you.
"Ships on 12-03-2027" is just a delay. Recommend keeping both in the two-state
model:

> **Made for you** — ships 12 March 2027

Same information, same two states, but it sells the wait instead of disclosing it.
The range subheading already makes this argument well ("someone is making this for
you") — the cards should carry it too.

#### Sold out — resolved by the two-class inventory model

Range instruments never show "Sold out" (policy `continue`, badge derives from
stock). One-offs hide from all grids/search when sold; the only place "Sold out"
still renders is a direct link to a gone-forever one-off, which is correct. See
detail 1 below.

**On built-to-order the heart is more dangerous than on in-stock, not less.**
Favoriting is a *deferral*, and the built-to-order decision is already the harder
one (pay €2,500 today for an instrument arriving in 8 months). Anything offering
an easy "later" competes directly with a sale that was winnable now. So the
reassurance and the buy CTA on those pages should be at least as strong as on
in-stock pages.

Where the shortlist genuinely *helps* built-to-order: the **compare view** (§4.1).
Someone weighing two built-to-order scales is deciding *which* to pay for, not
*whether*. That's additive to revenue, not cannibalising it.

#### Consequence for implementation

`MODELS` in `assets/ayasa-data.js` only has a binary `inStock: true/false`, and
`inStock: false` currently covers *both* "pay me €2,500 today" (built to order)
and "you cannot pay me at all" (Launching 2026 / sold out). `modelCard()`
(`assets/ayasa.js:28`) inherits this — `m.inStock ? "badge-stock" : "badge-order"`.

`snippets/availability-badge.liquid` gets it right with three branches off the
product's `ships:` tag and `product.available`.

So Phase 0 needs a purchasability flag the card data doesn't have yet — either a
`canBuy` field on `MODELS`, or derive it (`productHandle` present && not sold
out). Cheap, but it has to happen before the heart can be styled per state.

---

## 3. Phase 0 — ship now: the button + "coming soon" popup

The point of Phase 0 is not the popup. It's that **the popup already collects the
data**, so nothing is wasted while the real feature is built.

Every click:

1. Writes the scale to `localStorage` (`ayasa:shortlist`) — so at full launch
   returning visitors' shortlists can be adopted, already populated. There's
   precedent for this pattern in the theme: `getWatched()` in `assets/ayasa.js`
   already uses localStorage for watched-video dots.
2. Fires an analytics event (`shortlist_add`, with scale handle) — starts
   building audiences from day one, before any of the real machinery exists.
3. Opens the popup with the email capture.

The popup reuses the footer's existing `{% form 'customer' %}` pattern
(`sections/footer.liquid:29`) and tags the customer with **both**
`shortlist-waitlist` **and the scale handle** (e.g. `wants:d-kurd-19`). Zero
backend, and it means the "coming soon" phase produces a real
who-wants-what table in Shopify admin.

> Check before shipping: confirm how `{% form 'customer' %}` sets marketing
> consent in this theme, so the unchecked box genuinely drives it rather than
> the form auto-subscribing.

### Popup copy — FINAL (Ralf, 2026-07-30; supersedes options A/B below)

House style: **no em dashes in customer-facing copy** (dots or commas instead;
"·" midpoints and numeric ranges like "1–2" stay). Applied across badges,
buttons, toasts and the popup.

> ### Save this one for later
>
> Shortlists arrive with the full site launch. Collect the scales you love,
> hear them side by side, and pick your instrument properly.
>
> Want to be first in? Leave your email and we'll tell you the moment it's
> live. **{scale}** is already noted down for you.
>
> `[ you@example.com ]` `[ Notify me ]`
>
> Signing up adds you to the Ayasa newsletter: launch news, updates and playing
> inspiration for your shortlisted scales, and the occasional note from the
> workshop. We'd rather send too few emails than too many. Unsubscribe anytime.

No checkbox: the disclosure under the button names the newsletter, so the
informed click is the consent (valid without a tick box; the invalid patterns
are pre-ticked boxes and consent bundled into terms). Every signup gets the
`newsletter` tag — this matches what Shopify's customer form records anyway.
The wording deliberately covers behavioural flows ("updates and playing
inspiration for your shortlisted scales" = the 3-weeks-later nudge email);
"a handful a year" was dropped because flows make it false.

**Availability alerts are ask-based, not bundled.** The shortlist panel shows
"Email me when one of my scales becomes available sooner" (checkbox) only when
a saved scale isn't directly available. Ticking it tags the customer
`notify-availability`; when a date improves on scale X, the send list is
`notify-availability` ∩ `wants:x`. Mechanics: email is kept in the shopper's
own localStorage after signup so the tick can tag silently later; unticking is
local-only in Phase 0 (storefront can't remove tags) — accepted by Ralf,
real per-scale toggles come with the Phase 2 ESP work (Mailchimp journeys or a switch).

### Popup copy — option A (superseded)

> ### Save this one for later
>
> Shortlists arrive with the full site launch — you'll be able to collect the
> scales you love, hear them side by side, and pick your instrument properly.
>
> Want to be first in? Leave your email and we'll tell you the moment it's live —
> **F# Low Pygmy 21 is already noted down for you.**
>
> `[ you@example.com ]` `[ Notify me ]`
>
> ☐ Also email me when a shortlisted scale comes back in stock, and the odd note
> from the workshop. No more than a handful a year.

The line naming their scale back to them is the part that does the work — it
proves the click registered and makes the email feel like a personal note rather
than a signup.

### Popup copy — option B (shorter)

> ### Noted — F# Low Pygmy 21 ♡
>
> Shortlists go live with the new site. Leave your email and you'll be first to
> use it.
>
> `[ you@example.com ]` `[ Notify me ]`
>
> ☐ Also tell me when this scale is back in stock.

Behaviour: show fully on the **first** click of a session. On later clicks show a
small toast instead (*"Noted ♡ — 3 scales saved"*) so it never becomes annoying.
If they've already given an email, never show the popup again.

### Where the button goes

| Placement | File | Notes |
|---|---|---|
| Range cards (home, scale switcher, keep-exploring) | `assets/ayasa.js:27` `modelCard()` | **Highest leverage — one edit, four surfaces.** Top-right of the card. |
| Shop grid cards | `sections/ayasa-collection.liquid:46` | Overlay top-right of `.shop-card-photo`. The card is a single `<a>` — the heart must be a *sibling* positioned over it, not nested (a `<button>` inside an `<a>` is invalid HTML and behaves badly). Only on `data-type="handpan"` cards. |
| Product page | `sections/ayasa-product.liquid:65` | Full text button — *"♡ Add to shortlist"* — under the price / near add-to-cart. Icon alone is too vague here. |
| Header counter | `sections/header.liquid:22` | Heart + count next to the cart icon, **hidden at 0**. This is the "come back to them" mechanism — without it the feature is invisible. |
| 3D explore page | when the 3D product page lands on Shopify | This is where people fall in love. Prime spot. |
| Demo-video lightbox | `assets/ayasa.js:227` `openDemoLightbox()` | Favoriting *while listening* is the highest-intent moment there is. Strong candidate for Phase 1. |

**Deliberately not:**

- `scaleItemHTML()` medallions in "Find something special" (`assets/ayasa.js:463`) — rows are too small, it becomes clutter. Revisit as a hover-reveal.
- Accessories / cases cards — nobody shortlists a case.
- Artist page instrument rail — the intent there is the artist, not the purchase.

---

## 4. Phase 1 — the real shortlist (the part that sells)

A saved list on its own is a bookmark folder. These three turn it into a
selection *system*:

### 4.1 Compare view — the actual killer feature

Pick 2–3 shortlisted scales, see them side by side:

- Note maps aligned, **shared notes highlighted** so the difference is visible
  at a glance
- **A/B audio switching** — same phrase, tap to swap between instruments. This
  is how people genuinely decide, and nobody in handpans does it well
- Range/mood/key/availability in one row
- If the 3D player is available: play each one, in place

Handpan buyers agonise for weeks between two or three scales. This is the page
that ends the agonising — and the page that gets shared and linked.

### 4.2 Guided scale finder feeding into the shortlist

A short, non-quizzy quiz (4 questions, no wrong answers):

1. What do you want to play? — *meditative / rhythmic / melodic & bright / deep and low*
2. Do you sing or play with others? — *(drives key choice)*
3. First handpan, or adding to a set? — *(avoids duplicating a key they own)*
4. Where will you play it? — *(indoors, groups, outdoors → size/volume)*

Output: three recommended scales, **pre-loaded as a shortlist**, with one line of
maker's reasoning each.

Two reasons this matters more than the favorites button itself:

- It solves the real problem — most visitors don't know what a scale *is*, so
  they can't have a favorite yet. This gives them one.
- The answers are a far better retargeting and email segment than a favorite
  alone. *"Wants deep and meditative, plays alone, first instrument"* writes its
  own email.

### 4.3 Audio-first browsing

A persistent mini-player so someone can keep listening while they browse and
favorite. The theme already has the pieces — demo videos per model, a
`restoreMiniPlayer()` (`assets/ayasa.js:709`), watched-state tracking. Favoriting
should be possible without ever stopping the sound.

---

## 5. Phase 2 — persistence, notifications, sharing

- **Save your shortlist** prompt at 2–3 favorites → email code (new customer
  accounts) or just an email address, and the list syncs across devices.
- **Notify me** per scale — but **only where the scale genuinely cannot be bought
  today**: sold out, or Launching 2026. High-open, genuinely useful, and an honest
  reason to hold the address.

  **Never send a "we'll let you know when it's available" email for a
  built-to-order scale.** It's already available — that email tells a buyer who
  was ready to pay to sit and wait instead, and teaches them that waiting is the
  correct move. For built-to-order the shortlist email is a *nudge toward the
  existing pre-order* (what the wait buys you, where it is in the build, who's
  making it), not a stock alert.
- **Share / send my shortlist** — a link, or "email this to myself". People
  discuss a €2,500 purchase with a partner. Sharing is free acquisition and the
  recipient arrives warm.
- **"Which of these should I get?"** — one button that sends the shortlist to
  Ralf and gets a personal reply from the person who made them. No large retailer
  can copy this, and it converts harder than any automated flow.

### Storage — the honest options

**DECIDED (Ralf, 2026-07-30): the ESP is Mailchimp** — an active audience
already exists and stays. Shopify is the store of record; Mailchimp is the
sending arm, fed by the official app sync.

| Option | Cost | Notes |
|---|---|---|
| localStorage only | free | Phase 0. Per-device, lost on clear. |
| **Shopify customers + tags → Mailchimp app sync** | free (app) + Mailchimp plan | **The current setup.** The popup writes customers + tags (`shortlist-waitlist`, `newsletter`, `wants:{handle}`, `notify-availability`) into Shopify; the official Mailchimp app syncs them — Shopify customer tags become Mailchimp tags, subscribe status syncs both ways. Zero theme code. |
| Mailchimp API from storefront | — | **Never** — an API key in storefront JS is public. |
| Shopify customer metafields | needs an app / app proxy | Only if the shortlist itself must live server-side per customer. Phase 2 question. |

Phase 2 note: the 3-week nudge and similar behavioural flows run as Mailchimp
customer journeys triggered by tags. That works, but Mailchimp's event-driven
automation is markedly weaker than Klaviyo's — if Phase 2 gets deep into
per-scale toggles and event streams, re-evaluate the ESP *then*, not now.
Consent logging: Shopify records signup timestamp; keep double opt-in ON in
exactly one system (Shopify **or** Mailchimp, not both — two confirmation
emails kills conversion).

---

## 6. Data & marketing mechanics

**Events** (Shopify Web Pixel / customer events → Meta CAPI + GA4):
`shortlist_add`, `shortlist_remove`, `shortlist_view`, `compare_view`,
`finder_complete`, `notify_signup` — each with scale handle and family.

**Consent:** all pixel firing must be gated on Shopify's Customer Privacy API /
Consent Mode v2 for EU traffic. Non-negotiable, and it's a small amount of work
if done at the start rather than retrofitted.

**Audiences:** segment on **scale family** (F# minor, D major, …) rather than
individual scale — individual scales give audiences too small for Meta to
optimise on. Family-level audiences are the right size and the creative writes
itself (one video per family).

**Segments worth building:**

- Shortlisted, no purchase, 7 days → the core retargeting audience
- Shortlisted something sold out → notify flow, genuine service, high open rate
- **3+ shortlisted** → high intent, worth a *human* email from Ralf
- Finder completed, nothing shortlisted → didn't find it; ask what's missing
- Shortlist shared → warm referral, treat the recipient as a new lead

**For the workshop, not just marketing:** aggregate shortlist counts are a
production-planning signal. *"Nine people shortlisted D Kurd 19 this month"* tells
you what to build next. That's a real operational payoff independent of any ad
spend.

---

## 7. Risks

- **Heart blindness** — people don't see icons they don't expect. Mitigate with a
  satisfying first-click animation and the header counter visibly incrementing.
- **Popup fatigue** — full popup once per session, toast thereafter.
- **Empty state** — "Your shortlist is empty" is a dead end. Make it the entry
  point to the finder.
- **Lost localStorage** — the honest argument for accounts. Say so in the save
  prompt rather than pretending.
- **Cannibalising add-to-cart** — see §2.3.
- **Scope creep** — Phase 0 is genuinely small. Phases 1–2 are not. Ship 0, watch
  the numbers, then decide.

---

## 8. Open questions for Ralf

1. ~~Klaviyo, or stay on Shopify Email?~~ **ANSWERED: Mailchimp** (active
   audience exists and stays — see §5 Storage).
2. Are customer accounts being enabled on the new site at all, and classic or
   new (passwordless)?
3. Per-scale audio for the compare A/B — do recordings of the *same phrase* on
   different instruments exist, or would they need recording? (This is the one
   real content dependency in Phase 1.)
4. Is the finder in scope for launch, or does it follow?
5. Meta pixel / CAPI — already set up on the current shop, or fresh?
