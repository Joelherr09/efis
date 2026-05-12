"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  ChevronRight,
  Shield,
  Flame,
} from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type TeamStanding = {
  teamName: string;
  played: number;
  won: number;
  lost: number;
  setsWon: number;
  setsLost: number;
  points: number;
};

type Tournament = {
  name: string;
  standings: TeamStanding[];
};

type Props = {
  menTournaments: Tournament[];
  womenTournaments: Tournament[];
};

function getPositionStyles(position: number) {
  if (position === 1) {
    return {
      badge:
        "border-yellow-500/30 bg-yellow-500/15 text-yellow-300",
      icon: <Trophy size={14} />,
    };
  }

  if (position === 2) {
    return {
      badge:
        "border-zinc-400/20 bg-zinc-400/10 text-zinc-200",
      icon: <Medal size={14} />,
    };
  }

  if (position === 3) {
    return {
      badge:
        "border-orange-500/30 bg-orange-500/15 text-orange-300",
      icon: <Medal size={14} />,
    };
  }

  return {
    badge:
      "border-white/10 bg-white/[0.03] text-zinc-400",
    icon: null,
  };
}

function TournamentCard({
  tournament,
}: {
  tournament: Tournament;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-zinc-900 to-black shadow-2xl shadow-black/40"
    >
      {/* HEADER */}
      <div className="relative overflow-hidden border-b border-white/5 px-6 py-7 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,4,41,0.18),transparent_40%)]" />

        <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D90429]/20 bg-[#D90429]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF4D6D]">
              <Shield size={12} />
              Competencia Oficial
            </div>

            <h3 className="max-w-3xl text-2xl font-black uppercase leading-tight text-white md:text-3xl">
              {tournament.name}
            </h3>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-[#D90429]/20 bg-[#D90429]/10 text-[#FF4D6D] backdrop-blur-xl">
            <Trophy size={30} />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <div className="min-w-[760px]">
          {/* HEAD */}
          <div className="grid grid-cols-[70px_1.8fr_90px_90px_90px_90px_90px] border-b border-white/5 bg-white/[0.03] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500">
            <div>Pos</div>
            <div>Equipo</div>
            <div>PTS</div>
            <div>PJ</div>
            <div>PG</div>
            <div>PP</div>
            <div>SETS</div>
          </div>

          {/* ROWS */}
          {tournament.standings.map((team, index) => {
            const isEfis = team.teamName
              .toLowerCase()
              .includes("efis");

            const positionStyles =
              getPositionStyles(index + 1);

            return (
              <motion.div
                key={team.teamName}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.03,
                }}
                className={`grid grid-cols-[70px_1.8fr_90px_90px_90px_90px_90px] items-center border-b border-white/5 px-6 py-5 transition-all duration-300 hover:bg-white/[0.03] ${
                  isEfis
                    ? "bg-gradient-to-r from-[#D90429]/15 to-transparent"
                    : ""
                }`}
              >
                {/* POS */}
                <div>
                  <div
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${positionStyles.badge}`}
                  >
                    #{index + 1}

                    {positionStyles.icon}
                  </div>
                </div>

                {/* TEAM */}
                <div className="flex items-center gap-3">

                  <div>
                    <p
                      className={`font-bold ${
                        isEfis
                          ? "text-white"
                          : "text-zinc-200"
                      }`}
                    >
                      {team.teamName}
                    </p>
                  </div>
                </div>

                {/* PTS */}
                <div>
                  <span className="text-2xl font-black text-[#FF4D6D]">
                    {team.points}
                  </span>
                </div>

                {/* PJ */}
                <div className="text-sm font-bold text-white">
                  {team.played}
                </div>

                {/* PG */}
                <div className="text-sm font-bold text-emerald-400">
                  {team.won}
                </div>

                {/* PP */}
                <div className="text-sm font-bold text-red-400">
                  {team.lost}
                </div>

                {/* SETS */}
                <div className="text-sm font-bold text-zinc-300">
                  {team.setsWon}/{team.setsLost}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function TournamentsSection({
  menTournaments,
  womenTournaments,
}: Props) {
  return (
    <section className="relative overflow-hidden border-t border-white/5 py-24">
      {/* BG EFFECTS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,4,41,0.08),transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mb-20 max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D90429]/20 bg-[#D90429]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#FF4D6D]">
            <Trophy size={14} />
            Participación Competitiva
          </div>

          <h2 className="text-4xl font-black uppercase leading-tight text-white md:text-6xl">
            Atlético EFIS en Liga Provincial Panadería La
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400">
            Seguimiento en tiempo real de torneos,
            posiciones y rendimiento competitivo
            utilizando estadísticas integradas desde
            la API oficial de 4Volei.
          </p>
        </div>

        {/* MEN */}
        <div className="mb-28">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-[#D90429]" />

            <h3 className="text-3xl font-black uppercase text-white">
              Varones
            </h3>
          </div>

        <Tabs defaultValue={menTournaments[0]?.name}>
            {/* SCROLLABLE TABS */}
            <div className="relative mb-10">
            {/* Fade Left */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-black to-transparent" />

            {/* Fade Right */}
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-black to-transparent" />

            <div className="overflow-x-auto scrollbar-none">
                <TabsList className="flex h-auto w-max min-w-full gap-3 bg-transparent p-0">
                {menTournaments.map((tournament) => (
                    <TabsTrigger
                    key={tournament.name}
                    value={tournament.name}
                    className="
                        shrink-0
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-4
                        py-3
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-zinc-400
                        transition-all
                        duration-300

                        hover:border-[#D90429]/30
                        hover:bg-[#D90429]/10
                        hover:text-white

                        data-[state=active]:border-[#D90429]/30
                        data-[state=active]:bg-[#D90429]/15
                        data-[state=active]:text-white

                        md:px-5
                        md:text-xs
                    "
                    >
                    {tournament.name}
                    </TabsTrigger>
                ))}
                </TabsList>
            </div>
            </div>

            {menTournaments.map((tournament) => (
            <TabsContent
                key={tournament.name}
                value={tournament.name}
                className="mt-0"
            >
                <TournamentCard tournament={tournament} />
            </TabsContent>
            ))}
        </Tabs>
        </div>

        {/* WOMEN */}
        <div>
        <div className="mb-8 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-pink-500" />

            <h3 className="text-3xl font-black uppercase text-white">
            Damas
            </h3>
        </div>

        <Tabs defaultValue={womenTournaments[0]?.name}>
            {/* SCROLLABLE TABS */}
            <div className="relative mb-10">
            {/* Fade Left */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-black to-transparent" />

            {/* Fade Right */}
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-black to-transparent" />

            <div className="overflow-x-auto scrollbar-none">
                <TabsList className="flex h-auto w-max min-w-full gap-3 bg-transparent p-0">
                {womenTournaments.map((tournament) => (
                    <TabsTrigger
                    key={tournament.name}
                    value={tournament.name}
                    className="
                        shrink-0
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-4
                        py-3
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-zinc-400
                        transition-all
                        duration-300

                        hover:border-pink-500/30
                        hover:bg-pink-500/10
                        hover:text-white

                        data-[state=active]:border-pink-500/30
                        data-[state=active]:bg-pink-500/15
                        data-[state=active]:text-white

                        md:px-5
                        md:text-xs
                    "
                    >
                    {tournament.name}
                    </TabsTrigger>
                ))}
                </TabsList>
            </div>
            </div>

            {womenTournaments.map((tournament) => (
            <TabsContent
                key={tournament.name}
                value={tournament.name}
                className="mt-0"
            >
                <TournamentCard tournament={tournament} />
            </TabsContent>
            ))}
        </Tabs>
        </div>
      </div>
    </section>
  );
}