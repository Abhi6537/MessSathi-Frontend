
import { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import SearchFilter from "@/components/ui/SearchFilter";
import MessCard from "@/components/ui/MessCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageSquare, Heart, Settings, ListFilter } from "lucide-react";

// Mock data for search results
const mockMesses = [
  {
    id: "1",
    title: "Sunshine Villa Mess",
    address: "123 Main Street, Koramangala, Bangalore",
    distance: 2.1,
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
    distance: 1.4,
    rent: 8000,
    roomType: "Single",
    capacity: 1,
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1258&q=80",
    featured: false
  },
  {
    id: "3",
    title: "Harmony House",
    address: "789 Lake View, HSR Layout, Bangalore",
    distance: 0.8,
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
    distance: 2.9,
    rent: 7000,
    roomType: "Double",
    capacity: 2,
    imageUrl: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: false
  },
  {
    id: "5",
    title: "Royal Residence",
    address: "555 Queen Road, JP Nagar, Bangalore",
    distance: 1.2,
    rent: 9000,
    roomType: "Single",
    capacity: 1,
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: false
  },
  {
    id: "6",
    title: "The Nest PG",
    address: "202 Tech Park, Electronic City, Bangalore",
    distance: 3.0,
    rent: 6000,
    roomType: "Triple",
    capacity: 3,
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80",
    featured: false
  }
];

// Mock saved messes
const savedMesses = [
  {
    id: "2",
    title: "Green View Accommodation",
    address: "456 Park Avenue, Indiranagar, Bangalore",
    distance: 1.4,
    rent: 8000,
    roomType: "Single",
    capacity: 1,
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1258&q=80",
    featured: false
  },
  {
    id: "5",
    title: "Royal Residence",
    address: "555 Queen Road, JP Nagar, Bangalore",
    distance: 1.2,
    rent: 9000,
    roomType: "Single",
    capacity: 1,
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: false
  },
];

interface FilterOptions {
  location: string;
  radius: number;
  minRent: number;
  maxRent: number;
  roomType: string;
}

const TenantDashboard = () => {
  const [activeFilters, setActiveFilters] = useState<FilterOptions | null>(null);

  const handleFilter = (filters: FilterOptions) => {
    setActiveFilters(filters);
    // In a real app, this would trigger an API call with the filters
    console.log("Filtering with:", filters);
  };
  console.log(localStorage.getItem("user_type"));
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 bg-muted/30 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left sidebar with search filters */}
            <div className="w-full lg:w-80 space-y-6">
              <SearchFilter onFilter={handleFilter} />
              
              {/* Active filters */}
              {activeFilters && (
                <div className="bg-card rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Active Filters</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setActiveFilters(null)}
                      className="h-8 px-2 text-xs"
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeFilters.location && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        Location: {activeFilters.location}
                        <button className="ml-1" onClick={() => setActiveFilters({ ...activeFilters, location: "" })}>×</button>
                      </Badge>
                    )}
                    <Badge variant="outline" className="flex items-center gap-1">
                      Radius: {activeFilters.radius} km
                      <button className="ml-1" onClick={() => setActiveFilters({ ...activeFilters, radius: 3 })}>×</button>
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      Rent: ₹{activeFilters.minRent} - ₹{activeFilters.maxRent}
                      <button className="ml-1" onClick={() => setActiveFilters({ ...activeFilters, minRent: 2000, maxRent: 10000 })}>×</button>
                    </Badge>
                    {activeFilters.roomType !== "all" && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        Type: {activeFilters.roomType}
                        <button className="ml-1" onClick={() => setActiveFilters({ ...activeFilters, roomType: "all" })}>×</button>
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Main content area */}
            <div className="flex-1">
              <Tabs defaultValue="nearby" className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <TabsList>
                    <TabsTrigger value="nearby" className="px-4">Nearby Messes</TabsTrigger>
                    <TabsTrigger value="saved" className="px-4">Saved</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Bell className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="nearby" className="mt-0">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Messes Near You</h2>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ListFilter className="h-4 w-4" />
                      Sort By
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockMesses.map((mess) => (
                      <MessCard key={mess.id} {...mess} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="saved" className="mt-0">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Saved Messes</h2>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {savedMesses.length} Saved
                    </Button>
                  </div>
                  
                  {savedMesses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {savedMesses.map((mess) => (
                        <MessCard key={mess.id} {...mess} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-card rounded-lg border">
                      <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No saved messes yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Save messes you like to find them easily later.
                      </p>
                      <Button>Browse Nearby Messes</Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TenantDashboard;
