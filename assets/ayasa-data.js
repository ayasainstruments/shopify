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
    AYASA_ASSET("gal-test-5.jpg") + "?v=2",
    AYASA_ASSET("gal-test-3.jpg") + "?v=2" // repeat: six thumbs line up with the four video cards
  ]
};

// ---------- Artist registry ----------
// Shared details for anyone appearing in demo videos or the carousel.
// Keyed by base artist name (video labels like "Malte Marten · II" resolve
// to "Malte Marten"). img and links are optional.
// TODO (Ralf): Immanuel still needs a credential/bio + links + photo.
const ARTISTS = {
  "Malte Marten": {
    credential: "1.4M YouTube subscribers · plays mostly Ayasa",
    bio: "The world's most-listened handpan artist; his Ayasa meditations have been heard over 50 million times on YouTube.",
    img: AYASA_ASSET("player-malte.jpg"),
    page: "/pages/malte-marten",
    links: { youtube: "https://www.youtube.com/@MalteMarten", instagram: "https://www.instagram.com/maltemarten/", web: "https://www.maltemarten.com/" },
    visiblePlays: 4,
    clips: [
      { name: "D Aegean 18", mode: "D Lydian", handle: "d-aegean-18-ember-steel", file: AYASA_ASSET("malte-marten-d-aegean-18-1.mp4") },
      { name: "D Aegean 18", mode: "D Lydian", handle: "d-aegean-18-ember-steel", file: AYASA_ASSET("malte-marten-d-aegean-18-2.mp4") },
      { name: "C Ashakiran 17", mode: "", handle: "c-ashakiran-17-ember-steel", file: AYASA_ASSET("malte-marten-c-ashakiran-17-1.mp4") },
      { name: "C Ashakiran 17", mode: "", handle: "c-ashakiran-17-ember-steel", file: AYASA_ASSET("malte-marten-c-ashakiran-17-2.mp4") },
      { name: "F# Low Pygmy 21", mode: "F# minor pentatonic · fully extended", handle: "fis-low-pygmy-21-ember-steel", file: AYASA_ASSET("malte-marten-fis-low-pygmy-21-1.mp4") },
      { name: "F# Low Pygmy 21", mode: "F# minor pentatonic · fully extended", handle: "fis-low-pygmy-21-ember-steel", file: AYASA_ASSET("malte-marten-fis-low-pygmy-21-2.mp4") },
      { name: "D Ashakiran 19", mode: "Extended major · “Ray of Hope”", handle: "d-ashakiran-19-ember-steel-spotted", file: AYASA_ASSET("malte-marten-d-ashakiran-19-1.mp4") }
    ],
    plays: [
      { name: "D Aegean 18", mode: "D Lydian", handle: "d-aegean-18-ember-steel",
        videos: [AYASA_ASSET("malte-marten-d-aegean-18-1.mp4"), AYASA_ASSET("malte-marten-d-aegean-18-2.mp4")] },
      { name: "C Ashakiran 17", mode: "", handle: "c-ashakiran-17-ember-steel",
        videos: [AYASA_ASSET("malte-marten-c-ashakiran-17-1.mp4"), AYASA_ASSET("malte-marten-c-ashakiran-17-2.mp4")] },
      { name: "F# Low Pygmy 21", mode: "F# minor pentatonic · fully extended", handle: "fis-low-pygmy-21-ember-steel",
        videos: [AYASA_ASSET("malte-marten-fis-low-pygmy-21-1.mp4"), AYASA_ASSET("malte-marten-fis-low-pygmy-21-2.mp4")] },
      { name: "D Ashakiran 19", mode: "Extended major · “Ray of Hope”", handle: "d-ashakiran-19-ember-steel-spotted",
        videos: [AYASA_ASSET("malte-marten-d-ashakiran-19-1.mp4")] }
    ]
  },
  "Vybeshift": {
    credential: "Breathwork and sound healing · Los Angeles",
    bio: "Roni Yohanan performs as Vybeshift: breathwork first, then handpan and crystal bowls to settle what the breath has opened.",
    img: AYASA_ASSET("player-vybeshift.jpg") + "?v=2",
    page: "/pages/vybeshift",
    links: { youtube: "https://youtube.com/@vybeshift", instagram: "https://www.instagram.com/vybeshift", web: "https://www.vybeshift.com/" },
    visiblePlays: 2,
    clips: [
      { name: "E Amara 20", mode: "E Celtic minor · fully extended", handle: "e-amara-20-ember-steel", file: AYASA_ASSET("vybeshift-e-amara-20-1.mp4") },
      { name: "E Amara 20", mode: "E Celtic minor · fully extended", handle: "e-amara-20-ember-steel", file: AYASA_ASSET("vybeshift-e-amara-20-2.mp4") },
      { name: "B2 Aavartan 17", mode: "B major · low B2 ding", handle: "b2-aavartan-17-ember-steel", file: AYASA_ASSET("vybeshift-b2-aavartan-17-1.mp4") },
      { name: "D Aegean 18", mode: "D Lydian", handle: "d-aegean-18-ember-steel", file: AYASA_ASSET("vybeshift-d-aegean-18-1.mp4") },
      { name: "E Amara 20", mode: "E Celtic minor · fully extended", handle: "e-amara-20-ember-steel", file: AYASA_ASSET("vybeshift-e-amara-20-3.mp4") },
      { name: "E Amara 20", mode: "E Celtic minor · fully extended", handle: "e-amara-20-ember-steel", file: AYASA_ASSET("vybeshift-e-amara-20-4.mp4") }
    ],
    plays: [
      { name: "E Amara 20", mode: "E Celtic minor · fully extended", handle: "e-amara-20-ember-steel",
        videos: [AYASA_ASSET("vybeshift-e-amara-20-1.mp4"), AYASA_ASSET("vybeshift-e-amara-20-2.mp4"), AYASA_ASSET("vybeshift-e-amara-20-3.mp4"), AYASA_ASSET("vybeshift-e-amara-20-4.mp4")] },
      { name: "D Aegean 18", mode: "D Lydian", handle: "d-aegean-18-ember-steel",
        videos: [AYASA_ASSET("vybeshift-d-aegean-18-1.mp4")] },
      { name: "B2 Aavartan 17", mode: "B major · low B2 ding", handle: "b2-aavartan-17-ember-steel",
        videos: [AYASA_ASSET("vybeshift-b2-aavartan-17-1.mp4")] }
    ]
  },
  "Johann Immanuel": {
    credential: "Ayasa artist",
    bio: "",
    img: AYASA_ASSET("player-johann-immanuel.jpg") + "?v=2",
    page: "/pages/johann-immanuel",
    links: { youtube: "https://www.youtube.com/@johannimmanuel", instagram: "https://www.instagram.com/johannimmanuel/", web: "https://www.tiktok.com/@johannimmanuel_" },
    visiblePlays: 4,
    clips: [
      { name: "D Aegean 18", mode: "D Lydian", handle: "d-aegean-18-ember-steel", file: AYASA_ASSET("johann-immanuel-d-aegean-18-1.mp4") },
      { name: "F# Low Pygmy 21", mode: "F# minor pentatonic · fully extended", handle: "fis-low-pygmy-21-ember-steel", file: AYASA_ASSET("johann-immanuel-fis-low-pygmy-21-1.mp4") },
      { name: "E Amara 20", mode: "E Celtic minor · fully extended", handle: "e-amara-20-ember-steel", file: AYASA_ASSET("johann-immanuel-e-amara-20-1.mp4") },
      { name: "C Ashakiran 17", mode: "", handle: "c-ashakiran-17-ember-steel", file: AYASA_ASSET("johann-immanuel-c-ashakiran-17-1.mp4") }
    ],
    plays: [
      { name: "D Aegean 18", mode: "D Lydian", handle: "d-aegean-18-ember-steel",
        videos: [AYASA_ASSET("johann-immanuel-d-aegean-18-1.mp4")] },
      { name: "F# Low Pygmy 21", mode: "F# minor pentatonic · fully extended", handle: "fis-low-pygmy-21-ember-steel",
        videos: [AYASA_ASSET("johann-immanuel-fis-low-pygmy-21-1.mp4")] },
      { name: "E Amara 20", mode: "E Celtic minor · fully extended", handle: "e-amara-20-ember-steel",
        videos: [AYASA_ASSET("johann-immanuel-e-amara-20-1.mp4")] },
      { name: "C Ashakiran 17", mode: "", handle: "c-ashakiran-17-ember-steel",
        videos: [AYASA_ASSET("johann-immanuel-c-ashakiran-17-1.mp4")] }
    ]
  },
  "Julia Baier": {
    credential: "Records as Changeofcolours · all improvised",
    bio: "",
    img: AYASA_ASSET("player-changeofcolours-julia-baier.jpg"),
    links: { youtube: "https://www.youtube.com/@changeofcolours", instagram: "https://www.instagram.com/changeofcolours/", web: "https://changeofcolours.com/" },
    visiblePlays: 4,
    clips: [
      { name: "F# Low Pygmy 21", mode: "F# minor pentatonic · fully extended", handle: "fis-low-pygmy-21-ember-steel", file: AYASA_ASSET("julia-baier-fis-low-pygmy-21-1.mp4") },
      { name: "E Amara 20", mode: "E Celtic minor · fully extended", handle: "e-amara-20-ember-steel", file: AYASA_ASSET("julia-baier-e-amara-20-1.mp4") },
      { name: "D Ashakiran 19", mode: "Extended major · “Ray of Hope”", handle: "d-ashakiran-19-ember-steel-spotted", file: AYASA_ASSET("julia-baier-d-ashakiran-19-1.mp4") }
    ],
    plays: [
      { name: "F# Low Pygmy 21", mode: "F# minor pentatonic · fully extended", handle: "fis-low-pygmy-21-ember-steel",
        videos: [AYASA_ASSET("julia-baier-fis-low-pygmy-21-1.mp4")] },
      { name: "E Amara 20", mode: "E Celtic minor · fully extended", handle: "e-amara-20-ember-steel",
        videos: [AYASA_ASSET("julia-baier-e-amara-20-1.mp4")] },
      { name: "D Ashakiran 19", mode: "Extended major · “Ray of Hope”", handle: "d-ashakiran-19-ember-steel-spotted",
        videos: [AYASA_ASSET("julia-baier-d-ashakiran-19-1.mp4")] }
    ]
  },
  "Jeremy Nattagh": {
    credential: "Live-looping soloist · teaches Master the Handpan",
    bio: "",
    img: AYASA_ASSET("player-jeremy-nattagh.jpg"),
    links: { youtube: "https://www.youtube.com/@JeremyNattagh/videos", instagram: "http://www.instagram.com/jeremy_nattagh/", web: "http://www.nattagh.fr/" },
    visiblePlays: 4,
    clips: [
      { name: "B2 Aavartan 17", mode: "B major · low B2 ding", handle: "b2-aavartan-17-ember-steel", file: AYASA_ASSET("jeremy-nattagh-b2-aavartan-17-1.mp4") }
    ],
    plays: [
      { name: "B2 Aavartan 17", mode: "B major · low B2 ding", handle: "b2-aavartan-17-ember-steel",
        videos: [AYASA_ASSET("jeremy-nattagh-b2-aavartan-17-1.mp4")] }
    ]
  },
  "Łukasz Dembiński": {
    credential: "1,000+ concerts · founder of Foliba",
    bio: "",
    img: AYASA_ASSET("player-lukasz-dembinski.jpg"),
    links: { youtube: "https://www.youtube.com/channel/UCZjFaTR29jubrGa4ZZ-haJA", instagram: "https://www.instagram.com/lukasz_dembinski/", music: "https://open.spotify.com/artist/4ki17Pcjvii44WnQ77VT5j", web: "http://www.lukaszdembinski.com/" },
    visiblePlays: 4,
    clips: [
      { name: "C Ashakiran 17", mode: "", handle: "c-ashakiran-17-ember-steel", file: AYASA_ASSET("lukasz-dembinski-c-ashakiran-17-1.mp4") },
      { name: "C Ashakiran 17", mode: "", handle: "c-ashakiran-17-ember-steel", file: AYASA_ASSET("lukasz-dembinski-c-ashakiran-17-2.mp4") },
      { name: "F# Low Pygmy 21", mode: "F# minor pentatonic · fully extended", handle: "fis-low-pygmy-21-ember-steel", file: AYASA_ASSET("lukasz-dembinski-fis-low-pygmy-21-1.mp4") }
    ],
    plays: [
      { name: "C Ashakiran 17", mode: "", handle: "c-ashakiran-17-ember-steel",
        videos: [AYASA_ASSET("lukasz-dembinski-c-ashakiran-17-1.mp4"), AYASA_ASSET("lukasz-dembinski-c-ashakiran-17-2.mp4")] },
      { name: "F# Low Pygmy 21", mode: "F# minor pentatonic · fully extended", handle: "fis-low-pygmy-21-ember-steel",
        videos: [AYASA_ASSET("lukasz-dembinski-fis-low-pygmy-21-1.mp4")] }
    ]
  },
  "Tomek Torres": {
    credential: "Session drummer, Poland · “Handpan Meditations”",
    bio: "",
    img: AYASA_ASSET("player-tomek-torres.jpg"),
    links: { youtube: "https://www.youtube.com/@tomektorresmusic", instagram: "https://www.instagram.com/tomektorres/", music: "https://open.spotify.com/artist/23L0CzYMuf5yUd0Pgzq8g4?si=aA6l2qPOS-uhPYJ1CbbUlA&nd=1&dlsi=5122bbad7eb647bf" },
    visiblePlays: 4,
    clips: [
      { name: "C Ashakiran 17", mode: "", handle: "c-ashakiran-17-ember-steel", file: AYASA_ASSET("tomek-torres-c-ashakiran-17-1.mp4") },
      { name: "F# Low Pygmy 21", mode: "F# minor pentatonic · fully extended", handle: "fis-low-pygmy-21-ember-steel", file: AYASA_ASSET("tomek-torres-fis-low-pygmy-21-1.mp4") }
    ],
    plays: [
      { name: "C Ashakiran 17", mode: "", handle: "c-ashakiran-17-ember-steel",
        videos: [AYASA_ASSET("tomek-torres-c-ashakiran-17-1.mp4")] },
      { name: "F# Low Pygmy 21", mode: "F# minor pentatonic · fully extended", handle: "fis-low-pygmy-21-ember-steel",
        videos: [AYASA_ASSET("tomek-torres-fis-low-pygmy-21-1.mp4")] }
    ]
  },
  "Warren Shanti": {
    credential: "Self-taught · sound healer and teacher",
    bio: "",
    img: AYASA_ASSET("player-warren-shanti.jpg"),
    links: { youtube: "https://www.youtube.com/channel/UC4eeCb06B2CKRjGanve1zog", instagram: "https://www.instagram.com/warren_shanti/", music: "https://open.spotify.com/artist/3XwAsaKVwRUdKkHZKAGovh" },
    visiblePlays: 4,
    clips: [
      { name: "F# Low Pygmy 21", mode: "F# minor pentatonic · fully extended", handle: "fis-low-pygmy-21-ember-steel", file: AYASA_ASSET("warren-shanti-fis-low-pygmy-21-1.mp4") },
      { name: "F# Low Pygmy 21", mode: "F# minor pentatonic · fully extended", handle: "fis-low-pygmy-21-ember-steel", file: AYASA_ASSET("warren-shanti-fis-low-pygmy-21-2.mp4") },
      { name: "D Ashakiran 19", mode: "Extended major · “Ray of Hope”", handle: "d-ashakiran-19-ember-steel-spotted", file: AYASA_ASSET("warren-shanti-d-ashakiran-19-1.mp4") }
    ],
    plays: [
      { name: "F# Low Pygmy 21", mode: "F# minor pentatonic · fully extended", handle: "fis-low-pygmy-21-ember-steel",
        videos: [AYASA_ASSET("warren-shanti-fis-low-pygmy-21-1.mp4"), AYASA_ASSET("warren-shanti-fis-low-pygmy-21-2.mp4")] },
      { name: "D Ashakiran 19", mode: "Extended major · “Ray of Hope”", handle: "d-ashakiran-19-ember-steel-spotted",
        videos: [AYASA_ASSET("warren-shanti-d-ashakiran-19-1.mp4")] }
    ]
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
    handle: "malte-marten",
    img: AYASA_ASSET("player-malte.jpg"),
    featured: true,
    links: { youtube: "https://www.youtube.com/@MalteMarten", web: "https://www.maltemarten.com/" }
  },
  {
    name: "David Charrier",
    credential: "Founder, Master the Handpan · 7,500+ students",
    quote: "Precise, with good balance, stability and a great sustain. I love performing with them on stage.",
    handle: "david-charrier",
    img: AYASA_ASSET("player-charrier.jpg"),
    featured: true,
    links: { web: "https://www.masterthehandpan.com/" }
  },
  {
    name: "Dan Mulqueen",
    credential: "Recording artist · plays Ayasa",
    quote: "The flawless appearance matches the crystal clear tone and character you hear in the sound.",
    handle: "dan-mulqueen",
    img: AYASA_ASSET("player-mulqueen.jpg"),
    featured: true,
    links: { youtube: "https://www.youtube.com/DanMulqueen", instagram: "https://www.instagram.com/danmulqueen/", web: "https://www.danmulqueen.com/" }
  },
  {
    name: "David Kuckhermann",
    credential: "World percussionist · toured with Dead Can Dance",
    quote: "Ralf not only builds these beauties, he is also open for experiments and innovation.",
    handle: "david-kuckhermann",
    img: AYASA_ASSET("player-david-kuckhermann.jpg"),
    links: { youtube: "https://www.youtube.com/user/DavidKuckhermann", web: "http://worldpercussion.net/" }
  },
  {
    name: "Jeremy Nattagh",
    credential: "Live-looping soloist · teaches Master the Handpan",
    quote: "What resonates with me in Ayasa craft is the constant search for pristine sound and balance.",
    handle: "jeremy-nattagh",
    img: AYASA_ASSET("player-jeremy-nattagh.jpg"),
    links: { youtube: "https://www.youtube.com/@JeremyNattagh/videos", instagram: "http://www.instagram.com/jeremy_nattagh/", music: "https://open.spotify.com/artist/2ztpUNuwyFwI6yG9nFCrvF", web: "http://www.nattagh.fr/" }
  },
  {
    // not on the old site — portrait is a frame from our own D Aegean footage.
    // Card shows the first sentence; her full quote lives on her artist page.
    name: "Vybeshift",
    credential: "Breathwork and sound healing · Los Angeles",
    quote: "There’s something so alive and emotionally expressive in every Ayasa instrument I’ve touched.",
    handle: "vybeshift",
    img: AYASA_ASSET("player-vybeshift.jpg") + "?v=2", // beach photo replaced the video frame under the same name
    featured: true,
    links: { youtube: "https://youtube.com/@vybeshift", instagram: "https://www.instagram.com/vybeshift", web: "https://www.vybeshift.com/" }
  },
  {
    name: "Warren Shanti",
    credential: "Self-taught · sound healer and teacher",
    quote: "Each handpan is a true masterpiece, both visually and musically.",
    handle: "warren-shanti",
    img: AYASA_ASSET("player-warren-shanti.jpg"),
    links: { youtube: "https://www.youtube.com/channel/UC4eeCb06B2CKRjGanve1zog", instagram: "https://www.instagram.com/warren_shanti/", music: "https://open.spotify.com/artist/3XwAsaKVwRUdKkHZKAGovh" }
  },
  {
    name: "Tomek Torres",
    credential: "Session drummer, Poland · “Handpan Meditations”",
    quote: "There is one word that describes what I love about Ayasa handpans - PERFECTION.",
    handle: "tomek-torres",
    img: AYASA_ASSET("player-tomek-torres.jpg"),
    links: { youtube: "https://www.youtube.com/@tomektorresmusic", instagram: "https://www.instagram.com/tomektorres/", music: "https://open.spotify.com/artist/23L0CzYMuf5yUd0Pgzq8g4?si=aA6l2qPOS-uhPYJ1CbbUlA&nd=1&dlsi=5122bbad7eb647bf" }
  },
  {
    name: "Julia Baier",
    credential: "Records as Changeofcolours · all improvised",
    quote: "I’m amazed again and again by the crystal clear, precise and warm sound of their instruments.",
    handle: "julia-baier",
    img: AYASA_ASSET("player-changeofcolours-julia-baier.jpg"),
    links: { youtube: "https://www.youtube.com/@changeofcolours", instagram: "https://www.instagram.com/changeofcolours/", web: "https://changeofcolours.com/" }
  },
  {
    name: "Łukasz Dembiński",
    credential: "1,000+ concerts · founder of Foliba",
    quote: "Absolutely crystal-clear, pure, stable, and perfect sound of the entire instrument.",
    handle: "lukasz-dembinski",
    img: AYASA_ASSET("player-lukasz-dembinski.jpg"),
    links: { youtube: "https://www.youtube.com/channel/UCZjFaTR29jubrGa4ZZ-haJA", instagram: "https://www.instagram.com/lukasz_dembinski/", music: "https://open.spotify.com/artist/4ki17Pcjvii44WnQ77VT5j", web: "http://www.lukaszdembinski.com/" }
  },
  {
    name: "Gabriele Pollina",
    credential: "Drummer turned handpan · meets electronics",
    quote: "My Ayasa is my rock, a companion through a thousand adventures.",
    handle: "gabriele-pollina",
    img: AYASA_ASSET("player-gabriele-pollina.jpg"),
    links: { youtube: "https://www.youtube.com/@GabrielePollina", instagram: "https://www.instagram.com/gabriele_pollina/", music: "https://gabrielepollina.bandcamp.com/" }
  },
  {
    name: "Alexander Mercks",
    credential: "Co-founder of Yatao · album “Osmosis”",
    quote: "Ayasa handpans are in my opinion the best handpans in the world.",
    handle: "alexander-mercks",
    img: AYASA_ASSET("player-alexander-mercks.jpg"),
    featured: true,
    links: { youtube: "https://www.youtube.com/@alexandermercks", instagram: "https://www.instagram.com/alexander.mercks/", music: "https://open.spotify.com/artist/1GykWQWG7xcdwxdLiX40jL", web: "https://alexander-mercks.com/" }
  },
  {
    name: "Nadishana",
    credential: "Plays 200+ instruments · world fusion, Berlin",
    quote: "Thanks to Ralf and Ayasa team for accepting the challenge and making for me the double-side instrument with 20 notes and no Gu!",
    handle: "nadishana",
    img: AYASA_ASSET("player-nadishana.jpg"),
    links: { web: "http://nadishana.com/index.php/en/projects/nadishana-kuckhermann-metz" }
  },
  {
    name: "Marcel Hutter",
    credential: "Street musician, Linz · busks across Europe",
    quote: "I worked incredibly hard during the winter months, busking until my fingers bled.",
    handle: "marcel-hutter",
    img: AYASA_ASSET("player-marcel-hutter.jpg"),
    links: { youtube: "https://www.youtube.com/user/skelter1992" }
  },
  {
    name: "Laurent Sureau",
    credential: "Conservatory prizes · playing since 2005",
    quote: "A special Ayasa, full with feeling, amazing sound and touching nature.",
    handle: "laurent-sureau",
    img: AYASA_ASSET("player-laurent-sureau.jpg"),
    links: { youtube: "https://www.youtube.com/channel/UC6s1l_zsHImitRsQ81-OtqA", music: "https://oloji.bandcamp.com/album/orion", web: "http://www.laurent-sureau.net/" }
  },
  {
    name: "Lea Valentina",
    credential: "Founder, Handpan Atelier Munich",
    quote: "I love the Ayasa handpans for crystal clear sound and the purity of the notes.",
    handle: "lea-valentina",
    img: AYASA_ASSET("player-lea-valentina.jpg"),
    featured: true,
    links: { youtube: "https://www.youtube.com/c/LeaValentina", instagram: "https://www.instagram.com/leavalentina.music/", music: "https://open.spotify.com/artist/2sulGEfNo27qx0Hssaw2D7", web: "https://leavalentina.com/" }
  },
  {
    name: "Konstantin Rössler",
    credential: "Full-time musician · concerts and retreats",
    quote: "The precision in sound and dynamic range is out of this world.",
    handle: "konstantin-rossler",
    img: AYASA_ASSET("player-konstantin-rossler.jpg"),
    links: { youtube: "https://www.youtube.com/@konstantin.roessler/featured", instagram: "https://www.instagram.com/konstantin.roessler/", music: "https://open.spotify.com/artist/4qedSQHMODqYZOTF10C8le", web: "https://konstantin-roessler.com/" }
  },
  {
    name: "Adrian J Portia",
    credential: "Percussionist, Melbourne · “the hummingbird”",
    quote: "What I love about the Ayasa is ease of playability, they are very responsive with beautiful sustain and consistency in sound.",
    handle: "adrian-j-portia",
    img: AYASA_ASSET("player-adrian-j-portia.jpg"),
    links: { youtube: "http://www.youtube.com/user/ADRIANJPDRUM/", instagram: "https://instagram.com/adrianjportia", music: "https://soundcloud.com/adrian-portia", web: "http://www.adrianportia.com/" }
  },
  {
    name: "Johann Immanuel",
    credential: "Ayasa artist",
    quote: "There are no instruments that sound more beautiful, pure, and warm than those from Ayasa.",
    handle: "johann-immanuel",
    img: AYASA_ASSET("player-johann-immanuel.jpg") + "?v=2",
    links: { youtube: "https://www.youtube.com/@johannimmanuel", instagram: "https://www.instagram.com/johannimmanuel/", web: "https://www.tiktok.com/@johannimmanuel_" }
  },
  {
    name: "Rishiraj Kulkarni",
    credential: "Tabla player · designed his own Ayasa scale",
    quote: "Ayasa over the years has become like a musical family in the Netherlands.",
    handle: "rishiraj-kulkarni",
    img: AYASA_ASSET("player-rishiraj-kulkarni.jpg"),
    links: { youtube: "https://www.youtube.com/@rishiraj.kulkarni", instagram: "https://www.instagram.com/rishiraj.kulkarni", music: "https://open.spotify.com/artist/4mdUQh0dEzK2PIZkOFOVtz", web: "https://www.rishirajkulkarni.com/" }
  },
  {
    name: "Louis L",
    credential: "Hamburg percussionist and producer",
    quote: "I consider Ralf and his team friends who grant humanity the access to some of the finest musical instruments on this planet.",
    handle: "louis-l",
    img: AYASA_ASSET("player-louis-l.jpg"),
    links: { youtube: "https://www.youtube.com/@louisl.fourbirds1229", instagram: "https://www.instagram.com/louisfourbirdshandpan/?hl=de", music: "https://open.spotify.com/artist/6m0EZM8DbeVBK2XVc6yp5S", web: "https://www.llart.org/" }
  },
  {
    name: "Simon Wood",
    credential: "UK teacher · Womad and HangOut UK",
    handle: "simon-wood",
    img: AYASA_ASSET("player-simon-wood.jpg"),
    links: { youtube: "https://www.youtube.com/channel/UCHIw4MRf8A1iO_gDpmo1DZQ", music: "https://soundcloud.com/simonwoodmusic", web: "https://simonwoodmusic.com/" }
  },
  {
    name: "Leander Greitemann",
    credential: "Speaker and author · 1M+ views with Malte Marten",
    quote: "After that I knew I HAD to have one for myself.",
    handle: "leander-greitemann",
    img: AYASA_ASSET("player-leander-greitemann.jpg"),
    links: { youtube: "https://www.youtube.com/@Leander.Greitemann", instagram: "https://www.instagram.com/leanderhandpan/", music: "https://open.spotify.com/artist/4dTenh8RyuuIR67QUrGY7Z?si=OiQRarlFSmmOb3LNeM7OQQ&nd=1&dlsi=a037259e670a4bbc" }
  },
  {
    name: "Taylor Sol",
    credential: "Sound healer · debut album “Ancestry”",
    quote: "Ayasa holds the best sound, stability & feeling in the Handpan world.",
    handle: "taylor-sol",
    img: AYASA_ASSET("player-taylor-sol.jpg"),
    links: { youtube: "https://www.youtube.com/@taylorsol", instagram: "https://www.instagram.com/taylorthesol/", music: "https://open.spotify.com/artist/2cNOXtjWrwZvelyviaZoa7?si=TcoxNpjkTaC5okJK0ws0TA&nd=1&dlsi=53a4c8734f0d4cb9", web: "https://taylorsol.love/" }
  },
  {
    name: "Sam Maher",
    credential: "Played 22 countries · 18M views from the NYC subway",
    quote: "I was utterly consumed by the instruments clarity, resonance, feel and well-rounded sound.",
    handle: "sam-maher",
    img: AYASA_ASSET("player-sam-maher.jpg"),
    featured: true,
    links: { youtube: "https://www.youtube.com/sammahermusic", instagram: "https://www.instagram.com/sammahermusic" }
  },
  {
    name: "Dany Rud",
    credential: "Handpan teacher · 100+ students worldwide",
    quote: "For me, Ayasa are the best handpan makers in the world.",
    handle: "dany-rud",
    img: AYASA_ASSET("player-dany-rud.jpg"),
    links: { youtube: "https://www.youtube.com/@Danyrud", instagram: "https://www.instagram.com/dany.rud/?utm_source=ig_web_button_share_sheet", web: "https://www.danyrud.com/" }
  },
  {
    name: "Alessio De Simone",
    credential: "Percussionist and busker · Rome",
    quote: "I was mesmerized by the quality of the sound they spread, it shines in the air!",
    handle: "alessio-de-simone",
    img: AYASA_ASSET("player-alessio-de-simone.jpg"),
    links: { instagram: "https://www.instagram.com/alessio_desimone_handpan/?hl=it", music: "https://soundcloud.com/casperhang" }
  },
  {
    name: "Angus Lee",
    credential: "Handpan player, Taiwan · scores for cinema",
    quote: "Their instrument have bright sound, long and balanced sustain.",
    handle: "angus-lee",
    img: AYASA_ASSET("player-angus-lee.jpg"),
    links: { youtube: "https://www.youtube.com/channel/UCu8ROl7zbn177zwbzftltdQ" }
  },
  {
    name: "Philippe Gagné",
    credential: "Street musician, Quebec City",
    quote: "Lovely balanced instrument with clear tones, beautiful timbre and perfectly tuned harmonics.",
    handle: "philippe-gagne",
    img: AYASA_ASSET("player-philippe-gagne.jpg"),
    links: { music: "https://philippegagne.bandcamp.com/", web: "http://bit.ly/2dyVjsz" }
  },
  {
    name: "Benny Bettane",
    credential: "Travelling player · handpan since 2014",
    quote: "They have a huge dynamic range, very clean tones, flexible harmonics, strong percussive qualities.",
    handle: "benny-bettane",
    img: AYASA_ASSET("player-benny-bettane.jpg"),
    links: { youtube: "https://www.youtube.com/user/stereosalad/videos", instagram: "https://www.instagram.com/bennybettane_music/", web: "http://www.bennybettane.com/" }
  },
  {
    name: "Jonny Ong",
    credential: "Singer-songwriter, Singapore",
    quote: "When I received my first Ayasa I was just blown away by how amazing it sounded.",
    handle: "jonny-ong",
    img: AYASA_ASSET("player-jonny-ong.jpg"),
    links: { youtube: "https://www.youtube.com/channel/UCuxgFktce9-ZoTxJtm5Tfgw", music: "https://soundcloud.com/jonny-ong" }
  },
  {
    name: "Kim Boulard",
    credential: "Found the handpan in 2019 · plays a C# Pygmy",
    quote: "Ayasa instruments are just DIVINE. Sounds like perfection, purity.",
    handle: "kim-boulard",
    img: AYASA_ASSET("player-kim-boulard.jpg"),
    links: { instagram: "https://www.instagram.com/kimoon/?utm_source=qr" }
  },
  {
    name: "Vasilis Vasiliou",
    credential: "Drummer, Cyprus · World Jazz Trio Tricoolore",
    quote: "I was hitting a note and the note came to life.",
    handle: "vasilis-vasiliou",
    img: AYASA_ASSET("player-vasilis-vasiliou.jpg"),
    links: { youtube: "https://www.youtube.com/c/VasilisVasiliou", instagram: "https://www.instagram.com/vasilis__vasiliou", web: "http://vasilisv.com/" }
  },
  {
    name: "Mark D’Ambrosio",
    credential: "Founder, Steel Mountain Handpan Gathering",
    quote: "Very few Handpans I have played feel quite as good in my hands as the Ayasa.",
    handle: "mark-dambrosio",
    img: AYASA_ASSET("player-mark-dambrosio.jpg"),
    links: { youtube: "https://www.youtube.com/channel/UCNjKlniY46JOmfADetE3zZw/feed", instagram: "https://www.instagram.com/brokedrummer/", web: "https://markdambrosiomusic.com/home" }
  },
  {
    name: "Florian Betz",
    credential: "Marimba and handpan · plays three Ayasas",
    quote: "I love the bright and strong sound of the Ayasa Instruments. Especially in the high range.",
    handle: "florian-betz",
    img: AYASA_ASSET("player-florian-betz.jpg"),
    links: { youtube: "https://www.youtube.com/channel/UCq7EiykYCU1aO0vBLkxoq4w", music: "https://florianbetz.bandcamp.com/", web: "http://marimbaklaenge.de/" }
  },
  {
    name: "Peter Levitov",
    credential: "Founder of Handpan 360 · sound healing",
    quote: "When you purchase an Ayasa you can feel pretty confident you will be receiving a great instrument.",
    handle: "peter-levitov",
    img: AYASA_ASSET("player-peter-levitov.jpg"),
    links: { instagram: "http://www.instagram.com/peterlevitov", web: "http://www.handpan360.com/" }
  },
  {
    name: "Rodrik",
    credential: "Portuguese didgeridoo and handpan player",
    quote: "The amazing sound quality, beautiful design, perfect tuning, clear harmonics and reliable material.",
    handle: "rodrik",
    img: AYASA_ASSET("player-rodrik.jpg"),
    links: { youtube: "https://www.youtube.com/channel/UC9BBvrM6Cvopat0JoCFT-5w", music: "http://rodrik.bandcamp.com/" }
  },
  {
    name: "Jacob Cole",
    credential: "Berklee graduate · world percussionist",
    quote: "Every Ayasa I have tried are among the best looking and sounding handpans in the world!",
    handle: "jacob-cole",
    img: AYASA_ASSET("player-jacob-cole.jpg"),
    links: { youtube: "https://www.youtube.com/user/RogueChimp2", instagram: "https://www.instagram.com/jacobcolepercussion/", music: "https://soundcloud.com/jacobcolepercussion", web: "http://jacobcolepercussion.com/" }
  },
  {
    name: "Guitòti",
    credential: "Conservatory-trained percussionist · Paris",
    quote: "The sound of the Ayasa is a delight and very peculiar. When you have tried one, you can’t live without it.",
    handle: "guitoti",
    img: AYASA_ASSET("player-guitoti.jpg"),
    links: { youtube: "https://www.youtube.com/channel/UCsYqXauRIAoCpb7x-8ex8Ew", web: "http://www.guitoti.fr/" }
  },
  {
    name: "Davide Swarup",
    credential: "Italian hang player · meditative improvisation",
    handle: "davide-swarup",
    img: AYASA_ASSET("player-david-swarup.jpg"),
    links: { youtube: "http://www.youtube.com/davideswarup", music: "http://www.soundcloud.com/davideswarup", web: "http://www.music.davideswarup.com/" }
  },
  {
    name: "Dani Galfione",
    credential: "Italian drummer turned handpan player",
    quote: "The overall quality and the richness of sound is just amazing.",
    handle: "dani-galfione",
    img: AYASA_ASSET("player-dani-galfione.jpg"),
    links: { web: "http://www.danigalfione.com/" }
  },
  {
    name: "Kate Stone",
    credential: "From classical piano · plays for healing",
    quote: "Ayasa is a constant teacher for me – this outstanding instrument invites me to discover new sounds and vibrations again and again.",
    handle: "kate-stone",
    img: AYASA_ASSET("player-2567-2.jpg"),
    links: { web: "http://www.themelodywithin.com/handpan/" }
  },
  {
    name: "Kavafoglu",
    credential: "Handpan meets electronic · Amsterdam",
    quote: "Many things can be said about Ayasa, but one thing is for sure, it’s life changing.",
    handle: "kavafoglu",
    img: AYASA_ASSET("player-kavafoglu.jpg"),
    links: { youtube: "https://www.youtube.com/user/kavafogludeniz", music: "https://soundcloud.com/kavafoglu" }
  },
  {
    name: "Alexandre Lora",
    credential: "Brazilian percussionist · Trio Brasileiro",
    quote: "Really clean tones and overtones – very important qualities for a professional instrument.",
    handle: "alexandre-lora",
    img: AYASA_ASSET("player-alexandre-lora.jpg"),
    links: { youtube: "https://www.youtube.com/channel/UClAIycDBodMBGX0cgJyrCrQ?view_as=subscriber", instagram: "https://www.instagram.com/alexandrelora/", web: "http://www.alexandrelora.com/" }
  },
  {
    name: "Yatao",
    credential: "Alexander Mercks and Malte Marten together",
    quote: "For us Ayasa is perfection of a well-rounded and resonate sound!",
    handle: "yatao",
    img: AYASA_ASSET("player-yatao.jpg"),
    links: { youtube: "https://www.youtube.com/channel/UCXwBPO45wLC_lGDB-C-Dvqg/", instagram: "https://www.instagram.com/yatao.music/", music: "https://yatao.bandcamp.com/", web: "https://www.yataomusic.com/" }
  },
  {
    name: "Caisaman",
    credential: "German composer · handpan and caisa",
    quote: "After playing music on handpans for eight years, i finally found my perfect instrumental match.",
    handle: "caisaman",
    img: AYASA_ASSET("player-caisaman.jpg"),
    links: { youtube: "https://www.youtube.com/user/daliasify/videos", music: "https://caisaman.bandcamp.com/", web: "https://www.caisaman.com/" }
  }
];
const PLAYERS_TOTAL = PLAYERS.length; // every artist we have a card for

