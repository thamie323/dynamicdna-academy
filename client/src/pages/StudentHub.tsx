import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getImageSrc } from "@/lib/imageUtils";
import {
  ChevronRight,
  FileText,
  Users,
  BookOpen,
  Award,
  CheckCircle,
  Briefcase,
  Loader2,
} from "lucide-react";
import { Link } from "wouter";
import WaveDivider from "@/components/WaveDivider";
import { trpc } from "@/lib/trpc";

const getImageSrc = (imageUrl?: string | null) => {
  if (!imageUrl) return "/about-hero.jpg"; // fallback
  if (imageUrl.startsWith("http")) return imageUrl; // full URL
  if (imageUrl.startsWith("/")) return imageUrl; // already absolute
  return `/${imageUrl}`; // "uploads/..." -> "/uploads/..."
};

type StudentSection = "application" | "disabled" | "abled" | "stories";
type ClientSection = "training" | "bbbee" | "benefits" | "client-stories";

// Small inner component to keep hooks rules happy
function StudentStoriesBlock() {
  const { data: stories, isLoading, error } =
    trpc.studentStories.getPublished.useQuery();

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">
              Student Success Stories
            </CardTitle>
            <p className="text-muted-foreground">
              Read inspiring success stories from our graduates who have
              transformed their careers through our programs.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-lg">Loading success stories...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-destructive text-lg">
              Failed to load success stories. Please try again later.
            </p>
          </div>
        )}

        {!isLoading && !error && stories && stories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No success stories available yet. Check back soon!
            </p>
          </div>
        )}

        {stories && stories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story) => (
              <Card key={story.id} className="bg-muted">
                <CardContent className="p-6">
                  <div className="mb-4">
                    {story.imageUrl ? (
  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
    <img
      src={getImageSrc(story.imageUrl)}
      alt={story.studentName}
      className="w-full h-full object-cover"
    />
  </div>
) : (
  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
    <Award className="w-8 h-8 text-primary" />
  </div>
)}

                    <h4 className="font-bold text-lg mb-1 text-center">
                      {story.studentName}
                    </h4>
                    <p className="text-sm text-primary text-center">
                      {story.program}
                    </p>
                  </div>

                  <p className="text-sm italic mb-4">"{story.story}"</p>

                  {story.currentPosition && (
                    <div className="pt-4 border-t">
                      <p className="text-sm font-semibold text-center">
                        {story.currentPosition}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function StudentHub() {
  const [activeTab, setActiveTab] = useState<"student" | "client">("student");
  const [activeStudentSection, setActiveStudentSection] =
    useState<StudentSection>("application");
  const [activeClientSection, setActiveClientSection] =
    useState<ClientSection>("training");

  const studentSectionLinks = [
    {
      id: "application" as StudentSection,
      label: "Student Application Process",
      icon: ChevronRight,
    },
    {
      id: "disabled" as StudentSection,
      label: "Disabled Learner Application",
      icon: ChevronRight,
    },
    {
      id: "abled" as StudentSection,
      label: "Abled Learner Application",
      icon: ChevronRight,
    },
    {
      id: "stories" as StudentSection,
      label: "Student Stories",
      icon: ChevronRight,
    },
  ];

  const clientSectionLinks = [
    {
      id: "training" as ClientSection,
      label: "Corporate Training Solutions",
      icon: ChevronRight,
    },
    {
      id: "bbbee" as ClientSection,
      label: "B-BBEE Skills Development",
      icon: ChevronRight,
    },
    {
      id: "benefits" as ClientSection,
      label: "Partnership Benefits",
      icon: ChevronRight,
    },
    {
      id: "client-stories" as ClientSection,
      label: "Client Success Stories",
      icon: ChevronRight,
    },
  ];

  const renderStudentContent = () => {
    switch (activeStudentSection) {
      case "application":
        // 🔹 unchanged content…
        // (keep your existing "application" block here)
        return (
          /* ...your application Card... */
          // (omitted for brevity – you can keep exactly what you had)
          <></>
        );

      case "disabled":
        // keep your disabled block as-is
        return (
          /* ...Disabled Learner Card... */
          <></>
        );

      case "abled":
        // keep your abled block as-is
        return (
          /* ...Abled Learner Card... */
          <></>
        );

      case "stories":
        return <StudentStoriesBlock />;
    }
  };

  const renderClientContent = () => {
    // 🔹 keep all your existing client sections as-is
    // (training, bbbee, benefits, client-stories)
    return <></>;
  };

  // 🔹 rest of your StudentHub component (hero, tabs, layout) stays the same
}
