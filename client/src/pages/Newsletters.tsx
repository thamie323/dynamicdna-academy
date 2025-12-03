import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Calendar, Download, ExternalLink, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function Newsletters() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for subscribing! You'll receive our next newsletter.");
    setEmail("");
  };

  const newsletters = [
    {
      title: "MICT SETA Discretionary Grant Window for 2025/26",
      date: "November 2024",
      description: "Important updates on the MICT SETA discretionary grant application window, deadlines, and requirements for businesses and training providers.",
      topics: ["Grant Applications", "SETA Updates", "Skills Development"],
    },
    {
      title: "Uplifting Disabled Women in IT",
      date: "October 2024",
      description: "Highlighting our commitment to inclusive education and the success stories of women with disabilities who have excelled in our ICT training programs.",
      topics: ["Inclusion", "Success Stories", "4IR4HER"],
    },
    {
      title: "ICT is The Answer to South Africa's Youth Unemployment",
      date: "September 2024",
      description: "Exploring how ICT skills training can address the youth unemployment crisis and create sustainable career opportunities in the digital economy.",
      topics: ["Youth Development", "Employment", "Industry Insights"],
    },
    {
      title: "What are Discretionary and Mandatory SETA Grants?",
      date: "August 2024",
      description: "A comprehensive guide for businesses on understanding and accessing SETA grants for skills development and employee training.",
      topics: ["B-BBEE", "Corporate Training", "Grants"],
    },
    {
      title: "3rd Annual Workplace Skills Plan & B-BBEE Skills Development Workshop",
      date: "July 2024",
      description: "Recap of our annual workshop helping businesses navigate WSP submissions and maximize their B-BBEE skills development scorecard points.",
      topics: ["WSP", "B-BBEE", "Events"],
    },
    {
      title: "Graduation of 2023!",
      date: "June 2024",
      description: "Celebrating the achievements of our 2023 graduates who completed their learnerships and are now contributing to South Africa's digital transformation.",
      topics: ["Graduation", "Success Stories", "Achievements"],
    },
  ];

  const benefits = [
    "Latest news on ICT training and learnerships",
    "Industry insights and technology trends",
    "Success stories from our graduates",
    "Information on upcoming courses and programs",
    "B-BBEE and SETA grant updates",
    "Exclusive event invitations and workshops",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container text-center">
          <Mail className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="text-5xl font-bold mb-6">Newsletters</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Stay informed about the latest in ICT training, industry news, and opportunities
          </p>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                    <p className="text-muted-foreground mb-6">
                      Get the latest updates, industry insights, and exclusive content delivered directly to your inbox every month.
                    </p>
                    <div className="space-y-3">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold mb-2">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="text-base"
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full">
                        <Mail className="w-5 h-5 mr-2" />
                        Subscribe Now
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        We respect your privacy. Unsubscribe at any time.
                      </p>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Archive */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Newsletter Archive</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {newsletters.map((newsletter, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{newsletter.date}</span>
                  </div>
                  <CardTitle className="text-xl">{newsletter.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{newsletter.description}</p>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {newsletter.topics.map((topic, i) => (
                        <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">What We Cover</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our newsletters cover a wide range of topics relevant to ICT education, skills development, and the technology industry in South Africa.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="font-semibold text-sm">Training Updates</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="font-semibold text-sm">Industry News</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="font-semibold text-sm">Success Stories</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="font-semibold text-sm">Career Tips</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="font-semibold text-sm">B-BBEE Updates</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="font-semibold text-sm">Tech Trends</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="font-semibold text-sm">Events</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="font-semibold text-sm">Opportunities</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Don't Miss Out!</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of subscribers who stay informed about ICT training opportunities and industry developments.
          </p>
          <Button size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Subscribe to Newsletter
          </Button>
        </div>
      </section>
    </div>
  );
}
