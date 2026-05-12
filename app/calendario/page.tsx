// app/calendario/page.tsx
import { Calendar as CalendarIcon, MapPin, Clock, Users } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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

async function fetchWithRetry(url: string, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        next: { revalidate: 300 },
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Intento ${i + 1} fallido:`, error);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

function extractMatches(response: any): Match[] {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.matches)) return response.matches;
  if (Array.isArray(response?.data?.matches)) return response.data.matches;
  return [];
}

function groupMatchesByMonth(matches: Match[]) {
  const groups: { [key: string]: Match[] } = {};
  
  matches.forEach(match => {
    if (!match.fecha) return;
    const date = new Date(match.fecha);
    const monthKey = format(date, "MMMM yyyy", { locale: es });
    
    if (!groups[monthKey]) {
      groups[monthKey] = [];
    }
    groups[monthKey].push(match);
  });
  
  return groups;
}

function sortMatchesByDate(matches: Match[]) {
  return [...matches].sort((a, b) => 
    new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  );
}

async function getMatches() {
  try {
    const maleTeamId = "c31d2350-70d8-4e10-ac8d-eba1be4cadb9";
    const femaleTeamId = "3370fda5-1a69-41d3-9de2-12ed355af47a";

    const [maleResponse, femaleResponse] = await Promise.all([
      fetchWithRetry(`https://4volei.vercel.app/api/public/matches?teamId=${maleTeamId}&limit=100`),
      fetchWithRetry(`https://4volei.vercel.app/api/public/matches?teamId=${femaleTeamId}&limit=100`),
    ]);

    const maleMatches = extractMatches(maleResponse);
    const femaleMatches = extractMatches(femaleResponse);
    const allMatches = [...maleMatches, ...femaleMatches];
    
    const upcomingMatches = allMatches.filter(match => {
      if (match.estado !== "programado") return false;
      if (!match.fecha) return false;
      return new Date(match.fecha) > new Date();
    });

    return sortMatchesByDate(upcomingMatches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    return [];
  }
}

function getMonthNumber(monthName: string): number {
  const months: { [key: string]: number } = {
    'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3,
    'mayo': 4, 'junio': 5, 'julio': 6, 'agosto': 7,
    'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
  };
  return months[monthName.split(' ')[0]] || 0;
}

export default async function CalendarioPage() {
  const matches = await getMatches();
  const groupedMatches = groupMatchesByMonth(matches);

  const sortedMonths = Object.keys(groupedMatches).sort((a, b) => {
    const dateA = new Date(2024, getMonthNumber(a));
    const dateB = new Date(2024, getMonthNumber(b));
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#D90429]/10 via-transparent to-transparent pt-20 pb-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#D90429]/20 px-4 py-1.5 text-sm text-[#D90429] backdrop-blur-sm">
            <CalendarIcon className="h-4 w-4" />
            Calendario Oficial
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            Próximos Partidos
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Calendario completo de encuentros de Atlético EFIS. 
            ¡Ven a apoyar a nuestro equipo!
          </p>
        </div>
      </div>

      {/* Contenido del Calendario */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        {matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-20 text-center backdrop-blur-sm">
            <CalendarIcon className="mb-4 h-16 w-16 text-zinc-600" />
            <h2 className="text-2xl font-semibold text-white">No hay partidos programados</h2>
            <p className="mt-2 text-zinc-400">
              Próximamente se publicará el calendario de partidos.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {sortedMonths.map((month) => {
              const matchesInMonth = groupedMatches[month];
              return (
                <div key={month} className="group">
                  {/* Encabezado del mes */}
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <h2 className="text-xl font-bold capitalize text-white md:text-2xl">
                      {month}
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>

                  {/* Lista de partidos del mes */}
                  <div className="space-y-3">
                    {matchesInMonth.map((match) => (
                      <div
                        key={match.id}
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent p-4 transition-all duration-300 hover:border-[#D90429]/30 hover:shadow-lg hover:shadow-[#D90429]/5"
                      >
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#D90429]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        
                        {/* Layout Responsivo: Cambia a columna en móvil, fila en desktop */}
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          
                          {/* Fecha - Izquierda */}
                          <div className="flex items-center gap-3 md:w-36">
                            <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-[#D90429]/10 text-center">
                              <span className="text-xl font-bold text-[#D90429]">
                                {format(new Date(match.fecha), "dd")}
                              </span>
                              <span className="text-[10px] uppercase text-zinc-400">
                                {format(new Date(match.fecha), "MMM", { locale: es })}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-white">
                                {format(new Date(match.fecha), "EEEE", { locale: es })}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-zinc-400">
                                <Clock className="h-3 w-3" />
                                {format(new Date(match.fecha), "HH:mm")} hrs
                              </span>
                            </div>
                          </div>

                          {/* Equipos - Centro (alineado correctamente) */}
                          <div className="flex-1">
                            <div className="flex items-center justify-center gap-2 sm:gap-4">
                              {/* Local */}
                              <div className="flex-1 text-right">
                                <span className="text-sm font-bold text-white md:text-base">
                                  {match.equipo_local?.siglas || "TBD"}
                                </span>
                              </div>
                              
                              {/* VS */}
                              <div className="flex-shrink-0">
                                <span className="text-xs font-bold text-zinc-500">VS</span>
                              </div>
                              
                              {/* Visita */}
                              <div className="flex-1 text-left">
                                <span className="text-sm font-bold text-white md:text-base">
                                  {match.equipo_visita?.siglas || "TBD"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Información adicional - Derecha */}
                          <div className="flex flex-col items-start gap-1 md:w-44 md:items-end">
                            {match.torneo && (
                              <span className="text-xs text-zinc-500">
                                🏆 {match.torneo.nombre}
                              </span>
                            )}
                            {match.cancha && (
                              <span className="flex items-center gap-1 text-xs text-zinc-500">
                                <MapPin className="h-3 w-3" />
                                <span className="truncate">{match.cancha}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA final */}
        <div className="mt-16 rounded-2xl border border-[#D90429]/30 bg-gradient-to-r from-[#D90429]/5 to-transparent p-8 text-center backdrop-blur-sm">
          <Users className="mx-auto mb-4 h-12 w-12 text-[#D90429]" />
          <h3 className="text-2xl font-bold text-white">¡Ven a apoyar!</h3>
          <p className="mx-auto mt-2 max-w-2xl text-zinc-400">
            Todos nuestros partidos son abiertos al público. 
            Anímate a vivir la experiencia del voleibol en vivo.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="https://instagram.com/atletico_efis"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
            >
              Síguenos en Instagram
            </a>
            <a
              href="https://wa.me/56931763843"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}