// lib/zod-schemas.ts
import { z } from "zod";

/* ============================================================================
 * Enums (align with Prisma/Backend)
 * ==========================================================================*/
export const ZRole = z.enum(["USER", "ADMIN"]);
export const ZStudioType = z.enum(["Regular", "IMAX", "Premier"]);
export const ZMovieStatus = z.enum(["COMING_SOON", "NOW_SHOWING", "ARCHIVED"]);
export const ZBookingStatus = z.enum([
  "Pending",
  "Confirmed",
  "Claimed",
  "Cancelled",
  "Expired",
]);
export const ZPaymentStatus = z.enum(["Delayed", "Success", "Failed"]);
export const ZSeatStatus = z.enum(["AVAILABLE", "HELD", "BOOKED", "BLOCKED"]);

/* ============================================================================
 * AUTH
 * ==========================================================================*/
// Inputs
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password must be at least 6 characters" }),

    // 👇 Instead of .nullable().optional().transform(...)
    phone: z
      .union([
        z.string().min(1).optional(),
        z.literal("").transform(() => undefined),
      ])
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const refreshTokenSchema = z.object({
  refresh_token: z.string().min(1),
});

// Responses
export const ZUserLoginInfo = z.object({
  id: z.number(),
  email: z.string().email(),
  role: ZRole,
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
  role: ZRole,
  phone: z.string().nullable().optional(),
  createdAt: z.string(), // ISO
});

export const ZRefreshResponse = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

// Types
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type RefreshInput = z.infer<typeof refreshTokenSchema>;

/* ============================================================================
 * USERS (Profile)
 * ==========================================================================*/
export const ZUsersResponseItem = z.object({
  id: z.number(),
  email: z.string().email(),
  role: ZRole,
  username: z.string(),
  phone: z.string().nullable().default(""),
  created_at: z.string(), // ISO
});

export const ZUsersResponse = z.array(ZUsersResponseItem);

export const updateProfileSchema = z.object({
  username: z.string().min(2).max(100).optional(),
  phone: z
    .string()
    .trim()
    .nullable()
    .optional()
    .refine(
      (v) => !v || v.length === 0 || /^[+\d][\d\s-()]+$/.test(v),
      "Invalid phone format"
    ),
});

/* ============================================================================
 * MOVIES
 * ==========================================================================*/
// Queries (inputs)
export const listMoviesQuerySchema = z.object({
  status: ZMovieStatus.optional(), // filter
  q: z.string().optional(), // search by title
  take: z.coerce.number().int().min(1).max(100).optional(),
  cursor: z.string().optional(), // pagination cursor
});

export const movieShowtimeDatesQuerySchema = z.object({
  from: z.string().optional(), // YYYY-MM-DD
  to: z.string().optional(), // YYYY-MM-DD
});

export const movieShowtimesQuerySchema = z.object({
  date: z.string(), // YYYY-MM-DD
  city: z.string().optional(), // optional city filter
});

// Admin create/update movie
export const createMovieSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  duration_minutes: z.number().int().positive(),
  poster_url: z.string().url(),
  status: ZMovieStatus,
  is_active: z.boolean().optional(),
  genres: z.array(z.number().int()).optional(), // genre ids
});

export const updateMovieSchema = createMovieSchema.partial();

// Responses
export const ZMoviesList = z.object({
  items: z.array(
    z.object({
      movie_id: z.number(),
      title: z.string(),
      description: z.string().optional(),
      duration_minutes: z.number(),
      poster_url: z.string(),
      status: z.string(), // keep string for flexibility on client
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

/* ============================================================================
 * SHOWTIMES
 * ==========================================================================*/
// Queries (admin list)
export const listShowtimesQuerySchema = z.object({
  movie_id: z.coerce.number().int().optional(),
  theater_id: z.coerce.number().int().optional(),
  date: z.string().optional(), // YYYY-MM-DD
  take: z.coerce.number().int().min(1).max(100).optional(),
  cursor: z.string().optional(),
});

// Admin create/update showtime
export const createShowtimeSchema = z.object({
  movie_id: z.number().int(),
  studio_id: z.number().int(),
  show_datetime: z.string(), // ISO
  price: z.number().int().min(0),
  is_active: z.boolean().optional(),
});

export const updateShowtimeSchema = createShowtimeSchema.partial();

// Responses
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
    status: ZSeatStatus,
    hold_expires_at: z.string().optional(),
  })
);

/* ============================================================================
 * THEATERS / STUDIOS / SEATS (Admin & Public)
 * ==========================================================================*/
// Theater queries
export const listTheatersQuerySchema = z.object({
  city: z.string().optional(),
  q: z.string().optional(),
  take: z.coerce.number().int().min(1).max(100).optional(),
  cursor: z.string().optional(),
});

// Theater create/update
export const createTheaterSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  phone: z.string().min(1),
});

