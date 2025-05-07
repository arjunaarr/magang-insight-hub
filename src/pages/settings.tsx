
import React from "react";
import PageHeader from "@/components/ui/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Settings = () => {
  return (
    <div>
      <PageHeader
        title="Pengaturan"
        description="Konfigurasi sistem aplikasi"
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Aplikasi</CardTitle>
          <CardDescription>
            Konfigurasi dasar aplikasi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Halaman pengaturan dalam pengembangan</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
