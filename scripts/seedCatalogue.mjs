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
    composition: "Advanced multivitamin and herbal extract gel for udder care and calcium support.",
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
    composition: "Gluconeogenic precursors with electrolytes and B-complex for rapid energy recovery.",
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
    composition: "Fortified amino acids, trace elements, and balanced vitamins for production and udder health.",
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
    composition: "Probiotic yeast and multi-mineral matrix formulated for mastitis recovery and udder balance.",
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
    composition: "Broad-spectrum anthelmintic actives with liver-supporting botanical extract.",
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
    composition: "Dual NSAID injection for fast relief in pain, fever, and acute inflammation.",
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
    composition: "Herbal reproductive tonic with omega fatty acids and trace mineral support after A.I.",
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
    composition: "Liver extract and lipotropic nutrients to support detoxification and appetite.",
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
    composition: "Phyto-actives for wound care, fly repellency, and inflammation control in field use.",
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
    composition: "Mineral and standardized phyto extract blend for reproductive stability and abortion risk reduction.",
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
    composition: "High-energy calcium propionate gel with cofactors and herbals for milk fever support.",
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
    composition: "Ionic oral calcium with vitamins, trace elements, and Jivanti for sustained lactation performance.",
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
