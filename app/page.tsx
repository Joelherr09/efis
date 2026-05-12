import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import TournamentsSection from "@/components/home/TournamentsSection";
import { MapPin, Calendar, Clock, Phone, Mail, Users, Trophy, Heart } from "lucide-react";
import { InstagramIcon } from "@/components/layout/SocialIcons";
import SponsorsSection from "@/components/home/SponsorsSection";

type Match = {
  estado?: string;
  sets_local?: number;
  sets_visita?: number;
  equipo_local?: { nombre?: string };
  equipo_visita?: { nombre?: string };
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

type TournamentWithStandings = {
  name: string;
  url: string;
  type: string;
  data?: any;
  standings: Standing[];
};

// Imágenes de la galería
const galleryImages = [
  { src: "/galeria/img-efis-1.jpg", alt: " " },
  { src: "/galeria/img-efis-2.jpg", alt: " " },
  { src: "/galeria/img-efis-3.jpg", alt: " " },
  { src: "/galeria/img-efis-4.jpg", alt: " " },
  { src: "/galeria/img-efis-5.jpg", alt: " " },
  { src: "/galeria/img-efis-todos.jpg", alt: " " },
];

function extractMatches(response: any): Match[] {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.matches)) return response.matches;
  if (Array.isArray(response?.data?.matches)) return response.data.matches;
  return [];
}

function convertToComponentStandings(apiStandings: any[]): any[] {
  if (!apiStandings || !Array.isArray(apiStandings)) return [];
  return apiStandings.map(team => ({
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

async function fetchWithRetry(url: string, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, { next: { revalidate: 300 }, headers: { 'Content-Type': 'application/json' } });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Intento ${i + 1} fallido para ${url}:`, error);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

async function fetchTournamentWithStandings(url: string): Promise<any> {
  const urlWithStandings = url.includes('?') ? `${url}&standings=true` : `${url}?standings=true`;
  const response = await fetchWithRetry(urlWithStandings);
  return { success: response.success, data: response.data, standings: response.data?.standings || [] };
}

async function getData() {
  try {
    const femaleTeamId = "3370fda5-1a69-41d3-9de2-12ed355af47a";
    const maleTeamId = "c31d2350-70d8-4e10-ac8d-eba1be4cadb9";

    const [femaleMatchesResponse, maleMatchesResponse] = await Promise.all([
      fetchWithRetry(`https://4volei.vercel.app/api/public/matches?teamId=${femaleTeamId}&limit=200`),
      fetchWithRetry(`https://4volei.vercel.app/api/public/matches?teamId=${maleTeamId}&limit=200`),
    ]);

    const femaleMatches = extractMatches(femaleMatchesResponse);
    const maleMatches = extractMatches(maleMatchesResponse);

    const tournamentConfigs = [
      { name: "Todo Competidor Varones", url: "https://4volei.vercel.app/api/public/tournaments?id=17d76966-b9ae-40ba-8dc8-935399c73f5e", type: "men" },
      { name: "Sub 17 Varones", url: "https://4volei.vercel.app/api/public/tournaments?id=3409eea3-ebb0-4bb9-a435-cd6864495002", type: "men" },
      { name: "Todo Competidor Damas", url: "https://4volei.vercel.app/api/public/tournaments?id=d50f19ff-f2b3-4145-84e2-045c7851e2a4", type: "women" },
      { name: "Sub 14 Damas", url: "https://4volei.vercel.app/api/public/tournaments?id=79dedf84-7acc-4a81-b68a-4ff2c03c4c55", type: "women" },
      { name: "Sub 16 Damas", url: "https://4volei.vercel.app/api/public/tournaments?id=ccbcca56-98bd-44ce-9135-f0d530b169e4", type: "women" },
      { name: "Sub 12 Damas", url: "https://4volei.vercel.app/api/public/tournaments?id=9fcd8b98-328f-4e6d-a98e-0c5cf79aa104", type: "women" },
    ];

    const tournamentsData = await Promise.all(
      tournamentConfigs.map(async (tournament) => {
        try {
          const result = await fetchTournamentWithStandings(tournament.url);
          return { ...tournament, data: result.data, standings: convertToComponentStandings(result.standings) };
        } catch {
          return { ...tournament, data: null, standings: [] };
        }
      })
    );

    const allMatches = [...femaleMatches, ...maleMatches];
    const finishedMatches = allMatches.filter((match) => match.estado === "finalizado");

    let totalWins = 0, totalSetsWon = 0;
    finishedMatches.forEach((match) => {
      const localName = match.equipo_local?.nombre?.toLowerCase() || "";
      const awayName = match.equipo_visita?.nombre?.toLowerCase() || "";
      const isLocalEFIS = localName.includes("efis");
      const isAwayEFIS = awayName.includes("efis");

      if (isLocalEFIS || isAwayEFIS) {
        const localSets = match.sets_local || 0;
        const awaySets = match.sets_visita || 0;
        if (isLocalEFIS) { totalSetsWon += localSets; if (localSets > awaySets) totalWins++; }
        else if (isAwayEFIS) { totalSetsWon += awaySets; if (awaySets > localSets) totalWins++; }
      }
    });

    return {
      stats: { totalMatches: finishedMatches.length, totalWins, totalSetsWon, activeTournaments: tournamentConfigs.length },
      menTournaments: tournamentsData.filter((t) => t.type === "men"),
      womenTournaments: tournamentsData.filter((t) => t.type === "women"),
    };
  } catch (error) {
    console.error("Error general en getData:", error);
    return { stats: { totalMatches: 0, totalWins: 0, totalSetsWon: 0, activeTournaments: 0 }, menTournaments: [], womenTournaments: [] };
  }
}

