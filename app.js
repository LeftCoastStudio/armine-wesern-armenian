// ═══════════════════════════════════════════════════════════════════
//  Armine's Western Armenian — app.js
//  Vanilla JS, no dependencies. Western Armenian (classical orthography).
// ═══════════════════════════════════════════════════════════════════

// ── VOCABULARY ────────────────────────────────────────────────────
// All words live in words.json so anyone can propose a fix without
// touching code. The preview build inlines it as window.__WORDS__.
const REPO = "https://github.com/LeftCoastStudio/armine-wesern-armenian";
let categories = {};
let alphabet = [];

async function loadWords() {
  if (window.__WORDS__) return window.__WORDS__;
  const res = await fetch("words.json", { cache: "no-cache" });
  if (!res.ok) throw new Error(`words.json ${res.status}`);
  return res.json();
}

function correctionLink(word) {
  const base = `${REPO}/issues/new?template=word-correction.yml`;
  if (!word) return base;
  const p = new URLSearchParams({ title: `Correction: ${word.armenian} (${word.english})`, word: `${word.armenian} — ${word.phonetic} — ${word.english}` });
  return `${base}&${p.toString()}`;
}

// ── PICTURES ─────────────────────────────────────────────────────
// Illustrations live in one sprite, img/art.svg, as <symbol id="slug">.
// A word's slug is its English name before any " / " or " (" —
// "ice cream" → ice-cream, "gata (sweet bread)" → gata. Words without
// an illustration fall back to their emoji on the same tinted circle,
// so every word still gets a picture. The preview build inlines the
// sprite and sets window.__SPRITE_INLINE__.
const ART = new Set(("apple apricot banana barbecue beans bear bee beer bird bread butter butterfly carrot cat cheese " +
  "chick chicken coffee cow cucumber dog dolma donkey dragon duck egg elephant fish fox frog garlic gata goat grapes " +
  "honey horse ice-cream juice lavash lemon lion meat milk monkey mouse oil onion orange owl pepper pig pilaf " +
  "pomegranate potato rabbit rice salt sheep soup sugar tea tomato turtle walnut water watermelon wine yogurt").split(" "));
const DECK_ART = {
  basics: "deck-greetings", dailyPhrases: "deck-phrases", questions: "deck-questions", pronouns: "deck-pronouns",
  verbforms: "deck-verbforms", feelings: "deck-feelings", describing: "deck-describing", time: "deck-time",
  town: "deck-town", money: "deck-money", family: "deck-family", food: "apple", animals: "dog", body: "deck-body",
  house: "deck-house", nature: "deck-nature", actions: "deck-actions", colors: "deck-colors", numbers: "deck-numbers",
  clothes: "deck-clothes", toys: "deck-toys", transport: "deck-transport", shapes: "deck-shapes",
};
// Decks whose quiz is "point to the picture". The rest get the pronunciation quiz.
const PICTURE_DECKS = new Set(["animals", "food", "body", "house", "nature", "colors", "clothes", "toys", "transport", "shapes", "family", "numbers"]);

const slugOf = w => String(w.english).toLowerCase().split(/\s*[\/(]/)[0].trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const SPRITE = "img/art.svg?v=2";
const art = slug => `<svg class="art" viewBox="0 0 120 120" aria-hidden="true"><use href="${window.__SPRITE_INLINE__ ? "" : SPRITE}#${slug}"></use></svg>`;
const tint = hex => `${hex}26`;

function picture(word, color, size, extraClass = "") {
  const slug = slugOf(word);
  const style = `width:${size}px;height:${size}px;background:${tint(color)}`;
  if (ART.has(slug)) return `<span class="pic ${extraClass}" style="${style}">${art(slug)}</span>`;
  return `<span class="pic emoji ${extraClass}" style="${style};font-size:${Math.round(size * 0.5)}px">${word.emoji || ""}</span>`;
}
function deckPicture(key, c, size, extraClass = "") {
  const a = DECK_ART[key];
  const style = `width:${size}px;height:${size}px;background:${tint(c.color)}`;
  if (a) return `<span class="pic ${extraClass}" style="${style}">${art(a)}</span>`;
  return `<span class="pic emoji ${extraClass}" style="${style};font-size:${Math.round(size * 0.5)}px">${c.icon || ""}</span>`;
}

// ── ICONS (inline stroke SVG) ────────────────────────────────────
const I = {
  speaker: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
  back: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>`,
  next: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`,
  close: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  shuffle: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/><path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"/><path d="M2 6h1.972a4 4 0 0 1 3.6 2.2"/><path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"/></svg>`,
  check: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`,
  retry: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>`,
  book: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>`,
  target: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  search: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  flame: `<svg class="ic fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  star: `<svg class="ic fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>`,
  eye: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`,
  eyeOff: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>`,
};

// ── STORAGE (safe — never throws) ────────────────────────────────
const STORE_KEY = "armenian-progress-v2";
const OLD_KEY = "armenian-progress-v1";
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)) || null; } catch { return null; } },
  set(v) { try { localStorage.setItem(STORE_KEY, JSON.stringify(v)); } catch {} },
};
const progress = (() => {
  const v2 = store.get(STORE_KEY);
  if (v2) return { best: {}, studied: {}, known: {}, review: {}, days: [], last: null, ...v2 };
  const v1 = store.get(OLD_KEY) || {};
  return { best: v1.best || {}, studied: v1.studied || {}, known: {}, review: {}, days: [], last: null };
})();

