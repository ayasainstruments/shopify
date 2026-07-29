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
  // cards with a shop destination are fully clickable (stretched link);
  // RRP-only cards (Elements) get no link and no clickable affordance
  const linked = !m.rrp;
  const priceOrLink = m.rrp
    ? `<span class="model-price">RRP ${m.rrp}</span>`
    : `<a class="model-link" href="${m.productHandle ? `/products/${m.productHandle}` : "/collections/instruments"}" aria-label="View ${m.name} in the shop">View in shop <span class="arrow">→</span></a>`;
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
  <article class="model-card reveal${linked ? " model-card-linked" : ""}">
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
  return `
    ${avatar}
    <div class="demo-artist-text">
      <strong>${a.page ? `<a href="${a.page}" title="Meet ${base}">${base} →</a>` : base}</strong>
      ${a.credential ? `<span class="demo-artist-cred">${a.credential}</span>` : ""}
      ${a.bio ? `<p class="demo-artist-bio">${a.bio}</p>` : ""}
    </div>`;
}

// small centered popup for missed required choices (case / t-shirt)
function showChoicePopup(msg) {
  document.querySelector(".choice-popup")?.remove();
  const p = document.createElement("div");
  p.className = "choice-popup";
  p.setAttribute("role", "alert");
  p.textContent = msg;
  document.body.appendChild(p);
  setTimeout(() => {
    p.classList.add("out");
    setTimeout(() => p.remove(), 400);
  }, 2600);
}
function choiceMessage(needCase, needShirt) {
  if (needCase && needShirt) return "Please choose a case and a t-shirt";
  if (needCase) return "Please choose a case";
  return "Please choose a t-shirt — “No free t-shirt” is fine too";
}

