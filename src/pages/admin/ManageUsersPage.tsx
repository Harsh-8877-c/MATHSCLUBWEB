import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Trash2, Shield, UserX, Search, AlertCircle, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "@/utils/api";


interface User {
    id: number;
    full_name: string;
    email: string;
    role: string;
    is_approved: number; // MySQL boolean is 0/1
    created_at: string;
}

const ManageUsersPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);

    useEffect(() => {
        if (!user || user.role !== 'Admin') {
            navigate("/"); // Or unauthorized
            return;
        }
        fetchUsers();
    }, [user, navigate]);


    const fetchUsers = async () => {
        try {
            const res = await fetch(getApiUrl('/users')); // Add auth header in real app
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            const res = await fetch(getApiUrl(`/users/${deleteId}`), {
                method: 'DELETE'
            });

            if (res.ok) {
                setUsers(users.filter(u => u.id !== deleteId));
                toast.success("User deleted successfully");
            } else {
                toast.error("Failed to delete user");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting user");
        } finally {
            setDeleteId(null);
        }
    };

    const handleApprove = async (userId: number) => {
        try {
            const res = await fetch(getApiUrl(`/users/${userId}/approve`), {
                method: 'PUT'
            });

            if (res.ok) {
                setUsers(users.map(u => u.id === userId ? { ...u, is_approved: 1 } : u));
                toast.success("User approved successfully");
            } else {
                toast.error("Failed to approve user");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error approving user");
        }
    };

    const filteredUsers = users.filter(u =>
        u.full_name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col bg-dashboard-gray">
            <div className="container max-w-6xl mx-auto px-4 py-8 flex-1">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Manage Users</h1>
                        <p className="text-muted-foreground">View and manage registered users.</p>
                    </div>
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            placeholder="Search users..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                    {loading ? (
                        <div className="p-8 text-center text-muted-foreground">Loading users...</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredUsers.map((u) => (
                                        <TableRow key={u.id}>
                                            <TableCell>
                                                <div className="font-medium">{u.full_name}</div>
                                                <div className="text-xs text-muted-foreground">{u.email}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={u.role === 'Admin' ? 'default' : 'secondary'}>
                                                    {u.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${u.is_approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {u.is_approved ? 'Approved' : 'Pending'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {u.role !== 'Admin' && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive hover:bg-destructive/10"
                                                        onClick={() => setDeleteId(u.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                )}
                                                {!u.is_approved && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-green-600 hover:bg-green-100 ml-1"
                                                        onClick={() => handleApprove(u.id)}
                                                        title="Approve User"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>

            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the user account and remove their data from the system.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete User
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Footer />
        </div>
    );
};

export default ManageUsersPage;
