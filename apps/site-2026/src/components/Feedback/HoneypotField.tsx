import React from "react";

interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Honeypot (trap field) to filter out bots.
 *
 * The field is not visible to humans, but is present in the DOM and appears to the parser
 * like a regular "name" text field. Bots filling everything out
 * will leave the value in it -this is a sign of automatic sending.
 *
 * Important: DO NOT use type="hidden" /display:none /visibility:hidden -
 * many bots can skip such fields. We take it off the screen.
 * Styles are set inline so that the field does not break due to CSS changes.
 */
export const HoneypotField: React.FC<HoneypotFieldProps> = ({ value, onChange }) => (
  <div
    aria-hidden="true"
    style={{
      position: "absolute",
      left: "-9999px",
      top: "auto",
      width: "1px",
      height: "1px",
      overflow: "hidden",
    }}
  >
    <label htmlFor="feedback-name-field">Name</label>
    <input
      id="feedback-name-field"
      type="text"
      name="name"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      tabIndex={-1}
      autoComplete="off"
    />
  </div>
);
