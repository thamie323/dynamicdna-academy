import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, TrendingUp, Users, FileText, Shield, Target, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function Corporate() {
  const services = [
    {
      icon: Target,
      title: "Skills Gap Analysis",
      description: "Comprehensive assessment of your workforce's current skills and identification of critical gaps that need to be addressed for business growth.",
    },
    {
      icon: Users,
      title: "Skills Development Facilitation",
      description: "End-to-end management of training programs, from planning to implementation, ensuring maximum impact and compliance.",
    },
    {
      icon: FileText,
      title: "Workplace Skills Plan (WSP)",
      description: "Strategic planning and documentation to align your skills development initiatives with business objectives and SETA requirements.",
    },
    {
      icon: Shield,
      title: "Employment Equity Submissions",
      description: "Expert assistance with Employment Equity reporting and compliance to meet legislative requirements.",
    },
    {
      icon: TrendingUp,
      title: "B-BBEE Skills Development",
      description: "Maximize your B-BBEE scorecard points through strategic skills development investments and proper documentation.",
    },
    {
      icon: Building2,
      title: "Corporate Training Programs",
      description: "Customized training solutions tailored to your organization's specific needs and industry requirements.",
    },
  ];

  const benefits = [
    "Improve your B-BBEE Skills Development scorecard",
    "Access to SETA discretionary and mandatory grants",
    "Reduce employee turnover through upskilling",
    "Increase productivity and competitiveness",
    "Meet legislative compliance requirements",
    "Develop a future-ready workforce",
    "Support transformation and economic development",
    "Access to qualified and experienced facilitators",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Large Image */}
      <section className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('/corporate-hero-large.jpg')" }}>
        <div className="absolute inset-0 bg-secondary/85"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-3xl text-secondary-foreground">
            <h1 className="text-5xl font-bold mb-6">Corporate Services</h1>
            <p className="text-2xl">
              Comprehensive skills development solutions to empower your workforce and strengthen your B-BBEE credentials
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Close Your Digital Skills Gap</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Enhance your workforce's Information, Communication and Technology knowledge and improve skills through corporate short courses offered through an easy to use platform. Let us be your choice of ICT training academy, and together we can empower the future.
            </p>
            <p className="text-lg text-muted-foreground">
              We offer comprehensive solutions to businesses that aim to improve their B-BBEE Skills Development scorecard contribution and guarantee a return on your investment.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Why Partner With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* B-BBEE Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">B-BBEE Skills Development</h2>
            <div className="space-y-6 text-lg text-muted-foreground mb-8">
              <p>
                Skills Development is a critical component of the B-BBEE scorecard, accounting for significant points that can improve your overall B-BBEE level. Our comprehensive approach ensures that your investment in skills development translates into maximum scorecard points.
              </p>
              <p>
                We understand the complexities of B-BBEE compliance and SETA requirements. Our team of experts will guide you through the entire process, from planning and implementation to reporting and verification, ensuring that you meet all regulatory requirements while developing your workforce.
              </p>
            </div>

            <Card className="border-2 border-primary">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Our Comprehensive Approach</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Strategic planning aligned with your business objectives</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Identification of priority skills and training needs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Implementation of accredited training programs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Complete documentation and compliance management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Ongoing support and reporting</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-bold mb-2">Consultation</h3>
                <p className="text-sm opacity-90">Understand your needs and objectives</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-bold mb-2">Assessment</h3>
                <p className="text-sm opacity-90">Analyze skills gaps and requirements</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-bold mb-2">Implementation</h3>
                <p className="text-sm opacity-90">Execute customized training programs</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h3 className="font-bold mb-2">Support</h3>
                <p className="text-sm opacity-90">Ongoing monitoring and reporting</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Workforce?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Contact us today to discuss how we can help your organization achieve its skills development and B-BBEE objectives.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
