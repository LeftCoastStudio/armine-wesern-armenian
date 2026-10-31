// Western Armenian pronunciation for a narrator that learned Eastern Armenian.
//
// ElevenLabs reads Armenian letters with Eastern sounds: բ as "b", պ as "p",
// and so on. Western Armenian swapped those pairs centuries ago. բ գ դ ձ ջ are
// the breathy voiceless sounds that Eastern spells փ ք թ ց չ, and պ կ տ ծ ճ are
// the voiced sounds that Eastern spells բ գ դ ձ ջ. So "Պետրոս" is Bedros and
// "բարեւ" is parev. We hand the narrator a respelled copy of each Armenian
// segment that makes an Eastern reader say the Western sounds, after smoothing
// the classical spellings (ոյ, եա, իւ, աւ, եւ, a silent final յ, an initial յ
// that sounds like h) that the model rarely saw. The word the learner sees
// never changes; only the text sent to the voice does.
//
// Shared with Armine Story Studio (public/pronounce.mjs); keep the two in step.

const ARMENIAN_LETTER = /[Ա-Ֆա-և]/;
const MARKS = /[՚-՟]/g;            // ՚ ՛ ՜ ՝ ՞ ՟ sit inside or after words
const VOWELS = /[աեէըիոօ]/g;
const CONSONANT = '[բգդզթժլխծկհձղճմյնշչպջռսվտրցփքֆ]';

export function hasArmenian(text) { return ARMENIAN_LETTER.test(String(text || '')); }

// Western sound of each classical letter, written the way Eastern spelling writes that sound.
const SWAP = {
  'բ': 'փ', 'պ': 'բ', 'գ': 'ք', 'կ': 'գ', 'դ': 'թ', 'տ': 'դ', 'ձ': 'ց', 'ծ': 'ձ', 'ջ': 'չ', 'ճ': 'ջ',
  'Բ': 'Փ', 'Պ': 'Բ', 'Գ': 'Ք', 'Կ': 'Գ', 'Դ': 'Թ', 'Տ': 'Դ', 'Ձ': 'Ց', 'Ծ': 'Ձ', 'Ջ': 'Չ', 'Ճ': 'Ջ'
};
// One-syllable words whose final յ is spoken (հայ, վայ); verbs like կայ and տայ drop it.
const SPOKEN_FINAL_Y = new Set(['հայ', 'վայ', 'բայ', 'ծայ', 'այ', 'նայ']);

function reformWord(run) {
  const trail = run.match(/[՚-՟]+$/)?.[0] || '';
  let w = run.slice(0, run.length - trail.length);
  const bare = w.replace(MARKS, '').toLowerCase();
  if (!bare) return run;
  // Classical initial յ before a vowel is the sound h: Յակոբ is Hagop, յետոյ is hedo.
  if (/^յ[աեէիոօ]/.test(bare)) w = w.replace(/^[Յյ]/, c => c === 'Յ' ? 'Հ' : 'հ');
  const vowels = (bare.match(VOWELS) || []).length;
  // A final յ after ա or ո is silent (տղայ is dəgha, կու տայ is gu da), except in a few short nouns.
  if (/այ$/.test(bare) && !SPOKEN_FINAL_Y.has(bare)) w = w.replace(/յ$/, '');
  else if (/ոյ$/.test(bare) && vowels > 1) w = w.replace(/յ$/, '');
  return w + trail;
}

function reformSpelling(text) {
  let t = text.replace(/[Ա-Ֆա-և՚-՟]+/g, reformWord);
  t = t.replace(/եօ/g, 'յո').replace(/Եօ/g, 'Յո');                       // եօթը → յոթը
  t = t.replace(/եա/g, 'յա').replace(/Եա/g, 'Յա');                       // սենեակ → սենյակ
  t = t.replace(new RegExp('ոյ(?=' + CONSONANT + ')', 'g'), 'ույ').replace(new RegExp('Ոյ(?=' + CONSONANT + ')', 'g'), 'Ույ'); // լոյս → լույս
  t = t.replace(/ու(?=[աեէըիոօ])/g, 'վ').replace(/Ու(?=[աեէըիոօ])/g, 'Վ');  // ու before a vowel is v: աղուէս → աղվէս, տուաւ → տվաւ
  t = t.replace(/իւ(?=[աեէըիոօ])/g, 'իվ');                                  // հիւանդ → հիվանդ
  t = t.replace(/(^|[^Ա-Ֆա-և])((?:[Հհ]ով|[Աա]ն|[Թթ]|[Աա]զն|[Շշ]նորհ))իւ/g, '$1$2իվ'); // հովիւ, անիւ, թիւ keep iv before any ending
  t = t.replace(/իւ(?![Ա-Ֆա-և])/g, 'իվ');                                   // a final իւ is iv: ազնիւ → ազնիվ
  t = t.replace(/իւ/g, 'յու').replace(/Իւ/g, 'Յու');                        // ձիւն → ձյուն, իւղ → յուղ
  t = t.replace(/աւ/g, 'ավ').replace(/Աւ/g, 'Ավ');                        // նաւ → նավ, Աւետիս → Ավետիս
  t = t.replace(/եւ/g, 'եվ').replace(/Եւ/g, 'Եվ');                        // Երեւան → Երեվան, եւ → եվ
  t = t.replace(/([Ա-Ֆա-և]?)([՚-՟]*)([ւՒ])/g, (m, prev, mark, u) => prev === 'ո' || prev === 'Ո' ? m : prev + mark + (u === 'Ւ' ? 'Վ' : 'վ')); // any stray ւ outside ու; Վո՜ւշ keeps its ու
  return t;
}

export function westernArmenianForSpeech(text) {
  if (!hasArmenian(text)) return String(text || '');
  return reformSpelling(String(text)).replace(/[բպգկդտձծջճԲՊԳԿԴՏՁԾՋՃ]/g, c => SWAP[c]);
}