const today = () => new Date().toISOString().slice(0, 10);
function touchDay() {
  const d = today();
  if (progress.days[progress.days.length - 1] === d) return;
  progress.days.push(d);
  if (progress.days.length > 400) progress.days = progress.days.slice(-400);
  store.set(progress);
}
function streak() {
  const days = new Set(progress.days);
  let n = 0;
  const d = new Date();
  for (;;) {
    const key = d.toISOString().slice(0, 10);
    if (!days.has(key)) break;
    n++; d.setDate(d.getDate() - 1);
  }
  return n;
}
const setOf = (obj, cat) => new Set(obj[cat] || []);
function setAdd(obj, cat, idx) { const s = setOf(obj, cat); s.add(idx); obj[cat] = [...s]; }
function setDel(obj, cat, idx) { const s = setOf(obj, cat); s.delete(idx); obj[cat] = [...s]; }

function markStudied(catKey, idx) {
  if (setOf(progress.studied, catKey).has(idx)) return;
  setAdd(progress.studied, catKey, idx);
  touchDay();
  store.set(progress);
}
function markKnown(catKey, idx, known) {
  if (known) { setAdd(progress.known, catKey, idx); setDel(progress.review, catKey, idx); }
  else { setDel(progress.known, catKey, idx); setAdd(progress.review, catKey, idx); }
  touchDay();
  store.set(progress);
}
const knownCount = cat => setOf(progress.known, cat).size;
const reviewCount = cat => setOf(progress.review, cat).size;
const totalKnown = () => Object.keys(categories).reduce((n, k) => n + knownCount(k), 0);
function statusOf(catKey, idx) {
  if (setOf(progress.known, catKey).has(idx)) return "known";
  if (setOf(progress.review, catKey).has(idx)) return "review";
  return "new";
}
function saveBest(catKey, score, total) {
  const b = progress.best[catKey];
  if (!b || score / total > b.score / b.total) progress.best[catKey] = { score, total };
  store.set(progress);
}

// ── STATE ────────────────────────────────────────────────────────────
let state = {
  mode: "home",
  cat: null,
  deck: [],
  pos: 0,
  shuffle: false,
  hideTranslation: false,
  revealed: false,
  quizType: "picture",   // "picture" | "pron" | "meaning"
  quizOptions: [],
  selectedAnswer: null,
  score: 0,
  missed: [],
  searchQuery: "",
  alphaSel: 0,
};
const app = document.getElementById("app");

// ── HELPERS ────────────────────────────────────────────────────────
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const shuffleArr = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
const catKeys = () => Object.keys(categories);
const wordsOf = key => categories[key].words.map((w, i) => ({ ...w, catKey: key, idx: i, id: `${key}:${i}`, category: categories[key].name, catColor: categories[key].color }));
const allWords = () => catKeys().flatMap(wordsOf);
const totalWords = () => Object.values(categories).reduce((n, c) => n + c.words.length, 0);
const deckIndex = key => catKeys().indexOf(key) + 1;
const quizTypeFor = key => PICTURE_DECKS.has(key) ? "picture" : "pron";

function buildDeck(subset) {
  const words = subset || wordsOf(state.cat);
  state.deck = state.shuffle ? shuffleArr(words) : words;
  state.pos = 0;
  state.revealed = false;
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return { en: "Good morning.", hy: "Բարի լոյս" };
  if (h < 18) return { en: "Good afternoon.", hy: "Բարի օր" };
  return { en: "Good evening.", hy: "Բարի իրիկուն" };
}

function phraseOfDay() {
  const list = (categories.dailyPhrases || categories.basics).words;
  const now = new Date();
  const day = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  return list[day % list.length];
}

function hl(text, q) {
  const s = String(text);
  if (!q) return esc(s);
  const i = s.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return esc(s);
  return esc(s.slice(0, i)) + "<mark>" + esc(s.slice(i, i + q.length)) + "</mark>" + esc(s.slice(i + q.length));
}

// ── TEXT-TO-SPEECH (ElevenLabs via Netlify Function, cached) ─────
const audioCache = {};
let currentAudio = null;
let toastTimer = null;

