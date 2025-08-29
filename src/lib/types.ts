export type Role = "USER" | "ADMIN";
export type StudioType = "Regular" | "IMAX" | "Premier";
export type MovieStatus = "COMING_SOON" | "NOW_SHOWING" | "ARCHIVED";
export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Claimed"
  | "Cancelled"
  | "Expired";
export type PaymentStatus = "Delayed" | "Success" | "Failed";

// ---- Auth DTOs ----
export interface LoginResponseDto {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    email: string;
    role: Role;
    username: string;
    phone: string | null;
    created_at: string; // Date serialized
  };
}

export interface RegisterResponseDto {
  id: number;
  email: string;
  username: string;
  role: Role;
  phone?: string | null;
  createdAt: string; // Date serialized
}

export interface RefreshResponseDto {
  access_token: string;
  refresh_token: string;
}

// ---- Movies ----
export interface MoviesListResponseDto {
  items: Array<{
    movie_id: number;
    title: string;
    description?: string;
    duration_minutes: number;
    poster_url: string;
    status: MovieStatus | string;
    is_active?: boolean;
  }>;
  nextCursor?: string | null;
}

export interface MovieDetailResponseDto {
  movie_id: number;
  title: string;
  description: string;
  duration_minutes: number;
  poster_url: string;
  status: MovieStatus | string;
  is_active: boolean;
  genres: { genre_id: number; name: string }[];
}

export interface MovieShowtimeDatesResponseDto {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface MovieShowtimesResponseDto {
  theater_id: number;
  theater_name: string;
  entries: Array<{
    showtimeId: number;
    timeHHmm: string; // "19:30"
    studioName: string;
    studioType: StudioType | string;
    price: number;
  }>;
}

// ---- Showtimes ----
export interface ShowtimeDetailDto {
  showtime_id: number;
  movie_id: number;
  studio_id: number;
  show_datetime: string; // ISO
  price: number;
  is_active: boolean;
  movie_title: string;
  theater_name: string;
  studio_name: string;
}

export type SeatStatus = "AVAILABLE" | "HELD" | "BOOKED" | "BLOCKED";

export interface ShowtimeSeatAvailabilityDto {
  seat_id: number;
  row: string; // e.g., "A"
  number: number; // 1..N
  status: SeatStatus;
  hold_expires_at?: string; // ISO
}

// ---- Bookings ----
export interface BookingDetailDto {
  booking_reference: string;
  booking_status: BookingStatus;
  user_id: number;
  showtime_id: number;
  total_amount: number;
  hold_expires_at?: string | null;
  seats: Array<{
    booking_seat_id: number;
    seat_id: number;
    row: string;
    number: number;
    price: number;
  }>;
  payments: Array<{
    payment_id: number;
    amount: number;
    payment_time: string; // ISO
    status: PaymentStatus;
  }>;
}

// ---- Payments ----
export interface PaymentListItemDto {
  payment_id: number;
  amount: number;
  payment_time: string; // ISO
  status: PaymentStatus;
}

// ---- Theaters / Studios (admin & detail pages) ----
export interface TheaterListItemDto {
  theater_id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
}

export interface TheaterDetailDto extends TheaterListItemDto {
  studios: Array<{
    studio_id: number;
    studio_name: string;
    studio_type: StudioType;
    total_seats: number;
  }>;
}

export interface StudioDetailDto {
  studio_id: number;
  theater_id: number;
  studio_name: string;
  total_seats: number;
  studio_type: StudioType;
}

export interface SeatLayoutItemDto {
  seat_id: number;
  row_letter: string;
  seat_number: number;
  is_blocked: boolean;
}

// ---- Genres (admin) ----
export interface GenreResponseDto {
  genre_id: number;
  name: string;
}

// ---- Generic error shape (optional) ----
export interface ApiError {
  status: number;
  message: string;
  details?: unknown;
}

// ---- Me / Profile ----
export type Me = LoginResponseDto["user"];

export interface UpdateMeDto {
  username?: string;
  phone?: string | null;
}
