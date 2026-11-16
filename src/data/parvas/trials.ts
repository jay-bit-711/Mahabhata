import type { Line } from "@/lib/engine/types";

export type TrialQ = { ask: Line; options: [Line, Line, Line]; n: 0 | 1 | 2 };

function L(sa: string, en: string, te: string): Line {
  return { sa, en, te };
}

export const TRIALS: Record<string, TrialQ[]> = {
  vow: [
    {
      ask: L("किम् त्यक्तम्।", "What did Devavrata give up besides the throne?", "సింహాసనంతో పాటు దేవవ్రతుడు ఏమి వదిలాడు?"),
      options: [L("पत्नीम् पुत्रं च।", "A wife and a son.", "భార్యను, కొడుకును."), L("केवलं धनम्।", "Only his wealth.", "ధనం మాత్రమే."), L("अस्त्राणि।", "His weapons.", "ఆయుధాలు.")],
      n: 0,
    },
    {
      ask: L("कालः।", "What does the vow start?", "ప్రతిజ్ఞ ఏమి మొదలుపెడుతుంది?"),
      options: [L("युद्धम्।", "The war, that afternoon.", "ఆ మధ్యాహ్నం యుద్ధం."), L("घड़ी।", "The clock. Everything after is interest.", "గడియారం. తరువాతదంతా వడ్డీ."), L("विवाहः।", "A happy marriage.", "సుఖమైన పెళ్లి.")],
      n: 1,
    },
  ],
  amba: [
    {
      ask: L("अम्बा।", "What can the vow not do for Amba?", "అంబకు ప్రతిజ్ఞ ఏమి చేయలేదు?"),
      options: [L("परिणयः मुक्तिः च।", "Marry her, or free her.", "పెళ్లాడలేదు. వదలలేదు."), L("युद्धम्।", "Fight her army.", "ఆమె సైన్యంతో పోరాడలేదు."), L("शापः।", "Curse her.", "శపించలేదు.")],
      n: 0,
    },
    {
      ask: L("अग्निः।", "What does Amba become to the vow?", "ప్రతిజ్ఞకు అంబ ఏమవుతుంది?"),
      options: [L("क्षमा।", "Its forgiveness.", "దాని క్షమాపణ."), L("अन्तम्।", "The one who will end him.", "అతన్ని అంతం చేసేది."), L("माता।", "His mother.", "అతని తల్లి.")],
      n: 1,
    },
  ],
  throne: [
    {
      ask: L("गान्धारी।", "Why does Gandhari close her eyes?", "గాంధారి కళ్ళు ఎందుకు మూసుకుంది?"),
      options: [L("रोगः।", "An illness.", "జబ్బు."), L("सह।", "If he is refused the world, she refuses it with him.", "అతనికి లోకం లేకపోతే ఆమెకూ వద్దు."), L("क्रोधः।", "She hates the court.", "సభంటే ద్వేషం.")],
      n: 1,
    },
    {
      ask: L("शकुनिः।", "What does the uncle do that the brother cannot?", "సోదరుడు చేయలేనిది మామ ఏమి చేస్తాడు?"),
      options: [L("पश्यति।", "He does not close his eyes.", "అతడు కళ్ళు మూసుకోడు."), L("राज्यं त्यजति।", "He gives up the throne.", "సింహాసనం వదులుతాడు."), L("मौनम्।", "He takes a vow of silence.", "మౌనం పట్టుకుంటాడు.")],
      n: 0,
    },
  ],
  rivals: [
    {
      ask: L("कर्णः।", "What does Karna choose over the crown that was his before birth?", "పుట్టకముందే తనదైన కిరీటం కంటే కర్ణుడు ఏమి ఎంచుకుంటాడు?"),
      options: [L("मित्रता।", "Friendship.", "స్నేహం."), L("अस्त्रम्।", "A new weapon.", "కొత్త ఆయుధం."), L("वनम्।", "Exile.", "వనవాసం.")],
      n: 0,
    },
    {
      ask: L("कुण्डले।", "What tells the truth when he will not?", "అతడు చెప్పనప్పుడు నిజం ఏమి చెబుతుంది?"),
      options: [L("कुण्डले।", "The earrings.", "కుండలాలు."), L("दुर्योधनः।", "Duryodhana.", "దుర్యోధనుడు."), L("सूतः।", "The charioteer, loudly.", "సారథి బిగ్గరగా.")],
      n: 0,
    },
  ],
  poison: [
    {
      ask: L("विषम्।", "What does hatred learn in this act?", "ఈ అంకంలో ద్వేషం ఏమి నేర్చుకుంటుంది?"),
      options: [L("मधुरम्।", "That it can be sweet.", "అది తీపిగా ఉండగలదని."), L("क्षमा।", "How to forgive.", "క్షమించడం."), L("मौनम्।", "How to stay quiet.", "మౌనంగా ఉండటం.")],
      n: 0,
    },
    {
      ask: L("मृत्युः।", "Who declines Bhima, and who does not?", "భీముడిని ఎవరు వద్దన్నారు, ఎవరు వద్దనలేదు?"),
      options: [L("मृत्युः अहं च।", "Death declines him. Duryodhana will not.", "చావు వద్దంది. దుర్యోధనుడు వద్దనలేదు."), L("कुन्ती।", "Kunti declines him.", "కుంతి వద్దంది."), L("कृष्णः।", "Krishna declines him.", "కృష్ణుడు వద్దన్నాడు.")],
      n: 0,
    },
  ],
  lac: [
    {
      ask: L("सुरङ्गा।", "Where does Vidura put the tunnel?", "విదురుడు సొరంగం ఎక్కడ పెడతాడు?"),
      options: [L("दक्षिणतः।", "Under the south wall.", "దక్షిణ గోడ కింద."), L("नदी।", "In the river.", "నదిలో."), L("सभा।", "Under the dice hall.", "జూదపు సభ కింద.")],
      n: 0,
    },
    {
      ask: L("पञ्च।", "What is the price of leaving the fire?", "మంటను వదిలి వెళ్లడం ధర ఏమిటి?"),
      options: [L("सत्यम्।", "Five strangers buy their names.", "ఐదుగురు అపరిచితులు వారి పేర్లు కొంటారు."), L("कुन्ती।", "Kunti stays behind.", "కుంతి వెనుక ఉంటుంది."), L("शून्यम्।", "Nothing. The escape is clean.", "ఏమీ లేదు. తప్పించుకోవడం శుభ్రం.")],
      n: 0,
    },
  ],
  fireborn: [
    {
      ask: L("द्रौपदी।", "What does she say she is?", "ఆమె తాను ఏమని చెబుతుంది?"),
      options: [L("फलम्।", "Not the cause. The fruit they will still blame.", "కారణం కాదు. నిందించే పండు."), L("कारणम्।", "The cause of the war, and proud of it.", "యుద్ధ కారణం. గర్వంగా."), L("क्षमा।", "The forgiveness of the house.", "ఇంటి క్షమాపణ.")],
      n: 0,
    },
    {
      ask: L("अग्निः।", "When does she rise?", "ఆమె ఎప్పుడు లేస్తుంది?"),
      options: [L("ऋणम्।", "From the altar, already owed a war.", "వేదిక నుంచి. ఇప్పటికే యుద్ధం అప్పు."), L("वनम्।", "From exile, already free.", "వనవాసం నుంచి. ఇప్పటికే స్వేచ్ఛ."), L("स्वर्गः।", "From heaven, to stop the war.", "స్వర్గం నుంచి. యుద్ధం ఆపడానికి.")],
      n: 0,
    },
  ],
  strategist: [
    {
      ask: L("कृष्णः।", "Why has Krishna come?", "కృష్ణుడు ఎందుకు వచ్చాడు?"),
      options: [L("शान्तिः।", "To stop the fire.", "మంట ఆపడానికి."), L("स्थानम्।", "To stand where it must burn, and look like a friend.", "అది కావలసిన చోట నిలబడి స్నేహితుడిలా కనిపించడానికి."), L("युद्धम्।", "To take the throne himself.", "సింహాసనం తానే తీసుకోవడానికి.")],
      n: 1,
    },
    {
      ask: L("पञ्च।", "What has he known since the ferryman's price?", "పడవవాడి ధర నుంచి అతనికి ఏమి తెలుసు?"),
      options: [L("ग्रामाः।", "They will not give five villages.", "ఐదు ఊళ్ళు ఇవ్వరు."), L("जयः।", "Arjuna will refuse to fight.", "అర్జునుడు పోరాడడు."), L("क्षमा।", "Duryodhana will apologize.", "దుర్యోధనుడు క్షమిస్తాడు.")],
      n: 0,
    },
  ],
  matsya: [
    {
      ask: L("मत्स्यः।", "What does hitting the eye inherit?", "కన్ను గుచ్చడం ఏమి వారసత్వంగా తెస్తుంది?"),
      options: [L("भाग्यम्।", "Her fate. He hopes the man can carry it.", "ఆమె విధి. మోయగలడని ఆశ."), L("राज्यम्।", "Hastinapura, that night.", "ఆ రాత్రి హస్తినాపురం."), L("शान्तिः।", "Peace with the rejected kings.", "నిరాకరించిన రాజులతో శాంతి.")],
      n: 0,
    },
    {
      ask: L("अर्जुनः।", "In her own account, what is Arjuna?", "ఆమె లెక్కలో అర్జునుడు ఏమిటి?"),
      options: [L("बाणः।", "The arrow. She is the reason the eye was spinning.", "బాణం. కన్ను తిరగడానికి కారణం ఆమె."), L("धनुः।", "The bow.", "విల్లు."), L("लक्ष्यम्।", "The target.", "లక్ష్యం.")],
      n: 0,
    },
  ],
  five: [
    {
      ask: L("कुन्ती।", "What does a mother's word do?", "తల్లి మాట ఏమి చేస్తుంది?"),
      options: [L("विदारणम्।", "If he undoes it, she lied. If he keeps it, dharma tears.", "విప్పితే అమ్మ అబద్ధం. ఉంచితే ధర్మం చినిగిపోతుంది."), L("क्षमा।", "It forgives the house.", "అది ఇంటిని క్షమిస్తుంది."), L("विवाहः एकः।", "It gives Draupadi one husband.", "ద్రౌపదికి ఒక భర్తను ఇస్తుంది.")],
      n: 0,
    },
    {
      ask: L("द्रौपदी।", "What will she not do first?", "ఆమె ముందు ఏమి చేయదు?"),
      options: [L("क्षमा।", "Forgive.", "క్షమించదు."), L("विवाहः।", "Become a wife.", "భార్య కాదు."), L("प्रश्नः।", "Ask a question.", "ప్రశ్న అడగదు.")],
      n: 0,
    },
  ],
  maya: [
    {
      ask: L("हासः।", "What starts the war?", "యుద్ధం ఏమితో మొదలవుతుంది?"),
      options: [L("हासः।", "A laugh, in a hall that is not a floor.", "నవ్వు. నేల కాని సభలో."), L("चोरः।", "A stolen crown.", "దొంగిలించిన కిరీటం."), L("अस्त्रम्।", "A weapon shown too early.", "ముందే చూపిన ఆయుధం.")],
      n: 0,
    },
    {
      ask: L("दुर्योधनः।", "Whose hall does he say he will make them sit in?", "వారిని ఏ సభలో కూర్చోబెడతానని అంటాడు?"),
      options: [L("चिता।", "His own pyre.", "తన చితిలో."), L("इन्द्रप्रस्थम्।", "A new Indraprastha.", "కొత్త ఇంద్రప్రస్థంలో."), L("वनम्।", "The forest.", "అడవిలో.")],
      n: 0,
    },
  ],
  trap: [
    {
      ask: L("शकुनिः।", "How does Shakuni get Yudhishthira into the hall?", "శకుని యుధిష్ఠిరుడిని సభలోకి ఎలా తెస్తాడు?"),
      options: [L("धर्मः।", "He doesn't. The man's own dharma walks him in.", "తాను తీసుకురాడు కాదు. అతని ధర్మమే నడిపిస్తుంది."), L("सेना।", "With an army at the door.", "తలుపు దగ్గర సైన్యంతో."), L("कृष्णः।", "Krishna orders it.", "కృష్ణుడు ఆజ్ఞాపిస్తాడు.")],
      n: 0,
    },
    {
      ask: L("भीरुः।", "Why does Yudhishthira go, knowing he is lost?", "పోతానని తెలిసీ యుధిష్ఠిరుడు ఎందుకు వెళ్తాడు?"),
      options: [L("शब्दः।", "Coward is the crueler word. That is how he is owned.", "పిరికి మాట క్రూరం. అలా అతడు సొంతమవుతాడు."), L("जयः।", "He believes the dice are fair.", "పాచికలు న్యాయమని నమ్ముతాడు."), L("द्रौपदी।", "Draupadi asks him to play.", "ద్రౌపది ఆడమని అడుగుతుంది.")],
      n: 0,
    },
  ],
  hair: [
    {
      ask: L("सभा।", "What does the court choose, and what does she choose?", "సభ ఏమి ఎంచుకుంటుంది, ఆమె ఏమి ఎంచుకుంటుంది?"),
      options: [L("नियमः प्रतिज्ञा च।", "A technicality. A vow.", "ఒక సాంకేతికత. ఒక ప్రతిజ్ఞ."), L("युद्धम्।", "War, that hour.", "ఆ గంటలో యుద్ధం."), L("क्षमा।", "Forgiveness, together.", "ఇద్దరూ క్షమాపణ.")],
      n: 0,
    },
    {
      ask: L("वस्त्रम्।", "What does she keep, when he keeps the cloth?", "అతడు వస్త్రం ఉంచినప్పుడు ఆమె ఏమి ఉంచుకుంటుంది?"),
      options: [L("मुखानि।", "The faces. Only that is hers.", "ముఖాలు. అది మాత్రమే ఆమెది."), L("केशाः बद्धाः।", "Her hair, tied the same day.", "ఆ రోజే కట్టిన జుట్టు."), L("क्षमा।", "His excuse.", "అతని సాకు.")],
      n: 0,
    },
  ],
  exile: [
    {
      ask: L("कवचम्।", "What does Karna give away, and what was already given?", "కర్ణుడు ఏమి ఇచ్చేస్తాడు, ఏమి ముందే ఇచ్చేశాడు?"),
      options: [L("कवचम् जीवितम्।", "The armor to a god. His life was already a friend's.", "కవచం దేవుడికి. ప్రాణం ముందే స్నేహితుడిది."), L("गाण्डीवम्।", "Arjuna's bow.", "అర్జునుడి విల్లు."), L("राज्यम्।", "Indraprastha.", "ఇంద్రప్రస్థం.")],
      n: 0,
    },
    {
      ask: L("केशाः।", "What does Krishna say will win, not the weapons?", "ఆయుధాలు కాక ఏమి గెలుస్తుందని కృష్ణుడు అంటాడు?"),
      options: [L("केशाः।", "The thing she refused to tie.", "ఆమె కట్టడానికి నిరాకరించింది."), L("पाशुपतम्।", "The Pashupata alone.", "పాశుపతం ఒక్కటే."), L("शान्तिः।", "Another embassy.", "మరో రాయబారం.")],
      n: 0,
    },
  ],
  envoy: [
    {
      ask: L("ग्रामाः।", "What does Krishna ask for, and what does he already know?", "కృష్ణుడు ఏమి అడుగుతాడు, ఏమి ముందే తెలుసు?"),
      options: [L("पञ्च। न।", "Five villages. They will not give them.", "ఐదు ఊళ్ళు. ఇవ్వరు."), L("अर्धं राज्यम्।", "Half the kingdom, and he hopes.", "సగం రాజ్యం. ఆశతో."), L("क्षमा।", "An apology, which he expects.", "క్షమాపణ. అది వస్తుందని.")],
      n: 0,
    },
    {
      ask: L("रूपम्।", "What is the form in the court, compared with the field?", "సభలోని రూపం మైదానంతో పోలిస్తే ఏమిటి?"),
      options: [L("चेतावनी।", "Only the warning. The full form is for a friend who cannot lift his bow.", "హెచ్చరిక మాత్రమే. పూర్తి రూపం విల్లు ఎత్తలేని స్నేహితుడికి."), L("पूर्णम्।", "The full cosmic form, already.", "ఇప్పటికే పూర్తి విశ్వరూపం."), L("हासः।", "A joke.", "ఒక జోక్.")],
      n: 0,
    },
  ],
  dust: [
    {
      ask: L("भीष्मः।", "What poison does Bhishma agree to drink?", "భీష్ముడు ఏ విషం తాగడానికి అంగీకరిస్తాడు?"),
      options: [L("वचनम्।", "His word is his dharma, and it is guarding adharma.", "నా మాటే నా ధర్మం. అది అధర్మాన్ని కాపాడుతోంది."), L("विषम् वास्तविकम्।", "A cup at supper.", "విందులో ఒక గిన్నె."), L("शस्त्रम्।", "Krishna's weapon.", "కృష్ణుడి ఆయుధం.")],
      n: 0,
    },
    {
      ask: L("सेना।", "Who leads the wrong army?", "తప్పు సైన్యాన్ని ఎవరు నడుపుతారు?"),
      options: [L("पितामहः।", "The grandsire, bound to the throne.", "తాత. సింహాసనానికి బంధింపబడి."), L("कृष्णः।", "Krishna.", "కృష్ణుడు."), L("विदुरः।", "Vidura.", "విదురుడు.")],
      n: 0,
    },
  ],
  gita: [
    {
      ask: L("गाण्डीवम्।", "What is Arjuna's collapse, if it is not fear?", "అర్జునుడి కూలడం భయం కాకపోతే ఏమిటి?"),
      options: [L("शोकः।", "Grief, asking to be called mercy.", "శోకం. దయ అనిపించుకోమని అడుగుతోంది."), L("व्याधिः।", "A sickness of the arm.", "చేతి జబ్బు."), L("विश्वासः।", "Trust in Duryodhana.", "దుర్యోధనుడిపై నమ్మకం.")],
      n: 0,
    },
    {
      ask: L("कालः।", "What does Krishna refuse to buy with comfort?", "ఓదార్పుతో కృష్ణుడు ఏమి కొనడు?"),
      options: [L("कुलम्।", "A century of cruelty, by letting the house remain.", "ఇల్లు నిలిచి ఉంటే శతాబ్దపు క్రూరత్వం."), L("गाण्डीवम्।", "A new bow.", "కొత్త విల్లు."), L("स्वर्गः।", "Heaven for himself.", "తనకు స్వర్గం.")],
      n: 0,
    },
  ],
  titans: [
    {
      ask: L("अभिमन्युः।", "What dies the day the boy dies inside the wheel?", "పిల్లవాడు చక్రం లోపల చనిపోయిన రోజు ఏమి చస్తుంది?"),
      options: [L("धर्मयुद्धम्।", "The phrase 'a dharma war'.", "‘ధర్మయుద్ధం’ అనే మాట."), L("कृष्णः।", "Krishna's vow of peace.", "కృష్ణుడి శాంతి ప్రతిజ్ఞ."), L("सेना।", "Both armies, that noon.", "ఆ మధ్యాహ్నం రెండు సైన్యాలు.")],
      n: 0,
    },
    {
      ask: L("कर्णः।", "Who killed Karna, in Krishna's account?", "కృష్ణుడి లెక్కలో కర్ణుడిని ఎవరు చంపారు?"),
      options: [L("मित्रता।", "Friendship. Krishna only said the hour.", "స్నేహం. కృష్ణుడు గంటను చెప్పాడు."), L("पङ्कः।", "The mud, alone.", "బురద ఒక్కటే."), L("शकुनिः।", "Shakuni, from the tent.", "గుడారం నుంచి శకుని.")],
      n: 0,
    },
  ],
  curse: [
    {
      ask: L("गान्धारी।", "What does Krishna do with the curse?", "శాపంతో కృష్ణుడు ఏమి చేస్తాడు?"),
      options: [L("स्वीकरोति।", "He accepts it. The rule does not spare the instrument.", "అంగీకరిస్తాడు. నియమం సాధనాన్ని వదలదు."), L("निवारयति।", "He cancels it.", "అది రద్దు చేస్తాడు."), L("हसति केवलम्।", "He laughs and leaves the field.", "నవ్వి మైదానం వదిలేస్తాడు.")],
      n: 0,
    },
    {
      ask: L("सत्यम्।", "Who is right, on the field of sons?", "కొడుకుల మైదానంలో ఎవరు నిజం?"),
      options: [L("माता।", "The mother. He says so, and stays.", "తల్లి. అతడు అంటాడు. ఉంటాడు."), L("सभा।", "The court that is already gone.", "పోయిన సభ."), L("कोऽपि न।", "No one. The curse is theater.", "ఎవరూ కాదు. శాపం నాటకం.")],
      n: 0,
    },
  ],
  ascent: [
    {
      ask: L("श्वा।", "What does the dog say it is not?", "కుక్క తాను కానని ఏమి చెబుతుంది?"),
      options: [L("धर्मः।", "Dharma. It is the one who does not leave.", "ధర్మం. అది వదలనిది."), L("युधिष्ठिरः।", "Yudhishthira's shadow.", "యుధిష్ఠిరుడి నీడ."), L("इन्द्रः।", "A god in disguise, asking for worship.", "పూజ కోరే దేవుడు.")],
      n: 0,
    },
    {
      ask: L("स्वर्गः।", "What is the first clean answer?", "మొదటి శుభ్రమైన జవాబు ఏమిటి?"),
      options: [L("द्वारम्।", "He refuses a perfect door.", "అతడు పరిపూర్ణ తలుపును నిరాకరిస్తాడు."), L("प्रवेशः।", "He enters without the dog.", "కుక్క లేకుండా లోపలికి వెళ్తాడు."), L("शोकः।", "He turns back down the mountain.", "అతడు కొండ దిగి వెనక్కి వస్తాడు.")],
      n: 0,
    },
  ],
};

export function rankName(passed: number) {
  if (passed >= 20) return { sa: "धर्मः", en: "Dharma", te: "ధర్మం" };
  if (passed >= 15) return { sa: "कालः", en: "Kala", te: "కాలం" };
  if (passed >= 10) return { sa: "साक्षी", en: "Sakshi", te: "సాక్షి" };
  if (passed >= 5) return { sa: "पाठः", en: "Patha", te: "పాఠం" };
  return { sa: "श्रोता", en: "Shrota", te: "శ్రోత" };
}