function openDemoLightbox(model, startIndex, buyCtx) {
  // one player at a time — a lingering (possibly minimized) lightbox closes first
  document.querySelectorAll(".demo-lightbox").forEach(el => el.__close && el.__close());
  const start = startIndex || 0;
  const lb = document.createElement("div");
  lb.className = "demo-lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-label", `Demo videos for ${model.name}`);
  const tabs = model.videos.map((v, i) =>
    `<button class="demo-tab${i === start ? " active" : ""}" data-i="${i}">${v.artist}</button>`).join("");
  // cta bar: fades in once the viewer is watching.
  // product pages (buyCtx) get add-to-cart; elsewhere a "View in shop" link,
  // derived from the model's product handle unless videoShop overrides it.
  const shop = !buyCtx && (model.videoShop ||
    (model.productHandle ? { name: `${model.name} — Ember Steel®`, url: `/products/${model.productHandle}` } : null));
  const ctaHTML = buyCtx && buyCtx.available ? `
      <div class="demo-cta">
        <div class="demo-cta-inner">
          <div class="demo-cta-row">
            <p class="demo-cta-price">
              ${buyCtx.compareAt ? `<s>${buyCtx.compareAt}</s>` : ""}<strong>${buyCtx.price}</strong>
            </p>
            <button type="button" class="btn btn-primary demo-cta-btn">Add to cart</button>
          </div>
          ${buyCtx.caseSelect ? `
          <div class="demo-cta-casewrap" hidden>
            ${document.getElementById("shirtSize") ? `
            <label class="demo-shirt-label" for="demoShirtSize">Free Ayasa t-shirt — optional</label>
            <div class="demo-shirt-row">
              <select id="demoShirtSize">${document.getElementById("shirtSize").innerHTML}</select>
              <select id="demoShirtColor">${document.getElementById("shirtColor").innerHTML}</select>
            </div>` : ""}
            <label class="demo-case-label">Choose your case — every instrument ships in one</label>
            <div class="case-picker demo-case-picker">${(document.getElementById("casePicker") || { innerHTML: "" }).innerHTML}</div>
          </div>
          <button type="button" class="btn btn-primary demo-cta-add" hidden>Add to cart</button>` : ""}
          <p class="demo-cta-error" hidden></p>
        </div>
      </div>` : shop ? `
      <div class="demo-cta">
        <div class="demo-cta-inner">
          <div class="demo-cta-row">
            <p class="demo-cta-price"><strong>${shop.name}</strong></p>
            <a class="btn btn-primary demo-cta-btn" href="${shop.url}">View in shop →</a>
          </div>
        </div>
      </div>` : "";
  lb.innerHTML = `
    <div class="demo-backdrop"></div>
    <div class="demo-panel">
      <div class="demo-top">
        <div>
          <p class="demo-title">${model.name}</p>
          <p class="demo-sub">${model.scale}</p>
        </div>
        <div class="demo-top-btns">
          <button class="demo-min" aria-label="Minimize">–</button>
          <button class="demo-close" aria-label="Close">✕</button>
        </div>
      </div>
      <video controls playsinline preload="metadata"
             poster="${model.videos[start].file.replace(/\.mp4$/, ".jpg")}"
             src="${model.videos[start].file}"></video>
      ${ctaHTML}
      <div class="demo-scroll">
        <div class="demo-tabs" role="tablist" aria-label="Choose artist">${tabs}</div>
        <div class="demo-artist">${artistInfoHTML(model.videos[start].artist)}</div>
      </div>
    </div>`;
  document.body.appendChild(lb);
  document.body.style.overflow = "hidden";

  const video = lb.querySelector("video");
  const artistBox = lb.querySelector(".demo-artist");
  // mobile sheet: fade the scroll area's bottom edge while more content is below
  const scroller = lb.querySelector(".demo-scroll");
  const updateFade = () => scroller.classList.toggle("scroll-fade",
    scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight > 8);
  scroller.addEventListener("scroll", updateFade, { passive: true });
  updateFade();
  const close = () => {
    video.pause();
    document.body.style.overflow = "";
    lb.remove();
    document.removeEventListener("keydown", onKey);
  };
  lb.__close = close;
  // state snapshot for cross-page resurrection of the minimized player
  lb.__state = () => ({ name: model.name, index: current(), time: video.currentTime });

  // desktop: minimize to a corner mini-player so the page stays browsable
  const btnMin = lb.querySelector(".demo-min");
  btnMin.addEventListener("click", () => {
    const min = lb.classList.toggle("minimized");
    document.body.style.overflow = min ? "" : "hidden";
    btnMin.textContent = min ? "⤢" : "–";
    btnMin.setAttribute("aria-label", min ? "Expand" : "Minimize");
    requestAnimationFrame(updateFade); // scroll geometry changes with the size
  });
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
    updateFade();
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

  // cta bar: reveal after ~4s of watching; add-to-cart wiring is buy-bar only
  // (the homepage "View in shop" variant is a plain link and needs none)
  const cta = lb.querySelector(".demo-cta");
  if (cta) {
    const reveal = () => cta.classList.add("visible");
    video.addEventListener("timeupdate", () => { if (video.currentTime >= 4) reveal(); });
    video.addEventListener("ended", reveal);
    // the growing bar squeezes the mobile sheet's scroll area — re-check the fade hint
    cta.addEventListener("transitionend", updateFade);
  }
  if (cta && buyCtx) {
    const btnFirst = cta.querySelector(".demo-cta-btn");
    const btnAdd = cta.querySelector(".demo-cta-add");
    const caseWrap = cta.querySelector(".demo-cta-casewrap");
    const casePick = cta.querySelector(".demo-case-picker");
    const err = cta.querySelector(".demo-cta-error");

    const addToCart = async (caseId, actBtn) => {
      const items = [{ id: buyCtx.variantId, quantity: 1, properties: buyCtx.getProperties() }];
      if (caseId) items.push({ id: +caseId, quantity: 1 });
      actBtn.disabled = true;
      actBtn.textContent = "Adding…";
      try {
        const r = await fetch("/cart/add.js", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items })
        });
        if (!r.ok) throw new Error((await r.json()).description || "Could not add to cart");
        cta.querySelector(".demo-cta-row").innerHTML = `
          <p class="demo-cta-price"><strong>Added to cart ✓</strong></p>
          ${btnAdd ? "" : `<a class="btn btn-primary demo-cta-btn" href="/cart">View cart →</a>`}`;
        if (btnAdd) btnAdd.outerHTML = `<a class="btn btn-primary demo-cta-add" href="/cart">View cart →</a>`;
        if (caseWrap) caseWrap.hidden = true;
      } catch (e2) {
        err.textContent = e2.message;
        err.hidden = false;
        actBtn.disabled = false;
        actBtn.textContent = "Add to cart";
      }
    };

    // step 1: the small button. No case needed → add straight away; otherwise it
    // fades out and hands over to the case picker + the big add button below.
    btnFirst.addEventListener("click", () => {
      err.hidden = true;
      // buying from the mini-player: bring the full lightbox back first
      if (lb.classList.contains("minimized")) btnMin.click();
      if (!buyCtx.caseSelect) return addToCart(null, btnFirst);
      if (btnFirst.classList.contains("fading")) return;
      btnFirst.classList.add("fading");
      setTimeout(() => {
        btnFirst.hidden = true;
        caseWrap.hidden = false;
        btnAdd.hidden = false;
        requestAnimationFrame(updateFade);
        caseWrap.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }, 320);
    });

    // step 2: the big button bundles handpan + chosen case + t-shirt
    if (btnAdd) {
      btnAdd.addEventListener("click", () => {
        err.hidden = true;
        const pageCase = buyCtx.caseSelect;
        const pageShirt = document.getElementById("shirtSize");
        const needCase = !pageCase.value;
        const needShirt = pageShirt && !pageShirt.value;
        if (needCase || needShirt) {
          showChoicePopup(choiceMessage(needCase, needShirt));
          // the shirt row sits on top — scroll there whenever it's part of what's missing
          const target = needShirt ? cta.querySelector("#demoShirtSize") : casePick;
          target?.scrollIntoView({ block: "nearest", behavior: "smooth" });
          return;
        }
        addToCart(pageCase.value, btnAdd);
      });
    }

    // picking a case is selection only — it highlights and syncs the page form
    if (casePick) {
      casePick.addEventListener("click", e => {
        const card = e.target.closest(".case-card");
        if (!card || card.disabled) return;
        casePick.querySelectorAll(".case-card").forEach(b => b.classList.toggle("on", b === card));
        if (buyCtx.caseSelect) {
          buyCtx.caseSelect.value = card.dataset.variant;
          buyCtx.caseSelect.dispatchEvent(new Event("change", { bubbles: true }));
        }
        err.hidden = true;
      });
    }

    // t-shirt choice in the lightbox mirrors the page selects (getProperties reads those)
    const demoShirtSize = cta.querySelector("#demoShirtSize");
    const demoShirtColor = cta.querySelector("#demoShirtColor");
    const pageShirtSize = document.getElementById("shirtSize");
    const pageShirtColor = document.getElementById("shirtColor");
    if (demoShirtSize && pageShirtSize) {
      demoShirtSize.value = pageShirtSize.value;
      demoShirtSize.addEventListener("change", () => { pageShirtSize.value = demoShirtSize.value; });
    }
    if (demoShirtColor && pageShirtColor) {
      demoShirtColor.value = pageShirtColor.value;
      demoShirtColor.addEventListener("change", () => { pageShirtColor.value = demoShirtColor.value; });
    }
  }

  video.play();
}

