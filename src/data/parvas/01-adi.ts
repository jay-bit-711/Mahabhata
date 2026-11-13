import type { Beat, Chapter, Emotion, Line, Rite, Voice, VowMark } from "@/lib/engine/types";

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

const vowLock: VowMark = { id: "bhishma-vow", name: "Bhishma's vow", state: "lock" };

export const adiChapters: Chapter[] = [
  {
    id: "vow",
    title: "The Terrible Vow",
    scenes: [
      {
        id: "price",
        speaker: "The ferryman",
        emotion: "sly",
        place: "The river",
        image: "/chronicle/beam.jpg",
        video: "/chronicle/beam.mp4",
        kala: 6,
        beats: [
          beat("whisper", "दशरथस्य पुत्रः नास्ति।", "Shantanu wants the girl in the boat. He is a king. That should be enough. It is not.", "శంతనుడికి పడవలోని అమ్మాయి కావాలి. రాజు. అది చాలాలి. చాలదు.", { speaker: "The river" }),
          beat("speak", "दासः शर्तं वदति।", "Her father is a ferryman, and he names a price no crown can pay: my grandson will sit the throne. Not yours. Not your son's.", "తండ్రి ఓ పడవవాడు. అతని ధరను కిరీటం కొనలేదు. సింహాసనం నా మనవడిది. నీ కొడుకుది కాదు.", { speaker: "Dasharaja" }),
          beat("whisper", "देवव्रतः शृणोति।", "Devavrata hears it from the far bank. He is the son who would have been king. He understands the sentence before it is spoken.", "దేవవ్రతుడు ఆవలి ఒడ్డున వింటాడు. రాజు కాబోయే కొడుకు. వాక్యం పలకకముందే అర్థం చేసుకుంటాడు.", {
            speaker: "Devavrata",
            intent: line("प्रतिज्ञा जन्मं गृह्णाति।", "If I do not say it, the king rots. If I say it, the kingdom does.", "నేను చెప్పకపోతే రాజు కుళ్ళిపోతాడు. చెబితే రాజ్యం."),
          }),
        ],
      },
      {
        id: "spoken",
        speaker: "Devavrata",
        emotion: "still",
        place: "Hastinapura",
        image: "/chronicle/satra.jpg",
        kala: 12,
        vows: [vowLock],
        beats: [
          beat("speak", "राज्यं त्यजामि।", "He gives away the throne in a clear voice, so the ferryman can count it.", "సింహాసనాన్ని స్పష్టమైన స్వరంతో వదులుతాడు. పడవవాడు లెక్క పెట్టేంత స్పష్టంగా.", { speaker: "Devavrata" }),
          beat("boom", "ब्रह्मचर्यम्।", "Then the rest. No wife. No son. No one who could ever ask for the throne he just set down.", "తరువాత మిగిలింది. భార్య లేదు. కొడుకు లేదు. తాను వదిలిన సింహాసనం అడిగే వాడు లేడు.", {
            speaker: "Devavrata",
            shake: true,
            emotion: "wrath",
            rite: "vow",
            holdMs: 2600,
          }),
          beat("whisper", "देवाः पुष्पाणि वर्षन्ति।", "Flowers fall. The court calls it divine. The flowers do not know they are burying a future.", "పూలు రాలుతాయి. సభ దైవికమంటుంది. పూలకు తెలియదు, ఒక భవిష్యత్తును పూడుస్తున్నాయని.", {
            speaker: "The court",
            intent: line("कालः प्रथमं पदं नयति।", "This is the first step of the clock. Everything after is interest.", "ఇది గడియారపు మొదటి అడుగు. తరువాతదంతా వడ్డీ."),
          }),
        ],
      },
      {
        id: "bind",
        speaker: "Bhishma",
        emotion: "grief",
        place: "Hastinapura",
        image: "/chronicle/sauti.jpg",
        kala: 14,
        vows: [vowLock],
        beats: [
          beat("speak", "पिता रोदिति।", "Shantanu weeps, and grants his son the power to choose his own death. A kindness. Also a weapon with no sheath.", "శంతనుడు ఏడుస్తాడు. కొడుకుకు తన మరణం తానే ఎంచుకునే శక్తి ఇస్తాడు. దయ. ఒర లేని ఆయుధం కూడా.", { speaker: "Shantanu" }),
          beat("whisper", "भीष्मः जातः।", "They stop calling him Devavrata. The terrible one. He wears the name like armor he cannot take off.", "అతన్ని దేవవ్రతుడని పిలవడం ఆపుతారు. భీష్ముడు. ఆ పేరు తీయలేని కవచం.", { speaker: "The court" }),
        ],
        choices: [
          {
            id: "hold",
            label: line("प्रतिज्ञां धारय", "Hold the vow. The king must not break.", "ప్రతిజ్ఞను పట్టుకో. రాజు విరగకూడదు."),
            note: line("शृङ्खला।", "The chain locks. It will outlive everyone who cheered.", "గొలుసు బిగుస్తుంది. జైకొట్టిన వారందరి కన్నా ఎక్కువ కాలం ఉంటుంది."),
            outcome: { dharma: 8 },
          },
          {
            id: "break",
            label: line("त्वं जीव।", "Refuse. Let the marriage fail. Stay a son.", "నిరాకరించు. పెళ్లి ఆగనివ్వు. కొడుకుగా ఉండు."),
            note: line("राज्यं स्खलति।", "The court will call you selfish. The clock slows.", "సభ నిన్ను స్వార్థి అంటుంది. గడియారం నెమ్మదిస్తుంది."),
            outcome: { dharma: -6 },
          },
        ],
      },
    ],
  },
  {
    id: "amba",
    title: "Fire and Ashes of Amba",
    scenes: [
      {
        id: "left",
        speaker: "Amba",
        emotion: "wrath",
        place: "Kashi",
        image: "/chronicle/fire.jpg",
        kala: 20,
        vows: [{ id: "bhishma-vow", name: "Bhishma's vow", state: "strain" }],
        beats: [
          beat("speak", "अम्बा त्यक्ता।", "He stole three princesses for his brother. Two can be married. Amba cannot. She already chose a man, and that man will not take a woman Bhishma touched.", "తమ్ముడి కోసం ముగ్గురు రాకుమార్తెలను ఎత్తుకెళ్తాడు. ఇద్దరికి పెళ్లి అవుతుంది. అంబకు కాదు. ఆమె ఎంచుకున్నవాడు, భీష్ముడు తాకిన స్త్రీని తీసుకోడు.", { speaker: "Amba" }),
          beat("boom", "न भार्या। न मुक्ता।", "The vow that saved a marriage has made a woman neither wife nor free.", "ఒక పెళ్లిని కాపాడిన ప్రతిజ్ఞ ఒక స్త్రీని భార్యగా కాక, స్వేచ్ఛగా కాకుండా చేసింది.", { speaker: "Amba", shake: true }),
          beat("whisper", "सः मौनं धरति।", "Bhishma has an answer for armies. He has none for her. Silence, from him, is just another law.", "భీష్ముడికి సైన్యాలకు జవాబుంది. ఆమెకు లేదు. అతని మౌనం ఇంకో చట్టం.", {
            speaker: "Bhishma",
            intent: line("जानामि। एषा मां हनिष्यति।", "I know she will be the one who ends me. Not today.", "ఆమె నన్ను అంతం చేస్తుందని తెలుసు. ఈరోజు కాదు."),
          }),
        ],
      },
      {
        id: "guru",
        speaker: "Parashurama",
        emotion: "wrath",
        place: "Kurukshetra, before it has the name",
        image: "/chronicle/satra.jpg",
        kala: 24,
        beats: [
          beat("speak", "गुरोः युद्धम्।", "She goes to his teacher. Parashurama raises the axe for a pupil who will not break. They fight until the sky is tired of them.", "ఆమె అతని గురువు దగ్గరకు వెళ్తుంది. పరశురాముడు గొడ్డలి ఎత్తుతాడు. విడవని శిష్యుడి కోసం. ఆకాశం విసిగే వరకు పోరాడతారు.", { speaker: "Parashurama" }),
          beat("whisper", "न जयः।", "No one wins. A vow against a vow is not a war. It is a locked door with two keys that do not turn.", "ఎవరూ గెలవరు. ప్రతిజ్ఞకు ప్రతిజ్ఞ యుద్ధం కాదు. తిరగని రెండు తాళాల తలుపు.", { speaker: "The field" }),
        ],
      },
      {
        id: "pyre-amba",
        speaker: "Amba",
        emotion: "wrath",
        place: "The pyre",
        image: "/chronicle/fire.jpg",
        video: "/chronicle/fire.mp4",
        kala: 28,
        sakuga: "pyre",
        vows: [{ id: "amba-return", name: "Amba's return", state: "lock" }],
        beats: [
          beat("whisper", "अग्निः।", "She builds her own fire, because the men have run out of courts.", "పురుషులకు సభలు అయిపోయాయి కాబట్టి ఆమె తన మంటను తానే కడుతుంది.", { speaker: "Amba" }),
          beat("boom", "शिखण्डी भविष्यामि।", "I will come back as the thing your vow cannot raise a weapon against. Remember the face. It will be wearing another name.", "నీ ప్రతిజ్ఞ ఆయుధం ఎత్తలేని రూపంలో తిరిగి వస్తాను. ఈ ముఖం గుర్తుంచుకో. పేరు మారి ఉంటుంది.", { speaker: "Amba", shake: true }),
        ],
      },
    ],
  },
  {
    id: "throne",
    title: "The Blind Throne",
    scenes: [
      {
        id: "passed",
        speaker: "Dhritarashtra",
        emotion: "grief",
        place: "Hastinapura",
        image: "/chronicle/sauti.jpg",
        kala: 32,
        beats: [
          beat("whisper", "अन्धः।", "The elder son is born in the dark. The court is gentle about it. Gentleness is how a theft is made polite.", "పెద్ద కొడుకు చీకట్లో పుడతాడు. సభ మృదువుగా మాట్లాడుతుంది. మృదుత్వం దొంగతనాన్ని మర్యాద చేస్తుంది.", { speaker: "The court" }),
          beat("speak", "युवराजः कनिष्ठः।", "The younger brother, Pandu, takes the throne. Dhritarashtra blesses him. The blessing has a stone in it.", "తమ్ముడు పాండురాజు సింహాసనం ఎక్కుతాడు. ధృతరాష్ట్రుడు దీవిస్తాడు. ఆ దీవెనలో రాయి ఉంది.", {
            speaker: "Dhritarashtra",
            intent: line("अहं शृणोमि। अहं न पश्यामि। अहं स्मरामि।", "I hear who sits. I do not see it. I will not forget.", "ఎవరు కూర్చున్నారో వింటాను. కనిపించదు. మర్చిపోను."),
          }),
        ],
      },
      {
        id: "cloth",
        speaker: "Gandhari",
        emotion: "still",
        place: "Gandhara",
        image: "/chronicle/beam.jpg",
        kala: 36,
        vows: [{ id: "gandhari-blind", name: "Gandhari's blindfold", state: "lock" }],
        beats: [
          beat("speak", "पटः।", "Gandhari is brought to a blind husband. She asks for a cloth, and ties it herself.", "గాంధారిని అంధుడైన భర్త దగ్గరకు తెస్తారు. ఆమె గుడ్డ అడుగుతుంది. తానే కడుతుంది.", { speaker: "Gandhari" }),
          beat("whisper", "न दया केवलम्।", "The court calls it devotion. Hold the lens. It is also a refusal to see what this house will do.", "సభ దాన్ని భక్తి అంటుంది. కటకం పట్టు. ఈ ఇల్లు చేయబోయేది చూడకపోవడం కూడా.", {
            speaker: "Gandhari",
            intent: line("यदि सः अन्धः, अहम् अपि।", "If he is refused the world, I refuse it with him. Let no one call me lucky.", "అతనికి లోకం లేకపోతే నాకూ వద్దు. నన్ను అదృష్టవంతురాలని ఎవరూ అనకూడదు."),
          }),
        ],
      },
      {
        id: "bones",
        speaker: "Shakuni",
        emotion: "sly",
        place: "Gandhara",
        image: "/chronicle/satra.jpg",
        kala: 40,
        vows: [{ id: "shakuni-oath", name: "Shakuni's oath", state: "lock" }],
        beats: [
          beat("whisper", "अस्थीनि।", "In Gandhara the grain ran out first. Then the brothers. Shakuni remembers the order. Hunger is a very precise teacher.", "గాంధారంలో ముందు ధాన్యం అయిపోయింది. తరువాత అన్నదమ్ములు. శకునికి క్రమం గుర్తుంది. ఆకలి ఖచ్చితమైన గురువు.", { speaker: "Shakuni" }),
          beat("speak", "सः स्मितं करोति।", "He comes to Hastinapura smiling, a loving uncle with dice in his sleeve. The smile is warm. The math underneath is not.", "అతడు హస్తినాపురానికి నవ్వుతూ వస్తాడు. చేతిలో పాచికలు. నవ్వు వెచ్చగా ఉంటుంది. లోపలి లెక్క వెచ్చగా ఉండదు.", { speaker: "Shakuni" }),
          beat("boom", "कुलं कुलं खादति।", "I will not burn your city. I will teach it to eat itself.", "నేను మీ నగరాన్ని కాల్చను. అది తనను తాను తినేలా నేర్పుతాను.", {
            speaker: "Shakuni",
            shake: true,
            intent: line("कृष्णः अपि एतां क्रीडां पश्यति।", "Somewhere a cowherd is already watching this game. He has not moved a piece. He does not need to.", "ఎక్కడో ఒక గొల్లవాడు ఈ ఆట చూస్తున్నాడు. పావు కదపలేదు. అవసరం లేదు."),
          }),
        ],
      },
    ],
  },
  {
    id: "rivals",
    title: "Rivals of Fate",
    scenes: [
      {
        id: "arena",
        speaker: "The arena",
        emotion: "calm",
        place: "Rangabhoomi",
        image: "/chronicle/sauti.jpg",
        kala: 44,
        beats: [
          beat("speak", "धनुः।", "The boys are shown to the city like weapons. Arjuna splits the target until the target is embarrassed to exist.", "పిల్లలను ఆయుధాల్లా నగరానికి చూపిస్తారు. అర్జునుడు లక్ష్యాన్ని చీలుస్తాడు. లక్ష్యానికే సిగ్గు వేస్తుంది.", { speaker: "The arena" }),
          beat("whisper", "द्वारं स्फुटति।", "Then the gate opens on a man the invitation forgot. Gold in his ears. Sun on his throat. He asks for a turn.", "తలుపు తెరుచుకుంటుంది. ఆహ్వానం మర్చిపోయిన మనిషి. చెవుల్లో బంగారం. గొంతుపై సూర్యుడు. ఒక అవకాశం అడుగుతాడు.", { speaker: "Karna" }),
        ],
      },
      {
        id: "birth",
        speaker: "Kripa",
        emotion: "sly",
        place: "Rangabhoomi",
        image: "/chronicle/beam.jpg",
        kala: 48,
        beats: [
          beat("speak", "कुलीनः कः।", "He matches the shot. The crowd inhales. Then the question, dressed as law: who is your father?", "అతడు అదే పని చేస్తాడు. జనం ఊపిరి ఆపుతారు. తరువాత చట్టంలా వచ్చే ప్రశ్న. నీ తండ్రి ఎవరు?", { speaker: "Kripa" }),
          beat("boom", "सूत्रः।", "A suta's son. The words are small. They are large enough to close a life.", "సూతపుత్రుడు. మాటలు చిన్నవి. ఒక జీవితాన్ని మూసేటంత పెద్దవి.", { speaker: "The court", shake: true }),
          beat("whisper", "कर्णः जानाति।", "Hold the lens. He knows there is another answer. He will not use it. A secret mother is not a thing you spend in a stadium.", "కటకం పట్టు. ఇంకో జవాబు ఉందని అతనికి తెలుసు. వాడడు. రహస్య తల్లిని రంగస్థలంలో ఖర్చు పెట్టరు.", {
            speaker: "Karna",
            intent: line("कुण्डले सत्यं वदतः। अहं न।", "The earrings tell the truth. I will not.", "కుండలాలు నిజం చెబుతాయి. నేను చెప్పను."),
          }),
        ],
      },
      {
        id: "anga",
        speaker: "Duryodhana",
        emotion: "wrath",
        place: "Rangabhoomi",
        image: "/chronicle/satra.jpg",
        kala: 50,
        vows: [{ id: "karna-loyalty", name: "Karna's loyalty", state: "lock" }],
        beats: [
          beat("boom", "अङ्गराजः।", "Duryodhana does not argue the law. He breaks it in public. Anga is yours. A crown, for the price of a friend.", "దుర్యోధనుడు చట్టంతో వాదించడు. బహిరంగంగా విరగ్గొడతాడు. అంగం నీది. ఒక స్నేహితుడి ధరకు ఒక కిరీటం.", { speaker: "Duryodhana", shake: true }),
          beat("whisper", "कर्णः नमति।", "Karna bows. In that bow he spends the ending of his life, and he knows the rate.", "కర్ణుడు వంగుతాడు. ఆ వంపులో తన చివరిని ఖర్చు పెడతాడు. రేటు తెలుసు.", {
            speaker: "Karna",
            intent: line("मित्रता मुकुटात् गरीयसी।", "Friendship over a crown. Even the crown that was mine before I was born.", "కిరీటం కంటే స్నేహం. పుట్టకముందే నాది అయిన కిరీటం కూడా."),
          }),
        ],
      },
    ],
  },
  {
    id: "poison",
    title: "First Blood and Poison",
    scenes: [
      {
        id: "river-boys",
        speaker: "The princes",
        emotion: "calm",
        place: "The riverbank",
        image: "/chronicle/beam.jpg",
        video: "/chronicle/beam.mp4",
        kala: 52,
        beats: [
          beat("whisper", "बाललीला।", "They are still children. That is what the nurses say, when Bhima holds a cousin under the water a little past a joke.", "ఇంకా పిల్లలు. దాదులు అలా అంటారు. భీముడు ఒక బంధువును నీళ్లలో పట్టుకున్నప్పుడు, జోకు దాటిన తరువాత కూడా.", { speaker: "The bank" }),
          beat("speak", "दुर्योधनः स्मरति।", "Duryodhana remembers the hands. Big. Laughing. He starts keeping a list no one asked him to keep.", "దుర్యోధనుడికి ఆ చేతులు గుర్తుంటాయి. పెద్దవి. నవ్వుతున్నవి. ఎవరూ అడగని జాబితా మొదలుపెడతాడు.", { speaker: "Duryodhana" }),
        ],
      },
      {
        id: "sweet",
        speaker: "Duryodhana",
        emotion: "sly",
        place: "Pramanakoti",
        image: "/chronicle/sauti.jpg",
        kala: 56,
        beats: [
          beat("whisper", "मिष्टान्नम्।", "The sweet is careful. Enough poison to sink a boy, not enough to taste like a confession.", "తీపి జాగ్రత్తగా ఉంటుంది. ఒక పిల్లవాడిని ముంచేంత విషం. ఒప్పుకోలులా రుచి రానంత.", { speaker: "Duryodhana" }),
          beat("speak", "भीमः खादति।", "Bhima eats the way he does everything, as if the world cooked for him alone. Then the world goes narrow.", "భీముడు ఎప్పటిలాగే తింటాడు. లోకం తనకోసమే వండిందన్నట్టు. తరువాత లోకం ఇరుకు అవుతుంది.", { speaker: "Bhima" }),
          beat("boom", "नदी।", "They bind him and give him to the river. Cousins. In daylight. The city is busy with other stories.", "అతన్ని కట్టి నదికి ఇస్తారు. బంధువులు. పగలు. నగరం వేరే కథల్లో బిజీ.", { speaker: "The cousins", shake: true }),
        ],
      },
      {
        id: "return",
        speaker: "Bhima",
        emotion: "wrath",
        place: "The Naga city",
        image: "/chronicle/satra.jpg",
        kala: 58,
        beats: [
          beat("speak", "नागाः।", "Under the river something older recognizes a cousin of its own. They burn the poison out and leave the strength in.", "నది కింద పాతదైనది తన బంధువును గుర్తిస్తుంది. విషాన్ని కాల్చేసి బలాన్ని ఉంచుతారు.", { speaker: "The nagas" }),
          beat("whisper", "सः आगच्छति।", "He walks back into the palace bigger. Duryodhana smiles with his mouth. The list in his head gets a new first line.", "అతడు రాజభవనంలోకి ఇంకా పెద్దవాడై నడుస్తాడు. దుర్యోధనుడి నోరు నవ్వుతుంది. తలలోని జాబితాకు కొత్త మొదటి వరుస.", {
            speaker: "Duryodhana",
            intent: line("मृत्युः अपि एनं न इच्छति। अहं इच्छामि।", "Even death declined him. I will not.", "చావు కూడా అతన్ని వద్దనుకుంది. నేను వద్దనుకోను."),
          }),
        ],
      },
    ],
  },
  {
    id: "lac",
    title: "The House of Lac",
    scenes: [
      {
        id: "riddle",
        speaker: "Vidura",
        emotion: "sly",
        place: "Hastinapura",
        image: "/chronicle/sauti.jpg",
        kala: 62,
        air: "lac",
        beats: [
          beat("whisper", "लाक्षा।", "Vidura does not say murder. He says the house they have gifted you will love a flame.", "విదురుడు హత్య అనడు. మీకు ఇచ్చిన ఇల్లు మంటను ప్రేమిస్తుందంటాడు.", { speaker: "Vidura" }),
          beat("speak", "विश्वासः विषम्।", "The welcome is perfect. Perfect welcomes are how this family kills.", "ఆహ్వానం పరిపూర్ణం. ఈ వంశం అలా చంపుతుంది.", { speaker: "Vidura" }),
          beat("whisper", "म्लेच्छभाषा।", "Under the floor he changes tongue. The hall would call it a courtesy. It is not meant for the hall.", "నేల కింద అతడు మాట మారుస్తాడు. సభ దాన్ని మర్యాద అంటుంది. అది సభ కోసం కాదు.", {
            speaker: "Vidura",
            rite: "seal",
            intent: line(
              "सुरङ्गा दक्षिणतः। वायुः पूर्वे। अधः गच्छ।",
              "The tunnel is under the south wall. When the wind comes from the east, the lacquer takes the house. Go down. Do not turn toward the feast.",
              "సొరంగం దక్షిణ గోడ కింద. గాలి తూర్పు నుంచి వచ్చినప్పుడు లక్క ఇంటిని తీసుకుంటుంది. కిందకు దిగు. విందు వైపు తిరగకు.",
            ),
          }),
        ],
        choices: [
          {
            id: "dig",
            label: line("खन।", "Dig. Tell only your mother.", "తవ్వు. తల్లికే చెప్పు."),
            note: line("सुरङ्गा।", "You live. You also leave five strangers to the story you escaped.", "నువ్వు బతుకుతావు. నువ్వు తప్పించుకున్న కథలో ఐదుగురు అపరిచితులను వదిలేస్తావు."),
            outcome: { dharma: 6, allies: ["Vidura"] },
          },
          {
            id: "name",
            label: line("कथय।", "Name the plot in court. Trust the elders.", "కుట్రను సభలో చెప్పు. పెద్దలను నమ్ము."),
            note: line("भीष्मः शृणोति।", "Bhishma will hear you. His vow will not let him choose you.", "భీష్ముడు వింటాడు. అతని ప్రతిజ్ఞ నిన్ను ఎంచుకోనివ్వదు."),
            outcome: { dharma: 4 },
          },
        ],
      },
      {
        id: "night",
        speaker: "The fire",
        emotion: "wrath",
        place: "Varanavata",
        image: "/chronicle/fire.jpg",
        video: "/chronicle/fire.mp4",
        kala: 70,
        air: "lac",
        sakuga: "pyre",
        beats: [
          beat("whisper", "वातः पूर्वतः।", "The wind is from the east, as the riddle promised. Lacquer does not burn like wood. It burns like a decision.", "గాలి తూర్పు నుంచి. పొడ చెప్పినట్టే. లాక్కు కలపలా కాదు. ఒక నిర్ణయంలా కాలుతుంది.", { speaker: "The house" }),
          beat("boom", "अग्निः सर्वं स्वीकरोति।", "Kunti keeps them low. Bhima breaks the last board. Behind you, a woman and her five sons, invited to the same feast, do not find the dark.", "కుంతి వారిని దిగువన ఉంచుతుంది. భీముడు చివరి పలకను విరగ్గొడతాడు. వెనుక, అదే విందుకు పిలిచిన తల్లీ ఐదుగురూ చీకటిని కనుక్కోరు.", { speaker: "The fire", shake: true }),
          beat("whisper", "पञ्च।", "The city will count the bones and call them yours. You will let it. Survival, tonight, is a kind of lie.", "నగరం ఎముకలు లెక్కించి మీవని అంటుంది. మీరు అనుమతిస్తారు. ఈ రాత్రి బతకడం ఒక అబద్ధం.", {
            speaker: "Yudhishthira",
            intent: line("धर्मः अत्र किम्।", "If I go back, we die honest. If I go forward, five innocents buy our names. Tell me which of those is dharma.", "వెనక్కి వెళ్తే నిజాయితీగా చస్తాం. ముందుకు వెళ్తే ఐదుగురు నిరపరాధులు మా పేర్లు కొంటారు. ఏది ధర్మం."),
          }),
        ],
      },
    ],
  },
  {
    id: "fireborn",
    title: "Fire-Born",
    scenes: [
      {
        id: "altar",
        speaker: "Drupada",
        emotion: "wrath",
        place: "Kampilya",
        image: "/chronicle/fire.jpg",
        kala: 74,
        beats: [
          beat("speak", "यागः।", "Drupada does not pray for a daughter. He prays for an answer to a humiliation, and the fire, being literal, decides to give him both.", "ద్రుపదుడు కూతురు కోసం ప్రార్థించడు. అవమానానికి జవాబు కోసం. మంట అక్షరాలా విని రెండూ ఇస్తుంది.", { speaker: "Drupada" }),
          beat("whisper", "वेदिः कम्पते।", "The altar cracks the way a court cracks when the wrong question is asked.", "తప్పు ప్రశ్న అడిగినప్పుడు సభ పగిలినట్టు వేదిక పగులుతుంది.", { speaker: "The altar" }),
        ],
      },
      {
        id: "rises",
        speaker: "Draupadi",
        emotion: "still",
        place: "The fire",
        image: "/chronicle/fire.jpg",
        video: "/chronicle/fire.mp4",
        kala: 78,
        vows: [{ id: "draupadi-hair", name: "Draupadi's hair", state: "lock" }],
        beats: [
          beat("boom", "कृष्णा।", "She stands up out of the flame already dark, already named for a color, already looking at a room as if she has seen the ending and is only being polite.", "ఆమె మంటలోంచి లేస్తుంది. ఇప్పటికే నలుపు. ఇప్పటికే ఒక రంగు పేరు. చివరిని చూసి మర్యాదగా ఉన్నట్టు.", { speaker: "Draupadi", shake: true }),
          beat("whisper", "केशः बद्धः।", "Her hair is bound. It will not stay bound. Somewhere a court is being built that will put its hands in it.", "జుట్టు కట్టబడి ఉంది. అలా ఉండదు. ఎక్కడో ఒక సభ కట్టబడుతోంది. అది ఈ జుట్టులో చేతులు పెడుతుంది.", {
            speaker: "Draupadi",
            intent: line("अहं कारणं न। अहं फलम्।", "I am not the cause. I am what the cause ripens into. They will still blame the fruit.", "నేను కారణం కాదు. కారణం పండిన రూపం. అయినా పండును నిందిస్తారు."),
          }),
        ],
      },
      {
        id: "owed",
        speaker: "The fire",
        emotion: "still",
        place: "Kampilya",
        image: "/chronicle/satra.jpg",
        kala: 80,
        beats: [
          beat("speak", "युद्धाय जाता।", "A voice in the smoke, not kind and not cruel. She is born to change the shape of a house that has been eating itself since a boy on a riverbank said no to a life.", "పొగలో ఒక స్వరం. దయ కాదు. క్రూరం కాదు. నది ఒడ్డున ఒక పిల్లవాడు జీవితానికి వద్దన్నప్పటి నుంచీ తనను తాను తిన్న ఇంటి ఆకారం మార్చడానికి పుట్టింది.", { speaker: "The fire" }),
          beat("whisper", "कालः न निद्राति।", "Kala does not sleep. From the vow, to the blindfold, to the dice still hidden in a sleeve, to this girl. The board is almost patient.", "కాలం నిద్రపోదు. ప్రతిజ్ఞ నుంచి కళ్ళపట్టీ దాకా, చేతిలో దాగిన పాచికల దాకా, ఈ అమ్మాయి దాకా. పలక ఇంకా ఓపికగా ఉంది.", { speaker: "Kala" }),
        ],
      },
    ],
  },
];
