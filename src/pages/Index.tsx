
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import MessCard from "@/components/ui/MessCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// Mock data for featured messes
const featuredMesses = [
  {
    id: "1",
    title: "Saurav Boys' Mess",
    address: "A5 Kalyani ,Near JIS Boys' Hostel",
    rent: 3000,
    roomType: "Double",
    capacity: 2,
    imageUrl: "https://5.imimg.com/data5/DE/KU/MY-78592872/paying-guest-in-andheri-west-near-station-1000x1000.jpg",
    featured: true
  },
  {
    id: "2",
    title: "Anwesha Girls' Mess",
    address: "A11, Uttar Bhabanipur , Kalyani ,Nadia",
    rent: 6000,
    roomType: "Single",
    capacity: 1,
    imageUrl: "https://5.imimg.com/data5/GD/MO/MY-78592872/paying-guest-in-andheri-west-near-station-1000x1000.jpg",
    featured: true
  },
  {
    id: "3",
    title: "Abhi Paying Guest",
    address: "Boro Jonepur , Kanchrapara Loco , Kanchrapra ,North 24 Pgs",
    rent: 2000,
    roomType: "Triple",
    capacity: 3,
    imageUrl: "https://5.imimg.com/data5/CY/ES/MY-1926763/humser-paying-guest-house-500x500.jpg",
    featured: false
  },
  {
    id: "4",
    title: "Akanksha Girls PG",
    address: "A3,Kalyani,Nadia",
    rent: 3000,
    roomType: "Double",
    capacity: 2,
    imageUrl: "https://content.jdmagicbox.com/v2/comp/gangtok/s8/9999p3592.3592.240910210532.b2s8/catalogue/radiant-paying-guest-tadong-gangtok-paying-guest-accommodations-for-student-5m7sfgx53g-250.jpg",
    featured: false
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1">
        <Hero />
        
        <Features />
        
        {/* Featured Messes Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">Featured Messes</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Take a look at some of our top-rated mess accommodations from across the city.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredMesses.map((mess) => (
                <MessCard key={mess.id} {...mess} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/search">
                <Button variant="outline" className="font-medium">
                  View All Messes
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-xl p-8 md:p-12 shadow-sm border border-border max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                    Ready to find your perfect mess?
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Join thousands of satisfied users who found their ideal accommodation 
                    through MessSathi.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/register?type=tenant">
                      <Button className="font-medium">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/search">
                      <Button variant="outline" className="font-medium">
                        Browse Messes
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block">
                  <img 
                    src="https://5.imimg.com/data5/AV/GD/TN/SELLER-1415647/innovative-paying-guest-pg-in-uttam-nagar-for-boys-only-.jpg" 
                    alt="Happy Tenants" 
                    className="rounded-lg object-cover w-full h-64"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
