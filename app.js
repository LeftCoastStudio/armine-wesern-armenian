// ═══════════════════════════════════════════════════════════════════
//  Armine's Western Armenian — app.js
//  Vanilla JS, no dependencies. Western Armenian (classical orthography).
// ═══════════════════════════════════════════════════════════════════

// ── VOCABULARY ───────────────────────────────────────────────────
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

// ── STORAGE (safe — never throws) ────────────────────────────────
const STORE_KEY = "armenian-progress-v1";
const store = {
  get() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || null; } catch { return null; } },
  set(v) { try { localStorage.setItem(STORE_KEY, JSON.stringify(v)); } catch {} },
};
const progress = store.get() || { best: {}, studied: {} };

function markStudied(catKey, idx) {
  const set = new Set(progress.studied[catKey] || []);
  if (set.has(idx)) return;
  set.add(idx);
  progress.studied[catKey] = [...set];
  store.set(progress);
}
function studiedCount(catKey) { return (progress.studied[catKey] || []).length; }
function totalStudied() { return Object.values(progress.studied).reduce((n, a) => n + a.length, 0); }
function saveBest(catKey, score, total) {
  const b = progress.best[catKey];
  if (!b || score / total > b.score / b.total) {
    progress.best[catKey] = { score, total };
    store.set(progress);
  }
}

// ── STATE ────────────────────────────────────────────────────────
let state = {
  mode: "home",
  cat: null,
  deck: [],
  pos: 0,
  shuffle: false,
  hideTranslation: false,
  revealed: false,
  quizType: "pron",
  quizOptions: [],
  selectedAnswer: null,
  score: 0,
  searchQuery: "",
};
const app = document.getElementById("app");

// ── HELPERS ──────────────────────────────────────────────────────
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const shuffleArr = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
const allWords = () => Object.entries(categories).flatMap(([key, c]) =>
  c.words.map((w, i) => ({ ...w, catKey: key, idx: i, category: c.name, catColor: c.color })));
const totalWords = () => Object.values(categories).reduce((n, c) => n + c.words.length, 0);

function buildDeck() {
  const words = categories[state.cat].words.map((w, i) => ({ ...w, idx: i }));
  state.deck = state.shuffle ? shuffleArr(words) : words;
  state.pos = 0;
  state.revealed = false;
}

function phraseOfDay() {
  const list = categories.dailyPhrases.words;
  const now = new Date();
  const day = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  return list[day % list.length];
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
  if (btnEl) { btnEl.textContent = "⏳"; btnEl.disabled = true; }
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
    if (btnEl) { btnEl.textContent = "🔊"; btnEl.disabled = false; }
  }
}
if (window.speechSynthesis) { window.speechSynthesis.getVoices(); window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices(); }

function speakerBtn(text, size = 22) {
  const safe = text.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  return `<button class="speaker-btn" aria-label="Listen" title="Listen" style="font-size:${size}px" onclick="event.stopPropagation();speak('${safe}', this)">🔊</button>`;
}

