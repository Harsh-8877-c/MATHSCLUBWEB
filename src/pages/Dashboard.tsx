import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, User, LogOut, LayoutDashboard, ChevronRight, Calendar, Users, Megaphone, FileText, CheckSquare, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

interface UserData {
  email: string;
  role: string;
  fullName: string;
}

const navItems = [
  { label: "Register", path: "/register-event" },
  { label: "About Us", path: "/about" },
  { label: "Events", path: "/events" },
  { label: "Announcements", path: "/announcements" },
];

const dashboardCards = [
  {
    title: "Register",
    description: "Don't miss out! Register now.",
    icon: FileText,
    path: "/register-event",
    color: "from-dashboard-teal to-dashboard-teal/80",
    allowedRoles: ["Student", "ClubMember", "Admin"],
  },
  {
    title: "About Us",
    description: "The people behind The Math Club",
    icon: Users,
    path: "/about",
    color: "from-about-purple to-about-purple/80",
    allowedRoles: ["Student", "Coordinator", "ClubMember", "Admin"],
  },
  {
    title: "Events",
    description: "Explore previous and upcoming events.",
    icon: Calendar,
    path: "/events",
    color: "from-events-accent to-events-secondary",
    allowedRoles: ["Student", "Coordinator", "ClubMember", "Admin"],
  },
  {
    title: "Announcements",
    description: "Stay in the loop with club updates.",
    icon: Megaphone,
    path: "/announcements",
    color: "from-announce-accent to-announce-accent/80",
    allowedRoles: ["Student", "Coordinator", "ClubMember", "Admin"],
  },
  {
    title: "Attendance",
    description: "Mark attendance for events.",
    icon: CheckSquare,
    path: "/attendance",
    color: "from-orange-400 to-orange-600",
    allowedRoles: ["Coordinator", "Admin"],
  },
  {
    title: "Manage Users",
    description: "Approve and manage users.",
    icon: Users,
    path: "/admin/users",
    color: "from-red-500 to-red-700",
    allowedRoles: ["Admin"],
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Register");

  // Filter cards based on user role
  const visibleCards = dashboardCards.filter(card =>
    user && card.allowedRoles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getRoleLabel = (role: string) => {
    const roleLabels: Record<string, string> = {
      student: "Student",
      coordinator: "Coordinator",
      member: "Club Member",
      admin: "Admin",
    };
    return roleLabels[role] || role;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-dashboard-gray">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <div className="hidden md:block border-l border-border pl-4">
              <p className="font-medium text-foreground">Welcome, {user.full_name}</p>
              <p className="text-xs text-muted-foreground">{getRoleLabel(user.role)}</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(true)}
            className="text-foreground"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="sr-only">Menu</DialogTitle>
          </DialogHeader>
          <nav className="space-y-2 py-4">
            <button
              onClick={() => {
                setProfileOpen(true);
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-left"
            >
              <User className="w-5 h-5 text-primary" />
              <span>View Profile</span>
            </button>
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              <LayoutDashboard className="w-5 h-5 text-primary" />
              <span>Dashboard</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 text-destructive transition-colors text-left"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </DialogContent>
      </Dialog>

      {/* Profile Modal */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Your Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4 p-4 bg-accent rounded-xl">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-lg">{user.full_name}</p>
                <p className="text-sm text-muted-foreground">{getRoleLabel(user.role)}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Full Name</span>
                <span className="font-medium">{user.full_name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium">{getRoleLabel(user.role)}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Navigation Bar */}
      <nav className="bg-card border-b border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setActiveNav(item.label)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeNav === item.label
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-8">
        <div className="md:hidden mb-6">
          <p className="font-medium text-foreground">Welcome, {user.full_name}</p>
          <p className="text-sm text-muted-foreground">{getRoleLabel(user.role)}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {visibleCards.map((card, index) => (
            <Link
              key={card.title}
              to={card.path}
              className={`group bg-card rounded-2xl shadow-card overflow-hidden hover:shadow-glow transition-all duration-300 animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`h-32 bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <card.icon className="w-12 h-12 text-primary-foreground opacity-80" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{card.description}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  <span>Enroll</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
