import { Eye, Target, Lightbulb, Users, Crown, Star, Palette, Code, Share2, Settings } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

const coordinators = [
  { name: "Dr. S. Ramesh Kumar", department: "Department of Mathematics", role: "Faculty Coordinator" },
  { name: "Dr. Priya Venkatesh", department: "Department of Mathematics", role: "Co-Coordinator" },
  { name: "Prof. Anand Krishnan", department: "Department of Applied Sciences", role: "Advisor" },
];

const leadership = [
  { name: "Arjun Sharma", role: "PRESIDENT", department: "Computer Science Engineering", year: "4th Year", isPrimary: true },
  { name: "Kavitha Rajan", role: "VICE PRESIDENT", department: "Electronics & Communication", year: "3rd Year", isPrimary: false },
];

const teams = [
  { 
    name: "Design Team", 
    icon: Palette,
    members: [
      { name: "Priya M.", branch: "CSE", year: "3rd Year" },
      { name: "Rahul K.", branch: "ECE", year: "2nd Year" },
    ]
  },
  { 
    name: "Technical Team", 
    icon: Code,
    members: [
      { name: "Arun S.", branch: "IT", year: "3rd Year" },
      { name: "Deepa L.", branch: "CSE", year: "3rd Year" },
    ]
  },
  { 
    name: "Social Media Team", 
    icon: Share2,
    members: [
      { name: "Karthik R.", branch: "Mech", year: "2nd Year" },
      { name: "Sneha P.", branch: "CSE", year: "2nd Year" },
    ]
  },
  { 
    name: "Management Team", 
    icon: Settings,
    members: [
      { name: "Vikram N.", branch: "ECE", year: "4th Year" },
      { name: "Anjali T.", branch: "IT", year: "3rd Year" },
    ]
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col about-gradient">
      <PageHeader variant="about" backTo="/dashboard" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-about-purple mb-4 animate-fade-in">
            About Us
          </h1>
          <div className="w-16 h-1 bg-about-saffron mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto px-4 animate-slide-up">
            Discover the minds behind the numbers. Where mathematics meets passion.
          </p>
        </section>

        <div className="container max-w-5xl mx-auto px-4 pb-12 space-y-12">
          {/* Club Info Section */}
          <section className="animate-slide-up delay-100">
            <h2 className="font-serif text-2xl font-bold text-about-purple-deep mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-about-saffron rounded-full" />
              Club Info
            </h2>
            <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The Math Club at Sathyabama Institute of Science and Technology is dedicated to nurturing mathematical 
                curiosity and academic excellence. We bring together students from diverse backgrounds who share a 
                passion for numbers, patterns, and problem-solving.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-about-cream rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-about-saffron/20 flex items-center justify-center shrink-0">
                    <Eye className="w-5 h-5 text-about-saffron" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-about-purple mb-1">Our Vision</h3>
                    <p className="text-sm text-muted-foreground">
                      To foster a community of mathematical thinkers who inspire innovation and excellence.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-about-cream rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-about-saffron/20 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-about-saffron" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-about-purple mb-1">Our Purpose</h3>
                    <p className="text-sm text-muted-foreground">
                      Promoting mathematical literacy and problem-solving skills through engaging activities.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-about-cream rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-about-saffron/20 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-5 h-5 text-about-saffron" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-about-purple mb-1">Activities</h3>
                    <p className="text-sm text-muted-foreground">
                      Workshops, competitions, guest lectures, and collaborative research projects.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-about-cream rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-about-saffron/20 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-about-saffron" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-about-purple mb-1">Community</h3>
                    <p className="text-sm text-muted-foreground">
                      Building lasting connections among students passionate about mathematics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Coordinators Section */}
          <section className="animate-slide-up delay-200">
            <h2 className="font-serif text-2xl font-bold text-about-purple-deep mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-about-saffron rounded-full" />
              Coordinators
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {coordinators.map((coordinator) => (
                <div key={coordinator.name} className="bg-card rounded-2xl shadow-card p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-about-cream mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-about-saffron" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{coordinator.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{coordinator.department}</p>
                  <span className="inline-block px-3 py-1 bg-about-saffron/10 text-about-saffron rounded-full text-xs font-medium">
                    {coordinator.role}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Club Leadership Section */}
          <section className="animate-slide-up delay-300">
            <h2 className="font-serif text-2xl font-bold text-about-purple-deep mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-about-saffron rounded-full" />
              Club Leadership
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {leadership.map((leader) => (
                <div 
                  key={leader.name} 
                  className={`rounded-2xl shadow-card p-6 ${
                    leader.isPrimary 
                      ? "bg-gradient-to-br from-about-purple to-about-purple-deep text-primary-foreground" 
                      : "bg-gradient-to-br from-about-saffron to-about-saffron/80 text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      leader.isPrimary ? "bg-primary-foreground/20" : "bg-foreground/10"
                    }`}>
                      {leader.isPrimary ? <Crown className="w-6 h-6" /> : <Star className="w-6 h-6" />}
                    </div>
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        leader.isPrimary ? "text-primary-foreground/80" : "text-foreground/80"
                      }`}>
                        {leader.role}
                      </span>
                      <h3 className="font-semibold text-lg">{leader.name}</h3>
                    </div>
                  </div>
                  <div className={`mt-4 text-sm ${
                    leader.isPrimary ? "text-primary-foreground/80" : "text-foreground/80"
                  }`}>
                    <p>• {leader.department}</p>
                    <p>• {leader.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Club Members Section */}
          <section className="animate-slide-up delay-400">
            <h2 className="font-serif text-2xl font-bold text-about-purple-deep mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-about-saffron rounded-full" />
              Club Members
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {teams.map((team) => (
                <div key={team.name} className="bg-card rounded-2xl shadow-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-about-saffron/10 flex items-center justify-center">
                      <team.icon className="w-5 h-5 text-about-saffron" />
                    </div>
                    <h3 className="font-semibold text-about-purple">{team.name}</h3>
                  </div>
                  <div className="space-y-3">
                    {team.members.map((member) => (
                      <div key={member.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <span className="font-medium text-foreground">{member.name}</span>
                        <span className="text-sm text-muted-foreground">{member.branch} · {member.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer variant="about" />
    </div>
  );
};

export default AboutPage;
