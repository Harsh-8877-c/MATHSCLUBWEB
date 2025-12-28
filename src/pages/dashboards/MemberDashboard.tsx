import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, User, LogOut, Users, Settings, Megaphone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const dashboardCards = [
    {
        title: "Internal Announcements",
        description: "Updates for club members.",
        icon: Megaphone,
        path: "/announcements",
        color: "from-blue-500 to-blue-700",
    },
    {
        title: "Meeting Details",
        description: "Schedule and minutes.",
        icon: Users,
        path: "/meetings", // Placeholder path
        color: "from-purple-500 to-purple-700",
    },
    {
        title: "Event Support",
        description: "Volunteer tasks.",
        icon: Settings,
        path: "/tasks", // Placeholder path
        color: "from-green-500 to-green-700",
    }
];

const MemberDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

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
                            <p className="text-xs text-muted-foreground">Club Member Dashboard</p>
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
                <h1 className="text-3xl font-bold mb-6">Member Dashboard</h1>
                <div className="grid md:grid-cols-2 gap-6">
                    {dashboardCards.map((card, index) => (
                        <Link key={card.title} to={card.path} className="group bg-card rounded-2xl shadow-card overflow-hidden hover:shadow-glow transition-all duration-300 animate-slide-up">
                            <div className={`h-32 bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                                <card.icon className="w-12 h-12 text-primary-foreground opacity-80" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary">{card.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4">{card.description}</p>
                                <div className="flex items-center text-primary text-sm font-medium"><span>Access</span><ChevronRight className="w-4 h-4 ml-1" /></div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MemberDashboard;
