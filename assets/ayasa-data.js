// ============================================================
// AYASA — model & pricing data
// Edit this file to update the range. No HTML knowledge needed.
//
// !! DRAFT DATA — transcribed from Ayasa-UK-Distributor-Catalogue-
// Draft-v1.pdf. Verify every note map and price against the final
// catalogue before launch. Known draft inconsistencies are marked
// with "VERIFY:" comments.
//
// This is the EU + worldwide store: Premium AND Elements are sold
// direct. All prices live in Shopify only (fetched live from
// /products/{handle}.js — never hardcode them here). The UK gets
// its own version with dealer RRPs; `rrp` is a UK-only concept now.
//
// Availability is two states, derived live from the product's
// `ships:` tag + stock (see snippets/availability-badge.liquid and
// docs/SHORTLIST-PLAN.md §2.3). The `availability`/`inStock` fields
// below are only the first-paint fallback until the fetch lands.
// ============================================================

// ---------- TEMP: photographer test (visual only) ----------
// Dev-theme gallery override: these theme-asset crops replace the product's
// gallery photos on the page for the listed handles. Live product data is
// untouched. Remove after the test — approved photos go on the product in admin.
const TEST_GALLERY = {
  "d-aegean-18-ember-steel": [
    AYASA_ASSET("gal-test-1.jpg") + "?v=2",
    AYASA_ASSET("gal-test-2.jpg") + "?v=2",
    AYASA_ASSET("gal-test-3.jpg") + "?v=2",
    AYASA_ASSET("gal-test-4.jpg") + "?v=2",
    AYASA_ASSET("gal-test-5.jpg") + "?v=2"
  ]
};

// ---------- Artist registry ----------
// Shared details for anyone appearing in demo videos or the carousel.
// Keyed by base artist name (video labels like "Malte Marten · II" resolve
// to "Malte Marten"). img and links are optional.
// TODO (Ralf): fill in Immanuel's and Vybeshift's credential/bio + links + photo.
const ARTISTS = {
  "Malte Marten": {
    credential: "1.4M YouTube subscribers · plays mostly Ayasa",
    bio: "The world's most-listened handpan artist; his Ayasa meditations have been heard over 50 million times on YouTube.",
    img: AYASA_ASSET("player-malte.jpg"),
    page: "/pages/malte-marten", // artist page — lightbox names link here
    links: { youtube: "https://www.youtube.com/@MalteMarten", web: "https://www.maltemarten.com/" },
    // artist page: curated instrument rail (editorial order, first `visiblePlays`
    // shown before the expander) + listening-room videos per instrument.
    // NOTE: all videos are the two D Aegean 18 clips as placeholders for now.
    visiblePlays: 4,
    plays: [
      { name: "D Aegean 18", mode: "D Lydian", handle: "d-aegean-18-ember-steel",
        videos: [AYASA_ASSET("d-aegean-18__malte-1.mp4"), AYASA_ASSET("d-aegean-18__malte-2.mp4")] },
      { name: "E Amara 20", mode: "E Celtic minor", handle: "e-amara-20-ember-steel",
        videos: [AYASA_ASSET("d-aegean-18__malte-2.mp4")] },
      { name: "D Kurd 19", mode: "D minor", handle: "d-kurd-19-ember-steel",
        videos: [AYASA_ASSET("d-aegean-18__malte-1.mp4"), AYASA_ASSET("d-aegean-18__malte-2.mp4")] },
      { name: "F# Kurd 22", mode: "F# minor · fully extended", handle: "fis-kurd-22-ember-steel",
        videos: [AYASA_ASSET("d-aegean-18__malte-2.mp4"), AYASA_ASSET("d-aegean-18__malte-1.mp4")] },
      { name: "D Ashakiran 19", mode: "Extended major · “Ray of Hope”", handle: "d-ashakiran-19-ember-steel-spotted",
        videos: [AYASA_ASSET("d-aegean-18__malte-1.mp4"), AYASA_ASSET("d-aegean-18__malte-2.mp4")] },
      { name: "F# Low Pygmy 21", mode: "F# minor pentatonic", handle: "fis-low-pygmy-21-ember-steel",
        videos: [AYASA_ASSET("d-aegean-18__malte-2.mp4"), AYASA_ASSET("d-aegean-18__malte-1.mp4")] },
      { name: "F#2 Nordlys 16", mode: "F# minor · low F#2 ding", handle: "fis2-nordlys-16-ember-steel",
        videos: [AYASA_ASSET("d-aegean-18__malte-1.mp4")] }
    ]
  },
  "Immanuel": {
    credential: "Ayasa artist",
    bio: "",           // TODO
    img: "",           // TODO — add portrait to site/assets/
    links: {}          // TODO
  },
  "Vybeshift": {
    credential: "Ayasa artist",
    bio: "",           // TODO
    img: "",           // TODO — add portrait to site/assets/
    links: {}          // TODO
  }
};

