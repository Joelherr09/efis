// app/calendario/page.tsx
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Users,
} from "lucide-react";

import { format } from "date-fns";
import { es } from "date-fns/locale";

import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";

type Match = {
  id: string;
  fecha: string;
  estado: string;
  cancha: string | null;
  sets_local: number;
  sets_visita: number;

  equipo_local: {
    id: string;
    nombre: string;
    siglas: string;
  } | null;

  equipo_visita: {
    id: string;
    nombre: string;
    siglas: string;
  } | null;

  torneo: {
    id: string;
    nombre: string;
  } | null;
};

async function fetchWithRetry(
  url: string,
  retries = 3
): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        next: { revalidate: 300 },

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
      console.error(`Intento ${i + 1} fallido:`, error);

      if (i === retries - 1) {
        throw error;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * (i + 1))
      );
    }
  }
}

function extractMatches(response: any): Match[] {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.matches)) {
    return response.matches;
  }

  if (Array.isArray(response?.data?.matches)) {
    return response.data.matches;
  }

  return [];
}

function groupMatchesByMonth(matches: Match[]) {
  const groups: { [key: string]: Match[] } = {};

  matches.forEach((match) => {
    if (!match.fecha) {
      return;
    }

    const date = new Date(match.fecha);

    const monthKey = format(date, "MMMM yyyy", {
      locale: es,
    });

    if (!groups[monthKey]) {
      groups[monthKey] = [];
    }

    groups[monthKey].push(match);
  });

  return groups;
}

function sortMatchesByDate(matches: Match[]) {
  return [...matches].sort(
    (a, b) =>
      new Date(a.fecha).getTime() -
      new Date(b.fecha).getTime()
  );
}

async function getMatches() {
  try {
    const maleTeamId =
      "c31d2350-70d8-4e10-ac8d-eba1be4cadb9";

    const femaleTeamId =
      "3370fda5-1a69-41d3-9de2-12ed355af47a";

    const [maleResponse, femaleResponse] =
      await Promise.all([
        fetchWithRetry(
          `https://4volei.vercel.app/api/public/matches?teamId=${maleTeamId}&limit=100`
        ),

        fetchWithRetry(
          `https://4volei.vercel.app/api/public/matches?teamId=${femaleTeamId}&limit=100`
        ),
      ]);

    const maleMatches = extractMatches(maleResponse);

    const femaleMatches =
      extractMatches(femaleResponse);

    const allMatches = [
      ...maleMatches,
      ...femaleMatches,
    ];

    const upcomingMatches = allMatches.filter(
      (match) => {
        if (match.estado !== "programado") {
          return false;
        }

        if (!match.fecha) {
          return false;
        }

        return new Date(match.fecha) > new Date();
      }
    );

    return sortMatchesByDate(upcomingMatches);
  } catch (error) {
    console.error("Error fetching matches:", error);

    return [];
  }
}

function getMonthNumber(monthName: string): number {
  const months: { [key: string]: number } = {
    enero: 0,
    febrero: 1,
    marzo: 2,
    abril: 3,
    mayo: 4,
    junio: 5,
    julio: 6,
    agosto: 7,
    septiembre: 8,
    octubre: 9,
    noviembre: 10,
    diciembre: 11,
  };

  return months[monthName.split(" ")[0]] || 0;
}

