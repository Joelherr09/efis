"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  Trophy,
  Users,
  GraduationCap,
  MapPin,
  Shield,
  Heart,
  ArrowRight,
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
        {/* BG */}
        <div className="absolute inset-0">
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
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2 lg:items-center">
          {/* TEXT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D90429]/30 bg-[#D90429]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#D90429] backdrop-blur-xl">
              🔴⚫ Atlético EFIS
            </div>

            <h1 className="mt-8 max-w-3xl text-5xl font-black uppercase leading-none md:text-7xl">
              Formación,
              <span className="block text-[#D90429]">
                competencia
              </span>
              y comunidad
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#9CA3AF]">
              Atlético EFIS Voley nace como un proyecto deportivo
              enfocado en el crecimiento del voleibol regional,
              impulsando espacios formativos y competitivos para
              niños, jóvenes y adultos en Punitaqui y Ovalle.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {[
                "Punitaqui",
                "Ovalle",
                "Formación",
                "Competencia",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-xl"
                >
                  {item}
                </div>
              ))}
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
              className="absolute -inset-4 rounded-[40px] bg-[#D90429]/20 blur-3xl"
            />

            <div className="relative overflow-hidden rounded-[40px] border border-white/10">
              <Image
                src="/galeria/img-efis-todos.jpg"
                alt="Atlético EFIS"
                width={1200}
                height={900}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
                  Desde 2024
                </p>

                <h3 className="mt-3 text-3xl font-black uppercase">
                  Atlético EFIS
                </h3>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="relative border-b border-white/5 py-28">
        <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#D90429]/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* IMAGE */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[36px] border border-[#D90429]/20">
              <Image
                src="/galeria/fundador.jpeg"
                alt="Felipe Vega"
                width={900}
                height={1200}
                className="h-[650px] w-full object-cover object-top"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D90429]/30 bg-[#D90429]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D90429] backdrop-blur-xl">
                  🔴 Fundación del Club
                </div>

                <h3 className="mt-6 text-4xl font-black uppercase">
                  Felipe Vega
                </h3>
              </div>
            </div>
          </motion.div>

          {/* TEXT */}
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
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
              Nuestra Historia
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase leading-tight md:text-5xl">
              Un proyecto que nació
              <span className="block text-[#D90429]">
                desde la pasión
              </span>
            </h2>

            <div className="mt-8 space-y-6 text-lg leading-relaxed text-[#9CA3AF]">
              <p>
                Atlético EFIS comenzó como una iniciativa deportiva
                impulsada por Felipe Vega y profesores de educación
                física con el objetivo de generar espacios de
                desarrollo para jóvenes deportistas.
              </p>

              <p>
                Aunque el proyecto inicialmente estaba ligado al
                fútbol, el voleibol terminó convirtiéndose en la
                verdadera identidad del club, consolidándose
                oficialmente el 24 de junio de 2024.
              </p>

              <p>
                Actualmente el club trabaja con más de 50
                deportistas activos, promoviendo valores como el
                respeto, la disciplina, el esfuerzo y el trabajo en
                equipo.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Trabajo en equipo",
                "Disciplina",
                "Respeto",
                "Perseverancia",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center font-semibold uppercase tracking-wide text-white"
                >
                  {item}
                </div>
              ))}
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
              desc: "Participación activa en ligas, torneos regionales y competencias federadas.",
            },
            {
              icon: GraduationCap,
              title: "Formación",
              desc: "Entrenamientos orientados al crecimiento técnico, físico y táctico.",
            },
            {
              icon: Users,
              title: "Comunidad",
              desc: "Un entorno deportivo basado en compañerismo y desarrollo humano.",
            },
            {
              icon: MapPin,
              title: "Región",
              desc: "Representando con orgullo a Punitaqui y expandiendo actividad hacia Ovalle.",
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
                className="group rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur transition-all duration-300 hover:border-[#D90429]/20 hover:bg-white/[0.07]"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D90429]/10">
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

      {/* LIGA */}
      <section className="border-b border-white/5 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* TEXT */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
                Liga Provincial
              </p>

              <h2 className="mt-5 text-4xl font-black uppercase leading-tight md:text-5xl">
                Panadería
                <span className="block text-[#D90429]">
                  La Estrella
                </span>
              </h2>

              <p className="mt-8 text-lg leading-relaxed text-[#9CA3AF]">
                Atlético EFIS participa activamente en la promoción
                y fortalecimiento de la Liga Provincial Panadería La
                Estrella, impulsando el crecimiento competitivo del
                voleibol regional.
              </p>

              <p className="mt-6 text-lg leading-relaxed text-[#9CA3AF]">
                El club ha conseguido importantes logros en distintas
                categorías, consolidando un trabajo serio y formativo
                junto a sus deportistas.
              </p>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
              className="rounded-[36px] border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-10"
            >
              <div className="flex h-full items-center justify-center rounded-[32px] border border-white/10 bg-black/30 p-8">
                <div className="relative aspect-square w-full max-w-[320px]">
                  <Image
                    src="/sponsors/sponsor1.jpg"
                    alt="Panadería La Estrella"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROFESORES CTA */}
      <section className="relative py-28">
        <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#D90429]/10 blur-3xl" />

        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#D90429]/20 bg-[#D90429]/10">
              <Shield className="h-10 w-10 text-[#D90429]" />
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
              Staff Técnico
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase leading-tight md:text-5xl">
              Profesores y
              <span className="block text-[#D90429]">
                entrenadores
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-[#9CA3AF]">
              Conoce al equipo de entrenadores que lidera el
              desarrollo formativo y competitivo de Atlético EFIS,
              trabajando día a día junto a cada categoría del club.
            </p>

            <div className="mt-10 flex justify-center">
              <Link
                href="/profesores"
                className="group inline-flex items-center gap-3 rounded-full bg-[#D90429] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:scale-105 hover:bg-[#ef233c]"
              >
                Ver profesores

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}