
import React, { useState } from "react";
import { useAuth } from "@/context/auth-context";
import PageHeader from "@/components/ui/page-header";
import { api } from "@/lib/api-service";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { User as UserIcon } from "lucide-react";

const ProfilePage = () => {
  const { user, updateUserData } = useAuth();
  const { toast } = useToast();
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, this would upload to a server and return a URL
      // For now, we'll just use a data URL
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    try {
      // Update avatar
      const updatedUser = await api.intern.updateProfile(user.id, {
        avatar: avatarUrl
      });
      
      updateUserData(updatedUser);
      
      toast({
        title: "Profil berhasil diperbarui",
        description: "Foto profil Anda telah diperbarui",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Gagal memperbarui profil",
        description: "Terjadi kesalahan saat memperbarui profil",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleResetPassword = async () => {
    if (!user) return;
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Kesalahan",
        description: "Password baru dan konfirmasi tidak cocok",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({
        title: "Kesalahan",
        description: "Password baru terlalu pendek (minimal 6 karakter)",
        variant: "destructive",
      });
      return;
    }
    
    setIsUpdating(true);
    try {
      await api.auth.resetPassword(user.id, currentPassword, newPassword);
      
      toast({
        title: "Password berhasil diubah",
        description: "Silahkan gunakan password baru Anda untuk login berikutnya",
      });
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast({
        title: "Gagal mengubah password",
        description: "Password saat ini tidak sesuai atau terjadi kesalahan",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <PageHeader title="Profil Saya" description="Informasi dan pengaturan profil" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Informasi Profil</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="mb-4">
              <Avatar className="h-32 w-32">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={user?.name} />
                ) : (
                  <AvatarFallback className="bg-magang-light text-magang-primary text-4xl">
                    {user?.name.charAt(0).toUpperCase() || <UserIcon className="h-16 w-16" />}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            <h3 className="font-bold text-xl mb-1">{user?.name}</h3>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <p className="text-sm font-medium mt-2 bg-gray-100 px-3 py-1 rounded-full capitalize">
              {user?.role}
            </p>
            
            <div className="mt-6 w-full">
              <Label htmlFor="avatar" className="block text-sm mb-2">
                Ganti Foto Profil
              </Label>
              <Input 
                id="avatar" 
                type="file" 
                accept="image/*" 
                onChange={handleAvatarUpload} 
                className="mb-3"
              />
              <Button 
                onClick={handleUpdateProfile} 
                disabled={isUpdating || !avatarUrl}
                className="w-full"
              >
                Update Foto Profil
              </Button>
            </div>
          </CardContent>
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
                  Password default akan diberikan saat pendaftaran. Silakan ubah password Anda untuk keamanan.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Ubah Password</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ubah Password</DialogTitle>
                    <DialogDescription>
                      Masukkan password lama dan password baru Anda.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Password Saat Ini</Label>
                      <Input 
                        id="current-password" 
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Password Baru</Label>
                      <Input 
                        id="new-password" 
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                      <Input 
                        id="confirm-password" 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button onClick={handleResetPassword} disabled={isUpdating}>Simpan Perubahan</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
