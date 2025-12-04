import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { getImageSrc } from "@/lib/imageUtils";

type StudentSection = "application" | "disabled" | "abled" | "stories";
type ClientSection = "training" | "bbbee" | "benefits" | "client-stories";

// Separate component so hooks stay at top level
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
        return (
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">
                    Student Application Process
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Learn about our step-by-step application process,
                    requirements, and how to get started with your technology
                    education journey.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">
                      Step 1: Complete Online Application
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Fill out our comprehensive online application form with
                      your personal details and educational background.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">
                      Step 2: Submit Required Documents
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Upload certified copies of your ID, highest
                      qualification, and proof of residence.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">
                      Step 3: Attend Orientation Session
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Join our orientation to learn about programs, facilities,
                      and student support services.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">
                      Step 4: Complete Assessment Tests
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Take our placement tests to ensure you're matched with the
                      right program level.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">
                      Step 5: Receive Acceptance Confirmation
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Get your official acceptance letter and program details
                      via email within 5 business days.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">
                      Step 6: Register and Begin Learning
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Complete registration, pay fees (or arrange funding), and
                      start your journey to success.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/become-learner">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Start Your Application
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        );

      case "disabled":
        return (
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">
                    Disabled Learner Application
                  </CardTitle>
                  <p className="text-muted-foreground">
                    We are committed to inclusive education. Our facilities and
                    programs are designed to accommodate learners with
                    disabilities.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Our Commitment to Accessibility
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    DNAcademy believes that everyone deserves access to quality
                    technology education. We provide comprehensive support and
                    accommodations for learners with physical, visual, hearing,
                    or learning disabilities.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Accessible Facilities",
                      desc: "Wheelchair ramps, accessible restrooms, and designated parking spaces.",
                    },
                    {
                      title: "Assistive Technology",
                      desc: "Screen readers, speech-to-text software, and adaptive keyboards available.",
                    },
                    {
                      title: "Flexible Learning Arrangements",
                      desc: "Extended time for assessments, alternative formats, and customized schedules.",
                    },
                    {
                      title: "Dedicated Support Coordinators",
                      desc: "Personal support staff to assist with academic and administrative needs.",
                    },
                    {
                      title: "Sign Language Interpreters",
                      desc: "Available upon request for hearing-impaired learners.",
                    },
                    {
                      title: "Reasonable Accommodation",
                      desc: "We work with each learner to provide individualized support solutions.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-muted p-6 rounded-lg">
                  <h4 className="font-semibold mb-2">How to Apply</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    When completing your application, please indicate any
                    specific accommodations you require. Our disability support
                    team will contact you to discuss your needs and arrange
                    appropriate support before your program begins.
                  </p>
                  <Link href="/become-learner">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Apply as Disabled Learner
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "abled":
        return (
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">
                    Abled Learner Application
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Standard application process for learners without special
                    accommodation requirements.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Standard Application Process
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Our standard application process is designed to be
                    straightforward and efficient, getting you enrolled and
                    learning as quickly as possible.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Quick Online Application",
                      desc: "Complete your application in under 15 minutes with our streamlined online form.",
                    },
                    {
                      title: "Basic Entry Requirements",
                      desc: "Grade 12 certificate or equivalent, valid ID, and passion for technology.",
                    },
                    {
                      title: "Regular Program Schedules",
                      desc: "Full-time and part-time options with morning, afternoon, and evening classes.",
                    },
                    {
                      title: "Standard Assessment Procedures",
                      desc: "Fair and transparent evaluation through tests, projects, and practical assessments.",
                    },
                    {
                      title: "Full Access to Facilities",
                      desc: "Modern computer labs, high-speed internet, and collaborative learning spaces.",
                    },
                    {
                      title: "Career Guidance & Support",
                      desc: "Job placement assistance, CV writing workshops, and interview preparation.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-primary/5 p-6 rounded-lg border-2 border-primary/20">
                  <h4 className="font-semibold mb-2 text-lg">
                    Ready to Transform Your Future?
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    Join thousands of successful graduates who have launched
                    their technology careers with DNAcademy. Our
                    industry-aligned programs and expert instructors will equip
                    you with the skills employers are looking for.
                  </p>
                  <Link href="/become-learner">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "stories":
        return <StudentStoriesBlock />;
    }
  };

  const renderClientContent = () => {
    switch (activeClientSection) {
      case "training":
        return (
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">
                    Corporate Training Solutions
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Comprehensive training programs designed to upskill your
                    workforce and meet your organization's specific needs.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Customized Curriculum Development",
                    desc: "Tailored training programs aligned with your business objectives and technology stack.",
                  },
                  {
                    title: "On-site and Online Training",
                    desc: "Flexible delivery options to suit your team's location and schedule preferences.",
                  },
                  {
                    title: "Flexible Scheduling",
                    desc: "Training sessions arranged to minimize disruption to your business operations.",
                  },
                  {
                    title: "Industry-Expert Facilitators",
                    desc: "Experienced trainers with real-world expertise in their respective fields.",
                  },
                  {
                    title: "Progress Tracking & Reporting",
                    desc: "Detailed analytics and reports on learner progress and skill development.",
                  },
                  {
                    title: "Post-Training Support",
                    desc: "Ongoing assistance and resources to ensure knowledge retention and application.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/become-client">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Request Corporate Training
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        );

      case "bbbee":
        return (
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">
                    B-BBEE Skills Development
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Maximize your B-BBEE scorecard points through strategic
                    skills development investments.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "B-BBEE Compliance Consulting",
                    desc: "Expert guidance on meeting skills development requirements and maximizing points.",
                  },
                  {
                    title: "Skills Development Planning",
                    desc: "Strategic planning to align training investments with B-BBEE objectives.",
                  },
                  {
                    title: "SETA Grant Application Assistance",
                    desc: "Complete support with SETA grant applications and claims processes.",
                  },
                  {
                    title: "Workplace Skills Plan (WSP) Support",
                    desc: "Professional assistance with WSP and ATR submissions to SETA.",
                  },
                  {
                    title: "Employment Equity Submissions",
                    desc: "Help with EE reporting and compliance documentation.",
                  },
                  {
                    title: "Comprehensive Documentation",
                    desc: "All necessary proof and certificates for B-BBEE verification audits.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case "benefits":
        return (
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">
                    Partnership Benefits
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Why leading organizations choose DNAcademy as their
                    preferred training partner.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "MICT SETA Accredited Provider",
                    desc: "Fully accredited training provider recognized by MICT SETA for quality delivery.",
                  },
                  {
                    title: "Proven Track Record",
                    desc: "Over 10 years of successful corporate training delivery across multiple industries.",
                  },
                  {
                    title: "Industry-Aligned Curriculum",
                    desc: "Training content that reflects current industry standards and best practices.",
                  },
                  {
                    title: "Flexible Payment Options",
                    desc: "Convenient payment plans and SETA grant funding assistance available.",
                  },
                  {
                    title: "Dedicated Account Management",
                    desc: "Personal account manager to coordinate all your training needs.",
                  },
                  {
                    title: "ROI-Focused Solutions",
                    desc: "Measurable outcomes and clear return on your training investment.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case "client-stories":
        return (
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">
                    Client Success Stories
                  </CardTitle>
                  <p className="text-muted-foreground">
                    See how we've helped organizations transform their workforce
                    capabilities.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* static sample cards as before */}
              {/* ...keep your three client story cards here... */}
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative h-[400px] md:h-[500px] bg-cover bg-center"
        style={{ backgroundImage: "url('/about-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-secondary/80" />
        <div className="container mx-auto px-4 h-full flex items-center justify-center text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-secondary-foreground">
              Student Hub
            </h1>
            <p className="text-xl md:text-2xl mx-auto opacity-95 text-secondary-foreground">
              Your comprehensive resource center for applications, information,
              and success stories
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("student")}
              className={`py-4 px-2 font-bold text-lg relative transition-colors ${
                activeTab === "student"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              STUDENT HUB
              {activeTab === "student" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("client")}
              className={`py-4 px-2 font-bold text-lg relative transition-colors ${
                activeTab === "client"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              CLIENT INFO
              {activeTab === "client" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-muted rounded-lg p-4 sticky top-24">
                <h3 className="font-bold text-lg mb-4">
                  {activeTab === "student"
                    ? "Student Sections"
                    : "Client Sections"}
                </h3>
                <nav className="space-y-2">
                  {activeTab === "student"
                    ? studentSectionLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <button
                            key={link.id}
                            onClick={() => setActiveStudentSection(link.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                              activeStudentSection === link.id
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-background"
                            }`}
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm">{link.label}</span>
                          </button>
                        );
                      })
                    : clientSectionLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <button
                            key={link.id}
                            onClick={() => setActiveClientSection(link.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                              activeClientSection === link.id
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-background"
                            }`}
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm">{link.label}</span>
                          </button>
                        );
                      })}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === "student"
                ? renderStudentContent()
                : renderClientContent()}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {activeTab === "student"
              ? "Ready to Start Your Journey?"
              : "Ready to Transform Your Workforce?"}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            {activeTab === "student"
              ? "Take the first step towards a successful career in technology. Apply today and join hundreds of successful graduates."
              : "Partner with us to develop your team's skills and achieve your business objectives. Contact us for a customized solution."}
          </p>
          <Link
            href={activeTab === "student" ? "/become-learner" : "/become-client"}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {activeTab === "student" ? "Apply Now" : "Get in Touch"}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
