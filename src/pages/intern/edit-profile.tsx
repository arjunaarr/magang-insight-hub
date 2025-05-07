
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { api } from "@/lib/api-service";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/ui/page-header";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

const EditProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      university: user?.university || "",
      field: user?.field || "",
      avatar: user?.avatar || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        university: user.university || "",
        field: user.field || "",
        avatar: user.avatar || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (data: any) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const updatedUser = await api.intern.updateProfile(user.id, data);
      updateUserProfile(updatedUser);
      
      toast({
        title: "Profil berhasil diperbarui",
        description: "Data profil Anda telah disimpan",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Gagal memperbarui profil",
        description: "Terjadi kesalahan saat menyimpan data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Edit Profil"
        description="Perbarui informasi profil Anda"
      />

      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  {user?.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  ) : (
                    <AvatarFallback>
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>URL Foto Profil</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/avatar.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="university"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Universitas / Sekolah</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="field"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bidang Penempatan</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfilePage;
