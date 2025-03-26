import { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/ui/AuthForm";

const Login = () => {
  // For a smooth scroll to the top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 flex items-center justify-center py-16 px-4 bg-muted/30">
        <div className="w-full max-w-md animate-fade-in">
          <AuthForm mode="login" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
