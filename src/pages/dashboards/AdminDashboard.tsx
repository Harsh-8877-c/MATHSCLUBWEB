import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Menu, LogOut, Users, Settings, Shield, BarChart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { getApiUrl } from "@/utils/api";

const dashboardCards = [
    {
        title: "Manage Users",
        description: "Approve and assign roles.",
        icon: Users,
        path: "/admin/users",
        color: "from-red-600 to-red-800",
    },
    {
        title: "Event Control",
        description: "Full event management.",
        icon: Settings,
        path: "/events",
        color: "from-gray-700 to-gray-900",
    },
    {
        title: "Analytics",
        description: "Comprehensive stats.",
        icon: BarChart,
        path: "/admin/analytics",
        color: "from-purple-700 to-purple-900",
    },
    {
        title: "System Settings",
        description: "Global configurations.",
        icon: Shield,
        path: "/admin/settings",
        color: "from-indigo-600 to-indigo-800",
    }
];

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [analytics, setAnalytics] = useState({
        totalUsers: 0,
        pendingUsers: 0,
        students: 0,
        members: 0
    });

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const res = await fetch(getApiUrl('/analytics'));
            if (res.ok) {
                const data = await res.json();
                setAnalytics(data);
            }
        } catch (error) {
            console.error("Failed to fetch analytics", error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (!user) return null;

    return (
        <div className="min-h-screen flex flex-col bg-dashboard-gray">
            <header className="bg-card border-b border-border sticky top-0 z-50">
                <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Logo />
                        <div className="hidden md:block border-l border-border pl-4">
                            <p className="font-medium text-foreground">Welcome, {user.full_name}</p>
                            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
                        </div>
                    </div>
                    <Button onClick={() => setMenuOpen(true)} variant="ghost" size="icon"><Menu /></Button>
                </div>
            </header>

            <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader><DialogTitle className="sr-only">Menu</DialogTitle></DialogHeader>
                    <nav className="space-y-2 py-4">
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 text-destructive text-left">
                            <LogOut className="w-5 h-5" /> <span>Logout</span>
                        </button>
                    </nav>
                </DialogContent>
            </Dialog>

            <main className="flex-1 container max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

                {/* Analytics Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                        <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                        <p className="text-2xl font-bold text-foreground">{analytics.totalUsers}</p>
                    </div>
                    <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                        <p className="text-sm text-muted-foreground mb-1">Pending Requests</p>
                        <p className="text-2xl font-bold text-orange-500">{analytics.pendingUsers}</p>
                    </div>
                    <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                        <p className="text-sm text-muted-foreground mb-1">Total Students</p>
                        <p className="text-2xl font-bold text-blue-500">{analytics.students}</p>
                    </div>
                    <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                        <p className="text-sm text-muted-foreground mb-1">Club Members</p>
                        <p className="text-2xl font-bold text-purple-500">{analytics.members}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {dashboardCards.map((card, index) => (
                        <Link key={card.title} to={card.path} className="group bg-card rounded-2xl shadow-card overflow-hidden hover:shadow-glow transition-all duration-300 animate-slide-up">
                            <div className={`h-32 bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                                <card.icon className="w-12 h-12 text-primary-foreground opacity-80" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary">{card.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4">{card.description}</p>
                                <div className="flex items-center text-primary text-sm font-medium"><span>Admin Control</span><ChevronRight className="w-4 h-4 ml-1" /></div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
