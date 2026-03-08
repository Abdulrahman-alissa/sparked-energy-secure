import { motion } from "framer-motion";
import {
  Plug,
  Wrench,
  Flame,
  Camera,
  Lightbulb,
  ClipboardCheck,
} from "lucide-react";

const services = [
  {
    icon: Plug,
    title: "Electrical Installation",
    description:
      "Complete wiring, socket installation, and electrical system setup for new builds and renovations.",
    tags: ["Residential", "Commercial"],
  },
  {
    icon: Wrench,
    title: "Maintenance & Repairs",
    description:
      "Preventive maintenance programs and rapid emergency repairs to minimize downtime.",
    tags: ["24/7", "Emergency"],
  },
  {
    icon: Flame,
    title: "Fire Alarm Systems",
    description:
      "Design, installation, and maintenance of fire detection and alarm systems to BS 5839 standards.",
    tags: ["Compliance", "Safety"],
  },
  {
    icon: Camera,
    title: "CCTV & Security",
    description:
      "IP and analogue CCTV systems with remote monitoring, access control, and intruder alarms.",
    tags: ["HD", "Remote Access"],
  },
  {
    icon: Lightbulb,
    title: "Lighting Solutions",
    description:
      "Energy-efficient LED upgrades, emergency lighting, and bespoke architectural lighting design.",
    tags: ["Energy Saving", "LED"],
  },
  {
    icon: ClipboardCheck,
    title: "Safety Inspections",
    description:
      "EICR testing, PAT testing, and full electrical safety audits with certification.",
    tags: ["EICR", "PAT Testing"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2">
            Our Services
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Comprehensive electrical solutions for every need — from emergency
            repairs to full-scale installations.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-accent/40 hover:shadow-electric transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="flex gap-2 flex-wrap">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
