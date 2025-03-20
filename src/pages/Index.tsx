
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
    title: "Sunshine Villa Mess",
    address: "123 Main Street, Koramangala, Bangalore",
    rent: 6500,
    roomType: "Double",
    capacity: 2,
    imageUrl: "https://images.unsplash.com/photo-1551927336-09d50efd69cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: true
  },
  {
    id: "2",
    title: "Green View Accommodation",
    address: "456 Park Avenue, Indiranagar, Bangalore",
    rent: 8000,
    roomType: "Single",
    capacity: 1,
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1258&q=80",
    featured: true
  },
  {
    id: "3",
    title: "Harmony House",
    address: "789 Lake View, HSR Layout, Bangalore",
    rent: 5500,
    roomType: "Triple",
    capacity: 3,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: false
  },
  {
    id: "4",
    title: "Urban Nest Mess",
    address: "101 Hill Road, Whitefield, Bangalore",
    rent: 7000,
    roomType: "Double",
    capacity: 2,
    imageUrl: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
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
                    src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
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
