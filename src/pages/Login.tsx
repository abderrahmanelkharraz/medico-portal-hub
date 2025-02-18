
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

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validate credentials against backend
    if (email && password) {
      localStorage.setItem("userType", userType);
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Login successful!");
      navigate(`/dashboard/${userType}`);
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <CardHeader className="space-y-1">
          <CardTitle className="auth-title">Welcome back</CardTitle>
          <CardDescription className="auth-subtitle">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={userType === "patient" ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setUserType("patient")}
                >
                  Patient
                </Button>
                <Button
                  type="button"
                  variant={userType === "doctor" ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setUserType("doctor")}
                >
                  Doctor
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
