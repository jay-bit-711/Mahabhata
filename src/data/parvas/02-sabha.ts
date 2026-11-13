import type { Beat, Chapter, Emotion, Line, Rite, Voice } from "@/lib/engine/types";

function line(sa: string, en: string, te: string): Line {
  return { sa, en, te };
}

function beat(
  voice: Voice,
  sa: string,
  en: string,
  te: string,
  extra?: { speaker?: string; emotion?: Emotion; shake?: boolean; intent?: Line; rite?: Rite; holdMs?: number },
): Beat {
  return { voice, line: line(sa, en, te), ...extra };
}

export const sabhaChapters: Chapter[] = [
  {
    id: "maya",
    title: "Maya Sabha and the Laugh",
    scenes: [
      {
        id: "built",
        speaker: "Maya",
        emotion: "sly",
        place: "Indraprastha",
        image: "/chronicle/satra.jpg",
        kala: 92,
        beats: [
          beat("whisper", "मयः।", "An asura who owes them a life builds a hall that owes the eye an apology. Crystal reads as water. Water reads as floor. Marble learns to lie.", "ప్రాణం అప్పు ఉన్న రాక్షసుడు కన్నుకు క్షమాపణ చెప్పే సభ కడతాడు. స్ఫటికం నీళ్లలా. నీళ్లు నేలలా. పాలరాయి అబద్ధం నేర్చుకుంటుంది.", { speaker: "Maya" }),
          beat("speak", "इन्द्रप्रस्थम्।", "Yudhishthira calls it a wonder. Krishna walks through it without stumbling, which is its own kind of rudeness.", "యుధిష్ఠిరుడు దీన్ని వింత అంటాడు. కృష్ణుడు తడబడకుండా నడుస్తాడు. అది ఒక రకమైన మొరటుతనం.", {
            speaker: "Krishna",
            intent: line("अहं फर्शं जानामि। सः न।", "I know which floor is a floor. He will not. That is the point I will not enjoy, and will not stop.", "ఏ నేల నేలో నాకు తెలుసు. అతనికి తెలియదు. నేను ఆనందించను. ఆపను."),
          }),
        ],
      },
      {
        id: "pool",
        speaker: "Duryodhana",
        emotion: "wrath",
        place: "Indraprastha",
        image: "/chronicle/beam.jpg",
        kala: 93,
        beats: [
          beat("speak", "सः पतितां।", "Duryodhana steps where the floor shines and finds water. He lifts his robe where the floor is stone and finds nothing. The hall was built to make a proud man absurd.", "దుర్యోధనుడు మెరిసే నేలపై అడుగు పెట్టి నీళ్లు కనుక్కుంటాడు. రాయిపై బట్ట ఎత్తుతాడు. ఏమీ లేదు. గర్విష్ఠుడిని హాస్యాస్పదం చేయడానికి సభ కట్టబడింది.", { speaker: "Duryodhana" }),
          beat("boom", "अन्धस्य पुत्रः।", "Someone laughs. The sentence that survives is worse than the fall: the blind son of a blind man. He hears it with both ears. He will keep it longer than the bruise.", "ఎవరో నవ్వుతారు. పడడం కంటే మిగిలే వాక్యం చెడ్డది. అంధుడి కొడుకు. అతడు రెండు చెవులతో వింటాడు. గాయం కంటే ఎక్కువ కాలం ఉంచుకుంటాడు.", { speaker: "The hall", shake: true }),
          beat("whisper", "दहति।", "He does not shout. A man who will burn a world rarely wastes the first fire on a room.", "అతడు అరవడు. లోకాన్ని కాల్చే మనిషి మొదటి మంటను ఒక గదిపై వృథా చేయడు.", {
            speaker: "Duryodhana",
            intent: line("एषा सभा मम चिता।", "This hall is my pyre. I will make them sit in it.", "ఈ సభ నా చితి. వారిని ఇందులో కూర్చోబెడతాను."),
          }),
        ],
      },
    ],
  },
  {
    id: "trap",
    title: "Dharma as a Trap",
    scenes: [
      {
        id: "lure",
        speaker: "Shakuni",
        emotion: "sly",
        place: "Hastinapura",
        image: "/chronicle/sauti.jpg",
        kala: 95,
        vows: [{ id: "shakuni-oath", name: "Shakuni's oath", state: "strain" }],
        beats: [
          beat("whisper", "आह्वानम्।", "The invitation is warm. Uncle to nephew. A friendly game, a family hall, no army at the door. Shakuni has learned that courtesy is the quietest weapon.", "ఆహ్వానం వెచ్చగా ఉంది. మామ నుంచి మేనల్లుడికి. స్నేహపు ఆట. తలుపు దగ్గర సైన్యం లేదు. మర్యాద నిశ్శబ్ద ఆయుధమని శకుని నేర్చుకున్నాడు.", { speaker: "Shakuni" }),
          beat("speak", "युधिष्ठिरस्य दोषः।", "He does not aim at Yudhishthira's greed. Greed can be shamed. He aims at the code: a kshatriya does not refuse a kinsman's game. Honor, used as a hook.", "అతడు యుధిష్ఠిరుడి దురాశను గురి పెట్టడు. దురాశను సిగ్గుపరచవచ్చు. అతడు నియమాన్ని గురి పెడతాడు. బంధువు ఆటను క్షత్రియుడు నిరాకరించడు. గౌరవం గాలంగా.", { speaker: "Shakuni" }),
          beat("whisper", "अक्षाः।", "The dice love him. That is not magic. That is a man who has been hungry long enough to carve hunger into bone.", "పాచికలు అతన్ని ప్రేమిస్తాయి. మంత్రం కాదు. ఆకలి ఎముకలో చెక్కేంత కాలం ఆకలితో ఉన్న మనిషి.", {
            speaker: "Shakuni",
            intent: line("धर्मः एनं आनेष्यति। अहं केवलं द्वारं।", "His dharma will walk him in. I only hold the door, and smile like an uncle.", "అతని ధర్మమే అతన్ని లోపలికి నడిపిస్తుంది. నేను తలుపు పట్టుకుని మామలా నవ్వుతాను."),
          }),
        ],
      },
      {
        id: "flaw",
        speaker: "Yudhishthira",
        emotion: "grief",
        place: "The road",
        image: "/chronicle/beam.jpg",
        kala: 96,
        beats: [
          beat("speak", "सः जानाति।", "Yudhishthira knows the dice. He knows the uncle. He goes anyway, because a clean refusal would be called fear, and he would rather be ruined than renamed.", "యుధిష్ఠిరుడికి పాచికలు తెలుసు. మామ తెలుసు. అయినా వెళ్తాడు. శుభ్రమైన నిరాకరణను భయమంటారు. పేరు మారడం కంటే పాడవడం మేలనుకుంటాడు.", { speaker: "Yudhishthira" }),
          beat("whisper", "व्यसनम्।", "Hold the lens. It is not only law. The bones sing to him. A righteous man can be addicted and still call the addiction duty.", "కటకం పట్టు. చట్టం మాత్రమే కాదు. ఎముకలు అతనికి పాడతాయి. ధర్మవంతుడు బానిస అయి దాన్ని విధి అనవచ్చు.", {
            speaker: "Yudhishthira",
            intent: line("यदि न गच्छामि, भीतः। यदि गच्छामि, नष्टः। भीतः शब्दः नष्टात् क्रूरः।", "If I stay, I am a coward. If I go, I am lost. Coward is the crueler word. That is how he owns me.", "ఉంటే పిరికి. వెళ్తే పోయినవాడు. పిరికి మాట క్రూరం. అలా అతడు నన్ను సొంతం చేసుకుంటాడు."),
          }),
        ],
        choices: [
          {
            id: "sit",
            label: line("उपविश।", "Sit. A kshatriya does not walk out.", "కూర్చో. క్షత్రియుడు బయటకు నడవడు."),
            note: line("पाशः।", "The code holds. So does the trap built in its shape.", "నియమం నిలుస్తుంది. దాని ఆకారంలో కట్టిన ఉచ్చు కూడా."),
            outcome: { dharma: -6 },
          },
          {
            id: "leave",
            label: line("प्रत्याख्येहि।", "Refuse the game. Let them say afraid.", "ఆటను నిరాకరించు. భయపడ్డాడని అననివ్వు."),
            note: line("जीवन्।", "You keep the kingdom a little longer. You lose the name you worship.", "రాజ్యం ఇంకాసేపు ఉంటుంది. నువ్వు పూజించే పేరు పోతుంది."),
            outcome: { dharma: 10 },
          },
        ],
      },
      {
        id: "cloth",
        speaker: "Shakuni",
        emotion: "sly",
        place: "Hastinapura",
        image: "/chronicle/fire.jpg",
        kala: 97,
        game: {
          game: "dice",
          title: line("द्यूतम्।", "The bones are already his.", "ఎముకలు ఇప్పటికే అతనివి."),
        },
        beats: [
          beat("boom", "क्षिप।", "The cloth is spread. Brothers, jewels, the hall, the living name of a king. Each throw asks for more, and the asking sounds like law.", "గుడ్డ పరచబడింది. తమ్ములు, నగలు, సభ, రాజు బతికి ఉన్న పేరు. ప్రతి విసురు ఇంకా అడుగుతుంది. అడగడం చట్టంలా వినిపిస్తుంది.", { speaker: "Shakuni", shake: true }),
        ],
      },
    ],
  },
  {
    id: "hair",
    title: "The Unbound Hair",
    scenes: [
      {
        id: "dragged",
        speaker: "Dushasana",
        emotion: "wrath",
        place: "The sabha",
        image: "/chronicle/satra.jpg",
        kala: 98,
        vows: [{ id: "bhishma-vow", name: "Bhishma's vow", state: "strain" }],
        beats: [
          beat("boom", "केशेषु।", "They drag her in by the hair. A queen, in one cloth, in her blood, into a hall of men who were taught every verse except the one that would make them stand.", "జుట్టు పట్టి లాగుతారు. ఒక వస్త్రంలో, రక్తంలో, ఒక రాణిని. నిలబడే శ్లోకం తప్ప అన్నీ నేర్చిన పురుషుల సభలోకి.", { speaker: "Dushasana", shake: true }),
          beat("whisper", "भीष्मः मौनः।", "Bhishma looks at the floor the vow built. He can fight gods. He cannot find a sentence that frees her without breaking the chain he put on himself as a boy.", "భీష్ముడు తాను కట్టిన నేలను చూస్తాడు. దేవతలతో పోరాడగలడు. పిల్లవాడిగా తనపై వేసుకున్న గొలుసు విరగకుండా ఆమెను విడిపించే వాక్యం దొరకదు.", {
            speaker: "Bhishma",
            intent: line("जानामि अधर्मम्। वचनं मां निगृहीतम्।", "I know this is adharma. My word has me by the throat. That was the price of the flowers.", "ఇది అధర్మమని తెలుసు. నా మాట నా గొంతు పట్టింది. పూల ధర అది."),
          }),
        ],
      },
      {
        id: "question",
        speaker: "Draupadi",
        emotion: "wrath",
        place: "The sabha",
        image: "/chronicle/sauti.jpg",
        kala: 99,
        beats: [
          beat("speak", "प्रश्नः।", "She does not beg first. She asks a legal question, because this room only understands blades that look like law. Was he already lost when he staked me? If he did not own himself, what did he stake?", "ఆమె ముందు బతిమాలదు. చట్టపు ప్రశ్న అడుగుతుంది. ఈ గదికి చట్టంలా కనిపించే కత్తులే అర్థం. అతడు నన్ను పందెం పెట్టేటప్పుడు ఇప్పటికే ఓడిపోయాడా? తనను తాను సొంతం చేసుకోలేకపోతే ఏమి పందెం పెట్టాడు?", { speaker: "Draupadi" }),
          beat("whisper", "द्रोणः।", "Drona studies his hands. The elders become very interested in technicalities. A woman's body is easier to discuss as property than as a person.", "ద్రోణుడు తన చేతులు చూస్తాడు. పెద్దలకు సాంకేతికతలపై ఆసక్తి పెరుగుతుంది. స్త్రీ శరీరాన్ని మనిషిగా కాక ఆస్తిగా చర్చించడం సులభం.", { speaker: "Drona" }),
          beat("whisper", "कृष्णः दूरतः।", "Krishna is not in the chair they think matters. He is in the inch between the cloth and the shame.", "కృష్ణుడు వారు ముఖ్యమనుకునే కుర్చీలో లేడు. వస్త్రానికీ సిగ్గుకూ మధ్య అంగుళంలో ఉన్నాడు.", {
            speaker: "Krishna",
            intent: line("वस्त्राणि अनन्तानि। सा तु प्रश्नं धारयति।", "The cloth can be endless. I will give her that. I will not give the hall its excuse. Let them see their own hands.", "వస్త్రం అనంతం కావచ్చు. అది ఆమెకు ఇస్తాను. సభకు సాకు ఇవ్వను. వారి చేతులు వారే చూసుకోవాలి."),
          }),
        ],
      },
      {
        id: "vastra",
        speaker: "Draupadi",
        emotion: "wrath",
        place: "The sabha",
        image: "/chronicle/fire.jpg",
        video: "/chronicle/fire.mp4",
        kala: 100,
        sakuga: "vastraharan",
        vows: [{ id: "draupadi-hair", name: "Draupadi's unbound hair", state: "lock" }],
        beats: [
          beat("boom", "वस्त्रम्।", "He pulls. The cloth should end. It does not. The hall wanted a body.", "అతడు లాగుతాడు. వస్త్రం అయిపోవాలి. అయిపోదు. సభకు ఒక శరీరం కావాలి.", {
            speaker: "The cloth",
            shake: true,
            rite: "shatter",
          }),
          beat("whisper", "न कृपा केवलम्।", "Length after length. He is not in the chair. He is in the inch that will not finish.", "వస్త్రం వస్త్రం వెనుక. అతడు కుర్చీలో లేడు. అయిపోని అంగుళంలో ఉన్నాడు.", {
            speaker: "Draupadi",
            rite: "silk",
            intent: line("सः रक्षति। अहं स्मरामि।", "He keeps the cloth on me. I keep the faces. Only one of those is mine.", "అతడు వస్త్రం ఉంచుతాడు. నేను ముఖాలు ఉంచుకుంటాను. నాది ఒక్కటే."),
          }),
          beat("boom", "रक्तेन बध्नामि।", "This hair stays open until it is washed in Dushasana's blood.", "దుశ్శాసనుడి రక్తంతో ఉదుకునే వరకు ఈ జుట్టు విప్పే ఉంటుంది.", {
            speaker: "Draupadi",
            shake: true,
            emotion: "wrath",
            rite: "hair",
            holdMs: 2800,
          }),
        ],
      },
    ],
  },
];
