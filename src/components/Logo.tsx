import { Sigma } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "light" | "dark" | "about" | "events" | "detail" | "announce";
  showText?: boolean;
}

const Logo = ({ variant = "light", showText = true }: LogoProps) => {
  const iconClasses = {
    light: "text-primary",
    dark: "text-primary-foreground",
    about: "text-about-purple",
    events: "text-events-dark",
    detail: "text-detail-dark",
    announce: "text-announce-accent",
  };

  const textClasses = {
    light: "text-foreground",
    dark: "text-primary-foreground",
    about: "text-about-purple-deep",
    events: "text-events-dark",
    detail: "text-detail-dark",
    announce: "text-foreground",
  };

  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-soft group-hover:shadow-md transition-shadow`}>
        <Sigma className="w-5 h-5 text-primary-foreground" />
      </div>
      {showText && (
        <span className={`font-serif font-bold text-lg ${textClasses[variant]}`}>
          Math Club
        </span>
      )}
    </Link>
  );
};

export default Logo;