// ── RENDER ───────────────────────────────────────────────────────
function render() {
  const s = state;
  const cat = s.cat ? categories[s.cat] : null;
  const card = s.deck[s.pos];
  let h = "";

  h += `<header class="app-header"><div class="header-inner">`;
  h += `<button class="brand" onclick="goHome()" aria-label="Home"><span class="brand-mark">Ա</span><span class="brand-text">Armine's Western Armenian</span></button>`;
  h += `<nav class="header-nav">`;
  h += `<button class="nav-link ${s.mode === "home" ? "active" : ""}" onclick="goHome()">Learn</button>`;
  h += `<button class="nav-link ${s.mode === "search" ? "active" : ""}" onclick="state.mode='search';render()">Lookup</button>`;
  h += `<button class="nav-link ${s.mode === "alphabet" ? "active" : ""}" onclick="state.mode='alphabet';render()">Alphabet</button>`;
  h += `</nav></div></header><main class="container">`;

  // ─── HOME ───
  if (s.mode === "home") {
    const p = phraseOfDay();
    const studied = totalStudied();
    h += `<div class="anim-float">`;
    h += `<section class="hero" aria-label="Phrase of the day">`;
    h += `<div class="hero-eyebrow">Phrase of the day</div>`;
    h += `<div class="hero-armenian">${esc(p.armenian)}</div>`;
    h += `<div class="hero-row"><span class="hero-phonetic">${esc(p.phonetic)}</span>${speakerBtn(p.armenian, 24)}</div>`;
    h += `<div class="hero-english">${esc(p.english)}</div>`;
    h += `</section>`;


    h += `<div class="section-head"><h2 class="section-title">Categories</h2>`;
    h += `<span class="section-meta">${studied > 0 ? `${studied} of ${totalWords()} words studied` : `${totalWords()} words`}</span></div>`;
    h += `<div class="cat-grid">`;
    for (const [key, c] of Object.entries(categories)) {
      const n = studiedCount(key), tot = c.words.length, best = progress.best[key];
      h += `<div class="cat-card" role="button" tabindex="0" style="--cat-color:${c.color}" onclick="openCategory('${key}')" onkeydown="if(event.key==='Enter')openCategory('${key}')">`;
      h += `<div class="icon" style="background:${c.color}1A">${c.icon}</div>`;
      h += `<div class="name">${esc(c.name)}</div>`;
      h += `<div class="count">${tot} words${best ? ` · best ${best.score}/${best.total}` : ""}</div>`;
      h += `<div class="studied" aria-hidden="true"><span style="width:${(n / tot) * 100}%"></span></div>`;
      h += `</div>`;
    }
    h += `</div></div>`;
  }

  // ─── CATEGORY ───
  else if (s.mode === "category" && cat) {
    const n = studiedCount(s.cat), tot = cat.words.length, best = progress.best[s.cat];
    h += `<div class="cat-detail anim-float">`;
    h += `<div class="big-icon" style="background:${cat.color}1A">${cat.icon}</div>`;
    h += `<h2>${esc(cat.name)}</h2>`;
    h += `<p class="word-count">${tot} words · ${n} studied${best ? ` · best quiz ${best.score}/${best.total}` : ""}</p>`;
    h += `<div class="cat-buttons">`;
    h += `<button class="btn-primary" onclick="startLearn()">Start learning</button>`;
    h += `<button class="btn-secondary" onclick="startQuiz('pron')">Pronunciation quiz</button>`;
    h += `<button class="btn-secondary" onclick="startQuiz('meaning')">Meaning quiz</button>`;
    h += `</div>`;
    h += `<button class="back-link" onclick="goHome()">← All categories</button>`;
    h += `</div>`;
  }

  // ─── FLASHCARD ───
  else if (s.mode === "flashcard" && card) {
    markStudied(s.cat, card.idx);
    const hidden = s.hideTranslation && !s.revealed;
    h += `<div class="anim-slide" style="text-align:center">`;
    h += `<div class="progress-label">${esc(cat.name)} <span>${s.pos + 1} / ${s.deck.length}</span></div>`;
    h += `<div class="progress-bar"><div class="progress-fill" style="width:${((s.pos + 1) / s.deck.length) * 100}%;background:${cat.color}"></div></div>`;
    h += `<div class="toolbar">`;
    h += `<button class="toggle ${s.shuffle ? "on" : ""}" aria-pressed="${s.shuffle}" onclick="toggleShuffle()">Shuffle</button>`;
    h += `<button class="toggle ${s.hideTranslation ? "on" : ""}" aria-pressed="${s.hideTranslation}" onclick="toggleHide()">Hide translation</button>`;
    h += `</div>`;
    h += `<div class="flashcard ${hidden ? "is-hidden" : ""}" role="button" tabindex="0" onclick="cardTap()" onkeydown="if(event.key==='Enter')cardTap()">`;
    h += `<div class="icon" style="background:${cat.color}1A">${card.emoji}</div>`;
    h += `<div class="armenian">${esc(card.armenian)} ${speakerBtn(card.armenian, 22)}</div>`;
    if (hidden) {
      h += `<div class="reveal-hint">Tap to reveal</div>`;
    } else {
      h += `<div class="phonetic">${esc(card.phonetic)}</div>`;
      h += `<div class="english">${esc(card.english)}</div>`;
    }
    h += `</div>`;
    h += `<div class="card-nav">`;
    h += `<button class="btn-prev" ${s.pos === 0 ? "disabled" : ""} onclick="prevCard()">← Previous</button>`;
    h += `<button class="btn-next" ${s.pos >= s.deck.length - 1 ? "disabled" : ""} onclick="nextCard()">Next →</button>`;
    h += `</div>`;
    h += `<div class="kbd-hint">← → to move · space to listen</div>`;
    h += `<div class="card-links"><button class="back-link" onclick="state.mode='category';render()">← Back to ${esc(cat.name)}</button><a class="back-link" href="${correctionLink(card)}" target="_blank" rel="noopener">Something wrong? Suggest a fix ↗</a></div>`;
    h += `</div>`;
  }

  // ─── QUIZ ───
  else if (s.mode === "quiz" && card) {
    const key = s.quizType === "pron" ? "phonetic" : "english";
    h += `<div class="anim-pop" style="text-align:center">`;
    h += `<div class="progress-label">${s.quizType === "pron" ? "Pronunciation quiz" : "Meaning quiz"} <span>${s.pos + 1} / ${s.deck.length}</span></div>`;
    h += `<div class="progress-bar"><div class="progress-fill" style="width:${((s.pos + 1) / s.deck.length) * 100}%;background:${cat.color}"></div></div>`;
    h += `<div class="quiz-card">`;
    if (s.quizType === "pron") h += `<div class="icon" style="background:${cat.color}1A">${card.emoji}</div>`;
    h += `<div class="armenian">${esc(card.armenian)} ${speakerBtn(card.armenian, 20)}</div>`;
    if (s.quizType === "meaning") h += `<div class="quiz-phonetic">${esc(card.phonetic)}</div>`;
    h += `<p class="prompt">${s.quizType === "pron" ? "Which pronunciation is correct?" : "What does it mean?"}</p>`;
    h += `<div class="quiz-options">`;
    s.quizOptions.forEach((opt, i) => {
      const isCorrect = opt === card[key], isSel = s.selectedAnswer === opt;
      let cls = "quiz-option";
      if (s.selectedAnswer !== null) {
        cls += " answered" + (isCorrect ? " correct" : isSel ? " wrong" : " dimmed");
      }
      h += `<button class="${cls}" onclick="answer(${i})"><span class="key">${i + 1}</span>${esc(opt)}</button>`;
    });
    h += `</div></div>`;
    h += `<div class="quiz-score-badge">Score ${s.score} / ${s.pos + (s.selectedAnswer !== null ? 1 : 0)}</div>`;
    h += `</div>`;
  }

  // ─── RESULTS ───
  else if (s.mode === "results" && cat) {
    const total = s.deck.length, best = progress.best[s.cat];
    const pct = s.score / total;
    const emoji = pct === 1 ? "🎉" : pct >= 0.7 ? "🌟" : "💪";
    const msg = pct === 1 ? "Perfect" : pct >= 0.7 ? "Well done — Ապրիս!" : "Keep going";
    h += `<div class="anim-pop"><div class="results-card">`;
    h += `<div class="big-emoji">${emoji}</div>`;
    h += `<h2>${msg}</h2>`;
    h += `<div class="score">${s.score} / ${total}</div>`;
    h += `<p class="label">${esc(cat.name)} · ${s.quizType === "pron" ? "pronunciation" : "meaning"}${best ? ` · best ${best.score}/${best.total}` : ""}</p>`;
    h += `<div class="results-buttons">`;
    h += `<button class="btn-primary" onclick="startQuiz('${s.quizType}')">Try again</button>`;
    h += `<button class="btn-secondary" onclick="state.mode='category';render()">Back to ${esc(cat.name)}</button>`;
    h += `</div></div></div>`;
  }

  // ─── SEARCH ───
  else if (s.mode === "search") {
    const q = s.searchQuery.trim().toLowerCase();
    const list = allWords();
    const results = q ? list.filter(w =>
      w.english.toLowerCase().includes(q) || w.armenian.includes(s.searchQuery.trim()) || w.phonetic.toLowerCase().includes(q)
    ) : list;
    h += `<div class="anim-float">`;
    h += `<div class="page-head"><h2 class="page-title">Word lookup</h2><p class="page-desc">Search all ${totalWords()} words in English, Armenian, or phonetic spelling.</p></div>`;
    h += `<input class="search-input" type="search" placeholder="Search English, Armenian, or phonetic…" value="${esc(s.searchQuery)}" oninput="state.searchQuery=this.value;render()" autocomplete="off" />`;
    h += `<div class="search-count">${results.length} ${results.length === 1 ? "word" : "words"}</div>`;
    h += `<div class="search-results">`;
    if (!results.length) h += `<div class="no-results">No matches. Try a different spelling.</div>`;
    for (const w of results) {
      h += `<div class="search-item">`;
      h += `<span class="emoji">${w.emoji}</span>`;
      h += `<div class="info"><div class="arm-row"><span class="armenian">${esc(w.armenian)}</span>${speakerBtn(w.armenian, 16)}</div>`;
      h += `<div class="phonetic">${esc(w.phonetic)}</div><div class="english">${esc(w.english)}</div></div>`;
      h += `<span class="tag" style="background:${w.catColor}1F;color:${w.catColor}">${esc(w.category)}</span>`;
      h += `</div>`;
    }
    h += `</div></div>`;
  }

  // ─── ALPHABET ───
  else if (s.mode === "alphabet") {
    h += `<div class="anim-float">`;
    h += `<div class="page-head"><h2 class="page-title">The Armenian alphabet</h2><p class="page-desc">39 letters with Western pronunciation. Tap a letter to hear it.</p></div>`;
    h += `<div class="alpha-grid">`;
    for (const l of alphabet) {
      h += `<div class="alpha-card" role="button" tabindex="0" aria-label="${l.name}" onclick="speak('${l.upper}')" onkeydown="if(event.key==='Enter')speak('${l.upper}')">`;
      h += `<div class="letters">${l.upper} ${l.lower}</div>`;
      h += `<div class="letter-name">${l.name}</div>`;
      h += `<div class="letter-sound">${esc(l.sound)}</div>`;
      h += `</div>`;
    }
    h += `</div></div>`;
  }

  h += `</main>`;
  h += `<footer class="app-footer">Open source · <a href="${REPO}" target="_blank" rel="noopener">GitHub</a> · <a href="${correctionLink()}" target="_blank" rel="noopener">Suggest a correction</a> · Code MIT, words CC BY 4.0</footer>`;
  app.innerHTML = h;

  if (s.mode === "search") {
    const input = app.querySelector(".search-input");
    if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
  }
  try { window.scrollTo({ top: 0 }); } catch {}
}

