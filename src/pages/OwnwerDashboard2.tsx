import { Link } from "react-router-dom";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Trash2, Eye, MessageSquare, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchOwnerMesses, deleteMess } from "@/services/apiService";
import { toast } from "sonner";

// Define an interface for the mess object to ensure type safety
interface Mess {
  id: number;
  title: string;
  address: string;
  status: "active" | "draft";
  photos: {
    photo_url: string;
  }[];
  views: number;
  inquiries: number;
  rooms?: {
    type: string;
    price: number;
    available: number;
    total: number;
  }[];
}

const OwnerDashboard = () => {
  // const [messes, setMesses] = useState<Mess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [messes, setMesses] = useState<
    {
      id: number;
      title: string;
      address: string;
      status: "active" | "draft";
      imageUrl?: string;
      views: number;
      inquiries: number;
      rooms?: {
        type: string;
        price: number;
        available: number;
        total: number;
      }[];
    }[]
  >([]);

  useEffect(() => {
    const loadMesses = async () => {
      try {
        const data = await fetchOwnerMesses();
        setMesses(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching owner messes:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        toast.error("Failed to load mess listings. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadMesses();
  }, []);

  const handleDelete = async (messId: number) => {
    try {
      await deleteMess(messId);
      setMesses(messes.filter((mess) => mess.id !== messId));
      toast.success("Mess listing deleted successfully");
    } catch (error) {
      console.error("Error deleting mess:", error);
      toast.error("Failed to delete mess listing. Please try again.");
    }
  };

  const renderDeleteButton = (messId: number) => {
    const confirmDelete = () => {
      if (
        window.confirm(
          "Are you sure you want to delete this mess listing? This action cannot be undone."
        )
      ) {
        handleDelete(messId);
      }
    };

    return (
      <Button
        variant="outline"
        size="sm"
        onClick={confirmDelete}
        className="flex items-center gap-1 text-destructive"
      >
        <Trash2 className="h-3 w-3" />
        Delete
      </Button>
    );
  };

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 bg-muted/30 pt-20 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Error Loading Listings</CardTitle>
              <CardDescription>
                Unable to retrieve your mess listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-destructive">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4 w-full"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 bg-muted/30 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Owner Dashboard</h1>
            <Link to="/create-listing">
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" /> Add New Listing
              </Button>
            </Link>
          </div>
          <Tabs defaultValue="listings" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="listings">My Listings</TabsTrigger>
            </TabsList>
            <TabsContent value="listings">
              {loading ? (
                <div className="text-center py-8">
                  <p>Loading mess listings...</p>
                </div>
              ) : messes.length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>No Mess Listings</CardTitle>
                    <CardDescription>
                      You haven't created any mess listings yet.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to="/create-listing">
                      <Button className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" /> Create Your
                        First Listing
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {messes.map((mess) => (
                    <Card key={mess.id} className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-1/3">
                          <img
                            src={mess.imageUrl || "placeholder.png"}
                            alt={mess.title}
                            className="w-full h-full object-cover aspect-square sm:aspect-auto"
                            onError={(e) => {
                              const imgElement = e.target as HTMLImageElement;
                              imgElement.src = "placeholder.png";
                            }}
                          />
                        </div>

                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">
                              {mess.title}
                            </h3>
                            <Badge
                              variant={
                                mess.status === "active" ? "default" : "outline"
                              }
                            >
                              {mess.status === "active" ? "Active" : "Draft"}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mb-4">
                            {mess.address}
                          </p>

                          <div className="space-y-2 mb-4">
                            {mess.rooms && mess.rooms.length > 0 ? (
                              mess.rooms.map((room, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center text-sm"
                                >
                                  <span>
                                    {room.type} Room (₹{room.price})
                                  </span>
                                  <span
                                    className={`${
                                      room.available === 0
                                        ? "text-destructive"
                                        : "text-primary"
                                    }`}
                                  >
                                    {room.available}/{room.total} available
                                  </span>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                No room details available
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {mess.views} views
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              {mess.inquiries} inquiries
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <Link to={`/mess/${mess.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <Eye className="h-3 w-3" />
                                View
                              </Button>
                            </Link>
                            <Link to={`/edit-listing/${mess.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <Edit className="h-3 w-3" />
                                Edit
                              </Button>
                            </Link>
                            {renderDeleteButton(mess.id)}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OwnerDashboard;
