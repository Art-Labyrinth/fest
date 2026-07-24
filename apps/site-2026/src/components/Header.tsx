import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const langs = ["ru", "en", "md"];
  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/participants", label: t("nav.join") },
    { to: "/gallery", label: t("nav.gallery") },
    { to: "/program", label: t("nav.program") },
    { to: "/getting-there", label: t("nav.gettingthere") },
    { to: "/feedback", label: t("nav.feedback") },
    { to: "/contribute", label: t("nav.contribute") },
    { to: "/contacts", label: t("nav.contacts") },
  ];

  return (
    <>
      <header className="inset-x-0 top-0 z-40 flex items-center justify-between px-5 md:px-12 py-4 bg-[#fffbf5]/15 backdrop-blur-sm border-b border-orange-150/60 shadow-sm">
        <a href="/" className="flex items-center gap-3">
          <img
            src="https://files.art-labyrinth.org/logo-black.svg"
            alt="Art-Labyrinth"
            className="h-10"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6 font-deledda uppercase text-brown">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`hover:opacity-60 transition-opacity ${location.pathname === l.to ? "font-bold" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Lang switcher */}
        <div className="hidden sm:flex items-center gap-2 font-deledda text-sm text-brown">
          {langs.map((lng) => (
            <button
              key={lng}
              onClick={() => i18n.changeLanguage(lng)}
              className={`uppercase hover:opacity-60 transition-opacity ${i18n.language === lng ? "font-bold underline" : ""}`}
            >
              {lng}
            </button>
          ))}
        </div>

        {/* Mobile burger */}
        <button className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="block w-6 h-0.5 bg-brown mb-1" />
          <span className="block w-6 h-0.5 bg-brown mb-1" />
          <span className="block w-6 h-0.5 bg-brown" />
        </button>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#fffbf5]/70 backdrop-blur-md">
          <button className="absolute top-5 right-8 text-4xl text-brown" onClick={() => setMenuOpen(false)}>×</button>
          <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-20 font-deledda uppercase text-brown text-2xl">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="text-center hover:opacity-60"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-base">
              {langs.map((lng) => (
                <button
                  key={lng}
                  onClick={() => { i18n.changeLanguage(lng); setMenuOpen(false); }}
                  className={`uppercase hover:opacity-60 ${i18n.language === lng ? "font-bold underline" : ""}`}
                >
                  {lng}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
