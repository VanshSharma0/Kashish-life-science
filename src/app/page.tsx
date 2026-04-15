import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import prisma from "@/lib/prisma";
import { groupProductsForCatalog } from "@/lib/productCatalog";
import { formatProductDisplayName } from "@/lib/productDisplayName";

// Force dynamic rendering — this page queries MongoDB and cannot be
// statically prerendered at build time (DB is not available in Docker build env).
export const dynamic = "force-dynamic";

export default async function Home() {
  let featuredGroups = groupProductsForCatalog([]);
  const spotlightIds = { calsol: "", kbMast: "", livsol: "" };
  try {
    const allProducts = await prisma.product.findMany({
      orderBy: { createdAt: "asc" },
    });
    const groups = groupProductsForCatalog(allProducts);
    featuredGroups = groups.slice(0, 4);

    // Dynamic IDs for spotlights
    spotlightIds.calsol = allProducts.find(p => p.name === "CALSOL GOLD")?.id || "";
    spotlightIds.kbMast = allProducts.find(p => p.name === "KB-MAST Gel Advance")?.id || "";
    spotlightIds.livsol = allProducts.find(p => p.name === "LIVSOL Liquid Electra")?.id || "";
  } catch (err) {
    console.error("[Home] Failed to fetch featured products:", err);
  }

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative text-white pt-24 pb-24 sm:pb-36 overflow-hidden min-h-[75vh] flex flex-col justify-center mt-[-80px]">
        {/* Background Image Loading */}
        <div className="absolute inset-0 -z-10">
          <Image src="/hero-bg.jpg" alt="Healthier Herd background with mountains" fill className="object-cover object-center" priority />
          {/* Readability Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/60 to-blue-950/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10 pt-10">
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/50 backdrop-blur-md text-blue-100 text-sm font-semibold tracking-wide shadow-[0_0_25px_rgba(59,130,246,0.35)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
            </span>
            Make In India Initiative
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl leading-[1.1] drop-shadow-xl text-pretty pt-02">
            Advanced Vitality for a <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-cyan-300">Healthier Herd</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-blue-50/90 mb-12 max-w-2xl leading-relaxed font-light text-pretty">
            Kashish Life Science® delivers scientifically formulated cattle feed supplements and therapeutic medicine accelerating dairy production & animal well-being.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/products">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:scale-105 transition-all text-white border-0 shadow-[0_8px_25px_rgba(59,130,246,0.45)] px-8 h-14 text-lg font-semibold">
                Explore Catalog
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/15 hover:border-white/60 backdrop-blur-md px-8 h-14 text-lg transition-all font-semibold">
                Learn Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What We Are & What We Do */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 mt-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700 ease-out" />
            <div className="relative z-10">
              <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-4 block">Who We Are</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Pioneers in Animal Nutrition</h2>
              <p className="text-gray-600 leading-relaxed text-lg font-light">
                Kashish Life Science® is an Indian proprietary firm built from the ground up dedicated to revolutionizing the veterinary space. We are a family of researchers, scientists, and dairy enthusiasts striving to empower local farmers with accessible, top-tier healthcare for their herds.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-950 rounded-[2rem] p-10 border border-blue-900 shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-900/50 rounded-tr-full -ml-12 -mb-12 transition-transform group-hover:scale-150 duration-700 ease-out" />
            <div className="relative z-10">
              <span className="text-blue-400 font-bold tracking-widest text-sm uppercase mb-4 block">What We Do</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 tracking-tight">Engineering Veterinary Excellence</h2>
              <p className="text-blue-100/90 leading-relaxed text-lg font-light">
                We formulate, manufacture, and distribute highly bioavailable cattle feed supplements and therapeutic medicines. From rapidly overcoming calcium deficiencies to combatting mastitis, our products are scientifically designed to target modern dairy challenges and ensure peak fertility and milk production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Spotlights */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Scientifically Formulated <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">Spotlights</span></h2>
            <p className="text-xl text-gray-500 leading-relaxed font-light">Explore three of our most critically acclaimed veterinary solutions actively transforming herds across India.</p>
          </div>

          <div className="space-y-24">
            {/* Spotlight 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] w-full rounded-3xl overflow-hidden bg-white shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center justify-center p-8 group">
                <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Image src="/Products/calsol gold 5 ltr.jpeg" alt="CALSOL GOLD" fill className="object-contain p-8 hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="md:pl-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-bold tracking-wide mb-6 border border-blue-200">Calcium Replenisher</span>
                <h3 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">CALSOL GOLD</h3>
                <p className="text-lg text-gray-500 font-light leading-relaxed mb-8">
                  <strong>CALSOL GOLD</strong> - Oral calcium & phosphorus support for peak lactation, udder health, and post-calving recovery in dairy animals.
                </p>
                <Link href={`/products/${spotlightIds.calsol || "69dca980f5005d2e43f8cb8c"}`}>
                  <Button variant="outline" className="text-blue-700 border-blue-200 hover:bg-blue-50 hover:border-blue-300">
                    View Product &rarr;
                  </Button>
                </Link>
              </div>
            </div>

            {/* Spotlight 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2 relative h-[400px] w-full rounded-3xl overflow-hidden bg-blue-950 shadow-2xl shadow-blue-900/20 border border-blue-900 flex items-center justify-center p-8 group">
                <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
                <Image src="/Products/KB mast gel advance 300gm.jpeg" alt="KB-MAST Advance Gel" fill className="object-contain p-8 hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="md:order-1 md:pr-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-bold tracking-wide mb-6 border border-blue-200">Premium Therapy</span>
                <h3 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">{formatProductDisplayName("KB-MAST Advance Gel")}</h3>
                <p className="text-lg text-gray-500 font-light leading-relaxed mb-8">
                  <strong>{formatProductDisplayName("KB-MAST Advance Gel")}</strong> - Highly milk production and milk fever.
                </p>
                <Link href={`/products/${spotlightIds.kbMast || "69dca980f5005d2e43f8cb8e"}`}>
                  <Button variant="outline" className="text-blue-700 border-blue-200 hover:bg-blue-50 hover:border-blue-300">
                    View Product &rarr;
                  </Button>
                </Link>
              </div>
            </div>

            {/* Spotlight 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] w-full rounded-3xl overflow-hidden bg-white shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center justify-center p-8 group">
                 <div className="absolute inset-0 bg-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Image src="/Products/Livsol liquid electra 100ml.jpeg" alt="LIVSOL Electra Liquid" fill className="object-contain p-8 hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="md:pl-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-700 text-sm font-bold tracking-wide mb-6 border border-orange-200">Metabolic Booster</span>
                <h3 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">{formatProductDisplayName("LIVSOL Electra Liquid")}</h3>
                <p className="text-lg text-gray-500 font-light leading-relaxed mb-8">
                  <strong>{formatProductDisplayName("LIVSOL Electra Liquid")}</strong> - Herbal liver tonic with the power of iron, vitamins & minerals. Supports liver repair, appetite, bile secretion, and productivity.
                </p>
                <Link href={`/products/${spotlightIds.livsol || "69dca981f5005d2e43f8cb97"}`}>
                  <Button variant="outline" className="text-blue-700 border-blue-200 hover:bg-blue-50 hover:border-blue-300">
                    View Product &rarr;
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Supplements</h2>
            <p className="text-gray-500">Discover our most trusted veterinary solutions.</p>
          </div>
          <Link href="/products" className="hidden sm:block">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <ProductGrid groups={featuredGroups} />
        <Link href="/products" className="sm:hidden block mt-8">
          <Button variant="outline" className="w-full">View All</Button>
        </Link>
      </section>

      {/* Immersive About Section */}
      <section className="py-24 relative bg-white overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-blue-50/80 to-transparent" />
        <div className="absolute -left-[20%] top-1/4 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-4 block">About Our Infrastructure</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Built Under the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">Make in India</span> Process</h2>
            <p className="text-xl text-gray-500 leading-relaxed font-light">
              Established in January 2019, Kashish Life Science® emerged as a singular solution for the Indian Veterinary industry. We specialize in highly bioavailable cattle feed supplements formulated strictly for modern dairy demands.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Image */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-blue-300 rounded-[2.5rem] transform -rotate-3 scale-105 opacity-20 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-100" />
              <div className="relative h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                <Image src="/Products/calsol gold 5 ltr.jpeg" alt="Kashish Life Science® facility" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white pr-8">
                  <p className="font-bold text-3xl mb-1">Premium Quality</p>
                  <p className="text-blue-300 font-medium">100% Indian Manufactured</p>
                </div>
              </div>
            </div>

            {/* Right Features Grid */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {[
                { title: 'Premium Raw Materials', desc: 'Sourced strictly from certified vendors ensuring maximum safety and unparalleled bioavailability for your dairy herd.' },
                { title: 'Tested & Proven Formulations', desc: 'Clinical backing ensuring higher milk yields, accelerated cattle recovery, and disease resilience.' },
                { title: 'Dedicated Support Base', desc: 'Working directly alongside Indian dairy farmers to provide tailored health regimens and scientific consultations.' }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex items-start gap-5 sm:gap-8 group cursor-default">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition-colors duration-500 shadow-inner">
                    <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
              
              <div className="mt-6 pl-2">
                <Link href="/about" className="inline-flex items-center gap-3 text-blue-600 font-bold hover:text-blue-700 group text-lg">
                  Read Our Full Story 
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
