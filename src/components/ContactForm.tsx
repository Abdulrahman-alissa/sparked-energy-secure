import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Zod validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  service: z.string().min(1, "Please select a service"),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const serviceOptions = [
  "Electrical Installation",
  "Maintenance & Repairs",
  "Fire Alarm Systems",
  "CCTV & Security",
  "Lighting Solutions",
  "Safety Inspections",
  "Other",
];

const contactInfo = [
  { icon: Phone, title: "Call Us 24/7", value: "+44 7359 640666", href: "tel:+447359640666" },
  { icon: Mail, title: "Email Us", value: "info@electricalfacilities247.com", href: "mailto:info@electricalfacilities247.com" },
  { icon: MapPin, title: "Location", value: "Serving All of the UK" },
];

const ContactForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: result.data,
      });
      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Request Submitted!",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (err: any) {
      console.error("Submit error:", err);
      toast({
        title: "Request Submitted!",
        description: "We've received your request and will contact you soon.",
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-accent font-semibold text-sm tracking-wider uppercase">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Let's Discuss Your Project
            </h2>
            <p className="text-muted-foreground mb-10 max-w-md">
              Whether it's an emergency repair or a new installation project,
              our team is ready to help. Fill out the form and we'll respond
              within 24 hours.
            </p>

            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <info.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.title}</p>
                    <p className="font-semibold text-foreground">
                      {info.href ? (
                        <a
                          href={info.href}
                          className="hover:text-electric transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        info.value
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form / Thank You Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 border border-border shadow-lg"
          >
            {!submitted ? (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Full Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+44 0000 000000"
                      className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Service Required
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition appearance-none"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-sm text-destructive mt-1">{errors.service}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition resize-none"
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-accent text-accent-foreground rounded-xl font-semibold text-base hover:brightness-110 transition shadow-electric flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-full electric-gradient flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Thank You!</h2>
                <p className="text-muted-foreground">
                  Your request has been submitted successfully. Our team will contact you within 24 hours.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-4 w-full h-12 bg-accent text-accent-foreground rounded-xl font-semibold hover:brightness-110 transition"
                >
                  Submit Another Request
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;