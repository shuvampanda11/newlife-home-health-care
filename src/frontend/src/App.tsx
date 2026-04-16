import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Stethoscope,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
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
    img: "/assets/whatsapp_image_2026-04-06_at_10.50.03_pm-019d95a4-9a1d-74f5-88b8-dc4711e38b22.jpeg",
  },
  {
    name: "Diaper Pants",
    desc: "Pull-up style disposable pants for active users",
    img: "/assets/svaach_economy_adult_diaper_pants_medium_img_02_1-019d95a4-97dc-7408-b21a-eba7ad1456e0.jpg",
  },
  {
    name: "Underpads",
    desc: "Waterproof disposable bed protection pads",
    img: "/assets/whatsapp_image_2026-04-06_at_10.27.33_pm-019d95a4-97d1-7781-ae25-3cf2f9bdb5e9.jpeg",
  },
  {
    name: "Nebulizer Machine",
    desc: "Efficient aerosol therapy device for respiratory conditions",
    img: "/assets/dr-morepen-cn-10-nebulizer-original-imafkxzjqmhfunvh-019d95a4-97fc-772d-9c3a-a9f533074aad.webp",
  },
  {
    name: "Pulse Oximeter",
    desc: "Fingertip SpO2 and heart rate monitor",
    img: "/assets/download-019d6dc8-fa24-72af-afea-6b41f0256573.jpg",
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
  { label: "Our Doctor", href: "#doctor" },
  { label: "Our Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Procedures", href: "#procedures" },
  { label: "Contact Us", href: "#contact" },
];

const STATS = [
  { icon: "🏆", value: "6+", label: "Years of Experience" },
  { icon: "📅", value: "2019", label: "Established: 20 Jan 2019" },
  { icon: "🎓", value: "GNM", label: "Certified Professionals" },
  { icon: "🏥", value: "Apollo", label: "Hospital Trained Staff" },
];

