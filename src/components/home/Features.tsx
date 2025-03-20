
import { Key, Search, Home, MapPin, Percent, Clock, Users, Camera } from "lucide-react";

export default function Features() {
  const messOwnerFeatures = [
    {
      icon: <Key className="w-6 h-6 text-primary" />,
      title: "Easy Registration",
      description: "Sign up in minutes and create your mess owner account.",
    },
    {
      icon: <Camera className="w-6 h-6 text-primary" />,
      title: "Photo Uploads",
      description: "Showcase your mess with high-quality photo uploads.",
    },
    {
      icon: <Percent className="w-6 h-6 text-primary" />,
      title: "Set Your Prices",
      description: "Full control over room rates and availability.",
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Location Details",
      description: "Provide accurate location information for better visibility.",
    },
  ];

  const tenantFeatures = [
    {
      icon: <Search className="w-6 h-6 text-primary" />,
      title: "Smart Search",
      description: "Find messes within your preferred radius and filters.",
    },
    {
      icon: <Home className="w-6 h-6 text-primary" />,
      title: "Room Options",
      description: "Browse through different room types that fit your needs.",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Capacity Details",
      description: "See how many tenants each room can accommodate.",
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Real-time Availability",
      description: "Only see rooms that are currently available for rent.",
    },
  ];

  return (
    <section className="py-20 bg-background" id="how-it-works">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold mb-4">How MessSathi Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our platform connects mess owners with potential tenants through a simple, 
            intuitive process that benefits both parties.
          </p>
        </div>

        {/* For Mess Owners */}
        <div className="mb-20" id="for-owners">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-2">For Mess Owners</h3>
            <p className="text-muted-foreground">List your mess and find quality tenants</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {messOwnerFeatures.map((feature, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <div className="mb-4 bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* For Tenants */}
        <div id="for-tenants">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-2">For Tenants</h3>
            <p className="text-muted-foreground">Find your ideal mess accommodation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tenantFeatures.map((feature, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <div className="mb-4 bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
