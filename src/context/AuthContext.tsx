import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { getApiUrl } from "@/utils/api";

interface User {
    id: number;
    email: string;
    role: string;
    full_name: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (data: any) => Promise<boolean>;
    register: (data: any) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved token on mount
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");
        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (data: any) => {
        try {
            const response = await fetch(getApiUrl("/auth/login"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.error || "Login failed");
                return false;
            }

            setToken(result.token);
            setUser(result.user);
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));
            toast.success("Login successful!");
            return true;
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("An error occurred during login");
            return false;
        }
    };

    const register = async (data: any) => {
        try {
            const response = await fetch(getApiUrl("/auth/register"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.error || "Registration failed");
                return false;
            }

            toast.success(result.message || "Registration successful! Please login.");
            return true;
        } catch (error) {
            console.error("Registration Error:", error);
            toast.error("An error occurred during registration");
            return false;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.info("Logged out successfully");
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
