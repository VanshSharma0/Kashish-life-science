import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Cross, FlaskConical, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-20 sm:pt-8 lg:pt-10 lg:pb-28">

      {/* ── Hero ── */}
      <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start mb-20">

        {/* Left column */}
        <div>
          <span className="mb-5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold tracking-wide uppercase">
            Established 1 January 2019
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 tracking-tight leading-tight">
            About <span className="text-blue-600">Kashish Life Science®</span>
          </h1>

          <p className="text-lg text-gray-600 mb-5 leading-relaxed">
            Kashish Life Science® is an Indian company built under the{' '}
            <strong className="font-semibold text-gray-800">Make in India</strong> initiative,
            providing a <strong className="font-semibold text-gray-800">one-step solution</strong>{' '}
            for the Indian veterinary industry with premium cattle feed supplements and therapeutic
            products for everyday herd health.
          </p>

          <div className="space-y-4 text-base text-gray-600 leading-relaxed mb-8">
            <p>
              Since January 2019, we have focused on formulations that align with how animals are
              actually raised across India - from nutrition and metabolism to infection control and
              recovery.
            </p>
            <p>
              Our philosophy is rooted in scientific formulations, quality assurance, and affordable
              pricing. At Kashish Life Science®, we work at the{' '}
              <strong className="font-semibold text-gray-800">
                intersection of innovative science and practical field needs
              </strong>{' '}
             combining research-driven ideas with robust manufacturing so every solution performs
              where it matters most: on the farm.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {['ISO Certified', 'FSSAI Registered', 'GMP Certified', 'MSME Certified'].map((label) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-800"
              >
                <ShieldCheck className="text-blue-500 shrink-0" size={16} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Director card */}
        <div className="mx-auto w-full max-w-sm lg:max-w-none rounded-2xl border border-blue-100 bg-blue-50 p-5 flex flex-col items-center gap-4">
          <div className="w-full overflow-hidden rounded-xl border border-white bg-white">
            <Image
              src="/managing-director.png"
              alt="Mr. Bhujvir Singh Solanki, Managing Director"
              width={1920}
              height={1080}
              className="h-auto w-full object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 384px, 448px"
              unoptimized
              priority
            />
          </div>
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase">Managing Director</p>
            <h3 className="text-base font-semibold text-gray-900">Mr. Bhujvir Singh Solanki</h3>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
              <span className="px-3 py-1 rounded-full bg-white border border-blue-200 text-xs font-medium text-blue-800">
                M.Sc. Biochemistry
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-blue-200 text-xs font-medium text-blue-800">
                MBA Finance
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-snug">
              Dedicated to transforming animal healthcare through quality &amp; innovation.
            </p>
          </div>
        </div>
      </div>

      {/* ── Challenges ── */}
      <div className="border-t border-gray-100 pt-16 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
            Solving key animal health challenges
          </h2>
          <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Four focus areas where our formulations make a measurable difference on the farm.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: <FlaskConical size={20} />,
              title: 'Targeting calcium deficiency',
              body: 'Critical before and after calving for fetal development and milk production. Our premium calcium formulations prevent milk fever (hypocalcemia).',
            },
            {
              icon: <Target size={20} />,
              title: 'Maximizing productivity',
              body: 'Our mastitis solutions prevent udder infections and epithelial layer damage, securing high milk yields and reducing leakage risks.',
            },
            {
              icon: <Cross size={20} />,
              title: 'Tackling energy & worms',
              body: 'Combating postnatal hypoglycemia and Nematode & Trematode infestations that steal nutrition away from dairy output.',
            },
            {
              icon: <ShieldCheck size={20} />,
              title: 'Reproductive nutrition',
              body: 'Over 30% of conception failures relate to mineral deficiencies. Our advanced mineral formulations secure long-term reproductive intervals.',
            },
          ].map(({ icon, title, body }) => (
            <div
              key={title}
              className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-5">
                {icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Teams ── */}
      <div className="border-t border-gray-100 pt-16 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">Our teams</h2>
          <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Administration and marketing professionals united behind Kashish Life Science® -
            supporting veterinarians and farmers across India.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {[
            { src: '/team-administration.png', label: 'Administration team' },
            { src: '/team-marketing.png', label: 'Marketing team' },
          ].map(({ src, label }) => (
            <figure
              key={label}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              <div className="relative aspect-video w-full bg-gray-50">
                <Image
                  src={src}
                  alt={`Kashish Life Science® ${label.toLowerCase()}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                />
              </div>
              <figcaption className="border-t border-gray-100 px-4 py-3 text-center text-sm font-medium text-gray-700">
                {label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* ── Certifications ── */}
      <div className="border-t border-gray-100 pt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
            Official certifications &amp; registrations
          </h2>
          <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Officially recognized and certified by leading governmental and quality assurance
            regulatory bodies in India.
          </p>
        </div>

        {/* ISO + GMP */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {[
            { src: '/Iso registration certificate.jpeg', label: 'ISO registration certificate' },
            { src: '/GMP certificate.jpeg', label: 'GMP certificate' },
          ].map(({ src, label }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col"
            >
              <div className="px-5 py-3.5 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">{label}</h3>
              </div>
              <div className="p-4 flex flex-col items-center flex-1">
                <div className="relative w-full aspect-[1/1.4] overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
                  <Image src={src} alt={label} fill className="object-contain" unoptimized />
                </div>
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  View full screen →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Trademark */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden max-w-4xl mx-auto">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              Official trademark documentation
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Computer-generated TM search report from Intellectual Property India (Ministry of
              Commerce &amp; Industry) — Kashish Life Science®, Class 35, Registered.
            </p>
          </div>
          <div className="p-5 flex flex-col items-center">
            <div className="relative w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
              <Image
                src="/trademark-tm-search-report.png"
                alt="Intellectual Property India TM search report for Kashish Life Science"
                width={1200}
                height={1600}
                className="w-full h-auto object-contain"
                unoptimized
                priority
              />
            </div>
            <a
              href="/trademark-tm-search-report.png"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              View full image
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}