// ---------- Player roster (carousel) ----------
// Add artists here as photos/permissions come in. Fields:
// name, credential, quote (optional), img, links: {youtube, instagram, web}
const PLAYERS = [
  {
    name: "Malte Marten",
    credential: "1.4M YouTube subscribers · plays mostly Ayasa",
    quote: "The handpan can serve as a channel for the many emotions we feel as human beings.",
    img: AYASA_ASSET("player-malte.jpg"),
    links: { youtube: "https://www.youtube.com/@MalteMarten", web: "https://www.maltemarten.com/" }
  },
  {
    name: "David Charrier",
    credential: "Founder, Master the Handpan · 7,500+ students",
    quote: "Precise, with good balance, stability and a great sustain. I love performing with them on stage.",
    img: AYASA_ASSET("player-charrier.jpg"),
    links: { web: "https://www.masterthehandpan.com/" }
  },
  {
    name: "Dan Mulqueen",
    credential: "Recording artist · plays Ayasa",
    quote: "The flawless appearance matches the crystal clear tone and character you hear in the sound.",
    img: AYASA_ASSET("player-mulqueen.jpg"),
    links: { youtube: "https://www.youtube.com/DanMulqueen", instagram: "https://www.instagram.com/danmulqueen/", web: "https://www.danmulqueen.com/" }
  }
];
const PLAYERS_TOTAL = 49; // total named artists — CTA card shows the remainder

