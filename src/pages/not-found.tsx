
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

const NotFound = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-bold text-magang-primary">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800">
          Halaman tidak ditemukan
        </h2>
        <p className="text-gray-600">
          Maaf, halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
        </p>
        <div>
          <Link to={user ? "/" : "/login"}>
            <Button>
              Kembali ke {user ? "Dashboard" : "Login"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