// ── ACTIONS ──────────────────────────────────────────────────────
function goHome() {
  state.mode = "home"; state.cat = null; state.searchQuery = ""; render();
}
function openCategory(key) {
  state.cat = key; state.mode = "category"; render();
}
function startLearn() {
  buildDeck(); state.mode = "flashcard"; render();
}
function toggleShuffle() {
  state.shuffle = !state.shuffle; buildDeck(); render();
}
function toggleHide() {
  state.hideTranslation = !state.hideTranslation; state.revealed = false; render();
}
function cardTap() {
  if (state.hideTranslation && !state.revealed) { state.revealed = true; render(); return; }
  const card = state.deck[state.pos];
  if (card) speak(card.armenian, app.querySelector(".flashcard .speaker-btn"));
}
function nextCard() {
  if (state.pos < state.deck.length - 1) { state.pos++; state.revealed = false; render(); }
}
function prevCard() {
  if (state.pos > 0) { state.pos--; state.revealed = false; render(); }
}

function makeOptions(card, type) {
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
function startQuiz(type) {
  state.quizType = type;
  state.shuffle = true; buildDeck();
  state.mode = "quiz"; state.score = 0; state.selectedAnswer = null;
  state.quizOptions = makeOptions(state.deck[0], type);
  render();
}
function answer(i) {
  if (state.selectedAnswer !== null) return;
  const opt = state.quizOptions[i];
  if (opt === undefined) return;
  const card = state.deck[state.pos];
  const key = state.quizType === "pron" ? "phonetic" : "english";
  state.selectedAnswer = opt;
  if (opt === card[key]) state.score++;
  render();
  setTimeout(() => {
    if (state.pos + 1 < state.deck.length) {
      state.pos++; state.selectedAnswer = null;
      state.quizOptions = makeOptions(state.deck[state.pos], state.quizType);
    } else {
      saveBest(state.cat, state.score, state.deck.length);
      state.mode = "results";
    }
    render();
  }, 1100);
}

// ── KEYBOARD ─────────────────────────────────────────────────────
document.addEventListener("keydown", e => {
  if (e.target.tagName === "INPUT") return;
  if (state.mode === "flashcard") {
    if (e.key === "ArrowRight") nextCard();
    else if (e.key === "ArrowLeft") prevCard();
    else if (e.key === " ") { e.preventDefault(); cardTap(); }
  } else if (state.mode === "quiz" && /^[1-3]$/.test(e.key)) {
    answer(Number(e.key) - 1);
  } else if (e.key === "Escape" && state.mode !== "home") {
    goHome();
  }
});

// ── INIT ─────────────────────────────────────────────────────────
(async () => {
  try {
    const data = await loadWords();
    categories = data.categories;
    alphabet = data.alphabet;
    render();
  } catch (err) {
    console.error(err);
    app.innerHTML = `<main class="container"><div class="no-results">Couldn't load the word list (${esc(err.message)}). Refresh to try again.</div></main>`;
  }
})();
