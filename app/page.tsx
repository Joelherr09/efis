// app/page.tsx

import Image from "next/image";
import Link from "next/link";

import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import TournamentsSection from "@/components/home/TournamentsSection";
import SponsorsSection from "@/components/home/SponsorsSection";

import {
  MapPin,
  Calendar,
  Phone,
  Mail,
  Users,
  Trophy,
  Heart,
  GraduationCap,
  Target,
  Flame,
  Shield,
} from "lucide-react";

import { InstagramIcon } from "@/components/layout/SocialIcons";

type Match = {
  estado?: string;
  sets_local?: number;
  sets_visita?: number;

  equipo_local?: {
    nombre?: string;
  };

  equipo_visita?: {
    nombre?: string;
  };
};

type Standing = {
  equipo_id: string;
  nombre: string;
  siglas: string;
  logo_url: string | null;
  pj: number;
  pg: number;
  pp: number;
  sg: number;
  sp: number;
  dif: number;
  pts: number;
};

const galleryImages = [
  {
    src: "/galeria/img-efis-1.jpg",
    alt: "Entrenamientos formativos",
  },
  {
    src: "/galeria/img-efis-2.jpg",
    alt: "Competencias regionales",
  },
  {
    src: "/galeria/img-efis-3.jpg",
    alt: "Comunidad EFIS",
  },
  {
    src: "/galeria/img-efis-4.jpg",
    alt: "Pasión por el vóleibol",
  },
  {
    src: "/galeria/img-efis-5.jpg",
    alt: "Atlético EFIS en acción",
  },
  {
    src: "/galeria/img-efis-todos.jpg",
    alt: "Familia Atlético EFIS",
  },
];

function extractMatches(response: any): Match[] {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.matches)) return response.matches;
  if (Array.isArray(response?.data?.matches))
    return response.data.matches;

  return [];
}

function convertToComponentStandings(
  apiStandings: any[]
): any[] {
  if (!apiStandings || !Array.isArray(apiStandings))
    return [];

  return apiStandings.map((team) => ({
    teamName: team.nombre,
    played: team.pj,
    won: team.pg,
    lost: team.pp,
    setsWon: team.sg,
    setsLost: team.sp,
    setDifference: team.dif,
    points: team.pts,
  }));
}

async function fetchWithRetry(
  url: string,
  retries = 3
): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        next: {
          revalidate: 300,
        },

        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(
        `Intento ${i + 1} fallido para ${url}:`,
        error
      );

      if (i === retries - 1) {
        throw error;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * (i + 1))
      );
    }
  }
}

async function fetchTournamentWithStandings(
  url: string
): Promise<any> {
  const urlWithStandings = url.includes("?")
    ? `${url}&standings=true`
    : `${url}?standings=true`;

  const response = await fetchWithRetry(
    urlWithStandings
  );

  return {
    success: response.success,
    data: response.data,
    standings: response.data?.standings || [],
  };
}

