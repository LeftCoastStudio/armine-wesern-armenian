import { useState, useEffect, useCallback } from "react";

export default function ArmenianApp() {
  const categories = {
    colors: {
      name: "Colors", icon: "\uD83C\uDFA8", color: "#E85D75",
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
      name: "Animals", icon: "\uD83D\uDC3E", color: "#7C5CBF",
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
      name: "Family", icon: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67", color: "#2E86AB",
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
    bodyParts: { name: "Body Parts", icon: "\uD83D\uDD90\uFE0F", color: "#F18F01", words: [
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
    ]},
    food: { name: "Food", icon: "\uD83C\uDF4E", color: "#2ECC71", words: [
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
    ]},
    basics: { name: "Basics", icon: "\u2B50", color: "#F39C12", words: [
      { armenian: "\u0531\u0575\u0578", phonetic: "AH-yo", english: "yes", emoji: "\u2705" },
      { armenian: "\u0548\u0579", phonetic: "VOCH", english: "no", emoji: "\u274C" },
      { armenian: "\u0532\u0561\u0580\u0587", phonetic: "pah-REV", english: "hello", emoji: "\uD83D\uDC4B" },
      { armenian: "\u0551\u057F\u0565\u057D\u0578\u0582\u0569\u056B\u0582\u0576", phonetic: "tse-deh-SOO-tyoon", english: "goodbye", emoji: "\uD83D\uDC4B" },
      { armenian: "\u0547\u0576\u0578\u0580\u0570\u0561\u056F\u0561\u056C\u0578\u0582\u0569\u056B\u0582\u0576", phonetic: "shnor-hah-gah-loo-TYOON", english: "thank you", emoji: "\uD83D\uDE4F" },
      { armenian: "\u054D\u056B\u0580\u0578\u0582\u0576", phonetic: "see-ROON", english: "love/cute", emoji: "\u2764\uFE0F" },
      { armenian: "\u0532\u0561\u0580\u056B \u0561\u057C\u0561\u0582\u0578\u057F", phonetic: "PAH-ree ah-rah-VOD", english: "good morning", emoji: "\uD83C\uDF1E" },
      { armenian: "\u053D\u0576\u0564\u0580\u0565\u0574", phonetic: "KUNT-rehm", english: "please", emoji: "\uD83D\uDE4F" },
      { armenian: "\u0532\u0561\u0580\u056B \u0563\u056B\u0577\u0565\u0580", phonetic: "PAH-ree kee-SHER", english: "good night", emoji: "\uD83C\uDF19" },
    ]},
    toys: { name: "Toys", icon: "\uD83E\uDDF8", color: "#E74C3C", words: [
      { armenian: "\u053D\u0561\u0572\u0561\u056C\u056B\u0584", phonetic: "khah-ghah-LEEK", english: "toy", emoji: "\uD83E\uDDF8" },
      { armenian: "\u0533\u0576\u0564\u0561\u056F", phonetic: "kn-TAG", english: "ball", emoji: "\u26BD" },
      { armenian: "\u054F\u056B\u056F\u0576\u056B\u056F", phonetic: "deeg-NEEG", english: "doll", emoji: "\uD83E\uDE86" },
      { armenian: "\u0533\u056B\u0580\u0584", phonetic: "KEERK", english: "book", emoji: "\uD83D\uDCD6" },
      { armenian: "\u0544\u0561\u057F\u056B\u057F", phonetic: "mah-DEED", english: "crayon", emoji: "\uD83D\uDD8D\uFE0F" },
      { armenian: "\u053D\u0578\u0580\u0561\u0576\u0561\u0580\u0564\u056B\u056F", phonetic: "kho-rah-nahr-DEEG", english: "blocks", emoji: "\uD83E\uDDF1" },
      { armenian: "\u053B\u0576\u0584\u0576\u0561\u0577\u0561\u0580\u056A", phonetic: "eenk-nah-SHAHRJ", english: "car (toy)", emoji: "\uD83D\uDE97" },
      { armenian: "\u0553\u0578\u0582\u0579\u056B\u056F", phonetic: "poo-CHEEG", english: "balloon", emoji: "\uD83C\uDF88" },
    ]},
    nature: { name: "Nature", icon: "\uD83C\uDF38", color: "#1ABC9C", words: [
      { armenian: "\u0531\u0580\u0587", phonetic: "ah-REV", english: "sun", emoji: "\u2600\uFE0F" },
      { armenian: "\u053C\u0578\u0582\u057D\u056B\u0576", phonetic: "loo-SEEN", english: "moon", emoji: "\uD83C\uDF19" },
      { armenian: "\u0531\u057D\u057F\u0572", phonetic: "ahst-GH", english: "star", emoji: "\u2B50" },
      { armenian: "\u0531\u0574\u057A", phonetic: "AHMP", english: "cloud", emoji: "\u2601\uFE0F" },
      { armenian: "\u0531\u0576\u0571\u0587", phonetic: "ahn-DZEV", english: "rain", emoji: "\uD83C\uDF27\uFE0F" },
      { armenian: "\u053E\u0561\u057C", phonetic: "DZAHR", english: "tree", emoji: "\uD83C\uDF33" },
      { armenian: "\u053E\u0561\u0572\u056B\u056F", phonetic: "dzah-GHEEK", english: "flower", emoji: "\uD83C\uDF3B" },
      { armenian: "\u054B\u0578\u0582\u0580", phonetic: "JOOR", english: "water", emoji: "\uD83C\uDF0A" },
      { armenian: "\u0541\u056B\u0582\u0576", phonetic: "TSYOON", english: "snow", emoji: "\u2744\uFE0F" },
    ]},
    actions: { name: "Actions", icon: "\uD83C\uDFC3", color: "#9B59B6", words: [
      { armenian: "\u054E\u0561\u0566\u0565\u056C", phonetic: "vah-ZEL", english: "run", emoji: "\uD83C\uDFC3" },
      { armenian: "\u0554\u0561\u056C\u0565\u056C", phonetic: "kah-LEL", english: "walk", emoji: "\uD83D\uDEB6" },
      { armenian: "\u0551\u0561\u057F\u056F\u0565\u056C", phonetic: "tsahd-GEL", english: "jump", emoji: "\uD83E\uDD38" },
      { armenian: "\u054A\u0561\u0580\u0565\u056C", phonetic: "bah-REL", english: "dance", emoji: "\uD83D\uDC83" },
      { armenian: "\u0535\u0580\u0563\u0565\u056C", phonetic: "yer-KEL", english: "sing", emoji: "\uD83C\uDFA4" },
      { armenian: "\u0548\u0582\u057F\u0565\u056C", phonetic: "oo-DEL", english: "eat", emoji: "\uD83C\uDF7D\uFE0F" },
      { armenian: "\u053D\u0574\u0565\u056C", phonetic: "khuh-MEL", english: "drink", emoji: "\uD83E\uDD64" },
      { armenian: "\u0554\u0576\u0565\u056C", phonetic: "kuh-NEL", english: "sleep", emoji: "\uD83D\uDE34" },
      { armenian: "\u053D\u0561\u0572\u0561\u056C", phonetic: "khah-GHAHL", english: "play", emoji: "\uD83C\uDFAE" },
    ]},
    clothes: { name: "Clothes", icon: "\uD83D\uDC55", color: "#3498DB", words: [
      { armenian: "\u0547\u0561\u057A\u056B\u056F", phonetic: "shah-BEEG", english: "shirt", emoji: "\uD83D\uDC55" },
      { armenian: "\u054E\u0565\u0580\u0561\u0580\u056F\u0578\u0582", phonetic: "veh-rahr-GOO", english: "jacket", emoji: "\uD83E\uDDE5" },
      { armenian: "\u0533\u056C\u056D\u0561\u0580\u056F", phonetic: "kul-KHAHRG", english: "hat", emoji: "\uD83E\uDDE2" },
      { armenian: "\u053F\u0585\u0577\u056B\u056F", phonetic: "GO-sheeg", english: "shoes", emoji: "\uD83D\uDC5F" },
      { armenian: "\u0533\u0578\u0582\u056C\u057A\u0561", phonetic: "KOOL-bah", english: "socks", emoji: "\uD83E\uDDE6" },
      { armenian: "\u054F\u0561\u0562\u0561\u057F", phonetic: "dah-BAHD", english: "pants", emoji: "\uD83D\uDC56" },
      { armenian: "\u0547\u0578\u0580", phonetic: "SHOR", english: "dress", emoji: "\uD83D\uDC57" },
    ]},
    numbers: { name: "Numbers", icon: "\uD83D\uDD22", color: "#E67E22", words: [
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
    ]},
    shapes: { name: "Shapes", icon: "\uD83D\uDD37", color: "#2980B9", words: [
      { armenian: "\u0547\u0580\u057B\u0561\u0576\u0561\u056F", phonetic: "shur-jah-NAHG", english: "circle", emoji: "\uD83D\uDD35" },
      { armenian: "\u0554\u0561\u057C\u0561\u056F\u0578\u0582\u057D\u056B", phonetic: "kah-rah-goo-SEE", english: "square", emoji: "\uD83D\uDFE5" },
      { armenian: "\u0535\u057C\u0561\u0576\u056F\u056B\u0582\u0576", phonetic: "yeh-rahn-GYOON", english: "triangle", emoji: "\uD83D\uDD3A" },
      { armenian: "\u0531\u057D\u057F\u0572", phonetic: "AHST-gh", english: "star", emoji: "\u2B50" },
      { armenian: "\u054D\u056B\u0580\u057F", phonetic: "SEERT", english: "heart", emoji: "\u2764\uFE0F" },
    ]},
    house: { name: "House", icon: "\uD83C\uDFE0", color: "#16A085", words: [
      { armenian: "\u054F\u0578\u0582\u0576", phonetic: "DOON", english: "house", emoji: "\uD83C\uDFE0" },
      { armenian: "\u0534\u0578\u0582\u057C", phonetic: "TOOR", english: "door", emoji: "\uD83D\uDEAA" },
      { armenian: "\u054A\u0561\u057F\u0578\u0582\u0570\u0561\u0576", phonetic: "bah-doo-HAHN", english: "window", emoji: "\uD83E\uDE9F" },
      { armenian: "\u0544\u0561\u0570\u0573\u0561\u056F\u0561\u056C", phonetic: "mah-hah-gah-GAHL", english: "bed", emoji: "\uD83D\uDECF\uFE0F" },
      { armenian: "\u0531\u0569\u0578\u057C", phonetic: "ah-TOR", english: "chair", emoji: "\uD83E\uDE91" },
      { armenian: "\u054D\u0565\u0572\u0561\u0576", phonetic: "seh-GHAHN", english: "table", emoji: "\uD83E\uDE91" },
      { armenian: "\u053C\u0561\u0574\u057A\u0561\u0580", phonetic: "lahm-BAHR", english: "lamp", emoji: "\uD83D\uDCA1" },
    ]},
    transport: { name: "Transport", icon: "\uD83D\uDE97", color: "#C0392B", words: [
      { armenian: "\u053B\u0576\u0584\u0576\u0561\u0577\u0561\u0580\u056A", phonetic: "eenk-nah-SHAHRJ", english: "car", emoji: "\uD83D\uDE97" },
      { armenian: "\u0540\u0561\u0576\u0580\u0561\u056F\u0561\u057C\u0584", phonetic: "hahn-rah-KAHRK", english: "bus", emoji: "\uD83D\uDE8C" },
      { armenian: "\u053F\u0561\u0569\u057D\u0561", phonetic: "kah-TSA", english: "train", emoji: "\uD83D\uDE82" },
      { armenian: "\u0555\u0564\u0561\u0576\u0561\u057E", phonetic: "oh-tah-NAHV", english: "airplane", emoji: "\u2708\uFE0F" },
      { armenian: "\u0546\u0561\u057E\u0561\u056F", phonetic: "nah-VAHG", english: "boat", emoji: "\u26F5" },
      { armenian: "\u0540\u0565\u056E\u0561\u0576\u056B\u057E", phonetic: "heh-tsah-NEEV", english: "bicycle", emoji: "\uD83D\uDEB2" },
    ]},
    dailyPhrases: { name: "Daily Phrases", icon: "\uD83D\uDCAC", color: "#8E44AD", words: [
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
      { armenian: "\u053F\u0568 \u057D\u056B\u0580\u0565\u0574 \u0584\u0565\u0566", phonetic: "guh see-REM KEZ", english: "I love you", emoji: "\u2764\uFE0F" },
      { armenian: "\u054A\u0561\u057A\u0561\u0576 \u0578\u0582\u0580 \u0567", phonetic: "BAH-bahn OOR eh", english: "Where is daddy?", emoji: "\uD83D\uDC68" },
      { armenian: "\u0544\u0561\u0574\u0561\u0576 \u0578\u0582\u0580 \u0567", phonetic: "MAH-mahn OOR eh", english: "Where is mommy?", emoji: "\uD83D\uDC69" },
      { armenian: "\u054F\u0578\u0582\u0580 \u056B\u0576\u056E\u056B \u0563\u0578\u0580\u056E\u0565\u0581\u056B\u0580", phonetic: "DOOR een-TSEE gor-dze-TSEER", english: "You did great!", emoji: "\uD83C\uDF1F" },
      { armenian: "\u053D\u0561\u0572\u0561\u056C\u0578\u0582 \u056A\u0561\u0574\u0561\u0576\u0561\u056F\u0568", phonetic: "khah-ghah-LOO jah-mah-NAH-guh", english: "It's playtime!", emoji: "\uD83C\uDF89" },
      { armenian: "\u0532\u0561\u0580\u056B \u0563\u056B\u0577\u0565\u0580 \u057D\u056B\u0580\u0578\u0582\u0576\u056B\u057D", phonetic: "PAH-ree kee-SHER see-roo-NEES", english: "Good night, sweetie", emoji: "\uD83C\uDF19" },
    ]}
  };

  const alphabet = [
    { upper: "\u0531", lower: "\u0561", name: "ayb", sound: "ah" },{ upper: "\u0532", lower: "\u0562", name: "pen", sound: "b/p" },{ upper: "\u0533", lower: "\u0563", name: "kim", sound: "g/k" },{ upper: "\u0534", lower: "\u0564", name: "ta", sound: "d/t" },{ upper: "\u0535", lower: "\u0565", name: "yech", sound: "ye/eh" },{ upper: "\u0536", lower: "\u0566", name: "za", sound: "z" },{ upper: "\u0537", lower: "\u0567", name: "eh", sound: "eh" },{ upper: "\u0538", lower: "\u0568", name: "uht", sound: "uh" },{ upper: "\u0539", lower: "\u0569", name: "to", sound: "t" },{ upper: "\u053A", lower: "\u056A", name: "zhe", sound: "zh" },{ upper: "\u053B", lower: "\u056B", name: "ini", sound: "ee" },{ upper: "\u053C", lower: "\u056C", name: "lyun", sound: "l" },{ upper: "\u053D", lower: "\u056D", name: "khe", sound: "kh" },{ upper: "\u053E", lower: "\u056E", name: "dza", sound: "dz" },{ upper: "\u053F", lower: "\u056F", name: "gen", sound: "g" },{ upper: "\u0540", lower: "\u0570", name: "ho", sound: "h" },{ upper: "\u0541", lower: "\u0571", name: "tsa", sound: "ts" },{ upper: "\u0542", lower: "\u0572", name: "ghad", sound: "gh" },{ upper: "\u0543", lower: "\u0573", name: "jeh", sound: "j" },{ upper: "\u0544", lower: "\u0574", name: "men", sound: "m" },{ upper: "\u0545", lower: "\u0575", name: "hee", sound: "y" },{ upper: "\u0546", lower: "\u0576", name: "nu", sound: "n" },{ upper: "\u0547", lower: "\u0577", name: "sha", sound: "sh" },{ upper: "\u0548", lower: "\u0578", name: "vo", sound: "v/o" },{ upper: "\u0549", lower: "\u0579", name: "cha", sound: "ch" },{ upper: "\u054A", lower: "\u057A", name: "beh", sound: "p/b" },{ upper: "\u054B", lower: "\u057B", name: "jeh", sound: "j" },{ upper: "\u054C", lower: "\u057C", name: "ra", sound: "r (rolled)" },{ upper: "\u054D", lower: "\u057D", name: "seh", sound: "s" },{ upper: "\u054E", lower: "\u057E", name: "vev", sound: "v" },{ upper: "\u054F", lower: "\u057F", name: "tyun", sound: "d" },{ upper: "\u0550", lower: "\u0580", name: "reh", sound: "r (soft)" },{ upper: "\u0551", lower: "\u0581", name: "tso", sound: "ts" },{ upper: "\u0552", lower: "\u0582", name: "hyun", sound: "oo" },{ upper: "\u0553", lower: "\u0583", name: "pyur", sound: "p" },{ upper: "\u0554", lower: "\u0584", name: "keh", sound: "k" },{ upper: "\u0555", lower: "\u0585", name: "oh", sound: "o" },{ upper: "\u0556", lower: "\u0586", name: "feh", sound: "f" },{ upper: "\u0587", lower: "\u0587", name: "yev", sound: "ev" },
  ];

  const [mode, setMode] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [quizOptions, setQuizOptions] = useState([]);
  const [animKey, setAnimKey] = useState(0);

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = window.speechSynthesis.getVoices();
    u.voice = v.find(x => x.lang.startsWith("hy")) || v.find(x => x.lang.startsWith("ru")) || v[0];
    u.rate = 0.75;
    window.speechSynthesis.speak(u);
  }, []);
  useEffect(() => { window.speechSynthesis?.getVoices(); }, []);

  const allPhonetics = Object.values(categories).flatMap(c => c.words.map(w => w.phonetic));
  const genOpts = (words, idx) => {
    const correct = words[idx].phonetic;
    const wrong = allPhonetics.filter(p => p !== correct).sort(() => Math.random() - 0.5).slice(0, 2);
    return [correct, ...wrong].sort(() => Math.random() - 0.5);
  };

  const goHome = () => { setMode("home"); setSelectedCategory(null); setCurrentIndex(0); setSearchQuery(""); };
  const startQuiz = (key) => {
    const k = key || selectedCategory;
    setSelectedCategory(k); setMode("quiz"); setCurrentIndex(0); setScore(0); setSelectedAnswer(null);
    setQuizOptions(genOpts(categories[k].words, 0)); setAnimKey(n => n + 1);
  };
  const handleQuizAnswer = (ans) => {
    if (selectedAnswer !== null) return;
    const words = categories[selectedCategory].words;
    const isCorrect = ans === words[currentIndex].phonetic;
    setSelectedAnswer(ans);
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (currentIndex + 1 < words.length) {
        const next = currentIndex + 1;
        setCurrentIndex(next); setSelectedAnswer(null);
        setQuizOptions(genOpts(words, next)); setAnimKey(n => n + 1);
      } else { setMode("results"); }
    }, 1200);
  };

  const cat = selectedCategory ? categories[selectedCategory] : null;
  const words = cat ? cat.words : [];
  const word = words[currentIndex];
  const allWords = Object.entries(categories).flatMap(([k, c]) => c.words.map(w => ({ ...w, category: c.name, catColor: c.color })));
  const q = searchQuery.toLowerCase();
  const filtered = q ? allWords.filter(w => w.english.toLowerCase().includes(q) || w.armenian.includes(searchQuery) || w.phonetic.toLowerCase().includes(q)) : allWords;

  const glass = { background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.9)" };
  const SpeakerBtn = ({ text }) => (<button onClick={e => { e.stopPropagation(); speak(text); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, fontSize: 20, verticalAlign: "middle" }} title="Listen">{"\uD83D\uDD0A"}</button>);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #1E1235 0%, #2D1B4E 25%, #3D2270 55%, #4A2D80 80%, #2D1B4E 100%)", fontFamily: "'Nunito', sans-serif", color: "#F0E6FF" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes floatIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bounceEmoji{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
        @keyframes slideCard{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
        @keyframes popIn{0%{opacity:0;transform:scale(.85)}70%{transform:scale(1.03)}100%{opacity:1;transform:scale(1)}}
        .hov:hover{transform:translateY(-4px) scale(1.02)!important;box-shadow:0 12px 32px rgba(0,0,0,.25)!important;background:rgba(255,255,255,.32)!important}
        .bh:hover{transform:translateY(-2px)!important;box-shadow:0 8px 24px rgba(0,0,0,.25)!important}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:3px}
        input::placeholder{color:rgba(255,255,255,.4)}
      `}</style>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, rgba(108,63,160,0.5), rgba(232,93,117,0.3))", padding: "24px 20px 20px", textAlign: "center", position: "relative", borderBottom: "1px solid rgba(255,255,255,0.88)", backdropFilter: "blur(20px)" }}>
        {mode !== "home" && <button onClick={goHome} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.15)", color: "#2D1B4E", borderRadius: 12, padding: "8px 16px", cursor: "pointer", fontFamily: "'Nunito'", fontWeight: 700, fontSize: 14 }}>{"\u2190"} Home</button>}
        <h1 style={{ fontFamily: "'Fredoka'", color: "white", fontSize: 26, fontWeight: 700, textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>Armine's Western Armenian</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 4, fontWeight: 600, letterSpacing: 1 }}>{"\u0540\u0561\u0575\u0565\u0580\u0567\u0576"} • Learn & Play</p>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "16px 16px 60px" }}>

        {mode === "home" && (
          <div style={{ animation: "floatIn 0.4s ease" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
              {[{ l: "\uD83D\uDD0D Word Lookup", m: "search" }, { l: "\uD83D\uDD24 Alphabet", m: "alphabet" }].map(b => (
                <button key={b.m} className="bh" onClick={() => setMode(b.m)} style={{ flex: 1, minWidth: 140, padding: "14px 16px", ...glass, borderRadius: 16, cursor: "pointer", fontFamily: "'Nunito'", fontWeight: 700, fontSize: 15, color: "#2D1B4E" }}>{b.l}</button>
              ))}
            </div>
            <h2 style={{ fontFamily: "'Fredoka'", fontSize: 20, color: "white", marginBottom: 14, fontWeight: 600 }}>Choose a Category</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 12 }}>
              {Object.entries(categories).map(([key, c], i) => (
                <div key={key} className="hov" onClick={() => { setSelectedCategory(key); setMode("category"); }} style={{ ...glass, borderRadius: 20, padding: "18px 14px", textAlign: "center", cursor: "pointer", transition: "all 0.25s", animation: `floatIn 0.4s ease ${i * 0.04}s both` }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>{c.icon}</div>
                  <div style={{ fontFamily: "'Fredoka'", fontWeight: 600, fontSize: 15, color: c.color }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 4, fontWeight: 600 }}>{c.words.length} words</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {mode === "category" && cat && (
          <div style={{ animation: "floatIn 0.4s ease", textAlign: "center" }}>
            <div style={{ fontSize: 60, marginBottom: 12, animation: "bounceEmoji 1.5s infinite" }}>{cat.icon}</div>
            <h2 style={{ fontFamily: "'Fredoka'", fontSize: 28, color: cat.color, marginBottom: 8 }}>{cat.name}</h2>
            <p style={{ color: "#666", marginBottom: 28, fontWeight: 600 }}>{cat.words.length} words to explore</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="bh" onClick={() => { setMode("flashcard"); setCurrentIndex(0); setAnimKey(n => n + 1); }} style={{ padding: "16px 36px", background: cat.color, color: "white", border: "none", borderRadius: 16, fontFamily: "'Fredoka'", fontSize: 18, fontWeight: 600, cursor: "pointer", boxShadow: `0 4px 16px ${cat.color}44` }}>{"\uD83D\uDCDA"} Learn</button>
              <button className="bh" onClick={() => startQuiz(selectedCategory)} style={{ padding: "16px 36px", ...glass, color: cat.color, borderRadius: 16, fontFamily: "'Fredoka'", fontSize: 18, fontWeight: 600, cursor: "pointer" }}>{"\uD83C\uDFAF"} Quiz</button>
            </div>
            <button onClick={goHome} style={{ marginTop: 24, background: "none", border: "none", color: "#888", cursor: "pointer", fontFamily: "'Nunito'", fontWeight: 700, fontSize: 14 }}>{"\u2190"} Back to Categories</button>
          </div>
        )}

        {mode === "flashcard" && word && (
          <div key={animKey} style={{ animation: "slideCard 0.35s ease", textAlign: "center" }}>
            <div style={{ fontSize: 13, color: cat.color, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>{cat.icon} {cat.name.toUpperCase()} — {currentIndex + 1} / {words.length}</div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.9)", borderRadius: 3, marginBottom: 24, overflow: "hidden" }}><div style={{ height: "100%", background: cat.color, borderRadius: 3, width: `${((currentIndex + 1) / words.length) * 100}%`, transition: "width 0.4s" }} /></div>
            <div style={{ ...glass, borderRadius: 28, padding: "36px 24px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
              <div style={{ fontSize: 72, marginBottom: 16, animation: "bounceEmoji 2s infinite" }}>{word.emoji}</div>
              <div style={{ fontFamily: "'Fredoka'", fontSize: 32, color: "#2D1B4E", marginBottom: 8, fontWeight: 700 }}>{word.armenian} <SpeakerBtn text={word.armenian} /></div>
              <div style={{ fontSize: 20, fontWeight: 700, display: "inline-block", padding: "4px 16px", borderRadius: 20, color: cat.color, background: `${cat.color}18` }}>{word.phonetic}</div>
              <div style={{ fontSize: 18, color: "#666", marginTop: 12, fontWeight: 600 }}>{word.english}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 24 }}>
              <button disabled={currentIndex === 0} className="bh" onClick={() => { setCurrentIndex(i => i - 1); setAnimKey(n => n + 1); }} style={{ padding: "12px 28px", borderRadius: 14, background: "rgba(255,255,255,0.88)", border: "1px solid rgba(255,255,255,0.15)", color: cat.color, fontFamily: "'Nunito'", fontWeight: 700, fontSize: 15, cursor: currentIndex === 0 ? "default" : "pointer", opacity: currentIndex === 0 ? 0.3 : 1 }}>{"\u2190"} Prev</button>
              <button disabled={currentIndex >= words.length - 1} className="bh" onClick={() => { setCurrentIndex(i => i + 1); setAnimKey(n => n + 1); }} style={{ padding: "12px 28px", borderRadius: 14, background: cat.color, border: "none", color: "white", fontFamily: "'Nunito'", fontWeight: 700, fontSize: 15, cursor: currentIndex >= words.length - 1 ? "default" : "pointer", opacity: currentIndex >= words.length - 1 ? 0.3 : 1, boxShadow: `0 4px 12px ${cat.color}44` }}>Next {"\u2192"}</button>
            </div>
            <button onClick={() => { setMode("category"); setCurrentIndex(0); }} style={{ marginTop: 20, background: "none", border: "none", color: "#888", cursor: "pointer", fontFamily: "'Nunito'", fontWeight: 700, fontSize: 14 }}>{"\u2190"} Back to {cat.name}</button>
          </div>
        )}

        {mode === "quiz" && word && (
          <div key={animKey} style={{ animation: "popIn 0.35s ease", textAlign: "center" }}>
            <div style={{ fontSize: 13, color: cat.color, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>{"\uD83C\uDFAF"} QUIZ — {currentIndex + 1} / {words.length}</div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.9)", borderRadius: 3, marginBottom: 24, overflow: "hidden" }}><div style={{ height: "100%", background: cat.color, borderRadius: 3, width: `${((currentIndex + 1) / words.length) * 100}%`, transition: "width 0.4s" }} /></div>
            <div style={{ ...glass, borderRadius: 28, padding: "32px 20px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
              <div style={{ fontSize: 60, marginBottom: 12 }}>{word.emoji}</div>
              <div style={{ fontFamily: "'Fredoka'", fontSize: 28, color: "#2D1B4E", marginBottom: 4, fontWeight: 700 }}>{word.armenian} <SpeakerBtn text={word.armenian} /></div>
              <p style={{ color: "#888", marginBottom: 20, fontWeight: 600, fontSize: 14 }}>Which pronunciation is correct?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {quizOptions.map((opt, i) => {
                  const isC = opt === word.phonetic, isS = selectedAnswer === opt;
                  let bg = "rgba(255,255,255,0.85)", bor = "rgba(255,255,255,0.12)", col = "#2D1B4E";
                  if (selectedAnswer !== null) { if (isC) { bg = "rgba(40,167,69,0.15)"; bor = "#28A745"; col = "#1a7a32"; } else if (isS) { bg = "rgba(220,53,69,0.15)"; bor = "#DC3545"; col = "#b02a37"; } else { bg = "rgba(0,0,0,0.03)"; col = "#bbb"; } }
                  return (<button key={i} onClick={() => handleQuizAnswer(opt)} style={{ padding: "14px 20px", borderRadius: 14, background: bg, border: `2px solid ${bor}`, fontFamily: "'Nunito'", fontWeight: 700, fontSize: 17, color: col, cursor: selectedAnswer === null ? "pointer" : "default", transition: "all 0.2s", textAlign: "center" }}>{opt}{selectedAnswer !== null && isC ? " \u2705" : ""}{selectedAnswer !== null && isS && !isC ? " \u274C" : ""}</button>);
                })}
              </div>
            </div>
            <div style={{ marginTop: 16, padding: "8px 16px", background: "rgba(255,255,255,0.85)", borderRadius: 12, display: "inline-block" }}><span style={{ fontWeight: 700, color: cat.color, fontSize: 14 }}>Score: {score} / {currentIndex + (selectedAnswer !== null ? 1 : 0)}</span></div>
          </div>
        )}

        {mode === "results" && (
          <div style={{ animation: "popIn 0.5s ease" }}>
            <div style={{ ...glass, borderRadius: 28, padding: "40px 24px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)", textAlign: "center" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>{score === words.length ? "\uD83C\uDF89" : score >= words.length * 0.5 ? "\uD83C\uDF1F" : "\uD83D\uDCAA"}</div>
              <h2 style={{ fontFamily: "'Fredoka'", fontSize: 24, color: "#2D1B4E", marginBottom: 8 }}>{score === words.length ? "Perfect Score!" : score >= words.length * 0.5 ? "Great Job!" : "Keep Practicing!"}</h2>
              <div style={{ fontSize: 48, fontFamily: "'Fredoka'", fontWeight: 700, color: cat?.color, marginBottom: 8 }}>{score} / {words.length}</div>
              <p style={{ color: "#666", fontWeight: 600, marginBottom: 28 }}>{cat?.name} Quiz Complete</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="bh" onClick={() => startQuiz(selectedCategory)} style={{ padding: "14px 28px", background: cat?.color, color: "white", border: "none", borderRadius: 14, fontFamily: "'Fredoka'", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>{"\uD83D\uDD04"} Try Again</button>
                <button className="bh" onClick={goHome} style={{ padding: "14px 28px", background: "rgba(255,255,255,0.88)", color: "#666", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, fontFamily: "'Fredoka'", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>{"\uD83C\uDFE0"} Back Home</button>
              </div>
            </div>
          </div>
        )}

        {mode === "search" && (
          <div style={{ animation: "floatIn 0.4s ease" }}>
            <h2 style={{ fontFamily: "'Fredoka'", fontSize: 22, color: "white", marginBottom: 16 }}>{"\uD83D\uDD0D"} Word Lookup</h2>
            <input type="text" placeholder="Search English, Armenian, or phonetic..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: "100%", padding: "14px 18px", borderRadius: 16, border: "2px solid rgba(255,255,255,0.12)", fontFamily: "'Nunito'", fontSize: 16, fontWeight: 600, outline: "none", background: "rgba(255,255,255,0.85)", color: "#2D1B4E", marginBottom: 16 }} />
            <div style={{ fontSize: 13, color: "#888", marginBottom: 12, fontWeight: 600 }}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: "60vh", overflowY: "auto" }}>
              {filtered.length === 0 ? <div style={{ textAlign: "center", padding: 40, color: "#888", fontWeight: 600 }}>No results found {"\uD83D\uDE15"}</div> :
                filtered.map((w, i) => (
                  <div key={i} style={{ ...glass, borderRadius: 16, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 28, flexShrink: 0 }}>{w.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ fontFamily: "'Fredoka'", fontSize: 16, color: "#2D1B4E", fontWeight: 600 }}>{w.armenian}</span><SpeakerBtn text={w.armenian} /></div>
                      <div style={{ fontSize: 14, color: "#9B72CF", fontWeight: 700 }}>{w.phonetic}</div>
                      <div style={{ fontSize: 13, color: "#666", fontWeight: 600 }}>{w.english}</div>
                    </div>
                    <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: `${w.catColor}20`, color: w.catColor, fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>{w.category}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {mode === "alphabet" && (
          <div style={{ animation: "floatIn 0.4s ease" }}>
            <h2 style={{ fontFamily: "'Fredoka'", fontSize: 22, color: "white", marginBottom: 6 }}>{"\uD83D\uDD24"} Armenian Alphabet</h2>
            <p style={{ color: "#666", fontSize: 13, marginBottom: 16, fontWeight: 600 }}>39 letters — tap any letter to hear it</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(88px, 1fr))", gap: 10 }}>
              {alphabet.map((l, i) => (
                <div key={i} className="hov" onClick={() => speak(l.upper)} style={{ ...glass, borderRadius: 16, padding: "14px 8px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", animation: `floatIn 0.3s ease ${Math.min(i * 0.02, 0.5)}s both` }}>
                  <div style={{ fontFamily: "'Fredoka'", fontSize: 28, color: "#2D1B4E", fontWeight: 700, lineHeight: 1.2 }}>{l.upper} {l.lower}</div>
                  <div style={{ fontSize: 11, color: "#E85D75", fontWeight: 700, marginTop: 4 }}>{l.name}</div>
                  <div style={{ fontSize: 10, color: "#888", fontWeight: 600 }}>"{l.sound}"</div>
                  <div style={{ fontSize: 14, marginTop: 4 }}>{"\uD83D\uDD0A"}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