function toast(msg) {
  let el = document.getElementById("toast");
  if (!el) { el = document.createElement("div"); el.id = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
}

async function speak(text, btnEl) {
  if (btnEl) { btnEl.classList.add("loading"); btnEl.setAttribute("aria-busy", "true"); }
  if (currentAudio) { currentAudio.pause(); currentAudio = null; }
  try {
    if (!audioCache[text]) {
      const res = await fetch("/.netlify/functions/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.audio) {
        throw new Error(data.error ? `${data.error}${data.details ? " — " + data.details : ""}` : `HTTP ${res.status}`);
      }
      audioCache[text] = "data:audio/mpeg;base64," + data.audio;
    }
    currentAudio = new Audio(audioCache[text]);
    currentAudio.playbackRate = 0.85;
    await currentAudio.play();
  } catch (err) {
    console.warn("Audio failed:", err);
    // Only fall back to the browser voice if it actually has Armenian; otherwise say so.
    const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    const hy = voices.find(v => v.lang.toLowerCase().startsWith("hy"));
    if (hy) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.voice = hy; u.rate = 0.75;
      window.speechSynthesis.speak(u);
    } else {
      toast("Audio unavailable — " + (String(err.message).includes("fetch") ? "no connection to the audio service." : err.message).slice(0, 140));
    }
  } finally {
    if (btnEl) { btnEl.classList.remove("loading"); btnEl.removeAttribute("aria-busy"); }
  }
}
if (window.speechSynthesis) { window.speechSynthesis.getVoices(); window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices(); }

function speakerBtn(text, cls = "", label = "") {
  const safe = text.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  return `<button class="spk ${cls}" aria-label="Listen" title="Listen" onclick="event.stopPropagation();speak('${esc(safe)}', this)">${I.speaker}${label ? `<span>${label}</span>` : ""}</button>`;
}

// ── RENDER ───────────────────────────────────────────────────────────
function tabbar(active) {
  return `<nav class="tabbar" aria-label="Main">
    <button class="tab ${active === "home" ? "active" : ""}" onclick="goHome()" ${active === "home" ? 'aria-current="page"' : ""}>${I.book}<span>Learn</span></button>
    <button class="tab ${active === "search" ? "active" : ""}" onclick="goSearch()" ${active === "search" ? 'aria-current="page"' : ""}>${I.search}<span>Lookup</span></button>
    <button class="tab ${active === "alphabet" ? "active" : ""}" onclick="goAlphabet()" ${active === "alphabet" ? 'aria-current="page"' : ""}><span class="hy" aria-hidden="true">Ա</span><span>Alphabet</span></button>
  </nav>`;
}

function render() {
  const s = state;
  let h = "";
  switch (s.mode) {
    case "home": h = renderHome(); break;
    case "deck": h = renderDeck(); break;
    case "flashcard": h = renderFlashcard(); break;
    case "quiz": h = renderQuiz(); break;
    case "results": h = renderResults(); break;
    case "search": h = renderSearch(); break;
    case "alphabet": h = renderAlphabet(); break;
    default: h = renderHome();
  }
  app.innerHTML = h;
  if (s.mode === "search") {
    const input = app.querySelector(".search-input");
    if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
  }
  try { window.scrollTo({ top: 0 }); } catch {}
}

// ─── HOME ───
function renderHome() {
  const g = greeting();
  const p = phraseOfDay();
  const days = streak();
  const known = totalKnown();
  let h = `<main class="screen">`;
  h += `<header class="home-head"><div class="stack"><div class="eyebrow">Armine's Western Armenian</div><h1 class="title">${g.en}</h1><div class="subtitle"><span class="hy">${g.hy}</span> · ${known > 0 ? `${known} of ${totalWords()} words known` : `${totalWords()} words to learn`}</div></div>`;
  if (days > 0) h += `<div class="chip" title="Days in a row">${I.flame}<span>${days} ${days === 1 ? "day" : "days"}</span></div>`;
  h += `</header>`;

  h += `<section class="hero" aria-label="Phrase of the day">
    <div class="label">Today's phrase</div>
    <div class="hy" lang="hy">${esc(p.armenian)}</div>
    <div class="row"><div class="stack"><div class="phon">${esc(p.phonetic)}</div><div class="en">${esc(p.english)}</div></div>${speakerBtn(p.armenian)}</div>
  </section>`;

  // Continue card: last opened deck, or the first deck with progress but not done.
  const cont = [progress.last, ...catKeys()].filter(Boolean).find(k => categories[k] && knownCount(k) > 0 && knownCount(k) < categories[k].words.length);
  if (cont) {
    const c = categories[cont], n = knownCount(cont), tot = c.words.length;
    h += `<button class="card continue" onclick="openDeck('${cont}')">${deckPicture(cont, c, 52)}
      <div class="stack"><div class="top"><div class="name">Continue · ${esc(c.name)}</div><div class="num">${n}<span>/${tot}</span></div></div><div class="bar gold"><i style="width:${(n / tot) * 100}%"></i></div></div>${I.next}</button>`;
  }

  h += `<div class="section-head"><h2 class="h2">Decks</h2><span class="meta">${catKeys().length} decks · ${totalWords()} words</span></div>`;
  h += `<div class="decks">`;
  for (const key of catKeys()) {
    const c = categories[key], n = knownCount(key), tot = c.words.length, done = n === tot;
    h += `<button class="card deck" onclick="openDeck('${key}')">${deckPicture(key, c, 60)}
      <div><div class="name">${esc(c.name)}</div><div class="count">${done ? `All ${tot} known` : `${n} of ${tot} known`}</div></div>
      <div class="bar ${done ? "green" : ""}"><i style="width:${(n / tot) * 100}%"></i></div></button>`;
  }
  h += `</div>`;
  h += `<div class="footer-note">Open source · <a href="${REPO}" target="_blank" rel="noopener">GitHub</a> · <a href="${correctionLink()}" target="_blank" rel="noopener">Suggest a correction</a><br>Code MIT · words CC BY 4.0</div>`;
  h += `</main>` + tabbar("home");
  return h;
}

