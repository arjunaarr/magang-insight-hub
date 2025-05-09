
import React from "react";
import { useAuth } from "@/context/auth-context";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, logout } = useAuth();
  
  if (!user) return null;

  return (
    <nav className="bg-magang-primary text-white shadow-md py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={user.role === 'admin' ? '/' : '/intern/dashboard'} className="text-xl font-bold flex items-center">
          <span>Magang Insight Hub</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-magang-secondary rounded-full"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-magang-secondary">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex flex-col p-2 border-b">
                <span className="font-medium">{user?.name}</span>
                <span className="text-xs text-gray-500">{user?.email}</span>
                <span className="text-xs text-gray-500 mt-1 capitalize">
                  {user?.role}
                </span>
              </div>
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
