
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Phone, Mail, Users, DollarSign, Home, Heart, Share, MessageSquare, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

// Mock data for mess details
const messMockData2 = {
  id: "2",
  title: "Anwesha Girls' Mess",
  description: "A premium mess offering comfortable accommodation with all modern amenities. Located in a peaceful neighborhood with easy access to public transport, shopping, and entertainment.",
  address: "A11, Uttar Bhabanipur , Kalyani ,Nadia",
  contactPerson: "Anwesha Das",
  phone: "+91 0000000000",
  email: "contact@anweshagirlsmess.com",
  images: [
    "https://5.imimg.com/data5/GD/MO/MY-78592872/paying-guest-in-andheri-west-near-station-1000x1000.jpg",
    "https://5.imimg.com/data5/JS/QN/MY-78592872/paying-guest-in-andheri-west-near-station-1000x1000.jpg",
    "https://5.imimg.com/data5/DB/ET/MY-78592872/paying-guest-in-andheri-west-near-station-1000x1000.jpg",
    "https://3.bp.blogspot.com/-Dk4t4zV1MgQ/Vqhz8yLivcI/AAAAAAAAEvE/cjA8WS4ZmbU/s1600/IMG_5452.JPG",
  ],
  rooms: [
    { type: "Single", price: 6000, available: 2, total: 4 },
    { type: "Double", price: 3500, available: 1, total: 6 },
    { type: "Triple", price: 2500, available: 0, total: 2 },
  ],
  amenities: [
    "WiFi", "Hot Water", "Security","Furnished","Security with CCTV","Garage"
    
  ],
  rules: [

    "Enter in the mess before 9 PM",
    "No outsider expect family",
    "Keep noise levels down after 10 PM",
    "No pets allowed",
    "Monthly rent to be paid by 5th of every month"
  ]
  };

const MessDetail2 = () => {
  const { id } = useParams<{ id: string }>();
  const [messData, setMessData] = useState(messMockData2);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [enquiryMessage, setEnquiryMessage] = useState("");
  
  // For a smooth scroll to the top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load mess details based on id
  useEffect(() => {
    // In a real app, this would fetch data from the server
    console.log("Loading mess details for ID:", id);
    // For now we're using the mock data
  }, [id]);

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => 
      prevIndex === messData.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => 
      prevIndex === 0 ? messData.images.length - 1 : prevIndex - 1
    );
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Removed from saved messes" : "Added to saved messes");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleSendEnquiry = () => {
    if (!enquiryMessage.trim()) {
      toast.error("Please enter your message");
      return;
    }
    
    // In a real app, this would send the enquiry to the server
    toast.success("Your enquiry has been sent to the mess owner");
    setEnquiryMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 bg-muted/30 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/tenant-dashboard" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Images and basic info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="rounded-xl overflow-hidden border bg-card">
                <div className="relative aspect-[16/9]">
                  <img 
                    src={messData.images[selectedImageIndex]} 
                    alt={messData.title}
                    className="w-full h-full object-cover animate-fade-in"
                  />
                  
                  {/* Navigation arrows */}
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handlePrevImage}
                      className="h-10 w-10 rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/40"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handleNextImage}
                      className="h-10 w-10 rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/40"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                  
                  {/* Image counter */}
                  <div className="absolute bottom-4 right-4 bg-black/40 text-white text-sm px-2 py-1 rounded backdrop-blur-sm">
                    {selectedImageIndex + 1} / {messData.images.length}
                  </div>
                </div>
                
                {/* Thumbnail row */}
                <div className="p-2 flex overflow-x-auto gap-2">
                  {messData.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 ${
                        selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mess Details Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-display font-bold mb-2">{messData.title}</h1>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{messData.address}</span>
                      </div>
                      {messData.distance && (
                        <div className="mt-1 text-sm flex items-center">
                          <Badge variant="outline" className="font-normal">
                            {messData.distance.toFixed(1)} km from your location
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handleSave}
                        className={isSaved ? "text-primary" : ""}
                      >
                        <Heart className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
                      </Button>
                      <Button variant="outline" size="icon" onClick={handleShare}>
                        <Share className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Rating and reviews */}
                  {messData.rating && (
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 font-semibold">{messData.rating}</span>
                      </div>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{messData.reviews} reviews</span>
                    </div>
                  )}
                  
                  <Tabs defaultValue="about" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="about">About</TabsTrigger>
                      <TabsTrigger value="rooms">Rooms & Pricing</TabsTrigger>
                      <TabsTrigger value="amenities">Amenities</TabsTrigger>
                      <TabsTrigger value="rules">Rules</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="about" className="mt-0">
                      <p className="mb-4 text-foreground/90 leading-relaxed">
                        {messData.description}
                      </p>
                      
                      <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-8 flex-shrink-0 text-primary">
                            <Phone className="h-4 w-4" />
                          </div>
                          <span>{messData.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 flex-shrink-0 text-primary">
                            <Mail className="h-4 w-4" />
                          </div>
                          <span>{messData.email}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 flex-shrink-0 text-primary">
                            <Users className="h-4 w-4" />
                          </div>
                          <span>Contact Person: {messData.contactPerson}</span>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="rooms" className="mt-0">
                      <div className="space-y-4">
                        {messData.rooms.map((room, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-semibold">{room.type} Room</h3>
                              <Badge>
                                {room.available > 0 
                                  ? `${room.available} Available` 
                                  : "Fully Occupied"
                                }
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                              <div className="flex items-center text-sm">
                                <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span>₹{room.price.toLocaleString()}/month</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span>{room.type === "Single" ? "1 Person" : room.type === "Double" ? "2 Persons" : "3 Persons"}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Home className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span>{room.total} Total Rooms</span>
                              </div>
                            </div>
                            {room.available > 0 ? (
                              <Button 
                                size="sm"
                                className="w-full sm:w-auto"
                              >
                                Book Now
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                disabled
                                className="w-full sm:w-auto"
                              >
                                Currently Full
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="amenities" className="mt-0">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {messData.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="rules" className="mt-0">
                      <ul className="space-y-2">
                        {messData.rules.map((rule, index) => (
                          <li key={index} className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            {/* Right column - Contact and enquiry */}
            <div className="space-y-6">
              {/* Enquiry Form */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Mess Owner</h3>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Write your message to the mess owner..."
                      value={enquiryMessage}
                      onChange={(e) => setEnquiryMessage(e.target.value)}
                      rows={4}
                    />
                    <Button 
                      className="w-full flex items-center gap-1"
                      onClick={handleSendEnquiry}
                    >
                      <MessageSquare className="h-4 w-4" />
                      Send Enquiry
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Similar Messes */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Similar Messes Nearby</h3>
                <div className="space-y-4">
                  {[1].map((item) => (
                    <Card key={item} className="overflow-hidden">
                      <div className="flex">
                        <div className="w-1/3">
                          <img 
                            src={"https://5.imimg.com/data5/CY/ES/MY-1926763/humser-paying-guest-house-500x500.jpg"} 
                            alt={`Similar mess ${item}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3 flex-1">
                          <h4 className="font-semibold text-sm mb-1">Abhi Paying Guest</h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {(messData.distance + 0.3 * item).toFixed(1)} km from your location
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs">
                              From <span className="font-semibold text-sm">₹5000</span>/mo
                            </span>
                            <Link to={"/mess/${messData.id + item}"}>
                              <Button size="sm" variant="outline" className="text-xs h-7 px-2">
                                View
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MessDetail2;