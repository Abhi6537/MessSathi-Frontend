
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Home, Users, PlusCircle, Settings, Bell, Eye, Edit, Trash2, MessageSquare } from "lucide-react";

// Mock data for owner's mess listings
const myMesses = [
  {
    id: "101",
    title: "Harmony Haven PG",
    address: "42 Green Avenue, Indiranagar, Bangalore",
    rooms: [
      { type: "Single", price: 8000, available: 1, total: 4 },
      { type: "Double", price: 6000, available: 2, total: 6 },
      { type: "Triple", price: 5000, available: 0, total: 2 },
    ],
    views: 324,
    inquiries: 12,
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80",
    status: "active"
  },
  {
    id: "102",
    title: "Sunshine Comfort Lodge",
    address: "15 Main Road, Koramangala, Bangalore",
    rooms: [
      { type: "Single", price: 9000, available: 0, total: 2 },
      { type: "Double", price: 7000, available: 1, total: 4 },
    ],
    views: 156,
    inquiries: 5,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    status: "active"
  },
];

// Mock data for tenant inquiries
const inquiries = [
  {
    id: "201",
    tenantName: "Priya Sharma",
    messId: "101",
    messName: "Harmony Haven PG",
    roomType: "Double",
    message: "Hi, is the double room still available? I'm looking to move in by next month.",
    date: "2023-08-15T10:30:00",
    status: "new"
  },
  {
    id: "202",
    tenantName: "Rahul Kumar",
    messId: "101",
    messName: "Harmony Haven PG",
    roomType: "Single",
    message: "Hello, I'm interested in the single room. Can I visit to see the place this weekend?",
    date: "2023-08-14T15:45:00",
    status: "replied"
  },
  {
    id: "203",
    tenantName: "Aisha Patel",
    messId: "102",
    messName: "Sunshine Comfort Lodge",
    roomType: "Double",
    message: "Is WiFi included in the rent? Also, what about laundry facilities?",
    date: "2023-08-13T09:15:00",
    status: "replied"
  },
];

// Dashboard stats
const stats = [
  { title: "Total Listings", value: 2, icon: <Home className="h-4 w-4" /> },
  { title: "Available Rooms", value: 4, icon: <Home className="h-4 w-4" /> },
  { title: "Total Inquiries", value: 17, icon: <MessageSquare className="h-4 w-4" /> },
  { title: "Current Tenants", value: 8, icon: <Users className="h-4 w-4" /> },
];

const OwnerDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 bg-muted/30 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Owner Dashboard Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold">Owner Dashboard</h1>
                <p className="text-muted-foreground">Manage your mess listings and tenant inquiries</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
                <Link to="/create-listing">
                  <Button className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add New Listing
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                        {stat.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Tabs for different sections */}
          <Tabs defaultValue="listings" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="listings" className="px-4">My Listings</TabsTrigger>
              <TabsTrigger value="inquiries" className="px-4">Inquiries</TabsTrigger>
              <TabsTrigger value="tenants" className="px-4">Current Tenants</TabsTrigger>
            </TabsList>
            
            {/* My Listings Tab */}
            <TabsContent value="listings" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myMesses.map((mess) => (
                  <Card key={mess.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3">
                        <img 
                          src={mess.imageUrl} 
                          alt={mess.title} 
                          className="w-full h-full object-cover aspect-square sm:aspect-auto" 
                        />
                      </div>
                      
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{mess.title}</h3>
                          <Badge variant={mess.status === 'active' ? 'default' : 'outline'}>
                            {mess.status === 'active' ? 'Active' : 'Draft'}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">{mess.address}</p>
                        
                        <div className="space-y-2 mb-4">
                          {mess.rooms.map((room, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <span>
                                {room.type} Room (₹{room.price})
                              </span>
                              <span className={`${room.available === 0 ? 'text-destructive' : 'text-primary'}`}>
                                {room.available}/{room.total} available
                              </span>
                            </div>
                          ))}
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
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              View
                            </Button>
                          </Link>
                          <Link to={`/edit-listing/${mess.id}`}>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm" className="flex items-center gap-1 text-destructive">
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Inquiries Tab */}
            <TabsContent value="inquiries" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Inquiries</CardTitle>
                  <CardDescription>
                    Manage inquiries from potential tenants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                      <Card key={inquiry.id} className={`border ${inquiry.status === 'new' ? 'border-primary' : ''}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{inquiry.tenantName}</h4>
                                {inquiry.status === 'new' && (
                                  <Badge>New</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                For {inquiry.roomType} room in {inquiry.messName}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {new Date(inquiry.date).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <p className="text-sm mb-4">{inquiry.message}</p>
                          
                          <div className="flex gap-2">
                            <Button size="sm" className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              Reply
                            </Button>
                            <Button variant="outline" size="sm">
                              Mark as Resolved
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Tenants Tab */}
            <TabsContent value="tenants" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Current Tenants</CardTitle>
                  <CardDescription>
                    Manage your current tenants and occupancy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-muted-foreground">
                    Tenant management features will be available in the next update.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OwnerDashboard;
