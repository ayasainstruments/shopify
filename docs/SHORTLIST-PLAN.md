# Shortlist / Favorites — plan

Status: **plan only, nothing built.** Written 2026-07-30.
Goal: the best scale-selection system in handpans — keeps people exploring,
builds a first-party data asset, and converts.

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
- Log consent (timestamp, wording shown, IP) — Klaviyo/Shopify do this if the
  form is wired through them.

Net effect: a smaller list that's legally clean and actually opens emails. For a
maker with a few hundred instruments a year, list *quality* is the whole game.

### 2.3 Favorites must not cannibalise "Add to cart"

For an in-stock scale the primary action stays Add to cart. The heart is
secondary and quiet. For built-to-order / sold-out scales the heart becomes the
*primary* action — that's where it earns its place.

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

### Popup copy — option A (recommended)

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
- **Notify me** per scale: back in stock / when the built-to-order batch opens /
  when a used or trade-in one appears. These are high-open, genuinely useful
  emails with an honest reason to hold the address.
- **Share / send my shortlist** — a link, or "email this to myself". People
  discuss a €2,500 purchase with a partner. Sharing is free acquisition and the
  recipient arrives warm.
- **"Which of these should I get?"** — one button that sends the shortlist to
  Ralf and gets a personal reply from the person who made them. No large retailer
  can copy this, and it converts harder than any automated flow.

### Storage — the honest options

| Option | Cost | Notes |
|---|---|---|
| localStorage only | free | Phase 0. Per-device, lost on clear. |
| **Klaviyo profile properties** | ESP cost only | **Recommended for Phase 2.** Writable from the storefront with a public key, and it's the marketing system anyway — so favorites land where the flows live, no app to build. |
| Shopify customer metafields | needs an app / app proxy | Storefront JS can't write customer metafields directly. Real backend work. Only worth it if the shortlist must be visible in Shopify admin. |

Recommendation: **Klaviyo as store of record**, mirrored to localStorage for
instant reads. Skip building an app.

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

1. Klaviyo, or stay on Shopify Email? (Shortlist flows realistically need
   Klaviyo — Shopify Email can't do custom profile properties well.)
2. Are customer accounts being enabled on the new site at all, and classic or
   new (passwordless)?
3. Per-scale audio for the compare A/B — do recordings of the *same phrase* on
   different instruments exist, or would they need recording? (This is the one
   real content dependency in Phase 1.)
4. Is the finder in scope for launch, or does it follow?
5. Meta pixel / CAPI — already set up on the current shop, or fresh?
