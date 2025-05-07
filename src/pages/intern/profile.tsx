
import React from "react";
import { useAuth } from "@/context/auth-context";
import PageHeader from "@/components/ui/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User as UserIcon } from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <PageHeader title="Profil Saya" description="Informasi dan pengaturan profil" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Informasi Profil</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-32 w-32 rounded-full bg-magang-light flex items-center justify-center text-magang-primary mb-4">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-32 w-32 rounded-full"
                />
              ) : (
                <UserIcon className="h-16 w-16" />
              )}
            </div>
            <h3 className="font-bold text-xl mb-1">{user?.name}</h3>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <p className="text-sm font-medium mt-2 bg-gray-100 px-3 py-1 rounded-full capitalize">
              {user?.role}
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline">Edit Profil</Button>
          </CardFooter>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detail Magang</CardTitle>
              <CardDescription>
                Informasi mengenai penempatan magang
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Universitas</p>
                <p className="font-medium">{user?.university || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bidang</p>
                <p className="font-medium">{user?.field || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bergabung Sejak</p>
                <p className="font-medium">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Keamanan Akun</CardTitle>
              <CardDescription>Pengaturan keamanan akun Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-gray-500">
                  Terakhir diperbarui: 3 bulan yang lalu
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Ubah Password</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
