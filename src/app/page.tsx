import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import dbConnect from "@/lib/mongoose";
import { Product as ProductModel } from "@/models/Product";

export default async function Home() {
  await dbConnect();
  const dbProducts = await ProductModel.find({}).limit(4).lean();
  
  // Serialize Mongoose docs to match our frontend ProductType expecting 'id'
  const featuredProducts = dbProducts.map((p: any) => ({
    ...p,
    id: p._id.toString(),
    _id: p._id.toString(),
  }));

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative bg-emerald-900 text-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <span className="mb-4 inline-block px-4 py-1.5 rounded-full bg-green-500/20 text-green-200 border border-green-500/30 text-sm font-semibold tracking-wide">
            Make In India Initiative
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
            Advanced Veterinary Solutions for a <span className="text-green-400">Healthier Herd</span>
          </h1>
          <p className="text-lg sm:text-xl text-emerald-100 mb-10 max-w-2xl leading-relaxed">
            Kashish Life Science delivers premium cattle feed supplements and therapeutic medicines to optimize dairy production and animal well-being.
          </p>
          <div className="flex gap-4">
            <Link href="/products">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white border-0">
                Explore Products
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Certifications */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">
            Certified Excellence & Trust
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <Image src="/GMP certificate.jpeg" alt="GMP Certified" width={100} height={100} className="object-contain h-16 w-auto mix-blend-multiply" />
            <Image src="/Iso registration certificate.jpeg" alt="ISO Registered" width={100} height={100} className="object-contain h-16 w-auto mix-blend-multiply" />
            <Image src="/MSME.jpeg" alt="MSME" width={100} height={100} className="object-contain h-16 w-auto mix-blend-multiply" />
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
        <ProductGrid products={featuredProducts} />
        <Link href="/products" className="sm:hidden block mt-8">
          <Button variant="outline" className="w-full">View All</Button>
        </Link>
      </section>

      {/* Short About Section */}
      <section className="bg-green-50 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Built Under Make in India Process</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Kashish Life Science is established since Oct 2021 as a one step solution for the Indian Veterinary industry. We deal in highly bioavailable cattle feed supplements and therapeutic medicines designed strictly according to modern dairy needs.
            </p>
            <ul className="space-y-3 mb-8">
              {['Premium Raw Materials', 'Tested & Proven Formulations', 'Dedicated Support Team'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm">✓</div>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/about">
              <Button>Read Our Story</Button>
            </Link>
          </div>
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/Products/calsol gold.jpeg" alt="Kashish Life Science Products" fill className="object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
}
