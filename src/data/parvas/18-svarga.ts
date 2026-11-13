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
        air: "mist",
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
        air: "mist",
        beats: [
          beat("whisper", "द्रौपदी पतति।", "Draupadi falls first. The mountain offers a reason. He does not take it.", "ముందు ద్రౌపది పడుతుంది. కొండ ఒక కారణం ఇస్తుంది. అతడు తీసుకోడు.", { speaker: "The mountain", rite: "ash" }),
          beat("speak", "एकैकशः।", "Then the brothers. Strength. The bow. The twins. Each fall is read like a verdict. He keeps walking.", "తరువాత తమ్ములు. బలం. విల్లు. కవలలు. ప్రతి పతనం తీర్పులా చదవబడుతుంది. అతడు నడుస్తాడు.", { speaker: "The mountain", rite: "ash" }),
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
        air: "mist",
        beats: [
          beat("speak", "स्वर्गः।", "Heaven is a door with conditions, which makes it look, at the last moment, exactly like Hastinapura. The dog may not enter. Dogs are not in the statute.", "స్వర్గం షరతుల తలుపు. చివరి క్షణంలో అది హస్తినాపురంలా కనిపిస్తుంది. కుక్క రాకూడదు. కుక్కలు చట్టంలో లేవు.", { speaker: "The gate" }),
          beat("boom", "न बिना श्वानम्।", "Then I do not enter.", "అయితే నేను రాను.", {
            speaker: "Yudhishthira",
            shake: true,
            rite: "amber",
            holdMs: 2200,
          }),
          beat("whisper", "धर्मः प्रकटः।", "The dog does not become a sermon. It stays. Heaven, which had conditions, is the one that looks embarrassed.", "కుక్క ఉపన్యాసం కాదు. అక్కడే ఉంటుంది. షరతులున్న స్వర్గమే సిగ్గుపడుతుంది.", {
            speaker: "Dharma",
            rite: "amber",
            intent: line("न नियमः। स्नेहः यः नियमं अतिशेते।", "Not the code. The love that outgrows the code. You refused a perfect door. That was the first clean answer.", "నియమం కాదు. నియమాన్ని దాటిన ప్రేమ. నువ్వు పరిపూర్ణ తలుపును నిరాకరించావు. అదే మొదటి శుభ్రమైన జవాబు."),
          }),
          beat("speak", "नरकस्य छाया।", "They show him a hell, briefly. He would have stayed if his people were there. The vision folds. What remains is the dog, still warm.", "కాసేపు నరకం చూపిస్తారు. అతని వారు అక్కడ ఉంటే అతడు అక్కడే ఉండేవాడు. దృశ్యం ముడుచుకుంటుంది. మిగిలేది కుక్క. ఇంకా వెచ్చగా.", { speaker: "The gate", rite: "amber" }),
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
