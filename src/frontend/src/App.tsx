import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { BookingModal } from "./components/BookingModal";
import { useSubmitInquiry } from "./hooks/useQueries";

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: "🏥",
    title: "GNM Nursing Care",
    desc: "Qualified General Nursing & Midwifery care at home",
  },
  {
    icon: "💉",
    title: "ANM Services",
    desc: "Auxiliary Nursing & Midwifery support services",
  },
  {
    icon: "🤝",
    title: "GDA Support",
    desc: "General Duty Assistant for daily patient support",
  },
  {
    icon: "🫀",
    title: "ICU Care at Home",
    desc: "Intensive critical care monitoring in your home",
  },
  {
    icon: "👴",
    title: "Old Age Care",
    desc: "Compassionate elderly care & companionship",
  },
  {
    icon: "🩹",
    title: "Dressing & Catheterization",
    desc: "Professional wound dressing & catheter care",
  },
  {
    icon: "🚑",
    title: "Ambulance Service",
    desc: "24/7 emergency & scheduled ambulance transport",
  },
  {
    icon: "🩺",
    title: "Medical Equipment",
    desc: "Supply & maintenance of home medical devices",
  },
];

const PRODUCTS = [
  {
    name: "Adult Diapers",
    desc: "High-absorbency adult protective underwear for comfort and dignity",
    img: "/assets/whatsapp_image_2026-04-06_at_10.50.03_pm-019d6d6c-55bc-71e0-8100-52148c9444e5.jpeg",
  },
  {
    name: "Diaper Pants",
    desc: "Pull-up style disposable pants for active users",
    img: "/assets/svaach_economy_adult_diaper_pants_medium_img_02_1-019d6d4e-4042-7536-b4bf-f17962a5d194.jpg",
  },
  {
    name: "Underpads / Bed Pads",
    desc: "Waterproof disposable bed protection pads",
    img: "/assets/whatsapp_image_2026-04-06_at_10.27.33_pm-019d6d41-c112-73a5-9fa1-34ef8b5b2e46.jpeg",
  },
  {
    name: "Nebulizer Machine",
    desc: "Efficient aerosol therapy device for respiratory conditions",
    img: "/assets/whatsapp_image_2026-04-06_at_10.47.05_pm-019d63ff-7468-76aa-a48d-5e2077598ab3.jpeg",
  },
  {
    name: "Pulse Oximeter",
    desc: "Fingertip SpO2 and heart rate monitor",
    img: "/assets/whatsapp_image_2026-04-06_at_10.47.22_pm-019d63ff-7473-73dd-9c78-1a82bd6ffcf4.jpeg",
  },
  {
    name: "Blood Pressure Monitor",
    desc: "Digital automatic BP monitor for home use",
    img: "/assets/whatsapp_image_2026-04-06_at_10.48.01_pm-019d63ff-7472-722d-b143-cc480a2addd9.jpeg",
  },
  {
    name: "Glucometer",
    desc: "Accurate blood glucose monitoring kit",
    img: "/assets/whatsapp_image_2026-04-06_at_10.48.15_pm-019d63ff-747b-73ea-850d-0205bb5cc04c.jpeg",
  },
  {
    name: "Thermometer",
    desc: "Digital non-contact infrared thermometer",
    img: "/assets/whatsapp_image_2026-04-06_at_10.48.35_pm-019d63ff-743c-7181-9cdf-1e406195aaac.jpeg",
  },
  {
    name: "Surgical Gloves",
    desc: "Sterile latex gloves for clinical and home use",
    img: "/assets/whatsapp_image_2026-04-06_at_10.48.51_pm-019d63ff-7383-773c-9725-92055a35c18e.jpeg",
  },
  {
    name: "Catheter",
    desc: "Foley urinary catheters in multiple French sizes",
    img: "/assets/whatsapp_image_2026-04-06_at_10.49.13_pm-019d63ff-748d-73ce-8742-98a0c18ccf23.jpeg",
  },
  {
    name: "Uro Bag",
    desc: "Urine drainage collection bag with anti-reflux valve",
    img: "/assets/whatsapp_image_2026-04-06_at_10.48.01_pm-019d6d46-6a4f-739c-b983-af9fee210905.jpeg",
  },
  {
    name: "Syringe & Needles",
    desc: "Disposable sterile syringes in multiple capacities",
    img: "/assets/whatsapp_image_2026-04-06_at_10.49.48_pm-019d63ff-733a-7728-8276-063f245bf911.jpeg",
  },
  {
    name: "IV Cannula",
    desc: "Intravenous cannulas for safe fluid administration",
    img: "/assets/whatsapp_image_2026-04-06_at_10.50.03_pm-019d63ff-733c-7266-b797-790dece5d8d6.jpeg",
  },
  {
    name: "Bladder Wash Syringe",
    desc: "Sterile syringe used for bladder irrigation and washing procedures, ideal for catheter care at home.",
    img: "/assets/whatsapp_image_2026-04-07_at_1.41.59_am-019d6d4a-7e77-710d-9187-b33928d18fc0.jpeg",
  },
];