async function getData() {
  try {
    const femaleTeamId =
      "3370fda5-1a69-41d3-9de2-12ed355af47a";

    const maleTeamId =
      "c31d2350-70d8-4e10-ac8d-eba1be4cadb9";

    const [
      femaleMatchesResponse,
      maleMatchesResponse,
    ] = await Promise.all([
      fetchWithRetry(
        `https://4volei.vercel.app/api/public/matches?teamId=${femaleTeamId}&limit=200`
      ),

      fetchWithRetry(
        `https://4volei.vercel.app/api/public/matches?teamId=${maleTeamId}&limit=200`
      ),
    ]);

    const femaleMatches =
      extractMatches(femaleMatchesResponse);

    const maleMatches =
      extractMatches(maleMatchesResponse);

    const tournamentConfigs = [
      {
        name: "Todo Competidor Varones",
        url: "https://4volei.vercel.app/api/public/tournaments?id=17d76966-b9ae-40ba-8dc8-935399c73f5e",
        type: "men",
      },

      {
        name: "Sub 17 Varones",
        url: "https://4volei.vercel.app/api/public/tournaments?id=3409eea3-ebb0-4bb9-a435-cd6864495002",
        type: "men",
      },

      {
        name: "Todo Competidor Damas",
        url: "https://4volei.vercel.app/api/public/tournaments?id=d50f19ff-f2b3-4145-84e2-045c7851e2a4",
        type: "women",
      },

      {
        name: "Sub 14 Damas",
        url: "https://4volei.vercel.app/api/public/tournaments?id=79dedf84-7acc-4a81-b68a-4ff2c03c4c55",
        type: "women",
      },

      {
        name: "Sub 16 Damas",
        url: "https://4volei.vercel.app/api/public/tournaments?id=ccbcca56-98bd-44ce-9135-f0d530b169e4",
        type: "women",
      },

      {
        name: "Sub 12 Damas",
        url: "https://4volei.vercel.app/api/public/tournaments?id=9fcd8b98-328f-4e6d-a98e-0c5cf79aa104",
        type: "women",
      },
    ];

    const tournamentsData = await Promise.all(
      tournamentConfigs.map(async (tournament) => {
        try {
          const result =
            await fetchTournamentWithStandings(
              tournament.url
            );

          return {
            ...tournament,
            data: result.data,

            standings: convertToComponentStandings(
              result.standings
            ),
          };
        } catch {
          return {
            ...tournament,
            data: null,
            standings: [],
          };
        }
      })
    );

    const allMatches = [
      ...femaleMatches,
      ...maleMatches,
    ];

    const finishedMatches = allMatches.filter(
      (match) => match.estado === "finalizado"
    );

    let totalWins = 0;
    let totalSetsWon = 0;

    finishedMatches.forEach((match) => {
      const localName =
        match.equipo_local?.nombre?.toLowerCase() ||
        "";

      const awayName =
        match.equipo_visita?.nombre?.toLowerCase() ||
        "";

      const isLocalEFIS =
        localName.includes("efis");

      const isAwayEFIS =
        awayName.includes("efis");

      if (isLocalEFIS || isAwayEFIS) {
        const localSets = match.sets_local || 0;

        const awaySets = match.sets_visita || 0;

        if (isLocalEFIS) {
          totalSetsWon += localSets;

          if (localSets > awaySets) {
            totalWins++;
          }
        } else if (isAwayEFIS) {
          totalSetsWon += awaySets;

          if (awaySets > localSets) {
            totalWins++;
          }
        }
      }
    });

    return {
      stats: {
        totalMatches: finishedMatches.length,
        totalWins,
        totalSetsWon,
        activeTournaments:
          tournamentConfigs.length,
      },

      menTournaments: tournamentsData.filter(
        (t) => t.type === "men"
      ),

      womenTournaments: tournamentsData.filter(
        (t) => t.type === "women"
      ),
    };
  } catch (error) {
    console.error(
      "Error general en getData:",
      error
    );

    return {
      stats: {
        totalMatches: 0,
        totalWins: 0,
        totalSetsWon: 0,
        activeTournaments: 0,
      },

      menTournaments: [],
      womenTournaments: [],
    };
  }
}

