import Image from "next/image";
import {
  Trophy,
  Users,
  GraduationCap,
  MapPin,
} from "lucide-react";

export default function QuienesSomosPage() {
  return (
    <main className="bg-[#0A0A0A] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D90429]/10 via-transparent to-transparent" />

        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
          <div>
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
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[32px] bg-[#D90429]/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10">
              <Image
                src="/galeria/img-efis-todos.jpg"
                alt="Atlético EFIS"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* INFO */}
      <section className="border-b border-white/5 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <Trophy className="mb-6 text-[#D90429]" size={36} />

            <h3 className="text-2xl font-black uppercase">
              Competencia
            </h3>

            <p className="mt-4 leading-relaxed text-[#9CA3AF]">
              Participación activa en torneos oficiales, federados y
              competencias regionales del norte de Chile.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <GraduationCap
              className="mb-6 text-[#D90429]"
              size={36}
            />

            <h3 className="text-2xl font-black uppercase">
              Formación
            </h3>

            <p className="mt-4 leading-relaxed text-[#9CA3AF]">
              Entrenamientos enfocados en el desarrollo técnico,
              táctico y físico para categorías formativas y adultas.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <Users className="mb-6 text-[#D90429]" size={36} />

            <h3 className="text-2xl font-black uppercase">
              Comunidad
            </h3>

            <p className="mt-4 leading-relaxed text-[#9CA3AF]">
              Un ambiente deportivo basado en compañerismo,
              disciplina y crecimiento colectivo.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <MapPin className="mb-6 text-[#D90429]" size={36} />

            <h3 className="text-2xl font-black uppercase">
              Punitaqui
            </h3>

            <p className="mt-4 leading-relaxed text-[#9CA3AF]">
              Representando con orgullo a Punitaqui y expandiendo su
              actividad deportiva también hacia Ovalle.
            </p>
          </div>
        </div>
      </section>

      {/* TORNEOS */}
      <section className="border-b border-white/5 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
            Competencias
          </p>

          <h2 className="max-w-3xl text-4xl font-black uppercase leading-tight">
            Participación activa en torneos regionales y federados
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-[#111111] p-8">
              <h3 className="text-2xl font-black uppercase">
                ASVOLCO
              </h3>

              <p className="mt-4 text-[#9CA3AF]">
                Participación en competencias oficiales federadas
                organizadas por ASVOLCO.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111111] p-8">
              <h3 className="text-2xl font-black uppercase">
                Livonor
              </h3>

              <p className="mt-4 text-[#9CA3AF]">
                Presencia competitiva en la Liga de Voleibol del
                Norte, enfrentando clubes de toda la región.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111111] p-8">
              <h3 className="text-2xl font-black uppercase">
                Panadería La Estrella
              </h3>

              <p className="mt-4 text-[#9CA3AF]">
                Participación en la Liga Provincial organizada por la
                Asociación Limarí.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
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
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-[#D90429]/40 bg-[#D90429]/10 px-5 py-3 font-bold uppercase tracking-wide text-white"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}