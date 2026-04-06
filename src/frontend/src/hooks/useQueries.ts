import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
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
      if (!actor) throw new Error("Actor not ready");
      return actor.submitBooking(
        name,
        phone,
        serviceType,
        preferredDate,
        message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
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
      if (!actor) throw new Error("Actor not ready");
      return actor.submitInquiry(name, phone, email, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}
