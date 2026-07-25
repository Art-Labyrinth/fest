import React from "react";
import { useTranslation } from "react-i18next";

interface Edition {
  year: number;
  title: string;
  path: string;
  active: boolean;
}

const EDITIONS: Edition[] = [
  { year: 2026, title: "Pulse of the Earth", path: "/2026/", active: true },
  { year: 2025, title: "Five Hands, One Rhythm", path: "/2025/", active: true },
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="min-h-[calc(100vh-130px)] px-5 md:px-12 py-16 font-deledda text-brown">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <img
            src="https://files.art-labyrinth.org/logo-black.svg"
            alt="Art-Labyrinth"
            className="h-20 mx-auto mb-6"
          />
          <h1 className="text-3xl sm:text-5xl font-bold font-roca mb-4">
            {t("home.title")}
          </h1>
          <p className="text-lg sm:text-xl text-brown/70 max-w-xl mx-auto">
            {t("home.subtitle")}
          </p>
        </div>

        {/* <section className="max-w-2xl mx-auto mb-16 rounded-3xl border border-brown/20 bg-orange-150/85 backdrop-blur-sm shadow-lg px-6 py-8 sm:px-10 text-center font-roca">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wide text-brown/60">
            {t("home.announcement_tag")}
          </p>
          <p className="mt-3 text-2xl sm:text-4xl font-black uppercase">
            {t("home.announcement_dates")}
          </p>
          <p className="text-base sm:text-xl text-[#373f27]">{t("home.festival_line")}</p>
          <img
            src={`${process.env.PUBLIC_URL}/Home/festival-logo.png`}
            alt={String(t("home.announcement_title"))}
            className="mx-auto mt-4 w-40 sm:w-52"
          />

          <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 my-5 text-[#373f27]">
            {(t("home.announcement_hashtags", { returnObjects: true }) as string[]).map((hashtag: string, index: number) => (
              <span key={index} className="text-sm sm:text-base px-1">
                {hashtag}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="https://maps.app.goo.gl/UHU4Y3xLASGE1T6RA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <img src={`${process.env.PUBLIC_URL}/Home/map.svg`} alt="" className="h-8 w-8" />
              <span className="text-base sm:text-lg font-bold">{t("home.announcement_location")}</span>
            </a>
            <img src={`${process.env.PUBLIC_URL}/Home/divider.svg`} alt="" className="hidden sm:block h-10 w-auto" />
            <a href={`tel:${t("home.announcement_phone")}`} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <img src={`${process.env.PUBLIC_URL}/Home/phone.svg`} alt="" className="h-6 w-6" />
              <span className="text-base sm:text-lg font-bold">{t("home.announcement_phone")}</span>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-7">
            <a
              href="/2026/"
              className="inline-block bg-brown text-orange-150 text-sm font-bold py-3 px-8 rounded-lg hover:opacity-80 transition-opacity"
            >
              {t("home.more")}
            </a>
            <a
              href="/2026/participants/"
              className="inline-block bg-brown text-orange-150 text-sm font-bold py-3 px-8 rounded-lg hover:opacity-80 transition-opacity"
            >
              {t("home.participants")}
            </a>
            <a
              href="/2026/contribute/"
              className="inline-block bg-[#F07B17] text-orange-150 text-sm font-bold uppercase py-3 px-8 rounded-lg hover:bg-[#F07B17]/85 transition-colors"
            >
              {t("home.join_festival")}
            </a>
          </div>
        </section> */}

        <h2 className="text-2xl font-bold mb-8 text-center">{t("home.editions_title")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EDITIONS.map((edition) => (
            <div
              key={edition.year}
              className={`rounded-2xl border-2 bg-orange-150/80 backdrop-blur-sm p-8 flex flex-col gap-4 transition-shadow ${
                edition.active
                  ? "border-brown hover:shadow-lg cursor-pointer"
                  : "border-brown/20 opacity-50"
              }`}
            >
              <div className="text-5xl font-bold font-roca">{edition.year}</div>
              {edition.title && (
                <div className="text-sm font-light italic">{edition.title}</div>
              )}
              {edition.active ? (
                <a
                  href={edition.path}
                  className="mt-auto inline-block bg-brown text-orange-150 text-sm font-bold py-2 px-6 rounded-lg hover:opacity-80 transition-opacity text-center"
                >
                  {t("home.visit")}
                </a>
              ) : (
                <span className="mt-auto text-sm text-brown/50">{t("home.upcoming")}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
