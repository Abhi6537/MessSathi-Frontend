
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background -z-10" />
      <div className="absolute top-1/3 -right-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/3 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-40">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
            Find Your Perfect <span className="text-primary">Mess Accommodation</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Connecting mess owners with potential tenants. The simplest way to list or find quality accommodations in your area.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register?type=tenant">
              <Button size="lg" className="font-medium text-base px-6 h-12">
                Find a Mess
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            
            <Link to="/register?type=owner">
              <Button size="lg" variant="outline" className="font-medium text-base px-6 h-12">
                List Your Mess
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 flex justify-center">
            <div className="grid grid-cols-3 gap-8 sm:gap-16 text-center">
              <div>
                <p className="text-4xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground mt-1">Listed Messes</p>
              </div>
              
              <div>
                <p className="text-4xl font-bold text-primary">2000+</p>
                <p className="text-sm text-muted-foreground mt-1">Happy Tenants</p>
              </div>
              
              <div>
                <p className="text-4xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground mt-1">Cities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path
            fill="currentColor"
            className="text-background"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,144C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
