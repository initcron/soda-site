import "./global.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import About from "./pages/About";
import Certifications from "./pages/Certifications";
import ForTeams from "./pages/ForTeams";
import ManagerBrief from "./pages/ManagerBrief";
import ProductionAiMap from "./pages/ProductionAiMap";
import Resources from "./pages/Resources";
import SkillsAssessment from "./pages/SkillsAssessment";
import ComingSoon from "./pages/ComingSoon";
import CourseCatalog from "./pages/CourseCatalog";
import CourseDetail from "./pages/CourseDetail";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PathDetail from "./pages/PathDetail";
import PathListing from "./pages/PathListing";
import Roadmap from "./pages/Roadmap";

const App = () => (
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/courses" element={<CourseCatalog />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/learning-paths" element={<PathListing />} />
        <Route path="/learning-paths/:slug" element={<PathDetail />} />
        <Route path="/roadmaps" element={<Roadmap />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/for-teams" element={<ForTeams />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/skills-assessment" element={<SkillsAssessment />} />
        <Route path="/resources/production-ai-map" element={<ProductionAiMap />} />
        <Route path="/resources/manager-brief/:slug" element={<ManagerBrief />} />
        <Route path="/about" element={<About />} />
        <Route path="/legacy-access" element={<ComingSoon />} />
        <Route path="/legal" element={<ComingSoon />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

createRoot(document.getElementById("root")!).render(<App />);
