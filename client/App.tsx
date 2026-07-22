import "./global.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import CourseDetail from "./pages/CourseDetail";
import Index from "./pages/Index";
import Placeholder from "./pages/Placeholder";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/courses/mlops-bootcamp" element={<CourseDetail />} />
        <Route path="/courses" element={<Placeholder />} />
        <Route path="/learning-paths" element={<Placeholder />} />
        <Route path="/roadmaps" element={<Placeholder />} />
        <Route path="/about" element={<Placeholder />} />
        <Route path="/legacy-access" element={<Placeholder />} />
        <Route path="/legal" element={<Placeholder />} />
        <Route path="*" element={<Placeholder />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

createRoot(document.getElementById("root")!).render(<App />);
