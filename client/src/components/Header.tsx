import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, Facebook, Linkedin, Instagram, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_LOGO } from "@/const";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "PROGRAMS", href: "/programs" },
    { label: "COURSES", href: "/courses" },
    { label: "LEARNERSHIPS", href: "/learnerships" },
    { label: "CORPORATE", href: "/corporate" },
    { label: "STUDENT HUB", href: "/student-hub" },
    { label: "NEWS", href: "/news" },
    { label: "CONTACT US", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Banner */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between py-2 text-sm">
            {/* Left: Contact Info */}
            <div className="flex items-center gap-4 mb-2 md:mb-0">
              <a href="tel:+27117595940" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">+27 (0) 11 759 5940</span>
              </a>
              <a href="mailto:enquiries@dynamicdna.co.za" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">enquiries@dynamicdna.co.za</span>
              </a>
            </div>

            {/* Right: Social Media & CTA Buttons */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/become-learner">
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium transition-all h-8 px-3 bg-primary hover:bg-primary/90 text-white">
                    Become a Learner
                  </button>
                </Link>
                <Link href="/become-client">
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium transition-all h-8 px-3 bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90">
                    Become a Client
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img src={APP_LOGO} alt="DNAcademy" className="h-12 w-auto" />
              <div className="flex flex-col">
                <span className="text-xl font-bold">
                  <span className="text-primary">DNA</span>
                  <span className="text-secondary">cademy</span>
                </span>
                <span className="text-xs text-muted-foreground hidden sm:inline">Digital Skills Training</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`text-sm font-semibold transition-colors hover:text-primary ${
                    isActive(item.href) ? "text-primary" : "text-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <button className="p-2 hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden pb-4 border-t">
              <div className="flex flex-col gap-2 pt-4">
                {navItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={`block py-2 text-sm font-semibold transition-colors hover:text-primary ${
                      isActive(item.href) ? "text-primary" : "text-secondary"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
