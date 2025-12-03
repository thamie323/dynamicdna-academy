import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Award, Heart, TrendingUp, BookOpen, Briefcase, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function FourIRFourHer() {
  const pillars = [
    {
      icon: BookOpen,
      title: "Education & Training",
      description: "Comprehensive ICT training programs specifically designed to empower women with cutting-edge 4IR skills including AI, data science, and cloud computing.",
    },
    {
      icon: Briefcase,
      title: "Career Development",
      description: "Mentorship programs, career guidance, and job placement support to help women succeed in technology careers.",
    },
    {
      icon: Users,
      title: "Community & Networking",
      description: "Building a supportive community of women in tech through networking events, peer support groups, and industry connections.",
    },
    {
      icon: TrendingUp,
      title: "Leadership Development",
      description: "Developing future female tech leaders through specialized leadership training and entrepreneurship programs.",
    },
  ];

  const benefits = [
    "Free access to accredited ICT training programs",
    "Specialized focus on Fourth Industrial Revolution technologies",
    "Mentorship from industry professionals",
    "Networking opportunities with women in tech",
    "Career placement assistance",
    "Leadership and soft skills development",
    "Access to modern training facilities and equipment",
    "Ongoing support and alumni network",
  ];

  const focusAreas = [
    { name: "Artificial Intelligence", icon: Sparkles },
    { name: "Data Science & Analytics", icon: TrendingUp },
    { name: "Cloud Computing", icon: Target },
    { name: "Cybersecurity", icon: Award },
    { name: "Software Development", icon: BookOpen },
    { name: "Digital Marketing", icon: Heart },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-6">4IR4HER</h1>
          <p className="text-2xl mb-4 opacity-90">Fourth Industrial Revolution for Her</p>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Empowering women to lead in the digital economy through specialized ICT training and career development
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Breaking Barriers in Technology</h2>
            <p className="text-lg text-muted-foreground mb-6">
              4IR4HER is our dedicated initiative to address the gender gap in technology and empower women to become leaders in the Fourth Industrial Revolution. We believe that diversity in tech is not just important—it's essential for innovation and progress.
            </p>
            <p className="text-lg text-muted-foreground">
              Through comprehensive training, mentorship, and support, we're creating pathways for women to excel in high-demand technology careers and contribute to South Africa's digital transformation.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Women Trained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">85%</div>
              <div className="text-muted-foreground">Employment Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">6</div>
              <div className="text-muted-foreground">4IR Specializations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Free Training</div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Pillars */}
      <section className="py-20 bg-muted">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Four Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary transition-all">
                  <CardHeader>
                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{pillar.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">4IR Technology Focus Areas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {focusAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-sm font-semibold">{area.name}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Program Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <p className="text-lg opacity-90">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Who Can Apply?</h2>
            <Card className="border-2">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">Eligibility Criteria</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <span>Female South African citizens or permanent residents</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <span>Minimum Grade 12 (Matric) qualification</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <span>Passion for technology and innovation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <span>Commitment to completing the program</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <span>No prior tech experience required - we welcome beginners!</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6 border-t">
                    <h3 className="text-xl font-bold mb-3">What We're Looking For</h3>
                    <p className="text-muted-foreground mb-4">
                      We seek motivated women who are ready to embrace the challenges and opportunities of the digital age. Whether you're a recent graduate, career changer, or returning to the workforce, 4IR4HER provides the support and training you need to succeed in technology.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-muted">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "4IR4HER changed my life. I went from unemployment to working as a junior developer at a leading tech company in just 18 months."
                </p>
                <p className="font-semibold">- Thandi M., Software Developer</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "The mentorship and support I received gave me the confidence to pursue a career in data science. I'm now leading projects at my company."
                </p>
                <p className="font-semibold">- Nomsa K., Data Analyst</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "This program opened doors I never knew existed. I'm now studying towards my degree in Computer Science while working part-time."
                </p>
                <p className="font-semibold">- Lerato S., IT Support Specialist</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Join the 4IR4HER Movement</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Take the first step towards a rewarding career in technology. Applications are open for our next intake.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Apply Now
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
