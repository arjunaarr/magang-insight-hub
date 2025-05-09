
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Users, Calendar, Settings } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-magang-primary text-white">
        <div className="container mx-auto px-4 py-10 md:py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Magang Insight Hub
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Platform manajemen dan monitoring perkembangan magang yang efektif
                dan efisien untuk instansi Anda.
              </p>
              <Link to="/login">
                <Button size="lg" className="bg-white text-magang-primary hover:bg-magang-light">
                  Mulai Sekarang
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="/placeholder.svg" 
                alt="Magang Insight Hub" 
                className="rounded-lg shadow-lg w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-magang-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Fitur Utama</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-t-4 border-magang-primary">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-magang-light p-4 rounded-full mb-4">
                    <Users className="h-10 w-10 text-magang-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Manajemen Magang</h3>
                  <p className="text-gray-600">
                    Kelola semua anak magang dengan mudah dalam satu platform.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-magang-primary">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-magang-light p-4 rounded-full mb-4">
                    <FileText className="h-10 w-10 text-magang-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Laporan Terstruktur</h3>
                  <p className="text-gray-600">
                    Dokumentasi laporan magang yang terstruktur dan mudah diakses.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-magang-primary">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-magang-light p-4 rounded-full mb-4">
                    <Calendar className="h-10 w-10 text-magang-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Monitoring Progres</h3>
                  <p className="text-gray-600">
                    Pantau perkembangan anak magang secara real-time dengan dashboard.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-magang-primary">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-magang-light p-4 rounded-full mb-4">
                    <Settings className="h-10 w-10 text-magang-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Customizable</h3>
                  <p className="text-gray-600">
                    Sesuaikan platform dengan kebutuhan instansi Anda.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Manfaat</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-magang-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-magang-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Efisiensi Waktu</h3>
              <p className="text-gray-600">
                Otomasi proses administrasi untuk efisiensi waktu dan fokus pada pengembangan.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-magang-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-magang-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Kolaborasi Tim</h3>
              <p className="text-gray-600">
                Tingkatkan kolaborasi antara mentor dan anak magang dengan komunikasi yang lebih baik.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-magang-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-magang-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Terukur</h3>
              <p className="text-gray-600">
                Peroleh wawasan terukur tentang kinerja anak magang untuk evaluasi yang lebih baik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-magang-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Siap Mengoptimalkan Program Magang Anda?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Daftar sekarang dan mulai tingkatkan efisiensi program magang di instansi Anda.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="bg-white text-magang-primary hover:bg-magang-light">
                Login
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Magang Insight Hub</h3>
              <p className="text-gray-400">Platform manajemen magang terbaik</p>
            </div>
            <div>
              <p className="text-gray-400">&copy; 2025 Magang Insight Hub. Hak Cipta Dilindungi.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