const MODELS = [
  // ---------- PREMIUM — made in Almere, NL ----------
  {
    range: "premium",
    family: "fis-minor", // scale-family filter chip on product pages; will move to the per-model data sheet later
    name: "F# Low Pygmy 21",
    productHandle: "fis-low-pygmy-21-ember-steel",
    // TEMP: Aegean close-up as texture until the Pygmy gets its own shoot
    cardPhoto: AYASA_ASSET("gal-test-4.jpg") + "?v=2",
    scale: "F# minor pentatonic · fully extended",
    ding: "F#3",
    top: ["G#3", "A3", "C#4", "E4", "F#4", "G#4", "A4", "C#5", "E5", "F#5", "G#5"],
    bottom: ["D3", "E3", "B3", "D4", "B4", "D5", "A5", "B5", "C#6"],
    desc: "The deep one. Ethereal and comforting at once — and its bottom side opens a second, A-major voice from the same instrument.",
    availability: "In stock. Ships in 1–2 working days",
    inStock: true
  },
  {
    range: "premium",
    family: "fis-minor", // the Aegean is the full extended F# minor scale (D ding)
    name: "D Aegean 18",
    productHandle: "d-aegean-18-ember-steel",
    cardPhoto: AYASA_ASSET("gal-test-1.jpg") + "?v=2", // masked card background (hands hero)
    scale: "D Lydian",
    ding: "D3",
    top: ["F#3", "A3", "C#4", "D4", "F#4", "G#4", "A4", "C#5", "D5", "F#5"],
    bottom: ["B2", "E3", "G#3", "B3", "E4", "B4", "E5"],
    desc: "Ayasa's spacious signature. Quietly mysterious, moving from deep meditative moods to bright melodic exploration without losing its calm.",
    availability: "In stock. Ships in 1–2 working days",
    inStock: true,
    // detailPage: re-enable when the D Aegean 18 product page (with 3D viewer) exists on Shopify
    // homepage lightbox: delayed "View in shop" for this model's product page
    videoShop: { name: "D Aegean 18 — Ember Steel®", url: "/products/d-aegean-18-ember-steel" },
    // demo clips: one poster jpg per mp4 (same basename), served from theme assets
    videos: [
      { artist: "Malte Marten", file: AYASA_ASSET("d-aegean-18__malte-1.mp4") },
      { artist: "Malte Marten · II", file: AYASA_ASSET("d-aegean-18__malte-2.mp4") },
      { artist: "Immanuel", file: AYASA_ASSET("d-aegean-18__immie.mp4") },
      { artist: "Vybeshift", file: AYASA_ASSET("d-aegean-18__roni.mp4") }
    ]
  },
  {
    range: "premium",
    family: "fis-minor",
    name: "D Aegean 20",
    productHandle: "d-aegean-20-ember-steel",
    scale: "D Lydian · extended",
    ding: "D3",
    top: ["F#3", "A3", "C#4", "D4", "F#4", "G#4", "A4", "C#5", "D5", "F#5", "G#5", "A5"],
    bottom: ["B2", "E3", "G#3", "B3", "E4", "B4", "E5"],
    desc: "The Aegean's reach, extended — two more voices in the upper register for players who want the full canvas.",
    availability: "In stock. Ships in 1–2 working days",
    inStock: true
  },
  {
    range: "premium",
    family: "other",
    name: "D Ashakiran 19",
    productHandle: "d-ashakiran-19-ember-steel-spotted",
    scale: "Extended major · “Ray of Hope”",
    ding: "D3",
    top: ["G3", "A3", "B3", "C#4", "D4", "E4", "F#4", "A4", "B4", "F#5"], // VERIFY: catalogue card partly illegible in draft
    bottom: ["E3", "F#3", "G4", "C#5", "D5", "E5", "G5", "A5"],
    desc: "The extended major scale co-created with Malte Marten in 2017 — uplifting and easy to love, with just enough melancholy to keep it honest.",
    availability: "In stock. Ships in 1–2 working days",
    inStock: true
  },
  {
    range: "premium",
    family: "e-minor",
    name: "E Amara 20",
    productHandle: "e-amara-20-ember-steel",
    scale: "E Celtic minor · fully extended",
    ding: "E3",
    top: ["B3", "D4", "E4", "F#4", "G4", "A4", "B4", "D5", "E5", "F#5", "G5", "A5"], // VERIFY against final catalogue
    bottom: ["C3", "D3", "F#3", "G3", "A3", "C4", "C5"],
    desc: "Celtic minor across twenty notes, lighter and more ethereal than the Kurd family. The meditative player's scale, and a Malte Marten staple.",
    availability: "In stock. Ships in 1–2 working days",
    inStock: true
  },
  {
    range: "premium",
    family: "other",
    name: "B2 Aavartan 17",
    productHandle: "b2-aavartan-17-ember-steel",
    scale: "B major · low B2 ding",
    ding: "B2",
    top: ["D#3", "F#3", "G#3", "A#3", "B3", "C#4", "D#4", "F#4"],
    bottom: ["C#3", "E3", "E4", "G#4", "B4", "C#5", "D#5", "E5"],
    desc: "A low B2 ding under a B major scale — warm, enveloping, unhurried. An uncommon voice in any collection.",
    availability: "Made for you. Built to order", // fallback; the live ships: date replaces this on load. VERIFY: draft catalogue card says in stock, pricing table says 2 months
    inStock: false
  },
  {
    range: "premium",
    family: "d-minor",
    name: "D Kurd 19",
    productHandle: "d-kurd-19-ember-steel",
    scale: "Full extended D minor · with Bb2",
    ding: "D3",
    top: ["A3", "Bb3", "C4", "D4", "E4", "F4", "G4", "A4", "C5", "D5", "E5", "F5"],
    bottom: ["Bb2", "F3", "G3", "B3", "E4", "B4", "E5"], // VERIFY: draft bottom row appears mis-copied in catalogue; must include Bb2
    desc: "The world's most-played scale at its fullest expression — and the Bb2 gives it a floor smaller Kurds can't reach.",
    availability: "Made for you. Built to order", // fallback; the live ships: date replaces this on load
    inStock: false
  },
  {
    range: "premium",
    family: "fis-minor",
    name: "F#2 Nordlys 16",
    productHandle: "fis2-nordlys-16-ember-steel",
    scale: "F# Lydian hexatonic · deep F#2 ding",
    ding: "F#2",
    top: ["F#3", "G#3", "A#3", "C4", "C#4", "F4", "G#4", "C5"],
    bottom: ["A#2", "C#3", "F3", "F#4", "C#5", "F5", "G#5"],
    desc: "“Northern lights.” A rare Lydian voicing over one of the deepest dings in the range. Bright, mysterious, unlike anything else here.",
    availability: "Made for you. Built to order", // fallback; the live ships: date replaces this on load
    inStock: false
  },

  // ---------- ELEMENTS — EU lineup, sold direct ----------
  // (The UK catalogue differs: D Kurd 11 and E Amara 13 are UK-only,
  //  where dealers sell them at RRP. No `rrp` here — EU prices come
  //  live from Shopify like every Premium model.)
  {
    range: "elements",
    family: "d-minor",
    name: "Elements D Kurd 13",
    // productHandle: "elements-d-kurd-13", // PARKED — re-enable when the product (with photos) exists in Shopify
    scale: "D minor + bottom notes",
    ding: "D3",
    top: ["A3", "Bb3", "C4", "D4", "E4", "F4", "G4", "A4", "C5", "D5"],
    bottom: ["F3", "G3"],
    desc: "The essential D minor, properly made — deepened with two bottom notes to give you a floor to grow into.",
    availability: "Made for you. Ships 1 December 2026", // fallback; the live ships: date replaces this on load
    inStock: false
  },
  {
    range: "elements",
    family: "d-minor",
    name: "Elements D Kurd 15",
    // productHandle: "elements-d-kurd-15", // PARKED — re-enable when the product (with photos) exists in Shopify
    scale: "D minor + bottom notes · extended top",
    ding: "D3",
    top: ["A3", "Bb3", "C4", "D4", "E4", "F4", "G4", "A4", "C5", "D5", "E5", "F5"],
    bottom: ["F3", "G3"],
    desc: "The same warm minor, opened upward — E5 and F5 extend your melodies to the top while the bottom notes keep the floor.",
    availability: "Made for you. Ships 1 December 2026", // fallback; the live ships: date replaces this on load
    inStock: false
  },
  {
    range: "elements",
    family: "e-minor",
    name: "Elements E Amara 15",
    // productHandle: "elements-e-amara-15", // PARKED — re-enable when the product (with photos) exists in Shopify
    scale: "E Celtic minor + low bottom notes",
    ding: "E3",
    top: ["G3", "A3", "B3", "D4", "E4", "F#4", "G4", "A4", "B4", "D5", "E5", "G5"], // VERIFY: exact Amara topside layout with final catalogue (inherited from the 13)
    bottom: ["C3", "D3"],
    desc: "Lighter, higher and distinctly meditative — and C3 and D3 beneath the ding add real depth and open chords the topside alone can't reach.",
    availability: "Made for you. Ships 1 December 2026", // fallback; the live ships: date replaces this on load
    inStock: false
  }
];

