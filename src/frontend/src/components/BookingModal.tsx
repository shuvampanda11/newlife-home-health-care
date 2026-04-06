import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitBooking } from "../hooks/useQueries";

const SERVICE_TYPES = [
  "GNM Nursing Care",
  "ANM Services",
  "GDA Support",
  "ICU Care at Home",
  "Old Age Care",
  "Dressing & Catheterization",
  "Ambulance Service",
  "Medical Equipment",
];

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function openWhatsAppBooking({
  name,
  phone,
  serviceType,
  preferredDate,
  message,
}: {
  name: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  message: string;
}) {
  const text = `New Booking from NewLife Home Health Care website:

Name: ${name}
Phone: ${phone}
Service: ${serviceType}
Preferred Date: ${preferredDate}
Notes: ${message}`;
  const url = `https://wa.me/918670456104?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

export function BookingModal({ open, onOpenChange }: BookingModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");

  const { mutateAsync, isPending } = useSubmitBooking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !serviceType || !preferredDate) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await mutateAsync({ name, phone, serviceType, preferredDate, message });
      toast.success(
        "Booking submitted successfully! We'll contact you shortly.",
      );
      openWhatsAppBooking({ name, phone, serviceType, preferredDate, message });
      setName("");
      setPhone("");
      setServiceType("");
      setPreferredDate("");
      setMessage("");
      onOpenChange(false);
    } catch {
      toast.error("Failed to submit booking. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="booking.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-teal-700">
            Book a Service
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="booking-name">Full Name *</Label>
            <Input
              id="booking-name"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              data-ocid="booking.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="booking-phone">Phone Number *</Label>
            <Input
              id="booking-phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="booking-service">Service Type *</Label>
            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger data-ocid="booking.select">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_TYPES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="booking-date">Preferred Date *</Label>
            <Input
              id="booking-date"
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="booking-message">Message</Label>
            <Textarea
              id="booking-message"
              placeholder="Any special requirements or notes..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              data-ocid="booking.textarea"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              data-ocid="booking.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 gradient-cta text-white border-0 hover:opacity-90"
              disabled={isPending}
              data-ocid="booking.submit_button"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Submitting...
                </>
              ) : (
                "Book Now"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
