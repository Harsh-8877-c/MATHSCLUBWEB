import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/AuthPage";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import MemberDashboard from "./pages/dashboards/MemberDashboard";
import CoordinatorDashboard from "./pages/dashboards/CoordinatorDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import SystemSettingsPage from "./pages/admin/SystemSettingsPage";
import ManageUsersPage from "./pages/admin/ManageUsersPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import RegisterEventPage from "./pages/RegisterEventPage";
import AboutPage from "./pages/AboutPage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import EventSectionPage from "./pages/EventSectionPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthPage />} />

            <Route element={<ProtectedRoute allowedRoles={["Student"]} />}>
              <Route path="/student-dashboard" element={<StudentDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["ClubMember"]} />}>
              <Route path="/member-dashboard" element={<MemberDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["Coordinator"]} />}>
              <Route path="/coordinator-dashboard" element={<CoordinatorDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin/settings" element={<SystemSettingsPage />} />
              <Route path="/admin/users" element={<ManageUsersPage />} />
              <Route path="/admin/analytics" element={<AnalyticsPage />} />
            </Route>

            {/* Common routes available to authenticated users (role logic inside pages if needed) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:eventId" element={<EventDetailPage />} />
              <Route path="/events/:eventId/:section" element={<EventSectionPage />} />
              <Route path="/announcements" element={<AnnouncementsPage />} />
              <Route path="/register-event" element={<RegisterEventPage />} />
            </Route>

            <Route path="/about" element={<AboutPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