// ---------- artist page ----------
// Instrument rail (minimal horizontal cards from the artist's curated `plays`
// list, first N visible) + listening room (round-robin video strip: every
// unique scale once, then the second videos, and so on). Also VideoObject LD.
function initArtistPage() {
  const rail = document.getElementById("artistPlays");
  if (!rail || typeof ARTISTS === "undefined") return;
  const artist = rail.dataset.artist;
  const info = ARTISTS[artist] || {};
  const plays = info.plays || [];
  if (!plays.length) return;

  // --- instrument rail ---
  const visible = info.visiblePlays || 4;
  rail.innerHTML = plays.map((p, i) => `
    <a class="artist-card${i >= visible ? " artist-card-extra" : ""}" href="/products/${p.handle}"${i >= visible ? " hidden" : ""}>
      <span class="artist-card-thumb" data-handle="${p.handle}"></span>
      <span class="artist-card-text">
        <strong>${p.name}</strong>
        <span>${p.mode}</span>
      </span>
      <span class="artist-card-arrow" aria-hidden="true">View in shop →</span>
    </a>`).join("");
  rail.querySelectorAll(".artist-card-thumb").forEach(el => {
    fetch(`/products/${el.dataset.handle}.js`)
      .then(r => (r.ok ? r.json() : null))
      .then(p => {
        if (!p || !p.featured_image) return;
        const u = new URL(p.featured_image, location.href);
        u.searchParams.set("width", "120");
        el.innerHTML = `<img src="${u.href}" alt="" loading="lazy">`;
      })
      .catch(() => {});
  });

  const more = document.getElementById("artistMore");
  const extra = plays.length - visible;
  if (more && extra > 0) {
    more.hidden = false;
    more.textContent = `+ ${extra} more scale${extra === 1 ? "" : "s"}`;
    more.addEventListener("click", () => {
      rail.querySelectorAll(".artist-card-extra").forEach(c => { c.hidden = false; });
      more.hidden = true;
    }, { once: true });
  }

  // --- listening room ---
  const strip = document.getElementById("artistVideos");
  if (!strip) return;
  const rounds = [];
  plays.forEach(p => (p.videos || []).forEach((file, vi) => {
    (rounds[vi] = rounds[vi] || []).push({ p, file, vi });
  }));
  const flat = rounds.flat();
  strip.innerHTML = flat.map((e, i) => `
    <article class="demo-card" data-i="${i}" tabindex="0" role="button" aria-label="Watch ${artist} play the ${e.p.name}">
      <img src="${e.file.replace(/\.mp4$/, ".jpg")}" alt="" loading="lazy">
      <span class="demo-card-play" aria-hidden="true">▶</span>
      <div class="demo-card-info">
        <strong>${e.p.name}</strong>
        <span>${e.p.mode}</span>
      </div>
    </article>`).join("");
  const numerals = ["", " — II", " — III", " — IV", " — V"];
  const openAt = i => {
    const e = flat[i];
    // if the model exists in the range data, open with its FULL video list so
    // other artists' takes (Immie, Roni, …) are right there as tabs
    const model = typeof MODELS !== "undefined" &&
      MODELS.find(m => m.name === e.p.name && m.videos && m.videos.length);
    if (model) {
      let idx = model.videos.findIndex(v => v.file === e.file && v.artist.split(" — ")[0] === artist);
      if (idx < 0) idx = 0;
      openDemoLightbox({ ...model, productHandle: model.productHandle || e.p.handle }, idx);
      return;
    }
    openDemoLightbox({
      name: e.p.name,
      scale: e.p.mode,
      productHandle: e.p.handle,
      videos: e.p.videos.map((f, n) => ({ artist: `${artist}${numerals[n] || ""}`, file: f }))
    }, e.vi);
  };
  strip.addEventListener("click", ev => {
    const c = ev.target.closest(".demo-card");
    if (c) openAt(+c.dataset.i);
  });
  strip.addEventListener("keydown", ev => {
    const c = ev.target.closest(".demo-card");
    if (c && (ev.key === "Enter" || ev.key === " ")) { ev.preventDefault(); openAt(+c.dataset.i); }
  });

  // --- VideoObject structured data ---
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": flat.map(e => ({
      "@type": "VideoObject",
      "name": `${artist} plays the Ayasa ${e.p.name}`,
      "description": `${artist} performs on the Ayasa ${e.p.name} handpan (${e.p.mode}).`,
      "thumbnailUrl": new URL(e.file.replace(/\.mp4$/, ".jpg"), location.href).href,
      "contentUrl": new URL(e.file, location.href).href,
      "uploadDate": rail.dataset.published || "2026-01-01"
    }))
  });
  document.head.appendChild(ld);
}

