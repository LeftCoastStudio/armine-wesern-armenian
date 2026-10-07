# Contributing

Thank you. The single most useful thing you can do is correct a word.

## The easy way: open an issue

Use the [word correction form](../../issues/new?template=word-correction.yml). Tell us the word, what is wrong, and what it should be. No account setup beyond a free GitHub login.

## The direct way: edit `words.json`

All vocabulary lives in `words.json`. You can edit it on GitHub without installing anything: open the file, click the pencil icon, make your change, and propose it as a pull request.

### Entry format

Each word is one object inside a category's `words` array:

```json
{ "armenian": "Հաւկիթ", "phonetic": "hav-GEET", "english": "egg", "emoji": "🥚" }
```

- `armenian` — the word in Armenian script.
- `phonetic` — how to say it, for an English reader. See conventions below.
- `english` — the meaning. Keep it short. Use a slash for close alternatives: `"please / you're welcome"`.
- `emoji` — one emoji. It is the only picture the app shows, so pick the clearest one.

A category looks like this:

```json
"food": {
  "name": "Food & drink",
  "icon": "🍎",
  "color": "#55915F",
  "words": [ ... ]
}
```

To add a category, add a new key with those four fields. Use a 6-digit hex color.

### Western Armenian conventions

This project is Western Armenian only. Please keep both of these:

**1. Classical (Mesrobian) orthography.** Write `Բարեւ`, not `Բարև`. Use `-ութիւն`, not `-ություն`. Use `Կապոյտ`, not `Կապույտ`. Use Western vocabulary where it differs from Eastern: `Ինքնաշարժ` (car), `Հոս` (here), `Դուն` (you), `Անոնք` (they), `Գետնախնձոր` (potato).

**2. Western pronunciation in the phonetics.** The voiced and voiceless stops are swapped relative to Eastern Armenian:

| Letter | Western sound | Example |
|---|---|---|
| Բ բ | p | Բարեւ → pah-REV |
| Պ պ | b | Պապա → BAH-bah |
| Գ գ | k | Գիրք → KEERK |
| Կ կ | g | Կատու → ga-DOO |
| Դ դ | t | Դուռ → TOOR |
| Տ տ | d | Տուն → DOON |
| Ձ ձ | ts | Ձի → TSEE |
| Ծ ծ | dz | Ծառ → DZAHR |
| Ջ ջ | ch | Ջուր → JOOR (initial ջ before ու is often j) |
| Ճ ճ | j | Ճերմակ → JER-mahg |

### Phonetic style

- Syllables separated by hyphens: `nah-bahs-DAHG`.
- Stressed syllable in CAPITALS. Western Armenian stress almost always falls on the last syllable.
- Vowels as an English reader would guess them: `ah`, `eh`, `ee`, `oh`, `oo`, `uh` for ը.
- `gh` for ղ, `kh` for խ, `ts`/`dz` as above, `zh` for ժ.

### Before you submit

- Check the word is not already in the list (search `words.json`).
- Run the file through a JSON validator, or just make sure every line you touched still has its commas and quotes.
- One pull request per topic is easier to review than one giant one.

## Everything else

Bugs, feature ideas, and questions are welcome as regular issues.
