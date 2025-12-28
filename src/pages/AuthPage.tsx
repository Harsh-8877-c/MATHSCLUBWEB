import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Users, GraduationCap, UserCheck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

const roles = [
  { value: "Student", label: "Student", icon: GraduationCap },
  { value: "Coordinator", label: "Coordinator", icon: UserCheck },
  { value: "ClubMember", label: "Club Member", icon: Users },
  { value: "Admin", label: "Admin", icon: Shield },
];

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, register, loading } = useAuth(); // Assuming loading is exposed
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [loginData, setLoginData] = useState({
    role: "",
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    role: "",
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.role || !loginData.email || !loginData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    await login({
      email: loginData.email,
      password: loginData.password,
      role: loginData.role
    });

    // Navigation is handled inside AuthContext or effect, but for now we keep the redirect logic here if AuthContext returns success boolean
    // However, looking at previous code, login returned boolean.
    // Let's rely on the previous implementation which used `const success = await login(...)`
  };

  // Re-implementing with exact previous logic but adding loading state usage

  const onLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.role || !loginData.email || !loginData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const success = await login({
      email: loginData.email,
      password: loginData.password,
      role: loginData.role
    });

    if (success) {
      switch (loginData.role) {
        case "Student": navigate("/student-dashboard"); break;
        case "ClubMember": navigate("/member-dashboard"); break;
        case "Coordinator": navigate("/coordinator-dashboard"); break;
        case "Admin": navigate("/admin-dashboard"); break;
        default: navigate("/");
      }
    }
  };

  const onRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.role || !registerData.fullName || !registerData.username ||
      !registerData.email || !registerData.password || !registerData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!registerData.email.endsWith('@gmail.com')) {
      toast.error("write valid email id");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const success = await register({
      full_name: registerData.fullName,
      email: registerData.email,
      password: registerData.password,
      role: registerData.role
    });

    if (success) {
      setActiveTab("login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Panel - Motivation */}
        <div className="lg:w-1/2 auth-gradient noise-texture p-8 lg:p-16 flex flex-col justify-center relative overflow-hidden">
          <div className="max-w-lg mx-auto animate-fade-in">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-2">
                <span className="text-auth-blue">Unlock your potential.</span>
              </h1>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold">
                <span className="text-auth-lavender">Solve the unsolvable.</span>
              </h1>
            </div>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Join a community of problem solvers, innovators, and math enthusiasts.
              Prepare for competitions, attend workshops, and challenge yourself.
            </p>

            <div className="glass-card rounded-2xl p-6 inline-block">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-serif font-bold text-auth-blue">+450</div>
                <div className="text-left">
                  <div className="font-medium">Participants</div>
                  <p className="text-sm text-muted-foreground italic">
                    "The best math community I've joined!"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-auth-blue/10 rounded-full blur-3xl" />
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-auth-lavender/20 rounded-full blur-3xl" />
        </div>

        {/* Right Panel - Auth Form */}
        <div className="lg:w-1/2 bg-card flex flex-col justify-center p-8 lg:p-16">
          <div className="max-w-md mx-auto w-full animate-slide-up">
            {/* Branding */}
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground mb-1">
                Sathyabama Institute of Science and Technology
              </p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Logo />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium text-foreground">Grow with us</p>
                <p className="text-sm text-muted-foreground">Learn. Think. Evolve.</p>
              </div>
            </div>

            {/* Auth Card */}
            <div className="bg-card rounded-2xl shadow-card p-6 border border-border">
              {/* Tabs */}
              <div className="flex mb-6 border-b border-border">
                <button
                  onClick={() => setActiveTab("login")}
                  className={`flex-1 py-3 text-sm font-medium transition-colors relative ${activeTab === "login"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  Login
                  {activeTab === "login" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("register")}
                  className={`flex-1 py-3 text-sm font-medium transition-colors relative ${activeTab === "register"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  Register
                  {activeTab === "register" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              </div>

              {/* Login Form */}
              {activeTab === "login" && (
                <form onSubmit={onLoginSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="login-role">Select Role</Label>
                    <Select
                      value={loginData.role}
                      onValueChange={(value) => setLoginData({ ...loginData, role: value })}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Choose your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            <div className="flex items-center gap-2">
                              <role.icon className="w-4 h-4" />
                              {role.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="login-email">Username or Email</Label>
                    <Input
                      id="login-email"
                      type="text"
                      placeholder="Enter your email or username"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" variant="auth" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              )}

              {/* Register Form */}
              {activeTab === "register" && (
                <form onSubmit={onRegisterSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="register-role">Select Role</Label>
                    <Select
                      value={registerData.role}
                      onValueChange={(value) => setRegisterData({ ...registerData, role: value })}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Choose your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            <div className="flex items-center gap-2">
                              <role.icon className="w-4 h-4" />
                              {role.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={registerData.fullName}
                      onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-username">Username</Label>
                    <Input
                      id="register-username"
                      type="text"
                      placeholder="Choose a username"
                      value={registerData.username}
                      onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-password">Create Password</Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="register-confirm">Confirm Password</Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="register-confirm"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" variant="auth" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                  </Button>

                  {registerData.role !== 'Admin' && (
                    <p className="text-xs text-muted-foreground text-center">
                      Registration requires admin approval.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AuthPage;
