
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface AuthFormProps {
  mode: "login" | "register";
  defaultUserType?: "tenant" | "owner";
}

export default function AuthForm({ mode, defaultUserType = "tenant" }: AuthFormProps) {
  const [userType, setUserType] = useState<"tenant" | "owner">(defaultUserType);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      // In a real app, this would be connected to an authentication service
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = userType === "owner" ? "/owner-dashboard" : "/tenant-dashboard";
      }, 1500);
    } else {
      // In a real app, this would be connected to an authentication service
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-display">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </CardTitle>
        <CardDescription>
          {mode === "login"
            ? "Enter your credentials to access your account"
            : "Fill in the information to create your account"}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" required />
              </div>
              
              <div className="space-y-2">
                <Label>I am a</Label>
                <RadioGroup
                  defaultValue={userType}
                  onValueChange={(value) => setUserType(value as "tenant" | "owner")}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tenant" id="tenant" />
                    <Label htmlFor="tenant" className="cursor-pointer">Tenant</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="owner" id="owner" />
                    <Label htmlFor="owner" className="cursor-pointer">Mess Owner</Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" required />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {mode === "login" && (
                <a href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              )}
            </div>
            <Input id="password" type="password" placeholder="Enter your password" required />
          </div>

          {mode === "login" && (
            <div className="space-y-2">
              <Label>Login as</Label>
              <RadioGroup
                defaultValue={userType}
                onValueChange={(value) => setUserType(value as "tenant" | "owner")}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tenant" id="tenant-login" />
                  <Label htmlFor="tenant-login" className="cursor-pointer">Tenant</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="owner" id="owner-login" />
                  <Label htmlFor="owner-login" className="cursor-pointer">Mess Owner</Label>
                </div>
              </RadioGroup>
            </div>
          )}
          
          <Button type="submit" className="w-full mt-6">
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-center border-t pt-6">
        <p className="text-sm text-muted-foreground">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <a 
            href={mode === "login" ? "/register" : "/login"} 
            className="text-primary hover:underline font-medium"
          >
            {mode === "login" ? "Sign Up" : "Sign In"}
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
