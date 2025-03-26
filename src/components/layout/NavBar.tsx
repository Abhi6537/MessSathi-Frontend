import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const location = useLocation();

  // Check authentication status
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await fetch("http://127.0.0.1:80/api/auth/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Ensure "Bearer" is included
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("User Data:", data);

        if (response.ok) {
          setUser(data.user);
        } else {
          console.error("Failed to fetch user:", data.message);
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  const userRole = localStorage.getItem("role");

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "How It Works", href: "/#how-it-works" },
    { title: "For Mess Owners", href: user ? (userRole === "owner" ? "/owner-dashboard" : "/login") : "/login" },
    { title: "For Tenants", href: user ? (userRole === "tenant" ? "/tenant-dashboard" : "/login") : "/login" },
  ];
  
  
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token

      const response = await fetch("http://127.0.0.1:80/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Send token for blacklist
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("token"); // Remove token from local storage
        setUser(null); // Reset user state
        window.location.href = "/login"; // Redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold text-primary">
              Mess Sathi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="font-medium text-foreground">
                  Welcome, {user.name}
                </span>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="font-medium">
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="font-medium">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg animate-fade-in">
          <div className="container mx-auto px-4 pt-4 pb-8 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.href}
                className="block py-3 text-foreground/80 hover:text-primary transition-colors duration-200 font-medium text-lg"
              >
                {link.title}
              </Link>
            ))}

            <div className="flex flex-col space-y-3 pt-4">
              {user ? (
                <div className="flex flex-col space-y-3">
                  <span className="text-center font-medium text-foreground">
                    Welcome, {user.name}
                  </span>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      fetch("http://localhost:5000/api/auth/logout", {
                        method: "POST",
                        credentials: "include",
                      }).then(() => setUser(null));
                    }}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="w-full">
                    <Button variant="outline" className="w-full font-medium">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register" className="w-full">
                    <Button className="w-full font-medium">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
