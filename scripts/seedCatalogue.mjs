import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const products = [
  {
    name: "KB-MAST Gel Advance",
    description: "A highly complex gel formulation containing advanced multivitamins and herbal extracts for maximum udder care and calcium delivery.",
    price: 350,
    type: "Liquid",
    quantity: "300 gm",
    dosage: "Give one bottle at the first sign of calving & give another bottle after 6 to 12 hours as needed",
    composition: "Each 100 ml Provides:\nCalcium – 10000 mg\nPhosphorus – 5000 mg\nVitamin D3 – 2000 IU\nVitamin B12 – 400 mcg\nPleurotus Minifloc. Ext. – 2000 mg\nClematis Mandshurica – 2 gm\nTrichosanthes Kirilowii – 2 gm\nPaeonia Vulgaris – 5 gm\nCibotium Barometz – 12 gm\nSilymarin – 300 mg\nMagnesium – 1500 mg\nCalcium Propionate – 2500 mg\nChromium – 300 mg\nAppropriate averages of vitamins are added.",
    benefits: [
      "For Preventive & Treatment of Hypo-Calcemia & Milk Fever",
      "To Avoid Sudden milk drop due to Calcium deficiency",
      "To increase the milk Production",
      "For easy calving (Smooth uterine contraction, Timely Expulsion of Placenta)",
      "To Avoid other secondary problem caused by calcium Deficiency"
    ],
    imageUrl: "/Products/KB mast gel advance.jpeg"
  },
  {
    name: "KB POWER Liquid",
    description: "Contains Gluconeogenic Precursors with Electrolytes and Vitamin B Complex to provide instant and sustained energy.",
    price: 450,
    type: "Liquid",
    quantity: "1000 ml & 250 ml",
    dosage: "Large Animals : 200 ml daily for 5 days\nSmall Animals : 100 ml daily for 5 days",
    composition: "Each 1000 ml contains:\nGluconeogenic Precursors with Electrolytes Vitamin B Complex",
    benefits: [
      "Helps to provide instant & sustained energy to animals",
      "To Prevent the Ketosis",
      "To restore the normal energy level after Calving",
      "Before & after transportation of animal",
      "As a supportive therapy with during protozoal infection",
      "To prevents the Heat Stroke",
      "Normal Weakness & Debility"
    ],
    imageUrl: "/Products/KB power.jpeg"
  },
  {
    name: "KB AH Multivitamin Liquid Advance",
    description: "A scientific formulation containing fortified amino acids and trace minerals for superior udder development and higher production.",
    price: 500,
    type: "Liquid",
    quantity: "250 ml, 500 ml & 1 liter",
    dosage: "Large Animals : 10 to 20 ml daily\nSmall Animals : 2 to 5 ml daily\nPoultry : 5 ml per 100 birds",
    composition: "Each 1 ml Contains:\nVitamin A – 5000 IU\nVitamin D3 – 1000 IU\nVitamin E – 50 mg\nVitamin B1 – 1000 mcg\nVitamin B6 – 20 mg\nVitamin C – 25 mg\nZinc – 20 mg\nCobalt – 100 mcg\nCopper – 500 mcg\nSelenium – 6 mcg\nPurified Amino Acid – 80 mg\nBase – q.s.",
    benefits: [
      "For Udder Development",
      "For Optimize the milk production",
      "To prevents heat stress & Winter Stress",
      "To makes hoofs healthy",
      "To Prevent Lameness"
    ],
    imageUrl: "/Products/KBAH multivitamin liquid.jpeg"
  },
  {
    name: "KB-MAST XP POWDER",
    description: "Probiotic and multi-mineral infused powder for rapid mastitis recovery and continuous udder health maintenance.",
    price: 600,
    type: "Powder",
    quantity: "60 gm × 4 (Pouch)",
    dosage: "Large Animals : 1 pouch daily for 4 continuous days. Repeat if required.",
    composition: "Each 60 gm Contains:\nBiotin – 200 mcg\nLactobacillus – 200 million CFU\nPotassium Citrate – 25 gm\nPotassium Iodide – 400 mcg\nVitamin A – 10000 IU\nVitamin D3 – 2000 IU\nVitamin E – 100 mg\nVitamin C – 100 mg\nVitamin K – 120 mg\nL-Lysine – 2000 mg\nCopper – 800 mg\nZinc Sulphate – 825 mg\nManganese Sulphate – 2000 mg\nSelenium – 4 mg\nCobalt – 40 mg\nSaccharomyces – 120 gm\nBromelain – 320 mg\nMethionine – 1500 mg\nLive Yeast – 5000 million CFU\nBeta-Carotene – 200 mg",
    benefits: [
      "Helps to prevent Frequent Mastitis",
      "Helps in Faster Recovery from Mastitis",
      "Helps to maintain ideal Udder pH",
      "Helps to restore optimum milk production after mastitis treatment",
      "Helps to make keratin & epithelium healthy and Strong"
    ],
    imageUrl: "/Products/KB mast XP poweder.jpeg"
  },
  {
    name: "KB-ORE-DS Bolus",
    description: "Highly effective anthelminthic bolus designed to eradicate endo-parasites while regenerating liver flow via Silymarin.",
    price: 220,
    type: "Powder",
    quantity: "Bolus",
    dosage: "1 bolus for 400 Kg body weight",
    composition: "Each bolus Contains:\nOxyclozanide – 4 g\nLevamisole Hydrochloride – 2 g\nSilymarin – 400 mg",
    benefits: [
      "Kills all type of Worms (Liver Fluke, Round worms & Tape Worms)",
      "Effective on all stages of Worms",
      "Complete eradication",
      "Safe in pregnancy",
      "Helps to improve liver functioning"
    ],
    imageUrl: "/Products/kb-ore ds.jpeg"
  },
  {
    name: "KB-MAST-FMG Injection",
    description: "Rapidly acting 15-minute onset injection for severe musculoskeletal disorders, lameness, and heavy infections.",
    price: 180,
    type: "Liquid",
    quantity: "20 ml & 100 ml Pack / Bolus: 1×10 Strips",
    dosage: "1–2 ml per 50 kg BW by slow I.V. or I.M. route once daily for 3–5 days\nHorses: 1 ml / 45 kg BW slow I.V. route once daily for 3–5 days",
    composition: "Each ml contains:\nFlunixin Meglumine I.P. – 50 mg\nMeloxicam I.P. – 5 mg\nBenzyl Alcohol – 2% v/v (Preservative)\nWater for Injection I.P. – q.s.",
    benefits: [
      "Arthritis, Bursitis, Laminitis, Myositis, Lameness",
      "Mastitis, Endotoxaemia",
      "Colic Pain",
      "Post – Operative Pain",
      "Safe in Pregnancy"
    ],
    imageUrl: "/logo.jpeg"
  },
  {
    name: "KB-CONC AFTER A.I.",
    description: "An advanced herbal and mineral complex to ensure conception containing active Omega-3 and Omega-6 Fatty Acids.",
    price: 320,
    type: "Liquid",
    quantity: "225 ml",
    dosage: "1 Bottle after A.I. to improve conception rate",
    composition: "Each 225 ml contains herbal extract of:\nAbruma Augusta, Cyperus Rotundus, Bacopa Monnieri, Rubia Cordifolia, Tribulus Terrestris, Withania Somnifera, Glycyrrhiza Glabra\nWith Added Vitamins & Minerals:\nVitamin A – 500000 IU, Vitamin E – 500 mg, Copper – 2000 mg, Cobalt – 50 mg, Zinc – 1000 mg, Iodine – 200 mg, Manganese – 2000 mg, Omega-3 & Omega-6 Fatty Acids",
    benefits: [
      "Helps to produce healthy ova",
      "Improves the count of ova",
      "Helps to ovulation & fertilization",
      "Improves conception rate",
      "Reduce the chance of repeat breeding",
      "To prevent early embryonic mortality"
    ],
    imageUrl: "/Products/KB-conc.jpeg"
  },
  {
    name: "KB-ORE Forte",
    description: "The ultimate fortified daily supplement to protect reproductive performance and eliminate metabolic deficiencies natively.",
    price: 880,
    type: "Powder",
    quantity: "1 Kg, 5 Kg & 25 Kg",
    dosage: "Large Animal : 50 gm daily once a day\nSmall Animal : 25 gm daily once a day\nFor Reproduction : 50 gm daily once a day (45 days or more intensive supplement)",
    composition: "Specialized macro & micro minerals complex for cattle.",
    benefits: [
      "To Avoid the chances of metabolic disorders",
      "Helps in growth milk production",
      "To improve reproductive performance",
      "For Healthy calf & Maintains Health",
      "Improved Fertility",
      "Maintain Bio-availability of Minerals"
    ],
    imageUrl: "/Products/kb-ore forte powder.jpeg"
  },
  {
    name: "LIVSOL Liquid",
    description: "Heavy-duty liver extract tonic designed to rejuvenate damaged liver cells and radically correct fatty liver syndrome via sorbitol.",
    price: 210,
    type: "Liquid",
    quantity: "100 ml & 1 L",
    dosage: "Large Animal: 100 ml daily for 10 days\nSmall Animal: 50 ml daily for 10 days",
    composition: "Each 50 ml Contains:\nCholine Chloride – 75 mg\nSorbitol – 10 mg\nFolic Acid – 45 mcg\nPotassium Citrate – 3 mg\nSilymarin – 100 mg\nLiver Extract – 500 mg\nFerric Ammonium Citrate – 20 mg\nRiboflavin – 10 mg\nCalcium Lactate – 500 mg\nNicotinamide – 1000 mg\nVitamin B12 – 20 mcg\nVitamin B2 – 20 mg",
    benefits: [
      "Rejuvenate & regenerate damaged liver cells",
      "Improves Appetite",
      "Helps to improve secretion of bile",
      "Improve Productivity",
      "Helps to prevent fatty liver syndrome",
      "Helps to improve feed digestion by secreting enzyme"
    ],
    imageUrl: "/Products/Livsol liquid electra.jpeg"
  },
  {
    name: "KB-ORE SOL Advance Spray",
    description: "An incredibly potent all-natural fly repellent and maggot-killing healing spray fortified directly with Turpentine and Devdaru.",
    price: 150,
    type: "Liquid",
    quantity: "100 ml Spray Can",
    dosage: "Spray directly on affected deep seated, septic, or FMD lesion wounds.",
    composition: "Features & Benefits:\nDevdaru (Cedrus Deodara) - Anti-microbial\nNeem (Azadirachta indica) - Worms/Bacteria combat\nTurpentine Oil (Pinus roxburghii) - Fly Repellent & Maggotsidal\nCurcumin (Curcuma longa) - Controls inflammation",
    benefits: [
      "All types of wound like Septic, Aseptic, Deep penetrated & Wide spread",
      "Maggotted wounds",
      "Skin infection like Dermatomycosis",
      "Deep seated wounds as in foot lesion of FMD & Foot rot",
      "Wounds caused due to shearing in sheep"
    ],
    imageUrl: "/Products/kb sol spray.jpeg"
  },
  {
    name: "KB-ORE SAFE",
    description: "Strictly tailored to eliminate threatened or habitual abortions through stabilized multi-mineral complexes.",
    price: 360,
    type: "Powder",
    quantity: "50g × 5 Sachet",
    dosage: "Large animals: 50 gm once daily\nSmall Animals: 10 to 15 gm once daily",
    composition: "Each 50 gm contains:\nMulti Minerals Complex fortified with standardized Phyto Extracts",
    benefits: [
      "Helps to decrease the cases of abortion",
      "Protects from threatened abortion",
      "Prevents habitual abortion",
      "Helps to decrease the cases of repeat breeding",
      "Reduces the incidences of prolapse"
    ],
    imageUrl: "/Products/KBor safe powder.jpeg"
  },
  {
    name: "JEARSOL-XP",
    description: "A potent analgesic and anti-inflammatory liquid perfectly calibrated to trigger timely placental expulsion.",
    price: 400,
    type: "Liquid",
    quantity: "1 Ltr",
    dosage: "Large Animal: 200 ml just after calving followed by 100 ml daily next 3 continuous days\nSmall Animal: 100 ml just after calving followed by 50 ml next 3 continuous days",
    composition: "Standardized anti-inflammatory extraction for immediate delivery.",
    benefits: [
      "Anti-inflammatory, Analgesic, Anti-viral effect",
      "Anti-bacterial and Anti-fungal",
      "Helps in timely expulsion of placenta membrane",
      "Helps in timely disappearance of lochial discharges",
      "Helps in timely involution of uterine horn",
      "Helps in timely onset of estrus cycle",
      "Helps to prevents uterine infections"
    ],
    imageUrl: "/Products/jearsol xp.jpeg"
  },
  {
    name: "CALSOL Gel",
    description: "High-octane Calcium Propionate gel for rapid prevention and clinical treatment of milk fever hypocalcemia.",
    price: 250,
    type: "Liquid",
    quantity: "3 Days Supplementation",
    dosage: "Topical application or oral syringe gel delivery.",
    composition: "Calcium – 7200 mg\nPhosphorus – 3600 mg\nVitamin D3 – 10000 IU\nVitamin B12 – 400 mcg\nBiotin – 200 mg\nCalcium Propionate – 2500 mg\nCobalt – 100 mcg\nManganese – 10 mg\nZinc – 250 mg\nLysine – 100 mg\nMagnesium – 300 mg\nPure herbs extracts",
    benefits: [
      "For Prevention & Treatment of Hypo-Calcemia & Milk Fever",
      "To Avoid Sudden milk drop due to Calcium deficiency",
      "To increase the milk Production",
      "For easy calving",
      "To Avoid other secondary problem caused by calcium deficiency"
    ],
    imageUrl: "/Products/calsol gold.jpeg"
  },
  {
    name: "CALSOL GOLD",
    description: "An advanced ionic oral calcium supplement uniquely blended with Jivanti and Chromium for absolutely elite dairy yields.",
    price: 600,
    type: "Liquid",
    quantity: "Bulk Options Available",
    dosage: "Standard daily oral supplementation.",
    composition: "Calcium – 7000 mg\nPhosphorus – 3500 mg\nVitamin A – 80000 IU\nVitamin D3 – 35000 IU\nVitamin B12 – 100 mcg\nMagnesium – 500 mg\nLysine – 100 mg\nPotassium Iodide – 500 mg\nBiotin – 20 mg\nChromium – 200 mg\nSorbitol – 300 mg\nJivanti – 10 mg",
    benefits: [
      "Helps in attaining timely peak lactation",
      "Helps in maintenance of peak lactation for longer period",
      "Helps to gain high milk production after calving",
      "Maintains udder health and prevent mastitis"
    ],
    imageUrl: "/Products/calsol multivitamin.jpeg"
  }
];

async function seed() {
  console.log("Starting full DB Catalogue Seeding via Prisma...");
  for (const product of products) {
    try {
      const created = await prisma.product.create({
        data: product
      });
      console.log(`✅ successfully seeded: ${created.name}`);
    } catch (e) {
      console.error(`❌ failed to seed ${product.name}: ${e.message}`);
    }
  }
  await prisma.$disconnect();
}

seed().catch(console.error);