// ─── DECK ───
function renderDeck() {
  const key = state.cat, c = categories[key];
  const words = wordsOf(key);
  const n = knownCount(key), r = reviewCount(key), tot = words.length, best = progress.best[key];
  let h = `<main class="screen focus">`;
  h += `<div class="topbar"><button class="iconbtn" onclick="goHome()" aria-label="Back to decks">${I.back}</button><div class="label">Deck ${deckIndex(key)} of ${catKeys().length}</div><span class="spacer44"></span></div>`;
  h += `<div class="deck-head">${deckPicture(key, c, 84)}<div class="stack"><h1 class="title">${esc(c.name)}</h1>
    <div class="subtitle">${tot} words · <span style="color:var(--green)">${n} known</span>${r ? ` · <span style="color:var(--gold-text)">${r} to review</span>` : ""}${best ? ` · best quiz ${best.score}/${best.total}` : ""}</div>
    <div class="bar gold thick"><i style="width:${(n / tot) * 100}%"></i></div></div></div>`;
  h += `<div class="deck-actions"><button class="btn btn-primary" onclick="startLearn()">${I.book}<span>Learn</span></button><button class="btn btn-outline" onclick="startQuiz('${quizTypeFor(key)}')">${I.target}<span>Quiz</span></button></div>`;
  if (quizTypeFor(key) === "picture") h += `<div class="deck-extra"><button class="textbtn" onclick="startQuiz('pron')">Pronunciation quiz instead →</button></div>`;
  else h += `<div class="deck-extra"><button class="textbtn" onclick="startQuiz('meaning')">Meaning quiz instead →</button></div>`;

  h += `<div class="list-head"><h2 class="h2" style="font-size:20px">Words</h2><div class="legend"><span><i class="dot known"></i>Known</span><span><i class="dot review"></i>Review</span><span><i class="dot new"></i>New</span></div></div>`;
  h += `<div class="card list">`;
  words.forEach((w, i) => {
    const st = statusOf(key, w.idx);
    h += `<div class="row">${picture(w, c.color, 50)}<div class="stack"><div class="hy" lang="hy">${esc(w.armenian)}</div><div class="sub"><span class="phon">${esc(w.phonetic)}</span> · <span class="en">${esc(w.english)}</span></div></div><i class="dot ${st}" title="${st}"></i>${speakerBtn(w.armenian)}</div>`;
  });
  h += `</div>`;
  h += `<div class="fine" style="padding-top:18px">Something wrong? <a href="${correctionLink()}" target="_blank" rel="noopener">Suggest a fix</a></div>`;
  h += `</main>`;
  return h;
}

