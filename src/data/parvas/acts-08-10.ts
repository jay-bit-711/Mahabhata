import type { Beat, Chapter, Emotion, Line, Voice } from "@/lib/engine/types";

function line(sa: string, en: string, te: string): Line {
  return { sa, en, te };
}

function beat(
  voice: Voice,
  sa: string,
  en: string,
  te: string,
  extra?: { speaker?: string; emotion?: Emotion; shake?: boolean; intent?: Line },
): Beat {
  return { voice, line: line(sa, en, te), ...extra };
}

export const adiLater: Chapter[] = [
  {
    id: "strategist",
    title: "Enter the Strategist",
    scenes: [
      {
        id: "dwarka",
        speaker: "Krishna",
        emotion: "sly",
        place: "Dwaraka",
        image: "/chronicle/beam.jpg",
        video: "/chronicle/beam.mp4",
        kala: 82,
        beats: [
          beat("whisper", "द्वारका।", "The city sits on the sea as if a god got bored of forests. Krishna walks through it barefoot, greeting cowherds and kings with the same unhurried smile.", "నగరం సముద్రంపై కూర్చుంది. కృష్ణుడు నగ్నపాదంతో నడుస్తాడు. గొల్లవాడికీ రాజుకీ ఒకే నవ్వు.", { speaker: "Dwaraka" }),
          beat("speak", "सः जानाति।", "He already knows which cousin will beg, which will laugh, and which will call a crime a rule. The board is not in front of him. He is standing on it.", "ఏ బంధువు బతిమాలుతాడో, ఏవాడు నవ్వుతాడో, ఏవాడు నేరాన్ని నియమమంటాడో అతనికి తెలుసు. పలక అతని ముందు లేదు. అతడు దానిపై నిలబడ్డాడు.", { speaker: "Krishna" }),
          beat("whisper", "स्मितम्।", "Ask him what he is, and he will offer you butter. Ask him what happens next, and the smile does not change.", "అతడు ఎవరని అడిగితే వెన్న ఇస్తాడు. తరువాత ఏమవుతుందని అడిగితే నవ్వు మారదు.", {
            speaker: "Krishna",
            intent: line("अहं नेता न। अहं कालः मित्रवत्।", "I am not here to stop the fire. I am here to stand where it must burn, and to look like a friend while I do it.", "నేను మంట ఆపడానికి రాలేదు. అది కావలసిన చోట నిలబడతాను. స్నేహితుడిలా."),
          }),
        ],
      },
      {
        id: "board",
        speaker: "Krishna",
        emotion: "calm",
        place: "Hastinapura",
        image: "/chronicle/satra.jpg",
        kala: 84,
        beats: [
          beat("speak", "सः पश्यति।", "In the Kuru hall he bows lower than a prince should. Bhishma feels the old vow tighten, and does not know why a cowherd's courtesy feels like a verdict.", "కురు సభలో అతడు రాకుమారుడికి తగనంత వంగుతాడు. భీష్ముడికి పాత ప్రతిజ్ఞ బిగుస్తుంది. ఒక గొల్లవాడి మర్యాద తీర్పులా ఎందుకని తెలియదు.", { speaker: "The hall" }),
          beat("boom", "पञ्च ग्रामाः अपि न।", "He does not say the war yet. He counts it. Five villages would save them. They will not give five villages. He has known this since the ferryman's price.", "అతడు యుద్ధం ఇంకా చెప్పడు. లెక్కిస్తాడు. ఐదు ఊళ్ళు వారిని కాపాడేవి. ఇవ్వరు. పడవవాడి ధర నుంచే అతనికి తెలుసు.", { speaker: "Krishna", shake: true, intent: line("शकुनिः अपि गणयति। भिन्नं फलम्।", "Shakuni is counting too. He wants the house to eat itself. I want the eating to mean something.", "శకుని కూడా లెక్కిస్తున్నాడు. ఇల్లు తనను తాను తినాలని. ఆ తినడానికి అర్థం ఉండాలని నాకు.") }),
        ],
        choices: [
          {
            id: "trust",
            label: line("स्मिने विश्वसिहि।", "Trust the smile. Walk beside him.", "నవ్వును నమ్ము. అతని పక్కన నడువు."),
            note: line("मित्रम्।", "You gain a strategist. You do not gain innocence.", "నీకు ఒక వ్యూహకర్త దొరికాడు. అమాయకత్వం దొరకదు."),
            outcome: { dharma: 6, allies: ["Krishna"] },
          },
          {
            id: "ask",
            label: line("किं न वदसि।", "Ask what the smile is hiding.", "నవ్వు దాచేది అడుగు."),
            note: line("सः हसति।", "He tells you a softer truth, which is still a blade.", "అతడు మెత్తని నిజం చెబుతాడు. అదీ కత్తే."),
            outcome: { dharma: 4 },
          },
        ],
      },
    ],
  },
  {
    id: "matsya",
    title: "The Matsya Yantra",
    scenes: [
      {
        id: "fish",
        speaker: "The hall",
        emotion: "calm",
        place: "Kampilya",
        image: "/chronicle/sauti.jpg",
        kala: 86,
        beats: [
          beat("speak", "मत्स्यः भ्रमति।", "A fish spins above the court, and the target is not the fish. It is a turning eye, seen only in a pan of oil. Kings have come dressed to win a woman and a war.", "సభపై చేప తిరుగుతోంది. లక్ష్యం చేప కాదు. నూనెలో కనిపించే తిరిగే కన్ను. రాజులు ఒక స్త్రీనీ ఒక యుద్ధాన్నీ గెలవడానికి వచ్చారు.", { speaker: "The hall" }),
          beat("whisper", "द्रौपदी पश्यति।", "Draupadi watches from the fire she was born in. She is not a prize. She is the reason the prize exists, and she knows the difference.", "ద్రౌపది తాను పుట్టిన మంట దగ్గర నుంచి చూస్తోంది. ఆమె బహుమతి కాదు. బహుమతి ఉండడానికి కారణం. తేడా ఆమెకు తెలుసు.", {
            speaker: "Draupadi",
            intent: line("यो नेत्रं विध्यति, सः मम भारः।", "Whoever hits the eye inherits my fate. I hope he can carry it.", "కన్ను గుచ్చేవాడు నా విధిని వారసత్వంగా తీసుకుంటాడు. మోయగలడని ఆశ."),
          }),
        ],
      },
      {
        id: "eye",
        speaker: "Arjuna",
        emotion: "still",
        place: "Kampilya",
        image: "/chronicle/beam.jpg",
        kala: 88,
        beats: [
          beat("whisper", "ब्राह्मणः।", "A brahmin stands up. The kings laugh, because bark-cloth is not a dynasty. The laugh is the last easy sound in the hall.", "ఒక బ్రాహ్మణుడు లేస్తాడు. రాజులు నవ్వుతారు. నారబట్ట వంశం కాదు. ఆ నవ్వు సభలో చివరి సులభమైన శబ్దం.", { speaker: "The kings" }),
          beat("boom", "नेत्रम्।", "He does not look at the fish. He looks at the oil. The arrow goes through the eye as if the machine had been built for his hand.", "అతడు చేపను చూడడు. నూనెను చూస్తాడు. బాణం కన్ను గుండా పోతుంది. యంత్రం అతని చేతికోసం కట్టినట్టు.", { speaker: "Arjuna", shake: true }),
          beat("whisper", "कृष्णः न चक्षुः चलति।", "Krishna does not cheer. He closes his eyes once, the way a man checks a sum he already finished.", "కృష్ణుడు జైకొట్టడు. ఒకసారి కళ్ళు మూస్తాడు. ఇప్పటికే అయిపోయిన లెక్కను చూసినట్టు.", {
            speaker: "Krishna",
            intent: line("अर्जुनः बाणः। अहं धनुः न। अहं लक्ष्यम्।", "Arjuna is the arrow. I am not the bow. I am the reason the eye was spinning.", "అర్జునుడు బాణం. నేను విల్లు కాదు. కన్ను తిరగడానికి కారణం నేను."),
          }),
        ],
      },
      {
        id: "fury",
        speaker: "The kings",
        emotion: "wrath",
        place: "Kampilya",
        image: "/chronicle/fire.jpg",
        kala: 89,
        beats: [
          beat("boom", "क्षत्रियाः क्रुध्यन्ति।", "The rejected kings stand as one insult. A brahmin has taken what their armies came to claim. Steel comes out in a wedding hall.", "నిరాకరించబడిన రాజులు ఒకే అవమానంలా లేస్తారు. సైన్యాలు రావలసినది ఒక బ్రాహ్మణుడు తీసుకున్నాడు. పెళ్లి సభలో ఉక్కు బయటకు వస్తుంది.", { speaker: "The kings", shake: true }),
          beat("speak", "भीमः मुखम्।", "Bhima uproots a tree because the moment requires a joke and a threat. The balance of the land tilts toward five brothers who own nothing but a shot.", "భీముడు చెట్టు పెకలించుతాడు. ఈ క్షణానికి జోకూ బెదిరింపూ కావాలి. దేశపు త్రాసు, ఒకే బాణం ఉన్న ఐదుగురి వైపు వాలుతుంది.", { speaker: "Bhima" }),
        ],
      },
    ],
  },
  {
    id: "five",
    title: "Five Husbands, One Queen",
    scenes: [
      {
        id: "share",
        speaker: "Kunti",
        emotion: "calm",
        place: "The hut",
        image: "/chronicle/sauti.jpg",
        kala: 90,
        beats: [
          beat("whisper", "मातः।", "They come home laughing, the way boys do when they have survived a hall of kings. Arjuna calls from the door: Mother, see what we have brought.", "రాజుల సభను దాటిన పిల్లల్లా నవ్వుతూ ఇంటికి వస్తారు. అర్జునుడు తలుపు నుంచి పిలుస్తాడు. అమ్మా, మేము తెచ్చింది చూడు.", { speaker: "Arjuna" }),
          beat("speak", "विभजध्वम्।", "Kunti does not look up from the pot. Share it, she says, all of you, as you share everything. The sentence leaves her mouth innocent. It does not stay innocent.", "కుంతి కుండ దగ్గర నుంచి తలెత్తదు. పంచుకోండి, అందరూ, మీరు అన్నీ పంచుకున్నట్టు. వాక్యం అమాయకంగా బయటకు వస్తుంది. అమాయకంగా ఉండదు.", { speaker: "Kunti" }),
          beat("whisper", "शब्दः बन्धः।", "A mother's word, in this family, is heavier than a king's. They stand in the doorway with a wife, and a command that has no second meaning except the one that will ruin the easy story.", "ఈ వంశంలో తల్లి మాట రాజు మాట కంటే బరువు. తలుపులో భార్యతో నిలబడ్డారు. సులభమైన కథను పాడుచేసే అర్థం తప్ప రెండో అర్థం లేని ఆజ్ఞ.", {
            speaker: "Yudhishthira",
            intent: line("यदि खण्डयामि, माता मृषा। यदि पालये, धर्मः विदीर्यते।", "If I undo it, my mother lied. If I keep it, dharma tears. Both are true. I will choose the tear I can explain.", "విప్పితే అమ్మ అబద్ధం. ఉంచితే ధర్మం చినిగిపోతుంది. రెండూ నిజం. నేను వివరించగల చినుగును ఎంచుకుంటాను."),
          }),
        ],
      },
      {
        id: "quake",
        speaker: "Draupadi",
        emotion: "wrath",
        place: "The hut",
        image: "/chronicle/fire.jpg",
        kala: 91,
        beats: [
          beat("boom", "न पञ्च।", "She did not rise from the fire to be divided like alms. The first answer is no. It fills the hut.", "దానంలా పంచబడటానికి మంటలోంచి లేవలేదు. మొదటి జవాబు కాదు. అది గుడిసె నిండుతుంది.", { speaker: "Draupadi", shake: true }),
          beat("speak", "यथाविधि।", "Then the elders arrive with verses, because this house cures an earthquake with a citation. Vyasa gives the marriage a past life so the present can pretend it was always legal.", "తరువాత పెద్దలు శ్లోకాలతో వస్తారు. ఈ ఇల్లు భూకంపాన్ని ఉల్లేఖనతో నయం చేస్తుంది. వ్యాసుడు పెళ్లికి పూర్వజన్మ ఇస్తాడు. వర్తమానం చట్టబద్ధమైనట్టు నటించేందుకు.", { speaker: "Vyasa" }),
          beat("whisper", "सा स्वीकरोति।", "Draupadi accepts. Not because the verse convinced her. Because the alternative is a mother made false, and five men who would call that righteousness.", "ద్రౌపది ఒప్పుకుంటుంది. శ్లోకం ఒప్పించింది కాదు. లేకపోతే తల్లి అబద్ధం అవుతుంది. ఐదుగురు దాన్ని ధర్మమంటారు.", {
            speaker: "Draupadi",
            intent: line("अहं भार्या भविष्यामि। अहं क्षमा न।", "I will be a wife five times. I will not be forgiven for it, and I will not forgive first.", "ఐదుసార్లు భార్యనవుతాను. నన్ను క్షమించరు. నేను ముందు క్షమించను."),
          }),
        ],
        choices: [
          {
            id: "word",
            label: line("मातुर्वाक्यं पालय।", "Keep the mother's word. Break the ordinary law.", "తల్లి మాట పాటించు. సాధారణ చట్టాన్ని విరుగగొట్టు."),
            note: line("कम्पः।", "The marriage stands. So does the scandal that will be used against her.", "పెళ్లి నిలుస్తుంది. ఆమెపై వాడే అవమానం కూడా."),
            outcome: { dharma: 5 },
          },
          {
            id: "one",
            label: line("एकस्मै देहि।", "Give her one husband. Let the word fall.", "ఒక భర్తను ఇవ్వు. మాట పడనివ్వు."),
            note: line("मातृहीनम्।", "Cleaner to the world. A crack in the only law this family still fears.", "లోకానికి శుభ్రం. ఈ వంశం ఇంకా భయపడే ఏకైక చట్టంలో పగులు."),
            outcome: { dharma: -4 },
          },
        ],
      },
    ],
  },
];