const PROCEDURES = [
  {
    id: "dressing",
    name: "Wound Dressing",
    icon: "🩹",
    desc: "Professional wound care and sterile dressing changes performed by trained nurses, ensuring clean and safe recovery at home.",
    images: [
      "/assets/procedures/dressing-1.jpg",
      "/assets/procedures/dressing-2.jpg",
      "/assets/procedures/dressing-3.jpg",
      "/assets/procedures/dressing-4.jpg",
    ],
  },
  {
    id: "stitch",
    name: "Stitch",
    icon: "🧵",
    desc: "Professional stitching of wounds by trained nursing staff, ensuring clean closure with sterile technique to promote safe and quick healing.",
    images: [
      "/assets/procedures/stitch-1.jpg",
      "/assets/procedures/stitch-2.jpg",
      "/assets/procedures/stitch-3.jpg",
      "/assets/procedures/stitch-4.jpg",
    ],
  },
  {
    id: "anima",
    name: "Enema (Anima)",
    icon: "💊",
    desc: "Medically supervised enema procedures for bowel management, administered safely and with full dignity by our trained staff.",
    images: [
      "/assets/procedures/anima-1.jpg",
      "/assets/procedures/anima-2.jpg",
      "/assets/procedures/anima-3.jpg",
    ],
  },
  {
    id: "catheter",
    name: "Catheter Care",
    icon: "💉",
    desc: "Expert urinary catheter insertion, maintenance, and removal performed by certified nursing professionals with strict sterile protocols for patient comfort and safety.",
    images: [
      "/assets/procedures/catheter-1.jpg",
      "/assets/procedures/catheter-2.jpg",
      "/assets/procedures/catheter-3.jpg",
    ],
  },
  {
    id: "stitch-removal",
    name: "Stitch Removal",
    icon: "✂️",
    desc: "Careful and hygienic removal of sutures by certified nursing professionals at your home, minimising discomfort and reducing the risk of infection.",
    images: [
      "/assets/procedures/stitch-removal-1.jpg",
      "/assets/procedures/stitch-removal-2.jpg",
      "/assets/procedures/stitch-removal-3.jpg",
      "/assets/procedures/stitch-removal-4.jpg",
    ],
  },
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

function ProcedureSlider({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (idx: number, dir: number) => {
      setDirection(dir);
      setCurrent((idx + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div
        className="w-full h-52 rounded-xl flex flex-col items-center justify-center gap-3"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.38 0.085 218), oklch(0.55 0.10 210))",
        }}
      >
        <span className="text-4xl opacity-60">🖼️</span>
        <p className="text-white/70 text-sm font-medium">Images coming soon</p>
      </div>
    );
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="w-full">
      {/* Slider */}
      <div className="relative w-full h-52 rounded-xl overflow-hidden bg-muted">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={current}
            src={images[current]}
            alt={`${name} slide ${current + 1}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => goTo(current - 1, -1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => goTo(current + 1, 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {images.map((_, i) => (
            <button
              key={`dot-${
                // biome-ignore lint/suspicious/noArrayIndexKey: dots use index intentionally
                i
              }`}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "20px" : "8px",
                height: "8px",
                background:
                  i === current
                    ? "oklch(0.55 0.10 210)"
                    : "oklch(0.75 0.04 215)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProceduresSection() {
  return (
    <section id="procedures" className="py-16 px-4 max-w-6xl mx-auto">
      <SectionHeading
        title="Our Procedures"
        subtitle="Professional medical procedures performed safely and hygienically at your home by our certified nursing team."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROCEDURES.map((proc, i) => (
          <motion.div
            key={proc.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.45 }}
            className="bg-card rounded-2xl shadow-card border border-border p-5 flex flex-col gap-4"
            data-ocid={`procedures.item.${proc.id}`}
          >
            {/* Slider or placeholder */}
            <ProcedureSlider images={proc.images} name={proc.name} />

            {/* Info */}
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{proc.icon}</span>
                <h3 className="font-bold text-base text-foreground">
                  {proc.name}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                {proc.desc}
              </p>
              <button
                type="button"
                className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors mt-1 underline underline-offset-2 self-start"
                onClick={() => scrollTo("contact")}
              >
                Book Procedure →
              </button>
            </div>
          </motion.div>
        ))}
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

function DoctorSection() {
  return (
    <section id="doctor" className="py-16 px-4 max-w-6xl mx-auto">
      <SectionHeading
        title="Our Medical Advisor"
        subtitle="Expert guidance from a qualified geriatrician ensuring the highest standards of elder care."
      />
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl shadow-card border border-border p-8 max-w-md w-full"
          data-ocid="doctor.card"
        >
          {/* Avatar / Icon */}
          <div className="flex flex-col items-center text-center mb-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-md"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.12 200), oklch(0.5 0.1 230))",
              }}
            >
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-1"
              style={{ color: "oklch(0.55 0.10 210)" }}
            >
              Medical Advisor
            </p>
            <h3 className="text-xl font-bold text-foreground">
              Dr. Keshav Agarwal
            </h3>
            <p className="text-muted-foreground text-sm font-medium mt-1">
              MBBS, PGDGM, CCEBDM
            </p>
          </div>

          {/* Divider */}
          <div
            className="h-px w-full mb-6"
            style={{ background: "oklch(0.88 0.02 220)" }}
          />

          {/* Specialty */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
              style={{ background: "oklch(0.92 0.06 200)" }}
            >
              <span className="text-lg">👴</span>
            </span>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                Specialty
              </p>
              <p className="text-sm font-semibold text-foreground">
                Geriatrician (Elder Care)
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px w-full mb-4"
            style={{ background: "oklch(0.92 0.005 220)" }}
          />

          {/* Contact */}
          <div className="space-y-3">
            <a
              href="tel:+918670456104"
              className="flex items-center gap-3 text-sm text-foreground hover:text-teal-600 transition-colors group"
              data-ocid="doctor.phone_link_2"
            >
              <span
                className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0 group-hover:scale-110 transition-transform"
                style={{ background: "oklch(0.92 0.06 200)" }}
              >
                <span className="text-base">📞</span>
              </span>
              <span className="font-medium">+91 8670456104</span>
            </a>
          </div>
        </motion.div>
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
              src="/assets/generated/logo-transparent.dim_200x200.png"
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

      {/* ── Our Doctor ───────────────────────────────────────── */}
      <section style={{ background: "oklch(0.965 0.008 220)" }}>
        <DoctorSection />
      </section>

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

      {/* ── Procedures ───────────────────────────────────────── */}
      <ProceduresSection />

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
                  src="https://maps.google.com/maps?q=22.558167,88.417167&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="NewLife Home Health Care — 22°33′29.4″N 88°25′01.8″E"
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
                src="/assets/generated/logo-transparent.dim_200x200.png"
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