// ─── FLASHCARD ───
function renderFlashcard() {
  const s = state, c = categories[s.cat], card = s.deck[s.pos];
  markStudied(s.cat, card.idx);
  const hidden = s.hideTranslation && !s.revealed;
  const st = statusOf(s.cat, card.idx);
  const parts = String(card.phonetic).split(/[-\s]+/).filter(Boolean);
  const stress = parts.length > 1 ? parts.find(p => p.length > 1 && p === p.toUpperCase() && /[A-Z]/.test(p)) : null;
  let h = `<main class="screen focus">`;
  h += `<div class="topbar"><button class="iconbtn" onclick="openDeck('${s.cat}')" aria-label="Back to deck">${I.back}</button><div class="center"><div class="serif">${esc(c.name)}</div><div class="label">${s.pos + 1} of ${s.deck.length}</div></div><button class="iconbtn ${s.shuffle ? "" : "ghost"}" onclick="toggleShuffle()" aria-label="Shuffle deck" aria-pressed="${s.shuffle}" title="Shuffle">${I.shuffle}</button></div>`;
  h += `<div class="progress-wrap"><div class="bar gold thick"><i style="width:${((s.pos + 1) / s.deck.length) * 100}%"></i></div></div>`;
  h += `<div class="card flashcard" role="button" tabindex="0" onclick="cardTap()" onkeydown="if(event.key==='Enter')cardTap()">`;
  const slug = slugOf(card);
  h += `<div class="fc-band" style="background:${tint(c.color)}"><span class="label">${esc(c.name)}</span><span class="status ${st}">${st === "known" ? "Known" : st === "review" ? "Review" : "New"}</span>`;
  h += ART.has(slug) ? art(slug) : `<span class="emoji">${card.emoji || ""}</span>`;
  h += `</div>`;
  h += `<div class="fc-body"><div class="hy" lang="hy">${esc(card.armenian)}</div>`;
  if (hidden) {
    h += `<div class="reveal">Tap to reveal</div>`;
  } else {
    h += `<span class="pill">${esc(card.phonetic)}</span><span class="rule"></span><div class="en">${esc(card.english)}</div>`;
    if (stress) h += `<div class="hint">Stress the loud part: <b>${esc(stress)}</b></div>`;
  }
  h += `</div></div>`;
  h += `<div class="hear"><button class="btn btn-primary btn-block" onclick="speak('${esc(card.armenian.replace(/\\/g, "\\\\").replace(/'/g, "\\'"))}', this)">${I.speaker}<span>Hear it</span></button></div>`;
  h += `<div class="rate">
    <button class="iconbtn" onclick="prevCard()" ${s.pos === 0 ? "disabled" : ""} aria-label="Previous word">${I.back}</button>
    <button class="btn btn-outline" onclick="rateCard(false)">${I.retry}<span>Again</span></button>
    <button class="btn btn-green" onclick="rateCard(true)">${I.check}<span>Got it</span></button>
    <button class="iconbtn" onclick="nextCard()" ${s.pos >= s.deck.length - 1 ? "disabled" : ""} aria-label="Next word">${I.next}</button>
  </div>`;
  h += `<div class="toolbar"><button class="toggle ${s.hideTranslation ? "on" : ""}" aria-pressed="${s.hideTranslation}" onclick="toggleHide()">${s.hideTranslation ? I.eyeOff : I.eye}<span>${s.hideTranslation ? "Translation hidden" : "Hide translation"}</span></button></div>`;
  h += `<div class="fine"><span class="kbd">← → to move · space to hear · </span>Something wrong? <a href="${correctionLink(card)}" target="_blank" rel="noopener">Suggest a fix</a></div>`;
  h += `</main>`;
  return h;
}

// ─── QUIZ ───
function renderQuiz() {
  const s = state, c = categories[s.cat], card = s.deck[s.pos];
  const answered = s.selectedAnswer !== null;
  const isPic = s.quizType === "picture";
  const key = s.quizType === "pron" ? "phonetic" : "english";
  let h = `<main class="screen focus ${answered ? "has-sheet" : ""}">`;
  h += `<div class="topbar"><button class="iconbtn" onclick="openDeck('${s.cat}')" aria-label="Quit quiz">${I.close}</button><div class="center"><div class="serif">${esc(c.name)}</div><div class="label">${s.pos + 1} of ${s.deck.length}</div></div><div class="chip">${I.star}<span>${s.score}</span></div></div>`;
  h += `<div class="segments">`;
  for (let i = 0; i < s.deck.length; i++) {
    let cls = "seg";
    if (i < s.pos || (i === s.pos && answered)) cls += s.missed.some(m => m.pos === i) ? " miss" : " done";
    else if (i === s.pos) cls += " cur";
    h += `<div class="${cls}"></div>`;
  }
  h += `</div>`;

  h += `<div class="quiz-prompt">`;
  if (isPic) {
    h += `<div class="q">Which one is…</div><div class="word"><div class="hy" lang="hy">${esc(card.armenian)}</div>${speakerBtn(card.armenian)}</div><span class="pill">${esc(card.phonetic)}</span>`;
  } else if (s.quizType === "pron") {
    h += `<div class="q">How do you say it?</div>${picture(card, c.color, 120)}<div class="word"><div class="hy" lang="hy">${esc(card.armenian)}</div>${speakerBtn(card.armenian)}</div>`;
  } else {
    h += `<div class="q">What does it mean?</div><div class="word"><div class="hy" lang="hy">${esc(card.armenian)}</div>${speakerBtn(card.armenian)}</div><span class="pill">${esc(card.phonetic)}</span>`;
  }
  h += `</div>`;

  h += `<div class="opts" role="group" aria-label="Answers">`;
  s.quizOptions.forEach((opt, i) => {
    const isCorrect = isPic ? opt.id === card.id : opt === card[key];
    const isSel = isPic ? (s.selectedAnswer && s.selectedAnswer.id === opt.id) : s.selectedAnswer === opt;
    let cls = "opt" + (isPic ? "" : " text");
    let mark = `<span class="key" aria-hidden="true">${i + 1}</span>`;
    if (answered) {
      if (isCorrect) { cls += " correct"; mark = `<span class="mark">${I.check}</span>`; }
      else if (isSel) { cls += " wrong"; mark = `<span class="mark">${I.close}</span>`; }
      else cls += " dim";
    }
    if (isPic) h += `<button class="${cls}" onclick="answer(${i})" ${answered ? "disabled" : ""} aria-pressed="${!!isSel}">${picture(opt, opt.catColor, 76)}<span class="en">${esc(opt.english)}</span>${mark}</button>`;
    else h += `<button class="${cls}" onclick="answer(${i})" ${answered ? "disabled" : ""} aria-pressed="${!!isSel}"><span class="txt">${esc(opt)}</span>${mark}</button>`;
  });
  h += `</div>`;
  h += `<div class="kbd-hint">Press 1, 2 or 3 · Enter for next</div>`;
  h += `</main>`;

  if (answered) {
    const ok = isPic ? s.selectedAnswer.id === card.id : s.selectedAnswer === card[key];
    const last = s.pos + 1 >= s.deck.length;
    h += `<div class="sheet"><div class="feedback ${ok ? "ok" : "bad"}"><span class="ico">${ok ? I.check : I.close}</span><div><div class="t">${ok ? `Ապրիս — that's right.` : `Not quite. It's <span class="serif" style="font-style:italic">${esc(card.english)}</span>.`}</div><div class="s"><span class="hy" lang="hy">${esc(card.armenian)}</span> · ${esc(card.phonetic)} · <span class="serif" style="font-style:italic">${esc(card.english)}</span></div></div></div>
      <button class="btn ${ok ? "btn-green" : "btn-primary"} btn-block" onclick="nextQuestion()"><span>${last ? "See results" : "Next"}</span>${I.next}</button></div>`;
  }
  return h;
}

