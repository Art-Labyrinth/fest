import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

interface FeedbackItem {
  id: string;
  nameKey: string;
}

const feedbackItems: FeedbackItem[] = [
  { id: "parking", nameKey: "feedback.zones.parking" },
  { id: "welcome", nameKey: "feedback.zones.welcome_centre" },
  { id: "info", nameKey: "feedback.zones.info_center" },
  { id: "kitchen", nameKey: "feedback.zones.kitchen" },
  { id: "volunteers", nameKey: "feedback.zones.volunteers" },
  { id: "culture", nameKey: "feedback.zones.culture" },
  { id: "stage_main", nameKey: "feedback.zones.stage_main" },
  { id: "stage_small", nameKey: "feedback.zones.stage_small" },
  { id: "yoga", nameKey: "feedback.zones.yoga" },
  { id: "master", nameKey: "feedback.zones.master_grad" },
  { id: "sport", nameKey: "feedback.zones.sport" },
  { id: "kids", nameKey: "feedback.zones.kids" },
  { id: "gallery", nameKey: "feedback.zones.gallery" },
  { id: "tea", nameKey: "feedback.zones.tea" },
  { id: "wc", nameKey: "feedback.zones.wc" },
];

const roleKeys = [
  "feedback.roles.guest",
  "feedback.roles.volunteer",
  "feedback.roles.organizer",
  "feedback.roles.coordinator",
  "feedback.roles.musician",
  "feedback.roles.master",
  "feedback.roles.artist",
  "feedback.roles.performer",
  "feedback.roles.partner",
  "feedback.roles.other",
];

const helpOptionKeys = [
  "feedback.help_options.organizer",
  "feedback.help_options.coordinator",
  "feedback.help_options.volunteer",
  "feedback.help_options.master_class",
  "feedback.help_options.musician",
  "feedback.help_options.build",
  "feedback.help_options.art_object",
  "feedback.help_options.financial",
  "feedback.help_options.partner",
  "feedback.help_options.other",
];

type FeedbackResponse = "good" | "bad" | null;
type ViewMode = "page" | "wizard" | "accordion";

interface FeedbackState {
  name: string;
  selectedRole: string;
  otherRole: string;
  q3Answer: string;
  responses: Record<string, FeedbackResponse>;
  q6Answer: string;
  q7Answer: string;
  q8Answer: string;
  selectedHelp: Set<string>;
  contact: string;
  q10Answer: string;
}

const toggleResponse = (
  responses: Record<string, FeedbackResponse>,
  itemId: string,
  type: "good" | "bad"
) => {
  const current = responses[itemId];
  if (current === type) {
    return { ...responses, [itemId]: null };
  }
  return { ...responses, [itemId]: type };
};

interface VariantProps extends FeedbackState {
  onNameChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onOtherRoleChange: (value: string) => void;
  onQ3Change: (value: string) => void;
  onResponseChange: (itemId: string, type: "good" | "bad") => void;
  onQ6Change: (value: string) => void;
  onQ7Change: (value: string) => void;
  onQ8Change: (value: string) => void;
  onHelpToggle: (option: string) => void;
  onContactChange: (value: string) => void;
  onQ10Change: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  t: (key: string) => string;
}

