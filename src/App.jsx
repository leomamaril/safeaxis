import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/Login";
import Maincontent from "./pages/Maincontent";
import InspectionPage from "./pages/InspectionPanel";
import SchedulesPage from "./pages/SchedulePanel";
import ActionsPage from "./pages/ActionsPanel";
import TrainingPage from "./pages/TrainingPanel"; 
import IssuesPage from "./pages/IssuePanel";
import DocumentsPage from "./pages/DocumentPanel";
import HeadsUpPage from "./pages/HeadsUpPanel";
import AnalyticsPage from "./pages/AnalyticsPanel";
import AccountManagement from "./pages/AccountManagement";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → Login first */}
        <Route index element={<LoginPage />} />

        {/* Dashboard and panels */}
        <Route path="/dashboard" element={<Maincontent />} />
        <Route path="/inspection" element={<InspectionPage />} />
        <Route path="/schedules" element={<SchedulesPage />} />
        <Route path="/actions" element={<ActionsPage />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/issues" element={<IssuesPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/heads-up" element={<HeadsUpPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/create-account" element={<AccountManagement />} />
      </Routes>
    </Router>
  );
}
