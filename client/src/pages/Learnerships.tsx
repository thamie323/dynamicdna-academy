import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Briefcase, Award, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function Learnerships() {
  const learnerships = [
    {
      title: "Information Technology: Systems Development",
      level: "NQF Level 5",
      duration: "18 months",
      description: "Comprehensive learnership covering software development, database management, and systems analysis. Gain practical experience while earning a nationally recognized qualification.",
      outcomes: [
        "Develop software applications",
        "Design and implement databases",
        "Analyze business requirements",
        "Work in development teams",
      ],
    },
    {
      title: "Information Technology: Technical Support",
      level: "NQF Level 5",
      duration: "18 months",
      description: "Learn to provide technical support, troubleshoot hardware and software issues, and maintain IT infrastructure. Perfect for those interested in IT support careers.",
      outcomes: [
        "Troubleshoot technical issues",
        "Maintain IT infrastructure",
        "Provide user support",
        "Implement security measures",
      ],
    },
    {
      title: "Information Technology: Network Engineering",
      level: "NQF Level 5",
      duration: "18 months",
      description: "Master network design, implementation, and management. Learn to configure routers, switches, and network security systems.",
      outcomes: [
        "Design network infrastructure",
        "Configure network devices",
        "Implement network security",
        "Monitor network performance",
      ],
    },
    {
      title: "Business Administration Services",
      level: "NQF Level 4",
      duration: "12 months",
      description: "Develop essential business administration skills including office management, communication, and business processes.",
      outcomes: [
        "Manage office operations",
        "Handle business communications",
        "Process business documents",
        "Support business functions",
      ],
    },
  ];

  const benefits = [
    {
      icon: GraduationCap,
      title: "Nationally Recognized Qualification",
      description: "Earn MICT SETA accredited qualifications that are recognized across South Africa",
    },
    {
      icon: Briefcase,
      title: "Real-World Experience",
      description: "Gain practical workplace experience through structured work placements",
    },
    {
      icon: Award,
      title: "No Cost to Learners",
      description: "Learnerships are fully funded, providing free quality education and training",
    },
    {
      icon: TrendingUp,
      title: "Career Advancement",
      description: "Improve your employability and career prospects in the IT industry",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-6">IT Learnerships</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Pursue a career in IT and Business with our leading learnerships, designed to equip you with certified skills and real-world experience
          </p>
        </div>
      </section>

      {/* What is a Learnership */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">What is a Learnership?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              A learnership is a structured learning program that combines theoretical training with practical workplace experience. It leads to a nationally recognized qualification registered on the National Qualifications Framework (NQF).
            </p>
            <p className="text-lg text-muted-foreground">
              Learnerships are designed to provide learners with the skills and knowledge needed to succeed in their chosen career field, while also meeting the skills development needs of employers.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Available Learnerships */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Available Learnerships</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {learnerships.map((learnership, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">{learnership.title}</CardTitle>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {learnership.level}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {learnership.duration}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{learnership.description}</p>
                  <div>
                    <h4 className="font-semibold mb-3">Learning Outcomes:</h4>
                    <ul className="space-y-2">
                      {learnership.outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility & Application */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Eligibility & Application</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Eligibility Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">South African citizen or permanent resident</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Minimum Grade 12 (Matric) or equivalent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Unemployed or seeking skills development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Passion for technology and learning</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 list-decimal list-inside">
                    <li className="text-sm">Complete the online application form</li>
                    <li className="text-sm">Submit required documents (ID, Matric certificate)</li>
                    <li className="text-sm">Attend assessment and interview</li>
                    <li className="text-sm">Receive acceptance notification</li>
                    <li className="text-sm">Begin your learnership journey</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Start Your Learnership Journey</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Apply now and take the first step towards a rewarding career in IT with a nationally recognized qualification.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              Apply Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
