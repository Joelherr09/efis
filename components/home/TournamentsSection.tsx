"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  ChevronRight,
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

function getPositionColor(position: number) {
  if (position === 1) {
    return "text-yellow-400";
  }

  if (position === 2) {
    return "text-gray-300";
  }

  if (position === 3) {
    return "text-orange-400";
  }

  return "text-white";
}

function TournamentCard({
  tournament,
}: {
  tournament: Tournament;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-white/10 bg-[#1A1A1A]/70 p-6 backdrop-blur-xl"
    >
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#D90429]">
            Torneo
          </p>

          <h3 className="text-2xl font-black uppercase text-white">
            {tournament.name}
          </h3>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-[#D90429]">
          <Trophy size={28} />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-white/5">
        <div className="grid grid-cols-6 border-b border-white/5 bg-white/5 px-4 py-4 text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">
          <div>#</div>
          <div className="col-span-2">Equipo</div>
          <div>PG</div>
          <div>PP</div>
          <div>PTS</div>
        </div>

        {tournament.standings.map((team, index) => (
          <motion.div
            key={team.teamName}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.05,
            }}
            className={`grid grid-cols-6 items-center border-b border-white/5 px-4 py-4 transition-all duration-300 hover:bg-white/5 ${
              team.teamName.toLowerCase().includes("efis")
                ? "bg-red-500/10"
                : ""
            }`}
          >
            <div
              className={`flex items-center gap-2 font-black ${getPositionColor(
                index + 1
              )}`}
            >
              {index + 1}

              {index < 3 && (
                <Medal size={15} />
              )}
            </div>

            <div className="col-span-2 flex items-center gap-2">
              <ChevronRight
                size={16}
                className={`${
                  team.teamName.toLowerCase().includes("efis")
                    ? "text-[#D90429]"
                    : "text-[#6E6E6E]"
                }`}
              />

              <span
                className={`font-semibold ${
                  team.teamName.toLowerCase().includes("efis")
                    ? "text-white"
                    : "text-[#CFCFCF]"
                }`}
              >
                {team.teamName}
              </span>
            </div>

            <div className="font-bold text-white">
              {team.won}
            </div>

            <div className="font-bold text-white">
              {team.lost}
            </div>

            <div className="font-black text-[#D90429]">
              {team.points}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function TournamentsSection({
  menTournaments,
  womenTournaments,
}: Props) {
  return (
    <section className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mb-16">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
            Competencias
          </p>

          <h2 className="max-w-3xl text-4xl font-black uppercase leading-tight text-white md:text-5xl">
            Participación de Atlético EFIS en la Liga Provincial Panadería La Estrella
          </h2>
        </div>

        {/* MEN */}
        <div className="mb-24">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-[#D90429]" />

            <h3 className="text-2xl font-black uppercase text-white">
              Varones
            </h3>
          </div>

          <Tabs defaultValue={menTournaments[0]?.name}>
            <TabsList className="mb-8 flex h-auto flex-wrap gap-3 bg-transparent">
              {menTournaments.map((tournament) => (
                <TabsTrigger
                  key={tournament.name}
                  value={tournament.name}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#9CA3AF] data-[state=active]:border-red-500/30 data-[state=active]:bg-red-500/10 data-[state=active]:text-white"
                >
                  {tournament.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {menTournaments.map((tournament) => (
              <TabsContent
                key={tournament.name}
                value={tournament.name}
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

            <h3 className="text-2xl font-black uppercase text-white">
              Damas
            </h3>
          </div>

          <Tabs defaultValue={womenTournaments[0]?.name}>
            <TabsList className="mb-8 flex h-auto flex-wrap gap-3 bg-transparent">
              {womenTournaments.map((tournament) => (
                <TabsTrigger
                  key={tournament.name}
                  value={tournament.name}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#9CA3AF] data-[state=active]:border-red-500/30 data-[state=active]:bg-red-500/10 data-[state=active]:text-white"
                >
                  {tournament.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {womenTournaments.map((tournament) => (
              <TabsContent
                key={tournament.name}
                value={tournament.name}
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