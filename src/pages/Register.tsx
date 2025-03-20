
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/ui/AuthForm";

const Register = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type") as "tenant" | "owner" | null;

  // For a smooth scroll to the top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 flex items-center justify-center py-16 px-4 bg-muted/30">
        <div className="w-full max-w-md animate-fade-in">
          <AuthForm mode="register" defaultUserType={userType || "tenant"} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
