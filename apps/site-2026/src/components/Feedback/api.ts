import { FeedbackSubmitData } from "./types";

export const submitFeedback = async (data: FeedbackSubmitData): Promise<void> => {
  console.log("🎯 Feedback submitted:", {
    ...data,
    q4: Object.fromEntries(Object.entries(data.q4).filter(([_, v]) => v !== null)),
    timestamp: new Date(data.timestamp).toLocaleString("ru-RU"),
  });

  // TODO: Отправить на бэкенд
  // const response = await fetch("/api/feedback", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
};