export default async function CalendarioPage() {
  const matches = await getMatches();

  const groupedMatches =
    groupMatchesByMonth(matches);

  const sortedMonths = Object.keys(
    groupedMatches
  ).sort((a, b) => {
    const dateA = new Date(
      2024,
      getMonthNumber(a)
    );

    const dateB = new Date(
      2024,
      getMonthNumber(b)
    );

    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,4,41,0.18),transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <FadeIn>
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D90429]/20 bg-[#D90429]/10 px-5 py-2 text-sm font-semibold text-[#D90429] backdrop-blur-sm">
                <CalendarIcon className="h-4 w-4" />
                Calendario Oficial
              </div>

              <h1 className="mt-8 text-5xl font-black uppercase leading-none tracking-tight text-white md:text-7xl">
                Próximos
                <span className="block text-[#D90429]">
                  Partidos
                </span>
              </h1>

              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
                Sigue el calendario competitivo de
                Atlético EFIS y acompaña al club en
                cada encuentro regional.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        {matches.length === 0 ? (
          <FadeIn>
            <div className="flex flex-col items-center justify-center rounded-[32px] border border-white/10 bg-white/[0.03] py-24 text-center backdrop-blur-xl">
              <CalendarIcon className="mb-6 h-16 w-16 text-zinc-600" />

              <h2 className="text-3xl font-black uppercase text-white">
                No hay partidos programados
              </h2>

              <p className="mt-4 max-w-lg text-zinc-400">
                Próximamente se publicará el
                calendario oficial de encuentros.
              </p>
            </div>
          </FadeIn>
        ) : (
          <div className="space-y-20">
            {sortedMonths.map((month, monthIndex) => {
              const matchesInMonth =
                groupedMatches[month];

              return (
                <FadeIn
                  key={month}
                  delay={monthIndex * 0.08}
                >
                  <div>
                    {/* MONTH TITLE */}
                    <div className="mb-10 flex items-center gap-5">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                      <h2 className="text-center text-2xl font-black uppercase tracking-wide text-white md:text-3xl">
                        {month}
                      </h2>

                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>

                    {/* MATCHES */}
                    <StaggerContainer className="space-y-4">
                      {matchesInMonth.map(
                        (match, index) => (
                          <FadeIn
                            key={match.id}
                            delay={index * 0.05}
                          >
                            <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-r from-white/[0.04] to-white/[0.02] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#D90429]/30 hover:shadow-2xl hover:shadow-[#D90429]/10">
                              {/* Glow */}
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,4,41,0.15),transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                              <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                                {/* DATE */}
                                <div className="flex items-center gap-4 md:w-44">
                                  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-[#D90429]/20 bg-[#D90429]/10">
                                    <span className="text-2xl font-black text-[#D90429]">
                                      {format(
                                        new Date(
                                          match.fecha
                                        ),
                                        "dd"
                                      )}
                                    </span>

                                    <span className="text-[10px] uppercase tracking-widest text-zinc-400">
                                      {format(
                                        new Date(
                                          match.fecha
                                        ),
                                        "MMM",
                                        {
                                          locale: es,
                                        }
                                      )}
                                    </span>
                                  </div>

                                  <div>
                                    <p className="text-sm font-bold capitalize text-white">
                                      {format(
                                        new Date(
                                          match.fecha
                                        ),
                                        "EEEE",
                                        {
                                          locale: es,
                                        }
                                      )}
                                    </p>

                                    <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                                      <Clock className="h-3 w-3" />
                                      {format(
                                        new Date(
                                          match.fecha
                                        ),
                                        "HH:mm"
                                      )}{" "}
                                      hrs
                                    </p>
                                  </div>
                                </div>

                                {/* TEAMS */}
                                <div className="flex flex-1 items-center justify-center gap-3 md:gap-6">
                                  <div className="flex-1 text-right">
                                    <p className="text-sm font-black uppercase tracking-wide text-white md:text-lg">
                                      {match.equipo_local
                                        ?.siglas || "TBD"}
                                    </p>

                                    <p className="mt-1 hidden text-xs text-zinc-500 md:block">
                                      {
                                        match.equipo_local
                                          ?.nombre
                                      }
                                    </p>
                                  </div>

                                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black tracking-[0.25em] text-[#D90429]">
                                    VS
                                  </div>

                                  <div className="flex-1 text-left">
                                    <p className="text-sm font-black uppercase tracking-wide text-white md:text-lg">
                                      {match.equipo_visita
                                        ?.siglas || "TBD"}
                                    </p>

                                    <p className="mt-1 hidden text-xs text-zinc-500 md:block">
                                      {
                                        match.equipo_visita
                                          ?.nombre
                                      }
                                    </p>
                                  </div>
                                </div>

                                {/* INFO */}
                                <div className="flex flex-col gap-2 md:w-56 md:items-end">
                                  {match.torneo && (
                                    <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400">
                                      🏆{" "}
                                      {
                                        match.torneo
                                          .nombre
                                      }
                                    </div>
                                  )}

                                  {match.cancha && (
                                    <div className="flex items-center gap-1 text-xs text-zinc-500">
                                      <MapPin className="h-3 w-3" />

                                      <span className="truncate">
                                        {match.cancha}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </FadeIn>
                        )
                      )}
                    </StaggerContainer>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <FadeIn delay={0.2}>
          <div className="relative mt-24 overflow-hidden rounded-[36px] border border-[#D90429]/20 bg-gradient-to-br from-[#D90429]/10 via-transparent to-transparent p-10 text-center backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,4,41,0.12),transparent_55%)]" />

            <div className="relative">
              <Users className="mx-auto mb-6 h-14 w-14 text-[#D90429]" />

              <h3 className="text-3xl font-black uppercase text-white">
                ¡Ven a apoyar a EFIS!
              </h3>

              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
                Vive el voleibol regional junto a
                nuestra comunidad deportiva y acompaña
                al club en cada competencia.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="https://instagram.com/atletico_efis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  Instagram
                </a>

                <a
                  href="https://wa.me/56931763843"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-green-600 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}