import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Hero() {
  return (
    <div className="relative pt-16 pb-8 overflow-hidden">
      {/* Simple background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <AspectRatio ratio={16 / 9} className="h-full">
          <img 
            src="http://images.jdmagicbox.com/comp/thanjavur/f5/9999p4362.4362.171210121517.i9f5/catalogue/vijayam-ladies-hostel-rajah-serfoji-government-college-thanjavur-hostels-for-women-8zpws.jpg" 
            alt="Mess accommodation building" 
            className="w-full h-full object-cover"
          /> 
          <div className="absolute inset-0 bg-black/40" />
        </AspectRatio>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Find Your Perfect Mess Accommodation
          </h1>
          
          <p className="text-lg text-white/90 mb-8">
            Connecting mess owners with potential tenants. The simplest way to list or find quality accommodations in your area.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register?type=tenant">
              <Button size="lg" className="font-medium bg-white text-primary hover:bg-white/90">
                Find a Mess
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            
            <Link to="/register?type=owner">
              <Button size="lg" variant="outline" className="font-medium text-blue border-white hover:bg-white/20">
                List Your Mess
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex justify-center">
            <div className="grid grid-cols-3 gap-6 sm:gap-12">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">0</p>
                <p className="text-sm text-white/80">Listed Messes</p>
              </div>
              
              <div className="text-center">
                <p className="text-3xl font-bold text-white">0</p>
                <p className="text-sm text-white/80">Happy Tenants</p>
              </div>
              
              <div className="text-center">
                <p className="text-3xl font-bold text-white">0</p>
                <p className="text-sm text-white/80">Cities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Simple wave divider */}
      <div className="absolute bottom-[-84px] left-0 right-0">
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
