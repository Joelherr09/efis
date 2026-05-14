"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  Clock3,
  MapPin,
  Phone,
  Mail,
  Trophy,
  Users,
  HeartHandshake,
  ChevronRight,
} from "lucide-react";

import { InstagramIcon } from "@/components/layout/SocialIcons";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const contactCards = [
  {
    icon: MapPin,
    title: "Ubicación",
    content: (
      <>
        <p className="mt-3 text-[#9CA3AF]">
          Punitaqui, Región de Coquimbo
        </p>

        <p className="mt-2 text-[#9CA3AF]">
          📍 Presencia deportiva en Punitaqui y Ovalle.
        </p>
      </>
    ),
  },
  {
    icon: Clock3,
    title: "Horarios",
    content: (
      <>
        <p className="mt-3 text-[#9CA3AF]">
          Martes y Jueves
        </p>

        <p className="mt-2 text-[#9CA3AF]">
          ⏰ 18:10 a 21:00 hrs
        </p>
      </>
    ),
  },
  {
    icon: Phone,
    title: "WhatsApp",
    content: (
      <a
        href="https://wa.me/56931763843"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-lg text-[#9CA3AF] transition hover:text-white"
      >
        📱 +56 9 3176 3843
      </a>
    ),
  },
  {
    icon: Mail,
    title: "Correo",
    content: (
      <a
        href="mailto:AtléticoefisVoley@gmail.com"
        className="mt-3 inline-block break-all text-lg text-[#9CA3AF] transition hover:text-white"
      >
        ✉️ AtleticoefisVoley@gmail.com
      </a>
    ),
  },
  {
    icon: InstagramIcon,
    title: "Instagram",
    content: (
      <a
        href="https://www.instagram.com/atletico_efis/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-lg text-[#9CA3AF] transition hover:text-white"
      >
        📸 @atletico_efis
      </a>
    ),
  },
];

export default function ContactoPage() {
  return (
    <main className="overflow-hidden bg-[#0A0A0A] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/galeria/img-efis-5.jpg"
            alt="Equipo Atlético EFIS en acción"
            fill
            className="object-cover scale-105"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-black/40 to-[#0A0A0A]/90" />
        </div>

        {/* GLOW */}
        <motion.div
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.08, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-10 z-0 h-80 w-80 rounded-full bg-[#D90429]/15 blur-3xl"
        />

        <motion.div
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.15, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-0 z-0 h-96 w-96 rounded-full bg-red-500/10 blur-3xl"
        />

        {/* CONTENT */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 text-center md:py-40">
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#D90429]/30 bg-[#D90429]/10 px-5 py-2 text-sm font-bold uppercase tracking-[0.3em] text-[#D90429] backdrop-blur-xl"
          >
            🔴⚫ Contacto Oficial
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="mt-8 text-5xl font-black uppercase leading-none md:text-7xl"
          >
            Entrena con
            <span className="mt-2 block text-[#D90429]">
              Atlético EFIS
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-zinc-300"
          >
            Súmate a una comunidad deportiva enfocada en
            la formación, la disciplina y el crecimiento
            competitivo del voleibol regional.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.98,
              }}
              href="https://wa.me/56931763843"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-green-700 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-xl transition-all hover:shadow-green-500/30"
            >
              <Phone className="h-4 w-4" />
              WhatsApp
            </motion.a>

            <motion.a
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.98,
              }}
              href="https://www.instagram.com/atletico_efis/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-xl"
            >
              <InstagramIcon />
              Instagram
            </motion.a>
          </motion.div>
        </div>

        {/* WAVE */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="h-auto w-full"
          >
            <path
              fill="#0A0A0A"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* INFO */}
      <section className="relative z-10 -mt-8 pb-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* LEFT */}
          <div className="space-y-6">
            {contactCards.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="group rounded-[32px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:border-[#D90429]/30 hover:bg-white/[0.05]"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#D90429]/20 bg-[#D90429]/10">
                      <Icon className="h-6 w-6 text-[#D90429]" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-black uppercase">
                        {item.title}
                      </h3>

                      {item.content}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#111111] via-[#151515] to-[#0E0E0E] p-8 md:p-10"
          >
            {/* Glow */}
            <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-[#D90429]/10 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D90429]/20 bg-[#D90429]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D90429]">
                🏐 Categorías disponibles
              </div>

              <h2 className="mt-6 text-4xl font-black uppercase leading-tight">
                Súmate
                <span className="block text-[#D90429]">
                  al equipo
                </span>
              </h2>

              <p className="mt-6 leading-relaxed text-zinc-400">
                Atlético EFIS trabaja en el desarrollo
                formativo y competitivo de jugadores y
                jugadoras desde categorías infantiles
                hasta todo competidor.
              </p>

              {/* Chips */}
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Sub 12",
                  "Sub 14",
                  "Sub 16",
                  "Sub 17",
                  "Todo Competidor",
                  "Damas",
                  "Varones",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="rounded-full border border-[#D90429]/30 bg-[#D90429]/10 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>

              {/* CARD */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                }}
                whileHover={{
                  y: -4,
                }}
                className="mt-10 rounded-[28px] border border-white/10 bg-black/30 p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D90429]/10">
                    <HeartHandshake className="h-6 w-6 text-[#D90429]" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-black uppercase">
                      ¿Primera vez entrenando?
                    </h3>

                    <p className="mt-4 leading-relaxed text-[#9CA3AF]">
                      Puedes consultar por clases de
                      prueba, inscripciones, horarios y
                      categorías disponibles mediante
                      WhatsApp o Instagram.
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <motion.a
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    href="https://wa.me/56931763843"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition-all hover:border-green-500/30 hover:bg-green-500/10"
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-green-500" />

                      <span className="font-semibold">
                        Contactar por WhatsApp
                      </span>
                    </div>

                    <ChevronRight className="h-5 w-5 text-zinc-500" />
                  </motion.a>

                  <motion.a
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    href="https://www.instagram.com/atletico_efis/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition-all hover:border-pink-500/30 hover:bg-pink-500/10"
                  >
                    <div className="flex items-center gap-3">
                      <InstagramIcon />

                      <span className="font-semibold">
                        Ver Instagram
                      </span>
                    </div>

                    <ChevronRight className="h-5 w-5 text-zinc-500" />
                  </motion.a>
                </div>
              </motion.div>

              {/* EXTRA */}
              <div className="mt-8 flex items-start gap-4 rounded-2xl border border-[#D90429]/20 bg-[#D90429]/5 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D90429]/10">
                  <Trophy className="h-5 w-5 text-[#D90429]" />
                </div>

                <div>
                  <p className="font-bold uppercase tracking-wide text-white">
                    Formación y competencia
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    Participación en competencias
                    provinciales y regionales con enfoque
                    formativo y competitivo.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5">
                  <Users className="h-5 w-5 text-white" />
                </div>

                <div>
                  <p className="font-bold uppercase tracking-wide text-white">
                    Comunidad deportiva
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    Más de 50 deportistas activos
                    formando parte del crecimiento del
                    voleibol regional.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}