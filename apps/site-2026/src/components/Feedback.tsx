import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FeedbackState, ViewMode, FeedbackSubmitData } from "./Feedback/types";
import { PageVariant } from "./Feedback/PageVariant";
import { WizardVariant } from "./Feedback/WizardVariant";
import { AccordionVariant } from "./Feedback/AccordionVariant";
import { toggleResponse } from "./Feedback/utils";
import { submitFeedback } from "./Feedback/api";
import { submitFeedbackToBackend } from "../api/feedbackApi";
import { getDeviceStats } from "../utils/deviceStats";
import { getUTMParams } from "../utils/utm";

export default function Feedback() {
  const { t } = useTranslation();
  const i18n = useTranslation().i18n;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const viewMode = (searchParams.get("view") as ViewMode) || "wizard";
  const [formOpenTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [state, setState] = useState<FeedbackState>({
    name: "",
    selectedRole: "",
    otherRole: "",
    q3Answer: "",
    responses: {},
    q6Answer: "",
    q7Answer: "",
    q8Answer: "",
    selectedHelp: new Set(),
    contact: "",
    q10Answer: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data: FeedbackSubmitData = {
        q1: state.name.trim().length > 0 ? state.name : null,
        q2: state.selectedRole === "feedback.roles.other" ? state.otherRole : state.selectedRole,
        q3: state.q3Answer,
        q4: state.responses,
        q5: state.q6Answer,
        q6: state.q7Answer,
        q7: state.q8Answer,
        q8: {
          contact: state.selectedHelp.size > 0 ? state.contact : null,
          options: Array.from(state.selectedHelp),
        },
        q9: state.q10Answer,
        timestamp: new Date().toISOString(),
      };

      submitFeedback(data);

      // Collect additional statistics and send to backend
      const deviceStats = getDeviceStats();
      const utmParams = getUTMParams();
      const fillTimeMs = Date.now() - formOpenTime;
      const currentLang = i18n.language || "en";

      await submitFeedbackToBackend({
        ...data,
        lang: currentLang,
        timezone: deviceStats.timezone,
        utm: utmParams,
        deviceType: deviceStats.deviceType,
        screen: deviceStats.screen,
        viewport: deviceStats.viewport,
        devicePixelRatio: deviceStats.devicePixelRatio,
        languages: deviceStats.languages,
        networkType: deviceStats.networkType || "unknown",
        fillTimeMs,
      });

      // Redirect to thank you page on success
      navigate("/feedback/thank-you");
    } catch (err) {
      console.error("Failed to submit feedback:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4E4C3] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-purple-600 sm:text-4xl">
            {t("feedback.title")}
          </h1>
          <p className="text-gray-700">{t("feedback.subtitle")}</p>
        </div>

        {viewMode === "wizard" && (
          <>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{t("feedback.progress")}</span>
                <span className="text-sm font-semibold text-purple-600">{currentStep}/9</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300"
                  style={{ width: `${(currentStep / 9) * 100}%` }}
                />
              </div>
            </div>
            <WizardVariant
              {...state}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              onNameChange={(value) => setState({ ...state, name: value })}
              onRoleChange={(value) => setState({ ...state, selectedRole: value })}
              onOtherRoleChange={(value) => setState({ ...state, otherRole: value })}
              onQ3Change={(value) => setState({ ...state, q3Answer: value })}
              onResponseChange={(itemId, type) =>
                setState({ ...state, responses: toggleResponse(state.responses, itemId, type) })
              }
              onQ6Change={(value) => setState({ ...state, q6Answer: value })}
              onQ7Change={(value) => setState({ ...state, q7Answer: value })}
              onQ8Change={(value) => setState({ ...state, q8Answer: value })}
              onHelpToggle={(option) => {
                const newHelp = new Set(state.selectedHelp);
                if (newHelp.has(option)) {
                  newHelp.delete(option);
                } else {
                  newHelp.add(option);
                }
                setState({ ...state, selectedHelp: newHelp });
              }}
              onContactChange={(value) => setState({ ...state, contact: value })}
              onQ10Change={(value) => setState({ ...state, q10Answer: value })}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              t={t}
            />
          </>
        )}

        {viewMode === "page" && (
          <PageVariant
            {...state}
            onNameChange={(value) => setState({ ...state, name: value })}
            onRoleChange={(value) => setState({ ...state, selectedRole: value })}
            onOtherRoleChange={(value) => setState({ ...state, otherRole: value })}
            onQ3Change={(value) => setState({ ...state, q3Answer: value })}
            onResponseChange={(itemId, type) =>
              setState({ ...state, responses: toggleResponse(state.responses, itemId, type) })
            }
            onQ6Change={(value) => setState({ ...state, q6Answer: value })}
            onQ7Change={(value) => setState({ ...state, q7Answer: value })}
            onQ8Change={(value) => setState({ ...state, q8Answer: value })}
            onHelpToggle={(option) => {
              const newHelp = new Set(state.selectedHelp);
              if (newHelp.has(option)) {
                newHelp.delete(option);
              } else {
                newHelp.add(option);
              }
              setState({ ...state, selectedHelp: newHelp });
            }}
            onContactChange={(value) => setState({ ...state, contact: value })}
            onQ10Change={(value) => setState({ ...state, q10Answer: value })}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            t={t}
          />
        )}

        {viewMode === "accordion" && (
          <AccordionVariant
            {...state}
            expandedAccordion={expandedAccordion}
            onAccordionChange={setExpandedAccordion}
            onNameChange={(value) => setState({ ...state, name: value })}
            onRoleChange={(value) => setState({ ...state, selectedRole: value })}
            onOtherRoleChange={(value) => setState({ ...state, otherRole: value })}
            onQ3Change={(value) => setState({ ...state, q3Answer: value })}
            onResponseChange={(itemId, type) =>
              setState({ ...state, responses: toggleResponse(state.responses, itemId, type) })
            }
            onQ6Change={(value) => setState({ ...state, q6Answer: value })}
            onQ7Change={(value) => setState({ ...state, q7Answer: value })}
            onQ8Change={(value) => setState({ ...state, q8Answer: value })}
            onHelpToggle={(option) => {
              const newHelp = new Set(state.selectedHelp);
              if (newHelp.has(option)) {
                newHelp.delete(option);
              } else {
                newHelp.add(option);
              }
              setState({ ...state, selectedHelp: newHelp });
            }}
            onContactChange={(value) => setState({ ...state, contact: value })}
            onQ10Change={(value) => setState({ ...state, q10Answer: value })}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            t={t}
          />
        )}
      </div>
    </div>
  );
}
