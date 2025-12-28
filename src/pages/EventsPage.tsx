import { Link } from "react-router-dom";
import { ChevronRight, Calculator, Brain, Hash, Puzzle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

const events = [
  { 
    id: "math-arena", 
    name: "Math Arena", 
    icon: Calculator,
    description: "The ultimate mathematics competition",
  },
  { 
    id: "logic-quest", 
    name: "Logic Quest", 
    icon: Brain,
    description: "Challenge your logical reasoning",
  },
  { 
    id: "number-ninja", 
    name: "Number Ninja", 
    icon: Hash,
    description: "Speed mathematics challenge",
  },
  { 
    id: "puzzle-marathon", 
    name: "Puzzle Marathon", 
    icon: Puzzle,
    description: "Endurance puzzle solving event",
  },
];

const EventsPage = () => {
  return (
    <div className="min-h-screen flex flex-col events-gradient">
      <PageHeader variant="events" backTo="/dashboard" />

      <main className="flex-1 container max-w-3xl mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-events-dark mb-4 animate-fade-in">
            Events
          </h1>
          <p className="text-events-deep/80 animate-slide-up">
            Have a look at our previous events.
          </p>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {events.map((event, index) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="group flex items-center gap-4 bg-card rounded-2xl shadow-card p-5 hover:shadow-glow transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-events-accent to-events-secondary flex items-center justify-center shrink-0">
                <event.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-events-accent transition-colors">
                  {event.name}
                </h3>
                <p className="text-sm text-muted-foreground truncate">{event.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-events-accent group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </main>

      <Footer variant="events" />
    </div>
  );
};

export default EventsPage;
