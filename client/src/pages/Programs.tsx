import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Building2 } from "lucide-react";
import { Link } from "wouter";
import WaveDivider from "@/components/WaveDivider";

export default function Programs() {
  const programs = [
    {
      icon: GraduationCap,
      title: "Training Programs",
      description: "Launch your career in technology with our industry-recognized learnership programs. Gain practical experience while earning a qualification.",
      link: "/learnerships",
      buttonText: "View Details",
    },
    {
      icon: BookOpen,
      title: "Professional Courses",
      description: "Enhance your expertise in the technology sector with short courses covering emerging technologies and in-demand skills.",
      link: "/courses",
      buttonText: "View Details",
    },
    {
      icon: Building2,
      title: "Corporate Solutions",
      description: "Customized corporate training services designed to upskill your workforce and improve your organization's B-BBEE scorecard.",
      link: "/corporate",
      buttonText: "View Details",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Wave Divider */}
      <section
  className="relative h-[400px] md:h-[500px] bg-cover bg-center"
  style={{ backgroundImage: "url('/about-hero.jpg')" }} // or '/programs-hero.jpg'
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-secondary/80" />

  {/* Content */}
  <div className="container mx-auto px-4 h-full flex items-center justify-center text-center relative z-10">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-secondary-foreground">
        Our Programs
      </h1>
      <p className="text-xl md:text-2xl mx-auto opacity-95 text-secondary-foreground">
        Discover pathways to success through our comprehensive training solutions
      </p>
    </div>
  </div>
</section>


      {/* Programs Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{program.title}</h2>
                    <p className="text-muted-foreground text-lg mb-6">{program.description}</p>
                    <Link href={program.link}>
                      <Button size="lg" className="w-full">
                        {program.buttonText}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Choose the program that's right for you and take the first step towards a successful career in technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/become-learner">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Become a Learner
              </Button>
            </Link>
            <Link href="/become-client">
              <Button size="lg" variant="outline" className="border-2 bg-transparent">
                Become a Client
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
