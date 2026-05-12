"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  Trophy,
  Users,
  GraduationCap,
  MapPin,
} from "lucide-react";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function QuienesSomosPage() {
  return (
    <main className="overflow-hidden bg-[#0A0A0A] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        {/* BG EFFECTS */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,4,41,0.20),transparent_40%)]" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#D90429]/10 blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-red-500/10 blur-3xl"
        />

        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-2 lg:items-center">
          {/* TEXT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
              Atlético EFIS
            </p>

            <h1 className="max-w-2xl text-5xl font-black uppercase leading-none md:text-6xl">
              Formación, competencia y pasión por el voleibol
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#9CA3AF]">
              Atlético EFIS Voley Punitaqui es un club deportivo
              enfocado en el desarrollo técnico y competitivo del
              voleibol regional, formando jugadores y jugadoras en
              distintas categorías tanto damas como varones.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="rounded-full border border-[#D90429]/30 bg-[#D90429]/10 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white">
                Punitaqui
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white">
                Ovalle
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white">
                Formación & Competencia
              </div>
            </div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="relative"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
              }}
              className="absolute -inset-4 rounded-[32px] bg-[#D90429]/20 blur-3xl"
            />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10">
              <Image
                src="/galeria/img-efis-todos.jpg"
                alt="Atlético EFIS"
                width={1200}
                height={900}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* INFO */}
      <section className="border-b border-white/5 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: Trophy,
              title: "Competencia",
              desc: "Participación activa en torneos oficiales, federados y competencias regionales del norte de Chile.",
            },
            {
              icon: GraduationCap,
              title: "Formación",
              desc: "Entrenamientos enfocados en el desarrollo técnico, táctico y físico para categorías formativas y adultas.",
            },
            {
              icon: Users,
              title: "Comunidad",
              desc: "Un ambiente deportivo basado en compañerismo, disciplina y crecimiento colectivo.",
            },
            {
              icon: MapPin,
              title: "Punitaqui",
              desc: "Representando con orgullo a Punitaqui y expandiendo su actividad deportiva también hacia Ovalle.",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition-all duration-300 hover:border-[#D90429]/20 hover:bg-white/[0.07]"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D90429]/10 transition-all duration-300 group-hover:bg-[#D90429]/20">
                  <Icon
                    className="text-[#D90429]"
                    size={34}
                  />
                </div>

                <h3 className="text-2xl font-black uppercase">
                  {item.title}
                </h3>

                <p className="mt-4 leading-relaxed text-[#9CA3AF]">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* TORNEOS */}
      <section className="border-b border-white/5 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
              Competencias
            </p>

            <h2 className="max-w-3xl text-4xl font-black uppercase leading-tight">
              Participación activa en torneos regionales y federados
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "ASVOLCO",
                desc: "Participación en competencias oficiales federadas organizadas por ASVOLCO.",
              },
              {
                title: "Livonor",
                desc: "Presencia competitiva en la Liga de Voleibol del Norte, enfrentando clubes de toda la región.",
              },
              {
                title: "Panadería La Estrella",
                desc: "Participación en la Liga Provincial organizada por la Asociación Limarí.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -6,
                }}
                className="group rounded-3xl border border-white/10 bg-[#111111] p-8 transition-all duration-300 hover:border-[#D90429]/20 hover:bg-[#161616]"
              >
                <div className="mb-6 h-1 w-16 rounded-full bg-[#D90429]" />

                <h3 className="text-2xl font-black uppercase">
                  {item.title}
                </h3>

                <p className="mt-4 leading-relaxed text-[#9CA3AF]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="relative py-24">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#D90429]/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* LEFT */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
                Categorías
              </p>

              <h2 className="text-4xl font-black uppercase leading-tight">
                Formación para todas las edades
              </h2>

              <div className="mt-10 flex flex-wrap gap-4">
                {[
                  "Sub 12",
                  "Sub 14",
                  "Sub 16",
                  "Todo Competidor",
                  "Damas",
                  "Varones",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="rounded-full border border-[#D90429]/40 bg-[#D90429]/10 px-5 py-3 font-bold uppercase tracking-wide text-white transition-all duration-300 hover:bg-[#D90429]/20"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
            >
              <p className="text-lg leading-relaxed text-[#9CA3AF]">
                El club trabaja constantemente en el desarrollo del
                voleibol formativo y competitivo, ofreciendo espacios
                de entrenamiento para niños, jóvenes y adultos.
              </p>

              <p className="mt-6 text-lg leading-relaxed text-[#9CA3AF]">
                Los entrenamientos son dirigidos por profesores
                certificados por la Federación Chilena de Voleibol,
                garantizando preparación técnica y metodológica de
                calidad.
              </p>

              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur"
              >
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
                  Entrenamientos
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-black uppercase">
                      Martes & Jueves
                    </h3>

                    <p className="mt-2 text-[#9CA3AF]">
                      Desde las 18:10 hasta las 21:00 hrs
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-black uppercase">
                      Punitaqui & Ovalle
                    </h3>

                    <p className="mt-2 text-[#9CA3AF]">
                      Desarrollo formativo y competitivo
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}