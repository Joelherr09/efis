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

      <div className="mx-auto flex min-h-[75vh] max-w-7xl flex-col items-center justify-center gap-8 px-6 py-12 lg:min-h-[92vh] lg:flex-row lg:py-24">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex-1 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs uppercase tracking-widest text-red-400 backdrop-blur-xl lg:mb-6 lg:px-4 lg:py-2 lg:text-sm"
          >
            <Sparkles size={14} className="lg:h-4 lg:w-4" />
            Club Deportivo de Voleibol
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="max-w-3xl text-4xl font-black uppercase leading-tight tracking-tight text-white md:text-5xl lg:text-7xl"
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
            className="mt-4 max-w-2xl text-base leading-relaxed text-[#9CA3AF] sm:mt-6 sm:text-lg lg:mt-8"
          >
            Formación, competencia y pasión por el voleibol desde Punitaqui.
            Construimos comunidad y desarrollamos nuevas generaciones
            deportivas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-6 flex flex-wrap justify-center gap-3 lg:mt-10 lg:justify-start lg:gap-4"
          >
            <Link
              href="/calendario"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D90429] to-[#8B0000] px-5 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_35px_rgba(217,4,41,0.35)] transition-all duration-300 hover:scale-105 sm:px-6 sm:py-3.5 sm:text-sm lg:px-7 lg:py-4"
            >
              Ver Partidos
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 lg:h-[18px] lg:w-[18px]"
              />
            </Link>

            <button className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-xl transition-all duration-300 hover:border-red-500/40 hover:bg-white/10 sm:px-6 sm:py-3.5 sm:text-sm lg:px-7 lg:py-4">
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
            className="absolute h-[280px] w-[280px] rounded-full bg-red-700/20 blur-3xl sm:h-[350px] sm:w-[350px] lg:h-[450px] lg:w-[450px]"
          />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            className="relative overflow-hidden rounded-full border border-white/10 bg-[#1A1A1A] p-3 shadow-[0_0_60px_rgba(217,4,41,0.25)] sm:p-4 lg:shadow-[0_0_80px_rgba(217,4,41,0.25)]"
          >
            <Image
              src="/layout/logo.jpg"
              alt="Atlético EFIS"
              width={280}
              height={280}
              className="rounded-full object-cover sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px]"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}