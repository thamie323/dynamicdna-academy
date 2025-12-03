import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, Cloud, Shield, Laptop, Users, Clock, Award } from "lucide-react";
import { Link } from "wouter";

export default function Courses() {
  const courses = [
    {
      icon: Code,
      title: "Software Development",
      duration: "12 weeks",
      level: "Beginner to Advanced",
      description: "Learn modern programming languages and frameworks including Python, JavaScript, React, and more. Build real-world applications and develop problem-solving skills.",
      topics: ["HTML/CSS", "JavaScript", "React", "Python", "Git & GitHub"],
    },
    {
      icon: Database,
      title: "Data Science & Analytics",
      duration: "10 weeks",
      level: "Intermediate",
      description: "Master data analysis, visualization, and machine learning. Work with real datasets and learn to extract meaningful insights using industry-standard tools.",
      topics: ["Python", "SQL", "Data Visualization", "Machine Learning", "Statistics"],
    },
    {
      icon: Cloud,
      title: "Cloud Computing",
      duration: "8 weeks",
      level: "Intermediate",
      description: "Understand cloud infrastructure, deployment, and management. Gain hands-on experience with major cloud platforms and learn DevOps practices.",
      topics: ["AWS/Azure", "Docker", "Kubernetes", "CI/CD", "Cloud Architecture"],
    },
    {
      icon: Shield,
      title: "Cybersecurity Fundamentals",
      duration: "10 weeks",
      level: "Beginner to Intermediate",
      description: "Learn to protect systems and networks from cyber threats. Understand security principles, ethical hacking, and risk management.",
      topics: ["Network Security", "Ethical Hacking", "Cryptography", "Security Protocols", "Risk Assessment"],
    },
    {
      icon: Laptop,
      title: "Web Development",
      duration: "12 weeks",
      level: "Beginner",
      description: "Build modern, responsive websites and web applications. Learn both front-end and back-end development with the latest technologies.",
      topics: ["HTML/CSS", "JavaScript", "Node.js", "Databases", "Responsive Design"],
    },
    {
      icon: Users,
      title: "Digital Marketing",
      duration: "6 weeks",
      level: "Beginner",
      description: "Master digital marketing strategies including SEO, social media marketing, content creation, and analytics to grow businesses online.",
      topics: ["SEO", "Social Media", "Content Marketing", "Google Analytics", "Email Marketing"],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Large Image */}
      <section className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('/courses-hero-large.jpg')" }}>
        <div className="absolute inset-0 bg-primary/85"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-3xl text-primary-foreground">
            <h1 className="text-5xl font-bold mb-6">Professional Courses</h1>
            <p className="text-2xl">
              Enhance your skills with our industry-aligned professional courses designed for career advancement and digital transformation
            </p>
          </div>
        </div>
      </section>

      {/* Course Benefits */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Industry-Recognized</h3>
              <p className="text-sm text-muted-foreground">Certificates aligned with industry standards</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Expert Instructors</h3>
              <p className="text-sm text-muted-foreground">Learn from experienced professionals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Laptop className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Hands-On Learning</h3>
              <p className="text-sm text-muted-foreground">Practical projects and real-world applications</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Flexible Learning</h3>
              <p className="text-sm text-muted-foreground">Online and in-person options available</p>
            </div>
          </div>

          {/* Course Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              const Icon = course.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{course.title}</CardTitle>
                    <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {course.level}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{course.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-sm">Key Topics:</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.topics.map((topic, i) => (
                          <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">Learn More</Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Enroll in our courses today and take the first step towards a successful career in technology.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              Contact Us to Enroll
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
