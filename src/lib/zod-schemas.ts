import { z } from "zod";

// ---- Auth ----
export const ZUserLoginInfo = z.object({
  id: z.number(),
  email: z.string().email(),
  role: z.enum(["USER", "ADMIN"]),
  username: z.string(),
  phone: z.string().nullable(),
  created_at: z.string(), // ISO
});

export const ZLoginResponse = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  user: ZUserLoginInfo,
});

export const ZRegisterResponse = z.object({
  id: z.number(),
  email: z.string().email(),
  username: z.string(),
  role: z.enum(["USER", "ADMIN"]),
  phone: z.string().nullable().optional(),
  createdAt: z.string(), // ISO
});

export const ZRefreshResponse = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

// ---- Movies ----
export const ZMoviesList = z.object({
  items: z.array(
    z.object({
      movie_id: z.number(),
      title: z.string(),
      description: z.string().optional(),
      duration_minutes: z.number(),
      poster_url: z.string(),
      status: z.string(),
      is_active: z.boolean().optional(),
    })
  ),
  nextCursor: z.string().nullable().optional(),
});

export const ZMovieDetail = z.object({
  movie_id: z.number(),
  title: z.string(),
  description: z.string(),
  duration_minutes: z.number(),
  poster_url: z.string(),
  status: z.string(),
  is_active: z.boolean(),
  genres: z.array(z.object({ genre_id: z.number(), name: z.string() })),
});

export const ZShowtimeDates = z.array(
  z.object({ date: z.string(), count: z.number() })
);

export const ZMovieShowtimes = z.array(
  z.object({
    theater_id: z.number(),
    theater_name: z.string(),
    entries: z.array(
      z.object({
        showtimeId: z.number(),
        timeHHmm: z.string(),
        studioName: z.string(),
        studioType: z.string(),
        price: z.number(),
      })
    ),
  })
);

// ---- Showtimes ----
export const ZShowtimeDetail = z.object({
  showtime_id: z.number(),
  movie_id: z.number(),
  studio_id: z.number(),
  show_datetime: z.string(),
  price: z.number(),
  is_active: z.boolean(),
  movie_title: z.string(),
  theater_name: z.string(),
  studio_name: z.string(),
});

export const ZShowtimeSeats = z.array(
  z.object({
    seat_id: z.number(),
    row: z.string(),
    number: z.number(),
    status: z.enum(["AVAILABLE", "HELD", "BOOKED", "BLOCKED"]),
    hold_expires_at: z.string().optional(),
  })
);

// ---- Bookings ----
export const ZBookingDetail = z.object({
  booking_reference: z.string(),
  booking_status: z.enum([
    "Pending",
    "Confirmed",
    "Claimed",
    "Cancelled",
    "Expired",
  ]),
  user_id: z.number(),
  showtime_id: z.number(),
  total_amount: z.number(),
  hold_expires_at: z.string().nullable().optional(),
  seats: z.array(
    z.object({
      booking_seat_id: z.number(),
      seat_id: z.number(),
      row: z.string(),
      number: z.number(),
      price: z.number(),
    })
  ),
  payments: z.array(
    z.object({
      payment_id: z.number(),
      amount: z.number(),
      payment_time: z.string(),
      status: z.enum(["Delayed", "Success", "Failed"]),
    })
  ),
});
