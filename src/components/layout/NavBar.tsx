
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "How It Works", href: "/#how-it-works" },
    { title: "For Mess Owners", href: "/#for-owners" },
    { title: "For Tenants", href: "/#for-tenants" },
  ];

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
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold text-primary">MessSathi</span>
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
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="font-medium">
                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="font-medium">Sign Up</Button>
            </Link>
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
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full font-medium">
                  Log In
                </Button>
              </Link>
              <Link to="/register" className="w-full">
                <Button className="w-full font-medium">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
