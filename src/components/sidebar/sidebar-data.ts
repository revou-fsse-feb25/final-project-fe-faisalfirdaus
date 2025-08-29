import {
  Film,
  CalendarClock,
  Ticket,
  TicketCheck,
  UserCircle2,
  Settings,
  Heart,
} from "lucide-react";

export type NavSection = {
  title: string;
  items: { title: string; url: string; icon?: any }[];
};

export const adminNav: NavSection[] = [
  {
    title: "Management",
    items: [
      { title: "Movies", url: "/admin/movies", icon: Film },
      { title: "Showtimes", url: "/admin/showtimes", icon: CalendarClock },
      { title: "Users", url: "/admin/users", icon: UserCircle2 },
    ],
  },
  {
    title: "Commerce",
    items: [{ title: "Bookings", url: "/admin/bookings", icon: TicketCheck }],
  },
  {
    title: "System",
    items: [{ title: "Settings", url: "/admin/settings", icon: Settings }],
  },
];

export const userNav: NavSection[] = [
  {
    title: "Tickets",
    items: [{ title: "My Bookings", url: "/me/bookings", icon: Ticket }],
  },
  {
    title: "Account",
    items: [
      { title: "Profile", url: "/me/profile", icon: UserCircle2 },
      { title: "Settings", url: "/me/settings", icon: Settings },
    ],
  },
  {
    title: "Discover",
    items: [
      { title: "Movies", url: "/movies", icon: Film },
      { title: "Liked", url: "/me/liked", icon: Heart },
    ],
  },
];
