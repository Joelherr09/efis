import Image from "next/image";
import {
  Clock3,
  MapPin,
  Phone,
} from "lucide-react";

import { InstagramIcon } from "@/components/layout/SocialIcons";

export default function ContactoPage() {
  return (
    <main className="bg-[#0A0A0A] text-white">
      {/* HERO con imagen de fondo */}

      <div className="relative overflow-hidden">
        {/* Imagen de fondo con overlay - Sube la imagen */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/galeria/img-efis-5.jpg"
            alt="Equipo Atlético EFIS en acción"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay oscuro para mejorar legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />

          {/* Overlay lateral para dar profundidad */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-transparent to-[#0A0A0A]/90" />
        </div>

        {/* Contenido del Hero */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center md:py-40">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.3em] text-red-400 backdrop-blur-sm">
            🔴⚪ Contacto
          </div>

          <h1 className="mt-6 text-5xl font-black uppercase leading-none text-white drop-shadow-lg md:text-7xl">
            Entrena con <span className="text-red-500">Atlético EFIS</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-200 drop-shadow-md md:mt-8 md:text-lg">
            Sé parte de nuestra comunidad deportiva y desarrolla tu
            pasión por el voleibol junto a un equipo comprometido con
            la formación y la competencia.
          </p>

          {/* Botón flotante para contacto rápido */}
          <div className="mt-8 flex justify-center">
            <a
              href="https://wa.me/56931763843"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:scale-105 hover:shadow-green-500/30"
            >
              <Phone className="h-4 w-4" />
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>

        {/* Decoración de olas/curvas al final del hero */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-auto"
          >
            <path
              fill="#0A0A0A"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            />
          </svg>
        </div>
      </div>

      {/* INFO SECTION */}
      <section className="relative z-10 -mt-10 pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2">
          {/* LEFT - Cards de información */}
          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-red-500/30 hover:bg-white/10">
              <div className="flex items-start gap-5">
                <MapPin className="mt-1 h-6 w-6 text-red-500" />

                <div>
                  <h3 className="text-2xl font-black uppercase">
                    Ubicación
                  </h3>

                  <p className="mt-3 text-[#9CA3AF]">
                    Punitaqui, Región de Coquimbo
                  </p>

                  <p className="mt-2 text-[#9CA3AF]">
                    📍 Desde noviembre también en Ovalle.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-red-500/30 hover:bg-white/10">
              <div className="flex items-start gap-5">
                <Clock3 className="mt-1 h-6 w-6 text-red-500" />

                <div>
                  <h3 className="text-2xl font-black uppercase">
                    Horarios
                  </h3>

                  <p className="mt-3 text-[#9CA3AF]">
                    Martes y Jueves
                  </p>

                  <p className="mt-2 text-[#9CA3AF]">
                    ⏰ Desde las 18:10 hasta las 21:00 hrs
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-red-500/30 hover:bg-white/10">
              <div className="flex items-start gap-5">
                <Phone className="mt-1 h-6 w-6 text-red-500" />

                <div>
                  <h3 className="text-2xl font-black uppercase">
                    WhatsApp
                  </h3>

                  <a
                    href="https://wa.me/56931763843"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-lg text-[#9CA3AF] transition hover:text-white"
                  >
                    📱 +56 9 3176 3843
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-red-500/30 hover:bg-white/10">
              <div className="flex items-start gap-5">
                <InstagramIcon className="mt-1 h-6 w-6 text-red-500" />

                <div>
                  <h3 className="text-2xl font-black uppercase">
                    Instagram
                  </h3>

                  <a
                    href="https://www.instagram.com/atletico_efis/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-lg text-[#9CA3AF] transition hover:text-white"
                  >
                    📸 @atletico_efis
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - Categorías y llamado a la acción */}
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111111] to-[#161616] p-8 backdrop-blur-sm md:p-10">
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
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-bold uppercase tracking-wide transition-all hover:bg-red-500/20 md:px-5"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-black/30 p-6 md:p-8">
              <h3 className="text-xl font-black uppercase md:text-2xl">
                💪 ¿Primera vez entrenando?
              </h3>

              <p className="mt-3 leading-relaxed text-[#9CA3AF] md:mt-4">
                Puedes consultar por clases de prueba, horarios,
                inscripción y aranceles directamente mediante WhatsApp
                o Instagram.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://wa.me/56931763843"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-500"
                >
                  WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/atletico_efis/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}