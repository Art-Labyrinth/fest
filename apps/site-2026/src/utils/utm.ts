// Capture and persist UTM parameters across page navigation
const UTM_STORAGE_KEY = 'al-utm-params';

export interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

export function captureUTMParams(): UTMParams {
  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};

  if (params.has('utm_source')) utm.source = params.get('utm_source') || undefined;
  if (params.has('utm_medium')) utm.medium = params.get('utm_medium') || undefined;
  if (params.has('utm_campaign')) utm.campaign = params.get('utm_campaign') || undefined;
  if (params.has('utm_content')) utm.content = params.get('utm_content') || undefined;
  if (params.has('utm_term')) utm.term = params.get('utm_term') || undefined;

  // Only save if there's at least one UTM param
  if (Object.keys(utm).length > 0) {
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
    } catch {
      // sessionStorage unavailable
    }
  }

  return utm;
}

export function getStoredUTMParams(): UTMParams {
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function getUTMParams(): UTMParams {
  // Check current URL first, then fall back to stored
  const current = captureUTMParams();
  if (Object.keys(current).length > 0) return current;
  return getStoredUTMParams();
}
