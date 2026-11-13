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

export const svargaChapters: Chapter[] = [
  {
    id: "ascent",
    title: "The Final Ascent",
    scenes: [
      {
        id: "climb",
        speaker: "Yudhishthira",
        emotion: "grief",
        place: "The Himalaya",
        image: "/chronicle/beam.jpg",
        video: "/chronicle/beam.mp4",
        kala: 100,
        beats: [
          beat("whisper", "वर्षाणि।", "Decades later the kingdom is a thing other people administer. He is old. The war is a story children tell wrong. He starts walking north, because north is the direction you take when you are finished arguing with the world.", "దశాబ్దాల తరువాత రాజ్యం ఇతరులు నడిపేది. అతడు ముసలివాడు. యుద్ధం పిల్లలు తప్పుగా చెప్పే కథ. అతడు ఉత్తరం వైపు నడవడం మొదలుపెడతాడు. లోకంతో వాదం అయిపోయాక తీసుకునే దిక్కు ఉత్తరం.", { speaker: "Yudhishthira" }),
          beat("speak", "पञ्च। श्वा च।", "Draupadi. Bhima. Arjuna. The twins. And a dog that joined them without being asked, the way loyalty usually does. No banners. The snow does not care who won.", "ద్రౌపది. భీముడు. అర్జునుడు. కవలలు. అడగకుండా కలిసిన కుక్క. విధేయత సాధారణంగా అలా వస్తుంది. జెండాలు లేవు. ఎవరు గెలిచారో మంచుకు పట్టదు.", { speaker: "The road" }),
        ],
      },
      {
        id: "falls",
        speaker: "The mountain",
        emotion: "grief",
        place: "The high path",
        image: "/chronicle/sauti.jpg",
        kala: 100,
        beats: [
          beat("whisper", "द्रौपदी पतति।", "Draupadi falls first. The mountain, which is ruder than any court, offers a reason: she loved one of them more. He does not argue. He has spent a life learning which truths are too small to save anybody.", "ముందు ద్రౌపది పడుతుంది. ఏ సభకంటే మొరటైన కొండ ఒక కారణం ఇస్తుంది. ఆమె వారిలో ఒకరిని ఎక్కువ ప్రేమించిందని. అతడు వాదించడు. ఎవరినీ కాపాడలేనంత చిన్న నిజాలు ఏవో జీవితమంతా నేర్చుకున్నాడు.", { speaker: "The mountain" }),
          beat("speak", "एकैकशः।", "Then the brothers. Strength, accuracy, the beautiful twins. Each fall is explained like a verdict. He keeps walking, because stopping would mean the verdicts were the point.", "తరువాత తమ్ములు. బలం, గురి, అందమైన కవలలు. ప్రతి పతనం తీర్పులా వివరించబడుతుంది. అతడు నడుస్తూనే ఉంటాడు. ఆగితే తీర్పులే పాయింట్ అయిపోతాయి.", { speaker: "The mountain" }),
          beat("whisper", "श्वा तिष्ठति।", "The dog does not fall. No one offers a verse for why. It simply stays at the heel of the last man, as if the only undefeated thing in the epic was never a hero.", "కుక్క పడదు. ఎందుకో శ్లోకం ఎవరూ ఇవ్వరు. చివరి మనిషి మడిమ దగ్గర ఉంటుంది. ఈ ఇతిహాసంలో ఓడిపోని ఏకైక వస్తువు వీరుడు కాదన్నట్టు.", {
            speaker: "The dog",
            intent: line("अहं धर्मः न। अहं यः न त्यजति।", "I am not dharma. I am the one who does not leave. Your books keep confusing the two.", "నేను ధర్మం కాదు. వదలనివాడిని. మీ పుస్తకాలు ఆ రెండింటినీ కలగలుపుతాయి."),
          }),
        ],
      },
      {
        id: "gate",
        speaker: "Yudhishthira",
        emotion: "still",
        place: "The gate",
        image: "/chronicle/satra.jpg",
        kala: 100,
        beats: [
          beat("speak", "स्वर्गः।", "Heaven is a door with conditions, which makes it look, at the last moment, exactly like Hastinapura. The dog may not enter. Dogs are not in the statute.", "స్వర్గం షరతుల తలుపు. చివరి క్షణంలో అది హస్తినాపురంలా కనిపిస్తుంది. కుక్క రాకూడదు. కుక్కలు చట్టంలో లేవు.", { speaker: "The gate" }),
          beat("boom", "न बिना श्वानम्।", "Then I do not enter. I have left a wife on a mountain and brothers in the snow because I was told their falls were just. I will not be told that loyalty is unclean.", "అయితే నేను రాను. భార్యను కొండపై, తమ్ములను మంచులో వదిలాను. వారి పతనాలు న్యాయమని చెప్పారు. విధేయత అపవిత్రమని చెప్పించుకోను.", { speaker: "Yudhishthira", shake: true }),
          beat("whisper", "धर्मः प्रकटः।", "The dog is not a dog. It is the law he spent the whole epic obeying and also betraying, finally standing in a shape that cannot be gambled, cited, or parked outside. Heaven, embarrassed, opens.", "కుక్క కుక్క కాదు. ఇతిహాసమంతా అతడు పాటించి, మోసం కూడా చేసిన చట్టం. చివరికి పందెం పెట్టలేని, ఉల్లేఖించలేని, బయట కాచుకోనివ్వని ఆకారంలో నిలబడింది. స్వర్గం సిగ్గుపడి తెరుచుకుంటుంది.", {
            speaker: "Dharma",
            intent: line("न नियमः। स्नेहः यः नियमं अतिशेते।", "Not the code. The love that outgrows the code. You refused a perfect door. That was the first clean answer.", "నియమం కాదు. నియమాన్ని దాటిన ప్రేమ. నువ్వు పరిపూర్ణ తలుపును నిరాకరించావు. అదే మొదటి శుభ్రమైన జవాబు."),
          }),
          beat("speak", "नरकस्य छाया।", "They still show him a hell, briefly, because even the last revelation wants a test. He would stay there if his people were there. The vision folds. What remains is not reward. It is the meaning of the word he used all his life without living inside it.", "చివరి బహిర్గతానికి కూడా పరీక్ష కావాలి కాబట్టి కాసేపు నరకం చూపిస్తారు. అతని వారు అక్కడ ఉంటే అతడు అక్కడే ఉండేవాడు. దృశ్యం ముడుచుకుంటుంది. మిగిలేది బహుమతి కాదు. జీవితమంతా లోపల బతకకుండా వాడిన మాటకు అర్థం.", { speaker: "The gate" }),
        ],
        choices: [
          {
            id: "dog",
            label: line("श्वानं विना न।", "Refuse heaven. The dog comes, or nobody does.", "స్వర్గాన్ని నిరాకరించు. కుక్క వస్తేనే. లేకపోతే ఎవరూ వద్దు."),
            note: line("धर्मः।", "The gate opens because you would not leave the one who stayed.", "నీతో ఉన్నదాన్ని వదలకపోవడంతో తలుపు తెరుచుకుంటుంది."),
            outcome: { dharma: 16 },
          },
          {
            id: "enter",
            label: line("प्रविश।", "Enter. The law did not mention dogs.", "లోపలికి వెళ్ళు. చట్టం కుక్కల గురించి చెప్పలేదు."),
            note: line("पुनः सभा।", "You are clean, and alone, which is the old mistake wearing a brighter room.", "నువ్వు శుభ్రంగా, ఒంటరిగా ఉంటావు. పాత పొరపాటు ప్రకాశవంతమైన గది వేసుకుంది."),
            outcome: { dharma: -8 },
          },
        ],
      },
    ],
  },
];
