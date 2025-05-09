
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Login berhasil",
          description: "Selamat datang di Magang Insight Hub",
          variant: "default",
        });
        
        // Get user from localStorage to determine where to redirect
        const storedUser = localStorage.getItem("mangInsightUser");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          // Redirect based on role
          if (user.role === 'admin') {
            navigate("/", { replace: true });
          } else {
            navigate("/intern/dashboard", { replace: true });
          }
        } else {
          // Fallback just in case
          navigate("/", { replace: true });
        }
      } else {
        toast({
          title: "Login gagal",
          description: "Email atau password salah",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Terjadi kesalahan",
        description: "Silakan coba lagi nanti",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-magang-light flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-magang-primary">
            Magang Insight Hub
          </CardTitle>
          <p className="text-gray-500">Silakan login untuk melanjutkan</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="nama@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-magang-primary hover:bg-magang-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Memproses..." : "Login"}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            <p className="text-gray-500">
              Demo Akun:
            </p>
            <p className="text-gray-600 mt-1">
              Admin: admin@example.com / admin123
            </p>
            <p className="text-gray-600">
              Magang: hannisa@example.com / intern123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
