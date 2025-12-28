import { useParams, Link } from "react-router-dom";
import { Star, Image, MessageSquare, Users, BarChart3, ChevronRight, Quote, Plus, Upload, File } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getApiUrl } from "@/utils/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

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
  const { user } = useAuth();

  // Basic event data (static fallback for now as we didn't fully implement dynamic details fetch in this specific flow, or reusing what we have)
  // Actually, let's just fetch everything dynamic if possible, but for now let's focus on Media being dynamic.
  // We'll keep the static event details for simplicity unless requested.
  const event = { name: "Event Details", description: "View event photos below." };

  const [media, setMedia] = useState<any[]>([]);
  const [mediaUrl, setMediaUrl] = useState("");
  const [loadingMedia, setLoadingMedia] = useState(true);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, [eventId]);

  const fetchMedia = async () => {
    try {
      const res = await fetch(getApiUrl(`/events/${eventId}/media`));
      if (res.ok) {
        setMedia(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setLoadingMedia(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'image');

    try {
      const res = await fetch(getApiUrl(`/events/${eventId}/media`), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (res.ok) {
        toast.success("Photo uploaded!");
        fetchMedia();
      } else {
        toast.error("Upload failed");
        setLoadingMedia(false);
      }
    } catch (e) {
      toast.error("Error uploading");
      setLoadingMedia(false);
    }
  };

  const handleAddMedia = async () => {
    if (!mediaUrl) return;
    try {
      const res = await fetch(getApiUrl(`/events/${eventId}/media`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ url: mediaUrl, type: 'image' })
      });

      if (res.ok) {
        toast.success("Photo added!");
        setMediaUrl("");
        fetchMedia();
      } else {
        toast.error("Failed to add photo");
      }
    } catch (e) { toast.error("Error adding photo"); }
  };

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

        {/* Event Media Gallery */}
        <section className="mb-12 animate-slide-up delay-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-semibold text-detail-dark flex items-center gap-2">
              <Image className="w-6 h-6 text-detail-teal" />
              Event Gallery
            </h2>
          </div>

          {/* Add Media Section */}
          {user && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border/50 mb-8 animate-fade-in">
              <Tabs defaultValue="file" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="file">Upload File</TabsTrigger>
                  <TabsTrigger value="url">Image URL</TabsTrigger>
                </TabsList>

                <TabsContent value="file">
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${dragActive ? 'border-detail-teal bg-detail-teal/5' : 'border-gray-200 hover:border-detail-teal/50'}`}
                    onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
                    onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); }}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDragActive(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleFileUpload(e.dataTransfer.files[0]);
                      }
                    }}
                  >
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer block">
                      <div className="w-12 h-12 bg-detail-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-6 h-6 text-detail-teal" />
                      </div>
                      <h3 className="font-semibold text-detail-dark mb-1">Click to upload or drag and drop</h3>
                      <p className="text-sm text-muted-foreground">SVG, PNG, JPG or GIF (max 5MB)</p>
                    </label>
                    {loadingMedia && <p className="text-sm text-detail-teal mt-2">Uploading...</p>}
                  </div>
                </TabsContent>

                <TabsContent value="url">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Paste image URL here..."
                      value={mediaUrl || ''}
                      onChange={(e) => setMediaUrl(e.target.value)}
                      className="bg-white"
                    />
                    <Button onClick={handleAddMedia} disabled={!mediaUrl} className="bg-detail-teal hover:bg-detail-teal/90 text-white">
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Gallery Grid */}
          {loadingMedia && !media.length ? (
            <div className="text-center py-8 text-muted-foreground">Loading photos...</div>
          ) : media.length === 0 ? (
            <div className="text-center py-12 bg-detail-light/50 rounded-xl border border-dashed border-detail-teal/30">
              <Image className="w-12 h-12 text-detail-teal/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No photos yet. Be the first to add one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map((item: any) => (
                <div key={item.id} className="group relative aspect-square rounded-xl overflow-hidden shadow-md bg-white">
                  <img
                    src={item.url}
                    alt={item.caption || "Event photo"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all delay-75" asChild>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">View Full</a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
