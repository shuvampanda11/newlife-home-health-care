import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    id: bigint;
    serviceType: string;
    name: string;
    message: string;
    preferredDate: string;
    timestamp: Time;
    phone: string;
}
export interface Inquiry {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllBookings(): Promise<Array<Booking>>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    submitBooking(name: string, phone: string, serviceType: string, preferredDate: string, message: string): Promise<bigint>;
    submitInquiry(name: string, phone: string, email: string, message: string): Promise<bigint>;
}
