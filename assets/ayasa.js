// ============================================================
// AYASA — rendering & interactions
// ============================================================

// ---------- note-map SVG (ding centre, topside notes in a circle) ----------
function noteMapSVG(model) {
  const size = 120, c = size / 2, ringR = 44, noteR = 11, dingR = 17;
  const notes = model.top || [];
  let circles = "";
  notes.forEach((n, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / notes.length;
    const x = c + ringR * Math.cos(a), y = c + ringR * Math.sin(a);
    circles += `
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${noteR}" fill="#1b1e25" stroke="rgba(236,233,226,0.22)"/>
      <text x="${x.toFixed(1)}" y="${(y + 2.6).toFixed(1)}" text-anchor="middle" font-size="6.6" fill="#ece9e2" font-family="Inter, sans-serif">${n}</text>`;
  });
  return `
  <svg viewBox="0 0 ${size} ${size}" width="118" height="118" role="img" aria-label="Note layout for ${model.name}: ding ${model.ding}, topside ${notes.join(", ")}">
    <circle cx="${c}" cy="${c}" r="${c - 2}" fill="none" stroke="rgba(236,233,226,0.08)"/>
    <circle cx="${c}" cy="${c}" r="${dingR}" fill="#1b1e25" stroke="#657599" stroke-width="1.2"/>
    <text x="${c}" y="${c + 3}" text-anchor="middle" font-size="8.6" fill="#8b98b8" font-family="Inter, sans-serif" font-weight="600">${model.ding}</text>
    ${circles}
  </svg>`;
}

// ---------- model cards ----------
function modelCard(m) {
  const badgeClass = m.inStock ? "badge-stock" : "badge-order";
  const bottom = m.bottom && m.bottom.length
    ? `<b>+${m.bottom.length} bottom:</b> ${m.bottom.join(" ")}`
    : "Topside only";
  const priceOrLink = m.rrp
    ? `<span class="model-price">RRP ${m.rrp}</span>`
    : `<a class="model-link" href="${m.productHandle ? `/products/${m.productHandle}` : "/collections/instruments"}">View in shop →</a>`;
  const idx = MODELS.indexOf(m);
  const hearIt = m.videos && m.videos.length
    ? `<button class="hear-btn" data-model="${idx}" aria-haspopup="dialog">
         <span class="hear-play" aria-hidden="true">▶</span>
         Hear it played · ${new Set(m.videos.map(v => v.artist.split(" — ")[0])).size} artists
       </button>`
    : "";
  const explore3d = m.detailPage
    ? `<a class="hear-btn explore-btn" href="${m.detailPage}">
         <span class="hear-play" aria-hidden="true">◈</span>
         Explore in 3D · play it
       </a>`
    : "";
  return `
  <article class="model-card reveal">
    <div class="model-head">
      <h3>${m.name}</h3>
    </div>
    <p class="model-scale">${m.scale}</p>
    <div class="notemap">
      ${noteMapSVG(m)}
      <p class="notemap-bottom">${bottom}</p>
    </div>
    <p class="model-desc">${m.desc}</p>
    <div class="model-actions">${hearIt}${explore3d}</div>
    <div class="model-foot">
      <span class="badge ${badgeClass}">${m.availability}</span>
      ${priceOrLink}
    </div>
  </article>`;
}

// ---------- player carousel ----------
const SOCIAL_ICONS = {
  youtube: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.6 3.6 12 3.6 12 3.6s-4.6 0-7.7.3c-.5.1-1.5.1-2.4 1-.7.7-.9 2.3-.9 2.3S.8 9.1.8 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.3 7.6.3s4.6 0 7.7-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.7 15.1V8.5l6.2 3.3-6.2 3.3z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2m0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.2.8-.4.4-.6.7-.8 1.2-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.2.4.4.7.6 1.2.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.2-.8.4-.4.6-.7.8-1.2.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zm6.2-8.3a1.1 1.1 0 1 1-2.3 0 1.1 1.1 0 0 1 2.3 0z"/></svg>',
  web: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9.2"/><path d="M2.8 12h18.4M12 2.8c2.5 2.6 3.8 5.7 3.8 9.2s-1.3 6.6-3.8 9.2c-2.5-2.6-3.8-5.7-3.8-9.2s1.3-6.6 3.8-9.2z"/></svg>'
};
const SOCIAL_LABELS = { youtube: "YouTube", instagram: "Instagram", web: "Website" };

