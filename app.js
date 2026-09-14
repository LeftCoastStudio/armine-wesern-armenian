// ═══════════════════════════════════════════════════════════════════
//  Armine's Western Armenian — app.js
//  Vanilla JS, no dependencies. Western Armenian (classical orthography).
// ═══════════════════════════════════════════════════════════════════

// ── VOCABULARY ───────────────────────────────────────────────────
const categories = {
  basics: {
    name: "Greetings & basics", icon: "👋", color: "#C99A3A",
    words: [
      { armenian: "Բարեւ", phonetic: "pah-REV", english: "hello", emoji: "👋" },
      { armenian: "Ցտեսութիւն", phonetic: "tsuh-deh-soo-TYOON", english: "goodbye", emoji: "🚪" },
      { armenian: "Այո", phonetic: "AH-yo", english: "yes", emoji: "✅" },
      { armenian: "Ոչ", phonetic: "VOCH", english: "no", emoji: "❌" },
      { armenian: "Շնորհակալութիւն", phonetic: "shnor-hah-gah-loo-TYOON", english: "thank you", emoji: "🙏" },
      { armenian: "Խնդրեմ", phonetic: "khunt-REM", english: "please / you're welcome", emoji: "🤝" },
      { armenian: "Ներողութիւն", phonetic: "neh-ro-ghoo-TYOON", english: "sorry / excuse me", emoji: "🙇" },
      { armenian: "Բարի լոյս", phonetic: "PAH-ree LOOYS", english: "good morning", emoji: "🌞" },
      { armenian: "Բարի իրիկուն", phonetic: "PAH-ree ee-ree-GOON", english: "good evening", emoji: "🌆" },
      { armenian: "Բարի գիշեր", phonetic: "PAH-ree kee-SHER", english: "good night", emoji: "🌙" },
      { armenian: "Ինչպէ՞ս ես", phonetic: "eench-BES es", english: "How are you?", emoji: "🙂" },
      { armenian: "Լաւ եմ", phonetic: "LAHV em", english: "I'm well", emoji: "👍" },
      { armenian: "Անունդ ի՞նչ է", phonetic: "ah-NOONT eench eh", english: "What's your name?", emoji: "🏷️" },
      { armenian: "Անունս … է", phonetic: "ah-NOONS … eh", english: "My name is …", emoji: "🙋" },
      { armenian: "Բարի եկաք", phonetic: "PAH-ree ye-GAHK", english: "welcome", emoji: "🤗" },
      { armenian: "Անուշ ըլլայ", phonetic: "ah-NOOSH ul-LAH", english: "bon appétit", emoji: "🍽️" },
      { armenian: "Շնորհաւոր", phonetic: "shnor-hah-VOR", english: "congratulations", emoji: "🎉" },
      { armenian: "Սիրուն", phonetic: "see-ROON", english: "pretty / cute", emoji: "💕" },
    ]
  },
  dailyPhrases: {
    name: "Everyday phrases", icon: "💬", color: "#8F5586",
    words: [
      { armenian: "Հոս եկուր", phonetic: "HOS ye-GOOR", english: "Come here", emoji: "👋" },
      { armenian: "Երթանք", phonetic: "yer-TAHNK", english: "Let's go", emoji: "🚶" },
      { armenian: "Սպասէ", phonetic: "suh-bah-SEH", english: "Wait", emoji: "✋" },
      { armenian: "Նայէ", phonetic: "nah-YEH", english: "Look", emoji: "👀" },
      { armenian: "Նստէ", phonetic: "nuhs-DEH", english: "Sit down", emoji: "🪑" },
      { armenian: "Զգոյշ", phonetic: "zuh-KOOYSH", english: "Careful!", emoji: "⚠️" },
      { armenian: "Հերիք է", phonetic: "heh-REEK eh", english: "That's enough", emoji: "🛑" },
      { armenian: "Ապրիս", phonetic: "ahb-REES", english: "Well done!", emoji: "🌟" },
      { armenian: "Կը սիրեմ քեզ", phonetic: "guh see-REM KEZ", english: "I love you", emoji: "❤️" },
      { armenian: "Ամէն ինչ լաւ է", phonetic: "ah-MEN eench LAHV eh", english: "Everything is fine", emoji: "👍" },
      { armenian: "Կը հասկնամ", phonetic: "guh hahs-guh-NAHM", english: "I understand", emoji: "💡" },
      { armenian: "Չեմ հասկնար", phonetic: "CHEM hahs-guh-NAHR", english: "I don't understand", emoji: "🤷" },
      { armenian: "Հայերէն կը խօսի՞ս", phonetic: "hah-yeh-REN guh kho-SEES", english: "Do you speak Armenian?", emoji: "🗣️" },
      { armenian: "Կամաց խօսէ", phonetic: "gah-MAHTS kho-SEH", english: "Speak slowly", emoji: "🐢" },
      { armenian: "Ասիկա ի՞նչ է", phonetic: "ah-see-GAH eench eh", english: "What is this?", emoji: "👉" },
      { armenian: "Ո՞ւր կ'երթաս", phonetic: "OOR ger-TAHS", english: "Where are you going?", emoji: "🧭" },
      { armenian: "Քանի՞ է", phonetic: "kah-NEE eh", english: "How much is it?", emoji: "💵" },
      { armenian: "Անօթի եմ", phonetic: "ah-no-TEE em", english: "I'm hungry", emoji: "🍽️" },
      { armenian: "Ջուր կ'ուզե՞ս", phonetic: "JOOR goo-ZES", english: "Do you want water?", emoji: "💧" },
      { armenian: "Կաթ կ'ուզե՞ս", phonetic: "GAHT goo-ZES", english: "Do you want milk?", emoji: "🥛" },
      { armenian: "Եկուր ուտենք", phonetic: "ye-GOOR oo-DENK", english: "Let's eat", emoji: "🍴" },
      { armenian: "Եկուր խաղանք", phonetic: "ye-GOOR khah-GHAHNK", english: "Let's play", emoji: "🎮" },
      { armenian: "Եկուր քնանանք", phonetic: "ye-GOOR kuh-nah-NAHNK", english: "Let's sleep", emoji: "😴" },
      { armenian: "Եկուր լոգնանք", phonetic: "ye-GOOR lok-NAHNK", english: "Let's take a bath", emoji: "🛁" },
      { armenian: "Եկուր կօշիկներդ հագնինք", phonetic: "ye-GOOR GO-sheeg-nert hahk-NEENK", english: "Let's put your shoes on", emoji: "👟" },
      { armenian: "Ո՞ւր է գնդակը", phonetic: "OOR eh kn-DAH-guh", english: "Where is the ball?", emoji: "⚽" },
      { armenian: "Բաց աչքերդ", phonetic: "PAHTS ahch-KERT", english: "Open your eyes", emoji: "👁️" },
      { armenian: "Պապան ո՞ւր է", phonetic: "BAH-bahn OOR eh", english: "Where is daddy?", emoji: "👨" },
      { armenian: "Մաման ո՞ւր է", phonetic: "MAH-mahn OOR eh", english: "Where is mommy?", emoji: "👩" },
      { armenian: "Խաղալու ժամանակն է", phonetic: "khah-ghah-LOO jah-mah-NAHGN eh", english: "It's playtime", emoji: "🎈" },
      { armenian: "Պզտիկ պատմութիւն մը պատմենք", phonetic: "buz-DEEG bahd-moo-TYOON muh bahd-MENK", english: "Let's tell a little story", emoji: "📖" },
      { armenian: "Բարի գիշեր, սիրունս", phonetic: "PAH-ree kee-SHER see-ROONS", english: "Good night, sweetie", emoji: "🌙" },
    ]
  },
  questions: {
    name: "Question words", icon: "❓", color: "#486E9C",
    words: [
      { armenian: "Ի՞նչ", phonetic: "EENCH", english: "what", emoji: "❓" },
      { armenian: "Ո՞ւր", phonetic: "OOR", english: "where", emoji: "📍" },
      { armenian: "Ո՞վ", phonetic: "OV", english: "who", emoji: "👤" },
      { armenian: "Ե՞րբ", phonetic: "YERP", english: "when", emoji: "⏰" },
      { armenian: "Ինչո՞ւ", phonetic: "een-CHOO", english: "why", emoji: "🤔" },
      { armenian: "Ինչպէ՞ս", phonetic: "eench-BES", english: "how", emoji: "🛠️" },
      { armenian: "Քանի՞", phonetic: "kah-NEE", english: "how many / how much", emoji: "🔢" },
    ]
  },
  pronouns: {
    name: "Pronouns & little words", icon: "🧩", color: "#5F7F9E",
    words: [
      { armenian: "Ես", phonetic: "YES", english: "I", emoji: "🙋" },
      { armenian: "Դուն", phonetic: "TOON", english: "you (one person)", emoji: "👉" },
      { armenian: "Ան", phonetic: "AHN", english: "he / she", emoji: "👤" },
      { armenian: "Մենք", phonetic: "MENK", english: "we", emoji: "👥" },
      { armenian: "Դուք", phonetic: "TOOK", english: "you (plural / polite)", emoji: "👥" },
      { armenian: "Անոնք", phonetic: "ah-NONK", english: "they", emoji: "👥" },
      { armenian: "Ասիկա", phonetic: "ah-see-GAH", english: "this", emoji: "☝️" },
      { armenian: "Ատիկա", phonetic: "ah-dee-GAH", english: "that (near you)", emoji: "👉" },
      { armenian: "Անիկա", phonetic: "ah-nee-GAH", english: "that (over there)", emoji: "👉" },
      { armenian: "Հոս", phonetic: "HOS", english: "here", emoji: "📍" },
      { armenian: "Հոն", phonetic: "HON", english: "there", emoji: "📍" },
      { armenian: "Եւ", phonetic: "YEV", english: "and", emoji: "➕" },
      { armenian: "Բայց", phonetic: "PAHYTS", english: "but", emoji: "↔️" },
      { armenian: "Կամ", phonetic: "GAHM", english: "or", emoji: "🔀" },
      { armenian: "Որովհետեւ", phonetic: "vo-rov-heh-DEV", english: "because", emoji: "💡" },
      { armenian: "Ալ", phonetic: "AHL", english: "also / too", emoji: "➕" },
      { armenian: "Հետ", phonetic: "HED", english: "with", emoji: "🤝" },
      { armenian: "Առանց", phonetic: "ah-RAHNTS", english: "without", emoji: "🚫" },
      { armenian: "Միայն", phonetic: "mee-AYN", english: "only", emoji: "☝️" },
    ]
  },
  verbforms: {
    name: "Useful verb forms", icon: "🔑", color: "#B2653E",
    words: [
      { armenian: "Կ'ուզեմ", phonetic: "goo-ZEM", english: "I want", emoji: "🙏" },
      { armenian: "Կը սիրեմ", phonetic: "guh see-REM", english: "I love / I like", emoji: "❤️" },
      { armenian: "Կ'երթամ", phonetic: "ger-TAHM", english: "I go", emoji: "🚶" },
      { armenian: "Կու գամ", phonetic: "goo KAHM", english: "I come", emoji: "👋" },
      { armenian: "Կ'ընեմ", phonetic: "guh-NEM", english: "I do / I make", emoji: "🛠️" },
      { armenian: "Գիտեմ", phonetic: "kee-DEM", english: "I know", emoji: "💡" },
      { armenian: "Չեմ գիտեր", phonetic: "CHEM kee-DER", english: "I don't know", emoji: "🤷" },
      { armenian: "Կրնամ", phonetic: "guhr-NAHM", english: "I can", emoji: "💪" },
      { armenian: "Չեմ կրնար", phonetic: "CHEM guhr-NAHR", english: "I can't", emoji: "🙅" },
      { armenian: "Ունիմ", phonetic: "oo-NEEM", english: "I have", emoji: "🎁" },
      { armenian: "Չունիմ", phonetic: "choo-NEEM", english: "I don't have", emoji: "🚫" },
      { armenian: "Պէտք է", phonetic: "BEDK eh", english: "must / need to", emoji: "✅" },
      { armenian: "Կ'ապրիմ", phonetic: "gahb-REEM", english: "I live", emoji: "🏠" },
      { armenian: "Կ'աշխատիմ", phonetic: "gahsh-khah-DEEM", english: "I work", emoji: "💼" },
      { armenian: "Կը խօսիմ", phonetic: "guh kho-SEEM", english: "I speak", emoji: "🗣️" },
      { armenian: "Կ'ուտեմ", phonetic: "goo-DEM", english: "I eat", emoji: "🍽️" },
      { armenian: "Կը խմեմ", phonetic: "guh khuh-MEM", english: "I drink", emoji: "🥤" },
      { armenian: "Կը մտածեմ", phonetic: "guh muh-dah-DZEM", english: "I think", emoji: "🤔" },
    ]
  },
  feelings: {
    name: "Feelings", icon: "😊", color: "#C25B72",
    words: [
      { armenian: "Ուրախ", phonetic: "oo-RAHKH", english: "happy", emoji: "😊" },
      { armenian: "Տխուր", phonetic: "duh-KHOOR", english: "sad", emoji: "😢" },
      { armenian: "Յոգնած", phonetic: "hok-NAHDZ", english: "tired", emoji: "😴" },
      { armenian: "Անօթի", phonetic: "ah-no-TEE", english: "hungry", emoji: "🍽️" },
      { armenian: "Ծարաւ", phonetic: "dzah-RAHV", english: "thirsty", emoji: "💧" },
      { armenian: "Հիւանդ", phonetic: "hee-VAHNT", english: "sick", emoji: "🤒" },
      { armenian: "Վախցած", phonetic: "vahkh-TSAHDZ", english: "scared", emoji: "😨" },
      { armenian: "Զայրացած", phonetic: "zay-rah-TSAHDZ", english: "angry", emoji: "😠" },
      { armenian: "Սիրահարուած", phonetic: "see-rah-hahr-VAHDZ", english: "in love", emoji: "😍" },
    ]
  },
  describing: {
    name: "Describing things", icon: "⚖️", color: "#8A5D9E",
    words: [
      { armenian: "Մեծ", phonetic: "MEDZ", english: "big", emoji: "🐘" },
      { armenian: "Պզտիկ", phonetic: "buz-DEEG", english: "small", emoji: "🐜" },
      { armenian: "Լաւ", phonetic: "LAHV", english: "good", emoji: "👍" },
      { armenian: "Գէշ", phonetic: "KESH", english: "bad", emoji: "👎" },
      { armenian: "Նոր", phonetic: "NOR", english: "new", emoji: "✨" },
      { armenian: "Հին", phonetic: "HEEN", english: "old", emoji: "🏺" },
      { armenian: "Գեղեցիկ", phonetic: "keh-gheh-TSEEG", english: "beautiful", emoji: "🌸" },
      { armenian: "Արագ", phonetic: "ah-RAHK", english: "fast", emoji: "🐆" },
      { armenian: "Դանդաղ", phonetic: "tahn-TAHGH", english: "slow", emoji: "🐢" },
      { armenian: "Երկար", phonetic: "yer-GAHR", english: "long", emoji: "📏" },
      { armenian: "Կարճ", phonetic: "GARCH", english: "short", emoji: "✂️" },
      { armenian: "Շատ", phonetic: "SHAHD", english: "many / very", emoji: "➕" },
      { armenian: "Քիչ", phonetic: "KEECH", english: "few / a little", emoji: "➖" },
    ]
  },
  time: {
    name: "Time & days", icon: "🕰️", color: "#41799F",
    words: [
      { armenian: "Հիմա", phonetic: "HEE-mah", english: "now", emoji: "⏱️" },
      { armenian: "Այսօր", phonetic: "ay-SOR", english: "today", emoji: "📅" },
      { armenian: "Վաղը", phonetic: "VAH-guh", english: "tomorrow", emoji: "⏭️" },
      { armenian: "Երէկ", phonetic: "yeh-REG", english: "yesterday", emoji: "⏮️" },
      { armenian: "Առտու", phonetic: "ahr-DOO", english: "morning", emoji: "🌅" },
      { armenian: "Կէսօր", phonetic: "geh-SOR", english: "noon", emoji: "☀️" },
      { armenian: "Իրիկուն", phonetic: "ee-ree-GOON", english: "evening", emoji: "🌇" },
      { armenian: "Գիշեր", phonetic: "kee-SHER", english: "night", emoji: "🌃" },
      { armenian: "Օր", phonetic: "OR", english: "day", emoji: "📆" },
      { armenian: "Շաբաթ", phonetic: "shah-PAHT", english: "week", emoji: "🗓️" },
      { armenian: "Ամիս", phonetic: "ah-MEES", english: "month", emoji: "🌙" },
      { armenian: "Տարի", phonetic: "dah-REE", english: "year", emoji: "🎆" },
      { armenian: "Ժամ", phonetic: "ZHAHM", english: "hour / time", emoji: "⏰" },
      { armenian: "Վայրկեան", phonetic: "vahyr-GYAHN", english: "minute", emoji: "⏱️" },
      { armenian: "Երկուշաբթի", phonetic: "yer-goo-shahp-TEE", english: "Monday", emoji: "📅" },
      { armenian: "Երեքշաբթի", phonetic: "yeh-rek-shahp-TEE", english: "Tuesday", emoji: "📅" },
      { armenian: "Չորեքշաբթի", phonetic: "cho-rek-shahp-TEE", english: "Wednesday", emoji: "📅" },
      { armenian: "Հինգշաբթի", phonetic: "heenk-shahp-TEE", english: "Thursday", emoji: "📅" },
      { armenian: "Ուրբաթ", phonetic: "oor-PAHT", english: "Friday", emoji: "📅" },
      { armenian: "Շաբաթ", phonetic: "shah-PAHT", english: "Saturday", emoji: "📅" },
      { armenian: "Կիրակի", phonetic: "gee-rah-GEE", english: "Sunday", emoji: "📅" },
      { armenian: "Միշտ", phonetic: "MEESHD", english: "always", emoji: "♾️" },
      { armenian: "Երբեք", phonetic: "yer-PEK", english: "never", emoji: "🚫" },
      { armenian: "Երբեմն", phonetic: "yer-PEMN", english: "sometimes", emoji: "🔁" },
      { armenian: "Կանուխ", phonetic: "gah-NOOKH", english: "early", emoji: "🌅" },
      { armenian: "Ուշ", phonetic: "OOSH", english: "late", emoji: "🌙" },
    ]
  },
  town: {
    name: "Around town", icon: "🏙️", color: "#4E8A9A",
    words: [
      { armenian: "Խանութ", phonetic: "khah-NOOT", english: "store / shop", emoji: "🛒" },
      { armenian: "Շուկայ", phonetic: "shoo-GAH", english: "market", emoji: "🧺" },
      { armenian: "Դպրոց", phonetic: "tuhb-ROTS", english: "school", emoji: "🏫" },
      { armenian: "Եկեղեցի", phonetic: "yeh-geh-gheh-TSEE", english: "church", emoji: "⛪" },
      { armenian: "Հիւանդանոց", phonetic: "hee-vahn-tah-NOTS", english: "hospital", emoji: "🏥" },
      { armenian: "Դեղարան", phonetic: "teh-ghah-RAHN", english: "pharmacy", emoji: "💊" },
      { armenian: "Ճաշարան", phonetic: "jah-shah-RAHN", english: "restaurant", emoji: "🍽️" },
      { armenian: "Սրճարան", phonetic: "suhr-jah-RAHN", english: "café", emoji: "☕" },
      { armenian: "Փողոց", phonetic: "po-GHOTS", english: "street", emoji: "🛣️" },
      { armenian: "Քաղաք", phonetic: "kah-GHAHK", english: "city", emoji: "🏙️" },
      { armenian: "Գիւղ", phonetic: "KYOOGH", english: "village", emoji: "🏡" },
      { armenian: "Պարտէզ", phonetic: "bahr-DEZ", english: "garden / park", emoji: "🌳" },
      { armenian: "Ծովափ", phonetic: "dzo-VAHP", english: "beach", emoji: "🏖️" },
      { armenian: "Օդակայան", phonetic: "o-tah-gah-YAHN", english: "airport", emoji: "✈️" },
      { armenian: "Գրասենեակ", phonetic: "kuh-rah-seh-NYAHG", english: "office", emoji: "🏢" },
      { armenian: "Դրամատուն", phonetic: "tuh-rah-mah-DOON", english: "bank", emoji: "🏦" },
      { armenian: "Գրադարան", phonetic: "kuh-rah-tah-RAHN", english: "library", emoji: "📚" },
    ]
  },
  money: {
    name: "Shopping & money", icon: "💵", color: "#6B8E4E",
    words: [
      { armenian: "Դրամ", phonetic: "tuh-RAHM", english: "money", emoji: "💵" },
      { armenian: "Գին", phonetic: "KEEN", english: "price", emoji: "🏷️" },
      { armenian: "Աժան", phonetic: "ah-ZHAHN", english: "cheap", emoji: "🪙" },
      { armenian: "Սուղ", phonetic: "SOOGH", english: "expensive", emoji: "💎" },
      { armenian: "Գնել", phonetic: "kuh-NEL", english: "to buy", emoji: "🛍️" },
      { armenian: "Ծախել", phonetic: "dzah-KHEL", english: "to sell", emoji: "🏷️" },
      { armenian: "Վճարել", phonetic: "vuh-jah-REL", english: "to pay", emoji: "💳" },
      { armenian: "Հաշիւ", phonetic: "hah-SHEEV", english: "bill / account", emoji: "🧾" },
      { armenian: "Գործ", phonetic: "KORDZ", english: "work / job", emoji: "💼" },
      { armenian: "Աշխատիլ", phonetic: "ahsh-khah-DEEL", english: "to work", emoji: "👷" },
      { armenian: "Բաց", phonetic: "PAHTS", english: "open", emoji: "🔓" },
      { armenian: "Գոց", phonetic: "KOTS", english: "closed", emoji: "🔒" },
      { armenian: "Ազատ", phonetic: "ah-ZAHD", english: "free / available", emoji: "🆓" },
      { armenian: "Նուէր", phonetic: "nuh-VER", english: "gift", emoji: "🎁" },
    ]
  },
  family: {
    name: "Family & people", icon: "👨‍👩‍👧", color: "#3F8F82",
    words: [
      { armenian: "Մամա", phonetic: "MAH-mah", english: "mom", emoji: "👩" },
      { armenian: "Պապա", phonetic: "BAH-bah", english: "dad", emoji: "👨" },
      { armenian: "Մանուկ", phonetic: "mah-NOOG", english: "baby", emoji: "👶" },
      { armenian: "Աղջիկ", phonetic: "ahkh-CHEEG", english: "girl / daughter", emoji: "👧" },
      { armenian: "Տղայ", phonetic: "duh-GHAH", english: "boy / son", emoji: "👦" },
      { armenian: "Քոյր", phonetic: "KOOYR", english: "sister", emoji: "👧" },
      { armenian: "Եղբայր", phonetic: "yegh-PAHYR", english: "brother", emoji: "👦" },
      { armenian: "Մեծմամա", phonetic: "medz-MAH-mah", english: "grandmother", emoji: "👵" },
      { armenian: "Մեծպապա", phonetic: "medz-BAH-bah", english: "grandfather", emoji: "👴" },
      { armenian: "Մօրաքոյր", phonetic: "mo-rah-KOOYR", english: "aunt (mother's sister)", emoji: "👩‍🦱" },
      { armenian: "Քեռի", phonetic: "keh-REE", english: "uncle (mother's brother)", emoji: "🧔" },
      { armenian: "Ընտանիք", phonetic: "un-dah-NEEK", english: "family", emoji: "👨‍👩‍👧" },
      { armenian: "Ամուսին", phonetic: "ah-moo-SEEN", english: "husband", emoji: "🤵" },
      { armenian: "Կին", phonetic: "GEEN", english: "wife / woman", emoji: "👩" },
      { armenian: "Մարդ", phonetic: "MAHRT", english: "man / person", emoji: "🧑" },
      { armenian: "Ընկեր", phonetic: "un-GER", english: "friend", emoji: "🫂" },
      { armenian: "Դրացի", phonetic: "tuh-rah-TSEE", english: "neighbor", emoji: "🏘️" },
    ]
  },
  food: {
    name: "Food & drink", icon: "🍎", color: "#55915F",
    words: [
      { armenian: "Ջուր", phonetic: "JOOR", english: "water", emoji: "💧" },
      { armenian: "Կաթ", phonetic: "GAHT", english: "milk", emoji: "🥛" },
      { armenian: "Սուրճ", phonetic: "SOORJ", english: "coffee", emoji: "☕" },
      { armenian: "Թէյ", phonetic: "TEY", english: "tea", emoji: "🍵" },
      { armenian: "Հաց", phonetic: "HAHTS", english: "bread", emoji: "🍞" },
      { armenian: "Լաւաշ", phonetic: "lah-VAHSH", english: "lavash", emoji: "🫓" },
      { armenian: "Պանիր", phonetic: "bah-NEER", english: "cheese", emoji: "🧀" },
      { armenian: "Մածուն", phonetic: "mah-DZOON", english: "yogurt", emoji: "🥣" },
      { armenian: "Հաւկիթ", phonetic: "hav-GEET", english: "egg", emoji: "🥚" },
      { armenian: "Միս", phonetic: "MEES", english: "meat", emoji: "🥩" },
      { armenian: "Բրինձ", phonetic: "puh-REENDZ", english: "rice", emoji: "🍚" },
      { armenian: "Ապուր", phonetic: "ah-BOOR", english: "soup", emoji: "🍲" },
      { armenian: "Խնձոր", phonetic: "khun-TSOR", english: "apple", emoji: "🍎" },
      { armenian: "Ծիրան", phonetic: "dzee-RAHN", english: "apricot", emoji: "🍑" },
      { armenian: "Նուռ", phonetic: "NOOR", english: "pomegranate", emoji: "🍒" },
      { armenian: "Խաղող", phonetic: "khah-GHOGH", english: "grapes", emoji: "🍇" },
      { armenian: "Պանան", phonetic: "bah-NAHN", english: "banana", emoji: "🍌" },
      { armenian: "Նարինջ", phonetic: "nah-REENCH", english: "orange", emoji: "🍊" },
      { armenian: "Ձմերուկ", phonetic: "tsuh-meh-ROOG", english: "watermelon", emoji: "🍉" },
      { armenian: "Լոլիկ", phonetic: "lo-LEEG", english: "tomato", emoji: "🍅" },
      { armenian: "Վարունգ", phonetic: "vah-ROONG", english: "cucumber", emoji: "🥒" },
      { armenian: "Գազար", phonetic: "kah-ZAHR", english: "carrot", emoji: "🥕" },
      { armenian: "Աղ", phonetic: "AHGH", english: "salt", emoji: "🧂" },
      { armenian: "Շաքար", phonetic: "shah-KAHR", english: "sugar", emoji: "🍬" },
      { armenian: "Գաթա", phonetic: "gah-TAH", english: "gata (sweet bread)", emoji: "🥮" },
      { armenian: "Պաղպաղակ", phonetic: "bagh-bah-GHAHG", english: "ice cream", emoji: "🍨" },
      { armenian: "Գետնախնձոր", phonetic: "ked-nah-khun-TSOR", english: "potato", emoji: "🥔" },
      { armenian: "Սոխ", phonetic: "SOKH", english: "onion", emoji: "🧅" },
      { armenian: "Սխտոր", phonetic: "suhkh-DOR", english: "garlic", emoji: "🧄" },
      { armenian: "Պղպեղ", phonetic: "buh-GHBEGH", english: "pepper", emoji: "🌶️" },
      { armenian: "Կիտրոն", phonetic: "gee-DRON", english: "lemon", emoji: "🍋" },
      { armenian: "Լուբիա", phonetic: "loo-pee-AH", english: "beans", emoji: "🫘" },
      { armenian: "Ընկոյզ", phonetic: "un-GOOYZ", english: "walnut", emoji: "🌰" },
      { armenian: "Մեղր", phonetic: "MEGHR", english: "honey", emoji: "🍯" },
      { armenian: "Կարագ", phonetic: "gah-RAHK", english: "butter", emoji: "🧈" },
      { armenian: "Ձէթ", phonetic: "TSET", english: "oil (olive oil)", emoji: "🫒" },
      { armenian: "Հիւթ", phonetic: "HYOOT", english: "juice", emoji: "🧃" },
      { armenian: "Գինի", phonetic: "kee-NEE", english: "wine", emoji: "🍷" },
      { armenian: "Գարեջուր", phonetic: "kah-reh-CHOOR", english: "beer", emoji: "🍺" },
      { armenian: "Խորոված", phonetic: "kho-ro-VAHDZ", english: "barbecue / kebab", emoji: "🍢" },
      { armenian: "Տոլմա", phonetic: "dol-MAH", english: "dolma", emoji: "🍃" },
      { armenian: "Փիլաւ", phonetic: "pee-LAHV", english: "pilaf", emoji: "🥘" },
    ]
  },
  animals: {
    name: "Animals", icon: "🐾", color: "#7D5FA8",
    words: [
      { armenian: "Շուն", phonetic: "SHOON", english: "dog", emoji: "🐕" },
      { armenian: "Կատու", phonetic: "ga-DOO", english: "cat", emoji: "🐱" },
      { armenian: "Նապաստակ", phonetic: "nah-bahs-DAHG", english: "rabbit", emoji: "🐰" },
      { armenian: "Ձի", phonetic: "TSEE", english: "horse", emoji: "🐴" },
      { armenian: "Կով", phonetic: "GOV", english: "cow", emoji: "🐄" },
      { armenian: "Ոչխար", phonetic: "voch-KHAR", english: "sheep", emoji: "🐑" },
      { armenian: "Այծ", phonetic: "AYDZ", english: "goat", emoji: "🐐" },
      { armenian: "Խոզ", phonetic: "KHOZ", english: "pig", emoji: "🐷" },
      { armenian: "Էշ", phonetic: "ESH", english: "donkey", emoji: "🫏" },
      { armenian: "Հաւ", phonetic: "HAV", english: "chicken", emoji: "🐔" },
      { armenian: "Ճուտիկ", phonetic: "joo-DEEG", english: "chick", emoji: "🐥" },
      { armenian: "Պատիկ", phonetic: "bah-DEEG", english: "duck", emoji: "🦆" },
      { armenian: "Թռչուն", phonetic: "tuhr-CHOON", english: "bird", emoji: "🐦" },
      { armenian: "Բու", phonetic: "POO", english: "owl", emoji: "🦉" },
      { armenian: "Ձուկ", phonetic: "TSOOG", english: "fish", emoji: "🐟" },
      { armenian: "Կրիա", phonetic: "guh-RYAH", english: "turtle", emoji: "🐢" },
      { armenian: "Գորտ", phonetic: "KORD", english: "frog", emoji: "🐸" },
      { armenian: "Մուկ", phonetic: "MOOG", english: "mouse", emoji: "🐭" },
      { armenian: "Մեղու", phonetic: "meh-GHOO", english: "bee", emoji: "🐝" },
      { armenian: "Թիթեռ", phonetic: "tee-TER", english: "butterfly", emoji: "🦋" },
      { armenian: "Արջ", phonetic: "AHRCH", english: "bear", emoji: "🐻" },
      { armenian: "Աղուէս", phonetic: "ah-GHVES", english: "fox", emoji: "🦊" },
      { armenian: "Առիւծ", phonetic: "ah-RYOODZ", english: "lion", emoji: "🦁" },
      { armenian: "Փիղ", phonetic: "PEEGH", english: "elephant", emoji: "🐘" },
      { armenian: "Կապիկ", phonetic: "ga-BEEG", english: "monkey", emoji: "🐒" },
      { armenian: "Վիշապ", phonetic: "vee-SHAHB", english: "dragon", emoji: "🐉" },
    ]
  },
  body: {
    name: "Body & health", icon: "🖐️", color: "#C2833B",
    words: [
      { armenian: "Գլուխ", phonetic: "kuh-LOOKH", english: "head", emoji: "👤" },
      { armenian: "Մազ", phonetic: "MAHZ", english: "hair", emoji: "💇" },
      { armenian: "Աչք", phonetic: "AHCHK", english: "eye", emoji: "👁️" },
      { armenian: "Ականջ", phonetic: "ah-GAHNCH", english: "ear", emoji: "👂" },
      { armenian: "Քիթ", phonetic: "KEET", english: "nose", emoji: "👃" },
      { armenian: "Բերան", phonetic: "peh-RAHN", english: "mouth", emoji: "👄" },
      { armenian: "Լեզու", phonetic: "leh-ZOO", english: "tongue", emoji: "👅" },
      { armenian: "Ատամ", phonetic: "ah-DAHM", english: "tooth", emoji: "🦷" },
      { armenian: "Ձեռք", phonetic: "TSERK", english: "hand", emoji: "✋" },
      { armenian: "Մատ", phonetic: "MAHD", english: "finger", emoji: "☝️" },
      { armenian: "Ուս", phonetic: "OOS", english: "shoulder", emoji: "🤷" },
      { armenian: "Փոր", phonetic: "POR", english: "belly", emoji: "🫃" },
      { armenian: "Ծունկ", phonetic: "DZOONG", english: "knee", emoji: "🦵" },
      { armenian: "Ոտք", phonetic: "VODK", english: "foot", emoji: "🦶" },
      { armenian: "Բժիշկ", phonetic: "puh-ZHEESHG", english: "doctor", emoji: "🩺" },
      { armenian: "Դեղ", phonetic: "TEGH", english: "medicine", emoji: "💊" },
      { armenian: "Ցաւ", phonetic: "TSAHV", english: "pain", emoji: "🤕" },
      { armenian: "Հարբուխ", phonetic: "hahr-POOKH", english: "a cold", emoji: "🤧" },
    ]
  },
  house: {
    name: "Home", icon: "🏠", color: "#4C8A76",
    words: [
      { armenian: "Տուն", phonetic: "DOON", english: "house", emoji: "🏠" },
      { armenian: "Դուռ", phonetic: "TOOR", english: "door", emoji: "🚪" },
      { armenian: "Բանալի", phonetic: "pah-nah-LEE", english: "key", emoji: "🔑" },
      { armenian: "Պատուհան", phonetic: "bah-doo-HAHN", english: "window", emoji: "🪟" },
      { armenian: "Խոհանոց", phonetic: "kho-hah-NOTS", english: "kitchen", emoji: "🍳" },
      { armenian: "Լոգարան", phonetic: "lo-kah-RAHN", english: "bathroom", emoji: "🛁" },
      { armenian: "Մահճակալ", phonetic: "mah-jah-GAHL", english: "bed", emoji: "🛏️" },
      { armenian: "Աթոռ", phonetic: "ah-TOR", english: "chair", emoji: "🪑" },
      { armenian: "Սեղան", phonetic: "seh-GHAHN", english: "table", emoji: "🪑" },
      { armenian: "Լամբար", phonetic: "lahm-BAHR", english: "lamp", emoji: "💡" },
      { armenian: "Գաւաթ", phonetic: "kah-VAHT", english: "cup", emoji: "☕" },
      { armenian: "Պնակ", phonetic: "buh-NAHG", english: "plate", emoji: "🍽️" },
      { armenian: "Դգալ", phonetic: "tuh-KAHL", english: "spoon", emoji: "🥄" },
      { armenian: "Դանակ", phonetic: "tah-NAHG", english: "knife", emoji: "🔪" },
      { armenian: "Հեռաձայն", phonetic: "heh-rah-TSAYN", english: "phone", emoji: "📱" },
      { armenian: "Համակարգիչ", phonetic: "hah-mah-gahr-KEECH", english: "computer", emoji: "💻" },
      { armenian: "Սառնարան", phonetic: "sahr-nah-RAHN", english: "refrigerator", emoji: "🧊" },
      { armenian: "Սանդուղք", phonetic: "sahn-TOOGHK", english: "stairs", emoji: "🪜" },
      { armenian: "Պատ", phonetic: "BAHD", english: "wall", emoji: "🧱" },
      { armenian: "Յատակ", phonetic: "hah-DAHG", english: "floor", emoji: "⬜" },
    ]
  },
  nature: {
    name: "Nature & weather", icon: "🌿", color: "#3F8F82",
    words: [
      { armenian: "Արեւ", phonetic: "ah-REV", english: "sun", emoji: "☀️" },
      { armenian: "Լուսին", phonetic: "loo-SEEN", english: "moon", emoji: "🌙" },
      { armenian: "Աստղ", phonetic: "AHSDGH", english: "star", emoji: "⭐" },
      { armenian: "Երկինք", phonetic: "yer-GEENK", english: "sky", emoji: "🌌" },
      { armenian: "Ամպ", phonetic: "AHMB", english: "cloud", emoji: "☁️" },
      { armenian: "Անձրեւ", phonetic: "ahn-TSREV", english: "rain", emoji: "🌧️" },
      { armenian: "Ձիւն", phonetic: "TSYOON", english: "snow", emoji: "❄️" },
      { armenian: "Հով", phonetic: "HOV", english: "wind", emoji: "🌬️" },
      { armenian: "Տաք", phonetic: "DAHK", english: "hot", emoji: "🔥" },
      { armenian: "Պաղ", phonetic: "BAHGH", english: "cold", emoji: "🧊" },
      { armenian: "Ծառ", phonetic: "DZAHR", english: "tree", emoji: "🌳" },
      { armenian: "Ծաղիկ", phonetic: "dzah-GHEEG", english: "flower", emoji: "🌸" },
      { armenian: "Լեռ", phonetic: "LER", english: "mountain", emoji: "⛰️" },
      { armenian: "Ծով", phonetic: "DZOV", english: "sea", emoji: "🌊" },
    ]
  },
  actions: {
    name: "Verbs", icon: "🏃", color: "#AC4F4A",
    words: [
      { armenian: "Ուտել", phonetic: "oo-DEL", english: "to eat", emoji: "🍽️" },
      { armenian: "Խմել", phonetic: "khuh-MEL", english: "to drink", emoji: "🥤" },
      { armenian: "Քնանալ", phonetic: "kuh-nah-NAHL", english: "to sleep", emoji: "😴" },
      { armenian: "Քալել", phonetic: "kah-LEL", english: "to walk", emoji: "🚶" },
      { armenian: "Վազել", phonetic: "vah-ZEL", english: "to run", emoji: "🏃" },
      { armenian: "Ցատկել", phonetic: "tsahd-GEL", english: "to jump", emoji: "🤸" },
      { armenian: "Նստիլ", phonetic: "nuhs-DEEL", english: "to sit", emoji: "🪑" },
      { armenian: "Կենալ", phonetic: "geh-NAHL", english: "to stand / stay", emoji: "🧍" },
      { armenian: "Խօսիլ", phonetic: "kho-SEEL", english: "to speak", emoji: "🗣️" },
      { armenian: "Լսել", phonetic: "luh-SEL", english: "to listen", emoji: "👂" },
      { armenian: "Նայիլ", phonetic: "nah-YEEL", english: "to look", emoji: "👀" },
      { armenian: "Կարդալ", phonetic: "gahr-TAHL", english: "to read", emoji: "📖" },
      { armenian: "Գրել", phonetic: "kuh-REL", english: "to write", emoji: "✍️" },
      { armenian: "Տալ", phonetic: "DAHL", english: "to give", emoji: "🤲" },
      { armenian: "Առնել", phonetic: "ahr-NEL", english: "to take", emoji: "🫳" },
      { armenian: "Երգել", phonetic: "yer-KEL", english: "to sing", emoji: "🎤" },
      { armenian: "Պարել", phonetic: "bah-REL", english: "to dance", emoji: "💃" },
      { armenian: "Խաղալ", phonetic: "khah-GHAHL", english: "to play", emoji: "🎮" },
    ]
  },
  colors: {
    name: "Colors", icon: "🎨", color: "#C06249",
    words: [
      { armenian: "Կարմիր", phonetic: "gar-MEER", english: "red", emoji: "🔴" },
      { armenian: "Կապոյտ", phonetic: "ga-BOYD", english: "blue", emoji: "🔵" },
      { armenian: "Դեղին", phonetic: "te-GHEEN", english: "yellow", emoji: "🟡" },
      { armenian: "Կանաչ", phonetic: "ga-NAHCH", english: "green", emoji: "🟢" },
      { armenian: "Մանիշակագոյն", phonetic: "mah-nee-shah-ga-KOYN", english: "purple", emoji: "🟣" },
      { armenian: "Վարդագոյն", phonetic: "var-ta-ka-KOYN", english: "pink", emoji: "🩷" },
      { armenian: "Նարնջագոյն", phonetic: "nahr-un-cha-KOYN", english: "orange", emoji: "🟠" },
      { armenian: "Շագանակագոյն", phonetic: "shah-kah-nah-ga-KOYN", english: "brown", emoji: "🟤" },
      { armenian: "Սեւ", phonetic: "SEV", english: "black", emoji: "⚫" },
      { armenian: "Ճերմակ", phonetic: "JER-mahg", english: "white", emoji: "⚪" },
    ]
  },
  numbers: {
    name: "Numbers", icon: "🔢", color: "#C4763C",
    words: [
      { armenian: "Մէկ", phonetic: "MEG", english: "one (1)", emoji: "1️⃣" },
      { armenian: "Երկու", phonetic: "yer-GOO", english: "two (2)", emoji: "2️⃣" },
      { armenian: "Երեք", phonetic: "ye-REK", english: "three (3)", emoji: "3️⃣" },
      { armenian: "Չորս", phonetic: "CHORS", english: "four (4)", emoji: "4️⃣" },
      { armenian: "Հինգ", phonetic: "HEENK", english: "five (5)", emoji: "5️⃣" },
      { armenian: "Վեց", phonetic: "VETS", english: "six (6)", emoji: "6️⃣" },
      { armenian: "Եօթը", phonetic: "YO-tuh", english: "seven (7)", emoji: "7️⃣" },
      { armenian: "Ութը", phonetic: "OO-tuh", english: "eight (8)", emoji: "8️⃣" },
      { armenian: "Ինը", phonetic: "EE-nuh", english: "nine (9)", emoji: "9️⃣" },
      { armenian: "Տասը", phonetic: "DAH-suh", english: "ten (10)", emoji: "🔟" },
      { armenian: "Տասնմէկ", phonetic: "dahs-nuh-MEG", english: "eleven (11)", emoji: "1️⃣1️⃣" },
      { armenian: "Տասներկու", phonetic: "dahs-ner-GOO", english: "twelve (12)", emoji: "1️⃣2️⃣" },
      { armenian: "Քսան", phonetic: "kuh-SAHN", english: "twenty (20)", emoji: "2️⃣0️⃣" },
      { armenian: "Երեսուն", phonetic: "yeh-reh-SOON", english: "thirty (30)", emoji: "3️⃣0️⃣" },
      { armenian: "Քառասուն", phonetic: "kah-rah-SOON", english: "forty (40)", emoji: "4️⃣0️⃣" },
      { armenian: "Յիսուն", phonetic: "hee-SOON", english: "fifty (50)", emoji: "5️⃣0️⃣" },
      { armenian: "Վաթսուն", phonetic: "vaht-SOON", english: "sixty (60)", emoji: "6️⃣0️⃣" },
      { armenian: "Եօթանասուն", phonetic: "yo-tah-nah-SOON", english: "seventy (70)", emoji: "7️⃣0️⃣" },
      { armenian: "Ութսուն", phonetic: "oot-SOON", english: "eighty (80)", emoji: "8️⃣0️⃣" },
      { armenian: "Իննսուն", phonetic: "een-SOON", english: "ninety (90)", emoji: "9️⃣0️⃣" },
      { armenian: "Հարիւր", phonetic: "hah-REEUR", english: "one hundred (100)", emoji: "💯" },
      { armenian: "Հազար", phonetic: "hah-ZAHR", english: "one thousand (1000)", emoji: "🔢" },
    ]
  },
  clothes: {
    name: "Clothes", icon: "👕", color: "#4A7DAD",
    words: [
      { armenian: "Շապիկ", phonetic: "shah-BEEG", english: "shirt", emoji: "👕" },
      { armenian: "Տաբատ", phonetic: "dah-BAHD", english: "pants", emoji: "👖" },
      { armenian: "Շրջազգեստ", phonetic: "shur-chahz-KEST", english: "dress", emoji: "👗" },
      { armenian: "Վերարկու", phonetic: "veh-rahr-GOO", english: "coat", emoji: "🧥" },
      { armenian: "Գլխարկ", phonetic: "kuhl-KHAHRG", english: "hat", emoji: "🧢" },
      { armenian: "Կօշիկ", phonetic: "GO-sheeg", english: "shoes", emoji: "👟" },
      { armenian: "Գուլպայ", phonetic: "KOOL-bah", english: "socks", emoji: "🧦" },
      { armenian: "Ձեռնոց", phonetic: "tser-NOTS", english: "gloves", emoji: "🧤" },
      { armenian: "Ակնոց", phonetic: "ahg-NOTS", english: "glasses", emoji: "👓" },
      { armenian: "Բաճկոն", phonetic: "pahch-GON", english: "jacket", emoji: "🧥" },
      { armenian: "Պայուսակ", phonetic: "bah-yoo-SAHG", english: "bag / purse", emoji: "👜" },
      { armenian: "Ժամացոյց", phonetic: "zhah-mah-TSOOYTS", english: "watch / clock", emoji: "⌚" },
    ]
  },
  toys: {
    name: "Toys", icon: "🧸", color: "#C25B72",
    words: [
      { armenian: "Խաղալիք", phonetic: "khah-ghah-LEEK", english: "toy", emoji: "🧸" },
      { armenian: "Գնդակ", phonetic: "kn-TAG", english: "ball", emoji: "⚽" },
      { armenian: "Տիկնիկ", phonetic: "deeg-NEEG", english: "doll", emoji: "🪆" },
      { armenian: "Գիրք", phonetic: "KEERK", english: "book", emoji: "📖" },
      { armenian: "Մատիտ", phonetic: "mah-DEED", english: "pencil / crayon", emoji: "✏️" },
      { armenian: "Խորանարդիկ", phonetic: "kho-rah-nahr-DEEG", english: "blocks", emoji: "🧱" },
      { armenian: "Փուչիկ", phonetic: "poo-CHEEG", english: "balloon", emoji: "🎈" },
    ]
  },
  transport: {
    name: "Getting around", icon: "🚗", color: "#8F5586",
    words: [
      { armenian: "Ինքնաշարժ", phonetic: "eenk-nah-SHAHRJ", english: "car", emoji: "🚗" },
      { armenian: "Հանրակառք", phonetic: "hahn-rah-GAHRK", english: "bus", emoji: "🚌" },
      { armenian: "Հրշէջ ինքնաշարժ", phonetic: "hur-SHECH eenk-nah-SHAHRJ", english: "fire truck", emoji: "🚒" },
      { armenian: "Գնացք", phonetic: "kuh-NAHTSK", english: "train", emoji: "🚂" },
      { armenian: "Օդանաւ", phonetic: "o-tah-NAHV", english: "airplane", emoji: "✈️" },
      { armenian: "Նաւակ", phonetic: "nah-VAHG", english: "boat", emoji: "⛵" },
      { armenian: "Հեծանիւ", phonetic: "heh-dzah-NEEV", english: "bicycle", emoji: "🚲" },
    ]
  },
  shapes: {
    name: "Shapes", icon: "🔷", color: "#486E9C",
    words: [
      { armenian: "Շրջանակ", phonetic: "shur-chah-NAHG", english: "circle", emoji: "🔵" },
      { armenian: "Քառակուսի", phonetic: "kah-rah-goo-SEE", english: "square", emoji: "🟥" },
      { armenian: "Եռանկիւն", phonetic: "yeh-rahn-GYOON", english: "triangle", emoji: "🔺" },
      { armenian: "Աստղ", phonetic: "AHSDGH", english: "star", emoji: "⭐" },
      { armenian: "Սիրտ", phonetic: "SEERD", english: "heart", emoji: "❤️" },
    ]
  },
};

