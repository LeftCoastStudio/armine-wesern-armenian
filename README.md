# Armine's Western Armenian

A free, open-source Western Armenian vocabulary trainer. No account, no app store, no ads.

**Live:** https://armine-western-armenian.netlify.app

Western Armenian (Արեւմտահայերէն) is spoken across the Armenian diaspora and is classified as endangered by UNESCO. Most learning tools teach Eastern Armenian. This one is Western only: classical (Mesrobian) orthography and Western pronunciation throughout.

## What it does

- **391 words and phrases in 23 categories** — greetings, everyday phrases, pronouns, verb forms, question words, feelings, time and days, around town, shopping and money, family, food, animals, body and health, home, nature, verbs, colors, numbers, clothes, toys, getting around, shapes.
- **Flashcards** with shuffle and a hide-translation mode for recall practice.
- **Two quiz modes:** pronunciation (pick the right phonetic) and meaning (pick the right English). Wrong answers come from the same category, so they are hard.
- **Word lookup** across English, Armenian, and phonetic spelling.
- **The 39-letter alphabet** with Western letter names and sounds.
- **Audio** for every word via ElevenLabs text-to-speech (see below).
- **Progress** saved in the browser: words studied per category and best quiz scores.
- Keyboard shortcuts: arrow keys to move, space to listen, 1/2/3 to answer, Esc for home.

## Run it yourself

The app is three static files plus a word list. There is no build step.

```
index.html     page shell
styles.css     styling
app.js         app logic
words.json     every word, phrase, and letter  ← edit this to change vocabulary
netlify/functions/tts.mjs   optional serverless proxy for ElevenLabs audio
```

Serve the folder with any static server (for example `npx serve .`) and open it. Opening `index.html` directly from disk will not work because the browser blocks loading `words.json` from `file://`.

### Audio (optional)

Pronunciation audio comes from ElevenLabs through a small Netlify Function so the API key never reaches the browser. To enable it on your own deployment:

1. Create an ElevenLabs API key with **Text to Speech** access.
2. Set it as the environment variable `ELEVENLABS_API_KEY` on your host.
3. Deploy with the `netlify/functions` folder included (any host that runs Netlify-style functions works).

Without a key, the app runs normally and shows a short "audio unavailable" message when you tap a speaker.

The function uses the Eleven v3 model, which supports Armenian. Recorded audio from native speakers is the long-term plan.

## Contributing

Corrections from native Western Armenian speakers are the most valuable contribution this project can receive. Every word was checked, but mistakes remain.

- **Spotted a wrong word, spelling, or pronunciation?** Open a [word correction](../../issues/new?template=word-correction.yml). It takes a minute and needs no technical knowledge.
- **Want to add or fix words directly?** Edit `words.json` and open a pull request. See [CONTRIBUTING.md](CONTRIBUTING.md) for the entry format and the orthography and phonetic conventions.

## License

- Code: [MIT](LICENSE)
- Vocabulary (`words.json`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Reuse it in your own classroom, app, or deck; credit this project.

Built by [Jason Garrett](https://github.com/LeftCoastStudio) for his daughter, with corrections from family.
