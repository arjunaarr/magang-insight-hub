
import React from "react";
import { useAuth } from "@/context/auth-context";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  User,
  FileText,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Different navigation items based on user role
  const adminNavItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: Users,
      label: "Anak Magang",
      href: "/interns",
    },
    {
      icon: FileText,
      label: "Laporan",
      href: "/reports",
    },
    {
      icon: Settings,
      label: "Pengaturan",
      href: "/settings",
    },
  ];

  const internNavItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: FileText,
      label: "Laporan Saya",
      href: "/my-reports",
    },
    {
      icon: User,
      label: "Profil",
      href: "/profile",
    },
  ];

  const navItems = user?.role === "admin" ? adminNavItems : internNavItems;

  return (
    <aside className="bg-white shadow-md w-64 hidden md:block">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-magang-primary flex items-center justify-center text-white font-bold">
            {user?.role === "admin" ? "A" : "I"}
          </div>
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      <nav className="p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg transition-all",
                  isActive(item.href)
                    ? "bg-magang-primary text-white"
                    : "text-gray-700 hover:bg-magang-light hover:text-magang-primary"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
