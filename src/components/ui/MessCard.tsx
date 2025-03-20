
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Users, DollarSign, Home } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MessCardProps {
  id: string;
  title: string;
  address: string;
  distance?: number;
  rent: number;
  roomType: string;
  capacity: number;
  imageUrl: string;
  featured?: boolean;
}

export default function MessCard({
  id,
  title,
  address,
  distance,
  rent,
  roomType,
  capacity,
  imageUrl,
  featured = false,
}: MessCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link to={`/mess/${id}`}>
      <Card className={`overflow-hidden h-full transition-all duration-300 hover:shadow-md ${
        featured ? 'ring-2 ring-primary/20' : ''
      }`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className={`absolute inset-0 bg-muted ${imageLoaded ? 'hidden' : 'block'}`} />
          <img
            src={imageUrl}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'image-loaded' : 'image-loading'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {featured && (
            <Badge className="absolute top-3 right-3" variant="default">
              Featured
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
          
          <div className="flex items-center text-muted-foreground mb-2 text-sm">
            <MapPin size={14} className="mr-1 flex-shrink-0" />
            <span className="truncate">{address}</span>
          </div>
          
          {distance !== undefined && (
            <div className="mb-2 text-sm text-muted-foreground">
              <span className="font-medium">{distance.toFixed(1)} km</span> from your location
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline" className="flex items-center">
              <DollarSign size={12} className="mr-1" />
              ₹{rent.toLocaleString()}/mo
            </Badge>
            
            <Badge variant="outline" className="flex items-center">
              <Home size={12} className="mr-1" />
              {roomType}
            </Badge>
            
            <Badge variant="outline" className="flex items-center">
              <Users size={12} className="mr-1" />
              {capacity} {capacity === 1 ? 'tenant' : 'tenants'}
            </Badge>
          </div>
        </CardContent>
        
        <CardFooter className="px-4 py-3 bg-muted/30 border-t">
          <span className="text-sm font-medium text-primary hover:underline">
            View Details
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
