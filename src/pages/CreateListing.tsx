"use client"

import type React from "react"

import { useState } from "react"
import NavBar from "@/components/layout/NavBar"
import Footer from "@/components/layout/Footer"
import ImageUpload from "@/components/ui/ImageUpload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, Plus, Minus, Save, ImageIcon } from "lucide-react"
import { toast } from "sonner"
import axios from 'axios'

// Service functions for mess management
export const createMess = async (messData: any, images: File[]) => {
  const formData = new FormData();
  // Append all text fields
  Object.keys(messData).forEach(key => {
    if (key === 'rooms') {
      // Convert rooms to JSON string
      formData.append(key, JSON.stringify(messData[key]));
    } else {
      formData.append(key, messData[key]);
    }
  });
  // Append image files
  images.forEach((image, index) => {
    formData.append(`image${index}`, image);
  });
  try {
    const response = await axios.post('http://127.0.0.1:80/api/messes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating mess:', error);
    throw error;
  }
};

export const fetchOwnerMesses = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:80/api/messes/owner', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching owner messes:', error);
    throw error;
  }
};

// Interface for room details
interface RoomDetail {
  type: string
  rent: number
  capacity: number
  available: number
  total_count?: number
}

// Interface for mess listing details
interface MessListingDetails {
  title: string
  description: string
  address: string
  locality: string
  city: string
  state: string
  pincode: string
  contact_phone: string
  contact_email: string | null
}

