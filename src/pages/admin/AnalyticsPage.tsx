import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, UserCheck, GraduationCap, Shield } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { getApiUrl } from "@/utils/api";

interface AnalyticsData {
    totalUsers: number;
    pendingUsers: number;
    students: number;
    members: number;
    userGrowth: { month: string; count: number }[];
    studentGrowth: { month: string; count: number }[];
}

const AnalyticsPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [analytics, setAnalytics] = useState<AnalyticsData>({
        totalUsers: 0,
        pendingUsers: 0,
        students: 0,
        members: 0,
        userGrowth: [],
        studentGrowth: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || user.role !== 'Admin') {
            navigate("/");
            return;
        }
        fetchAnalytics();
    }, [user, navigate]);

    const fetchAnalytics = async () => {
        try {
            const res = await fetch(getApiUrl('/analytics'));
            if (res.ok) {
                const data = await res.json();
                setAnalytics(data);
            }
        } catch (error) {
            console.error("Failed to fetch analytics", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-dashboard-gray">
            <div className="container max-w-6xl mx-auto px-4 py-8 flex-1">
                <Button
                    variant="ghost"
                    className="mb-6 pl-0 hover:bg-transparent hover:text-primary"
                    onClick={() => navigate("/admin-dashboard")}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Button>

                <h1 className="text-3xl font-bold mb-2">System Analytics</h1>
                <p className="text-muted-foreground mb-8">Detailed overview of platform statistics.</p>

                {loading ? (
                    <div className="p-8 text-center text-muted-foreground">Loading analytics...</div>
                ) : (
                    <div className="space-y-8">
                        {/* Key Metrics Cards */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Total Users</p>
                                        <h3 className="text-2xl font-bold">{analytics.totalUsers}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-orange-500/10 rounded-lg text-orange-500">
                                        <UserCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Pending Approvals</p>
                                        <h3 className="text-2xl font-bold">{analytics.pendingUsers}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                                        <GraduationCap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Students</p>
                                        <h3 className="text-2xl font-bold">{analytics.students}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
                                        <Shield className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Club Members</p>
                                        <h3 className="text-2xl font-bold">{analytics.members}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Charts Section */}
                        <div className="grid lg:grid-cols-2 gap-6">
                            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                                <h3 className="text-lg font-semibold mb-6">Total User Growth</h3>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={analytics.userGrowth}>
                                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                            <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                            />
                                            <Legend />
                                            <Line type="monotone" dataKey="count" name="New Users" stroke="#8884d8" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                                <h3 className="text-lg font-semibold mb-6">Student Registration Trends</h3>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={analytics.studentGrowth}>
                                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                            <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                            <Tooltip
                                                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                                contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                            />
                                            <Legend />
                                            <Bar dataKey="count" name="New Students" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default AnalyticsPage;
