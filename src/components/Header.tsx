import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navRefs = useRef<HTMLButtonElement[]>([]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#why-us" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveLink(href); // move underline immediately
  };

  // Update underline whenever activeLink changes
  useLayoutEffect(() => {
    const index = navLinks.findIndex((link) => link.href === activeLink);
    const btn = navRefs.current[index];
    if (btn) {
      setUnderlineStyle({ left: btn.offsetLeft, width: btn.offsetWidth });
    }
  }, [activeLink]);

  // Update active link on scroll
  useEffect(() => {
    const handleScroll = () => {
      navLinks.forEach((link) => {
        const section = document.querySelector(link.href);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            setActiveLink(link.href);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force initial underline after refs are set
  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveLink("#home");
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 hero-gradient backdrop-blur-sm transition-all duration-300">
      <div className="container-main">
        <div className="flex items-center justify-between h-20 px-4 md:px-8 relative">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#home");
            }}
            className="flex items-center gap-3 group"
          >
            <img
              src="/logo.png"
              alt="Electrical Facilities 24/7"
              className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <div>
              <span className="text-lg font-display font-bold text-primary-foreground">
                Electrical Facilities
              </span>
              <span className="text-lg font-display font-bold text-electric ml-1">
                24/7
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 relative">
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                ref={(el) => {
                  if (el) navRefs.current[index] = el;
                }}
                onClick={() => scrollTo(link.href)}
                className="text-primary-foreground/80 hover:text-electric transition-colors duration-300 font-medium bg-transparent border-none cursor-pointer relative py-1"
              >
                {link.name}
              </button>
            ))}

            {/* Moving Underline */}
            <span
              className="absolute bottom-0 h-[2px] bg-electric transition-all duration-300"
              style={{ left: underlineStyle.left, width: underlineStyle.width }}
            />
          </nav>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <Button
              variant="electric"
              size="lg"
              onClick={() => scrollTo("#contact")}
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 hero-gradient border-t border-primary-foreground/10 animate-fade-in">
            <nav className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="text-primary-foreground/80 hover:text-electric transition-colors duration-300 font-medium py-2 bg-transparent border-none cursor-pointer text-left"
                >
                  {link.name}
                </button>
              ))}
              <Button
                variant="electric"
                size="lg"
                className="mt-2"
                onClick={() => scrollTo("#contact")}
              >
                Get a Quote
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;