// Page variant component
const PageVariant: React.FC<VariantProps> = (props) => {
  return (
    <form onSubmit={props.onSubmit} className="space-y-6">
      {/* Q0: Personal Data */}
      <div className="rounded-lg bg-white/80 backdrop-blur-sm p-6 shadow-sm border border-gray-100">
        <div className="mb-4">
          <input
            type="text"
            placeholder={props.t("feedback.name_placeholder")}
            value={props.name}
            onChange={(e) => props.onNameChange(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Q1: Your Role */}
      <div className="rounded-lg bg-white/80 backdrop-blur-sm p-6 shadow-sm border border-gray-100">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">{props.t("feedback.q1_title")}</h2>
        <div className="space-y-2">
          {roleKeys.map((roleKey, idx) => (
            <div key={idx}>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={roleKey}
                  checked={props.selectedRole === roleKey}
                  onChange={() => props.onRoleChange(roleKey)}
                  className="h-4 w-4"
                />
                <span className="text-gray-700">{props.t(roleKey)}</span>
              </label>
              {roleKey === "feedback.roles.other" && props.selectedRole === "feedback.roles.other" && (
                <input
                  type="text"
                  placeholder={props.t("feedback.other_role_placeholder")}
                  value={props.otherRole}
                  onChange={(e) => props.onOtherRoleChange(e.target.value)}
                  className="mt-2 ml-7 w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 placeholder-gray-400"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Q3 */}
      <div className="rounded-lg bg-white/80 backdrop-blur-sm p-6 shadow-sm border border-gray-100">
        <h2 className="mb-3 text-lg font-semibold text-gray-800">{props.t("feedback.q3_title")}</h2>
        <textarea
          value={props.q3Answer}
          onChange={(e) => props.onQ3Change(e.target.value)}
          placeholder={props.t("feedback.textarea_placeholder")}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
          rows={4}
        />
      </div>

      {/* Q4-5 */}
      <div className="rounded-lg bg-white/80 backdrop-blur-sm p-6 shadow-sm border border-gray-100">
        <h2 className="mb-3 text-lg font-semibold text-gray-800">{props.t("feedback.q4_q5_title")}</h2>
        <div className="flex items-center justify-between gap-2 mb-6 flex-wrap">
          <span className="text-sm font-medium text-green-600">{props.t("feedback.q4_q5_good")}</span>
          <span className="text-sm font-medium text-red-600">{props.t("feedback.q4_q5_bad")}</span>
        </div>
        <div className="space-y-2">
          {feedbackItems.map((item) => {
            const response = props.responses[item.id];
            return (
              <div
                key={item.id}
                className="grid grid-cols-3 overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
              >
                <button
                  type="button"
                  onClick={() => props.onResponseChange(item.id, "good")}
                  className={`flex items-center justify-start gap-2 px-3 py-3 transition-all sm:px-4 sm:py-3 ${
                    response === "good" ? "bg-green-100" : "hover:bg-green-50"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center border border-green-400 rounded ${
                      response === "good"
                        ? "bg-green-100 text-green-600"
                        : "bg-white text-gray-400"
                    }`}
                  >
                    {response === "good" && "✓"}
                  </div>
                </button>

                <div className="flex items-center justify-center pointer-events-none px-2">
                  <span className="text-center text-xs font-medium text-gray-700 sm:text-sm truncate">
                    {props.t(item.nameKey)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => props.onResponseChange(item.id, "bad")}
                  className={`flex items-center justify-end gap-2 px-3 py-3 transition-all sm:px-4 sm:py-3 ${
                    response === "bad" ? "bg-red-100" : "hover:bg-red-50"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center border border-red-400 rounded ${
                      response === "bad" ? "bg-red-100 text-red-600" : "bg-white text-gray-400"
                    }`}
                  >
                    {response === "bad" && "−"}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Q6 */}
      <div className="rounded-lg bg-white/80 backdrop-blur-sm p-6 shadow-sm border border-gray-100">
        <h2 className="mb-3 text-lg font-semibold text-gray-800">{props.t("feedback.q6_title")}</h2>
        <textarea
          value={props.q6Answer}
          onChange={(e) => props.onQ6Change(e.target.value)}
          placeholder={props.t("feedback.textarea_placeholder")}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
          rows={4}
        />
      </div>

      {/* Q7 */}
      <div className="rounded-lg bg-white/80 backdrop-blur-sm p-6 shadow-sm border border-gray-100">
        <h2 className="mb-3 text-lg font-semibold text-gray-800">{props.t("feedback.q7_title")}</h2>
        <textarea
          value={props.q7Answer}
          onChange={(e) => props.onQ7Change(e.target.value)}
          placeholder={props.t("feedback.textarea_placeholder")}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
          rows={4}
        />
      </div>

      {/* Q8 */}
      <div className="rounded-lg bg-white/80 backdrop-blur-sm p-6 shadow-sm border border-gray-100">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">{props.t("feedback.q8_title")}</h2>
        <p className="mb-3 text-sm text-gray-600">{props.t("feedback.q8_desc")}</p>
        <textarea
          value={props.q8Answer}
          onChange={(e) => props.onQ8Change(e.target.value)}
          placeholder={props.t("feedback.textarea_placeholder")}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
          rows={4}
        />
      </div>

      {/* Q9 */}
      <div className="rounded-lg bg-white/80 backdrop-blur-sm p-6 shadow-sm border border-gray-100">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">{props.t("feedback.q9_title")}</h2>
        <div className="space-y-2 mb-6">
          {helpOptionKeys.map((optionKey) => (
            <label key={optionKey} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={props.selectedHelp.has(optionKey)}
                onChange={() => props.onHelpToggle(optionKey)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-gray-700">{props.t(optionKey)}</span>
            </label>
          ))}
        </div>

        {props.selectedHelp.size > 0 && (
          <div className="border-t pt-6 mt-6">
            <p className="text-sm font-medium text-gray-700 mb-4">{props.t("feedback.q9_contact_prompt")}</p>
            <input
              type="text"
              placeholder={props.t("feedback.q9_contact_placeholder")}
              value={props.contact}
              onChange={(e) => props.onContactChange(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
            />
          </div>
        )}
      </div>

      {/* Q10 */}
      <div className="rounded-lg bg-white/80 backdrop-blur-sm p-6 shadow-sm border border-gray-100">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">{props.t("feedback.q10_title")}</h2>
        <p className="mb-3 text-sm text-gray-600">{props.t("feedback.q10_desc")}</p>
        <textarea
          value={props.q10Answer}
          onChange={(e) => props.onQ10Change(e.target.value)}
          placeholder={props.t("feedback.textarea_placeholder")}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
          rows={3}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition-all hover:bg-purple-700 active:scale-95"
      >
        {props.t("feedback.submit")}
      </button>

      <p className="text-center text-xs text-gray-500">{props.t("feedback.thanks")}</p>
    </form>
  );
};

// Wizard variant component (step-by-step)
const WizardVariant: React.FC<VariantProps & {
  currentStep: number;
  onStepChange: (step: number) => void;
}> = (props) => {
  const questions = [
    {
      id: "name",
      render: () => (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-800">{props.t("feedback.name_title")}</h2>
          <input
            type="text"
            placeholder={props.t("feedback.name_placeholder")}
            value={props.name}
            onChange={(e) => props.onNameChange(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 placeholder-gray-400"
          />
        </div>
      ),
    },
    {
      id: "role",
      render: () => (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-800">{props.t("feedback.q1_title")}</h2>
          <div className="space-y-2">
            {roleKeys.map((roleKey, idx) => (
              <div key={idx}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value={roleKey}
                    checked={props.selectedRole === roleKey}
                    onChange={() => props.onRoleChange(roleKey)}
                    className="h-4 w-4"
                  />
                  <span className="text-gray-700">{props.t(roleKey)}</span>
                </label>
                {roleKey === "feedback.roles.other" && props.selectedRole === "feedback.roles.other" && (
                  <input
                    type="text"
                    placeholder={props.t("feedback.other_role_placeholder")}
                    value={props.otherRole}
                    onChange={(e) => props.onOtherRoleChange(e.target.value)}
                    className="mt-2 ml-7 w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 placeholder-gray-400"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "q3",
      render: () => (
        <div>
          <h2 className="mb-3 text-lg font-semibold text-gray-800">{props.t("feedback.q3_title")}</h2>
          <textarea
            value={props.q3Answer}
            onChange={(e) => props.onQ3Change(e.target.value)}
            placeholder={props.t("feedback.textarea_placeholder")}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
            rows={4}
          />
        </div>
      ),
    },
    {
      id: "zones",
      render: () => (
        <div>
          <h2 className="mb-3 text-lg font-semibold text-gray-800">{props.t("feedback.q4_q5_title")}</h2>
          <div className="flex items-center justify-between gap-2 mb-6 flex-wrap">
            <span className="text-sm font-medium text-green-600">{props.t("feedback.q4_q5_good")}</span>
            <span className="text-sm font-medium text-red-600">{props.t("feedback.q4_q5_bad")}</span>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {feedbackItems.map((item) => {
              const response = props.responses[item.id];
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-3 overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                >
                  <button
                    type="button"
                    onClick={() => props.onResponseChange(item.id, "good")}
                    className={`flex items-center justify-start gap-2 px-3 py-3 transition-all sm:px-4 sm:py-3 ${
                      response === "good" ? "bg-green-100" : "hover:bg-green-50"
                    }`}
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center border border-green-400 rounded ${
                        response === "good"
                          ? "bg-green-100 text-green-600"
                          : "bg-white text-gray-400"
                      }`}
                    >
                      {response === "good" && "✓"}
                    </div>
                  </button>

                  <div className="flex items-center justify-center pointer-events-none px-2">
                    <span className="text-center text-xs font-medium text-gray-700 sm:text-sm truncate">
                      {props.t(item.nameKey)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => props.onResponseChange(item.id, "bad")}
                    className={`flex items-center justify-end gap-2 px-3 py-3 transition-all sm:px-4 sm:py-3 ${
                      response === "bad" ? "bg-red-100" : "hover:bg-red-50"
                    }`}
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center border border-red-400 rounded ${
                        response === "bad" ? "bg-red-100 text-red-600" : "bg-white text-gray-400"
                      }`}
                    >
                      {response === "bad" && "−"}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      id: "q6",
      render: () => (
        <div>
          <h2 className="mb-3 text-lg font-semibold text-gray-800">{props.t("feedback.q6_title")}</h2>
          <textarea
            value={props.q6Answer}
            onChange={(e) => props.onQ6Change(e.target.value)}
            placeholder={props.t("feedback.textarea_placeholder")}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
            rows={4}
          />
        </div>
      ),
    },
    {
      id: "q7",
      render: () => (
        <div>
          <h2 className="mb-3 text-lg font-semibold text-gray-800">{props.t("feedback.q7_title")}</h2>
          <textarea
            value={props.q7Answer}
            onChange={(e) => props.onQ7Change(e.target.value)}
            placeholder={props.t("feedback.textarea_placeholder")}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
            rows={4}
          />
        </div>
      ),
    },
    {
      id: "q8",
      render: () => (
        <div>
          <h2 className="mb-2 text-lg font-semibold text-gray-800">{props.t("feedback.q8_title")}</h2>
          <p className="mb-3 text-sm text-gray-600">{props.t("feedback.q8_desc")}</p>
          <textarea
            value={props.q8Answer}
            onChange={(e) => props.onQ8Change(e.target.value)}
            placeholder={props.t("feedback.textarea_placeholder")}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
            rows={4}
          />
        </div>
      ),
    },
    {
      id: "q9",
      render: () => (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-800">{props.t("feedback.q9_title")}</h2>
          <div className="space-y-2 mb-6">
            {helpOptionKeys.map((optionKey) => (
              <label key={optionKey} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={props.selectedHelp.has(optionKey)}
                  onChange={() => props.onHelpToggle(optionKey)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-gray-700">{props.t(optionKey)}</span>
              </label>
            ))}
          </div>

          {props.selectedHelp.size > 0 && (
            <div className="border-t pt-6 mt-6">
              <p className="text-sm font-medium text-gray-700 mb-4">{props.t("feedback.q9_contact_prompt")}</p>
              <input
                type="text"
                placeholder={props.t("feedback.q9_contact_placeholder")}
                value={props.contact}
                onChange={(e) => props.onContactChange(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
              />
            </div>
          )}
        </div>
      ),
    },
    {
      id: "q10",
      render: () => (
        <div>
          <h2 className="mb-2 text-lg font-semibold text-gray-800">{props.t("feedback.q10_title")}</h2>
          <p className="mb-3 text-sm text-gray-600">{props.t("feedback.q10_desc")}</p>
          <textarea
            value={props.q10Answer}
            onChange={(e) => props.onQ10Change(e.target.value)}
            placeholder={props.t("feedback.textarea_placeholder")}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
            rows={3}
          />
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (props.currentStep < questions.length) {
      props.onStepChange(props.currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (props.currentStep > 1) {
      props.onStepChange(props.currentStep - 1);
    }
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit(e);
  };

  return (
    <form onSubmit={handleFinish} className="space-y-6">
      <div className="rounded-lg bg-white/80 backdrop-blur-sm p-6 shadow-sm border border-gray-100">
        {questions[props.currentStep - 1].render()}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handlePrev}
          disabled={props.currentStep === 1}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          {props.t("feedback.prev")}
        </button>
        {props.currentStep < questions.length ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white transition-all hover:bg-purple-700 active:scale-95"
          >
            {props.t("feedback.next")}
          </button>
        ) : (
          <button
            type="submit"
            className="flex-1 rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white transition-all hover:bg-purple-700 active:scale-95"
          >
            {props.t("feedback.submit")}
          </button>
        )}
      </div>

      <p className="text-center text-xs text-gray-500">{props.t("feedback.thanks")}</p>
    </form>
  );
};

// Accordion variant component
const AccordionVariant: React.FC<VariantProps & {
  expandedAccordion: number | null;
  onAccordionChange: (index: number | null) => void;
}> = (props) => {
  const sections = [
    {
      title: props.t("feedback.name_title"),
      content: (
        <div>
          <input
            type="text"
            placeholder={props.t("feedback.name_placeholder")}
            value={props.name}
            onChange={(e) => props.onNameChange(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 placeholder-gray-400"
          />
        </div>
      ),
    },
    {
      title: props.t("feedback.q1_title"),
      content: (
        <div className="space-y-2">
          {roleKeys.map((roleKey, idx) => (
            <div key={idx}>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={roleKey}
                  checked={props.selectedRole === roleKey}
                  onChange={() => props.onRoleChange(roleKey)}
                  className="h-4 w-4"
                />
                <span className="text-gray-700">{props.t(roleKey)}</span>
              </label>
              {roleKey === "feedback.roles.other" && props.selectedRole === "feedback.roles.other" && (
                <input
                  type="text"
                  placeholder={props.t("feedback.other_role_placeholder")}
                  value={props.otherRole}
                  onChange={(e) => props.onOtherRoleChange(e.target.value)}
                  className="mt-2 ml-7 w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 placeholder-gray-400"
                />
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: props.t("feedback.q3_title"),
      content: (
        <textarea
          value={props.q3Answer}
          onChange={(e) => props.onQ3Change(e.target.value)}
          placeholder={props.t("feedback.textarea_placeholder")}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
          rows={3}
        />
      ),
    },
    {
      title: props.t("feedback.q4_q5_title"),
      content: (
        <div>
          <div className="flex items-center justify-between gap-2 mb-6 flex-wrap">
            <span className="text-sm font-medium text-green-600">{props.t("feedback.q4_q5_good")}</span>
            <span className="text-sm font-medium text-red-600">{props.t("feedback.q4_q5_bad")}</span>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {feedbackItems.map((item) => {
              const response = props.responses[item.id];
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-3 overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                >
                  <button
                    type="button"
                    onClick={() => props.onResponseChange(item.id, "good")}
                    className={`flex items-center justify-start gap-2 px-3 py-3 transition-all sm:px-4 sm:py-3 ${
                      response === "good" ? "bg-green-100" : "hover:bg-green-50"
                    }`}
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center border border-green-400 rounded ${
                        response === "good"
                          ? "bg-green-100 text-green-600"
                          : "bg-white text-gray-400"
                      }`}
                    >
                      {response === "good" && "✓"}
                    </div>
                  </button>

                  <div className="flex items-center justify-center pointer-events-none px-2">
                    <span className="text-center text-xs font-medium text-gray-700 sm:text-sm truncate">
                      {props.t(item.nameKey)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => props.onResponseChange(item.id, "bad")}
                    className={`flex items-center justify-end gap-2 px-3 py-3 transition-all sm:px-4 sm:py-3 ${
                      response === "bad" ? "bg-red-100" : "hover:bg-red-50"
                    }`}
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center border border-red-400 rounded ${
                        response === "bad" ? "bg-red-100 text-red-600" : "bg-white text-gray-400"
                      }`}
                    >
                      {response === "bad" && "−"}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      title: props.t("feedback.q6_title"),
      content: (
        <textarea
          value={props.q6Answer}
          onChange={(e) => props.onQ6Change(e.target.value)}
          placeholder={props.t("feedback.textarea_placeholder")}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
          rows={3}
        />
      ),
    },
    {
      title: props.t("feedback.q7_title"),
      content: (
        <textarea
          value={props.q7Answer}
          onChange={(e) => props.onQ7Change(e.target.value)}
          placeholder={props.t("feedback.textarea_placeholder")}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
          rows={3}
        />
      ),
    },
    {
      title: props.t("feedback.q8_title"),
      content: (
        <div>
          <p className="mb-3 text-sm text-gray-600">{props.t("feedback.q8_desc")}</p>
          <textarea
            value={props.q8Answer}
            onChange={(e) => props.onQ8Change(e.target.value)}
            placeholder={props.t("feedback.textarea_placeholder")}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
            rows={3}
          />
        </div>
      ),
    },
    {
      title: props.t("feedback.q9_title"),
      content: (
        <div>
          <div className="space-y-2 mb-6">
            {helpOptionKeys.map((optionKey) => (
              <label key={optionKey} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={props.selectedHelp.has(optionKey)}
                  onChange={() => props.onHelpToggle(optionKey)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-gray-700">{props.t(optionKey)}</span>
              </label>
            ))}
          </div>

          {props.selectedHelp.size > 0 && (
            <div className="border-t pt-6 mt-6">
              <p className="text-sm font-medium text-gray-700 mb-4">{props.t("feedback.q9_contact_prompt")}</p>
              <input
                type="text"
                placeholder={props.t("feedback.q9_contact_placeholder")}
                value={props.contact}
                onChange={(e) => props.onContactChange(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
              />
            </div>
          )}
        </div>
      ),
    },
    {
      title: props.t("feedback.q10_title"),
      content: (
        <div>
          <p className="mb-3 text-sm text-gray-600">{props.t("feedback.q10_desc")}</p>
          <textarea
            value={props.q10Answer}
            onChange={(e) => props.onQ10Change(e.target.value)}
            placeholder={props.t("feedback.textarea_placeholder")}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
            rows={3}
          />
        </div>
      ),
    },
  ];

  return (
    <form onSubmit={props.onSubmit} className="space-y-4">
      <div className="space-y-2">
        {sections.map((section, idx) => (
          <div key={idx} className="rounded-lg overflow-hidden border border-gray-200 bg-white/80 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => props.onAccordionChange(props.expandedAccordion === idx ? null : idx)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors font-medium text-gray-800"
            >
              <span>{section.title}</span>
              <span
                className={`text-xl transition-transform ${
                  props.expandedAccordion === idx ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {props.expandedAccordion === idx && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition-all hover:bg-purple-700 active:scale-95"
      >
        {props.t("feedback.submit")}
      </button>

      <p className="text-center text-xs text-gray-500">{props.t("feedback.thanks")}</p>
    </form>
  );
};

export default function Feedback() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const viewMode = (searchParams.get("view") as ViewMode) || "page";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: state.name.trim().length > 0 ? state.name : null,
      role: state.selectedRole === "feedback.roles.other" ? state.otherRole : state.selectedRole,
      q3: state.q3Answer,
      responses: state.responses,
      q6: state.q6Answer,
      q7: state.q7Answer,
      q8: state.q8Answer,
      helpOptions: Array.from(state.selectedHelp),
      contact: state.selectedHelp.size > 0 ? state.contact : null,
      q10: state.q10Answer,
      timestamp: new Date().toISOString(),
    };
    console.log("Feedback submitted:", data);
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
            t={t}
          />
        )}
      </div>
    </div>
  );
}