function playerCard(p) {
  const links = Object.entries(p.links || {})
    .map(([k, url]) => `<a href="${url}" target="_blank" rel="noopener" aria-label="${p.name} on ${SOCIAL_LABELS[k]}" title="${SOCIAL_LABELS[k]}">${SOCIAL_ICONS[k] || SOCIAL_LABELS[k]}</a>`)
    .join("");
  const quote = p.quote ? `<p class="player-quote">“${p.quote}”</p>` : "";
  return `
  <article class="player-card">
    <img src="${p.img}" alt="${p.name}" loading="lazy">
    <div class="player-info">
      <h3>${p.name}</h3>
      <p class="player-cred">${p.credential}</p>
      ${quote}
      <div class="player-links">${links}</div>
    </div>
  </article>`;
}

function renderPlayers() {
  const track = document.getElementById("playerCarousel");
  if (!track || typeof PLAYERS === "undefined") return;
  const rest = PLAYERS_TOTAL - PLAYERS.length;
  track.innerHTML = PLAYERS.map(playerCard).join("") + `
  <article class="player-card player-card-more">
    <div class="player-more-inner">
      <span>+${rest}</span>
      <p>more artists play Ayasa worldwide</p>
      <a href="https://www.youtube.com/c/AyasaInstruments" target="_blank" rel="noopener">Watch on YouTube →</a>
    </div>
  </article>`;
  const step = () => track.querySelector(".player-card").getBoundingClientRect().width + 20;
  document.getElementById("carPrev").addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  document.getElementById("carNext").addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
}

function renderRange() {
  const premium = document.getElementById("premiumGrid");
  const elements = document.getElementById("elementsGrid");
  if (!premium || !elements || typeof MODELS === "undefined") return;
  premium.innerHTML = MODELS.filter(m => m.range === "premium").map(modelCard).join("");
  elements.innerHTML = MODELS.filter(m => m.range === "elements").map(modelCard).join("");
}

// ---------- demo video lightbox ----------
function artistInfoHTML(label) {
  const base = label.split(" — ")[0];
  const a = (typeof ARTISTS !== "undefined" && ARTISTS[base]) || {};
  const avatar = a.img
    ? `<img class="demo-artist-avatar" src="${a.img}" alt="${base}">`
    : `<span class="demo-artist-avatar demo-artist-initial" aria-hidden="true">${base[0]}</span>`;
  const links = Object.entries(a.links || {})
    .map(([k, url]) => `<a href="${url}" target="_blank" rel="noopener" aria-label="${base} on ${SOCIAL_LABELS[k]}" title="${SOCIAL_LABELS[k]}">${SOCIAL_ICONS[k] || SOCIAL_LABELS[k]}</a>`)
    .join("");
  return `
    ${avatar}
    <div class="demo-artist-text">
      <strong>${base}</strong>
      ${a.credential ? `<span class="demo-artist-cred">${a.credential}</span>` : ""}
      ${a.bio ? `<p class="demo-artist-bio">${a.bio}</p>` : ""}
    </div>
    <div class="demo-artist-links">${links}</div>`;
}

