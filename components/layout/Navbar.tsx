"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Trophy, Calendar, Users, Home, Info, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "./SocialIcons";

const navLinks = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Calendario", href: "/calendario", icon: Calendar },
  { label: "Nosotros", href: "/quienes-somos", icon: Info },
  { label: "Contacto", href: "/contacto", icon: Mail },
];

const socialLinks = [
  { icon: InstagramIcon, href: "https://instagram.com/atletico_efis", label: "Instagram" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú al redimensionar a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && open) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#111111]/80 backdrop-blur-xl shadow-lg"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-all hover:scale-105"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10 shadow-[0_0_25px_rgba(217,4,41,0.35)] transition-all duration-300 group-hover:shadow-[0_0_35px_rgba(217,4,41,0.5)]">
              <Image
                src="/layout/logo.jpg"
                alt="Atlético EFIS"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-black uppercase tracking-wider text-white">
                Atlético EFIS
              </h1>
              <p className="text-xs uppercase tracking-[0.25em] text-[#9CA3AF]">
                Volleyball Club
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group relative flex items-center gap-1.5 text-sm font-medium uppercase tracking-wider text-[#E5E5E5] transition-colors hover:text-white"
                >
                  <Icon size={16} className="opacity-60 transition group-hover:opacity-100" />
                  {link.label}
                  <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#D90429] transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Social Icons + Mobile Button */}
          <div className="flex items-center gap-4">
            {/* Redes Sociales Desktop */}
            <div className="hidden items-center gap-2 lg:flex">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#9CA3AF] transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/10 hover:text-white"
                    aria-label={social.label}
                  >
                    <Icon />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-xl transition-all hover:bg-white/10 lg:hidden"
              aria-label="Menú"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 flex h-screen w-[85%] max-w-sm flex-col border-l border-white/10 bg-[#111111] shadow-2xl"
            >
              {/* Header del Menú Móvil */}
              <div className="flex items-center justify-between border-b border-white/10 p-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10">
                    <Image
                      src="/layout/logo.jpg"
                      alt="Atlético EFIS"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-black uppercase text-white">
                      EFIS
                    </h2>
                    <p className="text-xs uppercase tracking-widest text-[#9CA3AF]">
                      Volleyball Club
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/10"
                  aria-label="Cerrar menú"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links de Navegación Móvil */}
              <nav className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, idx) => {
                    const Icon = link.icon;
                    return (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium uppercase tracking-wider text-white transition-colors hover:bg-white/5 hover:text-[#D90429]"
                        >
                          <Icon size={20} className="opacity-60" />
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </nav>

              {/* Redes Sociales Móvil */}
              <div className="border-t border-white/10 p-6">
                <p className="mb-4 text-center text-xs uppercase tracking-widest text-[#6E6E6E]">
                  Síguenos
                </p>
                <div className="flex justify-center gap-4">
                  {socialLinks.map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <motion.div
                        key={social.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                      >
                        <Link
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#9CA3AF] transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-white"
                          aria-label={social.label}
                        >
                          <Icon />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}