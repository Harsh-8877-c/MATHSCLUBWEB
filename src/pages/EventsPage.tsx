import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Calculator, Brain, Hash, Puzzle, Plus, Trash2, Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getApiUrl } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status?: string;
}

const EventsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Check permissions
  const canManageEvents = user && ['Admin', 'Coordinator', 'ClubMember'].includes(user.role);
  const canDeleteEvents = user && user.role === 'Admin';

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(getApiUrl('/events'));
      if (res.ok) {
        setEvents(await res.json());
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, eventId: number) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(getApiUrl(`/events/${eventId}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.ok) {
        toast.success("Event deleted successfully");
        fetchEvents();
      } else {
        toast.error("Failed to delete event");
      }
    } catch (error) {
      toast.error("Error deleting event");
    }
  };

  const getDashboardPath = () => {
    switch (user?.role) {
      case "Admin": return "/admin-dashboard";
      case "Coordinator": return "/coordinator-dashboard";
      case "ClubMember": return "/member-dashboard";
      case "Student": return "/student-dashboard";
      default: return "/";
    }
  };

  return (
    <div className="min-h-screen flex flex-col events-gradient">
      <PageHeader variant="events" backTo={getDashboardPath()} />

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-events-dark mb-4 animate-fade-in">
            Events
          </h1>
          <p className="text-events-deep/80 animate-slide-up">
            Have a look at our previous events.
          </p>

          {canManageEvents && (
            <div className="mt-6 animate-fade-in">
              <Button onClick={() => navigate('/events/create')} className="bg-events-accent hover:bg-events-accent/90 text-white gap-2 shadow-lg hover:shadow-xl transition-all">
                <Plus className="w-4 h-4" /> Create New Event
              </Button>
            </div>
          )}
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center text-muted-foreground">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-center p-8 bg-card/50 rounded-2xl border border-dashed border-border/50">
              <p className="text-muted-foreground">No upcoming events scheduled.</p>
            </div>
          ) : (
            events.map((event, index) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="group relative flex flex-col md:flex-row gap-6 bg-card rounded-2xl shadow-card p-6 hover:shadow-glow transition-all duration-300 animate-slide-up border border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-10">
                  {canDeleteEvents && (
                    <button
                      onClick={(e) => handleDelete(e, event.id)}
                      className="p-2 bg-white/80 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-sm backdrop-blur-sm"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Icon/Image Placeholder */}
                <div className="w-full md:w-48 aspect-video md:aspect-square rounded-xl bg-gradient-to-br from-events-accent/10 to-events-secondary/10 flex items-center justify-center shrink-0 border border-events-accent/20">
                  <Calendar className="w-10 h-10 text-events-accent" />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-events-accent/10 text-events-accent text-xs font-medium mb-2">
                      {event.status || 'Upcoming'}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-events-accent transition-colors">
                      {event.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground line-clamp-2 mb-4">{event.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground/80">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-events-accent" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-events-accent" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <MapPin className="w-4 h-4 text-events-accent" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center md:justify-end">
                  <div className="w-10 h-10 rounded-full bg-events-accent/10 flex items-center justify-center group-hover:bg-events-accent group-hover:text-white transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>

      <Footer variant="events" />
    </div>
  );
};

export default EventsPage;