// ---------- Scale switcher (product pages) ----------
// Every purchasable scale, homepage-range order first, then the rest of the
// shop. Icons come from the matching MODELS entry's note map when one exists;
// otherwise a ding badge parsed from the name. Prices are fetched live.
const SCALES = [
  { name: "F# Low Pygmy 21", handle: "fis-low-pygmy-21-ember-steel" },
  { name: "D Aegean 18", handle: "d-aegean-18-ember-steel" },
  { name: "D Aegean 20", handle: "d-aegean-20-ember-steel" },
  { name: "D Ashakiran 19", handle: "d-ashakiran-19-ember-steel-spotted" },
  { name: "E Amara 20", handle: "e-amara-20-ember-steel" },
  { name: "B2 Aavartan 17", handle: "b2-aavartan-17-ember-steel" },
  { name: "D Kurd 19", handle: "d-kurd-19-ember-steel" },
  { name: "F# Kurd 22", handle: "fis-kurd-22-ember-steel" },
  { name: "F# Kurd 20", handle: "fis-kurd-20-ember-steel" },
  { name: "F#2 Nordlys 16", handle: "fis2-nordlys-16-ember-steel" },
  { name: "C Ashakiran 17", handle: "c-ashakiran-17-ember-steel" },
  { name: "B3 Pygmy 20", handle: "b3-pygmy-20-ember-steel" },
  { name: "E Asha 20", handle: "e-asha-20-ember-steel" },
  { name: "E Equinox 19", handle: "e-equinox-19-ember-steel" },
  { name: "F# Low Pygmy 12", handle: "fis-low-pygmy-12-ember-steel" },
  { name: "D Kurd 12", handle: "d-kurd-12-ember-steel" },
  { name: "D Kurd 13", handle: "d-kurd-13-ember-steel" },
  { name: "D Kurd 14", handle: "d-kurd-14-ember-steel" }
];

// TEMP: placeholder card-photo backgrounds on every model (alternating two of
// the photographer's test crops) until each instrument gets its own shoot.
MODELS.forEach((m, i) => {
  if (!m.cardPhoto) m.cardPhoto = AYASA_ASSET(i % 2 ? "gal-test-3.jpg" : "gal-test-2.jpg") + "?v=2";
});
