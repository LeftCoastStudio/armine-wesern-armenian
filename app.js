// ═══════════════════════════════════════════════════════════════════
//  Armine's Western Armenian — app.js
//  Pure vanilla JS, no dependencies
// ═══════════════════════════════════════════════════════════════════

// ── VOCABULARY DATABASE ──────────────────────────────────────────
const categories = {
  colors: {
    name: "Colors", icon: "\uD83C\uDFA8", color: "#E85D75", bg: "#FFF0F2",
    words: [
      { armenian: "\u053F\u0561\u0580\u0574\u056B\u0580", phonetic: "gar-MEER", english: "red", emoji: "\uD83D\uDD34" },
      { armenian: "\u053F\u0561\u057A\u0578\u0575\u057F", phonetic: "ga-BOYD", english: "blue", emoji: "\uD83D\uDD35" },
      { armenian: "\u0534\u0565\u0572\u056B\u0576", phonetic: "te-GHEEN", english: "yellow", emoji: "\uD83D\uDFE1" },
      { armenian: "\u053F\u0561\u0576\u0561\u0579", phonetic: "ga-NAHCH", english: "green", emoji: "\uD83D\uDFE2" },
      { armenian: "\u0544\u0561\u0576\u056B\u0577\u0561\u056F\u0561\u0563\u0578\u0575\u0576", phonetic: "mah-nee-shah-ga-KOYN", english: "purple", emoji: "\uD83D\uDFE3" },
      { armenian: "\u054E\u0561\u0580\u0564\u0561\u0563\u0578\u0575\u0576", phonetic: "var-da-ga-KOYN", english: "pink", emoji: "\uD83E\uDE77" },
      { armenian: "\u054D\u0587", phonetic: "SEV", english: "black", emoji: "\u26AB" },
      { armenian: "\u054B\u0565\u0580\u0574\u0561\u056F", phonetic: "JEHR-mahg", english: "white", emoji: "\u26AA" },
      { armenian: "\u0546\u0561\u0580\u056B\u0576\u0573\u0561\u0563\u0578\u0575\u0576", phonetic: "nah-rinch-a-ga-KOYN", english: "orange", emoji: "\uD83D\uDFE0" },
      { armenian: "\u0547\u0561\u0563\u0561\u0563\u0578\u0575\u0576", phonetic: "shah-ga-ga-KOYN", english: "brown", emoji: "\uD83D\uDFE4" },
    ]
  },
  animals: {
    name: "Animals", icon: "\uD83D\uDC3E", color: "#7C5CBF", bg: "#F3EEFF",
    words: [
      { armenian: "\u0547\u0578\u0582\u0576", phonetic: "SHOON", english: "dog", emoji: "\uD83D\uDC15" },
      { armenian: "\u053F\u0561\u057F\u0578\u0582", phonetic: "ga-DOO", english: "cat", emoji: "\uD83D\uDC31" },
      { armenian: "\u0546\u0561\u057A\u0561\u057D\u057F\u0561\u056F", phonetic: "nah-bahs-DAHG", english: "rabbit", emoji: "\uD83D\uDC30" },
      { armenian: "\u0553\u056B\u0572", phonetic: "PEEGH", english: "elephant", emoji: "\uD83D\uDC18" },
      { armenian: "\u0531\u057C\u056B\u0582\u056E", phonetic: "ah-RYOODZ", english: "lion", emoji: "\uD83E\uDD81" },
      { armenian: "\u053F\u0561\u057A\u056B\u056F", phonetic: "ga-BEEG", english: "monkey", emoji: "\uD83D\uDC12" },
      { armenian: "\u0541\u056B", phonetic: "TSEE", english: "horse", emoji: "\uD83D\uDC34" },
      { armenian: "\u053F\u0578\u057E", phonetic: "GOV", english: "cow", emoji: "\uD83D\uDC04" },
      { armenian: "\u0540\u0561\u057E", phonetic: "HAV", english: "chicken", emoji: "\uD83D\uDC14" },
      { armenian: "\u0539\u0580\u0579\u0578\u0582\u0576", phonetic: "tehr-CHOON", english: "bird", emoji: "\uD83D\uDC26" },
      { armenian: "\u0541\u0578\u0582\u056F", phonetic: "TSOOG", english: "fish", emoji: "\uD83D\uDC1F" },
      { armenian: "\u053F\u0580\u056B\u0561", phonetic: "geh-RYAH", english: "turtle", emoji: "\uD83D\uDC22" },
      { armenian: "\u0533\u0578\u0580\u057F", phonetic: "KORD", english: "frog", emoji: "\uD83D\uDC38" },
      { armenian: "\u0531\u0580\u057B", phonetic: "AHRDCH", english: "bear", emoji: "\uD83D\uDC3B" },
      { armenian: "\u0531\u0572\u0578\u0582\u0567\u057D", phonetic: "ah-ghoo-YES", english: "fox", emoji: "\uD83E\uDD8A" },
      { armenian: "\u054A\u0561\u057F\u056B\u056F", phonetic: "bah-DEEG", english: "duck", emoji: "\uD83E\uDD86" },
      { armenian: "\u054B\u0578\u0582\u057F\u056B\u056F", phonetic: "joo-DEEG", english: "chick", emoji: "\uD83D\uDC25" },
      { armenian: "\u054E\u056B\u0577\u0561\u057A", phonetic: "vee-SHAHP", english: "dragon", emoji: "\uD83D\uDC09" },
      { armenian: "\u0537\u0577", phonetic: "ESH", english: "donkey", emoji: "\uD83E\uDD93" },
      { armenian: "\u0548\u0579\u056D\u0561\u0580", phonetic: "voch-KHAR", english: "sheep", emoji: "\uD83D\uDC11" },
      { armenian: "\u0532\u0578\u0582", phonetic: "POO", english: "owl", emoji: "\uD83E\uDD89" },
    ]
  },
  family: {
    name: "Family", icon: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67", color: "#2E86AB", bg: "#E8F4FD",
    words: [
      { armenian: "\u0544\u0561\u0574\u0561", phonetic: "MAH-mah", english: "mother/mom", emoji: "\uD83D\uDC69" },
      { armenian: "\u054A\u0561\u057A\u0561", phonetic: "BAH-bah", english: "father/dad", emoji: "\uD83D\uDC68" },
      { armenian: "\u0544\u0561\u0576\u0578\u0582\u056F", phonetic: "mah-NOOG", english: "baby", emoji: "\uD83D\uDC76" },
      { armenian: "\u0554\u0578\u0575\u0580", phonetic: "KUYR", english: "sister", emoji: "\uD83D\uDC67" },
      { armenian: "\u0535\u0572\u0562\u0561\u0575\u0580", phonetic: "yegh-PAHR", english: "brother", emoji: "\uD83D\uDC66" },
      { armenian: "\u0544\u0565\u056E\u0574\u0561\u0574\u0561", phonetic: "medz-MAH-mah", english: "grandmother", emoji: "\uD83D\uDC75" },
      { armenian: "\u0544\u0565\u056E\u057A\u0561\u057A\u0561", phonetic: "medz-BAH-bah", english: "grandfather", emoji: "\uD83D\uDC74" },
      { armenian: "\u0538\u0576\u057F\u0561\u0576\u056B\u0584", phonetic: "un-dah-NEEK", english: "family", emoji: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67" },
    ]
  },
  bodyParts: {
    name: "Body Parts", icon: "\uD83D\uDD90\uFE0F", color: "#F18F01", bg: "#FFF5E6",
    words: [
      { armenian: "\u0531\u0579\u0584", phonetic: "AHCHK", english: "eye", emoji: "\uD83D\uDC41\uFE0F" },
      { armenian: "\u0554\u056B\u0569", phonetic: "KEET", english: "nose", emoji: "\uD83D\uDC43" },
      { armenian: "\u0532\u0565\u0580\u0561\u0576", phonetic: "peh-RAHN", english: "mouth", emoji: "\uD83D\uDC44" },
      { armenian: "\u0541\u0565\u057C\u0584", phonetic: "TSEHRK", english: "hand", emoji: "\u270B" },
      { armenian: "\u0548\u057F\u0584", phonetic: "VODK", english: "foot", emoji: "\uD83E\uDDB6" },
      { armenian: "\u0533\u056C\u0578\u0582\u056D", phonetic: "KULOOKH", english: "head", emoji: "\uD83D\uDC64" },
      { armenian: "\u0544\u0561\u0566", phonetic: "MAHZ", english: "hair", emoji: "\uD83D\uDC87" },
      { armenian: "\u0531\u056F\u0561\u0576\u057B", phonetic: "ah-GAHNCH", english: "ear", emoji: "\uD83D\uDC42" },
      { armenian: "\u0531\u057F\u0561\u0574", phonetic: "ah-DAHM", english: "tooth", emoji: "\uD83E\uDDB7" },
      { armenian: "\u0553\u0578\u0580", phonetic: "POR", english: "tummy", emoji: "\uD83E\uDEBB" },
    ]
  },
  food: {
    name: "Food", icon: "\uD83C\uDF4E", color: "#2ECC71", bg: "#EAFAF1",
    words: [
      { armenian: "\u054B\u0578\u0582\u0580", phonetic: "JOOR", english: "water", emoji: "\uD83D\uDCA7" },
      { armenian: "\u053F\u0561\u0569", phonetic: "GAHT", english: "milk", emoji: "\uD83E\uDD5B" },
      { armenian: "\u053D\u0576\u0571\u0578\u0580", phonetic: "KHNDZOR", english: "apple", emoji: "\uD83C\uDF4E" },
      { armenian: "\u054A\u0561\u0576\u0561\u0576", phonetic: "bah-NAHN", english: "banana", emoji: "\uD83C\uDF4C" },
      { armenian: "\u0540\u0561\u0581", phonetic: "HAHTS", english: "bread", emoji: "\uD83C\uDF5E" },
      { armenian: "\u054A\u0561\u0576\u056B\u0580", phonetic: "bah-NEER", english: "cheese", emoji: "\uD83E\uDDC0" },
      { armenian: "\u054A\u0561\u0572\u057A\u0561\u0572\u0561\u056F", phonetic: "bagh-bah-GHAHK", english: "ice cream", emoji: "\uD83C\uDF68" },
      { armenian: "\u0541\u0578\u0582\u0576\u0564", phonetic: "hav-GEET", english: "egg", emoji: "\uD83E\uDD5A" },
      { armenian: "\u0531\u057A\u0578\u0582\u0580", phonetic: "ah-BOOR", english: "soup", emoji: "\uD83C\uDF72" },
      { armenian: "\u0539\u0578\u057E\u0561\u056C\u056B\u056F", phonetic: "toh-vah-LEEG", english: "cookie", emoji: "\uD83C\uDF6A" },
      { armenian: "\u0533\u0561\u0566\u0561\u0580", phonetic: "gah-ZAHR", english: "carrot", emoji: "\uD83E\uDD55" },
    ]
  },
  basics: {
    name: "Basics", icon: "\u2B50", color: "#F39C12", bg: "#FEF9E7",
    words: [
      { armenian: "\u0531\u0575\u0578", phonetic: "AH-yo", english: "yes", emoji: "\u2705" },
      { armenian: "\u0548\u0579", phonetic: "VOCH", english: "no", emoji: "\u274C" },
      { armenian: "\u0532\u0561\u0580\u0587", phonetic: "pah-REV", english: "hello", emoji: "\uD83D\uDC4B" },
      { armenian: "\u0551\u057F\u0565\u057D\u0578\u0582\u0569\u056B\u0582\u0576", phonetic: "tse-deh-SOO-tyoon", english: "goodbye", emoji: "\uD83D\uDC4B" },
      { armenian: "\u0547\u0576\u0578\u0580\u0570\u0561\u056F\u0561\u056C\u0578\u0582\u0569\u056B\u0582\u0576", phonetic: "shnor-hah-gah-loo-TYOON", english: "thank you", emoji: "\uD83D\uDE4F" },
      { armenian: "\u054D\u056B\u0580\u0578\u0582\u0576", phonetic: "see-ROON", english: "love/cute", emoji: "\u2764\uFE0F" },
      { armenian: "\u0532\u0561\u0580\u056B \u0561\u057C\u0561\u0582\u0578\u057F", phonetic: "PAH-ree ah-rah-VOD", english: "good morning", emoji: "\uD83C\uDF1E" },
      { armenian: "\u053D\u0576\u0564\u0580\u0565\u0574", phonetic: "KUNT-rehm", english: "please", emoji: "\uD83D\uDE4F" },
      { armenian: "\u0532\u0561\u0580\u056B \u0563\u056B\u0577\u0565\u0580", phonetic: "PAH-ree kee-SHER", english: "good night", emoji: "\uD83C\uDF19" },
    ]
  },
  toys: {
    name: "Toys", icon: "\uD83E\uDDF8", color: "#E74C3C", bg: "#FDEDEC",
    words: [
      { armenian: "\u053D\u0561\u0572\u0561\u056C\u056B\u0584", phonetic: "khah-ghah-LEEK", english: "toy", emoji: "\uD83E\uDDF8" },
      { armenian: "\u0533\u0576\u0564\u0561\u056F", phonetic: "kn-TAG", english: "ball", emoji: "\u26BD" },
      { armenian: "\u054F\u056B\u056F\u0576\u056B\u056F", phonetic: "deeg-NEEG", english: "doll", emoji: "\uD83E\uDE86" },
      { armenian: "\u0533\u056B\u0580\u0584", phonetic: "KEERK", english: "book", emoji: "\uD83D\uDCD6" },
      { armenian: "\u0544\u0561\u057F\u056B\u057F", phonetic: "mah-DEED", english: "crayon", emoji: "\uD83D\uDD8D\uFE0F" },
      { armenian: "\u053D\u0578\u0580\u0561\u0576\u0561\u0580\u0564\u056B\u056F", phonetic: "kho-rah-nahr-DEEG", english: "blocks", emoji: "\uD83E\uDDF1" },
      { armenian: "\u053B\u0576\u0584\u0576\u0561\u0577\u0561\u0580\u056A", phonetic: "eenk-nah-SHAHRJ", english: "car (toy)", emoji: "\uD83D\uDE97" },
      { armenian: "\u0553\u0578\u0582\u0579\u056B\u056F", phonetic: "poo-CHEEG", english: "balloon", emoji: "\uD83C\uDF88" },
    ]
  },
  nature: {
    name: "Nature", icon: "\uD83C\uDF38", color: "#1ABC9C", bg: "#E8F8F5",
    words: [
      { armenian: "\u0531\u0580\u0587", phonetic: "ah-REV", english: "sun", emoji: "\u2600\uFE0F" },
      { armenian: "\u053C\u0578\u0582\u057D\u056B\u0576", phonetic: "loo-SEEN", english: "moon", emoji: "\uD83C\uDF19" },
      { armenian: "\u0531\u057D\u057F\u0572", phonetic: "ahst-GH", english: "star", emoji: "\u2B50" },
      { armenian: "\u0531\u0574\u057A", phonetic: "AHMP", english: "cloud", emoji: "\u2601\uFE0F" },
      { armenian: "\u0531\u0576\u0571\u0587", phonetic: "ahn-DZEV", english: "rain", emoji: "\uD83C\uDF27\uFE0F" },
      { armenian: "\u053E\u0561\u057C", phonetic: "DZAHR", english: "tree", emoji: "\uD83C\uDF33" },
      { armenian: "\u053E\u0561\u0572\u056B\u056F", phonetic: "dzah-GHEEK", english: "flower", emoji: "\uD83C\uDF3B" },
      { armenian: "\u054B\u0578\u0582\u0580", phonetic: "JOOR", english: "water", emoji: "\uD83C\uDF0A" },
      { armenian: "\u0541\u056B\u0582\u0576", phonetic: "TSYOON", english: "snow", emoji: "\u2744\uFE0F" },
    ]
  },
  actions: {
    name: "Actions", icon: "\uD83C\uDFC3", color: "#9B59B6", bg: "#F4ECF7",
    words: [
      { armenian: "\u054E\u0561\u0566\u0565\u056C", phonetic: "vah-ZEL", english: "run", emoji: "\uD83C\uDFC3" },
      { armenian: "\u0554\u0561\u056C\u0565\u056C", phonetic: "kah-LEL", english: "walk", emoji: "\uD83D\uDEB6" },
      { armenian: "\u0551\u0561\u057F\u056F\u0565\u056C", phonetic: "tsahd-GEL", english: "jump", emoji: "\uD83E\uDD38" },
      { armenian: "\u054A\u0561\u0580\u0565\u056C", phonetic: "bah-REL", english: "dance", emoji: "\uD83D\uDC83" },
      { armenian: "\u0535\u0580\u0563\u0565\u056C", phonetic: "yer-KEL", english: "sing", emoji: "\uD83C\uDFA4" },
      { armenian: "\u0548\u0582\u057F\u0565\u056C", phonetic: "oo-DEL", english: "eat", emoji: "\uD83C\uDF7D\uFE0F" },
      { armenian: "\u053D\u0574\u0565\u056C", phonetic: "khuh-MEL", english: "drink", emoji: "\uD83E\uDD64" },
      { armenian: "\u0554\u0576\u0565\u056C", phonetic: "kuh-NEL", english: "sleep", emoji: "\uD83D\uDE34" },
      { armenian: "\u053D\u0561\u0572\u0561\u056C", phonetic: "khah-GHAHL", english: "play", emoji: "\uD83C\uDFAE" },
    ]
  },
  clothes: {
    name: "Clothes", icon: "\uD83D\uDC55", color: "#3498DB", bg: "#EBF5FB",
    words: [
      { armenian: "\u0547\u0561\u057A\u056B\u056F", phonetic: "shah-BEEG", english: "shirt", emoji: "\uD83D\uDC55" },
      { armenian: "\u054E\u0565\u0580\u0561\u0580\u056F\u0578\u0582", phonetic: "veh-rahr-GOO", english: "jacket", emoji: "\uD83E\uDDE5" },
      { armenian: "\u0533\u056C\u056D\u0561\u0580\u056F", phonetic: "kul-KHAHRG", english: "hat", emoji: "\uD83E\uDDE2" },
      { armenian: "\u053F\u0585\u0577\u056B\u056F", phonetic: "GO-sheeg", english: "shoes", emoji: "\uD83D\uDC5F" },
      { armenian: "\u0533\u0578\u0582\u056C\u057A\u0561", phonetic: "KOOL-bah", english: "socks", emoji: "\uD83E\uDDE6" },
      { armenian: "\u054F\u0561\u0562\u0561\u057F", phonetic: "dah-BAHD", english: "pants", emoji: "\uD83D\uDC56" },
      { armenian: "\u0547\u0578\u0580", phonetic: "SHOR", english: "dress", emoji: "\uD83D\uDC57" },
    ]
  },
  numbers: {
    name: "Numbers", icon: "\uD83D\uDD22", color: "#E67E22", bg: "#FDF2E9",
    words: [
      { armenian: "\u0544\u0567\u056F", phonetic: "MEG", english: "one (1)", emoji: "1\uFE0F\u20E3" },
      { armenian: "\u0535\u0580\u056F\u0578\u0582", phonetic: "yer-GOO", english: "two (2)", emoji: "2\uFE0F\u20E3" },
      { armenian: "\u0535\u0580\u0565\u0584", phonetic: "ye-REK", english: "three (3)", emoji: "3\uFE0F\u20E3" },
      { armenian: "\u0549\u0578\u0580\u057D", phonetic: "CHORS", english: "four (4)", emoji: "4\uFE0F\u20E3" },
      { armenian: "\u0540\u056B\u0576\u0563", phonetic: "HEENG", english: "five (5)", emoji: "5\uFE0F\u20E3" },
      { armenian: "\u054E\u0565\u0581", phonetic: "VETS", english: "six (6)", emoji: "6\uFE0F\u20E3" },
      { armenian: "\u0535\u0578\u0569", phonetic: "YOT", english: "seven (7)", emoji: "7\uFE0F\u20E3" },
      { armenian: "\u0548\u0582\u0569", phonetic: "OOT", english: "eight (8)", emoji: "8\uFE0F\u20E3" },
      { armenian: "\u053B\u0576\u0568", phonetic: "EE-nuh", english: "nine (9)", emoji: "9\uFE0F\u20E3" },
      { armenian: "\u054F\u0561\u057D\u0568", phonetic: "DAH-suh", english: "ten (10)", emoji: "\uD83D\uDD1F" },
    ]
  },
  shapes: {
    name: "Shapes", icon: "\uD83D\uDD37", color: "#2980B9", bg: "#EAF2F8",
    words: [
      { armenian: "\u0547\u0580\u057B\u0561\u0576\u0561\u056F", phonetic: "shur-jah-NAHG", english: "circle", emoji: "\uD83D\uDD35" },
      { armenian: "\u0554\u0561\u057C\u0561\u056F\u0578\u0582\u057D\u056B", phonetic: "kah-rah-goo-SEE", english: "square", emoji: "\uD83D\uDFE5" },
      { armenian: "\u0535\u057C\u0561\u0576\u056F\u056B\u0582\u0576", phonetic: "yeh-rahn-GYOON", english: "triangle", emoji: "\uD83D\uDD3A" },
      { armenian: "\u0531\u057D\u057F\u0572", phonetic: "AHST-gh", english: "star", emoji: "\u2B50" },
      { armenian: "\u054D\u056B\u0580\u057F", phonetic: "SEERT", english: "heart", emoji: "\u2764\uFE0F" },
    ]
  },
  house: {
    name: "House", icon: "\uD83C\uDFE0", color: "#16A085", bg: "#E8F6F3",
    words: [
      { armenian: "\u054F\u0578\u0582\u0576", phonetic: "DOON", english: "house", emoji: "\uD83C\uDFE0" },
      { armenian: "\u0534\u0578\u0582\u057C", phonetic: "TOOR", english: "door", emoji: "\uD83D\uDEAA" },
      { armenian: "\u054A\u0561\u057F\u0578\u0582\u0570\u0561\u0576", phonetic: "bah-doo-HAHN", english: "window", emoji: "\uD83E\uDE9F" },
      { armenian: "\u0544\u0561\u0570\u0573\u0561\u056F\u0561\u056C", phonetic: "mah-hah-gah-GAHL", english: "bed", emoji: "\uD83D\uDECF\uFE0F" },
      { armenian: "\u0531\u0569\u0578\u057C", phonetic: "ah-TOR", english: "chair", emoji: "\uD83E\uDE91" },
      { armenian: "\u054D\u0565\u0572\u0561\u0576", phonetic: "seh-GHAHN", english: "table", emoji: "\uD83E\uDE91" },
      { armenian: "\u053C\u0561\u0574\u057A\u0561\u0580", phonetic: "lahm-BAHR", english: "lamp", emoji: "\uD83D\uDCA1" },
    ]
  },
  transport: {
    name: "Transport", icon: "\uD83D\uDE97", color: "#C0392B", bg: "#FDEDEC",
    words: [
      { armenian: "\u053B\u0576\u0584\u0576\u0561\u0577\u0561\u0580\u056A", phonetic: "eenk-nah-SHAHRJ", english: "car", emoji: "\uD83D\uDE97" },
      { armenian: "\u0540\u0561\u0576\u0580\u0561\u056F\u0561\u057C\u0584", phonetic: "hahn-rah-KAHRK", english: "bus", emoji: "\uD83D\uDE8C" },
      { armenian: "\u053F\u0561\u0569\u057D\u0561", phonetic: "kah-TSA", english: "train", emoji: "\uD83D\uDE82" },
      { armenian: "\u0555\u0564\u0561\u0576\u0561\u057E", phonetic: "oh-tah-NAHV", english: "airplane", emoji: "\u2708\uFE0F" },
      { armenian: "\u0546\u0561\u057E\u0561\u056F", phonetic: "nah-VAHG", english: "boat", emoji: "\u26F5" },
      { armenian: "\u0540\u0565\u056E\u0561\u0576\u056B\u057E", phonetic: "heh-tsah-NEEV", english: "bicycle", emoji: "\uD83D\uDEB2" },
    ]
  },
  dailyPhrases: {
    name: "Daily Phrases", icon: "\uD83D\uDCAC", color: "#8E44AD", bg: "#F5EEF8",
    words: [
      { armenian: "\u0535\u056F\u0578\u0582\u0580 \u056F\u0585\u0577\u056B\u056F\u0576\u0565\u0580\u0564 \u0570\u0561\u0563\u0576\u056B\u0576\u0584", phonetic: "ye-GOOR GO-sheeg-nert hahg-NEENK", english: "Let's put your shoes on", emoji: "\uD83D\uDC5F" },
      { armenian: "\u0548\u0582\u0580 \u0567 \u0563\u0576\u0564\u0561\u056F\u0568", phonetic: "OOR eh kn-DAH-guh", english: "Where is the ball?", emoji: "\u26BD" },
      { armenian: "\u053F\u0568 \u057D\u056B\u0580\u0565\u0574 \u0584\u0565\u0566", phonetic: "guh see-REM KEZ", english: "I love you", emoji: "\u2764\uFE0F" },
      { armenian: "\u0535\u056F\u0578\u0582\u0580 \u0578\u0582\u057F\u0565\u0576\u0584", phonetic: "ye-GOOR oo-DENK", english: "Let's eat", emoji: "\uD83C\uDF7D\uFE0F" },
      { armenian: "\u054B\u0578\u0582\u0580 \u056F\u0568 \u0578\u0582\u0566\u0565\u057D", phonetic: "JOOR guh oo-ZES", english: "Do you want water?", emoji: "\uD83D\uDCA7" },
      { armenian: "\u053F\u0561\u0569 \u056F\u0568 \u0578\u0582\u0566\u0565\u057D", phonetic: "GAHT guh oo-ZES", english: "Do you want milk?", emoji: "\uD83E\uDD5B" },
      { armenian: "\u0535\u056F\u0578\u0582\u0580 \u0584\u0576\u0565\u0576\u0584", phonetic: "ye-GOOR kuh-NENK", english: "Let's sleep", emoji: "\uD83D\uDE34" },
      { armenian: "\u0532\u0561\u0581 \u0561\u0579\u0584\u0565\u0580\u0564", phonetic: "PAHTS ahch-KERT", english: "Open your eyes", emoji: "\uD83D\uDC40" },
      { armenian: "\u0535\u056F\u0578\u0582\u0580 \u056D\u0561\u0572\u0561\u0576\u0584", phonetic: "ye-GOOR KHAH-ghahnk", english: "Let's play", emoji: "\uD83C\uDFAE" },
      { armenian: "\u054F\u0578\u0582\u0580 \u056B\u0576\u0579 \u056F\u0561\u0576 \u0570\u0578\u057D", phonetic: "DOOR eench GAHN hos", english: "Come here", emoji: "\uD83D\uDC4B" },
      { armenian: "\u0531\u0574\u0567\u0576 \u056B\u0576\u0579 \u0567", phonetic: "ah-MEN eench EH", english: "Everything is fine", emoji: "\uD83D\uDC4D" },
      { armenian: "\u053F\u0568 \u0570\u0561\u057D\u056F\u0576\u0561\u0574", phonetic: "guh hahs-guh-NAHM", english: "I understand", emoji: "\uD83D\uDCA1" },
      { armenian: "\u0531\u0575\u0578 \u0565\u057D", phonetic: "AH-yo YES", english: "That's right/Yes!", emoji: "\u2705" },
      { armenian: "\u0535\u056F\u0578\u0582\u0580 \u056C\u0578\u0572\u0578\u0582\u0561\u0576\u0584", phonetic: "ye-GOOR loh-ghoo-AHNK", english: "Let's take a bath", emoji: "\uD83D\uDEC1" },
      { armenian: "\u054A\u0561\u057A\u0561\u0576 \u0578\u0582\u0580 \u0567", phonetic: "BAH-bahn OOR eh", english: "Where is daddy?", emoji: "\uD83D\uDC68" },
      { armenian: "\u0544\u0561\u0574\u0561\u0576 \u0578\u0582\u0580 \u0567", phonetic: "MAH-mahn OOR eh", english: "Where is mommy?", emoji: "\uD83D\uDC69" },
      { armenian: "\u054F\u0578\u0582\u0580 \u056B\u0576\u056E\u056B \u0563\u0578\u0580\u056E\u0565\u0581\u056B\u0580", phonetic: "DOOR een-TSEE gor-dze-TSEER", english: "You did great!", emoji: "\uD83C\uDF1F" },
      { armenian: "\u053D\u0561\u0572\u0561\u056C\u0578\u0582 \u056A\u0561\u0574\u0561\u0576\u0561\u056F\u0568", phonetic: "khah-ghah-LOO jah-mah-NAH-guh", english: "It's playtime!", emoji: "\uD83C\uDF89" },
      { armenian: "\u0553\u0578\u0584\u0580 \u056B\u056F \u057A\u0561\u057F\u0574\u0578\u0582\u0569\u056B\u0582\u0576 \u057A\u0561\u057F\u0574\u0567\u0576\u0584", phonetic: "POKR eeg bahd-moo-TYOON bahd-MENK", english: "Let's tell a little story", emoji: "\uD83D\uDCD6" },
      { armenian: "\u0532\u0561\u0580\u056B \u0563\u056B\u0577\u0565\u0580 \u057D\u056B\u0580\u0578\u0582\u0576\u056B\u057D", phonetic: "PAH-ree kee-SHER see-roo-NEES", english: "Good night, sweetie", emoji: "\uD83C\uDF19" },
    ]
  }
};

// ── ARMENIAN ALPHABET ────────────────────────────────────────────
const alphabet = [
  { upper: "\u0531", lower: "\u0561", name: "ayb", sound: "ah" },
  { upper: "\u0532", lower: "\u0562", name: "pen", sound: "b/p" },
  { upper: "\u0533", lower: "\u0563", name: "kim", sound: "g/k" },
  { upper: "\u0534", lower: "\u0564", name: "ta", sound: "d/t" },
  { upper: "\u0535", lower: "\u0565", name: "yech", sound: "ye/eh" },
  { upper: "\u0536", lower: "\u0566", name: "za", sound: "z" },
  { upper: "\u0537", lower: "\u0567", name: "eh", sound: "eh" },
  { upper: "\u0538", lower: "\u0568", name: "uht", sound: "uh" },
  { upper: "\u0539", lower: "\u0569", name: "to", sound: "t" },
  { upper: "\u053A", lower: "\u056A", name: "zhe", sound: "zh" },
  { upper: "\u053B", lower: "\u056B", name: "ini", sound: "ee" },
  { upper: "\u053C", lower: "\u056C", name: "lyun", sound: "l" },
  { upper: "\u053D", lower: "\u056D", name: "khe", sound: "kh" },
  { upper: "\u053E", lower: "\u056E", name: "dza", sound: "dz" },
  { upper: "\u053F", lower: "\u056F", name: "gen", sound: "g" },
  { upper: "\u0540", lower: "\u0570", name: "ho", sound: "h" },
  { upper: "\u0541", lower: "\u0571", name: "tsa", sound: "ts" },
  { upper: "\u0542", lower: "\u0572", name: "ghad", sound: "gh" },
  { upper: "\u0543", lower: "\u0573", name: "jeh", sound: "j" },
  { upper: "\u0544", lower: "\u0574", name: "men", sound: "m" },
  { upper: "\u0545", lower: "\u0575", name: "hee", sound: "y" },
  { upper: "\u0546", lower: "\u0576", name: "nu", sound: "n" },
  { upper: "\u0547", lower: "\u0577", name: "sha", sound: "sh" },
  { upper: "\u0548", lower: "\u0578", name: "vo", sound: "v/o" },
  { upper: "\u0549", lower: "\u0579", name: "cha", sound: "ch" },
  { upper: "\u054A", lower: "\u057A", name: "beh", sound: "p/b" },
  { upper: "\u054B", lower: "\u057B", name: "jeh", sound: "j" },
  { upper: "\u054C", lower: "\u057C", name: "ra", sound: "r (rolled)" },
  { upper: "\u054D", lower: "\u057D", name: "seh", sound: "s" },
  { upper: "\u054E", lower: "\u057E", name: "vev", sound: "v" },
  { upper: "\u054F", lower: "\u057F", name: "tyun", sound: "d" },
  { upper: "\u0550", lower: "\u0580", name: "reh", sound: "r (soft)" },
  { upper: "\u0551", lower: "\u0581", name: "tso", sound: "ts" },
  { upper: "\u0552", lower: "\u0582", name: "hyun", sound: "oo" },
  { upper: "\u0553", lower: "\u0583", name: "pyur", sound: "p" },
  { upper: "\u0554", lower: "\u0584", name: "keh", sound: "k" },
  { upper: "\u0555", lower: "\u0585", name: "oh", sound: "o" },
  { upper: "\u0556", lower: "\u0586", name: "feh", sound: "f" },
  { upper: "\u0587", lower: "\u0587", name: "yev", sound: "ev" },
];

// ── STATE ────────────────────────────────────────────────────────
let state = {
  mode: "home",
  selectedCategory: null,
  currentIndex: 0,
  score: 0,
  quizAnswers: [],
  selectedAnswer: null,
  searchQuery: "",
  quizOptions: [],
};

const app = document.getElementById("app");

// ── TEXT-TO-SPEECH (ElevenLabs via Netlify Function) ─────────────
const audioCache = {};
let currentAudio = null;

async function speak(text, btnEl) {
  // Show loading state
  if (btnEl) {
    btnEl.textContent = "\u23F3";
    btnEl.style.pointerEvents = "none";
  }

  // Stop any currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  try {
    // Check cache first
    if (!audioCache[text]) {
      const res = await fetch("/.netlify/functions/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("TTS request failed");

      const data = await res.json();
      audioCache[text] = "data:audio/mpeg;base64," + data.audio;
    }

    // Play cached audio
    currentAudio = new Audio(audioCache[text]);
    currentAudio.playbackRate = 0.85;
    await currentAudio.play();
  } catch (err) {
    console.warn("ElevenLabs TTS failed, falling back to Web Speech:", err);
    // Fallback to Web Speech API
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      utter.voice = voices.find(v => v.lang.startsWith("hy")) || voices.find(v => v.lang.startsWith("ru")) || voices[0];
      utter.rate = 0.75;
      window.speechSynthesis.speak(utter);
    }
  } finally {
    // Restore button
    if (btnEl) {
      btnEl.textContent = "\uD83D\uDD0A";
      btnEl.style.pointerEvents = "auto";
    }
  }
}
window.speechSynthesis?.getVoices();

