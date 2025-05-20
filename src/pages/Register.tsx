
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useToast } from "@/components/ui/use-toast";
import { UserRole } from '@/types/user';

const Register: React.FC = () => {
  const { register } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('patient');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Kata sandi tidak cocok",
        description: "Pastikan kata sandi dan konfirmasi kata sandi sama",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(name, email, password, role);
      toast({
        title: "Registrasi berhasil!",
        description: "Selamat datang di HealthMinder",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registrasi gagal",
        description: error instanceof Error ? error.message : "Terjadi kesalahan saat registrasi",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout requireAuth={false}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md animate-fade-in">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-healthcare-blue flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Daftar Akun</CardTitle>
            <CardDescription className="text-center">
              Buat akun baru untuk menggunakan HealthMinder
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input 
                  id="name" 
                  placeholder="Nama Anda" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
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
                <Label htmlFor="password">Kata Sandi</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Tipe Akun</Label>
                <RadioGroup defaultValue="patient" value={role} onValueChange={(value) => setRole(value as UserRole)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="patient" id="patient" />
                    <Label htmlFor="patient">Pasien</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nurse" id="nurse" />
                    <Label htmlFor="nurse">Perawat</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button type="submit" className="w-full bg-healthcare-blue hover:bg-blue-600" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Daftar...
                  </span>
                ) : (
                  'Daftar'
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Sudah memiliki akun? <Link to="/login" className="text-healthcare-blue hover:underline">Masuk</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;