export const updateTheaterSchema = createTheaterSchema.partial();

// Studio create/update
export const createStudioSchema = z.object({
  studio_name: z.string().min(1),
  total_seats: z.number().int().min(1),
  studio_type: ZStudioType,
});

export const updateStudioSchema = createStudioSchema.partial();

// Block seats (admin)
export const blockSeatsSchema = z.object({
  seatIds: z.array(z.number().int()).min(1),
  is_blocked: z.boolean(),
});

// Responses
export const ZTheaterListItem = z.object({
  theater_id: z.number(),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  phone: z.string(),
});

export const ZTheaterDetail = ZTheaterListItem.extend({
  studios: z.array(
    z.object({
      studio_id: z.number(),
      studio_name: z.string(),
      studio_type: ZStudioType,
      total_seats: z.number(),
    })
  ),
});

export const ZStudioDetail = z.object({
  studio_id: z.number(),
  theater_id: z.number(),
  studio_name: z.string(),
  total_seats: z.number(),
  studio_type: ZStudioType,
});

export const ZSeatLayoutItem = z.object({
  seat_id: z.number(),
  row_letter: z.string(),
  seat_number: z.number(),
  is_blocked: z.boolean(),
});

/* ============================================================================
 * BOOKINGS
 * ==========================================================================*/
// Inputs
export const createBookingSchema = z.object({
  showtime_id: z.number().int(),
  seat_ids: z.array(z.number().int()).min(1),
});

export const myBookingsQuerySchema = z.object({
  status: ZBookingStatus.optional(),
  take: z.coerce.number().int().min(1).max(100).optional(),
  cursor: z.string().optional(),
});

export const cancelBookingSchema = z.object({
  reason: z.string().min(1).optional(), // optional reason
});

// Responses
export const ZBookingDetail = z.object({
  booking_reference: z.string(),
  booking_status: ZBookingStatus,
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
      status: ZPaymentStatus,
    })
  ),
});

/* ============================================================================
 * PAYMENTS
 * ==========================================================================*/
// Inputs
export const createPaymentAttemptSchema = z.object({
  provider: z.string().default("dummy"), // or your provider id
  amount: z.number().int().positive().optional(), // optional override
});

// Responses
export const ZPaymentListItem = z.object({
  payment_id: z.number(),
  amount: z.number(),
  payment_time: z.string(), // ISO
  status: ZPaymentStatus,
});

export const ZPaymentList = z.array(ZPaymentListItem);

// Webhook (provider -> backend)
export const ZPaymentWebhookPayload = z.object({
  // example fields; adjust to your provider:
  event: z.string(),
  data: z.object({
    payment_id: z.number().optional(),
    booking_reference: z.string(),
    status: ZPaymentStatus.or(z.enum(["PENDING"])).optional(),
    amount: z.number().optional(),
    paid_at: z.string().optional(), // ISO
  }),
  signature: z.string().optional(),
});

/* ============================================================================
 * GENRES (Admin)
 * ==========================================================================*/
export const createGenreSchema = z.object({
  name: z.string().min(1),
});
export const updateGenreSchema = createGenreSchema.partial();

export const ZGenreResponseItem = z.object({
  genre_id: z.number(),
  name: z.string(),
});

export const ZGenreResponse = z.array(ZGenreResponseItem);

/* ============================================================================
 * Common helpers
 * ==========================================================================*/
export const ZOkDeleted = z.object({ deleted: z.boolean() });
export const ZOkAdded = z.object({ added: z.boolean() });
export const ZOkRemoved = z.object({ removed: z.boolean() });
export const ZOkUpdatedCount = z.object({ updated: z.number().int() });
export const ZOkClaimed = z.object({ claimed: z.boolean() });
export const ZOkCancelled = z.object({ cancelled: z.boolean() });
