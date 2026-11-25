import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';

export { ROUTES, headFor } from './lib/seo';

// Used only at build time by scripts/prerender.mjs, so search engines and AI
// crawlers get the full page text in the HTML instead of an empty <div id="root">.
export function render(path = '/'): string {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>
  );
}
