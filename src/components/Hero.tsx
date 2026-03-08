import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-electrical.jpg";

// AnimatedNumber component for stats
const AnimatedNumber = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const interval = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-gradient">
      {count}
      {suffix}
    </span>
  );
};

const Hero = () => {
  const stats = [
    { icon: Shield, label: "Licensed & Insured", value: 100, suffix: "%" },
    { icon: Clock, label: "24/7 Emergency", value: 24, suffix: "/7" },
    { icon: Award, label: "Years Experience", value: 10, suffix: "+" },
    { icon: ArrowRight, label: "Projects Completed", value: 250, suffix: "+" },
  ];

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center hero-gradient overflow-hidden pt-20"
    >
      {/* Background Image & Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional electrical services"
          className="w-full h-full object-cover opacity-30"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(220 50% 28% / 0.75) 0%, hsl(220 40% 40% / 0.65) 100%)",
          }}
        />
      </div>

      {/* Glow Elements */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{ background: "var(--gradient-glow)" }}
      />

      {/* Hero Content */}
      <div className="container-main relative z-10 px-4 md:px-8 py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Content */}
          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric/30 bg-electric/10">
              <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
              <span className="text-electric text-sm font-medium">
                Trusted Electrical Experts
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight">
              Professional <span className="text-gradient">Electrical</span>
              <br />
              Solutions You Can Trust
            </h1>

            <p className="text-lg text-primary-foreground/80 max-w-xl">
              From installation and maintenance to fire alarms and CCTV systems, we provide
              comprehensive electrical services for residential and commercial properties
              with guaranteed quality and safety.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="electric"
                size="xl"
                className="group"
                onClick={() => scrollTo("#contact")}
              >
                Get Free Estimate
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="navyOutline" size="xl" onClick={() => scrollTo("#services")}>
                Our Services
              </Button>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-electric/20">
              <img
                src={heroImage}
                alt="Electrical work in progress"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg electric-gradient flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-foreground text-sm">
                        Certified & Insured
                      </p>
                      <p className="text-muted-foreground text-xs">
                        10+ years of trusted service
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 glass rounded-2xl p-6"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="text-white/60 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;