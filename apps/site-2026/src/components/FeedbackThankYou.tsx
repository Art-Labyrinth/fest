import React from "react";
import { useTranslation } from "react-i18next";

export default function FeedbackThankYou() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#F4E4C3] px-4 py-12 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-8 text-4xl font-bold text-purple-600 sm:text-5xl">
          {t("feedback.thank_you_title")}
        </h1>

        <div className="space-y-6 text-gray-700">
          <p className="text-lg leading-relaxed">
            {t("feedback.thank_you_line1")}
          </p>

          <p className="text-lg leading-relaxed">
            {t("feedback.thank_you_line2")}
          </p>

          <p className="text-lg leading-relaxed">
            {t("feedback.thank_you_line3")}
          </p>
        </div>

        <div className="mt-12">
          <a
            href="/"
            className="inline-block rounded-lg bg-purple-600 px-8 py-3 font-semibold text-white transition-all hover:bg-purple-700 active:scale-95"
          >
            {t("feedback.back_to_home")}
          </a>
        </div>
      </div>
    </div>
  );
}
