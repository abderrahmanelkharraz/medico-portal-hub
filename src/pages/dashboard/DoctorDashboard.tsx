
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    licenseNumber: "",
    hospitalAffiliation: "",
  });

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    const userType = localStorage.getItem("userType");
    if (!isAuth || userType !== "doctor") {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send update to backend
    toast.success("Profile updated successfully!");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Doctor Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="dashboard-content">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="stat-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Update Profile</CardTitle>
            <CardDescription>
              Keep your professional information up to date
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    placeholder="Dr. John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    placeholder="doctor@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    name="specialization"
                    value={profileData.specialization}
                    onChange={handleInputChange}
                    placeholder="Cardiology"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    name="licenseNumber"
                    value={profileData.licenseNumber}
                    onChange={handleInputChange}
                    placeholder="MD123456"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hospitalAffiliation">
                    Hospital Affiliation
                  </Label>
                  <Input
                    id="hospitalAffiliation"
                    name="hospitalAffiliation"
                    value={profileData.hospitalAffiliation}
                    onChange={handleInputChange}
                    placeholder="City General Hospital"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full md:w-auto">
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DoctorDashboard;
