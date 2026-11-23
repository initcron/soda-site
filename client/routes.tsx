import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Certifications from "./pages/Certifications";
import ComingSoon from "./pages/ComingSoon";
import CourseCatalog from "./pages/CourseCatalog";
import CourseDetail from "./pages/CourseDetail";
import ForTeams from "./pages/ForTeams";
import GetLearnForge from "./pages/GetLearnForge";
import Index from "./pages/Index";
import Legal from "./pages/Legal";
import ManagerBrief from "./pages/ManagerBrief";
import NotFound from "./pages/NotFound";
import PathDetail from "./pages/PathDetail";
import PathListing from "./pages/PathListing";
import ProductionAiMap from "./pages/ProductionAiMap";
import Resources from "./pages/Resources";
import Roadmap from "./pages/Roadmap";
import SiteLayout from "./components/SiteLayout";
import SkillsAssessment from "./pages/SkillsAssessment";

/** Route table shared by the browser entry and the build-time prerender. */
export function AppRoutes() {
  return (
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
        <Route path="/get-learnforge" element={<GetLearnForge />} />
        <Route path="/about" element={<About />} />
        <Route path="/legacy-access" element={<ComingSoon />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
