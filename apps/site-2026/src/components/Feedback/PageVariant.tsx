import React from "react";
import { VariantProps } from "./types";
import { feedbackItems, roleKeys, helpOptionKeys } from "./constants";

export const PageVariant: React.FC<VariantProps> = (props) => {
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
