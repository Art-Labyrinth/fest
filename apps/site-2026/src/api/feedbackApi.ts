import { API_URL } from '../config';
import { FeedbackSubmitData } from '../components/Feedback/types';
import { UTMParams } from '../utils/utm';

export interface FeedbackPayload extends FeedbackSubmitData {
  // Additional statistics
  lang: string;
  timezone: string;
  utm: UTMParams;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  screen: {
    width: number;
    height: number;
  };
  viewport: {
    width: number;
    height: number;
  };
  devicePixelRatio: number;
  languages: string[];
  networkType?: string;
  fillTimeMs: number; // time spent filling the form
}

export async function submitFeedbackToBackend(payload: FeedbackPayload): Promise<void> {
  const res = await fetch(`${API_URL}/feedback/survey`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}
