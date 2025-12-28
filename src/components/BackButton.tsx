import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  to?: string;
  label?: string;
  variant?: "light" | "dark" | "about" | "events" | "detail" | "announce";
}

const BackButton = ({ to, label = "Back", variant = "light" }: BackButtonProps) => {
  const navigate = useNavigate();

  const colorClasses = {
    light: "text-primary hover:text-primary/80",
    dark: "text-primary-foreground hover:text-primary-foreground/80",
    about: "text-about-purple hover:text-about-saffron",
    events: "text-events-accent hover:text-events-secondary",
    detail: "text-detail-teal hover:text-detail-dark",
    announce: "text-announce-accent hover:text-announce-accent/80",
  };

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button 
      variant="ghost" 
      onClick={handleClick}
      className={`gap-1 ${colorClasses[variant]} hover:bg-transparent p-0`}
    >
      <ArrowLeft className="w-4 h-4" />
      <span>{label}</span>
    </Button>
  );
};

export default BackButton;
