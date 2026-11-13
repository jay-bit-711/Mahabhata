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

export const vanaChapters: Chapter[] = [
  {
    id: "exile",
    title: "Exile and the Divine Arsenal",
    scenes: [
      {
        id: "years",
        speaker: "The forest",
        emotion: "grief",
        place: "The forest",
        image: "/chronicle/beam.jpg",
        video: "/chronicle/beam.mp4",
        kala: 100,
        beats: [
          beat("whisper", "त्रयोदश।", "Thirteen years. The court becomes bark, river, and the memory of a laugh. Draupadi's hair stays open. Every morning is a summons.", "పదమూడేళ్ళు. సభ బెరడు, నది, ఒక నవ్వు జ్ఞాపకం అవుతుంది. ద్రౌపది జుట్టు విప్పి ఉంటుంది. ప్రతి ఉదయం పిలుపు.", { speaker: "The forest" }),
          beat("speak", "युधिष्ठिरः तप्यते।", "Yudhishthira counts the days like a man who still thinks time is a contract. Bhima counts them like a man waiting for a thigh. Arjuna leaves to find a weapon that can argue with fate.", "యుధిష్ఠిరుడు రోజులు లెక్కిస్తాడు. కాలం ఒప్పందమనుకునే మనిషిలా. భీముడు తొడ కోసం ఎదురుచూసే మనిషిలా. అర్జునుడు విధితో వాదించే ఆయుధం కోసం వెళ్తాడు.", { speaker: "The brothers" }),
          beat("whisper", "कृष्णः दूरम्।", "Krishna does not live in the hut. He does not need to. The forest is one of the squares he already crossed.", "కృష్ణుడు గుడిసెలో ఉండడు. అవసరం లేదు. అడవి అతడు ఇప్పటికే దాటిన చతురం.", {
            speaker: "Krishna",
            intent: line("अस्त्राणि युद्धं न जीविस्यन्ति। संकल्पः जीविष्यति।", "Weapons will not win this. The thing she refused to tie will.", "ఆయుధాలు గెలవవు. ఆమె కట్టడానికి నిరాకరించింది గెలుస్తుంది."),
          }),
        ],
      },
      {
        id: "shiva",
        speaker: "Arjuna",
        emotion: "still",
        place: "The mountain",
        image: "/chronicle/fire.jpg",
        video: "/chronicle/fire.mp4",
        kala: 100,
        game: {
          game: "astra",
          title: line("पाशुपतम्।", "The gate opens if the strike is true.", "దెబ్బ నిజమైతే తలుపు తెరుచుకుంటుంది."),
        },
        beats: [
          beat("speak", "शिवः किरातः।", "A hunter picks a quarrel over a boar. Arjuna does not know he is fighting the god he came to beg. That is how Shiva prefers to be approached: by someone too tired to flatter.", "ఒక వేటగాడు పందిపై పోట్లాడతాడు. అర్జునుడికి తెలియదు, తాను అడగడానికి వచ్చిన దేవుడితో పోరాడుతున్నానని. శివుడికి ఇష్టమైన సమీపం అది. పొగడ్తకు అలసిన వాడు.", { speaker: "Shiva" }),
          beat("boom", "पाशुपतम्।", "When the hunter is finished being a hunter, the mountain has a weapon with a person's name inside it. Pashupata. It is not a gift. It is a permission to end something that should have ended sooner.", "వేటగాడు వేటగాడిగా ఉండడం అయిపోయాక, కొండకు ఒక మనిషి పేరు ఉన్న ఆయుధం ఉంటుంది. పాశుపతం. బహుమతి కాదు. ఇంకా ముందే అయిపోవలసిన దాన్ని అంతం చేసే అనుమతి.", { speaker: "Shiva", shake: true }),
        ],
      },
      {
        id: "armor",
        speaker: "Indra",
        emotion: "sly",
        place: "The river at noon",
        image: "/chronicle/sauti.jpg",
        kala: 100,
        vows: [{ id: "karna-armor", name: "Kavacha and kundala", state: "snap" }],
        beats: [
          beat("whisper", "इन्द्रः भिक्षुः।", "Indra comes to Karna as a beggar, which is a cowardice dressed as a ritual. He asks for the armor born with the body, and the earrings that tell the sun.", "ఇంద్రుడు కర్ణుడి దగ్గర బిచ్చగాడిగా వస్తాడు. అది ఆచారంగా మారిన పిరికితనం. శరీరంతో పుట్టిన కవచం అడుగుతాడు. సూర్యుడిని చెప్పే కుండలాలు.", { speaker: "Indra" }),
          beat("speak", "कर्णः जानाति।", "Karna knows the brahmin. He knows the hour. He knows that generosity is the one crown nobody could vote away from him in that arena.", "కర్ణుడికి బ్రాహ్మణుడు ఎవరో తెలుసు. గంట తెలుసు. ఆ రంగంలో ఎవరూ ఓటేసి తీయలేని ఏకైక కిరీటం ఔదార్యమని తెలుసు.", { speaker: "Karna" }),
          beat("boom", "ददाति।", "He cuts the armor free. Blood follows the gold. He smiles, because a gift given in knowledge is the last thing that is only his.", "కవచాన్ని కోసి ఇస్తాడు. రక్తం బంగారం వెంట వస్తుంది. నవ్వుతాడు. తెలిసి ఇచ్చిన దానం తనది మాత్రమైన చివరి వస్తువు.", {
            speaker: "Karna",
            shake: true,
            emotion: "grief",
            intent: line("मित्राय जीवितम्। देवाय कवचम्। मह्यं किमपि न।", "My life was already given to a friend. The armor can go to a god. I was never going to keep myself.", "ప్రాణం ఇప్పటికే స్నేహితుడికి ఇచ్చేశాను. కవచం దేవుడికి పోవచ్చు. నన్ను నేను ఉంచుకోబోయేది కాదు."),
          }),
        ],
      },
    ],
  },
];
