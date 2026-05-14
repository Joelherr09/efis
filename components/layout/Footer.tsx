// components/Footer.tsx
import Link from "next/link";
import { Trophy, Volleyball, Heart, Code } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-[#0A0A0A] to-black">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Grid Principal */}
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Marca y Descripción */}
          <div className="lg:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-500/20 bg-gradient-to-br from-[#D90429] to-[#8B0000] shadow-[0_0_30px_rgba(217,4,41,0.35)]">
                <Volleyball size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-wide text-white">
                  Atlético EFIS
                </h2>
                <p className="text-sm uppercase tracking-[0.25em] text-[#9CA3AF]">
                  Punitaqui • Ovalle • Chile
                </p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-[#9CA3AF]">
              Club deportivo enfocado en el desarrollo del voleibol formativo y
              competitivo. Comunidad, disciplina y pasión por el deporte.
            </p>
          </div>

          {/* Navegación Rápida */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-white">
              Navegación
            </h3>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                Inicio
              </Link>
              <Link href="/quienes-somos" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                Quiénes somos
              </Link>
              <Link href="/contacto" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                Contáctanos
              </Link>
            </div>
          </div>

          {/* Comunidad y Tecnología */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-white">
              Comunidad
            </h3>
            <div className="flex items-center gap-4">
              <Link
                href="https://instagram.com/atletico_efis"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#9CA3AF] transition-all duration-300 hover:border-red-500/40 hover:text-white"
              >
                <InstagramIcon className="h-5 w-5" />
              </Link>
            </div>

            {/* Créditos Estratégicos: UNO AL LADO DEL OTRO */}
            <div className="mt-6 space-y-2 text-xs text-[#6E6E6E]">
              <div className="flex items-center gap-1.5">
                <Heart size={12} className="text-red-400" />
                <span>Datos deportivos gestionados por</span>
                <Link
                  href="https://4volei.vercel.app"
                  target="_blank"
                  className="font-medium text-orange-400 transition hover:text-orange-300"
                >
                  4Volei
                </Link>
              </div>
              <div className="flex items-center gap-1.5">
                <Code size={12} className="text-zinc-500" />
                <span>Desarrollo y tecnología por</span>
                <Link
                  href="https://www.joelherr.site/"
                  target="_blank"
                  className="font-medium text-zinc-300 transition hover:text-white"
                >
                  Joel Herrera
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Final */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center md:flex-row">
          <p className="text-xs uppercase tracking-widest text-[#6E6E6E]">
            © {new Date().getFullYear()} Atlético EFIS. Todos los derechos reservados.
          </p>
          <p className="text-xs uppercase tracking-widest text-[#6E6E6E]">
            Voleibol con pasión, datos con precisión.
          </p>
        </div>
      </div>
    </footer>
  );
}