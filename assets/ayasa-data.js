// ============================================================
// AYASA — model & pricing data
// Edit this file to update the range. No HTML knowledge needed.
//
// !! DRAFT DATA — transcribed from Ayasa-UK-Distributor-Catalogue-
// Draft-v1.pdf. Verify every note map and price against the final
// catalogue before launch. Known draft inconsistencies are marked
// with "VERIFY:" comments.
//
// Premium prices are intentionally NOT shown on the site —
// purchase happens at shop.ayasainstruments.com. Elements RRPs
// (inc VAT) are public per the catalogue.
// ============================================================

// ---------- Artist registry ----------
// Shared details for anyone appearing in demo videos or the carousel.
// Keyed by base artist name (video labels like "Malte Marten — II" resolve
// to "Malte Marten"). img and links are optional.
// TODO (Ralf): fill in Immie's and Roni's credential/bio + links + photo.
const ARTISTS = {
  "Malte Marten": {
    credential: "1.4M YouTube subscribers · plays mostly Ayasa",
    bio: "Germany's most-watched handpan artist; his Ayasa meditations have been heard over 50 million times on YouTube.",
    img: AYASA_ASSET("player-malte.jpg"),
    links: { youtube: "https://www.youtube.com/@MalteMarten", web: "https://www.maltemarten.com/" }
  },
  "Immie": {
    credential: "Ayasa artist",
    bio: "",           // TODO
    img: "",           // TODO — add portrait to site/assets/
    links: {}          // TODO
  },
  "Roni": {
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
    name: "F# Low Pygmy 21",
    productHandle: "fis-low-pygmy-21-ember-steel",
    scale: "F# minor pentatonic · fully extended",
    ding: "F#3",
    top: ["G#3", "A3", "C#4", "E4", "F#4", "G#4", "A4", "C#5", "E5", "F#5", "G#5"],
    bottom: ["D3", "E3", "B3", "D4", "B4", "D5", "A5", "B5", "C#6"],
    desc: "The deep one. Ethereal and comforting at once — and its bottom side opens a second, A-major voice from the same instrument.",
    availability: "In stock — ships in 1–2 working days",
    inStock: true
  },
  {
    range: "premium",
    name: "D Aegean 18",
    productHandle: "d-aegean-18-ember-steel",
    scale: "D Lydian",
    ding: "D3",
    top: ["F#3", "A3", "C#4", "D4", "F#4", "G#4", "A4", "C#5", "D5", "F#5"],
    bottom: ["B2", "E3", "G#3", "B3", "E4", "B4", "E5"],
    desc: "Ayasa's spacious signature. Quietly mysterious, moving from deep meditative moods to bright melodic exploration without losing its calm.",
    availability: "In stock — ships in 1–2 working days",
    inStock: true,
    // detailPage: re-enable when the D Aegean 18 product page (with 3D viewer) exists on Shopify
    // homepage lightbox: delayed "View in shop" for this model's product page
    videoShop: { name: "D Aegean 18 — Ember Steel®", url: "/products/d-aegean-18-ember-steel" },
    // demo clips: one poster jpg per mp4 (same basename), served from theme assets
    videos: [
      { artist: "Malte Marten", file: AYASA_ASSET("d-aegean-18__malte-1.mp4") },
      { artist: "Malte Marten — II", file: AYASA_ASSET("d-aegean-18__malte-2.mp4") },
      { artist: "Immie", file: AYASA_ASSET("d-aegean-18__immie.mp4") },
      { artist: "Roni", file: AYASA_ASSET("d-aegean-18__roni.mp4") }
    ]
  },
  {
    range: "premium",
    name: "D Aegean 20",
    productHandle: "d-aegean-20-ember-steel",
    scale: "D Lydian · extended",
    ding: "D3",
    top: ["F#3", "A3", "C#4", "D4", "F#4", "G#4", "A4", "C#5", "D5", "F#5", "G#5", "A5"],
    bottom: ["B2", "E3", "G#3", "B3", "E4", "B4", "E5"],
    desc: "The Aegean's reach, extended — two more voices in the upper register for players who want the full canvas.",
    availability: "In stock — ships in 1–2 working days",
    inStock: true
  },
  {
    range: "premium",
    name: "D Ashakiran 19",
    productHandle: "d-ashakiran-19-ember-steel-spotted",
    scale: "Extended major · “Ray of Hope”",
    ding: "D3",
    top: ["G3", "A3", "B3", "C#4", "D4", "E4", "F#4", "A4", "B4", "F#5"], // VERIFY: catalogue card partly illegible in draft
    bottom: ["E3", "F#3", "G4", "C#5", "D5", "E5", "G5", "A5"],
    desc: "The extended major scale co-created with Malte Marten in 2017 — uplifting and easy to love, with just enough melancholy to keep it honest.",
    availability: "In stock — ships in 1–2 working days",
    inStock: true
  },
  {
    range: "premium",
    name: "E Amara 20",
    productHandle: "e-amara-20-ember-steel",
    scale: "E Celtic minor · fully extended",
    ding: "E3",
    top: ["B3", "D4", "E4", "F#4", "G4", "A4", "B4", "D5", "E5", "F#5", "G5", "A5"], // VERIFY against final catalogue
    bottom: ["C3", "D3", "F#3", "G3", "A3", "C4", "C5"],
    desc: "Celtic minor across twenty notes, lighter and more ethereal than the Kurd family. The meditative player's scale, and a Malte Marten staple.",
    availability: "In stock — ships in 1–2 working days",
    inStock: true
  },
  {
    range: "premium",
    name: "B2 Aavartan 17",
    productHandle: "b2-aavartan-17-ember-steel",
    scale: "B major · low B2 ding",
    ding: "B2",
    top: ["D#3", "F#3", "G#3", "A#3", "B3", "C#4", "D#4", "F#4"],
    bottom: ["C#3", "E3", "E4", "G#4", "B4", "C#5", "D#5", "E5"],
    desc: "A low B2 ding under a B major scale — warm, enveloping, unhurried. An uncommon voice in any collection.",
    availability: "Built to order — approx. 2 months", // VERIFY: draft catalogue card says in stock, pricing table says 2 months
    inStock: false
  },
  {
    range: "premium",
    name: "D Kurd 19",
    productHandle: "d-kurd-19-ember-steel",
    scale: "Full extended D minor · with Bb2",
    ding: "D3",
    top: ["A3", "Bb3", "C4", "D4", "E4", "F4", "G4", "A4", "C5", "D5", "E5", "F5"],
    bottom: ["Bb2", "F3", "G3", "B3", "E4", "B4", "E5"], // VERIFY: draft bottom row appears mis-copied in catalogue; must include Bb2
    desc: "The world's most-played scale at its fullest expression — and the Bb2 gives it a floor smaller Kurds can't reach.",
    availability: "Built to order — approx. 6 months",
    inStock: false
  },
  {
    range: "premium",
    name: "F#2 Nordlys 16",
    productHandle: "fis2-nordlys-16-ember-steel",
    scale: "F# Lydian hexatonic · deep F#2 ding",
    ding: "F#2",
    top: ["F#3", "G#3", "A#3", "C4", "C#4", "F4", "G#4", "C5"],
    bottom: ["A#2", "C#3", "F3", "F#4", "C#5", "F5", "G#5"],
    desc: "“Northern lights.” A rare Lydian voicing over one of the deepest dings in the range. Bright, mysterious, unlike anything else here.",
    availability: "Built to order — approx. 8 months",
    inStock: false
  },

  // ---------- ELEMENTS — built in the UK ----------
  {
    range: "elements",
    name: "Elements D Kurd 11",
    scale: "D minor · topside only",
    ding: "D3",
    top: ["A3", "Bb3", "C4", "D4", "E4", "F4", "G4", "A4", "C5", "D5"],
    bottom: [],
    desc: "The essential D minor, properly made — everything you need for your first year of playing.",
    availability: "Launching 2026 — register interest",
    inStock: false,
    rrp: "£2,160 inc VAT"
  },
  {
    range: "elements",
    name: "Elements D Kurd 13",
    scale: "D minor + bottom notes",
    ding: "D3",
    top: ["A3", "Bb3", "C4", "D4", "E4", "F4", "G4", "A4", "C5", "D5"],
    bottom: ["F3", "G3"],
    desc: "The same warm minor, deepened with two bottom notes to give you a floor to grow into.",
    availability: "Launching 2026 — register interest",
    inStock: false,
    rrp: "£2,400 inc VAT"
  },
  {
    range: "elements",
    name: "Elements E Amara 13",
    scale: "E Celtic minor · topside only",
    ding: "E3",
    top: ["G3", "A3", "B3", "D4", "E4", "F#4", "G4", "A4", "B4", "D5", "E5", "G5"], // VERIFY: exact 13-note Amara layout with final catalogue
    bottom: [],
    desc: "Lighter, higher and distinctly meditative — the natural second voice, or a brighter way in.",
    availability: "Launching 2026 — register interest",
    inStock: false,
    rrp: "£2,400 inc VAT"
  }
];
