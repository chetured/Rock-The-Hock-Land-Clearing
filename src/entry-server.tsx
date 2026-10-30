import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';

// Used only at build time by scripts/prerender.mjs, so search engines get the
// full page text in the HTML instead of an empty <div id="root">.
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
