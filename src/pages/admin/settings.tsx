
import React from "react";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Pengaturan disimpan",
      description: "Perubahan pengaturan berhasil disimpan",
      variant: "default",
    });
  };

  return (
    <div>
      <PageHeader title="Pengaturan" description="Konfigurasi sistem Magang Insight Hub" />

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
          <TabsTrigger value="fields">Bidang</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Umum</CardTitle>
              <CardDescription>
                Konfigurasi dasar aplikasi Magang Insight Hub
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="app-name">Nama Aplikasi</Label>
                <Input id="app-name" defaultValue="Magang Insight Hub" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email Admin</Label>
                <Input id="admin-email" type="email" defaultValue="admin@example.com" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" />
                <Label htmlFor="maintenance-mode">Mode Pemeliharaan</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Simpan Perubahan</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keamanan</CardTitle>
              <CardDescription>
                Pengaturan keamanan dan kebijakan akses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="two-factor" />
                <Label htmlFor="two-factor">Aktifkan Otentikasi Dua Faktor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-logout" defaultChecked />
                <Label htmlFor="auto-logout">
                  Otomatis Logout Setelah 30 Menit Tidak Aktif
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>
                Atur notifikasi email dan sistem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="email-notif" defaultChecked />
                <Label htmlFor="email-notif">Kirim Notifikasi Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="deadline-reminder" defaultChecked />
                <Label htmlFor="deadline-reminder">
                  Pengingat Deadline (24 jam sebelumnya)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="new-report-notif" defaultChecked />
                <Label htmlFor="new-report-notif">
                  Notifikasi Laporan Baru
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="fields" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Bidang</CardTitle>
              <CardDescription>
                Kelola bidang penempatan anak magang
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Bidang Penempatan</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Input defaultValue="Bidang 1 - Umum" />
                    <Button variant="ghost" size="icon">
                      ×
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input defaultValue="Bidang 2 - Sistem Pemerintahan Berbasis Elektronik" />
                    <Button variant="ghost" size="icon">
                      ×
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input defaultValue="Bidang 3 - Pengembangan Aplikasi" />
                    <Button variant="ghost" size="icon">
                      ×
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input defaultValue="Bidang 4 - Pengelolaan Infrastruktur" />
                    <Button variant="ghost" size="icon">
                      ×
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input defaultValue="Bidang 5 - Keamanan Informasi" />
                    <Button variant="ghost" size="icon">
                      ×
                    </Button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  + Tambah Bidang
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