const CreateListing = () => {
  const [activeTab, setActiveTab] = useState("basic")
  const [messImages, setMessImages] = useState<File[]>([])
  const [rooms, setRooms] = useState<RoomDetail[]>([{ type: "single", rent: 0, capacity: 1, available: 1 }])
  
  // State for form details
  const [messDetails, setMessDetails] = useState<MessListingDetails>({
    title: "",
    description: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",
    contact_phone: "",
    contact_email: null
  })

  const handleImagesChange = (files: File[]) => {
    setMessImages(files)
    console.log("Images selected:", files)
  }

  const addRoom = () => {
    setRooms([...rooms, { type: "single", rent: 0, capacity: 1, available: 1 }])
  }

  const removeRoom = (index: number) => {
    const newRooms = [...rooms]
    newRooms.splice(index, 1)
    setRooms(newRooms)
  }

  const updateRoom = (index: number, field: keyof RoomDetail, value: string | number) => {
    const newRooms = [...rooms]
    newRooms[index] = {
      ...newRooms[index],
      [field]: value,
    }
    setRooms(newRooms)
  }

  // Update mess details handler
  const updateMessDetails = (field: keyof MessListingDetails, value: string) => {
    setMessDetails(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("You need to be logged in to create a listing.")
      return
    }
  
    const messData = {
      ...messDetails,
      location: { lat: 12.9716, lng: 77.5946 }, 
      rooms: rooms
    }
  
    console.log("Sending mess data:", messData)
  
    try {
      const responseData = await createMess(messData, messImages)
      
      toast.success("Mess listing created successfully!")
      setTimeout(() => {
        window.location.href = "/owner-dashboard"
      }, 1500)
    } catch (error: any) {
      console.error("Full error object:", error)
      
      // More detailed error logging
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error response data:", error.response.data)
        console.error("Error response status:", error.response.status)
        console.error("Error response headers:", error.response.headers)
        
        toast.error(
          error.response.data?.message || 
          `Failed to create mess listing. Status: ${error.response.status}`
        )
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request)
        toast.error("No response from server. Please check your network connection.")
      } else {
        // Something happened in setting up the request
        console.error("Error setting up request:", error.message)
        toast.error(`Error: ${error.message}`)
      }
    }
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const goToNextTab = () => {
    if (activeTab === "basic") setActiveTab("rooms")
    else if (activeTab === "rooms") setActiveTab("photos")
    else if (activeTab === "photos") setActiveTab("preview")
  }

  const goToPrevTab = () => {
    if (activeTab === "preview") setActiveTab("photos")
    else if (activeTab === "photos") setActiveTab("rooms")
    else if (activeTab === "rooms") setActiveTab("basic")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 bg-muted/30 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Create a New Mess Listing</h1>
            <p className="text-muted-foreground">
              Provide details about your mess accommodation to attract potential tenants.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsContent value="basic" className="mt-0 animate-fade-in">
                <Card>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Mess Name</Label>
                      <Input 
                        id="title" 
                        placeholder="e.g., Sunshine Villa Mess" 
                        value={messDetails.title}
                        onChange={(e) => updateMessDetails('title', e.target.value)}
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your mess accommodation, facilities, rules, etc."
                        value={messDetails.description}
                        onChange={(e) => updateMessDetails('description', e.target.value)}
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          placeholder="Street address" 
                          value={messDetails.address}
                          onChange={(e) => updateMessDetails('address', e.target.value)}
                          required 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="locality">Locality/Area</Label>
                        <Input 
                          id="locality" 
                          placeholder="e.g., Koramangala" 
                          value={messDetails.locality}
                          onChange={(e) => updateMessDetails('locality', e.target.value)}
                          required 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          placeholder="e.g., Bangalore" 
                          value={messDetails.city}
                          onChange={(e) => updateMessDetails('city', e.target.value)}
                          required 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input 
                          id="state" 
                          placeholder="e.g., Karnataka" 
                          value={messDetails.state}
                          onChange={(e) => updateMessDetails('state', e.target.value)}
                          required 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pincode">PIN Code</Label>
                        <Input 
                          id="pincode" 
                          placeholder="e.g., 560034" 
                          value={messDetails.pincode}
                          onChange={(e) => updateMessDetails('pincode', e.target.value)}
                          required 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input 
                        id="contact" 
                        placeholder="Your phone number" 
                        value={messDetails.contact_phone}
                        onChange={(e) => updateMessDetails('contact_phone', e.target.value)}
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Contact Email (optional)</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Your email address" 
                        value={messDetails.contact_email || ''}
                        onChange={(e) => updateMessDetails('contact_email', e.target.value)}
                      />
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-end">
                    <Button type="button" onClick={goToNextTab} className="flex items-center gap-1">
                      Next: Room Details
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Room Details Tab */}
              <TabsContent value="rooms" className="mt-0 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>Room Details</CardTitle>
                    <CardDescription>Add details about the different types of rooms available.</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {rooms.map((room, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold">Room {index + 1}</h3>
                          {rooms.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeRoom(index)}
                              className="text-destructive"
                            >
                              <Minus className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                          <div className="space-y-2">
                            <Label htmlFor={`roomType-${index}`}>Room Type</Label>
                            <Select value={room.type} onValueChange={(value) => updateRoom(index, "type", value)}>
                              <SelectTrigger id={`roomType-${index}`}>
                                <SelectValue placeholder="Select room type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="single">Single Room</SelectItem>
                                <SelectItem value="double">Double Room</SelectItem>
                                <SelectItem value="triple">Triple Room</SelectItem>
                                <SelectItem value="dormitory">Dormitory</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`rent-${index}`}>Monthly Rent (₹)</Label>
                            <Input
                              id={`rent-${index}`}
                              type="number"
                              min="0"
                              value={room.rent}
                              onChange={(e) => updateRoom(index, "rent", Number(e.target.value))}
                              placeholder="e.g., 6000"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor={`capacity-${index}`}>Total Capacity (tenants per room)</Label>
                            <Input
                              id={`capacity-${index}`}
                              type="number"
                              min="1"
                              value={room.capacity}
                              onChange={(e) => updateRoom(index, "capacity", Number(e.target.value))}
                              placeholder="e.g., 2"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`available-${index}`}>Available Rooms</Label>
                            <Input
                              id={`available-${index}`}
                              type="number"
                              min="0"
                              value={room.available}
                              onChange={(e) => updateRoom(index, "available", Number(e.target.value))}
                              placeholder="e.g., 3"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addRoom}
                      className="w-full flex items-center justify-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Add Another Room Type
                    </Button>
                  </CardContent>

                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={goToPrevTab} className="flex items-center gap-1">
                      <ArrowLeft className="h-4 w-4" />
                      Back: Basic Info
                    </Button>
                    <Button type="button" onClick={goToNextTab} className="flex items-center gap-1">
                      Next: Photos
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Photos Tab */}
              <TabsContent value="photos" className="mt-0 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Photos</CardTitle>
                    <CardDescription>
                      Add high-quality photos of your mess accommodation to attract tenants.
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="mb-6">
                      <Label className="block mb-2">
                        Mess Photos <span className="text-muted-foreground">(max 5 images)</span>
                      </Label>
                      <ImageUpload maxImages={5} onChange={handleImagesChange} />
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded">
                          <ImageIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Photo Tips</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Add photos with good lighting and resolution</li>
                            <li>• Include images of different rooms and common areas</li>
                            <li>• Show facilities like kitchen, bathroom, etc.</li>
                            <li>• Avoid personal items in the photos</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={goToPrevTab} className="flex items-center gap-1">
                      <ArrowLeft className="h-4 w-4" />
                      Back: Room Details
                    </Button>
                    <Button type="button" onClick={goToNextTab} className="flex items-center gap-1">
                      Next: Preview
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Preview Tab */}
              <TabsContent value="preview" className="mt-0 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>Preview & Submit</CardTitle>
                    <CardDescription>Review your mess listing details before submitting.</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Basic Information</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          Please review the basic information you've provided.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Mess Name:</span>
                            <p>{messDetails.title || 'Not provided'}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Location:</span>
                            <p>{`${messDetails.locality || ''}, ${messDetails.city || ''}`}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Contact:</span>
                            <p>{messDetails.contact_phone || 'Not provided'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Room Details</h3>
                        <p className="text-muted-foreground text-sm mb-4">You've added {rooms.length} room type(s).</p>
                        <div className="space-y-4">
                          {rooms.map((room, index) => (
                            <div key={index} className="p-3 bg-muted/30 rounded">
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Room Type:</span>
                                  <p className="capitalize">{room.type}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Monthly Rent:</span>
                                  <p>₹{room.rent}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Capacity:</span>
                                  <p>
                                    {room.capacity} {room.capacity === 1 ? "tenant" : "tenants"}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Available Rooms:</span>
                                  <p>{room.available}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Photos</h3>
                        <p className="text-muted-foreground text-sm">You've uploaded {messImages.length} photo(s).</p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={goToPrevTab} className="flex items-center gap-1">
                      <ArrowLeft className="h-4 w-4" />
                      Back: Photos
                    </Button>
                    <Button type="submit" className="flex items-center gap-1">
                      <Save className="h-4 w-4" />
                      Create Listing
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CreateListing