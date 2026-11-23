import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./routes";

export { canonicalUrl, getPrerenderRoutes, getSeo, getSitemapRoutes, SITE_NAME } from "./data/seo";

/** Renders one route to HTML. Used only by scripts/prerender.mjs. */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  );
}