const SERVICE_AREAS = [
  { icon: "📍", name: "Nayapally" },
  { icon: "📍", name: "Sector IV" },
  { icon: "📍", name: "Bidhannagar" },
  { icon: "📍", name: "Kolkata – 700105" },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Contact Us", href: "#contact" },
];

const STATS = [
  { icon: "🏆", value: "6+", label: "Years of Experience" },
  { icon: "📅", value: "2019", label: "Established: 20 Jan 2019" },
  { icon: "🎓", value: "GNM", label: "Certified Professionals" },
  { icon: "🏥", value: "Apollo", label: "Hospital Trained Staff" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function openWhatsAppInquiry({
  name,
  phone,
  email,
  message,
}: {
  name: string;
  phone: string;
  email: string;
  message: string;
}) {
  const text = `New Enquiry from NewLife Home Health Care website:

Name: ${name}
Phone: ${phone}
Email: ${email}
Message: ${message}`;
  const url = `https://wa.me/918670456104?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionHeading({
  title,
  subtitle,
}: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className="mx-auto mt-3 h-1 w-14 rounded-full"
        style={{ background: "oklch(0.55 0.10 210)" }}
      />
    </div>
  );
}

function StatsBar() {
  return (
    <section
      className="py-8 px-4"
      style={{ background: "oklch(0.38 0.085 218)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="flex flex-col items-center text-center px-4 py-4 relative"
            >
              {/* Divider between items (not after last) */}
              {i < STATS.length - 1 && (
                <span
                  className="hidden md:block absolute right-0 top-1/4 h-1/2 w-px"
                  style={{ background: "oklch(1 0 0 / 0.15)" }}
                />
              )}
              <span className="text-3xl mb-1">{stat.icon}</span>
              <span
                className="text-2xl font-extrabold tracking-tight"
                style={{ color: "oklch(0.88 0.10 195)" }}
              >
                {stat.value}
              </span>
              <span className="text-white/75 text-xs mt-0.5 font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 px-4"
      style={{ background: "oklch(0.965 0.008 220)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-2"
              style={{ color: "oklch(0.55 0.10 210)" }}
            >
              Who We Are
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 leading-snug">
              About NewLife Home Health Care
            </h2>
            <div
              className="h-1 w-14 rounded-full mb-6"
              style={{ background: "oklch(0.55 0.10 210)" }}
            />
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
              NewLife Home Health Care was established on{" "}
              <strong className="text-foreground">20th January, 2019</strong>{" "}
              with a mission to provide reliable and compassionate healthcare
              services at home.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 shrink-0 w-5 h-5"
                  style={{ color: "oklch(0.55 0.10 210)" }}
                />
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Our team includes trained professionals with{" "}
                  <strong className="text-foreground">
                    Diploma in General Nursing and Midwifery (GNM)
                  </strong>
                  , which is a 3-year program along with clinical internship
                  experience.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 shrink-0 w-5 h-5"
                  style={{ color: "oklch(0.55 0.10 210)" }}
                />
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  We have professional experience associated with reputed
                  healthcare institutions like{" "}
                  <strong className="text-foreground">
                    Apollo Multispeciality Hospitals, Kolkata
                  </strong>
                  , with over 3 years of hands-on experience in patient care and
                  medical services.
                </p>
              </li>
            </ul>
          </motion.div>

          {/* Right: Info card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            {/* Years of experience badge */}
            <div
              className="rounded-2xl p-6 text-white text-center shadow-lg"
              style={{ background: "oklch(0.43 0.09 220)" }}
            >
              <div
                className="text-6xl font-extrabold leading-none mb-1"
                style={{ color: "oklch(0.88 0.10 195)" }}
              >
                6+
              </div>
              <div className="text-lg font-semibold text-white/90">
                Years of Experience
              </div>
              <div className="text-white/60 text-sm mt-1">
                Serving families since 2019
              </div>
            </div>

            {/* Establishment & team highlights */}
            <div className="rounded-2xl border border-border bg-card shadow-card p-6 space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    Date of Establishment
                  </p>
                  <p className="text-muted-foreground text-sm">
                    20th January, 2019
                  </p>
                </div>
              </div>
              <div
                className="h-px w-full"
                style={{ background: "oklch(0.92 0.005 220)" }}
              />
              <div className="flex items-start gap-4">
                <span className="text-2xl">🎓</span>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    Qualified Nursing Staff
                  </p>
                  <p className="text-muted-foreground text-sm">
                    GNM Diploma (3-year programme + internship)
                  </p>
                </div>
              </div>
              <div
                className="h-px w-full"
                style={{ background: "oklch(0.92 0.005 220)" }}
              />
              <div className="flex items-start gap-4">
                <span className="text-2xl">🏥</span>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    Apollo Hospital Trained
                  </p>
                  <p className="text-muted-foreground text-sm">
                    3+ years at Apollo Multispeciality Hospitals, Kolkata
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon,
  title,
  desc,
  index,
}: { icon: string; title: string; desc: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-shadow border border-border p-5 flex flex-col items-center text-center gap-3 group"
      data-ocid={`services.item.${index + 1}`}
    >
      <div className="text-4xl">{icon}</div>
      <h3 className="font-bold text-base text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed flex-1">
        {desc}
      </p>
      <button
        type="button"
        className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors mt-1 underline underline-offset-2"
        onClick={() => scrollTo("contact")}
      >
        Learn More →
      </button>
    </motion.div>
  );
}

function ProductCard({
  name,
  desc,
  img,
  index,
}: { name: string; desc: string; img: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-shadow border border-border p-4 flex flex-col items-center text-center gap-3"
      data-ocid={`products.item.${index + 1}`}
    >
      <div className="w-full h-36 rounded-lg overflow-hidden bg-gray-50">
        <img src={img} alt={name} className="w-full h-full object-contain" />
      </div>
      <h3 className="font-bold text-sm text-foreground">{name}</h3>
      <p className="text-muted-foreground text-xs leading-relaxed flex-1">
        {desc}
      </p>
      <button
        type="button"
        className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors mt-1 underline underline-offset-2"
        onClick={() => scrollTo("contact")}
      >
        Learn More →
      </button>
    </motion.div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [cName, setCName] = useState("");
  const [cPhone, setCPhone] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cMessage, setCMessage] = useState("");
  const { mutateAsync, isPending } = useSubmitInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cName || !cPhone || !cEmail || !cMessage) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await mutateAsync({
        name: cName,
        phone: cPhone,
        email: cEmail,
        message: cMessage,
      });
      toast.success("Inquiry sent! We'll get back to you soon.");
      openWhatsAppInquiry({
        name: cName,
        phone: cPhone,
        email: cEmail,
        message: cMessage,
      });
      setCName("");
      setCPhone("");
      setCEmail("");
      setCMessage("");
    } catch {
      toast.error("Failed to send inquiry. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-ocid="inquiry.modal"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="inq-name" className="text-white/90">
            Name *
          </Label>
          <Input
            id="inq-name"
            placeholder="Your name"
            value={cName}
            onChange={(e) => setCName(e.target.value)}
            className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white"
            required
            data-ocid="inquiry.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="inq-phone" className="text-white/90">
            Phone *
          </Label>
          <Input
            id="inq-phone"
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            value={cPhone}
            onChange={(e) => setCPhone(e.target.value)}
            className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white"
            required
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="inq-email" className="text-white/90">
          Email *
        </Label>
        <Input
          id="inq-email"
          type="email"
          placeholder="your@email.com"
          value={cEmail}
          onChange={(e) => setCEmail(e.target.value)}
          className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white"
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="inq-message" className="text-white/90">
          Message *
        </Label>
        <Textarea
          id="inq-message"
          placeholder="How can we help you?"
          value={cMessage}
          onChange={(e) => setCMessage(e.target.value)}
          rows={4}
          className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white resize-none"
          required
          data-ocid="inquiry.textarea"
        />
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-white font-semibold hover:bg-white/90 transition-colors"
        style={{ color: "oklch(0.43 0.09 220)" }}
        data-ocid="inquiry.submit_button"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          "Send Inquiry"
        )}
      </Button>
    </form>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" id="home">
      <Toaster richColors position="top-center" />

      {/* ── Header ───────────────────────────────────────────── */}
      <header className="gradient-header">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/whatsapp_image_2026-04-06_at_10.14.16_pm-019d63f8-ba86-725f-bd7f-278a5b03d37e.jpeg"
              alt="NewLife Home Health Care"
              className="h-14 w-14 object-contain rounded-full bg-white/20 p-1"
            />
            <div>
              <h1 className="text-white font-bold text-lg md:text-xl leading-tight">
                NewLife Home Health Care
              </h1>
              <p className="text-white/80 text-xs md:text-sm">
                Professional Healthcare Services at Home
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-white/90 text-sm">
            <span className="flex items-center gap-1">📞 +91 8670456104</span>
            <span className="flex items-center gap-1">
              📧 newlifehomehealthcarehome@gmail.com
            </span>
          </div>
        </div>
      </header>

      {/* ── Navigation ───────────────────────────────────────── */}
      <nav className="nav-bg sticky top-0 z-40 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-0 flex items-center justify-between">
          <div className="hidden md:flex items-center">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => scrollTo(link.href.slice(1))}
                className="text-white/90 hover:text-white font-medium text-sm px-4 py-4 transition-colors hover:bg-white/10"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-white p-4"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-0.5 bg-white mb-1" />
            <div className="w-5 h-0.5 bg-white mb-1" />
            <div className="w-5 h-0.5 bg-white" />
          </button>

          <Button
            onClick={() => setBookingOpen(true)}
            className="my-2 rounded-full font-semibold text-sm px-5 bg-white hover:bg-white/90 transition-colors"
            style={{ color: "oklch(0.43 0.09 220)" }}
            data-ocid="nav.primary_button"
          >
            Book Now
          </Button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-teal-700 pb-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => {
                  scrollTo(link.href.slice(1));
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-white/90 hover:text-white font-medium text-sm px-6 py-3 hover:bg-white/10 transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-[520px] md:min-h-[580px] flex items-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-healthcare.dim_1200x600.jpg')",
          }}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl"
          >
            <p className="text-teal-200 font-semibold text-sm uppercase tracking-widest mb-3">
              Trusted Home Healthcare
            </p>
            <h2 className="text-white font-bold text-4xl md:text-5xl leading-tight mb-5">
              Expert Healthcare at the{" "}
              <span style={{ color: "oklch(0.84 0.09 200)" }}>Comfort</span> of
              Your Home
            </h2>
            <p className="text-white/75 text-base mb-8 leading-relaxed">
              Professional nursing, caregiver, and medical equipment services
              delivered right to your doorstep in Kolkata.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => scrollTo("services")}
                className="rounded-full px-6 font-semibold text-sm"
                style={{
                  background: "oklch(0.84 0.09 200)",
                  color: "oklch(0.27 0.07 228)",
                }}
                data-ocid="hero.primary_button"
              >
                Explore Services
              </Button>
              <Button
                onClick={() => setBookingOpen(true)}
                className="rounded-full px-6 font-semibold text-sm gradient-cta text-white border-0 hover:opacity-90"
                data-ocid="hero.secondary_button"
              >
                Get Free Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────── */}
      <StatsBar />

      {/* ── About Us ─────────────────────────────────────────── */}
      <AboutSection />

      {/* ── Services ─────────────────────────────────────────── */}
      <section id="services" className="py-16 px-4 max-w-6xl mx-auto">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive home healthcare tailored to your needs, delivered by qualified professionals."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────── */}
      <section
        id="products"
        className="py-16 px-4"
        style={{ background: "oklch(0.965 0.008 220)" }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Our Products"
            subtitle="High-quality medical supplies delivered to your home. Trusted brands at competitive prices."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {PRODUCTS.map((p, i) => (
              <ProductCard key={p.name} {...p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="gradient-cta py-14 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-white font-bold text-2xl md:text-3xl mb-4">
            🚀 Ready to Experience Professional Care?
          </h2>
          <p className="text-white/80 mb-7 text-sm md:text-base">
            Available in your area – Book our service today and let us bring
            expert healthcare right to your door.
          </p>
          <Button
            onClick={() => setBookingOpen(true)}
            className="rounded-full px-8 py-3 font-semibold text-sm bg-white hover:bg-white/90 transition-colors shadow-lg"
            style={{ color: "oklch(0.43 0.09 220)" }}
            data-ocid="cta.primary_button"
          >
            Book a Service
          </Button>
        </motion.div>
      </section>

      {/* ── Service Areas + Contact ───────────────────────────── */}
      <section id="contact" className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Service areas + contact info + proprietor */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">
              Service Areas
            </h2>
            <div
              className="h-1 w-12 rounded-full mb-6"
              style={{ background: "oklch(0.55 0.10 210)" }}
            />
            <div className="grid grid-cols-2 gap-3 mb-8">
              {SERVICE_AREAS.map((area) => (
                <div
                  key={area.name}
                  className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-3 shadow-xs"
                >
                  <span>{area.icon}</span>
                  <span className="font-semibold text-sm text-foreground">
                    {area.name}
                  </span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-1">
              Contact Us
            </h2>
            <div
              className="h-1 w-12 rounded-full mb-6"
              style={{ background: "oklch(0.55 0.10 210)" }}
            />
            <div className="space-y-4 text-sm">
              <a
                href="tel:+918670456104"
                className="flex items-center gap-3 text-foreground hover:text-teal-600 transition-colors"
                data-ocid="contact.link"
              >
                <span className="text-xl">📞</span>
                <span className="font-medium">+91 8670456104</span>
              </a>
              <a
                href="https://wa.me/918670456104"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground hover:text-green-600 transition-colors"
                data-ocid="contact.link"
              >
                <span className="text-xl">💬</span>
                <span className="font-medium">WhatsApp: +91 8670456104</span>
              </a>
              <a
                href="mailto:newlifehomehealthcarehome@gmail.com"
                className="flex items-center gap-3 text-foreground hover:text-teal-600 transition-colors break-all"
                data-ocid="contact.link"
              >
                <span className="text-xl">📧</span>
                <span className="font-medium">
                  newlifehomehealthcarehome@gmail.com
                </span>
              </a>
              <div className="flex items-start gap-3 text-foreground">
                <span className="text-xl mt-0.5">📍</span>
                <span className="font-medium">
                  Bidhannagar, Kolkata – 700105
                </span>
              </div>
            </div>

            {/* ── Proprietor / Owner ────────────────────────────── */}
            <div className="mt-8 rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">👤</span>
                <h3
                  className="text-sm font-bold uppercase tracking-wider"
                  style={{ color: "oklch(0.43 0.09 220)" }}
                >
                  Proprietor
                </h3>
              </div>
              <p className="text-base font-bold text-foreground mb-1">
                Malay Sarkar
              </p>
              <div className="flex items-start gap-2 text-muted-foreground text-sm">
                <span className="text-base mt-0.5">🏠</span>
                <p className="leading-relaxed">
                  Banbole, P.S – Itahar, P.O – Sanapur,
                  <br />
                  District – Uttar Dinajpur, PIN: 733143
                </p>
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                Find Us
              </h2>
              <div
                className="h-1 w-12 rounded-full mb-4"
                style={{ background: "oklch(0.55 0.10 210)" }}
              />
              <div className="rounded-xl overflow-hidden border border-border shadow-card">
                <iframe
                  src="https://maps.google.com/maps?q=Bidhannagar+Kolkata&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="NewLife location map"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Inquiry / Contact Form ────────────────────────────── */}
      <section
        className="py-16 px-4"
        style={{ background: "oklch(0.43 0.09 220)" }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Send Us a Message
            </h2>
            <p className="text-white/70 text-sm">
              Have questions? We'd love to hear from you.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="footer-bg text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/assets/whatsapp_image_2026-04-06_at_10.14.16_pm-019d63f8-ba86-725f-bd7f-278a5b03d37e.jpeg"
                alt="NewLife logo"
                className="h-10 w-10 object-contain rounded-full bg-white/10 p-0.5"
              />
              <span className="font-bold text-base">
                NewLife Home Health Care
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Professional healthcare services delivered with compassion, right
              at your home in Kolkata.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/80">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href.slice(1))}
                    className="text-white/60 hover:text-white transition-colors text-sm text-left"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services list */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/80">
              Our Services
            </h3>
            <ul className="space-y-2">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => scrollTo("services")}
                    className="text-white/60 hover:text-white transition-colors text-sm text-left"
                    data-ocid="footer.link"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="border-t py-4 px-4 text-center text-xs"
          style={{
            borderColor: "oklch(1 0 0 / 0.1)",
            color: "oklch(1 0 0 / 0.5)",
          }}
        >
          <p>
            © {new Date().getFullYear()} NewLife Home Health Care. All rights
            reserved.
          </p>
          <p className="mt-1">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      {/* ── Floating WhatsApp Button ──────────────────────────── */}
      <a
        href="https://wa.me/918670456104"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 whatsapp-green whatsapp-pulse w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
        data-ocid="whatsapp.button"
      >
        💬
      </a>

      {/* ── Booking Modal ─────────────────────────────────────── */}
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}
