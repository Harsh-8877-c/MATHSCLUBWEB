import { ExternalLink, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

const RegisterEventPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-card">
      <PageHeader variant="light" backTo="/dashboard" />

      <main className="flex-1 container max-w-3xl mx-auto px-4 py-12">
        {/* Page Title */}
        <h1 className="font-serif text-4xl font-bold text-center mb-12 text-foreground animate-fade-in">
          Register
        </h1>

        <div className="space-y-8">
          {/* Event Link Card */}
          <div className="bg-card rounded-2xl border border-border shadow-card p-6 animate-slide-up">
            <h2 className="font-semibold text-lg mb-2 text-foreground">Event Link</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Access the official registration portal to sign up for the event.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open Registration Portal
            </a>
          </div>

          {/* About the Event Card */}
          <div className="bg-card rounded-2xl border border-border shadow-card p-6 animate-slide-up delay-100">
            <h2 className="font-semibold text-lg mb-2 text-foreground">About the Event</h2>
            <p className="text-muted-foreground text-sm mb-4">
              This is a <span className="font-medium text-foreground">Tech / Non-Tech</span> event. 
              Click to know more details about the competition format, rules, and prizes.
            </p>
            <button className="text-primary hover:text-primary/80 font-medium transition-colors text-sm">
              Learn more →
            </button>
          </div>

          {/* Brochure Card */}
          <div className="bg-card rounded-2xl border border-border shadow-card p-6 animate-slide-up delay-200">
            <h2 className="font-semibold text-lg mb-4 text-foreground">Brochure</h2>
            <div className="bg-secondary/50 rounded-xl border border-border p-8 flex flex-col items-center justify-center min-h-[200px]">
              <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground mb-1">Event Brochure</p>
              <p className="text-sm text-muted-foreground mb-4">PDF · 2.4 MB</p>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                View / Download
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterEventPage;
