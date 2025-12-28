import { useParams, Link } from "react-router-dom";
import { Image, MessageSquare, Users, BarChart3, Star, Quote, ArrowLeft, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

// Event Section Components
const EventMediaSection = ({ eventId }: { eventId: string }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <div 
          key={i} 
          className="aspect-square rounded-xl bg-gradient-to-br from-detail-teal/20 to-detail-teal/10 border-2 border-detail-teal/30 flex items-center justify-center group hover:border-detail-teal transition-colors cursor-pointer"
        >
          <Image className="w-10 h-10 text-detail-teal/50 group-hover:text-detail-teal transition-colors" />
        </div>
      ))}
    </div>
    <div className="flex items-center justify-center gap-2">
      <Button variant="outline" size="icon" className="rounded-full">
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <span className="text-sm text-muted-foreground">Page 1 of 3</span>
      <Button variant="outline" size="icon" className="rounded-full">
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  </div>
);

const EventFeedbackSection = ({ eventId }: { eventId: string }) => {
  const feedbacks = [
    { name: "Rahul S.", quote: "Amazing experience! Learned so much from participating.", rating: 5 },
    { name: "Priya M.", quote: "Well organized event with great challenges.", rating: 4 },
    { name: "Arjun K.", quote: "Would definitely participate again next year!", rating: 5 },
    { name: "Sneha L.", quote: "The puzzles were challenging but fun!", rating: 5 },
    { name: "Karthik R.", quote: "Great learning experience for students.", rating: 4 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-2xl shadow-card p-6 text-center">
        <p className="text-4xl font-bold text-detail-dark mb-2">4.5</p>
        <div className="flex items-center justify-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className={`w-6 h-6 ${star <= 4 ? "text-detail-teal fill-detail-teal" : "text-muted fill-muted"}`} 
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Based on 45 reviews</p>
      </div>

      <div className="space-y-4">
        {feedbacks.map((feedback, i) => (
          <div key={i} className="bg-card rounded-xl shadow-soft p-5">
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-4 h-4 ${star <= feedback.rating ? "text-detail-teal fill-detail-teal" : "text-muted"}`} 
                />
              ))}
            </div>
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-detail-teal shrink-0 mt-0.5" />
              <div>
                <p className="text-foreground italic mb-2">{feedback.quote}</p>
                <p className="text-sm text-muted-foreground">— {feedback.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EventAttendanceSection = ({ eventId }: { eventId: string }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-card rounded-2xl shadow-card p-6 text-center">
        <Users className="w-10 h-10 text-detail-dark mx-auto mb-3" />
        <p className="text-4xl font-bold text-detail-dark mb-1">156</p>
        <p className="text-muted-foreground">Registered</p>
      </div>
      <div className="bg-gradient-to-br from-detail-teal to-detail-teal/80 rounded-2xl shadow-card p-6 text-center text-primary-foreground">
        <Users className="w-10 h-10 mx-auto mb-3 opacity-80" />
        <p className="text-4xl font-bold mb-1">142</p>
        <p className="opacity-80">Attended</p>
      </div>
    </div>

    <div className="bg-card rounded-2xl shadow-card p-6">
      <h3 className="font-semibold text-detail-dark mb-4">Attendance by Department</h3>
      <div className="space-y-4">
        {[
          { dept: "Computer Science", count: 45, percent: 32 },
          { dept: "Electronics", count: 38, percent: 27 },
          { dept: "Mechanical", count: 28, percent: 20 },
          { dept: "Civil", count: 18, percent: 13 },
          { dept: "Others", count: 13, percent: 8 },
        ].map((item) => (
          <div key={item.dept}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-foreground">{item.dept}</span>
              <span className="text-muted-foreground">{item.count} ({item.percent}%)</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-detail-teal rounded-full transition-all"
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const EventAnalyticsSection = ({ eventId }: { eventId: string }) => (
  <div className="space-y-6">
    <div className="bg-card rounded-2xl shadow-card p-6">
      <h3 className="font-semibold text-detail-dark mb-6">Performance by Round</h3>
      <div className="h-48 flex items-end justify-around gap-3">
        {[
          { round: "R1", score: 85 },
          { round: "R2", score: 72 },
          { round: "R3", score: 91 },
          { round: "R4", score: 68 },
          { round: "Final", score: 78 },
        ].map((item) => (
          <div key={item.round} className="flex-1 flex flex-col items-center">
            <div className="w-full flex flex-col items-center justify-end h-40">
              <span className="text-sm font-medium text-detail-dark mb-2">{item.score}%</span>
              <div 
                className="w-full bg-gradient-to-t from-detail-teal to-detail-teal/60 rounded-t-lg transition-all hover:from-detail-dark hover:to-detail-teal"
                style={{ height: `${item.score}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground mt-3 font-medium">{item.round}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="bg-card rounded-xl shadow-soft p-5 text-center">
        <p className="text-2xl font-bold text-detail-dark mb-1">78%</p>
        <p className="text-sm text-muted-foreground">Average Score</p>
      </div>
      <div className="bg-card rounded-xl shadow-soft p-5 text-center">
        <p className="text-2xl font-bold text-detail-teal mb-1">91%</p>
        <p className="text-sm text-muted-foreground">Highest Score</p>
      </div>
      <div className="bg-card rounded-xl shadow-soft p-5 text-center">
        <p className="text-2xl font-bold text-detail-dark mb-1">45min</p>
        <p className="text-sm text-muted-foreground">Avg Completion</p>
      </div>
      <div className="bg-card rounded-xl shadow-soft p-5 text-center">
        <p className="text-2xl font-bold text-detail-teal mb-1">23min</p>
        <p className="text-sm text-muted-foreground">Fastest Time</p>
      </div>
    </div>

    <Button variant="detail" className="w-full gap-2">
      <Download className="w-4 h-4" />
      Download Full Report
    </Button>
  </div>
);

const eventNames: Record<string, string> = {
  "math-arena": "Math Arena",
  "logic-quest": "Logic Quest",
  "number-ninja": "Number Ninja",
  "puzzle-marathon": "Puzzle Marathon",
};

const sectionTitles: Record<string, { title: string; icon: any }> = {
  media: { title: "Event Media", icon: Image },
  feedback: { title: "Event Feedback", icon: MessageSquare },
  attendance: { title: "Event Attendance", icon: Users },
  analytics: { title: "Event Analytics", icon: BarChart3 },
};

const EventSectionPage = () => {
  const { eventId, section } = useParams();
  const eventName = eventNames[eventId || ""] || "Event";
  const sectionInfo = sectionTitles[section || ""] || { title: "Section", icon: Image };

  const renderSection = () => {
    switch (section) {
      case "media":
        return <EventMediaSection eventId={eventId || ""} />;
      case "feedback":
        return <EventFeedbackSection eventId={eventId || ""} />;
      case "attendance":
        return <EventAttendanceSection eventId={eventId || ""} />;
      case "analytics":
        return <EventAnalyticsSection eventId={eventId || ""} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-detail-light">
      <PageHeader variant="detail" backTo={`/events/${eventId}`} />

      <main className="flex-1 container max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/events" className="hover:text-detail-teal transition-colors">Events</Link>
          <span>/</span>
          <Link to={`/events/${eventId}`} className="hover:text-detail-teal transition-colors">{eventName}</Link>
          <span>/</span>
          <span className="text-detail-dark">{sectionInfo.title}</span>
        </div>

        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-detail-teal flex items-center justify-center">
            <sectionInfo.icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-detail-dark">{sectionInfo.title}</h1>
            <p className="text-sm text-muted-foreground">{eventName}</p>
          </div>
        </div>

        {/* Section Content */}
        {renderSection()}
      </main>

      <Footer variant="detail" />
    </div>
  );
};

export default EventSectionPage;
