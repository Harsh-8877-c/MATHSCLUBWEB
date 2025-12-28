import { Calendar, Clock } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

const announcements = [
  {
    id: 1,
    title: "Club Discussion Meeting",
    description: "We are going to conduct an event. We need to have a discussion among all the club members, so please do join on time.",
    date: "15 / 01 / 2026",
    time: "03:00 PM",
  },
  {
    id: 2,
    title: "Mathematics Workshop",
    description: "Join us for an exciting workshop on Advanced Calculus and its real-world applications. Guest speaker from IIT Chennai will be conducting the session.",
    date: "22 / 01 / 2026",
    time: "10:00 AM",
  },
  {
    id: 3,
    title: "Inter-College Math Quiz",
    description: "Prepare for the upcoming inter-college mathematics quiz competition. Registrations are now open. Teams of 3 members can participate.",
    date: "05 / 02 / 2026",
    time: "09:30 AM",
  },
  {
    id: 4,
    title: "Pi Day Celebration",
    description: "Celebrate Pi Day with fun activities, puzzles, and prizes! There will be a pie-eating contest and math trivia games for all members.",
    date: "14 / 03 / 2026",
    time: "02:00 PM",
  },
];

const AnnouncementsPage = () => {
  return (
    <div className="min-h-screen flex flex-col announce-gradient">
      <PageHeader variant="announce" backTo="/dashboard" />

      <main className="flex-1 container max-w-3xl mx-auto px-4 py-12">
        {/* Page Title */}
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-12 text-foreground animate-fade-in">
          Announcements
        </h1>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement, index) => (
            <div 
              key={announcement.id} 
              className="bg-card rounded-2xl shadow-card p-6 animate-slide-up hover:shadow-glow transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="font-semibold text-lg text-foreground mb-2">
                {announcement.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {announcement.description}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-announce-pink rounded-lg">
                  <Calendar className="w-4 h-4 text-announce-accent" />
                  <span className="text-sm font-medium text-foreground">{announcement.date}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-announce-pink rounded-lg">
                  <Clock className="w-4 h-4 text-announce-accent" />
                  <span className="text-sm font-medium text-foreground">{announcement.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer variant="announce" />
    </div>
  );
};

export default AnnouncementsPage;
