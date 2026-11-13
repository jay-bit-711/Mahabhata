export type Lang = "sa" | "en" | "te" | "all";
export type Mode = "film" | "page" | "tale" | "text";

export type Line = { sa: string; en: string; te: string };

export type Choice = {
  id: string;
  label: Line;
  dharma: number;
  xp: number;
  note: Line;
};

export type Beat = {
  id: string;
  place: string;
  visual: string;
  image: string;
  video?: string;
  text: Line;
  xp: number;
  choice?: { prompt: Line; options: Choice[] };
};

export const ACTS = [
  {
    id: "naimisha",
    index: "I",
    title: "The Hearing",
    phase: "Naimisha",
    blurb: "A narrator arrives. What he is willing to tell sets the weight of the whole epic.",
    open: true,
  },
  {
    id: "lac",
    index: "II",
    title: "House of Lac",
    phase: "Exile",
    blurb: "Intrigue, fire, and the first alliances. Opens after the hearing is complete.",
    open: false,
  },
  {
    id: "dice",
    index: "III",
    title: "The Dice Hall",
    phase: "Hastinapura",
    blurb: "A wager you cannot win cleanly. Stakes, silence, and when to stop.",
    open: false,
  },
  {
    id: "war",
    index: "IV",
    title: "Kurukshetra",
    phase: "The field",
    blurb: "Day by day. Formations, stamina, and the cost of each order.",
    open: false,
  },
] as const;

export const PLACES = [
  { id: "naimisha", name: "Naimisha", note: "The twelve-year satra", now: true },
  { id: "varanavata", name: "Varanavata", note: "The lac house", now: false },
  { id: "indraprastha", name: "Indraprastha", note: "The new court", now: false },
  { id: "hastinapura", name: "Hastinapura", note: "The dice hall", now: false },
  { id: "virata", name: "Matsya", note: "The hidden year", now: false },
  { id: "kuru", name: "Kurukshetra", note: "The field", now: false },
];

export const BEATS: Beat[] = [
  {
    id: "mangala",
    place: "Naimisha",
    visual: "A thin gold beam cuts a dark forest. Fire is still far off.",
    image: "/chronicle/beam.jpg",
    video: "/chronicle/beam.mp4",
    xp: 25,
    text: {
      sa: "नारायणं नमस्कृत्य नरं चैव नरोत्तमम्।\nदेवीं सरस्वतीं चैव ततो जयमुदीरयेत्॥",
      en: "Bow first to Narayana, to Nara the best of men, and to Sarasvati. Only then speak the name Jaya.",
      te: "నారాయణునికి, నరోత్తముడైన నరునికి, సరస్వతికి నమస్కరించి తరువాతనే జయమును పలకాలి.",
    },
  },
  {
    id: "satra",
    place: "Naimisha",
    visual: "Sages sit in a wide ring. The sacrifice has already lasted years.",
    image: "/chronicle/satra.jpg",
    xp: 0,
    text: {
      sa: "नैमिषे सुनियताः सनकादयः।",
      en: "In Naimisha, Kulapati Shaunaka’s twelve-year sacrifice holds the sages still. They are not waiting for entertainment. They are waiting for a true account.",
      te: "నైమిషంలో శౌనకుని పన్నెండేళ్ళ సత్రం నడుస్తోంది. మహర్షులు కథ కోసం కాదు, నిజమైన వృత్తాంతం కోసం కూర్చున్నారు.",
    },
    choice: {
      prompt: {
        sa: "कथं प्रविशेत् सौतिः?",
        en: "How does Sauti enter?",
        te: "సౌతి ఎలా ప్రవేశిస్తాడు?",
      },
      options: [
        {
          id: "bow",
          dharma: 18,
          xp: 20,
          label: { sa: "प्रणम्य तिष्ठ", en: "Bow, and wait to be asked", te: "నమస్కరించి, అడిగే వరకు ఆగు" },
          note: {
            sa: "विनयः धर्मः।",
            en: "Humility keeps the hearing clean.",
            te: "వినయం వినికిడిని నిక్కముగా ఉంచుతుంది.",
          },
        },
        {
          id: "rush",
          dharma: -18,
          xp: 30,
          label: { sa: "अनृतं मास्तु — शीघ्रं वद", en: "Begin before they ask", te: "అడగకముందే మొదలుపెట్టు" },
          note: {
            sa: "शीघ्रता यशं ददाति, श्रद्धां न।",
            en: "Speed wins the room. It spends trust.",
            te: "వేగం సభను గెలుస్తుంది. నమ్మకాన్ని ఖర్చు చేస్తుంది.",
          },
        },
      ],
    },
  },
  {
    id: "sauti",
    place: "Naimisha",
    visual: "Ugrasrava, son of Lomaharshana, dust still on his feet.",
    image: "/chronicle/sauti.jpg",
    xp: 25,
    text: {
      sa: "लौमहर्षणिपुत्र उग्रश्रवा।",
      en: "Ugrasrava, a Sauti trained in the Puranas, comes in on foot. He knows the shape of the Bharata. He has not yet decided how much of its shame he will carry into the circle.",
      te: "లోమహర్షణి పుత్రుడు ఉగ్రశ్రవస్సు కాలినడకన వస్తాడు. భారత రూపం అతనికి తెలుసు. అవమానాన్ని ఎంత వరకు చెప్పాలో ఇంకా నిర్ణయించలేదు.",
    },
  },
  {
    id: "ask",
    place: "Naimisha",
    visual: "One sage lifts a hand. The fire answers before anyone speaks.",
    image: "/chronicle/fire.jpg",
    video: "/chronicle/fire.mp4",
    xp: 0,
    text: {
      sa: "कथय भारतम्।",
      en: "They welcome him, then ask for the history of the Bharatas — not the pleasant parts, the whole war of a family.",
      te: "వారు స్వాగతం పలికి భారత వంశపు చరిత్ర అడుగుతారు. ఇంపైన భాగాలు కాదు. ఒక కుటుంబపు యుద్ధం మొత్తం.",
    },
    choice: {
      prompt: {
        sa: "किं कथयिष्यसि?",
        en: "What will you tell them?",
        te: "నువ్వు వారికి ఏమి చెబుతావు?",
      },
      options: [
        {
          id: "truth",
          dharma: 24,
          xp: 30,
          label: { sa: "सत्यं सर्वं", en: "The whole truth, including the fall", te: "పతనంతో సహా సత్యమంతా" },
          note: {
            sa: "धर्मः गुरुः।",
            en: "The chronicle stays heavy, and honest.",
            te: "చరిత్ర బరువుగా, నిజాయితీగా ఉంటుంది.",
          },
        },
        {
          id: "glory",
          dharma: -22,
          xp: 20,
          label: { sa: "यश एव", en: "Only the glory of the victors", te: "విజేతల కీర్తి మాత్రమే" },
          note: {
            sa: "यशः लघु, किं तु खण्डितम्।",
            en: "The tale is easier to love, and missing its spine.",
            te: "కథ ప్రేమించడం సులభం. వెన్నెముక లేదు.",
          },
        },
      ],
    },
  },
];

export const LEVEL_XP = 100;
