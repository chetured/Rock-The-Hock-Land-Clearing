import { GA_MEASUREMENT_ID } from './constants';

// Lightweight GA4 event helper. If no real measurement id is set, this is a
// no-op so dev/preview never breaks.
export function trackEvent(name: string, params: Record<string, string> = {}): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag || GA_MEASUREMENT_ID === 'GA_MEASUREMENT_ID') return;
  gtag('event', name, params);
}