// ── ALPHABET (39 letters) ─────────────────────────────────────────
const alphabet = [
  ["Ա","ա","ayp","ah"],["Բ","բ","pen","p"],["Գ","գ","kim","k"],["Դ","դ","ta","t"],
  ["Ե","ե","yech","ye / e"],["Զ","զ","za","z"],["Է","է","eh","eh"],["Ը","ը","ut","uh"],
  ["Թ","թ","to","t"],["Ժ","ժ","zhe","zh"],["Ի","ի","ini","ee"],["Լ","լ","lyun","l"],
  ["Խ","խ","khe","kh"],["Ծ","ծ","dza","dz"],["Կ","կ","gen","g"],["Հ","հ","ho","h"],
  ["Ձ","ձ","tsa","ts"],["Ղ","ղ","ghat","gh"],["Ճ","ճ","je","j"],["Մ","մ","men","m"],
  ["Յ","յ","hi","h / y"],["Ն","ն","nu","n"],["Շ","շ","sha","sh"],["Ո","ո","vo","vo / o"],
  ["Չ","չ","cha","ch"],["Պ","պ","be","b"],["Ջ","ջ","che","ch"],["Ռ","ռ","ra","rr"],
  ["Ս","ս","se","s"],["Վ","վ","vev","v"],["Տ","տ","dyun","d"],["Ր","ր","re","r"],
  ["Ց","ց","tso","ts"],["Ւ","ւ","hyun","v / oo"],["Փ","փ","pyur","p"],["Ք","ք","ke","k"],
  ["Օ","օ","o","o"],["Ֆ","ֆ","fe","f"],["ԵՒ","եւ","yev","yev"],
].map(([upper, lower, name, sound]) => ({ upper, lower, name, sound }));

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
    h += `<button class="back-link" onclick="state.mode='category';render()">← Back to ${esc(cat.name)}</button>`;
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
render();
