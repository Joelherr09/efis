// app/profesores/page.tsx
import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  Award,
  GraduationCap,
  Shield,
  Trophy,
  Users,
  HeartHandshake,
  Target,
} from "lucide-react";

import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";

export default function ProfesoresPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5">
        {/* BG */}
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#D90429]/15 blur-3xl" />

          <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-red-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <FadeIn>
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D90429]/20 bg-[#D90429]/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#D90429] backdrop-blur-xl">
                <GraduationCap className="h-4 w-4" />
                Cuerpo Técnico
              </div>

              <h1 className="mt-8 text-5xl font-black uppercase leading-none tracking-tight text-white md:text-7xl">
                Profesionales que
                <span className="block text-[#D90429]">
                  inspiran
                </span>
              </h1>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
                Conoce a los entrenadores que
                lideran el desarrollo deportivo y
                formativo de Atlético EFIS,
                impulsando el crecimiento del
                voleibol regional con disciplina,
                pasión y compromiso.
              </p>

              <div className="mt-10">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:border-[#D90429]/30 hover:bg-[#D90429]/10"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Volver al inicio
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FELIPE */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,4,41,0.12),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="grid gap-14 lg:grid-cols-[420px_1fr] lg:items-center">
              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-[40px] border border-[#D90429]/20 bg-zinc-900">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/profes/felipe.jpeg"
                    alt="Felipe Vega"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                {/* Badge */}
                <div className="absolute left-6 top-6 rounded-full border border-[#D90429]/20 bg-black/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D90429] backdrop-blur-xl">
                  Fundador EFIS
                </div>
              </div>

              {/* CONTENT */}
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
                  Profesor & Entrenador
                </p>

                <h2 className="mt-5 text-5xl font-black uppercase leading-none text-white md:text-6xl">
                  Felipe Vega
                  <span className="block text-zinc-500">
                    Urquieta
                  </span>
                </h2>

                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="rounded-full border border-[#D90429]/20 bg-[#D90429]/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#D90429]">
                    Educación Física
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold uppercase tracking-wide text-zinc-300">
                    Entrenador Nacional Nivel 1
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold uppercase tracking-wide text-zinc-300">
                    Minivoleibol
                  </div>
                </div>

                <div className="mt-10 space-y-6 text-lg leading-relaxed text-zinc-400">
                  <p>
                    Profesor de Educación Física
                    titulado el año 2014 y
                    entrenador nacional
                    certificado de Minivoleibol,
                    además de contar con la
                    certificación de Entrenador
                    Nacional de Voleibol Nivel 1.
                  </p>

                  <p>
                    A lo largo de su trayectoria,
                    ha dedicado gran parte de su
                    trabajo al desarrollo del
                    deporte escolar y formativo,
                    promoviendo el voleibol como
                    una herramienta de crecimiento
                    personal y colectivo.
                  </p>

                  <p>
                    Durante el año 2025 alcanzó
                    importantes logros deportivos,
                    destacando el campeonato
                    provincial sub14 damas y el
                    segundo lugar regional en la
                    misma categoría.
                  </p>
                </div>

                {/* STATS */}
                <div className="mt-12 grid gap-4 md:grid-cols-3">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                    <Trophy className="h-7 w-7 text-[#D90429]" />

                    <p className="mt-4 text-3xl font-black text-white">
                      2025
                    </p>

                    <p className="mt-2 text-sm text-zinc-400">
                      Campeón Provincial Sub14
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                    <Award className="h-7 w-7 text-[#D90429]" />

                    <p className="mt-4 text-3xl font-black text-white">
                      Nivel 1
                    </p>

                    <p className="mt-2 text-sm text-zinc-400">
                      Entrenador Nacional FECHV
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                    <Users className="h-7 w-7 text-[#D90429]" />

                    <p className="mt-4 text-3xl font-black text-white">
                      50+
                    </p>

                    <p className="mt-2 text-sm text-zinc-400">
                      Deportistas activos
                    </p>
                  </div>
                </div>

                {/* QUOTE */}
                <div className="mt-12 rounded-[32px] border border-[#D90429]/20 bg-[#D90429]/5 p-8">
                  <p className="text-xl italic leading-relaxed text-zinc-200">
                    “El deporte es una escuela de
                    vida que fortalece la
                    disciplina, el respeto, el
                    compromiso y el trabajo en
                    equipo.”
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* OSCAR */}
      <section className="relative border-t border-white/5 py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="grid gap-14 lg:grid-cols-[1fr_420px] lg:items-center">
              {/* CONTENT */}
              <div className="order-2 lg:order-1">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
                  Entrenador Rama Masculina
                </p>

                <h2 className="mt-5 text-5xl font-black uppercase leading-none text-white md:text-6xl">
                  Oscar José
                  <span className="block text-zinc-500">
                    Beron Scapinardi
                  </span>
                </h2>

                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold uppercase tracking-wide text-zinc-300">
                    Buenos Aires
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold uppercase tracking-wide text-zinc-300">
                    Liga Metropolitana
                  </div>

                  <div className="rounded-full border border-[#D90429]/20 bg-[#D90429]/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#D90429]">
                    Sub17 & Todo Competidor
                  </div>
                </div>

                <div className="mt-10 space-y-6 text-lg leading-relaxed text-zinc-400">
                  <p>
                    Inició su trayectoria en el
                    voleibol durante el año 2007 y
                    comenzó a competir en 2010 en
                    un equipo perteneciente a la
                    Liga Metropolitana de Buenos
                    Aires.
                  </p>

                  <p>
                    Tras llegar a Chile en 2019,
                    se integró activamente al
                    movimiento del voleibol en
                    Ovalle y posteriormente fue
                    parte de la fundación de ACE
                    Voley Ovalle.
                  </p>

                  <p>
                    Actualmente lidera la rama
                    masculina de Atlético EFIS
                    desde la categoría sub17,
                    impulsando una metodología
                    basada en disciplina,
                    esfuerzo, práctica constante y
                    refuerzo positivo.
                  </p>
                </div>

                {/* CARDS */}
                <StaggerContainer className="mt-12 grid gap-4 md:grid-cols-3">
                  <FadeIn>
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                      <Target className="h-7 w-7 text-[#D90429]" />

                      <p className="mt-4 text-3xl font-black text-white">
                        2007
                      </p>

                      <p className="mt-2 text-sm text-zinc-400">
                        Inicio deportivo
                      </p>
                    </div>
                  </FadeIn>

                  <FadeIn>
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                      <Shield className="h-7 w-7 text-[#D90429]" />

                      <p className="mt-4 text-3xl font-black text-white">
                        2010
                      </p>

                      <p className="mt-2 text-sm text-zinc-400">
                        Competencia en Buenos Aires
                      </p>
                    </div>
                  </FadeIn>

                  <FadeIn>
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                      <HeartHandshake className="h-7 w-7 text-[#D90429]" />

                      <p className="mt-4 text-3xl font-black text-white">
                        2026
                      </p>

                      <p className="mt-2 text-sm text-zinc-400">
                        Lidera rama masculina EFIS
                      </p>
                    </div>
                  </FadeIn>
                </StaggerContainer>

                {/* QUOTE */}
                <div className="mt-12 rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
                  <p className="text-xl italic leading-relaxed text-zinc-200">
                    “La disciplina y la práctica
                    constante pueden llevar a
                    cualquier jugador a un alto
                    nivel competitivo.”
                  </p>
                </div>
              </div>

              {/* IMAGE */}
              <div className="order-1 lg:order-2">
                <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-zinc-900">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src="/profes/oscar.jpeg"
                      alt="Oscar Beron"
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                  <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white backdrop-blur-xl">
                    Rama Masculina
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[40px] border border-[#D90429]/20 bg-gradient-to-br from-[#D90429]/10 via-transparent to-transparent p-10 text-center backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,4,41,0.12),transparent_60%)]" />

              <div className="relative">
                <Users className="mx-auto h-14 w-14 text-[#D90429]" />

                <h3 className="mt-6 text-4xl font-black uppercase text-white">
                  Sé parte de EFIS
                </h3>

                <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
                  Entrena junto a un club que
                  impulsa el crecimiento deportivo
                  y humano mediante disciplina,
                  pasión y trabajo en equipo.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-2 rounded-full bg-[#D90429] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:scale-105 hover:bg-[#ef233c]"
                  >
                    Contactar Club
                  </Link>

                  <a
                    href="https://www.instagram.com/atletico_efis/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}