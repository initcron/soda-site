import "./global.css";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

const App = () => (
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <AppRoutes />
  </BrowserRouter>
);

const root = document.getElementById("root")!;

// Pages are prerendered at build time; hydrate that HTML when it is present.
if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
