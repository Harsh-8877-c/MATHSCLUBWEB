import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, MapPin, Type } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getApiUrl } from "@/utils/api";

const CreateEventPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
    });

    if (!user || !['Admin', 'Coordinator', 'ClubMember'].includes(user.role)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">Access Denied</p>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(getApiUrl('/events'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored here
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                toast.success("Event created successfully!");
                navigate("/events");
            } else {
                const error = await res.json();
                toast.error(error.error || "Failed to create event");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col events-gradient">
            <PageHeader variant="events" backTo="/events" />

            <main className="flex-1 container max-w-2xl mx-auto px-4 py-12">
                <div className="text-center mb-10">
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-events-dark mb-4">
                        Create New Event
                    </h1>
                    <p className="text-events-deep/80">
                        Share a new opportunity with the community.
                    </p>
                </div>

                <div className="bg-card/80 backdrop-blur-md rounded-2xl shadow-card border border-white/20 p-8 animate-slide-up">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-foreground">Event Title</Label>
                            <div className="relative">
                                <Type className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="title"
                                    placeholder="e.g. Math Olympiad 2025"
                                    className="pl-10"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-foreground">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="What is this event about?"
                                className="min-h-[100px]"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Date */}
                            <div className="space-y-2">
                                <Label htmlFor="date" className="text-foreground">Date</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="date"
                                        type="date"
                                        className="pl-10"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Time */}
                            <div className="space-y-2">
                                <Label htmlFor="time" className="text-foreground">Time</Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="time"
                                        type="time"
                                        className="pl-10"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-foreground">Location</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="location"
                                    placeholder="e.g. Hall A, Main Block"
                                    className="pl-10"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit" size="lg" className="w-full bg-events-accent hover:bg-events-accent/90 text-white shadow-lg" disabled={loading}>
                            {loading ? "Creating..." : "Publish Event"}
                        </Button>

                    </form>
                </div>
            </main>

            <Footer variant="events" />
        </div>
    );
};

export default CreateEventPage;
