
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { UserType } from "@/types/auth";

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType>("patient");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // In a real app, send registration data to backend
    toast.success("Registration successful!");
    navigate("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="auth-container">
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <h1 className="text-4xl font-bold text-primary tracking-tight">
          DocPatient
        </h1>
        <p className="text-muted-foreground text-center mt-1">
          Your Healthcare Connection
        </p>
      </div>
      <Card className="auth-card">
        <CardHeader className="space-y-1">
          <CardTitle className="auth-title">Create your account</CardTitle>
          <CardDescription className="auth-subtitle">
            Join DocPatient as a patient or healthcare provider
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={userType === "patient" ? "default" : "outline"}
                  className="w-full relative overflow-hidden group"
                  onClick={() => setUserType("patient")}
                >
                  <span className="relative z-10">Patient</span>
                  {userType === "patient" && (
                    <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                  )}
                </Button>
                <Button
                  type="button"
                  variant={userType === "doctor" ? "default" : "outline"}
                  className="w-full relative overflow-hidden group"
                  onClick={() => setUserType("doctor")}
                >
                  <span className="relative z-10">Doctor</span>
                  {userType === "doctor" && (
                    <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                  )}
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Create account
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium transition-colors"
              >
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
