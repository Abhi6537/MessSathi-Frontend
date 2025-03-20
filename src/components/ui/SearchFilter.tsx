
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Sliders } from "lucide-react";

interface SearchFilterProps {
  onFilter: (filters: {
    location: string;
    radius: number;
    minRent: number;
    maxRent: number;
    roomType: string;
  }) => void;
}

export default function SearchFilter({ onFilter }: SearchFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState(3);
  const [rentRange, setRentRange] = useState([2000, 10000]);
  const [roomType, setRoomType] = useState("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      location,
      radius,
      minRent: rentRange[0],
      maxRent: rentRange[1],
      roomType,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Find a Mess</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm"
          >
            <Sliders className="h-4 w-4" />
            {isExpanded ? "Less Filters" : "More Filters"}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="location">Your Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your address"
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="w-full sm:w-24 space-y-2">
              <Label htmlFor="radius">Radius (km)</Label>
              <Input
                id="radius"
                type="number"
                min={0.5}
                max={10}
                step={0.5}
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
              />
            </div>
          </div>
          
          {isExpanded && (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Monthly Rent Range</Label>
                  <span className="text-sm text-muted-foreground">
                    ₹{rentRange[0].toLocaleString()} - ₹{rentRange[1].toLocaleString()}
                  </span>
                </div>
                <Slider
                  defaultValue={rentRange}
                  min={1000}
                  max={25000}
                  step={500}
                  onValueChange={(value) => setRentRange(value as number[])}
                  className="py-4"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="roomType">Room Type</Label>
                <Select value={roomType} onValueChange={setRoomType}>
                  <SelectTrigger id="roomType">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="double">Double</SelectItem>
                    <SelectItem value="triple">Triple</SelectItem>
                    <SelectItem value="dormitory">Dormitory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
          
          <Button type="submit" className="w-full flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search Messes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
