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
  // RRP-only (UK dealer) and parked (no product yet) cards get neither
  const linked = !m.rrp && m.productHandle;
  const priceOrLink = m.rrp
    ? `<span class="model-price">RRP ${m.rrp}</span>`
    : m.productHandle
      ? `<a class="model-link" href="/products/${m.productHandle}" aria-label="View ${m.name} in the shop">View in shop <span class="arrow">→</span></a>`
      : `<span class="model-price">Coming soon</span>`;
  const idx = MODELS.indexOf(m);
  const hearIt = m.videos && m.videos.length
    ? `<button class="hear-btn" data-model="${idx}" aria-haspopup="dialog">
         <span class="hear-play" aria-hidden="true">▶</span>
         Hear it played · ${new Set(m.videos.map(v => v.artist.split(" · ")[0])).size} artists
       </button>`
    : "";
  const explore3d = m.detailPage
    ? `<a class="hear-btn explore-btn" href="${m.detailPage}">
         <span class="hear-play" aria-hidden="true">◈</span>
         Explore in 3D · play it
       </a>`
    : "";
  // Phase 0 shortlist — every purchasable scale gets a heart (top-right)
  const heart = m.productHandle
    ? `<button type="button" class="shortlist-heart" data-handle="${m.productHandle}" data-name="${m.name}" aria-label="Add ${m.name} to shortlist" aria-pressed="false">${HEART_SVG}</button>`
    : "";
  return `
  <article class="model-card reveal${linked ? " model-card-linked" : ""}${m.cardPhoto ? " model-card-photo" : ""}">
    ${m.cardPhoto ? `<div class="model-card-bg" style="background-image: url('${m.cardPhoto}')" aria-hidden="true"></div>` : ""}
    ${heart}
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
      <span class="badge ${badgeClass}"${m.productHandle ? ` data-handle="${m.productHandle}"` : ""}>${m.availability}</span>
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
  loadCardAvailability(premium);
  loadCardAvailability(elements);
}

// ---------- video card extras: hover previews + watched markers ----------
// Desktop-only: hovering a video card starts a muted inline preview after a
// beat. Works on every .demo-card (artist grids and product-page strips).
function initHoverPreviews() {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  let hoverCard = null;
  let timer = 0;
  document.addEventListener("mouseover", e => {
    const card = e.target.closest(".demo-card");
    if (!card || card === hoverCard) return;
    hoverCard = card;
    clearTimeout(timer);
    timer = setTimeout(() => {
      let v = card.querySelector(".demo-preview");
      if (v) { // warm from an earlier hover — already buffered, resume instantly
        clearTimeout(v.__pauseT);
        v.classList.add("on");
        v.play().catch(() => {});
        return;
      }
      const img = card.querySelector("img");
      if (!img) return;
      v = document.createElement("video");
      v.className = "demo-preview";
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.preload = "auto";
      v.src = img.src.replace(/\.jpg(\?.*)?$/, ".mp4$1");
      card.appendChild(v);
      // buffer fully behind the poster, then ease in — no first-frame stutter
      const start = () => v.play().then(() => v.classList.add("on")).catch(() => v.remove());
      if (v.readyState >= 4) start();
      else v.addEventListener("canplaythrough", start, { once: true });
    }, 120);
  });
  document.addEventListener("mouseout", e => {
    const card = e.target.closest(".demo-card");
    if (!card || card.contains(e.relatedTarget)) return;
    clearTimeout(timer);
    hoverCard = null;
    const v = card.querySelector(".demo-preview");
    if (v) { // fade back to the poster, then pause (stay warm for re-hovers)
      v.classList.remove("on");
      v.__pauseT = setTimeout(() => v.pause(), 750);
    }
  });
}

// A subtle dot on cards whose video was already opened this session.
const WATCHED_KEY = "ayasaWatched";
function getWatched() {
  try { return new Set(JSON.parse(sessionStorage.getItem(WATCHED_KEY)) || []); }
  catch (e) { return new Set(); }
}
function videoKey(url) {
  return url.split("/").pop().split("?")[0].replace(/\.jpg$/, ".mp4");
}
function refreshWatchedDots() {
  const seen = getWatched();
  document.querySelectorAll(".demo-card img").forEach(img => {
    img.closest(".demo-card").classList.toggle("watched", seen.has(videoKey(img.src)));
  });
}
function markWatched(file) {
  const seen = getWatched();
  seen.add(videoKey(file));
  sessionStorage.setItem(WATCHED_KEY, JSON.stringify([...seen]));
  refreshWatchedDots();
}

// ---------- demo video lightbox ----------
function artistInfoHTML(label) {
  const base = label.split(" · ")[0];
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
  // one player at a time — a lingering (possibly minimized) lightbox closes first.
  // A minimized one means the user is browsing: the new player opens minimized too.
  const wasMin = !!document.querySelector(".demo-lightbox.minimized");
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
  // the mobile footer's identity anchor — always the playing model's page
  const shopUrl = (model.videoShop && model.videoShop.url) ||
    (model.productHandle ? `/products/${model.productHandle}` : "/collections/instruments");
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
      ${model.videos.length > 1 ? `
      <div class="demo-dots" aria-hidden="true">${model.videos.map((_, i) =>
        `<span${i === start ? ' class="on"' : ""}></span>`).join("")}</div>` : ""}
      <video controls playsinline preload="metadata"
             poster="${model.videos[start].file.replace(/\.mp4$/, ".jpg")}"
             src="${model.videos[start].file}"></video>
      ${ctaHTML}
      <div class="demo-mini-info">
        <p class="demo-mini-name">${model.name}</p>
        <p class="demo-mini-scale">${model.scale}</p>
        <a class="btn btn-primary demo-mini-shop" href="${shopUrl}">View in shop →</a>
      </div>
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

  // minimize: desktop docks to a corner mini-player, mobile to a footer bar —
  // either way the page stays browsable while the music keeps playing
  const mq = matchMedia("(max-width: 640px)");
  const panel = lb.querySelector(".demo-panel");
  const btnMin = lb.querySelector(".demo-min");
  btnMin.addEventListener("click", () => {
    const min = lb.classList.toggle("minimized");
    document.body.style.overflow = min ? "" : "hidden";
    btnMin.textContent = min ? "⤢" : "–";
    btnMin.setAttribute("aria-label", min ? "Expand" : "Minimize");
    // the footer video is a thumbnail, not a player surface — taps maximize instead
    if (mq.matches) {
      video.controls = !min;
      // the artist pills + linked artist line are the real, wired elements —
      // they move between the sheet's scroll area and the footer's info column
      const scroll = lb.querySelector(".demo-scroll");
      const tabs = lb.querySelector(".demo-tabs");
      const artist = lb.querySelector(".demo-artist");
      if (min) {
        const shopBtn = lb.querySelector(".demo-mini-shop");
        shopBtn.before(tabs, artist);
      } else {
        scroll.append(tabs, artist);
      }
    }
    requestAnimationFrame(updateFade); // scroll geometry changes with the size
  });
  // footer: tapping the bar brings the player back — except on anything
  // interactive (pills, artist link, shop button, the corner buttons)
  panel.addEventListener("click", e => {
    if (!mq.matches || !lb.classList.contains("minimized")) return;
    if (e.target.closest("button, a")) return;
    btnMin.click();
  });
  const tabEls = [...lb.querySelectorAll(".demo-tab")];
  const dotEls = [...lb.querySelectorAll(".demo-dots span")];
  // warm the neighbouring clips (metadata + poster) so a swipe starts fast
  const warmed = new Set([start]);
  const warmNeighbors = n => [n - 1, n + 1].forEach(i => {
    const k = (i + model.videos.length) % model.videos.length; // wraps — autoplay flows last → first
    if (warmed.has(k)) return;
    warmed.add(k);
    const w = document.createElement("video");
    w.preload = "metadata";
    w.src = model.videos[k].file;
    new Image().src = model.videos[k].file.replace(/\.mp4$/, ".jpg");
  });
  const select = i => {
    const n = (i + model.videos.length) % model.videos.length;
    tabEls.forEach(t => t.classList.remove("active"));
    tabEls[n].classList.add("active");
    // footer's 2-row pill strip: scroll a hidden row's pill into view (strip only, never the page)
    const wrap = tabEls[n].parentElement;
    if (wrap.scrollHeight > wrap.clientHeight + 2) {
      const pr = tabEls[n].getBoundingClientRect(), wr = wrap.getBoundingClientRect();
      if (pr.top < wr.top) wrap.scrollBy({ top: pr.top - wr.top - 2, behavior: "smooth" });
      else if (pr.bottom > wr.bottom) wrap.scrollBy({ top: pr.bottom - wr.bottom + 2, behavior: "smooth" });
    }
    dotEls.forEach((d, di) => d.classList.toggle("on", di === n));
    const v = model.videos[n];
    video.poster = v.file.replace(/\.mp4$/, ".jpg");
    video.src = v.file;
    // autoplay refused (un-gestured after src swap, e.g. iOS): rest on the poster, one tap resumes
    video.play().catch(() => {});
    markWatched(v.file);
    artistBox.innerHTML = artistInfoHTML(v.artist);
    updateFade();
    warmNeighbors(n);
  };
  const current = () => tabEls.findIndex(t => t.classList.contains("active"));
  // slide the next clip in — shared by swipe commits and end-of-clip autoplay
  const slideTo = dir => {
    const w = video.getBoundingClientRect().width * 0.6;
    video.style.transition = "transform 0.22s ease, opacity 0.22s ease";
    video.style.transform = `translateX(${-dir * w}px)`;
    video.style.opacity = "0.2";
    setTimeout(() => {
      video.style.transition = "none";
      video.style.transform = `translateX(${dir * w}px)`;
      select(current() + dir);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        video.style.transition = "transform 0.22s ease, opacity 0.22s ease";
        video.style.transform = "translateX(0)";
        video.style.opacity = "1";
      }));
    }, 220);
  };
  // every clip flows into the next; the last wraps back to the first
  if (model.videos.length > 1) video.addEventListener("ended", () => slideTo(1));
  const onKey = e => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") select(current() + 1);
    else if (e.key === "ArrowLeft") select(current() - 1);
  };
  document.addEventListener("keydown", onKey);
  lb.querySelector(".demo-backdrop").addEventListener("click", close);
  lb.querySelector(".demo-close").addEventListener("click", close);
  tabEls.forEach(tab => tab.addEventListener("click", () => select(+tab.dataset.i)));

  // touch, full player: ← → swipe changes clips (follows the finger, commits
  // past a quarter screen or a flick, rubber-bands at the ends); on mobile a
  // vertical drag moves the whole panel — ↓ tucks it into the footer,
  // ↑ (a decisive pull) closes it, anything less springs back.
  {
    const max = model.videos.length - 1;
    let sx = 0, sy = 0, lock = null, dx = 0, dy = 0, lastX = 0, lastY = 0, lastT = 0, vx = 0, vy = 0;
    const atEdge = d => (d > 0 && current() === 0) || (d < 0 && current() === max);
    const springBack = () => {
      video.style.transition = "transform 0.3s ease";
      video.style.transform = "translateX(0)";
    };
    video.addEventListener("touchstart", e => {
      lock = null;
      if (lb.classList.contains("minimized") || e.touches.length !== 1) return;
      const t = e.touches[0];
      // the native control bar owns the bottom strip — scrubbing must keep working
      if (t.clientY > video.getBoundingClientRect().bottom - 64) return;
      sx = lastX = t.clientX; sy = lastY = t.clientY; dx = 0; dy = 0; vx = 0; vy = 0; lastT = e.timeStamp;
      lock = "?";
    }, { passive: true });
    video.addEventListener("touchmove", e => {
      if (lock === null) return;
      const t = e.touches[0];
      dx = t.clientX - sx;
      dy = t.clientY - sy;
      if (lock === "?") {
        if (Math.abs(dx) < 12 && Math.abs(dy) < 12) return;
        lock = Math.abs(dx) > Math.abs(dy)
          ? (max > 0 ? "h" : null)          // single-clip players have nothing to swipe to
          : (mq.matches ? "v" : null);      // vertical panel gestures are mobile-only
        if (lock === null) return;
      }
      e.preventDefault();
      vx = (t.clientX - lastX) / Math.max(1, e.timeStamp - lastT);
      vy = (t.clientY - lastY) / Math.max(1, e.timeStamp - lastT);
      lastX = t.clientX; lastY = t.clientY; lastT = e.timeStamp;
      if (lock === "h") {
        video.style.transition = "none";
        video.style.transform = `translateX(${dx * (atEdge(dx) ? 0.25 : 0.9)}px)`; // rubber-band at the ends
      } else {
        panel.style.transition = "none";
        panel.style.transform = `translateY(${dy * 0.9}px)`;
        // pulling up previews the close — the panel starts letting go
        panel.style.opacity = dy < 0 ? String(Math.max(0.35, 1 + dy / 450)) : "1";
      }
    }, { passive: false });
    const onRelease = () => {
      const l = lock;
      lock = null;
      if (l === "h") {
        const commit = !atEdge(dx) &&
          (Math.abs(dx) > Math.min(innerWidth / 4, 140) || (Math.abs(vx) > 0.5 && Math.abs(dx) > 40));
        if (!commit) return springBack();
        slideTo(dx < 0 ? 1 : -1);
      } else if (l === "v") {
        const closeIt = dy < -160 || (vy < -0.8 && dy < -80);   // close needs a decisive pull
        const minimizeIt = dy > 90 || (vy > 0.5 && dy > 50);
        if (closeIt) {
          panel.style.transition = "transform 0.22s ease, opacity 0.22s ease";
          panel.style.transform = "translateY(-40vh)";
          panel.style.opacity = "0";
          setTimeout(close, 200);
        } else if (minimizeIt) {
          panel.style.transition = panel.style.transform = panel.style.opacity = "";
          btnMin.click();
        } else {
          panel.style.transition = "transform 0.25s ease, opacity 0.25s ease";
          panel.style.transform = "translateY(0)";
          panel.style.opacity = "1";
          setTimeout(() => { panel.style.transition = panel.style.transform = panel.style.opacity = ""; }, 280);
        }
      }
    };
    video.addEventListener("touchend", onRelease);
    video.addEventListener("touchcancel", onRelease);
    if (max > 0) warmNeighbors(start);
  }

  // touch, footer bar: dragging it down slides it off — dismissed
  {
    let fy = 0, fOn = false, fdy = 0, fLastY = 0, fLastT = 0, fvy = 0;
    panel.addEventListener("touchstart", e => {
      fOn = false;
      if (!mq.matches || !lb.classList.contains("minimized") || e.touches.length !== 1) return;
      fy = fLastY = e.touches[0].clientY; fdy = 0; fvy = 0; fLastT = e.timeStamp;
      fOn = true;
    }, { passive: true });
    panel.addEventListener("touchmove", e => {
      if (!fOn) return;
      const t = e.touches[0];
      fdy = t.clientY - fy;
      if (fdy < 8) return; // only downward drags are the dismiss gesture
      e.preventDefault();
      fvy = (t.clientY - fLastY) / Math.max(1, e.timeStamp - fLastT);
      fLastY = t.clientY; fLastT = e.timeStamp;
      panel.style.transition = "none";
      panel.style.transform = `translateY(${fdy * 0.9}px)`;
    }, { passive: false });
    const fRelease = () => {
      if (!fOn) return;
      fOn = false;
      if (fdy > 60 || (fvy > 0.5 && fdy > 30)) {
        panel.style.transition = "transform 0.2s ease, opacity 0.2s ease";
        panel.style.transform = "translateY(110%)";
        panel.style.opacity = "0";
        setTimeout(close, 180);
      } else {
        panel.style.transition = "transform 0.25s ease";
        panel.style.transform = "translateY(0)";
        setTimeout(() => { panel.style.transition = panel.style.transform = ""; }, 280);
      }
    };
    panel.addEventListener("touchend", fRelease);
    panel.addEventListener("touchcancel", fRelease);
  }

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

  video.play().catch(() => {}); // restore/iOS may refuse — restoreMiniPlayer escalates from here
  markWatched(model.videos[start].file);
  if (wasMin) btnMin.click(); // browse mode carries over — the new player starts minimized
}

// ---------- scale switcher (product pages) ----------
function scaleItemHTML(s, currentHandle) {
  const model = typeof MODELS !== "undefined" && MODELS.find(m => m.name === s.name && m.top);
  const icon = model
    ? noteMapSVG(model)
    : `<span class="scale-badge">${(s.name.match(/^[A-G]#?\d?/) || ["·"])[0]}</span>`;
  const active = s.handle === currentHandle;
  return `
    <a class="scale-item${active ? " active" : ""}" href="/products/${s.handle}"${active ? ' aria-current="page"' : ""}>
      <span class="scale-icon">${icon}</span>
      <strong>${s.name}</strong>
      <span class="scale-price" data-handle="${s.handle}"></span>
    </a>`;
}
const __productCache = {};
function fetchProduct(handle) {
  if (!__productCache[handle]) {
    __productCache[handle] = fetch(`/products/${handle}.js`)
      .then(r => (r.ok ? r.json() : null))
      .catch(() => null);
  }
  return __productCache[handle];
}
function fetchPrice(handle) {
  return fetchProduct(handle).then(p =>
    (p ? `€${(p.price / 100).toLocaleString("nl-NL", { minimumFractionDigits: 2 })}` : ""));
}

// ---------- live availability (two states — mirrors availability-badge.liquid) ----------
// The ships: tag is a date SOURCE, not a state switch: a FUTURE date wins,
// otherwise the shelf. (/products/{handle}.js exposes tags but not inventory
// quantity, so the brief sold-out-awaiting-restock gap renders as in stock
// here; the server-rendered product-page badge is exact.)
function availabilityFromProduct(p) {
  const tag = (p.tags || []).find(t => t.startsWith("ships:"));
  const ship = tag ? new Date(tag.slice(6)) : null;
  if (ship && !isNaN(ship) && ship > new Date()) {
    const nice = ship.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    return { cls: "badge-order", text: `Made for you. Ships ${nice}` };
  }
  if (!p.available) return { cls: "badge-soldout", text: "Sold out" };
  return { cls: "badge-stock", text: "In stock. Ships in 1–2 working days" };
}
function loadCardAvailability(root) {
  root.querySelectorAll(".badge[data-handle]").forEach(el => {
    if (el.dataset.loaded) return;
    el.dataset.loaded = "1";
    fetchProduct(el.dataset.handle).then(p => {
      if (!p) return; // fetch failed — keep the data-file fallback text
      const a = availabilityFromProduct(p);
      el.classList.remove("badge-stock", "badge-order", "badge-soldout");
      el.classList.add(a.cls);
      el.textContent = a.text;
    });
  });
}

function loadScalePrices(root) {
  root.querySelectorAll(".scale-price[data-handle]").forEach(el => {
    if (el.dataset.loaded) return;
    el.dataset.loaded = "1";
    fetchProduct(el.dataset.handle).then(p => {
      el.textContent = p ? `€${(p.price / 100).toLocaleString("nl-NL", { minimumFractionDigits: 2 })}` : "";
      // sold-out one-offs disappear site-wide — the specials medallions too.
      // The current page's own medallion stays so the switcher keeps context.
      const item = el.closest(".scale-item");
      if (p && !p.available && item && !item.classList.contains("active")) item.remove();
    });
  });
}
// in the switcher, range cards whisper their price instead of "View in shop"
function swapLinkPrices(root) {
  root.querySelectorAll(".scale-cards .model-link").forEach(link => {
    if (link.dataset.priced) return;
    link.dataset.priced = "1";
    const handle = (link.getAttribute("href").match(/\/products\/([^/?#]+)/) || [])[1];
    if (!handle) return;
    link.classList.add("model-link-price");
    link.textContent = "";
    fetchPrice(handle).then(t => { link.textContent = t; });
  });
}
function initScaleNav() {
  const nav = document.getElementById("scaleNav");
  if (!nav || typeof SCALES === "undefined" || typeof MODELS === "undefined") return;
  const current = nav.dataset.current;
  const premiumModels = MODELS.filter(m => m.range === "premium");
  const elementsModels = MODELS.filter(m => m.range === "elements");
  // hybrid: full range cards for modelled scales, medallions for the rest
  const carded = new Set(premiumModels.map(m => m.name));
  const rest = SCALES.filter(s => !carded.has(s.name));
  const specialsHTML = rest.length ? `
    <h3 class="more-scales-label">Find something special</h3>
    <p class="more-scales-sub">One-offs, small batches and trade-ins</p>
    <div class="scale-grid">${rest.map(s => scaleItemHTML(s, current)).join("")}</div>` : "";
  const premiumHTML = `
    <div class="range-grid scale-cards">${premiumModels.map(modelCard).join("")}</div>
    ${specialsHTML}`;
  const elementsHTML = `<div class="range-grid scale-cards">${elementsModels.map(modelCard).join("")}</div>`;
  const markCurrent = root => {
    const link = root.querySelector(`.model-link[href="/products/${current}"]`);
    if (link) link.closest(".model-card").classList.add("scale-current");
  };

  // one merged panel: all cards (filterable) + specials medallions (always visible)
  const ordered = [...premiumModels, ...elementsModels];
  const CHIPS = [
    { key: "all", label: "All" },
    { key: "premium", label: "Premium" },
    { key: "elements", label: "Elements" },
    { key: "d-minor", label: "D minor" },
    { key: "fis-minor", label: "F# minor" },
    { key: "e-minor", label: "E minor" },
    { key: "other", label: "Other" }
  ];
  document.getElementById("snCount").textContent = SCALES.length + elementsModels.length;
  const panel = document.getElementById("snPanel");
  const body = panel.querySelector(".scale-panel-body");
  body.innerHTML = `<div class="range-grid scale-cards">${ordered.map(modelCard).join("")}</div>${specialsHTML}`;
  body.querySelectorAll(".scale-cards .model-card").forEach((el, i) => {
    el.dataset.range = ordered[i].range;
    el.dataset.family = ordered[i].family || "other";
  });
  markCurrent(panel);

  const filters = document.getElementById("snFilters");
  filters.innerHTML = CHIPS.map(c =>
    `<button type="button" class="filter-chip${c.key === "all" ? " on" : ""}" data-filter="${c.key}" aria-pressed="${c.key === "all"}">${c.label}</button>`
  ).join("");
  const chips = filters.querySelectorAll(".filter-chip");
  chips.forEach(chip => chip.addEventListener("click", () => {
    // radio-style; re-clicking the active chip falls back to All
    const key = chip.classList.contains("on") ? "all" : chip.dataset.filter;
    chips.forEach(c => {
      const on = c.dataset.filter === key;
      c.classList.toggle("on", on);
      c.setAttribute("aria-pressed", on);
    });
    body.querySelectorAll(".scale-cards .model-card").forEach(el => {
      const show = key === "all" || el.dataset.range === key || el.dataset.family === key;
      el.hidden = !show;
    });
  }));

  const btn = document.getElementById("snTrigger");
  btn.addEventListener("click", () => {
    const open = !panel.classList.contains("open");
    panel.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open);
    if (open) { loadScalePrices(panel); swapLinkPrices(panel); loadCardAvailability(panel); }
  });

  // keep exploring: the full range, always open, at the exit point
  const keep = document.getElementById("keepExploring");
  if (keep) {
    keep.querySelector(".keep-premium").innerHTML = premiumHTML;
    keep.querySelector(".keep-elements").innerHTML = elementsHTML;
    markCurrent(keep);
    loadScalePrices(keep);
    swapLinkPrices(keep);
    loadCardAvailability(keep);
  }
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
  const numerals = ["", " · II", " · III", " · IV", " · V"];
  const openAt = i => {
    const e = flat[i];
    // if the model exists in the range data, open with its FULL video list so
    // other artists' takes (Immanuel, Vybeshift, …) are right there as tabs
    const model = typeof MODELS !== "undefined" &&
      MODELS.find(m => m.name === e.p.name && m.videos && m.videos.length);
    if (model) {
      let idx = model.videos.findIndex(v => v.file === e.file && v.artist.split(" · ")[0] === artist);
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

// On arrival: rebuild the mini player (desktop corner / mobile footer), seeked
// to where it was, and resume by escalation: unmuted (Chrome carries the tap
// through same-site navigation) → muted with an unmute chip (WebKit/iOS allows
// silent autoplay only) → paused with native controls as the last resort.
function restoreMiniPlayer() {
  let saved = null;
  try { saved = JSON.parse(sessionStorage.getItem("ayasaMiniPlayer")); } catch (e) { /* corrupt state */ }
  if (!saved || typeof MODELS === "undefined") return;
  const model = MODELS.find(m => m.name === saved.name && m.videos && m.videos.length);
  if (!model) return;
  openDemoLightbox(model, saved.index || 0);
  const lb = document.querySelector(".demo-lightbox");
  if (!lb) return;
  lb.querySelector(".demo-min").click(); // dock straight into the corner/footer
  const v = lb.querySelector("video");
  const seek = () => { v.currentTime = saved.time || 0; };
  if (v.readyState >= 1) seek();
  else v.addEventListener("loadedmetadata", seek, { once: true });
  v.play().catch(() => {
    v.muted = true;
    v.play().then(() => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "demo-unmute";
      chip.textContent = "🔇 Tap for sound";
      lb.querySelector(".demo-panel").appendChild(chip);
      chip.addEventListener("click", () => { v.muted = false; }); // a tap is a gesture — sound allowed
      v.addEventListener("volumechange", () => { if (!v.muted) chip.remove(); }); // native unmute counts too
    }).catch(() => { v.muted = false; }); // even muted refused: rest on the poster, controls resume
  });
}

function initDemoButtons() {
  document.addEventListener("click", e => {
    const btn = e.target.closest(".hear-btn");
    if (btn) openDemoLightbox(MODELS[+btn.dataset.model]);
  });
}

// ============================================================
// Shortlist — Phase 0 (docs/SHORTLIST-PLAN.md §3)
// Hearts write to localStorage so launch-day shortlists arrive
// pre-populated; the popup collects the waitlist email; every
// click pushes a dataLayer event for the pixel/audience work.
// ============================================================
const SHORTLIST_KEY = "ayasa:shortlist";
const HEART_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 20.3C7.2 16.6 3.5 13.5 3.5 9.9 3.5 7.2 5.6 5 8.2 5c1.5 0 3 .7 3.8 1.9C12.8 5.7 14.3 5 15.8 5c2.6 0 4.7 2.2 4.7 4.9 0 3.6-3.7 6.7-8.5 10.4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`;

function getShortlist() {
  try { return JSON.parse(localStorage.getItem(SHORTLIST_KEY)) || []; } catch { return []; }
}
function trackShortlist(event, handle) {
  (window.dataLayer = window.dataLayer || []).push({ event: `shortlist_${event}`, scale: handle || "" });
}
function toggleShortlist(handle, name) {
  let list = getShortlist();
  const added = !list.some(i => i.handle === handle);
  if (added) list.push({ handle, name, added: Date.now() });
  else list = list.filter(i => i.handle !== handle);
  try { localStorage.setItem(SHORTLIST_KEY, JSON.stringify(list)); } catch { /* private mode — session-only */ }
  trackShortlist(added ? "add" : "remove", handle);
  refreshShortlistUI();
  return added;
}
function refreshShortlistUI() {
  const list = getShortlist();
  const has = handle => list.some(i => i.handle === handle);
  document.querySelectorAll(".shortlist-heart[data-handle]").forEach(h => {
    const on = has(h.dataset.handle);
    h.classList.toggle("on", on);
    h.setAttribute("aria-pressed", on);
  });
  document.querySelectorAll(".shortlist-btn[data-handle]").forEach(b => {
    const on = has(b.dataset.handle);
    b.classList.toggle("on", on);
    b.setAttribute("aria-pressed", on);
    const label = b.querySelector(".sl-label");
    if (label) label.textContent = on ? "On your shortlist" : "Add to shortlist";
  });
  const navBtn = document.getElementById("navShortlist");
  const panel = document.querySelector(".shortlist-panel");
  if (navBtn) {
    // while the panel is open, keep its anchor — removing the last scale
    // shows the empty state instead of yanking both away mid-interaction
    navBtn.hidden = list.length === 0 && (!panel || panel.hidden);
    const count = document.getElementById("navShortlistCount");
    if (count) count.textContent = list.length;
  }
  if (panel && !panel.hidden) renderShortlistPanel(panel);
}
function shortlistToast(msg) {
  document.querySelector(".shortlist-toast")?.remove();
  const t = document.createElement("div");
  t.className = "choice-popup shortlist-toast";
  t.setAttribute("role", "status");
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 400); }, 2200);
}
function renderShortlistPanel(panel) {
  const list = getShortlist();
  const signed = localStorage.getItem("ayasa:shortlist:signed");
  const close = `<button type="button" class="sl-panel-close" aria-label="Close shortlist">×</button>`;
  panel.innerHTML = list.length ? `
    ${close}
    <p class="sl-panel-head">Your shortlist</p>
    <ul class="sl-panel-list">
      ${list.map(i => `
        <li>
          <a href="/products/${i.handle}">${i.name}</a>
          <button type="button" class="sl-panel-remove" data-handle="${i.handle}" data-name="${i.name}" aria-label="Remove ${i.name} from shortlist">×</button>
        </li>`).join("")}
    </ul>
    <label class="sl-check sl-notify" id="slNotifyRow" hidden>
      <input type="checkbox" id="slNotifyBox"${localStorage.getItem("ayasa:notify-availability") ? " checked" : ""}>
      <span>Email me when one of my scales becomes available sooner</span>
    </label>
    <p class="sl-panel-note">Side-by-side compare arrives with the full launch. Your scales are saved in this browser.</p>
    ${signed ? "" : `<button type="button" class="sl-panel-signup" id="slPanelSignup">Get notified at launch</button>`}`
    : `${close}
       <p class="sl-panel-head">Your shortlist is empty</p>
       <p class="sl-panel-note">Tap the ♡ on any scale to save it here.</p>`;
  // the notify opt-in only makes sense when something on the list isn't on the shelf
  if (list.length) {
    Promise.all(list.map(i => fetchProduct(i.handle))).then(ps => {
      const someWait = ps.filter(Boolean).some(p => availabilityFromProduct(p).cls !== "badge-stock");
      const row = panel.querySelector("#slNotifyRow");
      if (row && someWait) row.hidden = false;
    });
  }
}
// silently add tags to an already-signed-up customer (Shopify appends tags on
// repeat customer-form posts). Returns false on failure or a bot challenge.
function postCustomerTags(email, tags) {
  const form = document.getElementById("shortlistForm");
  if (!form || !email) return Promise.resolve(false);
  const fd = new FormData();
  fd.append("form_type", "customer");
  fd.append("utf8", "✓");
  fd.append("contact[email]", email);
  fd.append("contact[tags]", tags.join(", "));
  return fetch(form.action, { method: "POST", body: fd, headers: { Accept: "text/html" } })
    .then(r => r.ok && !(r.url || "").includes("challenge"))
    .catch(() => false);
}
function openShortlistPopup(name) {
  const pop = document.getElementById("shortlistPopup");
  if (!pop) return false;
  const scaleEl = document.getElementById("slPopupScale");
  if (scaleEl) scaleEl.textContent = name;
  pop.hidden = false;
  document.getElementById("slEmail")?.focus();
  return true;
}
function initShortlist() {
  // one delegated handler: cards re-render (scale switcher, keep-exploring),
  // so per-element listeners would leak or miss
  const heartAction = el => {
    const { handle, name } = el.dataset;
    if (!handle) return;
    const added = toggleShortlist(handle, name || handle);
    if (el.classList.contains("shortlist-heart")) {
      el.classList.remove("pop");
      void el.offsetWidth; // restart the animation
      if (added) el.classList.add("pop");
    }
    if (!added) return shortlistToast("Removed from your shortlist");
    // full popup once per session, and never again after an email is left
    if (!localStorage.getItem("ayasa:shortlist:signed") && !sessionStorage.getItem("ayasa:shortlist:popup")) {
      sessionStorage.setItem("ayasa:shortlist:popup", "1");
      if (openShortlistPopup(name || handle)) return;
    }
    const n = getShortlist().length;
    shortlistToast(`Noted ♡. ${n} scale${n === 1 ? "" : "s"} on your shortlist`);
  };
  document.addEventListener("click", e => {
    const remove = e.target.closest(".sl-panel-remove");
    if (remove) { toggleShortlist(remove.dataset.handle, remove.dataset.name); return; }
    const el = e.target.closest(".shortlist-heart, .shortlist-btn");
    if (!el) return;
    e.preventDefault(); // hearts sit inside/over card links — never navigate
    e.stopPropagation();
    heartAction(el);
  });
  // shop-grid hearts are spans (a <button> inside the card <a> is invalid HTML)
  document.addEventListener("keydown", e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const el = e.target.closest?.('.shortlist-heart[role="button"]');
    if (!el) return;
    e.preventDefault();
    heartAction(el);
  });

  // header heart → dropdown panel
  const navBtn = document.getElementById("navShortlist");
  const nav = document.getElementById("nav");
  if (navBtn && nav) {
    const panel = document.createElement("div");
    panel.className = "shortlist-panel";
    panel.hidden = true;
    nav.appendChild(panel);
    const closePanel = () => {
      panel.hidden = true;
      navBtn.setAttribute("aria-expanded", "false");
      refreshShortlistUI(); // re-evaluate the heart's visibility (list may be empty now)
    };
    navBtn.addEventListener("click", () => {
      if (panel.hidden) {
        panel.hidden = false;
        navBtn.setAttribute("aria-expanded", "true");
        renderShortlistPanel(panel);
      } else closePanel();
    });
    document.addEventListener("click", e => {
      // removing an item re-renders the panel and detaches the clicked × —
      // a detached target is not "outside", so don't let it close the panel
      if (!document.body.contains(e.target)) return;
      if (!panel.hidden && !panel.contains(e.target) && !navBtn.contains(e.target)) closePanel();
    });
    // panel controls (delegated — the panel re-renders on every list change)
    panel.addEventListener("click", e => {
      if (e.target.closest(".sl-panel-close")) return closePanel();
      if (e.target.closest("#slPanelSignup")) {
        closePanel();
        openShortlistPopup(getShortlist()[0]?.name || "Your shortlist");
      }
    });
    panel.addEventListener("change", e => {
      const box = e.target.closest("#slNotifyBox");
      if (!box) return;
      if (!box.checked) { localStorage.removeItem("ayasa:notify-availability"); return; } // local only — see plan doc
      localStorage.setItem("ayasa:notify-availability", "1");
      const email = localStorage.getItem("ayasa:shortlist:email");
      if (!email) {
        // no email on record yet — the signup popup carries the tag from here
        closePanel();
        openShortlistPopup(getShortlist()[0]?.name || "Your shortlist");
        return;
      }
      postCustomerTags(email, ["shortlist-waitlist", "notify-availability", ...getShortlist().map(i => `wants:${i.handle}`)])
        .then(ok => {
          if (ok) { trackShortlist("notify_optin"); shortlistToast("Noted ♡. We'll email you when availability improves"); }
          else { box.checked = false; localStorage.removeItem("ayasa:notify-availability"); shortlistToast("Something went wrong. Please try again."); }
        });
    });
  }

  // return trip from a native full-page POST (bot-challenge path): Shopify
  // redirects back with ?customer_posted=true — promote the stashed email
  // to the signed state. The footer newsletter form never stashes one, so
  // its posts are ignored here.
  if (location.search.includes("customer_posted=true")) {
    const pending = localStorage.getItem("ayasa:shortlist:pending-email");
    if (pending) {
      localStorage.setItem("ayasa:shortlist:signed", "1");
      localStorage.setItem("ayasa:shortlist:email", pending);
      localStorage.removeItem("ayasa:shortlist:pending-email");
      trackShortlist("waitlist_signup");
      shortlistToast("You're on the list ✓. We'll email you the moment shortlists go live.");
      const url = new URL(location);
      url.searchParams.delete("customer_posted");
      history.replaceState(null, "", url);
    }
  }

  // waitlist popup: close + AJAX submit (native-POST fallback for the bot challenge)
  const pop = document.getElementById("shortlistPopup");
  if (pop) {
    pop.querySelectorAll("[data-sl-close]").forEach(el => el.addEventListener("click", () => { pop.hidden = true; }));
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !pop.hidden) pop.hidden = true; });
    const form = document.getElementById("shortlistForm");
    if (form) form.addEventListener("submit", async e => {
      e.preventDefault();
      const err = document.getElementById("slError");
      err.hidden = true;
      // tag the signup with every scale saved so far → who-wants-what in admin.
      // The disclosure under the button names the newsletter, so the tag is
      // unconditional; notify-availability rides along when the panel box asked.
      const tags = ["shortlist-waitlist", "newsletter", ...getShortlist().map(i => `wants:${i.handle}`)];
      if (localStorage.getItem("ayasa:notify-availability")) tags.push("notify-availability");
      document.getElementById("slTags").value = tags.join(", ");
      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      const email = (document.getElementById("slEmail")?.value || "").trim();
      // stash the email before submitting: if the bot challenge forces a
      // full-page POST, the ?customer_posted=true return trip (handled below)
      // promotes it to the signed state
      localStorage.setItem("ayasa:shortlist:pending-email", email);
      const succeed = () => {
        localStorage.setItem("ayasa:shortlist:signed", "1");
        // kept in the shopper's own browser so the notify box can tag them later without re-asking
        localStorage.setItem("ayasa:shortlist:email", email);
        localStorage.removeItem("ayasa:shortlist:pending-email");
        trackShortlist("waitlist_signup");
        form.hidden = true;
        document.getElementById("slSuccess").hidden = false;
      };
      try {
        const r = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "text/html" } });
        // Shopify's bot check ("Verifying your connection…") comes back as an
        // inline 403 or a /challenge redirect — either way only a real
        // navigation can pass it, so hand over to a native full-page POST
        if (r.status === 403 || (r.url && r.url.includes("challenge"))) { form.submit(); return; }
        if (!r.ok) throw new Error();
        succeed();
      } catch {
        // network error mid-redirect etc. — the native post is the reliable path
        form.submit();
      }
    });
  }

  refreshShortlistUI();
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

  // gallery carousel: product photos + (when the model has videos) a final
  // video slide. Arrows + swipe navigate; the video thumb/slide open the lightbox.
  const demoModel = typeof MODELS !== "undefined" &&
    MODELS.find(m => m.productHandle === handle && m.videos && m.videos.length);
  const photoBox = document.getElementById("productPhoto");
  const photoImg = photoBox && photoBox.querySelector("img");
  const thumbsBox = document.getElementById("productThumbs");
  if (photoBox && photoImg && thumbsBox) {
    // TEMP: photographer test — swap the gallery for theme-asset crops
    const testGal = typeof TEST_GALLERY !== "undefined" && TEST_GALLERY[handle];
    if (testGal) {
      thumbsBox.innerHTML = testGal.map((src, n) => `
        <button type="button" class="product-thumb${n === 0 ? " active" : ""}" data-src="${src}" aria-label="Photo ${n + 1}">
          <img src="${src}" alt="" loading="lazy">
        </button>`).join("");
      photoImg.src = testGal[0];
      photoImg.removeAttribute("srcset");
    }
    const slides = [...thumbsBox.querySelectorAll(".product-thumb")].map(t => ({ type: "photo", src: t.dataset.src }));
    if (!slides.length) slides.push({ type: "photo", src: photoImg.currentSrc || photoImg.src });
    if (demoModel) {
      const poster = demoModel.videos[0].file.replace(/\.mp4$/, ".jpg");
      slides.push({ type: "video", src: poster });
      const vt = document.createElement("button");
      vt.type = "button";
      vt.className = "product-thumb product-thumb-video";
      vt.setAttribute("aria-label", "Watch the video");
      vt.innerHTML = `<img src="${poster}" alt="" loading="lazy"><span class="thumb-play" aria-hidden="true">▶</span>`;
      thumbsBox.appendChild(vt);
    }
    const thumbEls = [...thumbsBox.querySelectorAll(".product-thumb")];
    const prev = document.getElementById("galPrev");
    const next = document.getElementById("galNext");
    const videoCta = document.getElementById("galVideoCta");
    const openVideo = () => demoModel && openDemoLightbox(demoModel, 0, buildBuyCtx());
    let gi = 0;
    const show = i => {
      gi = (i + slides.length) % slides.length;
      const s = slides[gi];
      photoImg.src = s.src;
      photoImg.removeAttribute("srcset");
      photoBox.classList.toggle("gal-video-mode", s.type === "video");
      videoCta.hidden = s.type !== "video";
      thumbEls.forEach((t, n) => t.classList.toggle("active", n === gi));
    };
    if (slides.length > 1) {
      prev.hidden = next.hidden = false;
      prev.addEventListener("click", () => show(gi - 1));
      next.addEventListener("click", () => show(gi + 1));
    }
    thumbEls.forEach((t, n) => t.addEventListener("click", () => {
      show(n);
      if (t.classList.contains("product-thumb-video")) openVideo();
    }));
    videoCta.addEventListener("click", openVideo);
    let sx = 0, sy = 0;
    photoBox.addEventListener("touchstart", e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    photoBox.addEventListener("touchend", e => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.5) show(gi + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  // "Hear it played" — performance strip from the model data (demoModel
  // resolved above, shared with the gallery's video slide)
  if (demoModel) {
    const strip = document.getElementById("demoStrip");
    strip.innerHTML = demoModel.videos.map((v, i) => {
      const base = v.artist.split(" · ")[0];
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
    const artistCount = new Set(demoModel.videos.map(v => v.artist.split(" · ")[0])).size;
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
initScaleNav();   // same — its range cards carry reveal classes too
initDemoButtons();
initReveal();
initNav();
initHeroMotion();
initProductPage();
initHoverPreviews();
refreshWatchedDots();
restoreMiniPlayer();
initShortlist();  // after every render pass — hearts sync to localStorage state
