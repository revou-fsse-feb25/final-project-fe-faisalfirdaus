import { Search, Bell } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 gap-10 bg-black/10 backdrop-blur-sm fixed z-10">
      <div className="flex items-center space-x-8">
        <Link href="#" className="text-xl font-bold text-white cursor-pointer">
          CinemaXIX
        </Link>
        <div className="flex text-[16px] space-x-6">
          <Link
            href="/movies"
            className="text-gray-300 hover:text-[#E50914] transition-colors cursor-pointer"
          >
            Browse
          </Link>
          <Link
            href="#"
            className="text-gray-300 hover:text-[#E50914] transition-colors cursor-pointer"
          >
            Support
          </Link>
          <Link
            href="#"
            className="text-gray-300 hover:text-[#E50914] transition-colors cursor-pointer"
          >
            FAQ
          </Link>
        </div>
      </div>

      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full py-1 px-4 pl-10 text-[14px] text-gray-300 bg-gray-800/20 rounded-full ring-1 ring-white focus:outline-none focus:ring-1 focus:ring-[#E50914] focus:bg-gray-800 transition"
        />
        <Search
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
        />
      </div>

      <div className="flex items-center space-x-5">
        <Bell className="w-5 h-5 cursor-pointer text-gray-300 hover:text-[#E50914] transition-colors" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden cursor-pointer hover:outline-3 hover:outline-[#E50914] duration-200 ease-in-out">
              <img
                src={
                  session?.user
                    ? session.user.picture
                    : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                }
                alt="user-image"
                className="w-full h-full object-cover"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My Tickets</DropdownMenuItem>
              <DropdownMenuItem>Wishlist</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                signOut({ callbackUrl: "/auth/login" });
              }}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