// ─── RESULTS ───
function renderResults() {
  const s = state, c = categories[s.cat];
  const total = s.deck.length, best = progress.best[s.cat];
  const pct = s.score / total;
  const msg = pct === 1 ? "Ապրիս — perfect." : pct >= 0.7 ? "Ապրիս — well done." : "Keep going.";
  const lead = s.missed.length === 0 ? "Every one right. This deck is yours." : `${s.missed.length} to review, then this deck is yours.`;
  let h = `<main class="screen focus results">`;
  h += `<div class="topbar"><button class="iconbtn" onclick="openDeck('${s.cat}')" aria-label="Close results">${I.close}</button><div class="label">${esc(c.name)} · quiz</div><span class="spacer44"></span></div>`;
  h += `<div class="eyebrow" style="padding-top:20px">Your score</div><div class="score-row" style="padding-top:4px"><div class="score-big">${s.score}</div><div class="score-of">of ${total}</div></div>`;
  h += `<h1 class="title">${msg}</h1><div class="lead">${lead}${best ? ` Best so far: ${best.score}/${best.total}.` : ""}</div><div class="ink-rule"></div>`;
  h += `<div class="stats"><div class="stat"><div class="n green">${s.score}</div><div class="label">Correct</div></div><div class="stat"><div class="n pom">${s.missed.length}</div><div class="label">Missed</div></div><div class="stat"><div class="n">${Math.round(pct * 100)}%</div><div class="label">Score</div></div></div>`;
  if (s.missed.length) {
    h += `<div class="label" style="padding:18px 0 8px">Review these</div><div class="card list">`;
    for (const m of s.missed) {
      h += `<div class="row">${picture(m.word, c.color, 48)}<div class="stack"><div class="hy" lang="hy">${esc(m.word.armenian)}</div><div class="sub"><span class="phon">${esc(m.word.phonetic)}</span> · <span class="en">${esc(m.word.english)}</span>${m.picked ? ` · <span style="color:var(--pom)">you picked ${esc(m.picked)}</span>` : ""}</div></div>${speakerBtn(m.word.armenian)}</div>`;
    }
    h += `</div>`;
  }
  h += `<div class="results-actions">`;
  if (s.missed.length) h += `<button class="btn btn-primary" onclick="retryMissed()">${I.retry}<span>Retry the ${s.missed.length} missed</span></button>`;
  h += `<button class="btn ${s.missed.length ? "btn-outline" : "btn-primary"}" onclick="startQuiz('${s.quizType}')">${I.target}<span>Play again</span></button>`;
  h += `<button class="btn btn-soft" onclick="openDeck('${s.cat}')">Back to deck</button>`;
  h += `</div></main>`;
  return h;
}