export default async function HomePage() {
  const data = await getData();

  return (
    <div className="bg-[#050505] text-white">
      <HeroSection />

      <StatsSection />

      {/* HISTORIA */}
      <section className="relative overflow-hidden border-t border-white/5 py-28">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-[#D90429]/10 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-red-500/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D90429]/20 bg-[#D90429]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D90429]">
                🔴⚫ Nuestra Historia
              </div>

              <h2 className="mt-8 text-5xl font-black uppercase leading-none md:text-6xl">
                Atlético
                <span className="block text-[#D90429]">
                  EFIS
                </span>
              </h2>

              <p className="mt-8 text-lg leading-relaxed text-zinc-400">
                Lo que comenzó en 2023 como un
                proyecto orientado al fútbol,
                impulsado por Felipe Vega y
                profesores de educación física,
                terminó transformándose en una
                verdadera pasión por el voleibol.
              </p>

              <p className="mt-6 text-lg leading-relaxed text-zinc-400">
                El 24 de junio de 2024 nació
                oficialmente Atlético EFIS Voley,
                representando a Punitaqui y
                posteriormente expandiéndose
                también hacia Ovalle, formando hoy
                una comunidad de más de 50
                deportistas activos.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <Flame className="mb-3 h-8 w-8 text-[#D90429]" />

                  <h3 className="font-black uppercase">
                    Fundación
                  </h3>

                  <p className="mt-2 text-sm text-zinc-400">
                    24 de junio de 2024
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <Users className="mb-3 h-8 w-8 text-[#D90429]" />

                  <h3 className="font-black uppercase">
                    Comunidad
                  </h3>

                  <p className="mt-2 text-sm text-zinc-400">
                    Más de 50 deportistas activos
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[40px] bg-[#D90429]/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[40px] border border-white/10">
                <Image
                  src="/galeria/img-efis-todos.jpg"
                  alt="Atlético EFIS"
                  width={1400}
                  height={1200}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

{/* FUNDADOR + ENTRENADORES + LIGA */}
<section className="relative overflow-hidden border-t border-white/5 py-28">
  {/* Background Effects */}
  <div className="absolute inset-0">
    <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#D90429]/10 blur-3xl" />

    <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-red-500/5 blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-7xl px-6">
    {/* HEADER */}
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
        Liderazgo Deportivo
      </p>

      <h2 className="mt-5 text-4xl font-black uppercase leading-tight text-white md:text-5xl">
        Formación con
        <span className="block text-[#D90429]">
          identidad
        </span>
      </h2>

      <p className="mt-6 text-lg leading-relaxed text-zinc-400">
        Atlético EFIS impulsa el desarrollo
        competitivo y formativo del voleibol
        regional mediante entrenadores
        comprometidos, valores sólidos y
        proyectos que fortalecen la comunidad
        deportiva.
      </p>
    </div>

    {/* CONTENT */}
    <div className="mt-20 grid gap-8 lg:grid-cols-[1fr_1fr_1.2fr]">
      {/* FUNDADOR */}
      <div className="group relative overflow-hidden rounded-[32px] border border-[#D90429]/20 bg-gradient-to-br from-[#D90429]/10 via-transparent to-transparent p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#D90429]/40 hover:shadow-2xl hover:shadow-[#D90429]/10">
        {/* Glow */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute -top-20 right-0 h-40 w-40 rounded-full bg-[#D90429]/20 blur-3xl" />
        </div>

        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D90429]/20 bg-[#D90429]/10">
            <Shield className="h-8 w-8 text-[#D90429]" />
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-[#D90429]">
            Fundador
          </p>

          <h3 className="mt-4 text-3xl font-black uppercase text-white">
            Felipe Vega
          </h3>

          <div className="mt-5 h-px w-16 bg-gradient-to-r from-[#D90429] to-transparent" />

          <p className="mt-5 leading-relaxed text-zinc-400">
            Impulsor del proyecto Atlético EFIS
            y pieza clave en la construcción del
            club desde sus orígenes, promoviendo
            el crecimiento deportivo y humano del
            voleibol regional.
          </p>
        </div>
      </div>

      {/* ENTRENADORES */}
      <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
        {/* Glow */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
            <GraduationCap className="h-8 w-8 text-[#D90429]" />
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">
            Staff Técnico
          </p>

          <h3 className="mt-4 text-3xl font-black uppercase text-white">
            Entrenadores
          </h3>

          <div className="mt-5 h-px w-16 bg-gradient-to-r from-white/40 to-transparent" />

          <p className="mt-5 leading-relaxed text-zinc-400">
            Profesores certificados por la
            Federación Chilena de Voleibol,
            enfocados en potenciar el desarrollo
            técnico, táctico, físico y humano de
            cada deportista.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-300">
              Formación
            </div>

            <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-300">
              Competencia
            </div>

            <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-300">
              Disciplina
            </div>
          </div>
        </div>
      </div>

      {/* LIGA */}
      <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#D90429]/30 hover:shadow-2xl hover:shadow-[#D90429]/10">
        {/* Background Glow */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-[#D90429]/15 blur-3xl" />
        </div>

        <div className="relative flex h-full flex-col">
          {/* TOP */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D90429]/20 bg-[#D90429]/10">
              <Trophy className="h-8 w-8 text-[#D90429]" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D90429]">
                Liga Provincial
              </p>

              <h3 className="mt-2 text-2xl font-black uppercase text-white">
                Panadería
                <span className="block">
                  La Estrella
                </span>
              </h3>
            </div>
          </div>

          <p className="mt-6 leading-relaxed text-zinc-400">
            Atlético EFIS participa activamente
            en la promoción y fortalecimiento de
            la Liga Provincial Panadería La
            Estrella, impulsando espacios de
            competencia y desarrollo para el
            voleibol regional.
          </p>

          {/* LOGO */}
          <div className="mt-8 flex flex-1 items-center justify-center rounded-[28px] border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
            <div className="relative aspect-square w-full max-w-[240px]">
              <Image
                src="/sponsors/sponsor1.jpg"
                alt="Liga Panadería La Estrella"
                fill
                className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* VALORES */}
      <section className="border-t border-white/5 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
              Nuestros Valores
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase md:text-5xl">
              Más que competir
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Trabajo en equipo",
              "Respeto",
              "Esfuerzo",
              "Perseverancia",
            ].map((value) => (
              <div
                key={value}
                className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#D90429]/30"
              >
                <Heart className="mx-auto mb-5 h-10 w-10 text-[#D90429]" />

                <h3 className="text-2xl font-black uppercase">
                  {value}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="relative overflow-hidden border-t border-white/10 bg-black py-28">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#D90429]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D90429]/30 bg-[#D90429]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D90429]">
              📸 Vida de Club
            </div>

            <h2 className="mt-6 text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
              Una familia
              <span className="block text-[#D90429]">
                en rojo y negro
              </span>
            </h2>
          </div>

          <div className="grid auto-rows-[220px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((img, idx) => {
              const large =
                idx === 0 || idx === 3;

              return (
                <div
                  key={idx}
                  className={`group relative overflow-hidden rounded-[2rem] border border-white/10 transition-all duration-700 hover:-translate-y-2 hover:border-[#D90429]/40 ${
                    large
                      ? "md:col-span-2 md:row-span-2"
                      : ""
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D90429]">
                      Atlético EFIS
                    </p>

                    <h3 className="mt-2 text-2xl font-black text-white">
                      {img.alt}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MISION Y VISION */}
      <section className="border-t border-white/5 py-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-10">
            <Target className="mb-6 h-12 w-12 text-[#D90429]" />

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
              Misión
            </p>

            <p className="mt-6 text-lg leading-relaxed text-zinc-300">
              Formar deportistas íntegros,
              promoviendo valores y habilidades
              técnicas que les permitan destacar
              en el vóley y en la vida.
            </p>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-10">
            <Trophy className="mb-6 h-12 w-12 text-[#D90429]" />

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
              Visión
            </p>

            <p className="mt-6 text-lg leading-relaxed text-zinc-300">
              Ser un referente del vóley en la
              región, impulsando el deporte con
              excelencia, formación y pasión.
            </p>
          </div>
        </div>
      </section>

      <TournamentsSection
        menTournaments={data.menTournaments}
        womenTournaments={data.womenTournaments}
      />

      {/* CONTACTO */}
      <section className="relative overflow-hidden border-t border-white/5 py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D90429]/10 via-transparent to-[#D90429]/10" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <Heart className="mx-auto mb-8 h-14 w-14 text-[#D90429]" />

          <h2 className="text-4xl font-black uppercase md:text-5xl">
            Súmate a EFIS
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400">
            Entrena junto a una comunidad
            comprometida con el desarrollo del
            voleibol regional.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Phone className="mx-auto mb-4 h-7 w-7 text-[#D90429]" />

              <p className="text-sm text-zinc-400">
                WhatsApp
              </p>

              <p className="mt-2 font-semibold">
                +56 9 3176 3843
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Mail className="mx-auto mb-4 h-7 w-7 text-[#D90429]" />

              <p className="text-sm text-zinc-400">
                Correo
              </p>

              <p className="mt-2 text-sm font-semibold">
                AtleticoefisVoley@gmail.com
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <MapPin className="mx-auto mb-4 h-7 w-7 text-[#D90429]" />

              <p className="text-sm text-zinc-400">
                Ubicación
              </p>

              <p className="mt-2 font-semibold">
                Punitaqui / Ovalle
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Calendar className="mx-auto mb-4 h-7 w-7 text-[#D90429]" />

              <p className="text-sm text-zinc-400">
                Horarios
              </p>

              <p className="mt-2 text-sm font-semibold">
                Mar y Jue · 18:10 - 21:00
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/56931763843"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full bg-green-600 px-7 py-3 font-bold text-white transition-all hover:scale-105"
            >
              <Phone className="h-5 w-5" />
              WhatsApp
            </a>

            <a
              href="https://www.instagram.com/atletico_efis/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-7 py-3 font-bold text-white transition-all hover:scale-105"
            >
              <InstagramIcon className="h-5 w-5" />
              Instagram
            </a>

            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 font-bold text-white transition-all hover:bg-white/10"
            >
              <Mail className="h-5 w-5" />
              Contacto
            </Link>
          </div>
        </div>
      </section>

      <SponsorsSection />
    </div>
  );
}