// PROTOTYPE: resurrect the minimized player across page loads.
// On leave: stash which video + timestamp if (and only if) the player is minimized.
addEventListener("pagehide", () => {
  const lb = document.querySelector(".demo-lightbox");
  if (lb && lb.classList.contains("minimized") && lb.__state) {
    sessionStorage.setItem("ayasaMiniPlayer", JSON.stringify(lb.__state()));
  } else {
    sessionStorage.removeItem("ayasaMiniPlayer");
  }
});

// On arrival: rebuild the mini player in the corner, seeked to where it was.
// Chrome carries autoplay permission through same-site link clicks, so it
// usually resumes with sound; stricter browsers show the paused player.
function restoreMiniPlayer() {
  if (matchMedia("(max-width: 640px)").matches) return; // mini player is desktop-only
  let saved = null;
  try { saved = JSON.parse(sessionStorage.getItem("ayasaMiniPlayer")); } catch (e) { /* corrupt state */ }
  if (!saved || typeof MODELS === "undefined") return;
  const model = MODELS.find(m => m.name === saved.name && m.videos && m.videos.length);
  if (!model) return;
  openDemoLightbox(model, saved.index || 0);
  const lb = document.querySelector(".demo-lightbox");
  if (!lb) return;
  lb.querySelector(".demo-min").click(); // dock straight into the corner
  const v = lb.querySelector("video");
  const seek = () => { v.currentTime = saved.time || 0; };
  if (v.readyState >= 1) seek();
  else v.addEventListener("loadedmetadata", seek, { once: true });
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

  // "Hear it played" — performance strip from the model data
  const demoModel = typeof MODELS !== "undefined" &&
    MODELS.find(m => m.productHandle === handle && m.videos && m.videos.length);
  if (demoModel) {
    const strip = document.getElementById("demoStrip");
    strip.innerHTML = demoModel.videos.map((v, i) => {
      const base = v.artist.split(" — ")[0];
      const a = (typeof ARTISTS !== "undefined" && ARTISTS[base]) || {};
      return `
      <article class="demo-card" data-i="${i}" tabindex="0" role="button" aria-label="Play performance by ${v.artist}">
        <img src="${v.file.replace(/\.mp4$/, ".jpg")}" alt="" loading="lazy">
        <span class="demo-card-play" aria-hidden="true">▶</span>
        <div class="demo-card-info">
          <strong>${base}</strong>
          ${a.credential ? `<span>${a.credential}</span>` : ""}
        </div>
      </article>`;
    }).join("");
    const artistCount = new Set(demoModel.videos.map(v => v.artist.split(" — ")[0])).size;
    document.getElementById("productDemosSub").textContent =
      `${demoModel.videos.length} performances by ${artistCount} artists — played on this model.`;
    document.getElementById("productDemos").hidden = false;
    const open = card => openDemoLightbox(demoModel, +card.dataset.i, buildBuyCtx());
    strip.addEventListener("click", e => {
      const card = e.target.closest(".demo-card");
      if (card) open(card);
    });
    strip.addEventListener("keydown", e => {
      const card = e.target.closest(".demo-card");
      if (card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(card); }
    });
  }

  // buy form: instrument + required case go into the cart together
  const form = document.getElementById("buyForm");
  const caseSelect = document.getElementById("caseSelect");
  const error = document.getElementById("buyError");

  // visual case picker drives the hidden select; a select-style trigger drops it down
  const picker = document.getElementById("casePicker");
  const caseTrigger = document.getElementById("caseTrigger");
  const pickerWrap = document.getElementById("casePickerWrap");
  const openPicker = open => {
    if (!pickerWrap) return;
    pickerWrap.classList.toggle("open", open);
    caseTrigger.setAttribute("aria-expanded", open);
  };
  if (picker && caseSelect) {
    const syncPicker = () => {
      let chosen = null;
      picker.querySelectorAll(".case-card").forEach(b => {
        const on = b.dataset.variant === caseSelect.value;
        b.classList.toggle("on", on);
        b.setAttribute("aria-pressed", on);
        if (on) chosen = b;
      });
      const label = caseTrigger.querySelector(".case-trigger-label");
      if (chosen) {
        const img = chosen.querySelector("img");
        label.innerHTML = `${img ? `<img src="${img.currentSrc || img.src}" alt="">` : ""}<span>${chosen.querySelector(".case-name").textContent} — ${chosen.querySelector(".case-price").textContent}</span>`;
      } else {
        label.textContent = "Please choose a case…";
      }
    };
    caseTrigger.addEventListener("click", () => openPicker(!pickerWrap.classList.contains("open")));
    picker.addEventListener("click", e => {
      const card = e.target.closest(".case-card");
      if (!card || card.disabled) return;
      caseSelect.value = card.dataset.variant;
      caseSelect.dispatchEvent(new Event("change", { bubbles: true }));
      if (error) error.hidden = true;
      openPicker(false);
    });
    caseSelect.addEventListener("change", syncPicker);
  }

  // product context for the lightbox buy bar (built lazily at click time)
  function buildBuyCtx() {
    return {
      variantId: +form.elements.id.value,
      price: section.dataset.price,
      compareAt: section.dataset.compare || "",
      available: section.dataset.available === "true",
      caseSelect,
      getProperties: () => {
        const properties = {};
        const size = document.getElementById("shirtSize");
        const color = document.getElementById("shirtColor");
        if (size && size.value && size.value !== "No free t-shirt") {
          properties["Free t-shirt size"] = size.value;
          properties["Free t-shirt color"] = color.value;
        }
        return properties;
      }
    };
  }
  form.addEventListener("submit", async e => {
    e.preventDefault();
    error.hidden = true;
    const size = document.getElementById("shirtSize");
    const needCase = caseSelect && !caseSelect.value;
    const needShirt = size && !size.value;
    if (needCase || needShirt) {
      showChoicePopup(choiceMessage(needCase, needShirt));
      if (needCase) {
        openPicker(true);
        caseTrigger?.scrollIntoView({ block: "center", behavior: "smooth" });
      } else {
        size.scrollIntoView({ block: "center", behavior: "smooth" });
      }
      return;
    }
    const properties = {};
    const color = document.getElementById("shirtColor");
    if (size && size.value && size.value !== "No free t-shirt") {
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
initArtistPage(); // before initReveal so the injected cards get observed
initDemoButtons();
initReveal();
initNav();
initHeroMotion();
initProductPage();
restoreMiniPlayer();
