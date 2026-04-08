import { useMutation } from "@tanstack/react-query";

export function useSubmitBooking() {
  return useMutation({
    mutationFn: async ({
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
    }) => {
      const text = `New Booking from NewLife Home Health Care website:

Name: ${name}
Phone: ${phone}
Service: ${serviceType}
Preferred Date: ${preferredDate}
Message: ${message}`;
      const url = `https://wa.me/918670456104?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");
      return { success: true };
    },
  });
}

export function useSubmitInquiry() {
  return useMutation({
    mutationFn: async ({
      name,
      phone,
      email,
      message,
    }: {
      name: string;
      phone: string;
      email: string;
      message: string;
    }) => {
      const text = `New Enquiry from NewLife Home Health Care website:

Name: ${name}
Phone: ${phone}
Email: ${email}
Message: ${message}`;
      const url = `https://wa.me/918670456104?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");
      return { success: true };
    },
  });
}
