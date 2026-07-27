export type FeedbackResponse = "good" | "bad" | null;
export type ViewMode = "page" | "wizard" | "accordion";

export interface FeedbackItem {
  id: string;
  nameKey: string;
}

export interface FeedbackState {
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
  /** Trap field for bots. A person does not see it, the meaning is always empty. */
  honeypot: string;
}

export interface VariantProps extends FeedbackState {
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
  onHoneypotChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  t: (key: string) => string;
}

export interface FeedbackSubmitData {
  q1: string | null;
  q2: string;
  q3: string;
  q4: Record<string, FeedbackResponse>;
  q5: string;
  q6: string;
  q7: string;
  q8: {
    contact: string | null;
    options: string[];
  };
  q9: string;
  timestamp: string;
}