// ─── SEARCH ───
function renderSearch() {
  const raw = state.searchQuery.trim(), q = raw.toLowerCase();
  const list = allWords();
  const results = q ? list.filter(w => w.english.toLowerCase().includes(q) || w.armenian.includes(raw) || w.phonetic.toLowerCase().includes(q)) : list;
  let h = `<main class="screen">`;
  h += `<div class="page-head"><div class="eyebrow">Dictionary</div><h1 class="title">Lookup</h1></div>`;
  h += `<div class="search-wrap">${I.search}<label for="q" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Search English, Armenian or phonetic</label><input id="q" class="search-input" type="search" placeholder="English, Armenian or phonetic" value="${esc(state.searchQuery)}" oninput="state.searchQuery=this.value;render()" autocomplete="off" autocapitalize="off" spellcheck="false">`;
  if (raw) h += `<button class="clear-btn" onclick="state.searchQuery='';render()" aria-label="Clear search">${I.close}</button>`;
  h += `</div>`;
  h += `<div class="search-meta"><span><b>${results.length}</b> ${results.length === 1 ? "match" : "matches"} · ${totalWords()} words</span><span>${raw ? "English · Armenian · phonetic" : "Showing everything"}</span></div>`;
  h += `<div class="card list">`;
  if (!results.length) h += `<div class="no-results">No matches. Try a different spelling, or the phonetic form.</div>`;
  for (const w of results.slice(0, 120)) {
    h += `<div class="row">${picture(w, w.catColor, 44)}<div class="stack"><div class="hy" lang="hy">${hl(w.armenian, raw)}</div><div class="sub"><span class="phon">${hl(w.phonetic, raw)}</span> · <span class="en">${hl(w.english, raw)}</span><span class="tag">${esc(w.category)}</span></div></div>${speakerBtn(w.armenian)}</div>`;
  }
  if (results.length > 120) h += `<div class="no-results">Showing the first 120. Keep typing to narrow it down.</div>`;
  h += `</div>`;
  h += `<div class="tip">Western Armenian swaps some consonants: type <b>b</b> for Պ, <b>g</b> for Կ, <b>d</b> for Տ.</div>`;
  h += `</main>` + tabbar("search");
  return h;
}

// ─── ALPHABET ───
function renderAlphabet() {
  const sel = alphabet[state.alphaSel] || alphabet[0];
  const example = allWords().find(w => w.armenian.startsWith(sel.upper) || w.armenian.startsWith(sel.lower));
  let h = `<main class="screen">`;
  h += `<div class="page-head"><div class="eyebrow">${alphabet.length} letters · Western sounds</div><h1 class="title">Alphabet</h1></div>`;
  h += `<div class="card alpha-sel"><div class="big" lang="hy" aria-hidden="true">${sel.upper}<small>${sel.lower}</small></div><div class="stack"><div class="label">Letter ${state.alphaSel + 1} · ${esc(sel.name)}</div><div class="sound">“${esc(sel.sound)}”</div>`;
  if (example) h += `<div class="ex">${picture(example, example.catColor, 26)}<span class="hy" lang="hy">${esc(example.armenian)}</span><span>${esc(example.phonetic)}</span><span class="serif">${esc(example.english)}</span></div>`;
  h += `</div>${speakerBtn(sel.upper)}</div>`;
  h += `<div class="alpha-grid">`;
  alphabet.forEach((l, i) => {
    h += `<button class="alpha ${i === state.alphaSel ? "active" : ""}" onclick="selectLetter(${i}, this)" aria-pressed="${i === state.alphaSel}" aria-label="${esc(l.name)}, ${esc(l.sound)}"><span class="u" lang="hy">${l.upper}<small>${l.lower}</small></span><span class="n">${esc(l.sound)}</span></button>`;
  });
  h += `</div></main>` + tabbar("alphabet");
  return h;
}

// ── ACTIONS ────────────────────────────────────────────────────────
function goHome() { state.mode = "home"; state.cat = null; render(); }
function goSearch() { state.mode = "search"; render(); }
function goAlphabet() { state.mode = "alphabet"; render(); }
function openDeck(key) {
  state.cat = key; state.mode = "deck"; state.selectedAnswer = null;
  progress.last = key; store.set(progress);
  render();
}
function startLearn() { state.shuffle = false; buildDeck(); state.mode = "flashcard"; render(); }
function toggleShuffle() {
  const cur = state.deck[state.pos];
  state.shuffle = !state.shuffle; buildDeck();
  if (!state.shuffle && cur) state.pos = Math.max(0, state.deck.findIndex(w => w.id === cur.id));
  render();
}
function toggleHide() { state.hideTranslation = !state.hideTranslation; state.revealed = false; render(); }
function cardTap() {
  if (state.hideTranslation && !state.revealed) { state.revealed = true; render(); return; }
  const card = state.deck[state.pos];
  if (card) speak(card.armenian, app.querySelector(".hear .btn"));
}
function nextCard() {
  if (state.pos < state.deck.length - 1) { state.pos++; state.revealed = false; render(); }
}
function prevCard() {
  if (state.pos > 0) { state.pos--; state.revealed = false; render(); }
}
function rateCard(known) {
  const card = state.deck[state.pos];
  if (!card) return;
  markKnown(state.cat, card.idx, known);
  if (state.pos < state.deck.length - 1) { state.pos++; state.revealed = false; render(); }
  else {
    const c = categories[state.cat];
    toast(knownCount(state.cat) === c.words.length ? `Ապրիս — every word in ${c.name} is known.` : `End of ${c.name}. ${knownCount(state.cat)} of ${c.words.length} known.`);
    openDeck(state.cat);
  }
}

