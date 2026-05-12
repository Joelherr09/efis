"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Trophy,
  Volleyball,
  BarChart3,
} from "lucide-react";

const stats = [
  {
    icon: Shield,
    value: "200+",
    label: "Partidos",
  },
  {
    icon: Trophy,
    value: "6",
    label: "Torneos Activos",
  },
  {
    icon: Volleyball,
    value: "6",
    label: "Ramas Competitivas",
  },
  {
    icon: BarChart3,
    value: "2024",
    label: "Fundación",
  },
];

export default function StatsSection() {
  return (
    <section className="relative z-10">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="group rounded-3xl border border-white/10 bg-[#1A1A1A]/80 p-8 backdrop-blur-xl transition-all duration-300"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-[#D90429] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(217,4,41,0.35)]">
                <Icon size={28} />
              </div>

              <p className="text-4xl font-black text-white">
                {stat.value}
              </p>

              <p className="mt-2 text-sm uppercase tracking-widest text-[#9CA3AF]">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}