const MODELS = [
  // ---------- PREMIUM — made in Almere, NL ----------
  {
    range: "premium",
    family: "f#-minor", // scale-family filter chip on product pages; will move to the per-model data sheet later
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
    inStock: true,
    videos: [
      { artist: "Malte Marten", file: AYASA_ASSET("malte-marten-fis-low-pygmy-21-1.mp4") },
      { artist: "Johann Immanuel", file: AYASA_ASSET("johann-immanuel-fis-low-pygmy-21-1.mp4") },
      { artist: "Warren Shanti", file: AYASA_ASSET("warren-shanti-fis-low-pygmy-21-1.mp4") },
      { artist: "Tomek Torres", file: AYASA_ASSET("tomek-torres-fis-low-pygmy-21-1.mp4") },
      { artist: "Malte Marten", file: AYASA_ASSET("malte-marten-fis-low-pygmy-21-2.mp4") },
      { artist: "Warren Shanti", file: AYASA_ASSET("warren-shanti-fis-low-pygmy-21-2.mp4") },
      { artist: "Julia Baier", file: AYASA_ASSET("julia-baier-fis-low-pygmy-21-1.mp4") },
      { artist: "Łukasz Dembiński", file: AYASA_ASSET("lukasz-dembinski-fis-low-pygmy-21-1.mp4") }
    ]
  },
  {
    range: "premium",
    family: "f#-minor", // the Aegean is the full extended F# minor scale (D ding)
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
      { artist: "Malte Marten", file: AYASA_ASSET("malte-marten-d-aegean-18-1.mp4") },
      { artist: "Malte Marten", file: AYASA_ASSET("malte-marten-d-aegean-18-2.mp4") },
      { artist: "Johann Immanuel", file: AYASA_ASSET("johann-immanuel-d-aegean-18-1.mp4") },
      { artist: "Vybeshift", file: AYASA_ASSET("vybeshift-d-aegean-18-1.mp4") }
    ]
  },
  {
    range: "premium",
    family: "f#-minor",
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
    inStock: true,
    videos: [
      { artist: "Julia Baier", file: AYASA_ASSET("julia-baier-d-ashakiran-19-1.mp4") },
      { artist: "Malte Marten", file: AYASA_ASSET("malte-marten-d-ashakiran-19-1.mp4") },
      { artist: "Warren Shanti", file: AYASA_ASSET("warren-shanti-d-ashakiran-19-1.mp4") }
    ]
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
    inStock: true,
    videoShop: { name: "E Amara 20 — Ember Steel®", url: "/products/e-amara-20-ember-steel" },
    // real footage — having its own videos: means the placeholder loop skips this model
    videos: [
      { artist: "Vybeshift", file: AYASA_ASSET("vybeshift-e-amara-20-1.mp4") },
      { artist: "Vybeshift", file: AYASA_ASSET("vybeshift-e-amara-20-2.mp4") },
      { artist: "Vybeshift", file: AYASA_ASSET("vybeshift-e-amara-20-3.mp4") },
      { artist: "Vybeshift", file: AYASA_ASSET("vybeshift-e-amara-20-4.mp4") },
      { artist: "Julia Baier", file: AYASA_ASSET("julia-baier-e-amara-20-1.mp4") },
      { artist: "Johann Immanuel", file: AYASA_ASSET("johann-immanuel-e-amara-20-1.mp4") }
    ]
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
    inStock: false,
    videos: [
      { artist: "Vybeshift", file: AYASA_ASSET("vybeshift-b2-aavartan-17-1.mp4") },
      { artist: "Jeremy Nattagh", file: AYASA_ASSET("jeremy-nattagh-b2-aavartan-17-1.mp4") }
    ]
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
    family: "f#-minor",
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
  },

  // ---------- studio-built cards (note maps from the studio; descs are drafts) ----------
  {
    range: "other",
    family: "c-major",
    name: "C Ashakiran 17",
    productHandle: "c-ashakiran-17-ember-steel",
    scale: "Extended major · “Ray of Hope”",
    ding: "C3",
    top: ["F3", "G3", "A3", "B3", "C4", "D4", "E4", "G4"],
    bottom: ["D3", "E3", "F4", "A4", "B4", "C5", "D5", "E5"],
    desc: "The Ray of Hope a whole step down — the same uplifting major, warmer and rounder in C, spread across seventeen notes.",
    availability: "In stock. Ships in 1–2 working days",
    inStock: true,
    videos: [
      { artist: "Malte Marten", file: AYASA_ASSET("malte-marten-c-ashakiran-17-1.mp4") },
      { artist: "Malte Marten", file: AYASA_ASSET("malte-marten-c-ashakiran-17-2.mp4") },
      { artist: "Tomek Torres", file: AYASA_ASSET("tomek-torres-c-ashakiran-17-1.mp4") },
      { artist: "Łukasz Dembiński", file: AYASA_ASSET("lukasz-dembinski-c-ashakiran-17-1.mp4") },
      { artist: "Łukasz Dembiński", file: AYASA_ASSET("lukasz-dembinski-c-ashakiran-17-2.mp4") },
      { artist: "Johann Immanuel", file: AYASA_ASSET("johann-immanuel-c-ashakiran-17-1.mp4") }
    ]
  },
  {
    range: "other",
    family: "b-minor",
    name: "B3 Pygmy 20",
    productHandle: "b3-pygmy-20-ember-steel",
    scale: "B minor pentatonic · fully extended",
    ding: "B3",
    top: ["C#4", "D4", "D#4", "A4", "B4", "C#5", "D5", "F#5", "A5", "B5", "C#6", "D6"],
    bottom: ["F#3", "G3", "A3", "G4", "E5", "G5"],
    desc: "Pygmy intimacy with a bright top end — twenty notes from a B3 ding, meditative down low and sparkling up high.",
    availability: "In stock. Ships in 1–2 working days",
    inStock: true
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

// TEMP: every model gets a Listen button by borrowing the D Aegean 18 clips.
// NOTE these carry the D Aegean artists' names, so each card currently claims
// those players performed on that scale — replace per model as real footage
// lands (give the model its own `videos:` array and this loop skips it).
MODELS.forEach(m => {
  if (!m.videos || !m.videos.length) {
    m.videos = [
      { artist: "Malte Marten", file: AYASA_ASSET("malte-marten-d-aegean-18-1.mp4") },
      { artist: "Malte Marten · II", file: AYASA_ASSET("malte-marten-d-aegean-18-2.mp4") },
      { artist: "Johann Immanuel", file: AYASA_ASSET("johann-immanuel-d-aegean-18-1.mp4") },
      { artist: "Vybeshift", file: AYASA_ASSET("vybeshift-d-aegean-18-1.mp4") }
    ];
  }
});
