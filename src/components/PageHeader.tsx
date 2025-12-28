import Logo from "./Logo";
import BackButton from "./BackButton";

interface PageHeaderProps {
  variant?: "light" | "dark" | "about" | "events" | "detail" | "announce";
  showBack?: boolean;
  backTo?: string;
}

const PageHeader = ({ variant = "light", showBack = true, backTo }: PageHeaderProps) => {
  const bgClasses = {
    light: "bg-card border-b border-border",
    dark: "bg-dashboard-navy",
    about: "bg-about-cream border-b border-about-saffron/20",
    events: "bg-events-bg border-b border-events-soft/30",
    detail: "bg-detail-light border-b border-detail-teal/20",
    announce: "bg-announce-pink border-b border-announce-muted/20",
  };

  return (
    <header className={`sticky top-0 z-50 ${bgClasses[variant]}`}>
      <div className="container max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Logo variant={variant} />
        {showBack && <BackButton variant={variant} to={backTo} />}
      </div>
    </header>
  );
};

export default PageHeader;
