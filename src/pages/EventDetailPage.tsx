import { useParams, Link } from "react-router-dom";
import { Star, Image, MessageSquare, Users, BarChart3, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

const eventData: Record<string, { name: string; description: string }> = {
  "math-arena": { 
    name: "Math Arena", 
    description: "The ultimate mathematics competition where students battle with numbers and equations." 
  },
  "logic-quest": { 
    name: "Logic Quest", 
    description: "Challenge your logical reasoning skills with complex puzzles and brain teasers." 
  },
  "number-ninja": { 
    name: "Number Ninja", 
    description: "Speed mathematics challenge testing quick calculation abilities." 
  },
  "puzzle-marathon": { 
    name: "Puzzle Marathon", 
    description: "An endurance event solving puzzles across multiple categories." 
  },
};

const feedbackData = [
  { quote: "Amazing experience! Learned so much from participating.", rating: 5 },
  { quote: "Well organized event with great challenges.", rating: 4 },
  { quote: "Would definitely participate again next year!", rating: 5 },
];

const EventDetailPage = () => {
  const { eventId } = useParams();
  const event = eventData[eventId || ""] || { name: "Event", description: "Event details" };

  const sections = [
    { 
      id: "media", 
      title: "Event Media", 
      icon: Image,
      path: `/events/${eventId}/media`,
      preview: "Photos and videos from the event"
    },
    { 
      id: "feedback", 
      title: "Event Feedback", 
      icon: MessageSquare,
      path: `/events/${eventId}/feedback`,
      preview: "What people say"
    },
    { 
      id: "attendance", 
      title: "Event Attendance", 
      icon: Users,
      path: `/events/${eventId}/attendance`,
      preview: "Participation statistics"
    },
    { 
      id: "analytics", 
      title: "Event Analytics", 
      icon: BarChart3,
      path: `/events/${eventId}/analytics`,
      preview: "Performance metrics"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-detail-light">
      <PageHeader variant="detail" backTo="/events" />

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-12">
        {/* Event Title */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-detail-dark mb-4 animate-fade-in">
            {event.name}
          </h1>
          <p className="text-detail-dark/70 max-w-xl mx-auto animate-slide-up">
            {event.description}
          </p>
        </div>

        {/* Event Media Preview */}
        <section className="mb-8 animate-slide-up delay-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-semibold text-detail-dark flex items-center gap-2">
              <Image className="w-5 h-5 text-detail-teal" />
              Event Media
            </h2>
            <Link 
              to={`/events/${eventId}/media`}
              className="text-detail-teal hover:text-detail-dark text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="aspect-square rounded-xl bg-gradient-to-br from-detail-teal/20 to-detail-teal/10 border-2 border-detail-teal/30 flex items-center justify-center"
              >
                <Image className="w-8 h-8 text-detail-teal/50" />
              </div>
            ))}
          </div>
        </section>

        {/* Feedback Preview */}
        <section className="mb-8 animate-slide-up delay-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-semibold text-detail-dark flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-detail-teal" />
              Event Feedback
            </h2>
            <Link 
              to={`/events/${eventId}/feedback`}
              className="text-detail-teal hover:text-detail-dark text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="bg-card rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-5 h-5 ${star <= 4 ? "text-detail-teal fill-detail-teal" : "text-muted"}`} 
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">4.5 / 5.0</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">What people say</p>
            <div className="space-y-3">
              {feedbackData.slice(0, 2).map((feedback, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-detail-light/50 rounded-lg">
                  <Quote className="w-4 h-4 text-detail-teal shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground italic">{feedback.quote}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Attendance Preview */}
        <section className="mb-8 animate-slide-up delay-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-semibold text-detail-dark flex items-center gap-2">
              <Users className="w-5 h-5 text-detail-teal" />
              Event Attendance
            </h2>
            <Link 
              to={`/events/${eventId}/attendance`}
              className="text-detail-teal hover:text-detail-dark text-sm font-medium"
            >
              View Details →
            </Link>
          </div>
          <div className="bg-card rounded-2xl shadow-card p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-detail-light/50 rounded-xl">
                <p className="text-3xl font-bold text-detail-dark mb-1">156</p>
                <p className="text-sm text-muted-foreground">Registered</p>
              </div>
              <div className="text-center p-4 bg-detail-teal/10 rounded-xl">
                <p className="text-3xl font-bold text-detail-teal mb-1">142</p>
                <p className="text-sm text-muted-foreground">Attended</p>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics Preview */}
        <section className="animate-slide-up delay-400">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-semibold text-detail-dark flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-detail-teal" />
              Event Analytics
            </h2>
            <Link 
              to={`/events/${eventId}/analytics`}
              className="text-detail-teal hover:text-detail-dark text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="bg-card rounded-2xl shadow-card p-6">
            <div className="h-32 flex items-end justify-around gap-2">
              {[60, 80, 45, 90, 70, 85].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-detail-teal to-detail-teal/60 rounded-t-md transition-all hover:from-detail-dark hover:to-detail-teal"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-muted-foreground mt-2">Q{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {sections.map((section) => (
            <Link
              key={section.id}
              to={section.path}
              className="group bg-card rounded-xl shadow-soft p-4 hover:shadow-card transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-detail-teal/10 flex items-center justify-center shrink-0">
                <section.icon className="w-5 h-5 text-detail-teal" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{section.title}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </main>

      <Footer variant="detail" />
    </div>
  );
};

export default EventDetailPage;
