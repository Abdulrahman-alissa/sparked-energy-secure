import { CheckCircle2, Users, Clock, Award, ThumbsUp, Headphones, ShieldCheck } from "lucide-react";

const features = [

  {
    icon: ShieldCheck,
    title: "NAPIT Certified",
    description: "Our electricians are certified by NAPIT, ensuring all electrical installations, inspections, and testing meet the highest UK safety and compliance standards.",
  },
  {
    icon: Clock,
    title: "Fast Response Time",
    description: "We understand emergencies. That's why we offer 24/7 emergency services with quick response.",
  },
  {
    icon: ThumbsUp,
    title: "Quality Guaranteed",
    description: "We stand behind our work with comprehensive warranties and satisfaction guarantees.",
  },
  {
    icon: Users,
    title: "Customer Focused",
    description: "Your needs come first. We listen, advise, and deliver solutions tailored to you.",
  },
  {
    icon: CheckCircle2,
    title: "Transparent Pricing",
    description: "No hidden fees or surprises. We provide detailed quotes before starting any work.",
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    description: "Our relationship doesn't end with the job. We provide continued support and maintenance.",
  },
];
const WhyChooseUs = () => {
  return (
    <section id="about" className="section-padding bg-muted/50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--electric)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-main relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full border border-electric/30 bg-electric/10 text-electric text-sm font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Your Trusted Electrical Partner
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            With over 10 years of experience, we've built a reputation for excellence, 
            reliability, and customer satisfaction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-electric/40 hover:shadow-lg transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl electric-gradient flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl bg-card border border-border shadow-md">
          {[
            { value: "250+", label: "Projects Completed" },
            { value: "10+", label: "Years Experience" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "24/7", label: "Support Available" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-electric mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
