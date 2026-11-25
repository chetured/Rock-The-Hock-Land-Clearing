// Shared types for the service, rental and town landing pages.

export type PageSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Faq = { q: string; a: string };

export type PagePhoto = {
  file: string; // file name in public/photos/
  alt: string;
  caption?: string;
};

export type LandingPage = {
  kind: 'service' | 'rental' | 'location';
  slug: string; // URL path without slashes, e.g. "forestry-mulching"
  navLabel: string; // short name used in link lists
  service: string; // "Forestry Mulching"
  area: string; // "Hocking Hills, OH"
  description: string; // meta description, keep under ~158 characters
  intro: string;
  sections: PageSection[];
  faqs: Faq[];
  presetService?: string; // SERVICES label to preselect in the quote form
  serviceType?: string; // schema.org Service.serviceType
  areaName?: string; // place name for schema (town pages)
  photos?: PagePhoto[];
};