function openDemoLightbox(model) {
  const lb = document.createElement("div");
  lb.className = "demo-lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-label", `Demo videos for ${model.name}`);
  const tabs = model.videos.map((v, i) =>
    `<button class="demo-tab${i === 0 ? " active" : ""}" data-i="${i}">${v.artist}</button>`).join("");
  lb.innerHTML = `
    <div class="demo-backdrop"></div>
    <div class="demo-panel">
      <div class="demo-top">
        <div>
          <p class="demo-title">${model.name}</p>
          <p class="demo-sub">${model.scale}</p>
        </div>
        <button class="demo-close" aria-label="Close">✕</button>
      </div>
      <video controls playsinline preload="metadata"
             poster="${model.videos[0].file.replace(/\.mp4$/, ".jpg")}"
             src="${model.videos[0].file}"></video>
      <div class="demo-tabs" role="tablist" aria-label="Choose artist">${tabs}</div>
      <div class="demo-artist">${artistInfoHTML(model.videos[0].artist)}</div>
    </div>`;
  document.body.appendChild(lb);
  document.body.style.overflow = "hidden";

  const video = lb.querySelector("video");
  const artistBox = lb.querySelector(".demo-artist");
  const close = () => {
    video.pause();
    document.body.style.overflow = "";
    lb.remove();
    document.removeEventListener("keydown", onKey);
  };
  const tabEls = [...lb.querySelectorAll(".demo-tab")];
  const select = i => {
    const n = (i + model.videos.length) % model.videos.length;
    tabEls.forEach(t => t.classList.remove("active"));
    tabEls[n].classList.add("active");
    const v = model.videos[n];
    video.poster = v.file.replace(/\.mp4$/, ".jpg");
    video.src = v.file;
    video.play();
    artistBox.innerHTML = artistInfoHTML(v.artist);
  };
  const current = () => tabEls.findIndex(t => t.classList.contains("active"));
  const onKey = e => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") select(current() + 1);
    else if (e.key === "ArrowLeft") select(current() - 1);
  };
  document.addEventListener("keydown", onKey);
  lb.querySelector(".demo-backdrop").addEventListener("click", close);
  lb.querySelector(".demo-close").addEventListener("click", close);
  tabEls.forEach(tab => tab.addEventListener("click", () => select(+tab.dataset.i)));
  video.play();
}

function initDemoButtons() {
  document.addEventListener("click", e => {
    const btn = e.target.closest(".hear-btn");
    if (btn) openDemoLightbox(MODELS[+btn.dataset.model]);
  });
}

// ---------- scroll reveal ----------
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

// ---------- nav ----------
function initNav() {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");
  addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 40), { passive: true });
  nav.classList.toggle("scrolled", scrollY > 40);
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
  });
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }));
}

// ---------- reduced motion: pause hero video ----------
function initHeroMotion() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const v = document.querySelector(".hero-video");
    if (v) { v.removeAttribute("autoplay"); v.pause(); }
  }
}

// ---------- product page (Shopify) ----------
function initProductPage() {
  const section = document.querySelector(".product-section");
  if (!section) return;

  // note map from PRODUCT_NOTES (assets/ayasa-notes.js), keyed by product handle
  const handle = section.dataset.handle;
  const notes = typeof PRODUCT_NOTES !== "undefined" && PRODUCT_NOTES[handle];
  if (notes) {
    const mapEl = document.getElementById("productNoteMap");
    const bottomEl = document.getElementById("productNoteBottom");
    mapEl.innerHTML = noteMapSVG({ name: notes.title, ding: notes.ding, top: notes.top });
    bottomEl.innerHTML = notes.bottom.length
      ? `<b>+${notes.bottom.length} bottom:</b> ${notes.bottom.join(" ")}`
      : "Topside only";
    document.getElementById("productNotes").hidden = false;
  }

  // gallery thumbs
  const photo = document.querySelector("#productPhoto img");
  document.querySelectorAll(".product-thumb").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".product-thumb").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      photo.src = btn.dataset.src;
      photo.removeAttribute("srcset");
    });
  });

  // buy form: instrument + required case go into the cart together
  const form = document.getElementById("buyForm");
  const caseSelect = document.getElementById("caseSelect");
  const error = document.getElementById("buyError");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    error.hidden = true;
    if (caseSelect && !caseSelect.value) {
      error.textContent = "Please choose a case — we pack every instrument in a proper case so it arrives safely.";
      error.hidden = false;
      caseSelect.focus();
      return;
    }
    const properties = {};
    const size = document.getElementById("shirtSize");
    const color = document.getElementById("shirtColor");
    if (size && size.value !== "No free t-shirt") {
      properties["Free t-shirt size"] = size.value;
      properties["Free t-shirt color"] = color.value;
    }
    const items = [{ id: +form.elements.id.value, quantity: 1, properties }];
    if (caseSelect) items.push({ id: +caseSelect.value, quantity: 1 });
    const btn = form.querySelector(".product-buy");
    btn.disabled = true;
    try {
      const r = await fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items })
      });
      if (!r.ok) throw new Error((await r.json()).description || "Could not add to cart");
      window.location.href = "/cart";
    } catch (err) {
      error.textContent = err.message;
      error.hidden = false;
      btn.disabled = false;
    }
  });
}

renderRange();
renderPlayers();
initDemoButtons();
initReveal();
initNav();
initHeroMotion();
initProductPage();