function makeOptions(card, type) {
  if (type === "picture") {
    const same = wordsOf(state.cat).filter(w => w.id !== card.id && w.english !== card.english);
    let wrongs = shuffleArr(same).slice(0, 2);
    if (wrongs.length < 2) {
      const global = allWords().filter(w => w.id !== card.id && w.english !== card.english && !wrongs.some(x => x.id === w.id));
      wrongs = wrongs.concat(shuffleArr(global).slice(0, 2 - wrongs.length));
    }
    return shuffleArr([card, ...wrongs]);
  }
  const key = type === "pron" ? "phonetic" : "english";
  const correct = card[key];
  const same = [...new Set(categories[state.cat].words.map(w => w[key]).filter(v => v !== correct))];
  let wrongs = shuffleArr(same).slice(0, 2);
  if (wrongs.length < 2) {
    const global = [...new Set(allWords().map(w => w[key]).filter(v => v !== correct && !wrongs.includes(v)))];
    wrongs = wrongs.concat(shuffleArr(global).slice(0, 2 - wrongs.length));
  }
  return shuffleArr([correct, ...wrongs]);
}
function startQuiz(type, subset) {
  state.quizType = type;
  state.shuffle = true; buildDeck(subset);
  if (!subset && state.deck.length > 10) state.deck = state.deck.slice(0, 10);
  state.mode = "quiz"; state.score = 0; state.selectedAnswer = null; state.missed = [];
  state.quizOptions = makeOptions(state.deck[0], type);
  touchDay();
  render();
}
function answer(i) {
  if (state.selectedAnswer !== null) return;
  const opt = state.quizOptions[i];
  if (opt === undefined) return;
  const card = state.deck[state.pos];
  const isPic = state.quizType === "picture";
  const key = state.quizType === "pron" ? "phonetic" : "english";
  const ok = isPic ? opt.id === card.id : opt === card[key];
  state.selectedAnswer = opt;
  if (ok) { state.score++; if (isPic || state.quizType === "meaning") markKnown(state.cat, card.idx, true); }
  else { state.missed.push({ pos: state.pos, word: card, picked: isPic ? opt.english : opt }); markKnown(state.cat, card.idx, false); }
  render();
}
function nextQuestion() {
  if (state.selectedAnswer === null) return;
  if (state.pos + 1 < state.deck.length) {
    state.pos++; state.selectedAnswer = null;
    state.quizOptions = makeOptions(state.deck[state.pos], state.quizType);
  } else {
    saveBest(state.cat, state.score, state.deck.length);
    state.mode = "results";
  }
  render();
}
function retryMissed() {
  const subset = state.missed.map(m => m.word);
  startQuiz(state.quizType, subset);
}
function selectLetter(i, btn) {
  state.alphaSel = i;
  render();
  const l = alphabet[i];
  if (l) speak(l.upper, app.querySelector(".alpha-sel .spk"));
}

// ── KEYBOARD ─────────────────────────────────────────────────────
document.addEventListener("keydown", e => {
  if (e.target.tagName === "INPUT") return;
  if (state.mode === "flashcard") {
    if (e.key === "ArrowRight") nextCard();
    else if (e.key === "ArrowLeft") prevCard();
    else if (e.key === " ") { e.preventDefault(); cardTap(); }
  } else if (state.mode === "quiz") {
    if (/^[1-3]$/.test(e.key)) answer(Number(e.key) - 1);
    else if (e.key === "Enter" || e.key === " ") { if (state.selectedAnswer !== null) { e.preventDefault(); nextQuestion(); } }
  } else if (e.key === "Escape" && state.mode !== "home") {
    goHome();
  }
});

// ── INIT ────────────────────────────────────────────────────────────
(async () => {
  try {
    const data = await loadWords();
    categories = data.categories;
    alphabet = data.alphabet;
    render();
  } catch (err) {
    console.error(err);
    app.innerHTML = `<div class="error-box">Couldn't load the word list (${esc(err.message)}). Refresh to try again.</div>`;
  }
})();
