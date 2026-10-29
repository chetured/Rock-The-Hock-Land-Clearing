import { GA_MEASUREMENT_ID } from './constants';

const hasRealId = () => GA_MEASUREMENT_ID !== 'GA_MEASUREMENT_ID';

// Loads the GA4 tag once a real measurement id is set in constants.ts.
// Until then it does nothing, so dev/preview never breaks.
export function initAnalytics(): void {
  if (typeof window === 'undefined' || !hasRealId()) return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  gtag('config', GA_MEASUREMENT_ID);
}

// Lightweight GA4 event helper. If no real measurement id is set, this is a
// no-op so dev/preview never breaks.
export function trackEvent(name: string, params: Record<string, string> = {}): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag || !hasRealId()) return;
  gtag('event', name, params);
}
