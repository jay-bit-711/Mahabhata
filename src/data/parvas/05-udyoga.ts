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

export const udyogaChapters: Chapter[] = [
  {
    id: "envoy",
    title: "The Peace Envoy",
    scenes: [
      {
        id: "five-villages",
        speaker: "Krishna",
        emotion: "calm",
        place: "Hastinapura",
        image: "/chronicle/satra.jpg",
        kala: 100,
        beats: [
          beat("whisper", "दूतः।", "He comes alone. No army at his back, no conch yet. The hall that once dragged a woman by the hair now watches a cowherd ask for peace as if peace were a small thing.", "అతడు ఒంటరిగా వస్తాడు. వెనుక సైన్యం లేదు. శంఖం ఇంకా లేదు. జుట్టు పట్టి లాగిన సభ ఇప్పుడు శాంతిని చిన్నదానిలా అడిగే గొల్లవాడిని చూస్తోంది.", { speaker: "The hall" }),
          beat("speak", "पञ्च ग्रामाः।", "Five villages. Not the kingdom. Not the insult repaid. Five villages, so that a world does not have to die to prove a point both sides already understand.", "ఐదు ఊళ్ళు. రాజ్యం కాదు. అవమానం తీర్చుకోవడం కాదు. ఐదు ఊళ్ళు. ఇరువైపులా ఇప్పటికే తెలిసిన విషయాన్ని నిరూపించడానికి ఒక లోకం చావనవసరం లేకుండా.", { speaker: "Krishna" }),
          beat("whisper", "सः जानाति उत्तरम्।", "He asks knowing the answer. An envoy who already knows is not begging. He is putting the refusal on the record, in front of the men who will have to live inside it.", "జవాబు తెలిసీ అడుగుతాడు. తెలిసిన దూత బతిమాలడం లేదు. తిరస్కారాన్ని రికార్డులో పెడుతున్నాడు. దానిలో బతకబోయే మనుషుల ముందు.", {
            speaker: "Krishna",
            intent: line("यदि दद्युः, अहं युद्धं न नेष्यामि। न दास्यन्ति।", "If they give the villages, I will not lead this war. They will not give them. I needed them to say it with their own mouths.", "ఊళ్ళు ఇస్తే ఈ యుద్ధాన్ని నేను నడపను. ఇవ్వరు. వారి నోటితో చెప్పించుకోవాలి."),
          }),
        ],
        choices: [
          {
            id: "villages",
            label: line("पञ्च देहि।", "Give the five villages. End it here.", "ఐదు ఊళ్ళు ఇవ్వు. ఇక్కడే ఆపు."),
            note: line("शान्तिः।", "The war thins. So does the story they already prefer.", "యుద్ధం పలుచనవుతుంది. వారు ఇష్టపడే కథ కూడా."),
            outcome: { dharma: 12, army: -2 },
          },
          {
            id: "nothing",
            label: line("सूचीअग्रं न।", "Not even land enough for a needle's point.", "సూది మొనకైనా నేల వద్దు."),
            note: line("कालः पूर्णः।", "You get the war you rehearsed. Kala stops pretending it can be bargained with.", "నువ్వు రిహార్సల్ చేసిన యుద్ధం వస్తుంది. కాలం బేరం వినడం ఆపుతుంది."),
            outcome: { dharma: -8 },
          },
        ],
      },
      {
        id: "arrest",
        speaker: "Duryodhana",
        emotion: "wrath",
        place: "Hastinapura",
        image: "/chronicle/fire.jpg",
        kala: 100,
        beats: [
          beat("boom", "बध्नीत एनम्।", "Duryodhana does not argue the villages. He orders the god arrested. In this hall, a man who cannot be chained is treated as a guest who has overstayed.", "దుర్యోధనుడు ఊళ్ళ గురించి వాదించడు. దేవుడిని బంధించమంటాడు. ఈ సభలో గొలుసు పడని మనిషిని ఎక్కువసేపు ఉన్న అతిథిలా చూస్తారు.", { speaker: "Duryodhana", shake: true }),
          beat("speak", "कृष्णः हसति।", "Krishna laughs. Not the butter-thief laugh. The laugh of someone who has just been handed the last excuse he was too precise to invent himself.", "కృష్ణుడు నవ్వుతాడు. వెన్న దొంగ నవ్వు కాదు. తాను కనిపెట్టకుండా ఉండాలనుకున్న చివరి సాకు అందిన మనిషి నవ్వు.", { speaker: "Krishna" }),
          beat("boom", "आभासः।", "For a breath the ceiling fails. Teeth, suns, the court itself already inside a mouth. Then he is a man again, walking out, and nobody who saw it can agree on what they saw.", "ఒక శ్వాససేపు పైకప్పు తప్పుతుంది. పళ్ళు, సూర్యులు, సభే ఒక నోట్లో. తరువాత అతడు మళ్ళీ మనిషి. బయటకు నడుస్తాడు. చూసినవారు ఏమి చూశారో ఒప్పుకోరు.", {
            speaker: "Krishna",
            shake: true,
            intent: line("पूर्णं रूपं पश्चात्। अद्य केवलं चेतावनी।", "The full form is for the field, and for a friend who will not be able to lift his bow. Today was only the warning they will call a trick.", "పూర్తి రూపం రేపు మైదానానికి. విల్లు ఎత్తలేని స్నేహితుడికి. ఈరోజు హెచ్చరిక. వారు దాన్ని ట్రిక్ అంటారు."),
          }),
        ],
      },
    ],
  },
];