export default async function HomePage() {
  const data = await getData();

  return (
    <div>
      <HeroSection />
      <StatsSection />

      {/* SECCIÓN DE CATEGORÍAS Y HORARIOS */}
      <section className="bg-gradient-to-b from-zinc-950 via-orange-950/5 to-zinc-950 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">Entrena Con Nosotros</p>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Categorías y Horarios</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {["Sub 12 Damas", "Sub 14 Damas", "Sub 16 Damas", "Todo Competidor Varones"].map((cat, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-all hover:scale-105 hover:border-orange-500/30">
                <Trophy className="mx-auto mb-3 h-8 w-8 text-orange-400" />
                <h3 className="text-xl font-semibold text-white">{cat}</h3>
                <p className="mt-2 text-sm text-zinc-400">Martes y Jueves • 18:10 - 21:00 hrs</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOURNAMENTS SECTION */}
      <TournamentsSection menTournaments={data.menTournaments} womenTournaments={data.womenTournaments} />

      {/* SECCIÓN "CONÓCENOS" + INFO DEL CLUB */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">Nuestra Historia</p>
              <h2 className="text-4xl font-black uppercase leading-tight text-white md:text-5xl">Atlético EFIS</h2>
              <p className="mt-6 text-lg leading-relaxed text-[#9CA3AF]">
                Vive la pasión del voleibol con nosotros. Somos un club formado por amantes de este deporte, comprometidos con el desarrollo técnico y la competencia en un ambiente de compañerismo.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                  <MapPin className="h-5 w-5 text-orange-400" />
                  <span className="text-sm text-zinc-300">Punitaqui / Ovalle (desde noviembre)</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                  <Calendar className="h-5 w-5 text-orange-400" />
                  <span className="text-xs text-zinc-300">Martes y Jueves: 18:10 a 21:00 hrs</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                  <Users className="h-5 w-5 text-orange-400" />
                  <span className="text-xs text-zinc-300">Categorías sub12, sub14, sub16 y Todo Competidor</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                  <Trophy className="h-5 w-5 text-orange-400" />
                  <span className="text-xs text-zinc-300">Entrenadores certificados por la FEChV</span>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent" />
              <iframe
                src="https://www.instagram.com/atletico_efis/embed"
                className="h-[500px] w-full"
                frameBorder="0"
              />
            </div>
          </div>
        </div>
      </section>

{/* GALERÍA DE IMÁGENES */}
<section className="relative overflow-hidden border-t border-white/10 bg-black py-28">
  {/* BACKGROUND EFFECTS */}
  <div className="absolute inset-0">
    <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#D90429]/10 blur-3xl" />

    <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-red-500/5 blur-3xl" />

    <div className="absolute left-0 top-40 h-[250px] w-[250px] rounded-full bg-white/5 blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-7xl px-6">
    {/* HEADER */}
    <div className="mx-auto mb-20 max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-[#D90429]/30 bg-[#D90429]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D90429] backdrop-blur-xl">
        📸 Vida de Club
      </div>

      <h2 className="mt-6 text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
        Más que un equipo,
        <span className="block text-[#D90429]">
          una comunidad
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
        Entrenamientos, torneos, viajes y momentos que construyen
        la identidad competitiva y formativa de Atlético EFIS.
      </p>
    </div>

      {/* GALLERY GRID */}
      <div className="grid auto-rows-[220px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {galleryImages.map((img, idx) => {
          const large =
            idx === 0 || idx === 3 || idx === 6;

          return (
            <div
              key={idx}
              className={`
                group relative overflow-hidden rounded-[2rem]
                border border-white/10 bg-zinc-900/40
                transition-all duration-700
                hover:-translate-y-2
                hover:border-[#D90429]/40
                hover:shadow-2xl
                hover:shadow-[#D90429]/10
                ${
                  large
                    ? "md:col-span-2 md:row-span-2"
                    : ""
                }
              `}
            >
              {/* IMAGE */}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

              {/* GLOW */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#D90429]/30 blur-3xl" />
              </div>

              {/* CONTENT */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                <div className="translate-y-6 transition-all duration-500 group-hover:translate-y-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D90429]">
                    Atlético EFIS
                  </p>

                  <h3 className="mt-2 text-xl font-black text-white md:text-2xl">
                    {img.alt}
                  </h3>

                  <div className="mt-4 h-[2px] w-0 bg-[#D90429] transition-all duration-500 group-hover:w-16" />
                </div>
              </div>

              {/* TOP HIGHLIGHT */}
              <div className="absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-[#D90429] to-red-400 transition-all duration-700 group-hover:w-full" />
            </div>
          );
        })}
      </div>

      {/* BOTTOM CTA */}
      <div className="mt-20 flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl md:flex-row md:p-10">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D90429]">
            Vive EFIS
          </p>

          <h3 className="mt-3 text-2xl font-black text-white md:text-3xl">
            Síguenos en nuestras redes sociales
          </h3>

          <p className="mt-3 max-w-2xl text-zinc-400">
            Compartimos resultados, entrenamientos, competencias,
            actividades y el crecimiento de nuestras categorías.
          </p>
        </div>

        <a
          href="https://www.instagram.com/atletico_efis/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#D90429] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:scale-105 hover:bg-[#ef233c]"
        >
          Ver Instagram

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </div>
  </section>

      {/* SECCIÓN "INSCRÍBETE" (LLAMADA A LA ACCIÓN) */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-transparent to-orange-600/10" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Heart className="mx-auto mb-6 h-12 w-12 text-orange-500" />
          <h2 className="text-3xl font-bold text-white md:text-4xl">¿Quieres formar parte?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Contáctanos para una clase de prueba. Te esperamos para que vivas la pasión del voleibol con nosotros.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/56931763843" target="_blank" className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-500">
              <Phone className="h-5 w-5" /> +56 9 3176 3843
            </a>
            <a href="https://www.instagram.com/atletico_efis/" target="_blank" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white transition hover:opacity-90">
              <InstagramIcon className="h-5 w-5" /> @atletico_efis
            </a>
            <Link href="/contacto" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              <Mail className="h-5 w-5" /> Más información
            </Link>
          </div>
          <p className="mt-6 text-xs text-zinc-500">
            📍 Desde noviembre en Ovalle, nos movemos buscando siempre las mejores condiciones para entrenar.
          </p>
        </div>
      </section>
            <SponsorsSection />
    </div>
  );
}