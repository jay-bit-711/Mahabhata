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

export const striChapters: Chapter[] = [
  {
    id: "curse",
    title: "A Mother's Curse",
    scenes: [
      {
        id: "field",
        speaker: "Gandhari",
        emotion: "grief",
        place: "Kurukshetra, after",
        image: "/chronicle/sauti.jpg",
        kala: 100,
        vows: [{ id: "gandhari-blind", name: "Gandhari's blindfold", state: "strain" }],
        beats: [
          beat("whisper", "शतम्।", "A hundred sons. She walks where they are, cloth still on her eyes, because she does not need sight to count what a mother counts. The ground is not ground. It is a list.", "నూరుగురు కొడుకులు. వారున్న చోట ఆమె నడుస్తుంది. కళ్ళపై గుడ్డ ఇంకా ఉంది. తల్లి లెక్కించేది చూడాల్సిన పని లేదు. నేల నేల కాదు. జాబితా.", { speaker: "Gandhari" }),
          beat("speak", "दुर्योधनस्य शीर्षम्।", "Her hand finds the head she refused to look at for a lifetime of chosen dark. The blindfold was devotion. It is also how you arrive at a field already too late to stop it.", "ఎంచుకున్న చీకటి జీవితమంతా చూడడానికి నిరాకరించిన తలను చెయ్యి కనుక్కుంటుంది. కళ్ళపట్టీ భక్తి. మైదానానికి ఆపలేనంత ఆలస్యంగా రావడం కూడా అదే.", { speaker: "Gandhari" }),
          beat("whisper", "स्त्रियः।", "Around her the other women are doing the same arithmetic. The epic will remember the kings. The field remembers the names that were never put on a banner.", "ఆమె చుట్టూ మిగతా స్త్రీలు అదే లెక్క చేస్తున్నారు. ఇతిహాసం రాజులను గుర్తుంచుకుంటుంది. మైదానం జెండాపై ఎక్కని పేర్లను గుర్తుంచుకుంటుంది.", { speaker: "The women" }),
        ],
      },
      {
        id: "curse-spoken",
        speaker: "Gandhari",
        emotion: "wrath",
        place: "Kurukshetra, after",
        image: "/chronicle/fire.jpg",
        kala: 100,
        vows: [{ id: "gandhari-curse", name: "Gandhari's curse", state: "lock" }],
        beats: [
          beat("speak", "त्वम् अपि।", "She turns toward the voice she knows is Krishna. You could have stopped it. Do not tell me about instruments. A mother is not a philosophy.", "కృష్ణుడని తెలిసిన స్వరం వైపు తిరుగుతుంది. నువ్వు దీన్ని ఆపగలిగేవాడివి. సాధనాల గురించి నాకు చెప్పకు. తల్లి తత్వం కాదు.", { speaker: "Gandhari" }),
          beat("boom", "यादवाः।", "Your clan will die as mine died. Not by a foreign sword. By themselves. Thirty-six years from this morning they will tear each other apart, and you will watch, because watching is what you chose.", "మా వంశం చచ్చినట్టు నీ వంశం చస్తుంది. ఇతరుల కత్తితో కాదు. తమతోనే. ఈ ఉదయం నుంచి ముప్పై ఆరేళ్ళకు ఒకరినొకరు చీల్చుకుంటారు. నువ్వు చూస్తావు. చూడడమే నువ్వు ఎంచుకున్నది.", { speaker: "Gandhari", shake: true }),
          beat("whisper", "कृष्णः नमति।", "Krishna smiles. Then he bows, the way he bowed in the Kuru hall, lower than a prince. He accepts the curse as if she had finally said a line he had left blank for her.", "కృష్ణుడు నవ్వుతాడు. తరువాత వంగుతాడు. కురు సభలో వంగినట్టు. రాకుమారుడికి తగనంత. ఆమె కోసం ఖాళీగా ఉంచిన వాక్యం చివరికి చెప్పినట్టు శాపాన్ని స్వీకరిస్తాడు.", {
            speaker: "Krishna",
            emotion: "calm",
            intent: line("सा सत्यं वदति। अहम् अपि नियमः। नियमः मां न मुञ्चति।", "She is right. I am also a rule. The rule does not spare me. If I am the instrument, I do not get to leave before the song is ugly.", "ఆమె నిజం చెబుతోంది. నేను కూడా ఒక నియమం. నియమం నన్ను వదలదు. నేను సాధనం అయితే పాట వికారమయ్యే ముందు నేను వెళ్ళను."),
          }),
        ],
      },
    ],
  },
];
