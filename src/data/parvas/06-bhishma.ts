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

export const bhishmaChapters: Chapter[] = [
  {
    id: "dust",
    title: "Lines in the Dust",
    scenes: [
      {
        id: "choose",
        speaker: "The land",
        emotion: "still",
        place: "Kurukshetra",
        image: "/chronicle/beam.jpg",
        video: "/chronicle/beam.mp4",
        kala: 100,
        beats: [
          beat("whisper", "रेखाः।", "A line is drawn in dust that used to be farmland. On one side, a woman with unbound hair. On the other, a throne that has been hungry since a boy on a riverbank said no to a life.", "పొలంగా ఉన్న దుమ్ములో గీత. ఒకవైపు విప్పిన జుట్టుతో ఒక స్త్రీ. ఇంకోవైపు, నది ఒడ్డున ఒక పిల్లవాడు జీవితానికి వద్దన్నప్పటి నుంచీ ఆకలితో ఉన్న సింహాసనం.", { speaker: "The land" }),
          beat("speak", "सर्वे पक्षं वृण्वते।", "Every kingdom is made to pick. Neutrality is a story people tell before the envoys arrive. After that there is only a banner, and a cousin you will have to name in the dark.", "ప్రతి రాజ్యం ఒక పక్షం ఎంచుకోవాలి. తటస్థం అనేది దూతలు రాకముందు చెప్పుకునే కథ. తరువాత జెండా మాత్రమే. చీకట్లో పేరు పెట్టవలసిన బంధువు.", { speaker: "The land" }),
        ],
      },
      {
        id: "grandsire",
        speaker: "Bhishma",
        emotion: "grief",
        place: "The Kaurava camp",
        image: "/chronicle/satra.jpg",
        kala: 100,
        vows: [{ id: "bhishma-vow", name: "Bhishma's vow", state: "strain" }],
        beats: [
          beat("speak", "सेनापतिः।", "They ask the grandsire to lead the army he knows is wrong. He says yes. The yes is not loyalty to Duryodhana. It is the chain, still shining, still heavier than a kingdom.", "తప్పని సైన్యాన్ని నడపమని తాతను అడుగుతారు. అతడు అవును అంటాడు. అవును దుర్యోధనుడి విధేయత కాదు. ఇంకా మెరుస్తున్న గొలుసు. రాజ్యం కంటే బరువు.", { speaker: "Bhishma" }),
          beat("whisper", "सः शिष्यान् पश्यति।", "Across the dust he can see the boys he trained. He will shoot at them tomorrow with a clean conscience and a ruined one, both at once. That is what a perfect vow costs at the end.", "దుమ్ము అవతల తాను నేర్పిన పిల్లలు కనిపిస్తారు. రేపు వారిపై శుభ్రమైన మనస్సాక్షితో, పాడైన మనస్సాక్షితో కలిపి బాణం వేస్తాడు. పరిపూర్ణ ప్రతిజ్ఞ చివరికి అలా ఖరీదు అవుతుంది.", {
            speaker: "Bhishma",
            intent: line("अधर्मं रक्षामि। वचनं मम धर्मः। तद् विषम्।", "I am guarding adharma. My word is my dharma. The two together are poison, and I will drink it standing up.", "నేను అధర్మాన్ని కాపాడుతున్నాను. నా మాటే నా ధర్మం. రెండూ కలిస్తే విషం. నిలబడి తాగుతాను."),
          }),
        ],
        choices: [
          {
            id: "throne",
            label: line("सिंहासनं पालय।", "Lead them. The throne was promised a protector.", "వారిని నడుపు. సింహాసనానికి కాపలా మాట ఇచ్చావు."),
            note: line("शृङ्खला।", "The chain holds. The field will do the rest.", "గొలుసు నిలుస్తుంది. మిగతా పని మైదానం చేస్తుంది."),
            outcome: { dharma: -4, army: 2 },
          },
          {
            id: "step-down",
            label: line("अस्त्रं त्यज।", "Set the bow down. Let the vow break before the boys do.", "విల్లు దించు. పిల్లలకు ముందే ప్రతిజ్ఞ విరగనివ్వు."),
            note: line("मुक्तः।", "You are free, and every oath after yours becomes negotiable.", "నువ్వు విడుదల. నీ తరువాతి ప్రతి ప్రమాణం బేరమవుతుంది."),
            outcome: { dharma: 8 },
          },
        ],
      },
    ],
  },
  {
    id: "gita",
    title: "Virata Rupam and the Gita",
    scenes: [
      {
        id: "collapse",
        speaker: "Arjuna",
        emotion: "grief",
        place: "Kurukshetra, the first morning",
        image: "/chronicle/sauti.jpg",
        kala: 100,
        beats: [
          beat("whisper", "सेनाद्वयम्।", "The conches have finished showing off. What remains is a field of familiar faces: teacher, grandsire, the boys who ate from the same kitchen.", "శంఖాలు గొప్పచూపు చూపించడం అయిపోయింది. మిగిలింది తెలిసిన ముఖాల మైదానం. గురువు, తాత, ఒకే వంటగది నుంచి తిన్న పిల్లలు.", { speaker: "The field" }),
          beat("speak", "गाण्डीवम् पतति।", "Arjuna's bow hits the chariot floor. The best archer alive has just discovered that accuracy is not the same thing as permission.", "అర్జునుడి విల్లు రథం నేలపై పడుతుంది. బతికి ఉన్న అతి తీక్షణమైన విలుకాడికి ఇప్పుడు అర్థమైంది. గురి తగలడం అనుమతి కాదు.", { speaker: "Arjuna" }),
          beat("whisper", "न शक्नोमि।", "I will not kill them for a kingdom. What is a kingdom soaked in my teacher's blood. Let them have it. Let me be the coward who kept his love.", "రాజ్యం కోసం వారిని చంపను. గురువు రక్తంతో తడిసిన రాజ్యం ఏమిటి. వారికే ఇవ్వు. ప్రేమను ఉంచుకున్న పిరికివాడిని నన్ను అననివ్వు.", {
            speaker: "Arjuna",
            emotion: "grief",
            intent: line("भयम् न। शोकः। शोकः अपि पाशः।", "This is not fear. It is grief. Grief is also a chain, and it would like to be called mercy.", "ఇది భయం కాదు. శోకం. శోకం కూడా గొలుసు. దాన్ని దయ అనిపించుకోవాలని ఉంది."),
          }),
        ],
      },
      {
        id: "freeze",
        speaker: "Krishna",
        emotion: "still",
        place: "Between two armies",
        image: "/chronicle/beam.jpg",
        kala: 100,
        beats: [
          beat("whisper", "कालः तिष्ठति।", "Time does a rude thing. It stops. Horses hang between one breath and the next. The war is still there. It has been asked to wait.", "కాలం ఒక మొరటు పని చేస్తుంది. ఆగుతుంది. గుర్రాలు ఒక శ్వాసకు మరో శ్వాసకు మధ్య వేలాడుతాయి. యుద్ధం ఉంది. వేచి ఉండమని అడిగారు.", { speaker: "Time" }),
          beat("speak", "न त्वं कर्ता।", "Krishna does not comfort him. Comfort would send him home. You are grieving for people death has already addressed. You are late to a letter you did not write.", "కృష్ణుడు అతన్ని ఓదార్చడు. ఓదార్పు ఇంటికి పంపుతుంది. చావు ఇప్పటికే పిలిచిన వారి గురించి దుఃఖిస్తున్నావు. నువ్వు రాయని ఉత్తరానికి ఆలస్యంగా వచ్చావు.", { speaker: "Krishna" }),
          beat("whisper", "निमित्तमात्रम्।", "Be the instrument. Not the author. Personal love is not small. It is simply not large enough to outvote a rotting house.", "సాధనం అవ్వు. రచయిత కాదు. వ్యక్తిగత ప్రేమ చిన్నది కాదు. కుళ్ళిపోతున్న ఇంటిని ఓటు వేసి ఓడించేంత పెద్దది కాదు.", {
            speaker: "Krishna",
            intent: line("यदि अहं एनं केवलं प्रीण्यामि, कुलम् तिष्ठति। तिष्ठतु इति अधर्मः।", "If I only soothe him, the house remains. Remaining is the adharma. I will not purchase his comfort with a century of cruelty.", "నేను అతన్ని ఓదార్చితే ఇల్లు నిలుస్తుంది. నిలవడమే అధర్మం. అతని సౌకర్యాన్ని శతాబ్దపు క్రూరత్వంతో కొనను."),
          }),
        ],
      },
      {
        id: "virata",
        speaker: "Krishna",
        emotion: "wrath",
        place: "Everywhere at once",
        image: "/chronicle/fire.jpg",
        video: "/chronicle/fire.mp4",
        kala: 100,
        sakuga: "virata",
        beats: [
          beat("boom", "पश्य।", "Then the friend is gone. What stands in the chariot has too many mouths, and every mouth is a century ending. Armies pour into the teeth like rivers that were always going there.", "తరువాత స్నేహితుడు పోతాడు. రథంలో నిలబడిన దానికి నోళ్ళు ఎక్కువ. ప్రతి నోరు అయిపోతున్న శతాబ్దం. సైన్యాలు పళ్ళలోకి నదుల్లా పోతున్నాయి. అవి ఎప్పుడూ అక్కడికే వెళ్తున్నాయి.", { speaker: "The form", shake: true }),
          beat("whisper", "त्वम् अपि तत्र।", "Arjuna sees himself in that mouth. He sees Bhishma already fallen, Karna already in the mud, and the war not as a choice ahead of him but as a thing that has happened, happening, and still asking him to move his hands.", "అర్జునుడు ఆ నోట్లో తనను చూస్తాడు. ఇప్పటికే పడిన భీష్ముడు. ఇప్పటికే బురదలో కర్ణుడు. యుద్ధం ముందున్న ఎంపిక కాదు. అయిపోయినది, అవుతున్నది, ఇంకా చేతులు కదపమని అడుగుతున్నది.", { speaker: "Arjuna" }),
          beat("boom", "उत्थिष्ठ।", "Therefore stand up. Do the work that is in front of the hand. Grief can ride in the chariot. It does not get to hold the reins.", "అందుకే లెమ్ము. చేతి ముందున్న పని చెయ్యి. శోకం రథంలో కూర్చోవచ్చు. పగ్గాలు పట్టదు.", { speaker: "Krishna", shake: true }),
        ],
        choices: [
          {
            id: "instrument",
            label: line("उत्थितास्मि।", "Stand. Be the instrument. Let love grieve and the hand work.", "లెమ్ము. సాధనం అవ్వు. ప్రేమ దుఃఖించనివ్వు. చెయ్యి పని చేయనివ్వు."),
            note: line("युद्धम्।", "The bow comes up. You will not be innocent when it comes down.", "విల్లు పైకి వస్తుంది. అది కిందికి వచ్చేటప్పుడు నువ్వు అమాయకుడివి కావు."),
            outcome: { dharma: 6 },
          },
          {
            id: "refuse",
            label: line("न योत्स्ये।", "Refuse. Let the field go on without your hands.", "నిరాకరించు. నీ చేతులు లేకుండా మైదానం కొనసాగనివ్వు."),
            note: line("शोकः जयति।", "Your love stays clean. The house that required this morning stays standing.", "నీ ప్రేమ శుభ్రంగా ఉంటుంది. ఈ ఉదయం అవసరమైన ఇల్లు నిలబడి ఉంటుంది."),
            outcome: { dharma: -6 },
          },
        ],
      },
    ],
  },
  {
    id: "titans",
    title: "The Fall of Titans",
    scenes: [
      {
        id: "bhishma-fall",
        speaker: "Krishna",
        emotion: "wrath",
        place: "The tenth day",
        image: "/chronicle/fire.jpg",
        video: "/chronicle/fire.mp4",
        kala: 100,
        sakuga: "wheel",
        vows: [{ id: "bhishma-vow", name: "Bhishma's vow", state: "snap" }],
        beats: [
          beat("speak", "शिखण्डी।", "Shikhandi stands in front. Amba, returned as the one shape the vow cannot raise a weapon against. Bhishma sees the face from the pyre and lowers his bow. The chain recognizes its author.", "శిఖండి ముందు నిలబడతాడు. ప్రతిజ్ఞ ఆయుధం ఎత్తలేని రూపంలో వచ్చిన అంబ. భీష్ముడు చితి ముఖం చూసి విల్లు దించుతాడు. గొలుసు తన రచయితను గుర్తిస్తుంది.", { speaker: "Shikhandi" }),
          beat("boom", "चक्रम्।", "Krishna steps down anyway. The vow of no weapon is in his mouth and a chariot wheel is in his hand. He will break himself to finish a man who would not break. The field learns what a god's hesitation looks like. It looks like murder, paused.", "అయినా కృష్ణుడు కిందికి దిగుతాడు. ఆయుధం లేదన్న ప్రతిజ్ఞ నోట్లో ఉంది. రథచక్రం చేతిలో ఉంది. విరగని మనిషిని ముగించడానికి తనను తాను విరుగగొడతాడు. దేవుడి సంకోచం ఎలా ఉంటుందో మైదానం నేర్చుకుంటుంది. ఆగిన హత్యలా.", { speaker: "Krishna", shake: true }),
          beat("whisper", "शरशय्या।", "Bhishma falls on a bed of arrows, still not dead, because the boon will not let him. He will teach kingship from a mattress of his own endings. The terrible vow has finished its work. It kept him alive long enough to see it.", "భీష్ముడు బాణాల పరుపుపై పడతాడు. ఇంకా చావడు. వరం వదలదు. తన అంతాల పరుపుపై నుంచి రాజనీతి చెబుతాడు. భయంకర ప్రతిజ్ఞ పని అయిపోయింది. దాన్ని చూసేంతసేపు అతన్ని బతికించింది.", {
            speaker: "Bhishma",
            emotion: "grief",
            intent: line("अम्बा। पर्याप्तम्।", "Amba. Enough. You may have the last of me. I have had the last of everyone else.", "అంబా. చాలు. నా చివరిని నువ్వు తీసుకో. మిగతా అందరి చివరిని నేను తీసుకున్నాను."),
          }),
        ],
      },
      {
        id: "abhimanyu",
        speaker: "Abhimanyu",
        emotion: "wrath",
        place: "Inside the wheel",
        image: "/chronicle/sauti.jpg",
        kala: 100,
        game: {
          game: "vyuha",
          title: line("चक्रव्यूहः।", "The wheel has one door. He was taught half.", "చక్రానికి ఒకే తలుపు. అతనికి సగం నేర్పారు."),
        },
        beats: [
          beat("whisper", "अर्धं ज्ञानम्।", "He knows the way in. His father was going to teach the way out on a morning that never came. The formation closes behind a boy who is still young enough to believe rules apply to the men who wrote them.", "లోపలి దారి తెలుసు. బయటి దారి తండ్రి ఎప్పుడూ రాని ఉదయాన నేర్పబోయాడు. నియమాలు రాసినవారికీ వర్తిస్తాయని నమ్మేంత చిన్నవాడి వెనుక వ్యూహం మూసుకుంటుంది.", { speaker: "Abhimanyu" }),
          beat("boom", "सप्त।", "Seven great warriors. One boy. The rules of war are recited every dawn and broken at noon, because a child inside the wheel is easier than the father waiting outside it.", "ఏడుగురు మహారథులు. ఒక పిల్లవాడు. యుద్ధ నియమాలు ప్రతి తెల్లవారుజామున చదువుతారు. మధ్యాహ్నం విరుస్తారు. బయట వేచి ఉన్న తండ్రి కంటే చక్రం లోపలి బిడ్డ సులభం.", { speaker: "The seven", shake: true }),
          beat("whisper", "माता शृणोति।", "Somewhere Draupadi, or the brother's wife who is also hers by the knot of this house, learns that the youngest smile on their side has been spent. The war runs out of innocence on a technicality.", "ఎక్కడో ద్రౌపది, ఈ ఇంటి చిక్కులో ఆమెదీ అయిన తమ్ముడి భార్య, తమ పక్షపు చిన్న నవ్వు ఖర్చయిందని తెలుసుకుంటుంది. యుద్ధం అమాయకత్వం ఒక సాంకేతికతపై అయిపోతుంది.", {
            speaker: "The camp",
            intent: line("धर्मयुद्धम् इति शब्दः अद्य मृतः।", "Today the phrase 'a dharma war' dies. What continues is only war.", "ఈరోజు ‘ధర్మయుద్ధం’ అనే మాట చస్తుంది. కొనసాగేది యుద్ధం మాత్రమే."),
          }),
        ],
      },
      {
        id: "drona",
        speaker: "Yudhishthira",
        emotion: "grief",
        place: "The fifteenth day",
        image: "/chronicle/satra.jpg",
        kala: 100,
        beats: [
          beat("whisper", "अश्वत्थामा।", "An elephant dies with a son's name. Krishna, who has stopped pretending the truth is a luxury, asks the one man whose mouth the teacher will believe.", "ఒక ఏనుగు కొడుకు పేరుతో చస్తుంది. నిజం విలాసమని నటించడం ఆపిన కృష్ణుడు, గురువు నమ్మే ఏకైక నోటిని అడుగుతాడు.", { speaker: "Krishna" }),
          beat("speak", "मृतः।", "Ashwatthama is dead. Yudhishthira adds the elephant under his breath, where a god can hear it and a teacher cannot. The sentence is almost true. Almost is a new country for him.", "అశ్వత్థామ చచ్చాడు. యుధిష్ఠిరుడు ఏనుగును ఊపిరిలో కలుపుతాడు. దేవుడు వినే చోట. గురువు వినని చోట. వాక్యం దాదాపు నిజం. దాదాపు అతనికి కొత్త దేశం.", { speaker: "Yudhishthira" }),
          beat("boom", "रथः भूमिम् स्पृशति।", "His chariot, which had ridden a finger above the earth for as long as he had never lied, touches the ground. The first stain is quiet. It is still a stain. Drona puts his weapons down and dies of a sentence.", "అబద్ధం చెప్పనంత కాలం నేలకు ఒక వేలు పైన ఉన్న అతని రథం నేలను తాకుతుంది. మొదటి మరక నిశ్శబ్దం. అయినా మరకే. ద్రోణుడు ఆయుధాలు దించి ఒక వాక్యంతో చస్తాడు.", {
            speaker: "The chariot",
            shake: true,
            intent: line("सत्यं मम रथः आसीत्। अहं एनं अवतारितवान्।", "My truth was the chariot. I brought it down to end a teacher. Remember which one I loved more.", "నా నిజం రథం. గురువును ముగించడానికి దాన్ని కిందికి తెచ్చాను. నేను దేన్ని ఎక్కువ ప్రేమించానో గుర్తుంచుకో."),
          }),
        ],
      },
      {
        id: "karna-mud",
        speaker: "Karna",
        emotion: "grief",
        place: "The seventeenth day",
        image: "/chronicle/beam.jpg",
        kala: 100,
        vows: [{ id: "karna-loyalty", name: "Karna's loyalty", state: "snap" }],
        beats: [
          beat("whisper", "चक्रम् पङ्के।", "The wheel sinks. Parashurama's curse, saved for the one afternoon it could be cruelest, remembers a lie Karna told when he was only trying to learn. The earth takes the chariot the way a court once took his name.", "చక్రం బురదలో కూరుకుంటుంది. కర్ణుడు నేర్చుకోవడానికి చెప్పిన అబద్ధాన్ని పరశురాముడి శాపం అతి క్రూరమైన మధ్యాహ్నం దాకా దాచింది. ఒకప్పుడు సభ అతని పేరును తీసుకున్నట్టు భూమి రథాన్ని తీసుకుంటుంది.", { speaker: "The earth" }),
          beat("speak", "क्षणम् देहि।", "He asks for the pause the rules promised a warrior with a stuck wheel. He has lived by worse rules and better ones. Today the better ones are inconvenient.", "ఇరుక్కున్న చక్రం ఉన్న యోధుడికి నియమాలు ఇచ్చిన విరామం అడుగుతాడు. అతడు చెడ్డ నియమాలతో, మంచి నియమాలతో బతికాడు. ఈరోజు మంచివి అసౌకర్యం.", { speaker: "Karna" }),
          beat("boom", "कृष्णः आज्ञापयति।", "Krishna says no. Not because Karna is small. Because a good heart on the wrong oath has already had every chance to step off, and spent them on a friend who laughed at a blind man's son. Arjuna shoots. The sun goes out in the mud.", "కృష్ణుడు వద్దు అంటాడు. కర్ణుడు చిన్నవాడు కాదు. తప్పు ప్రమాణంపై ఉన్న మంచి గుండె దిగిపోయే అవకాశాలన్నీ పొంది, అంధుడి కొడుకును నవ్విన స్నేహితుడిపై ఖర్చు పెట్టింది. అర్జునుడు బాణం వేస్తాడు. సూర్యుడు బురదలో ఆరిపోతాడు.", {
            speaker: "Krishna",
            shake: true,
            intent: line("मित्रता एनं हतवती। अहं केवलं समयम् उक्तवान्।", "Friendship killed him. I only said the hour out loud.", "అతన్ని స్నేహం చంపింది. నేను గంటను బిగ్గరగా చెప్పాను."),
          }),
        ],
      },
      {
        id: "thigh",
        speaker: "Bhima",
        emotion: "wrath",
        place: "The last duel",
        image: "/chronicle/fire.jpg",
        kala: 100,
        vows: [{ id: "draupadi-hair", name: "Draupadi's unbound hair", state: "snap" }],
        beats: [
          beat("speak", "गदा।", "No armies left to hide inside. Two men, one mace, and a promise made in a hall when a thigh was offered as a place for a queen to sit. The rules say strike above the waist.", "దాక్కునే సైన్యాలు లేవు. ఇద్దరు మనుషులు, ఒక గద, రాణి కూర్చోమని తొడను చూపిన సభలో చేసిన మాట. నియమాలు నడుముకు పైన కొట్టమంటాయి.", { speaker: "The duel" }),
          beat("boom", "ऊरू।", "Bhima breaks the thigh anyway. It is ugly. It is exact. Draupadi's hair can be tied. The vow does not become beautiful just because it is fulfilled.", "అయినా భీముడు తొడ విరగ్గొడతాడు. అది వికారం. అది ఖచ్చితం. ద్రౌపది జుట్టు ఇప్పుడు కట్టవచ్చు. ప్రతిజ్ఞ నెరవేరిందని అందంగా అవ్వదు.", { speaker: "Bhima", shake: true }),
          beat("whisper", "केशाः बध्यन्ते।", "Somewhere a woman washes her hair in the blood she was promised. She does not smile the way the songs will say. She ties it, and the war, which began with a laugh, ends with a knot.", "ఎక్కడో ఒక స్త్రీ మాట ఇచ్చిన రక్తంతో జుట్టు ఉదుక్కుంటుంది. పాటలు చెప్పినట్టు నవ్వదు. కడుతుంది. నవ్వుతో మొదలైన యుద్ధం ఒక ముడితో అవుతుంది.", {
            speaker: "Draupadi",
            intent: line("न शान्तिः। केवलं समाप्तिः।", "This is not peace. It is only an ending. I will take the ending.", "ఇది శాంతి కాదు. అంతం మాత్రమే. అంతాన్ని తీసుకుంటాను."),
          }),
        ],
      },
    ],
  },
];
