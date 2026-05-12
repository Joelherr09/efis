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

      {/* FUNDACIÓN + LIGA PANADERÍA LA ESTRELLA */}
<section className="relative overflow-hidden border-t border-white/5 py-28">
  {/* BACKGROUND */}
  <div className="absolute inset-0">
    <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#D90429]/10 blur-3xl" />

    <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-red-500/5 blur-3xl" />

    <div className="absolute right-0 top-20 h-[220px] w-[220px] rounded-full bg-white/5 blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-7xl px-6">
    {/* HEADER */}
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
        Identidad EFIS
      </p>

      <h2 className="mt-5 text-4xl font-black uppercase leading-tight text-white md:text-6xl">
        Pasión que
        <span className="block text-[#D90429]">
          construye comunidad
        </span>
      </h2>

      <p className="mt-6 text-lg leading-relaxed text-zinc-400">
        Atlético EFIS nace desde el compromiso con el deporte formativo,
        impulsando espacios competitivos y fortaleciendo el crecimiento
        del voleibol en la provincia.
      </p>
    </div>

    {/* CONTENT */}
    <div className="mt-20 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      {/* FUNDACIÓN */}
<div className="group relative overflow-hidden rounded-[36px] border border-[#D90429]/20 bg-gradient-to-br from-[#D90429]/10 via-black/40 to-black/70">
  {/* IMAGE */}
  <div className="relative h-[560px] md:h-full overflow-hidden">
    <Image
      src="/galeria/fundador.jpeg"
      alt="Felipe Vega - Atlético EFIS"
      fill
      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
    />

    {/* MAIN OVERLAY */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

    {/* EXTRA DARK BOTTOM FOR READABILITY */}
    <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black via-black/90 to-transparent" />

    {/* SIDE SHADOW */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

    {/* SOFT RED GLOW */}
    <div className="absolute bottom-0 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-[#D90429]/15 blur-3xl" />

    {/* CONTENT */}
    <div className="absolute inset-x-0 bottom-0 z-10 p-8 md:p-10">
      <div className="translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
        <div className="inline-flex mb-26 items-center gap-2 rounded-full border border-[#D90429]/30 bg-[#D90429]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-zinc-200 backdrop-blur-xl">
          🔴 Fundación del Club
        </div>

        <h3 className="mt-40 text-4xl font-black uppercase leading-none text-white drop-shadow-2xl md:text-5xl">
          Felipe Vega
        </h3>

        <div className="mt-2 h-px w-24 bg-gradient-to-r from-[#D90429] to-transparent" />

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-200 md:text-lg">
          Fundador e impulsor de Atlético EFIS. Desde sus inicios,
          ha liderado un proyecto enfocado en la formación deportiva,
          el desarrollo humano y el crecimiento competitivo del
          voleibol en Punitaqui y Ovalle.
        </p>

      </div>
    </div>
  </div>
</div>

      {/* LIGA */}
      <div className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-white/[0.04] via-black/40 to-black/80 p-4 transition-all duration-500 hover:border-[#D90429]/30 hover:shadow-2xl hover:shadow-[#D90429]/10 md:my-auto md:p-10">
        {/* GLOW */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#D90429]/10 blur-3xl" />
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

              <h3 className="mt-2 text-3xl font-black uppercase leading-none text-white">
                Panadería
                <span className="block">
                  La Estrella
                </span>
              </h3>
            </div>
          </div>

          <p className="mt-2 leading-relaxed text-zinc-400">
            Atlético EFIS participa activamente en la promoción y
            fortalecimiento de la Liga Provincial Panadería La Estrella,
            impulsando espacios competitivos y oportunidades de desarrollo
            para deportistas de distintas categorías.
          </p>

          {/* LOGO CONTAINER */}
          <div className="mt-4 flex flex-1 items-center justify-center rounded-[32px] border border-white/10 bg-black/40 p-8 backdrop-blur-xl">
            <div className="relative aspect-square w-full max-w-[260px]">
              <Image
                src="/sponsors/sponsor1.jpg"
                alt="Liga Panadería La Estrella"
                fill
                className="object-contain drop-shadow-[0_0_35px_rgba(217,4,41,0.15)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>


      {/* PROFESORES */}
<section className="relative overflow-hidden border-t border-white/5 py-28">
  {/* Background Effects */}
  <div className="absolute inset-0">
    <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#D90429]/10 blur-3xl" />

    <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-red-500/5 blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-7xl px-6">
    {/* HEADER */}
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
        Cuerpo Técnico
      </p>

      <h2 className="mt-5 text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
        Profesionales que
        <span className="block text-[#D90429]">
          forman personas
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
        Atlético EFIS desarrolla el voleibol
        regional mediante entrenadores con
        experiencia competitiva, formación
        profesional y una visión centrada en el
        crecimiento deportivo y humano.
      </p>
    </div>

    {/* PROFES CARDS */}
    <div className="mt-20 space-y-12">
      {/* FELIPE */}
      <div className="group relative overflow-hidden rounded-[40px] border border-[#D90429]/20 bg-gradient-to-br from-[#D90429]/10 via-black/40 to-transparent transition-all duration-700 hover:border-[#D90429]/40 hover:shadow-2xl hover:shadow-[#D90429]/10">
        <div className="grid lg:grid-cols-[380px_1fr]">
          {/* IMAGE */}
          <div className="relative min-h-[520px] overflow-hidden">
            <Image
              src="/profes/felipe.jpeg"
              alt="Felipe Vega"
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/40" />

            {/* Badge */}
            <div className="absolute left-6 top-6 rounded-full border border-[#D90429]/30 bg-black/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D90429] backdrop-blur-xl">
              Fundador
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative flex flex-col justify-center p-8 md:p-12">
            {/* Glow */}
            <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-[#D90429]/10 blur-3xl" />

            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
                Profesor & Entrenador
              </p>

              <h3 className="mt-4 text-4xl font-black uppercase text-white md:text-5xl">
                Felipe Vega
                <span className="block text-zinc-500">
                  Urquieta
                </span>
              </h3>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-full border border-[#D90429]/20 bg-[#D90429]/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#D90429]">
                  Educación Física
                </div>

                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-300">
                  Entrenador Nivel 1
                </div>

                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-300">
                  Minivoleibol
                </div>
              </div>

              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
                Profesor de Educación Física
                titulado en 2014 y fundador de
                Atlético EFIS. Ha dedicado gran
                parte de su trayectoria al
                desarrollo del deporte escolar y
                formativo, obteniendo títulos
                comunales, provinciales y
                regionales junto a sus equipos.
              </p>

              {/* STATS */}
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-3xl font-black text-[#D90429]">
                    2014
                  </p>

                  <p className="mt-2 text-sm text-zinc-400">
                    Inicio trayectoria profesional
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-3xl font-black text-[#D90429]">
                    2025
                  </p>

                  <p className="mt-2 text-sm text-zinc-400">
                    Campeón Provincial Sub14
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-3xl font-black text-[#D90429]">
                    50+
                  </p>

                  <p className="mt-2 text-sm text-zinc-400">
                    Deportistas activos en EFIS
                  </p>
                </div>
              </div>

              <blockquote className="mt-10 border-l-2 border-[#D90429] pl-5 text-lg italic leading-relaxed text-zinc-300">
                “El deporte es una escuela de
                vida donde la disciplina, el
                respeto y el trabajo en equipo
                forman grandes personas.”
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* OSCAR */}
      <div className="group relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] transition-all duration-700 hover:border-white/20 hover:shadow-2xl hover:shadow-black/30">
        <div className="grid lg:grid-cols-[380px_1fr]">
          {/* IMAGE */}
          <div className="relative min-h-[520px] overflow-hidden">
            <Image
              src="/profes/oscar.jpeg"
              alt="Oscar Beron"
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/40" />

            {/* Badge */}
            <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white backdrop-blur-xl">
              Rama Masculina
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative flex flex-col justify-center p-8 md:p-12">
            <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-white/5 blur-3xl" />

            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
                Entrenador
              </p>

              <h3 className="mt-4 text-4xl font-black uppercase text-white md:text-5xl">
                Oscar José
                <span className="block text-zinc-500">
                  Beron Scapinardi
                </span>
              </h3>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-300">
                  Buenos Aires
                </div>

                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-300">
                  Liga Metropolitana
                </div>

                <div className="rounded-full border border-[#D90429]/20 bg-[#D90429]/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#D90429]">
                  Sub17 & TC
                </div>
              </div>

              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
                Inició su trayectoria deportiva
                en Argentina y compitió en la Liga
                Metropolitana de Buenos Aires.
                Desde su llegada a Chile ha sido
                parte activa del desarrollo del
                voleibol en Ovalle y actualmente
                lidera la rama masculina de
                Atlético EFIS.
              </p>

              {/* STATS */}
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-3xl font-black text-[#D90429]">
                    2007
                  </p>

                  <p className="mt-2 text-sm text-zinc-400">
                    Inicio en el voleibol
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-3xl font-black text-[#D90429]">
                    2010
                  </p>

                  <p className="mt-2 text-sm text-zinc-400">
                    Competencia en Buenos Aires
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-3xl font-black text-[#D90429]">
                    2026
                  </p>

                  <p className="mt-2 text-sm text-zinc-400">
                    Lidera rama masculina EFIS
                  </p>
                </div>
              </div>

              <blockquote className="mt-10 border-l-2 border-[#D90429] pl-5 text-lg italic leading-relaxed text-zinc-300">
                “La disciplina y la práctica
                constante pueden llevar a
                cualquier jugador a un alto nivel
                competitivo.”
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* CTA */}
    <div className="mt-16 text-center">
      <Link
        href="/profesores"
        className="group inline-flex items-center gap-3 rounded-full border border-[#D90429]/30 bg-[#D90429]/10 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:scale-105 hover:border-[#D90429] hover:bg-[#D90429]"
      >
        Conocer cuerpo técnico completo

        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
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