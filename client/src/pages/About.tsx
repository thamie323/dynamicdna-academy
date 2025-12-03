import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Award, TrendingUp, CheckCircle, Lightbulb } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from curriculum design to student support.",
    },
    {
      icon: Users,
      title: "Inclusivity",
      description: "We believe in creating opportunities for all, regardless of background or circumstance.",
    },
    {
      icon: Award,
      title: "Quality",
      description: "We maintain the highest standards in training delivery and student outcomes.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We continuously evolve our programs to meet the demands of the digital economy.",
    },
  ];

  const achievements = [
    "MICT SETA Accredited Training Provider",
    "500+ Successful Graduates",
    "95% Student Success Rate",
    "100+ Corporate Partnerships",
    "4IR Technology Focus",
    "Disability-Friendly Facilities",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Large Image */}
      <section className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('/about-hero.jpg')" }}>
        <div className="absolute inset-0 bg-secondary/80"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-3xl text-secondary-foreground">
            <h1 className="text-5xl font-bold mb-6">About DNAcademy</h1>
            <p className="text-2xl">
              Empowering South Africa's youth through world-class technology education and skills development
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Who <span className="text-primary">We Are</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                DNAcademy is a leading technology training institution dedicated to bridging the digital skills gap in South Africa. As a MICT SETA accredited training provider, we specialize in delivering high-quality ICT education that prepares students for successful careers in the Fourth Industrial Revolution.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Our comprehensive programs combine theoretical knowledge with practical, hands-on training to ensure our graduates are job-ready from day one. We work closely with industry partners to design curricula that meet real-world demands and create pathways to employment.
              </p>
              <p className="text-lg text-muted-foreground">
                With state-of-the-art facilities and experienced instructors, we provide an environment where students can thrive and develop the skills needed to excel in today's technology-driven economy.
              </p>
            </div>

            <div className="relative">
              <img
                src="/hero-slider-1.jpg"
                alt="Students in classroom"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="border-2 border-primary">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg text-muted-foreground">
                  To empower individuals and organizations through accessible, high-quality technology education that drives economic transformation and creates sustainable employment opportunities in South Africa's digital economy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg text-muted-foreground">
                  To be South Africa's leading technology training institution, recognized for excellence in skills development, innovation in education delivery, and our contribution to building a digitally skilled workforce for the future.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="text-primary">Core Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Achievements</h2>
              <p className="text-xl opacity-90 mb-8">
                We're proud of our track record in delivering quality education and creating opportunities for South Africa's youth.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <span className="text-lg">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="/graduation-ceremony.jpg"
                alt="Graduation ceremony"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Large Image Section */}
      <section className="py-0">
        <div className="w-full">
          <img
            src="/courses-hero-large.jpg"
            alt="Technology classroom"
            className="w-full h-[500px] object-cover"
          />
        </div>
      </section>
    </div>
  );
}
