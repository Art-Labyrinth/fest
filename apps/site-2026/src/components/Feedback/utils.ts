import { FeedbackResponse } from "./types";

export const toggleResponse = (
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
