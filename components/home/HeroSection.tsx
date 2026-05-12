"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Volleyball,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col items-center justify-center gap-16 px-6 py-24 lg:flex-row">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex-1"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm uppercase tracking-widest text-red-400 backdrop-blur-xl"
          >
            <Sparkles size={15} />
            Club Deportivo de Voleibol
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="max-w-3xl text-5xl font-black uppercase leading-none tracking-tight text-white md:text-7xl"
          >
            Atlético
            <span className="bg-gradient-to-r from-[#D90429] via-red-500 to-red-700 bg-clip-text text-transparent">
              {" "}
              EFIS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-[#9CA3AF]"
          >
            Formación, competencia y pasión por el voleibol desde Punitaqui.
            Construimos comunidad y desarrollamos nuevas generaciones
            deportivas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button className=" gap-2 rounded-full bg-gradient-to-r from-[#D90429] to-[#8B0000] px-7 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_35px_rgba(217,4,41,0.35)] transition-all duration-300 hover:scale-105">
                <Link href="/calendario" className="group flex items-center">
                                  Ver Partidos

                    <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                </Link>
            </button>

            <button className="rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-xl transition-all duration-300 hover:border-red-500/40 hover:bg-white/10">
              Estadísticas
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex flex-1 items-center justify-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="absolute h-[450px] w-[450px] rounded-full bg-red-700/20 blur-3xl"
          />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            className="relative overflow-hidden rounded-full border border-white/10 bg-[#1A1A1A] p-4 shadow-[0_0_80px_rgba(217,4,41,0.25)]"
          >
            <Image
              src="/layout/logo.jpg"
              alt="Atlético EFIS"
              width={420}
              height={420}
              className="rounded-full object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}