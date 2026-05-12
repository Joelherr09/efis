"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  Clock3,
  MapPin,
  Phone,
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

export default function ContactoPage() {
  return (
    <main className="overflow-hidden bg-[#0A0A0A] text-white">
      {/* HERO */}
      <div className="relative overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/galeria/img-efis-5.jpg"
            alt="Equipo Atlético EFIS en acción"
            fill
            className="object-cover scale-105"
            priority
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/90" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-transparent to-[#0A0A0A]/90" />
        </div>

        {/* Glow */}
        <motion.div
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-10 z-0 h-80 w-80 rounded-full bg-red-500/10 blur-3xl"
        />

        <motion.div
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.15, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-0 z-0 h-96 w-96 rounded-full bg-[#D90429]/10 blur-3xl"
        />

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center md:py-40">
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
            className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.3em] text-red-400 backdrop-blur-sm"
          >
            🔴⚪ Contacto
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
            className="mt-6 text-5xl font-black uppercase leading-none text-white drop-shadow-lg md:text-7xl"
          >
            Entrena con{" "}
            <span className="text-red-500">
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
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-200 drop-shadow-md md:mt-8 md:text-lg"
          >
            Sé parte de nuestra comunidad deportiva y desarrolla tu
            pasión por el voleibol junto a un equipo comprometido con
            la formación y la competencia.
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
            className="mt-8 flex justify-center"
          >
            <motion.a
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.98,
              }}
              href="https://wa.me/56931763843"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:shadow-green-500/30"
            >
              <Phone className="h-4 w-4" />
              Escríbenos por WhatsApp
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
      </div>

      {/* INFO */}
      <section className="relative z-10 -mt-10 pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2">
          {/* LEFT */}
          <div className="space-y-8">
            {[
              {
                icon: MapPin,
                title: "Ubicación",
                content: (
                  <>
                    <p className="mt-3 text-[#9CA3AF]">
                      Punitaqui, Región de Coquimbo
                    </p>

                    <p className="mt-2 text-[#9CA3AF]">
                      📍 Desde noviembre también en Ovalle.
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
                      ⏰ Desde las 18:10 hasta las 21:00 hrs
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
            ].map((item, index) => {
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
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-red-500/30 hover:bg-white/10"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
                      <Icon className="h-6 w-6 text-red-500" />
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
            className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111111] to-[#161616] p-8 backdrop-blur-sm md:p-10"
          >
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">
              🏐 Categorías disponibles
            </p>

            <h2 className="mt-4 text-3xl font-black uppercase leading-tight md:text-4xl">
              Súmate al equipo
            </h2>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Sub 12",
                "Sub 14",
                "Sub 16",
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
                  className="rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-bold uppercase tracking-wide transition-all hover:bg-red-500/20 md:px-5"
                >
                  {item}
                </motion.div>
              ))}
            </div>

            {/* CTA CARD */}
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
                scale: 1.01,
              }}
              className="mt-10 rounded-3xl border border-white/10 bg-black/30 p-6 md:p-8"
            >
              <h3 className="text-xl font-black uppercase md:text-2xl">
                💪 ¿Primera vez entrenando?
              </h3>

              <p className="mt-3 leading-relaxed text-[#9CA3AF] md:mt-4">
                Puedes consultar por clases de prueba, horarios,
                inscripción y aranceles directamente mediante WhatsApp
                o Instagram.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  href="https://wa.me/56931763843"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-500"
                >
                  WhatsApp
                </motion.a>

                <motion.a
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  href="https://www.instagram.com/atletico_efis/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Instagram
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}