// ── HELPERS ──────────────────────────────────────────────────────
function speakerBtn(text, size) {
  size = size || 28;
  return `<button class="speaker-btn" onclick="event.stopPropagation();speak('${text.replace(/'/g, "\\'")}', this)" style="font-size:${size}px" title="Listen">\uD83D\uDD0A</button>`;
}

function getAllWords() {
  const all = [];
  for (const [key, cat] of Object.entries(categories)) {
    for (const w of cat.words) {
      all.push({ ...w, category: cat.name, catKey: key, catColor: cat.color });
    }
  }
  return all;
}

function generateQuizOptions(words, index) {
  const correct = words[index];
  const allPhonetics = getAllWords().map(w => w.phonetic);
  const wrong = allPhonetics
    .filter(p => p !== correct.phonetic)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  return [correct.phonetic, ...wrong].sort(() => Math.random() - 0.5);
}

function goHome() {
  state = { mode: "home", selectedCategory: null, currentIndex: 0, score: 0, quizAnswers: [], selectedAnswer: null, searchQuery: "", quizOptions: [] };
  render();
}

// ── RENDER ───────────────────────────────────────────────────────
function render() {
  const s = state;
  const cat = s.selectedCategory ? categories[s.selectedCategory] : null;
  const words = cat ? cat.words : [];
  const word = words[s.currentIndex];

  let html = "";

  // Header
  html += `<div class="app-header">`;
  if (s.mode !== "home") {
    html += `<button class="home-btn" onclick="goHome()">\u2190 Home</button>`;
  }
  html += `<h1>Armine's Western Armenian</h1>`;
  html += `<p class="subtitle">\u0540\u0561\u0575\u0565\u0580\u0567\u0576 \u2022 Learn & Play</p>`;
  html += `</div>`;
  html += `<div class="container">`;

  // ─── HOME ───
  if (s.mode === "home") {
    html += `<div class="anim-float">`;
    html += `<div class="nav-row">`;
    html += `<button class="nav-btn" onclick="state.mode='search';render()">\uD83D\uDD0D Word Lookup</button>`;
    html += `<button class="nav-btn" onclick="state.mode='alphabet';render()">\uD83D\uDD24 Alphabet</button>`;
    html += `</div>`;
    html += `<h2 class="section-title">Choose a Category</h2>`;
    html += `<div class="cat-grid">`;
    for (const [key, c] of Object.entries(categories)) {
      html += `<div class="cat-card" onclick="state.selectedCategory='${key}';state.mode='category';render()" style="--cat-color:${c.color}">`;
      html += `<div class="emoji">${c.icon}</div>`;
      html += `<div class="name" style="color:${c.color}">${c.name}</div>`;
      html += `<div class="count">${c.words.length} words</div>`;
      html += `</div>`;
    }
    html += `</div></div>`;
  }

  // ─── CATEGORY DETAIL ───
  else if (s.mode === "category" && cat) {
    html += `<div class="cat-detail anim-float">`;
    html += `<div class="big-emoji">${cat.icon}</div>`;
    html += `<h2 style="color:${cat.color}">${cat.name}</h2>`;
    html += `<p class="word-count">${cat.words.length} words to explore</p>`;
    html += `<div class="cat-buttons">`;
    html += `<button class="btn-learn" style="background:${cat.color};box-shadow:0 4px 16px ${cat.color}44" onclick="state.mode='flashcard';state.currentIndex=0;render()">\uD83D\uDCDA Learn</button>`;
    html += `<button class="btn-quiz" style="color:${cat.color}" onclick="startQuiz()">\uD83C\uDFAF Quiz</button>`;
    html += `</div>`;
    html += `<button class="back-link" onclick="goHome()">\u2190 Back to Categories</button>`;
    html += `</div>`;
  }

  // ─── FLASHCARD ───
  else if (s.mode === "flashcard" && word) {
    html += `<div class="anim-slide" style="text-align:center">`;
    html += `<div class="progress-label" style="color:${cat.color}">${cat.icon} ${cat.name.toUpperCase()} \u2014 ${s.currentIndex + 1} / ${words.length}</div>`;
    html += `<div class="progress-bar"><div class="progress-fill" style="width:${((s.currentIndex + 1) / words.length) * 100}%;background:${cat.color}"></div></div>`;
    html += `<div class="flashcard">`;
    html += `<div class="emoji">${word.emoji}</div>`;
    html += `<div class="armenian">${word.armenian} ${speakerBtn(word.armenian, 22)}</div>`;
    html += `<div class="phonetic" style="color:${cat.color};background:${cat.color}18">${word.phonetic}</div>`;
    html += `<div class="english">${word.english}</div>`;
    html += `</div>`;
    // Nav
    html += `<div class="card-nav">`;
    html += `<button class="btn-prev" style="color:${cat.color}" ${s.currentIndex === 0 ? "disabled" : ""} onclick="state.currentIndex--;render()">\u2190 Prev</button>`;
    html += `<button class="btn-next" style="background:${cat.color};box-shadow:0 4px 12px ${cat.color}44" ${s.currentIndex >= words.length - 1 ? "disabled" : ""} onclick="state.currentIndex++;render()">Next \u2192</button>`;
    html += `</div>`;
    html += `<button class="back-link" onclick="state.mode='category';state.currentIndex=0;render()">\u2190 Back to ${cat.name}</button>`;
    html += `</div>`;
  }

  // ─── QUIZ ───
  else if (s.mode === "quiz" && word) {
    html += `<div class="anim-pop" style="text-align:center">`;
    html += `<div class="progress-label" style="color:${cat.color}">\uD83C\uDFAF QUIZ \u2014 ${s.currentIndex + 1} / ${words.length}</div>`;
    html += `<div class="progress-bar"><div class="progress-fill" style="width:${((s.currentIndex + 1) / words.length) * 100}%;background:${cat.color}"></div></div>`;
    html += `<div class="quiz-card">`;
    html += `<div class="emoji">${word.emoji}</div>`;
    html += `<div class="armenian">${word.armenian} ${speakerBtn(word.armenian, 20)}</div>`;
    html += `<p class="prompt">Which pronunciation is correct?</p>`;
    html += `<div class="quiz-options">`;
    for (const opt of s.quizOptions) {
      const isCorrect = opt === word.phonetic;
      const isSelected = s.selectedAnswer === opt;
      let cls = "quiz-option";
      if (s.selectedAnswer !== null) {
        cls += " answered";
        if (isCorrect) cls += " correct";
        else if (isSelected && !isCorrect) cls += " wrong";
        else cls += " dimmed";
      }
      const suffix = s.selectedAnswer !== null ? (isCorrect ? " \u2705" : (isSelected && !isCorrect ? " \u274C" : "")) : "";
      html += `<button class="${cls}" onclick="handleQuizAnswer('${opt.replace(/'/g, "\\'")}')">${opt}${suffix}</button>`;
    }
    html += `</div></div>`;
    html += `<div class="quiz-score-badge" style="color:${cat.color}">Score: ${s.score} / ${s.currentIndex + (s.selectedAnswer !== null ? 1 : 0)}</div>`;
    html += `</div>`;
  }

  // ─── RESULTS ───
  else if (s.mode === "results") {
    const total = words.length;
    const emoji = s.score === total ? "\uD83C\uDF89" : s.score >= total * 0.5 ? "\uD83C\uDF1F" : "\uD83D\uDCAA";
    const msg = s.score === total ? "Perfect Score!" : s.score >= total * 0.5 ? "Great Job!" : "Keep Practicing!";
    html += `<div class="anim-pop">`;
    html += `<div class="results-card">`;
    html += `<div class="big-emoji">${emoji}</div>`;
    html += `<h2>${msg}</h2>`;
    html += `<div class="score" style="color:${cat.color}">${s.score} / ${total}</div>`;
    html += `<p class="label">${cat.name} Quiz Complete</p>`;
    html += `<div class="results-buttons">`;
    html += `<button class="btn-retry" style="background:${cat.color}" onclick="startQuiz()">\uD83D\uDD04 Try Again</button>`;
    html += `<button class="btn-home" onclick="goHome()">\uD83C\uDFE0 Back Home</button>`;
    html += `</div></div></div>`;
  }

  // ─── SEARCH ───
  else if (s.mode === "search") {
    const allWords = getAllWords();
    const q = s.searchQuery.toLowerCase();
    const filtered = q ? allWords.filter(w =>
      w.english.toLowerCase().includes(q) ||
      w.armenian.includes(s.searchQuery) ||
      w.phonetic.toLowerCase().includes(q)
    ) : allWords;

    html += `<div class="anim-float">`;
    html += `<h2 class="section-title">\uD83D\uDD0D Word Lookup</h2>`;
    html += `<input class="search-input" type="text" placeholder="Search English, Armenian, or phonetic..." value="${s.searchQuery}" oninput="state.searchQuery=this.value;render()" />`;
    html += `<div class="search-count">${filtered.length} result${filtered.length !== 1 ? "s" : ""}</div>`;
    html += `<div class="search-results">`;
    if (filtered.length === 0) {
      html += `<div class="no-results">No results found \uD83D\uDE15</div>`;
    } else {
      for (const w of filtered) {
        html += `<div class="search-item">`;
        html += `<span class="emoji">${w.emoji}</span>`;
        html += `<div class="info">`;
        html += `<div class="arm-row"><span class="armenian">${w.armenian}</span>${speakerBtn(w.armenian, 16)}</div>`;
        html += `<div class="phonetic">${w.phonetic}</div>`;
        html += `<div class="english">${w.english}</div>`;
        html += `</div>`;
        html += `<span class="tag" style="background:${w.catColor}20;color:${w.catColor}">${w.category}</span>`;
        html += `</div>`;
      }
    }
    html += `</div></div>`;
  }

  // ─── ALPHABET ───
  else if (s.mode === "alphabet") {
    html += `<div class="anim-float">`;
    html += `<h2 class="section-title">\uD83D\uDD24 Armenian Alphabet</h2>`;
    html += `<p class="alpha-desc">39 letters \u2014 tap any letter to hear it</p>`;
    html += `<div class="alpha-grid">`;
    for (const letter of alphabet) {
      html += `<div class="alpha-card" onclick="speak('${letter.upper}')">`;
      html += `<div class="letters">${letter.upper} ${letter.lower}</div>`;
      html += `<div class="letter-name">${letter.name}</div>`;
      html += `<div class="letter-sound">"${letter.sound}"</div>`;
      html += `<div class="speaker">\uD83D\uDD0A</div>`;
      html += `</div>`;
    }
    html += `</div></div>`;
  }

  html += `</div>`; // close container
  app.innerHTML = html;

  // Preserve search focus
  if (s.mode === "search") {
    const input = app.querySelector(".search-input");
    if (input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }
}

// ── QUIZ FUNCTIONS ───────────────────────────────────────────────
function startQuiz() {
  const words = categories[state.selectedCategory].words;
  state.mode = "quiz";
  state.currentIndex = 0;
  state.score = 0;
  state.quizAnswers = [];
  state.selectedAnswer = null;
  state.quizOptions = generateQuizOptions(words, 0);
  render();
}

function handleQuizAnswer(answer) {
  if (state.selectedAnswer !== null) return;
  const words = categories[state.selectedCategory].words;
  const correct = words[state.currentIndex].phonetic;
  const isCorrect = answer === correct;
  state.selectedAnswer = answer;
  if (isCorrect) state.score++;
  state.quizAnswers.push({ answer, correct: isCorrect });
  render();

  setTimeout(() => {
    if (state.currentIndex + 1 < words.length) {
      state.currentIndex++;
      state.selectedAnswer = null;
      state.quizOptions = generateQuizOptions(words, state.currentIndex);
    } else {
      state.mode = "results";
    }
    render();
  }, 1200);
}

// ── INIT ─────────────────────────────────────────────────────────
render();
