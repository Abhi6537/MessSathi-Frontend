
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
    featured: false
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
  },
  
];

// Mock saved messes
const savedMesses = [
  {
    id: "2",
    title: "Anwesha Girls' Mess",
    address: "A11, Uttar Bhabanipur , Kalyani ,Nadia",
    rent: 6000,
    roomType: "Single",
    capacity: 1,
    imageUrl: "https://5.imimg.com/data5/GD/MO/MY-78592872/paying-guest-in-andheri-west-near-station-1000x1000.jpg",
    featured: false
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
