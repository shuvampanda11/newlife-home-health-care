import Time "mo:core/Time";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Iter "mo:core/Iter";

actor {
  type Inquiry = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type Booking = {
    id : Nat;
    name : Text;
    phone : Text;
    serviceType : Text;
    preferredDate : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Inquiry {
    public func compare(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      Nat.compare(inquiry1.id, inquiry2.id);
    };
  };

  module Booking {
    public func compare(booking1 : Booking, booking2 : Booking) : Order.Order {
      Nat.compare(booking1.id, booking2.id);
    };
  };

  let inquiries = Map.empty<Nat, Inquiry>();
  let bookings = Map.empty<Nat, Booking>();

  var nextInquiryId = 1;
  var nextBookingId = 1;

  public shared ({ caller }) func submitInquiry(name : Text, phone : Text, email : Text, message : Text) : async Nat {
    let inquiry : Inquiry = {
      id = nextInquiryId;
      name;
      phone;
      email;
      message;
      timestamp = Time.now();
    };

    inquiries.add(nextInquiryId, inquiry);
    let currentId = nextInquiryId;
    nextInquiryId += 1;
    currentId;
  };

  public shared ({ caller }) func submitBooking(name : Text, phone : Text, serviceType : Text, preferredDate : Text, message : Text) : async Nat {
    let booking : Booking = {
      id = nextBookingId;
      name;
      phone;
      serviceType;
      preferredDate;
      message;
      timestamp = Time.now();
    };

    bookings.add(nextBookingId, booking);
    let currentId = nextBookingId;
    nextBookingId += 1;
    currentId;
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.values().toArray().sort();
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookings.values().toArray().sort();
  };
};
