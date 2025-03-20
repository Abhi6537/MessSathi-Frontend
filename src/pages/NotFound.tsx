
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md text-center space-y-6 animate-fade-in">
        <div className="relative mx-auto h-48 w-48">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl font-bold text-primary/10">404</div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold text-primary">404</div>
          </div>
        </div>
        
        <h1 className="text-3xl font-display font-bold">Page Not Found</h1>
        
        <p className="text-muted-foreground max-w-sm mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link to="/">
            <Button className="w-full sm:w-auto flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            className="w-full sm:w-auto flex items-center gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
