import { Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

interface FooterProps {
  variant?: "light" | "dark" | "about" | "events" | "detail" | "announce";
}

const Footer = ({ variant = "light" }: FooterProps) => {
  const bgClasses = {
    light: "bg-card border-t border-border",
    dark: "bg-dashboard-navy text-primary-foreground",
    about: "bg-about-cream border-t border-about-saffron/20",
    events: "bg-events-bg border-t border-events-soft/30",
    detail: "bg-detail-light border-t border-detail-teal/20",
    announce: "bg-announce-pink border-t border-announce-muted/20",
  };

  const textClasses = {
    light: "text-foreground",
    dark: "text-primary-foreground",
    about: "text-about-purple-deep",
    events: "text-events-dark",
    detail: "text-detail-dark",
    announce: "text-foreground",
  };

  const linkClasses = {
    light: "text-primary hover:text-primary/80",
    dark: "text-primary-foreground/80 hover:text-primary-foreground",
    about: "text-about-purple hover:text-about-saffron",
    events: "text-events-accent hover:text-events-secondary",
    detail: "text-detail-teal hover:text-detail-dark",
    announce: "text-announce-accent hover:text-announce-accent/80",
  };

  const mutedClasses = {
    light: "text-muted-foreground",
    dark: "text-primary-foreground/60",
    about: "text-muted-foreground",
    events: "text-events-deep/70",
    detail: "text-detail-dark/70",
    announce: "text-announce-muted",
  };

  return (
    <footer className={`py-8 ${bgClasses[variant]}`}>
      <div className="container max-w-5xl mx-auto px-4">
        <div className={`text-center ${textClasses[variant]}`}>
          <p className="font-serif text-lg font-medium mb-4">
            Math Club | Sathyabama Institute of Science and Technology
          </p>
          
          <div className="flex items-center justify-center gap-6 mb-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center gap-1 ${linkClasses[variant]} transition-colors`}
            >
              <Instagram className="w-4 h-4" />
              <span className="text-sm">Instagram</span>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center gap-1 ${linkClasses[variant]} transition-colors`}
            >
              <Linkedin className="w-4 h-4" />
              <span className="text-sm">LinkedIn</span>
            </a>
            <Link 
              to="/contact" 
              className={`flex items-center gap-1 ${linkClasses[variant]} transition-colors`}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">Contact</span>
            </Link>
            <a 
              href="mailto:mathclub@sathyabama.ac.in" 
              className={`flex items-center gap-1 ${linkClasses[variant]} transition-colors`}
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">Email</span>
            </a>
          </div>

          <div className={`border-t ${variant === 'dark' ? 'border-primary-foreground/20' : 'border-border'} pt-4`}>
            <p className={`text-sm ${mutedClasses[variant]}`}>
              © 2026 Math Club. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
