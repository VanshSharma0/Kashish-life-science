import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedRow = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  type: string;
  quantity: string;
  dosage?: string;
  composition?: string;
  benefits: string[];
  variantGroupId?: string;
  catalogTitle?: string;
  variantSort?: number;
};

/**
 * Summaries, indications, dosages, compositions & list prices per product brief.
 * Run: `npx prisma db seed`
 */
const seedData: SeedRow[] = [
  // —— CALSOL Gel (CALSOL GEL) ——
  {
    name: "CALSOL Gel",
    description:
      "Oral ionic calcium with the power of multivitamins. Supports calcium balance, productivity, and recovery around high demand periods.",
    price: 150,
    imageUrl: "/Products/calsol multivitamin gel 300 gm.jpeg",
    type: "Liquid",
    quantity: "300 gm",
    dosage: "As per label or veterinarian.",
    benefits: [
      "For prevention & treatment of hypocalcemia (milk fever)",
      "To avoid sudden milk drop due to calcium deficiency",
      "To increase milk production",
      "For easy calving (smooth uterine contraction, timely expulsion of placenta)",
      "To avoid other secondary problems caused by calcium deficiency",
      "To ensure faster recovery",
    ],
  },

  // —— CALSOL GOLD ——
  {
    name: "CALSOL GOLD",
    catalogTitle: "CALSOL GOLD",
    variantGroupId: "calsol-gold",
    variantSort: 0,
    description:
      "Oral calcium & phosphorus support for peak lactation, udder health, and post-calving recovery in dairy animals.",
    price: 500,
    imageUrl: "/Products/calsol gold 5 ltr.jpeg",
    type: "Liquid",
    quantity: "5 Ltr",
    dosage: "Large animals: 100 ml/day. Small animals: 30 ml/day (or as per veterinarian).",
    benefits: [
      "Helps in attaining timely peak lactation",
      "Helps maintain peak lactation for a longer period",
      "Helps increase milk production after calving",
      "Maintains udder health and helps prevent mastitis",
    ],
  },
  {
    name: "CALSOL GOLD",
    catalogTitle: "CALSOL GOLD",
    variantGroupId: "calsol-gold",
    variantSort: 1,
    description:
      "Oral calcium & phosphorus support for peak lactation, udder health, and post-calving recovery in dairy animals.",
    price: 2500,
    imageUrl: "/Products/calsol gold 5 ltr.jpeg",
    type: "Liquid",
    quantity: "20 Ltr",
    dosage: "Large animals: 100 ml/day. Small animals: 30 ml/day (or as per veterinarian).",
    benefits: [
      "Helps in attaining timely peak lactation",
      "Helps maintain peak lactation for a longer period",
      "Helps increase milk production after calving",
      "Maintains udder health and helps prevent mastitis",
    ],
  },

  // —— KB-MAST Gel Advance (topical; item 2 in brief had copy-paste error — mastitis/udder use) ——
  {
    name: "KB-MAST Gel Advance",
    description:
      "Topical udder gel for mastitis prevention and teat/udder care alongside milking hygiene and veterinary protocols.",
    price: 237.5,
    imageUrl: "/Products/KB mast gel advance 300gm.jpeg",
    type: "Liquid",
    quantity: "300 gm",
    dosage:
      "Apply to cleaned udder and teat skin as per farm protocol and label. For external use; not for oral drench.",
    benefits: [
      "Helps prevent frequent mastitis when used with good hygiene",
      "Helps in faster recovery from mastitis episodes",
      "Helps maintain ideal udder pH",
      "Helps restore optimal milk production after mastitis treatment",
      "Helps make keratin layer & epithelium healthy and strong",
    ],
  },

  // —— KB-MAST XP ——
  {
    name: "KB-MAST XP Powder",
    catalogTitle: "KB-MAST XP Powder",
    variantGroupId: "kb-mast-xp",
    variantSort: 0,
    description:
      "Oral mastitis-support powder for udder health, pH balance, and recovery support with veterinary treatment.",
    price: 350,
    imageUrl: "/Products/KB mast XP poweder 4x60gm tablets.jpeg",
    type: "Powder",
    quantity: "4 × 60 g",
    dosage:
      "Large animals: 1 pouch daily for 3 continuous days; repeat if required (as per label/veterinarian).",
    benefits: [
      "Helps prevent frequent mastitis",
      "Helps in faster recovery from mastitis",
      "Helps maintain ideal udder pH",
      "Helps restore optimal milk production after mastitis treatment",
      "Helps make keratin layer & epithelium healthy and strong",
    ],
  },
  {
    name: "KB-MAST XP Powder",
    catalogTitle: "KB-MAST XP Powder",
    variantGroupId: "kb-mast-xp",
    variantSort: 1,
    description:
      "Oral mastitis-support powder for udder health, pH balance, and recovery support with veterinary treatment.",
    price: 87.5,
    imageUrl: "/Products/KB mast XP poweder 4x60gm tablets.jpeg",
    type: "Powder",
    quantity: "60 g",
    dosage:
      "Large animals: 1 pouch daily for 3 continuous days; repeat if required (as per label/veterinarian).",
    benefits: [
      "Helps prevent frequent mastitis",
      "Helps in faster recovery from mastitis",
      "Helps maintain ideal udder pH",
      "Helps restore optimal milk production after mastitis treatment",
    ],
  },

  // —— KB-MAST Powder 3×60 g (section 10 — not on price list; nominal price) ——
  {
    name: "KB-MAST Powder",
    description:
      "Oral mastitis-support powder pack (3 pouches). Use as part of udder health programmes under veterinary guidance.",
    price: 325,
    imageUrl: "/Products/KB-mast powder 3x60g.png",
    type: "Powder",
    quantity: "3 × 60 g",
    dosage:
      "Large animals: 1 pouch daily for 3 continuous days; repeat if required. Presentation: 3 × 60 g pouch.",
    benefits: [
      "Helps prevent frequent mastitis",
      "Helps in faster recovery from mastitis",
      "Helps maintain ideal udder pH",
      "Helps restore optimal milk production after mastitis treatment",
      "Helps make keratin layer & epithelium healthy and strong",
    ],
  },

  // —— KB-MAST FMG ——
  {
    name: "KB-MAST FMG Injection",
    catalogTitle: "KB-MAST FMG",
    variantGroupId: "kb-mast-fmg",
    variantSort: 0,
    description:
      "FMG injectable for veterinary mastitis / udder therapy protocols under prescription.",
    price: 125,
    imageUrl: "/Products/kb-mast-fmg injection 100ml.jpeg",
    type: "Liquid",
    quantity: "20 ml",
    dosage: "Veterinary use only — strictly as prescribed.",
    benefits: [
      "Injectable support within veterinary mastitis treatment plans",
      "For use when injectable therapy is indicated",
    ],
  },
  {
    name: "KB-MAST FMG Injection",
    catalogTitle: "KB-MAST FMG",
    variantGroupId: "kb-mast-fmg",
    variantSort: 1,
    description:
      "FMG injectable for veterinary mastitis / udder therapy protocols under prescription.",
    price: 500,
    imageUrl: "/Products/kb-mast-fmg injection 100ml.jpeg",
    type: "Liquid",
    quantity: "100 ml",
    dosage: "Veterinary use only — strictly as prescribed.",
    benefits: [
      "Injectable support within veterinary mastitis treatment plans",
      "For use when injectable therapy is indicated",
    ],
  },
  {
    name: "KB-MAST FMG Bolus",
    catalogTitle: "KB-MAST FMG",
    variantGroupId: "kb-mast-fmg",
    variantSort: 2,
    description:
      "FMG bolus presentation for oral udder-health support as per label and veterinarian.",
    price: 112.5,
    imageUrl: "/Products/kb-mast-fmg advance Injection 10x1x1 bolus.jpeg",
    type: "Powder",
    quantity: "1 bolus",
    dosage: "As per label or veterinarian.",
    benefits: [
      "Bolus option for field use alongside mastitis protocols",
      "Complements prevention and recovery programmes",
    ],
  },

  // —— KB POWER ——
  {
    name: "KB POWER Advance Liquid",
    catalogTitle: "KB POWER Advance Liquid",
    variantGroupId: "kb-power",
    variantSort: 0,
    description:
      "Energy support for ketosis risk, calving stress, poor intake, weakness, transport, and metabolic challenges. Provides instant & sustained energy through propionate, liver support, glucose, and niacin (co-factor); eugenol supports TVFA and may reduce rumen methane (as per formulation).",
    price: 175,
    imageUrl: "/Products/KB power  advance liquid 250ml.jpeg",
    type: "Liquid",
    quantity: "250 ml",
    dosage: "Large animals: 200 ml daily for 5 days. Small animals: 100 ml daily for 5 days (or as per veterinarian).",
    benefits: [
      "Provides instant & sustained energy to animals",
      "To prevent ketosis; to restore normal energy after calving",
      "Before & after transportation; supportive therapy in protozoal infections",
      "To prevent heat stroke; for weakness & debility",
      "Used in energy shortage from calving stress, drop in feed intake, hypoglycaemia, debility, transport, milk production, metabolic disorders",
    ],
  },
  {
    name: "KB POWER Advance Liquid",
    catalogTitle: "KB POWER Advance Liquid",
    variantGroupId: "kb-power",
    variantSort: 1,
    description:
      "Energy support for ketosis risk, calving stress, poor intake, weakness, transport, and metabolic challenges. Provides instant & sustained energy through propionate, liver support, glucose, and niacin (co-factor); eugenol supports TVFA and may reduce rumen methane (as per formulation).",
    price: 625,
    imageUrl: "/Products/KB power  advance liquid 250ml.jpeg",
    type: "Liquid",
    quantity: "1 Ltr",
    dosage: "Large animals: 200 ml daily for 5 days. Small animals: 100 ml daily for 5 days (or as per veterinarian).",
    benefits: [
      "Provides instant & sustained energy to animals",
      "To prevent ketosis; to restore normal energy after calving",
      "Before & after transportation; supportive therapy in protozoal infections",
      "To prevent heat stroke; for weakness & debility",
    ],
  },

  // —— LIVSOL Liquid ——
  {
    name: "LIVSOL Liquid Electra",
    catalogTitle: "LIVSOL Liquid",
    variantGroupId: "livsol-electra",
    variantSort: 0,
    description:
      "Herbal liver tonic with the power of iron, vitamins & minerals. Supports liver repair, appetite, bile secretion, and productivity.",
    price: 62.5,
    imageUrl: "/Products/Livsol liquid electra 100ml.jpeg",
    type: "Liquid",
    quantity: "100 ml",
    dosage: "Large animals: 100 ml daily for 10 days. Small animals: 50 ml daily for 10 days (or as per veterinarian).",
    benefits: [
      "Rejuvenates & regenerates damaged liver cells",
      "Improves appetite",
      "Helps improve secretion of bile",
      "Improves productivity",
      "Helps prevent fatty liver syndrome",
      "Helps improve feed digestion by enzyme secretion",
    ],
  },
  {
    name: "LIVSOL Liquid Electra",
    catalogTitle: "LIVSOL Liquid",
    variantGroupId: "livsol-electra",
    variantSort: 1,
    description:
      "Herbal liver tonic with the power of iron, vitamins & minerals. Supports liver repair, appetite, bile secretion, and productivity.",
    price: 237.5,
    imageUrl: "/Products/Livsol liquid 1 ltr.png",
    type: "Liquid",
    quantity: "1 Ltr",
    dosage: "Large animals: 100 ml daily for 10 days. Small animals: 50 ml daily for 10 days (or as per veterinarian).",
    benefits: [
      "Rejuvenates & regenerates damaged liver cells",
      "Improves appetite",
      "Helps improve secretion of bile",
      "Improves productivity",
      "Helps prevent fatty liver syndrome",
      "Helps improve feed digestion by enzyme secretion",
    ],
  },

  // —— KB AH Multivitamin Advance Liquid (100 / 250 / 500 / 1 L) ——
  {
    name: "KB AH Multivitamin Advance Liquid",
    catalogTitle: "KB AH Multivitamin Advance Liquid",
    variantGroupId: "kbah-advance",
    variantSort: 0,
    description:
      "Scientific multivitamin formulation for udder development and higher production (Advance line).",
    price: 100,
    imageUrl: "/Products/KBAH multivitamin liquid 500ml.png",
    type: "Liquid",
    quantity: "100 ml",
    dosage:
      "Large animals: 10 to 20 ml daily. Small animals: 2 to 5 ml daily. Poultry: 5 ml per 100 birds (or as per veterinarian).",
    composition:
      "Key components (as per formulation): Vitamin H — udder development; Pueraria mirifica — mammary tissue support; Vitamin C — anti-stress & immuno-modulator; Zinc — healthy epithelium; Vitamin A — epithelial health.",
    benefits: [
      "For udder development",
      "To optimize milk production",
      "To prevent heat stress & winter stress",
      "To make hooves healthy",
      "To prevent lameness",
    ],
  },
  {
    name: "KB AH Multivitamin Advance Liquid",
    catalogTitle: "KB AH Multivitamin Advance Liquid",
    variantGroupId: "kbah-advance",
    variantSort: 1,
    description:
      "Scientific multivitamin formulation for udder development and higher production (Advance line).",
    price: 250,
    imageUrl: "/Products/KBAH multivitamin liquid 500ml.png",
    type: "Liquid",
    quantity: "250 ml",
    dosage:
      "Large animals: 10 to 20 ml daily. Small animals: 2 to 5 ml daily. Poultry: 5 ml per 100 birds (or as per veterinarian).",
    composition:
      "Key components (as per formulation): Vitamin H — udder development; Pueraria mirifica — mammary tissue support; Vitamin C — anti-stress & immuno-modulator; Zinc — healthy epithelium; Vitamin A — epithelial health.",
    benefits: [
      "For udder development",
      "To optimize milk production",
      "To prevent heat stress & winter stress",
      "To make hooves healthy",
      "To prevent lameness",
    ],
  },
  {
    name: "KB AH Multivitamin Advance Liquid",
    catalogTitle: "KB AH Multivitamin Advance Liquid",
    variantGroupId: "kbah-advance",
    variantSort: 2,
    description:
      "Scientific multivitamin formulation for udder development and higher production (Advance line).",
    price: 625,
    imageUrl: "/Products/KBAH multivitamin liquid 500ml.png",
    type: "Liquid",
    quantity: "500 ml",
    dosage:
      "Large animals: 10 to 20 ml daily. Small animals: 2 to 5 ml daily. Poultry: 5 ml per 100 birds (or as per veterinarian).",
    composition:
      "Key components (as per formulation): Vitamin H — udder development; Pueraria mirifica — mammary tissue support; Vitamin C — anti-stress & immuno-modulator; Zinc — healthy epithelium; Vitamin A — epithelial health.",
    benefits: [
      "For udder development",
      "To optimize milk production",
      "To prevent heat stress & winter stress",
      "To make hooves healthy",
      "To prevent lameness",
    ],
  },
  {
    name: "KB AH Multivitamin Advance Liquid",
    catalogTitle: "KB AH Multivitamin Advance Liquid",
    variantGroupId: "kbah-advance",
    variantSort: 3,
    description:
      "Scientific multivitamin formulation for udder development and higher production (Advance line). List price for 1 L was marked “-” in your sheet — confirm with office.",
    price: 900,
    imageUrl: "/Products/KBAH multivitamin liquid 1000ml.jpeg.png",
    type: "Liquid",
    quantity: "1 Ltr",
    dosage:
      "Large animals: 10 to 20 ml daily. Small animals: 2 to 5 ml daily. Poultry: 5 ml per 100 birds (or as per veterinarian).",
    composition:
      "Key components (as per formulation): Vitamin H — udder development; Pueraria mirifica — mammary tissue support; Vitamin C — anti-stress & immuno-modulator; Zinc — healthy epithelium; Vitamin A — epithelial health.",
    benefits: [
      "For udder development",
      "To optimize milk production",
      "To prevent heat stress & winter stress",
      "To make hooves healthy",
      "To prevent lameness",
    ],
  },

  // —— KB AH Advance+ Liquid (250 / 500 / 1 Ltr) ——
  {
    name: "KB AH Advance+ Liquid",
    catalogTitle: "KB AH Advance+ Liquid",
    variantGroupId: "kbah-advance-plus",
    variantSort: 0,
    description:
      "Enhanced multivitamin liquid for udder development, production, and stress resistance (Advance+ line).",
    price: 250,
    imageUrl: "/Products/KBAH multivitamin liquid advance+ 1000ml.jpeg",
    type: "Liquid",
    quantity: "250 ml",
    dosage:
      "Large animals: 10 to 20 ml daily. Small animals: 2 to 5 ml daily. Poultry: 5 ml per 100 birds (or as per veterinarian).",
    composition:
      "Key components (as per formulation): Vitamin H — udder development; Pueraria mirifica — mammary tissue support; Vitamin C — anti-stress & immuno-modulator; Zinc — healthy epithelium; Vitamin A — epithelial health.",
    benefits: [
      "For udder development",
      "To optimize milk production",
      "To prevent heat stress & winter stress",
      "To make hooves healthy",
      "To prevent lameness",
    ],
  },
  {
    name: "KB AH Advance+ Liquid",
    catalogTitle: "KB AH Advance+ Liquid",
    variantGroupId: "kbah-advance-plus",
    variantSort: 1,
    description:
      "Enhanced multivitamin liquid for udder development, production, and stress resistance (Advance+ line).",
    price: 625,
    imageUrl: "/Products/KBAH multivitamin liquid advance+ 1000ml.jpeg",
    type: "Liquid",
    quantity: "500 ml",
    dosage:
      "Large animals: 10 to 20 ml daily. Small animals: 2 to 5 ml daily. Poultry: 5 ml per 100 birds (or as per veterinarian).",
    composition:
      "Key components (as per formulation): Vitamin H — udder development; Pueraria mirifica — mammary tissue support; Vitamin C — anti-stress & immuno-modulator; Zinc — healthy epithelium; Vitamin A — epithelial health.",
    benefits: [
      "For udder development",
      "To optimize milk production",
      "To prevent heat stress & winter stress",
      "To make hooves healthy",
      "To prevent lameness",
    ],
  },
  {
    name: "KB AH Advance+ Liquid",
    catalogTitle: "KB AH Advance+ Liquid",
    variantGroupId: "kbah-advance-plus",
    variantSort: 2,
    description:
      "Enhanced multivitamin liquid for udder development, production, and stress resistance (Advance+ line).",
    price: 1125,
    imageUrl: "/Products/KBAH multivitamin liquid advance+ 1000ml.jpeg",
    type: "Liquid",
    quantity: "1 Ltr",
    dosage:
      "Large animals: 10 to 20 ml daily. Small animals: 2 to 5 ml daily. Poultry: 5 ml per 100 birds (or as per veterinarian).",
    composition:
      "Key components (as per formulation): Vitamin H — udder development; Pueraria mirifica — mammary tissue support; Vitamin C — anti-stress & immuno-modulator; Zinc — healthy epithelium; Vitamin A — epithelial health.",
    benefits: [
      "For udder development",
      "To optimize milk production",
      "To prevent heat stress & winter stress",
      "To make hooves healthy",
      "To prevent lameness",
    ],
  },

  // —— WORMISOL-D ——
  {
    name: "WORMISOL-D",
    catalogTitle: "WORMISOL-D",
    variantGroupId: "wormisol-d",
    variantSort: 0,
    description:
      "Herbal-oriented deworming support for endoparasite control in dairy stock (follow label & veterinarian).",
    price: 120,
    imageUrl: "/Products/Wormisol d 30ml.jpeg",
    type: "Liquid",
    quantity: "30 ml",
    dosage: "As per species/body weight on label.",
    benefits: [
      "Herbal composition",
      "Designed as a safe deworming approach per label",
      "For complete eradication of endoparasites where indicated",
      "Safe during pregnancy where approved on label",
      "No milk withdrawal period where approved on label",
    ],
  },
  {
    name: "WORMISOL-D",
    catalogTitle: "WORMISOL-D",
    variantGroupId: "wormisol-d",
    variantSort: 1,
    description:
      "Bolus deworming presentation for dairy stock; herbal-oriented formulation per label.",
    price: 95,
    imageUrl: "/Products/wormisol d 1 bolus.png",
    type: "Powder",
    quantity: "1 bolus",
    dosage:
      "Large animals: 1 bolus; repeat after 3 months or as directed by veterinarian.",
    benefits: [
      "Herbal composition",
      "Safest dewormer approach per label",
      "Zero side effects where indicated on label",
      "Safe during pregnancy where approved on label",
      "No milk withdrawal period where approved on label",
      "For complete eradication of endoparasites",
    ],
  },

  // —— KB-ORE FORTE ——
  {
    name: "KB-ORE FORTE Powder",
    catalogTitle: "KB-ORE FORTE",
    variantGroupId: "kb-ore-forte",
    variantSort: 0,
    description:
      "Fortified mineral mixture for fertility, milk production, and metabolic balance when trace minerals are lacking.",
    price: 100,
    imageUrl: "/Products/kb-ore forte powder 1kg.jpeg",
    type: "Powder",
    quantity: "500 g",
    dosage:
      "Large animals: 50 gm daily. Small animals: 25 gm daily. For reproduction: 75 gm daily along with trace mineral supplement (or as per veterinarian).",
    benefits: [
      "Helps avoid metabolic disorders",
      "Helps in growth and milk production",
      "Improves reproductive performance",
      "Supports healthy calf and overall health",
      "Improves fertility",
      "Ensures maximum bioavailability of minerals",
    ],
  },
  {
    name: "KB-ORE FORTE Powder",
    catalogTitle: "KB-ORE FORTE",
    variantGroupId: "kb-ore-forte",
    variantSort: 1,
    description:
      "Fortified mineral mixture for fertility, milk production, and metabolic balance when trace minerals are lacking.",
    price: 200,
    imageUrl: "/Products/kb-ore forte powder 1kg.jpeg",
    type: "Powder",
    quantity: "1 kg",
    dosage:
      "Large animals: 50 gm daily. Small animals: 25 gm daily. For reproduction: 75 gm daily along with trace mineral supplement (or as per veterinarian).",
    benefits: [
      "Helps avoid metabolic disorders",
      "Helps in growth and milk production",
      "Improves reproductive performance",
      "Supports healthy calf and overall health",
      "Improves fertility",
      "Ensures maximum bioavailability of minerals",
    ],
  },
  {
    name: "KB-ORE FORTE Powder",
    catalogTitle: "KB-ORE FORTE",
    variantGroupId: "kb-ore-forte",
    variantSort: 2,
    description:
      "Fortified mineral mixture for fertility, milk production, and metabolic balance when trace minerals are lacking.",
    price: 625,
    imageUrl: "/Products/kb-ore forte powder 5kg.jpeg",
    type: "Powder",
    quantity: "5 kg",
    dosage:
      "Large animals: 50 gm daily. Small animals: 25 gm daily. For reproduction: 75 gm daily along with trace mineral supplement (or as per veterinarian).",
    benefits: [
      "Helps avoid metabolic disorders",
      "Helps in growth and milk production",
      "Improves reproductive performance",
      "Supports healthy calf and overall health",
      "Improves fertility",
      "Ensures maximum bioavailability of minerals",
    ],
  },
  {
    name: "KB-ORE FORTE Powder",
    catalogTitle: "KB-ORE FORTE",
    variantGroupId: "kb-ore-forte",
    variantSort: 3,
    description:
      "Fortified mineral mixture for fertility, milk production, and metabolic balance when trace minerals are lacking.",
    price: 2500,
    imageUrl: "/Products/kb-ore forte powder 5kg.jpeg",
    type: "Powder",
    quantity: "25 kg",
    dosage:
      "Large animals: 50 gm daily. Small animals: 25 gm daily. For reproduction: 75 gm daily along with trace mineral supplement (or as per veterinarian).",
    benefits: [
      "Helps avoid metabolic disorders",
      "Helps in growth and milk production",
      "Improves reproductive performance",
      "Supports healthy calf and overall health",
      "Improves fertility",
      "Ensures maximum bioavailability of minerals",
    ],
  },

  // —— KB-ORE Chelated (pack line; list prices not in sheet — retained scale) ——
  {
    name: "KB-ORE Chelated Mineral Powder",
    catalogTitle: "KB-ORE Chelated",
    variantGroupId: "kb-ore-chelated",
    variantSort: 0,
    description:
      "Chelated trace minerals for repeat-breeding, milk yield, fertility, and metabolic support where mineral gaps exist.",
    price: 690,
    imageUrl: "/Products/KB-ore chelated powder 1 kg.png",
    type: "Powder",
    quantity: "1 kg",
    dosage:
      "Large animals: 50 gm daily. Small animals: 25 gm daily. For reproduction: 75 gm daily along with trace mineral supplement (or as per veterinarian).",
    benefits: [
      "Addresses nutritional drivers of repeat breeding & long calving intervals",
      "Helps conception, milk production, and metabolic balance",
      "Improves reproductive performance & fertility",
      "Ensures maximum bioavailability of minerals",
    ],
  },
  {
    name: "KB-ORE Chelated Mineral Powder",
    catalogTitle: "KB-ORE Chelated",
    variantGroupId: "kb-ore-chelated",
    variantSort: 1,
    description:
      "Chelated trace minerals for repeat-breeding, milk yield, fertility, and metabolic support where mineral gaps exist.",
    price: 3100,
    imageUrl: "/Products/KB-ore chelated powder 5 kg.png",
    type: "Powder",
    quantity: "5 kg",
    dosage:
      "Large animals: 50 gm daily. Small animals: 25 gm daily. For reproduction: 75 gm daily along with trace mineral supplement (or as per veterinarian).",
    benefits: [
      "Addresses nutritional drivers of repeat breeding & long calving intervals",
      "Helps conception, milk production, and metabolic balance",
      "Improves reproductive performance & fertility",
      "Ensures maximum bioavailability of minerals",
    ],
  },
  {
    name: "KB-ORE Chelated Mineral Powder",
    catalogTitle: "KB-ORE Chelated",
    variantGroupId: "kb-ore-chelated",
    variantSort: 2,
    description:
      "Chelated trace minerals for repeat-breeding, milk yield, fertility, and metabolic support where mineral gaps exist.",
    price: 10800,
    imageUrl: "/Products/KB-ore chelated powder 20 kg.png",
    type: "Powder",
    quantity: "20 kg",
    dosage:
      "Large animals: 50 gm daily. Small animals: 25 gm daily. For reproduction: 75 gm daily along with trace mineral supplement (or as per veterinarian).",
    benefits: [
      "Addresses nutritional drivers of repeat breeding & long calving intervals",
      "Helps conception, milk production, and metabolic balance",
      "Improves reproductive performance & fertility",
      "Ensures maximum bioavailability of minerals",
    ],
  },

  // —— KB-CONC (After AI) ——
  {
    name: "KB-CONC (After AI)",
    description:
      "To ensure high conception rate. Concentrated reproductive support with herbal extracts, vitamins, minerals, Omega-3 & Omega-6.",
    price: 150,
    imageUrl: "/Products/kb conc after ai 225 ml liquid.jpeg",
    type: "Liquid",
    quantity: "225 ml",
    dosage: "1 bottle after artificial insemination (or as per veterinarian).",
    composition:
      "Per 225 ml — herbal extracts: Abroma augusta, Cyperus rotundus, Bacopa monnieri, Rubia cordifolia, Terminalia chebula, Cynodon dactylon; with added vitamins, minerals, Omega-3 & Omega-6.",
    benefits: [
      "Helps maintain proper estrus cycle",
      "Improves hormone secretion & endocrine function",
      "Improves immunity; provides energy",
      "Produces healthy ova; improves ovulation & fertilization",
      "Increases conception rate; reduces repeat breeding",
      "Prevents early embryonic mortality",
    ],
  },

  // —— JEARSOL-XP ——
  {
    name: "JEARSOL-XP",
    description:
      "Herbal uterine tonic with minerals & vitamins (liquid). Anti-inflammatory, antibacterial, analgesic, antiviral, antioxidative support for post-calving uterine care.",
    price: 200,
    imageUrl: "/Products/jearsol xp 1 ltr.jpeg",
    type: "Liquid",
    quantity: "1 Ltr",
    dosage:
      "Large animals: 200 ml just after calving, then 100 ml daily for 3 days. Small animals: 100 ml just after calving, then 50 ml daily for 3 days (or as per veterinarian).",
    composition:
      "Herbal composition: Ruta graveolens, Cyperus rotundus, Moringa oleifera, Trachyspermum ammi (as per formulation).",
    benefits: [
      "Anti-inflammatory, antibacterial, analgesic, antiviral, antioxidative (as per herbal actives)",
      "Helps timely expulsion of placenta membrane",
      "Helps timely disappearance of lochia/discharges",
      "Helps timely involution of uterine horn",
      "Helps timely onset of estrus cycle",
      "Helps prevent uterine infections",
    ],
  },

  // —— KB-Sol Advance Spray ——
  {
    name: "KB-Sol Advance Spray",
    description:
      "Topical wound & skin spray with herbal and antimicrobial actives for wounds, maggots, and skin infections.",
    price: 87.5,
    imageUrl: "/Products/kb sol spray 100ml.jpeg",
    type: "Liquid",
    quantity: "100 ml",
    dosage: "Spray on cleaned area as per label; repeat as advised.",
    composition:
      "Devadaru (Cedrus deodara), Neem (Azadirachta indica), Turpentine oil (Pinus roxburghii), Curcumin (Haridra) — as per formulation.",
    benefits: [
      "Anti-inflammatory and antimicrobial properties",
      "Helps reduce inflammation at wound site; helps prevent infection",
      "Strong wound healing & antibacterial properties; promotes faster healing",
      "Maggoticidal & fly repellent properties; protects from fungi",
      "Helps control inflammation; useful where antibiotic resistance is a concern (supportive care)",
    ],
  },

  // —— KB-ORE DS ——
  {
    name: "KB-ORE DS",
    description:
      "Double-strength chelated mineral bolus for rapid mineral correction and production support.",
    price: 100,
    imageUrl: "/Products/kb-ore ds 1x1 bolus.jpeg",
    type: "Powder",
    quantity: "1 bolus",
    dosage: "Oral bolus per animal as per label or veterinarian.",
    benefits: [
      "High mineral density for rapid correction",
      "Supports fertility and milk yield",
      "Helps prevent metabolic disorders linked to mineral gaps",
    ],
  },

  // —— KB STAR (KB-ORE SAFE) ——
  {
    name: "KB STAR Safe Powder",
    description:
      "Digestive & rumen support for anorexia, indigestion, bloat, diarrhoea, electrolyte loss, and weakness.",
    price: 437.5,
    imageUrl: "/Products/KB-ore safe powder 50gm x 5.jpeg",
    type: "Powder",
    quantity: "50 gm × 5",
    dosage:
      "Large animals: 1 to 2 bolus twice daily for 3 to 5 days. Small animals: ½ to 1 bolus twice daily for 3 to 5 days. Presentation: 1 × 10 strips (or as per label).",
    benefits: [
      "Enhances ruminal microflora; balances ruminal pH",
      "Improves digestion and appetite; enhances ruminal motility",
      "Helpful in diarrhoea and electrolyte stress",
    ],
  },
];

async function main() {
  await prisma.product.deleteMany({});
  for (const row of seedData) {
    await prisma.product.create({
      data: {
        name: row.name,
        description: row.description,
        price: row.price,
        imageUrl: row.imageUrl,
        type: row.type,
        quantity: row.quantity,
        dosage: row.dosage ?? null,
        composition: row.composition ?? null,
        benefits: row.benefits,
        variantGroupId: row.variantGroupId ?? null,
        catalogTitle: row.catalogTitle ?? null,
        variantSort: row.variantSort ?? 0,
      },
    });
  }
  console.log(`Seeded ${seedData.length} product variants (clinical copy + list prices).`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
