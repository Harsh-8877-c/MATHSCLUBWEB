import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, Shield, Settings, AlertTriangle } from "lucide-react";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const SystemSettingsPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    // Mock initial state - in a real app, fetch from backend
    const [settings, setSettings] = useState({
        clubName: "The Math Club",
        academicYear: "2025-2026",
        registrationsOpen: true,
        maintenanceMode: false,
        showAnnouncementBanner: true,
        bannerMessage: "Welcome to the new semester! Check out our upcoming events.",
    });

    const handleSave = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast.success("System settings saved successfully!");
            // Here you would save to backend/localStorage
            console.log("Saved settings:", settings);
        }, 1000);
    };

    const handleToggle = (key: keyof typeof settings) => {
        setSettings((prev) => ({
            ...prev,
            [key]: !prev[key as keyof typeof settings],
        }));
    };

    const handleChange = (key: keyof typeof settings, value: string) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    if (!user || user.role !== "Admin") {
        // Should be handled by ProtectedRoute, but extra safety
        return <div className="p-8 text-center text-red-500">Access Denied</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-dashboard-gray">
            <div className="container max-w-4xl mx-auto px-4 py-8 flex-1">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" onClick={() => navigate("/admin-dashboard")} className="pl-0 hover:bg-transparent">
                        <Settings className="w-6 h-6 mr-2" />
                        <span className="text-xl font-bold">Back to Dashboard</span>
                    </Button>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
                            <p className="text-muted-foreground">Manage global configurations for the Math Club platform.</p>
                        </div>
                        <Button onClick={handleSave} disabled={loading} className="gap-2">
                            <Save className="w-4 h-4" />
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>

                    {/* General Settings */}
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Settings className="w-5 h-5 text-primary" />
                            <h2 className="text-xl font-semibold">General Information</h2>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="clubName">Club Name</Label>
                                <Input
                                    id="clubName"
                                    value={settings.clubName}
                                    onChange={(e) => handleChange("clubName", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="academicYear">Academic Year</Label>
                                <Input
                                    id="academicYear"
                                    value={settings.academicYear}
                                    onChange={(e) => handleChange("academicYear", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Access Control */}
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Shield className="w-5 h-5 text-red-500" />
                            <h2 className="text-xl font-semibold">Access Control</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Registration Status</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Allow new students to register for the club/events.
                                    </p>
                                </div>
                                <Switch
                                    checked={settings.registrationsOpen}
                                    onCheckedChange={() => handleToggle("registrationsOpen")}
                                />
                            </div>
                            <div className="flex items-center justify-between border-t border-border pt-4">
                                <div className="space-y-0.5">
                                    <Label className="text-base text-destructive">Maintenance Mode</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Disable user access for system updates. (Admins still have access)
                                    </p>
                                </div>
                                <Switch
                                    checked={settings.maintenanceMode}
                                    onCheckedChange={() => handleToggle("maintenanceMode")}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Announcement Banner */}
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-5 h-5 text-orange-500" />
                            <h2 className="text-xl font-semibold">Announcement Banner</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Show Top Banner</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Display a global alert message at the top of every page.
                                    </p>
                                </div>
                                <Switch
                                    checked={settings.showAnnouncementBanner}
                                    onCheckedChange={() => handleToggle("showAnnouncementBanner")}
                                />
                            </div>
                            {settings.showAnnouncementBanner && (
                                <div className="space-y-2 animate-slide-up">
                                    <Label htmlFor="bannerMessage">Banner Message</Label>
                                    <Input
                                        id="bannerMessage"
                                        value={settings.bannerMessage}
                                        onChange={(e) => handleChange("bannerMessage", e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SystemSettingsPage;
