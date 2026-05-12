import {
  Clock3,
  MapPin,
  Phone,
} from "lucide-react";

import { InstagramIcon } from "@/components/layout/SocialIcons";

export default function ContactoPage() {
  return (
    <main className="bg-[#0A0A0A] text-white">
      {/* HERO */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
            Contacto
          </p>

          <h1 className="text-5xl font-black uppercase leading-none md:text-6xl">
            Entrena con Atlético EFIS
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-[#9CA3AF]">
            Sé parte de nuestra comunidad deportiva y desarrolla tu
            pasión por el voleibol junto a un equipo comprometido con
            la formación y la competencia.
          </p>
        </div>
      </section>

      {/* INFO */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2">
          {/* LEFT */}
          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="flex items-start gap-5">
                <MapPin className="mt-1 text-[#D90429]" />

                <div>
                  <h3 className="text-2xl font-black uppercase">
                    Ubicación
                  </h3>

                  <p className="mt-3 text-[#9CA3AF]">
                    Punitaqui, Región de Coquimbo
                  </p>

                  <p className="mt-2 text-[#9CA3AF]">
                    Desde noviembre también en Ovalle.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="flex items-start gap-5">
                <Clock3 className="mt-1 text-[#D90429]" />

                <div>
                  <h3 className="text-2xl font-black uppercase">
                    Horarios
                  </h3>

                  <p className="mt-3 text-[#9CA3AF]">
                    Martes y Jueves
                  </p>

                  <p className="mt-2 text-[#9CA3AF]">
                    Desde las 18:10 hasta las 21:00 hrs
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="flex items-start gap-5">
                <Phone className="mt-1 text-[#D90429]" />

                <div>
                  <h3 className="text-2xl font-black uppercase">
                    WhatsApp
                  </h3>

                  <a
                    href="https://wa.me/56931763843"
                    target="_blank"
                    className="mt-3 inline-block text-lg text-[#9CA3AF] transition hover:text-white"
                  >
                    +56 9 3176 3843
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="flex items-start gap-5">
                <InstagramIcon className="mt-1 w-[24px] text-[#D90429]" />

                <div>
                  <h3 className="text-2xl font-black uppercase">
                    Instagram
                  </h3>

                  <a
                    href="https://www.instagram.com/atletico_efis/"
                    target="_blank"
                    className="mt-3 inline-block text-lg text-[#9CA3AF] transition hover:text-white"
                  >
                    @atletico_efis
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111111] to-[#161616] p-10">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D90429]">
              Categorías disponibles
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase leading-tight">
              Súmate al equipo
            </h2>

            <div className="mt-10 flex flex-wrap gap-4">
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
                  className="rounded-full border border-[#D90429]/40 bg-[#D90429]/10 px-5 py-3 font-bold uppercase tracking-wide"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-14 rounded-3xl border border-white/10 bg-black/30 p-8">
              <h3 className="text-2xl font-black uppercase">
                ¿Primera vez entrenando?
              </h3>

              <p className="mt-4 leading-relaxed text-[#9CA3AF]">
                Puedes consultar por clases de prueba, horarios,
                inscripción y aranceles directamente mediante WhatsApp
                o Instagram.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}