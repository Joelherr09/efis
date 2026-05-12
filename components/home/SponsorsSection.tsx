// components/home/SponsorsSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, HeartHandshake, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const sponsors = [
  {
    id: 1,
    name: "Panadería La Estrella",
    logo: "/sponsors/sponsor1.jpg",
    url: "https://www.instagram.com/pan_laestrella_ovalle/",
  },

  {
    id: 2,
    name: "c_atito",
    logo: "/sponsors/sponsor2.jpg",
    url: "https://www.instagram.com/c_atito/",
  },
  {
    id: 3,
    name: "Hielos Taltal",
    logo: "/sponsors/sponsor3.png",
    url: "#",
  },
  {
    id: 4,
    name: "4Volei",
    logo: "/sponsors/sponsor4.png",
    url: "https://4volei.vercel.app/",
  },
];

export default function SponsorsSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black py-24">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#D90429]/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-red-500/5 blur-3xl" />

        <div className="absolute right-0 top-20 h-[250px] w-[250px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D90429]/30 bg-[#D90429]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D90429] backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5" />
            Sponsors Oficiales
          </div>

          <h2 className="mt-6 text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
            Marcas que impulsan
            <span className="block text-[#D90429]">
              nuestro crecimiento
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
            Empresas y emprendimientos que confían en Atlético EFIS para
            potenciar el desarrollo del voleibol formativo y competitivo en
            Punitaqui y la Región de Coquimbo.
          </p>
        </motion.div>

        {/* SPONSORS GRID */}
        <div className="grid gap-6 md:grid-cols-3">
          {sponsors.map((sponsor, index) => (
            <motion.a
              key={sponsor.id}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#D90429]/40 hover:bg-white/[0.05]"
            >
              {/* Glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D90429]/20 blur-3xl" />
              </div>

              {/* Top line */}
              <div className="absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-[#D90429] to-red-400 transition-all duration-500 group-hover:w-full" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <div className="relative h-20 w-full">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      className="object-contain object-left transition-all duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-400 transition-all duration-300 group-hover:border-[#D90429]/40 group-hover:text-[#D90429]">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#D90429]">
                    {sponsor.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    Sponsor oficial que forma parte del crecimiento deportivo
                    y competitivo de Atlético EFIS.
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative mt-20 overflow-hidden rounded-[2rem] border border-[#D90429]/20 bg-gradient-to-br from-[#111111] via-black to-[#0a0a0a]"
        >
          {/* Glow */}
          <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D90429]/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-10 p-10 lg:flex-row lg:items-center lg:p-14">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D90429]/20 bg-[#D90429]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D90429]">
                <HeartHandshake className="h-4 w-4" />
                Conviértete en Sponsor
              </div>

              <h3 className="mt-6 text-3xl font-black uppercase leading-tight text-white md:text-5xl">
                Tu marca puede ser parte
                <span className="block text-[#D90429]">
                  del crecimiento de EFIS
                </span>
              </h3>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
                Obtén visibilidad en torneos regionales, redes sociales,
                transmisiones y plataformas digitales conectadas al ecosistema
                4Volei.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contacto"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#D90429] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:scale-105 hover:bg-[#ef233c]"
              >
                Quiero auspiciar

                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>

              <Link
                href="https://www.instagram.com/atletico_efis/"
                target="_blank"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                Ver Instagram
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}