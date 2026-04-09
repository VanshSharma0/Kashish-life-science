const products = [
  {
    name: "CALSOL GOLD",
    description: "Calcium + phosphorus supplement for daily nutritional assurance.",
    price: 1200,
    imageUrl: "/Products/calsol gold.jpeg",
    type: "Liquid",
    benefits: ["Maintains peak lactation", "Improves milk production", "Supports udder health"],
  },
  {
    name: "KB-MAST Gel Advance",
    description: "Topical and efficient udder health gel.",
    price: 250,
    imageUrl: "/Products/KB mast gel advance.jpeg",
    type: "Liquid",
    benefits: ["Helps prevent mastitis", "Promotes faster recovery", "Maintains udder pH", "Strengthens teat tissues", "Improves milk production"],
  },
  {
    name: "KB-MAST XP Powder",
    description: "Advanced mastitis prevention powdered formula.",
    price: 450,
    imageUrl: "/Products/KB mast XP poweder.jpeg",
    type: "Powder",
    benefits: ["Helps prevent mastitis", "Promotes faster recovery", "Maintains udder pH", "Strengthens teat tissues", "Improves milk production"],
  },
  {
    name: "KB POWER",
    description: "Provides instant & sustained energy for recovering herds.",
    price: 850,
    imageUrl: "/Products/KB power.jpeg",
    type: "Powder",
    benefits: ["Ketosis prevention", "Recovery after calving", "Alleviates weakness & debility"],
  },
  {
    name: "LIVSOL Liquid Electra",
    description: "Advanced Liver Tonic essential for boosting herd productivity and digestive efficiency.",
    price: 650,
    imageUrl: "/Products/Livsol liquid electra.jpeg",
    type: "Liquid",
    benefits: ["Improves appetite & digestion", "Stimulates liver regeneration", "Overall herd productivity"],
  },
  {
    name: "KB AH Multivitamin Liquid",
    description: "Premium Multivitamin liquid bridging critical nutritional gaps.",
    price: 400,
    imageUrl: "/Products/KBAH multivitamin liquid.jpeg",
    type: "Liquid",
    benefits: ["Supports udder development", "Increased milk production", "Provides stress resistance & immunity boost"],
  },
  {
    name: "WORMISOL-D",
    description: "Comprehensive Deworming Solution safe for dairy use.",
    price: 120,
    imageUrl: "/Products/Wormisol d.jpeg",
    type: "Liquid",
    benefits: ["Effective against liver flukes", "Clear roundworms & tapeworms", "Safe in pregnancy", "Improves liver function"],
  },
  {
    name: "KB-ORE FORTE",
    description: "Fortified chelated mineral mixtures ensuring long term health.",
    price: 780,
    imageUrl: "/Products/kb-ore forte powder.jpeg",
    type: "Powder",
    benefits: ["Improves fertility", "Enhance milk production", "Prevent metabolic disorders"],
  },
  {
    name: "KB-CONC",
    description: "Reproductive health solution containing Omega-3, Omega-6, Vitamins & minerals.",
    price: 520,
    imageUrl: "/Products/KB-conc.jpeg",
    type: "Powder",
    benefits: ["Improves ovulation", "Enhances conception rate", "Reduces repeat breeding"],
  },
  {
    name: "JEARSOL-XP",
    description: "Specialized Uterine & Post-Calving Care supplement.",
    price: 280,
    imageUrl: "/Products/jearsol xp.jpeg",
    type: "Powder",
    benefits: ["Helps placenta expulsion", "Uterine recovery & prevents infections", "Helps restore estrus cycle"],
  },
  {
    name: "KB-ORE SOL Spray",
    description: "Wound care solution with antibacterial, antifungal, and anti-inflammatory properties.",
    price: 180,
    imageUrl: "/Products/kb sol spray.jpeg",
    type: "Liquid",
    benefits: ["Treats deep & maggot wounds", "Combats skin diseases & dermatomycosis", "Repairs horn damage"],
  },
  {
    name: "KB-ORE DS",
    description: "Double strength chelated mineral supplements ensuring high mineral retention.",
    price: 950,
    imageUrl: "/Products/kb-ore ds.jpeg",
    type: "Powder",
    benefits: ["Improve fertility", "Enhance milk production", "Prevent metabolic disorders"],
  },
  {
    name: "CALSOL Multivitamin",
    description: "Oral ionic calcium + multivitamins formulated for optimal dairy wellness.",
    price: 450,
    imageUrl: "/Products/calsol multivitamin.jpeg",
    type: "Liquid",
    benefits: ["Prevent/treat hypocalcemia", "Improve milk production", "Aid in easy calving"],
  },
  {
    name: "KB STAR (Safe Powder)",
    description: "Expert digestive support handling anorexia and indigestion.",
    price: 320,
    imageUrl: "/Products/KBor safe powder.jpeg",
    type: "Powder",
    benefits: ["Improves rumen function", "Stimulates appetite", "Maximizes digestion"],
  }
];

async function seed() {
  console.log("Seeding to MongoDB via API...");
  for (const p of products) {
    try {
      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p)
      });
      if (!res.ok) {
         console.error(`Failed to add ${p.name}`);
      } else {
         console.log(`Successfully added ${p.name}`);
      }
    } catch (e) {
      console.error(e);
    }
  }
  console.log("Seeding complete!");
}

seed();
