import { useEffect } from "react";
import { useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TenantDashboard from "./pages/TenantDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import CreateListing from "./pages/CreateListing";
import MessDetail from "./pages/MessDetail";
import MessDetail2 from "./pages/MessDetail2";
import MessDetail3 from "./pages/MessDetails3";
import MessDetail4 from "./pages/MessDetails4";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("user_type");

    if (token && userType) {
      navigate(userType === "OWNER" ? "/owner-dashboard" : "/tenant-dashboard");
    }
  }, []);

  return null; // This component just handles redirection, doesn't render anything
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthRedirect /> {/* Ensures users are redirected based on role */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginRedirectGuard />} />
          <Route path="/register" element={<RegisterRedirectGuard />} />
          <Route path="/tenant-dashboard" element={<TenantDashboard />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/mess/1" element={<MessDetail />} />
          <Route path="/mess/2" element={<MessDetail2 />} />
          <Route path="/mess/3" element={<MessDetail3 />} />
          <Route path="/mess/4" element={<MessDetail4 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const LoginRedirectGuard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate(localStorage.getItem("user_type") === "OWNER" ? "/owner-dashboard" : "/tenant-dashboard");
    }
  }, []);
  return <Login />;
};

const RegisterRedirectGuard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate(localStorage.getItem("user_type") === "OWNER" ? "/owner-dashboard" : "/tenant-dashboard");
    }
  }, []);
  return <Register />;
};

export default App;
