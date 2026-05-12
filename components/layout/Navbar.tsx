"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Calendar,
  Info,
  Mail,
  Home,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  InstagramIcon,
} from "./SocialIcons";

const navLinks = [
  {
    label: "Inicio",
    href: "/",
    icon: Home,
  },

  {
    label: "Calendario",
    href: "/calendario",
    icon: Calendar,
  },

  {
    label: "Profesores",
    href: "/profesores",
    icon: GraduationCap,
  },

  {
    label: "Nosotros",
    href: "/quienes-somos",
    icon: Info,
  },

  {
    label: "Contacto",
    href: "/contacto",
    icon: Mail,
  },
];

const socialLinks = [
  {
    icon: InstagramIcon,
    href: "https://instagram.com/atletico_efis",
    label: "Instagram",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <header
        className={`sticky top-0 z-50 hidden transition-all duration-300 lg:block ${
          scrolled
            ? "border-b border-white/10 bg-[#111111]/80 backdrop-blur-xl shadow-lg"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* LOGO */}
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

            <div>
              <h1 className="text-lg font-black uppercase tracking-wider text-white">
                Atlético EFIS
              </h1>

              <p className="text-xs uppercase tracking-[0.25em] text-[#9CA3AF]">
                Volleyball Club
              </p>
            </div>
          </Link>

          {/* NAV */}
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group relative flex items-center gap-1.5 text-sm font-medium uppercase tracking-wider text-[#E5E5E5] transition-colors hover:text-white"
                >
                  <Icon
                    size={16}
                    className="opacity-60 transition group-hover:opacity-100"
                  />

                  {link.label}

                  <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#D90429] transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            })}
          </nav>

          {/* SOCIAL */}
          <div className="flex items-center gap-2">
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
        </div>
      </header>

      {/* MOBILE TOPBAR */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0B0B0B]/80 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex h-16 items-center justify-between px-5">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/10">
              <Image
                src="/layout/logo.jpg"
                alt="Atlético EFIS"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h1 className="text-sm font-black uppercase tracking-wider text-white">
                Atlético EFIS
              </h1>

              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                Volleyball Club
              </p>
            </div>
          </Link>
        </div>
      </header>

      {/* MOBILE FLOATING MENU */}
      <div className="fixed bottom-5 right-5 z-[100] lg:hidden">
        {/* MENU ITEMS */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 10,
              }}
              className="absolute bottom-20 right-0 flex flex-col items-end gap-2"
            >
              {navLinks
                .slice()
                .reverse()
                .map((link, index) => {
                  const Icon = link.icon;

                  return (
                    <motion.div
                      key={link.label}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                        x: 20,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        x: 20,
                      }}
                      transition={{
                        delay:
                          index * 0.04,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() =>
                          setOpen(false)
                        }
                        className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111111]/95 px-4 py-3 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-[#D90429]/30"
                      >
                        <span className="text-xs font-bold uppercase tracking-[0.15em] text-white">
                          {link.label}
                        </span>

                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D90429]/10 text-[#D90429]">
                          <Icon size={16} />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}

              {/* INSTAGRAM */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  x: 20,
                }}
                transition={{
                  delay: 0.2,
                }}
              >
                <Link
                  href="https://instagram.com/atletico_efis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 shadow-2xl"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-white">
                    Instagram
                  </span>

                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
                    <InstagramIcon />
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FIXED BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#111111]/90 text-white shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 hover:border-[#D90429]/30"
          aria-label="Menú"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{
                  opacity: 0,
                  rotate: -90,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  rotate: 90,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{
                  opacity: 0,
                  rotate: 90,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  rotate: -90,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </>
  );
}