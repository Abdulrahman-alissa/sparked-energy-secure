import { Phone, Mail, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About Us", href: "#why-us" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="container-main px-4 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          {/* Logo + Description */}
          <div>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#home");
              }}
              className="flex items-center gap-3 group mb-4"
            >
              <img
                src="/logo.png"
                alt="Electrical Facilities 24/7"
                className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
              />
              <div>
                <span className="text-lg font-bold">Electrical Facilities</span>
                <span className="text-lg text-electric ml-1">24/7</span>
              </div>
            </a>
            <p className="text-white/60 text-sm max-w-xs">
              Professional electrical services for residential and commercial
              properties. Quality, safety, and reliability guaranteed.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white/60 hover:text-electric text-sm bg-transparent border-none cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Our Services</h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li>Electrical Installation</li>
              <li>Maintenance & Repairs</li>
              <li>Fire Alarm Systems</li>
              <li>CCTV & Security</li>
              <li>Lighting Solutions</li>
              <li>Safety Inspections</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="text-electric mt-0.5" />
                <a
                  href="tel:+447359640666"
                  className="hover:text-electric transition-colors"
                >
                  +44 7359 640666
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="w-5 h-5 text-green-500 mt-0.5" />
                <a
                  href="https://wa.me/447359640666"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-electric mt-0.5" />
                <a
                  href="mailto:info@electricalfacilities247.com"
                  className="hover:text-electric transition-colors"
                >
                  info@electricalfacilities247.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="text-electric mt-0.5" />
                <span>London, UK</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 text-center text-white/40 text-sm">
          © {currentYear} Electrical Facilities 24/7. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;