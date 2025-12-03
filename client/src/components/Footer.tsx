import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook, Twitter, Youtube, Linkedin } from "lucide-react";
import { APP_LOGO } from "@/const";

export default function Footer() {
  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Courses", href: "/courses" },
    { label: "Corporate Services", href: "/corporate" },
    { label: "News", href: "/news" },
  ];

  const forStudents = [
    { label: "Become a Learner", href: "/become-learner" },
    { label: "Learnerships", href: "/learnerships" },
    { label: "Professional Courses", href: "/courses" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={APP_LOGO} alt="DNAcademy" className="h-10 w-auto" />
              <div className="flex flex-col">
                <span className="text-lg font-bold">
                  <span className="text-primary">DNA</span>cademy
                </span>
                <span className="text-xs opacity-75">Digital Skills Training</span>
              </div>
            </div>
            <p className="text-sm opacity-75 mb-4">
              Empowering South Africa through future-ready ICT training. MICT SETA accredited and B-BBEE Level 1 contributor.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-sm opacity-75 hover:opacity-100 hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h3 className="text-lg font-bold mb-4">For Students</h3>
            <ul className="space-y-2">
              {forStudents.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-sm opacity-75 hover:opacity-100 hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm opacity-75">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+27117595940" className="hover:text-primary transition-colors">
                  +27 (0) 11 759 5940
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm opacity-75">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:enquiries@dynamicdna.co.za" className="hover:text-primary transition-colors">
                  enquiries@dynamicdna.co.za
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm opacity-75">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Johannesburg, South Africa</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-75">
            <p>© 2025 dynamicDNA-Academy. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
