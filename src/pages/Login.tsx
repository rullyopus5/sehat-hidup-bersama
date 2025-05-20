
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Info } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HealthInfo = () => {
  return (
    <Card className="mt-8 w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center">
          <Info className="h-5 w-5 mr-2 text-healthcare-blue" />
          <CardTitle className="text-xl">Informasi Kesehatan</CardTitle>
        </div>
        <CardDescription>Informasi dan tips kesehatan terbaru</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="umum">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="hipertensi">Hipertensi</TabsTrigger>
            <TabsTrigger value="tips">Tips Sehat</TabsTrigger>
          </TabsList>
          <TabsContent value="umum" className="mt-4">
            <div className="space-y-4">
              <h3 className="font-medium">Program Kesehatan Nasional</h3>
              <p className="text-sm text-muted-foreground">
                Kementerian Kesehatan Republik Indonesia mengajak seluruh masyarakat untuk hidup sehat melalui GERMAS (Gerakan Masyarakat Hidup Sehat) dengan melakukan aktivitas fisik, mengonsumsi sayur dan buah, dan memeriksakan kesehatan secara rutin.
              </p>
              <Separator />
              <h3 className="font-medium">Vaksinasi Covid-19</h3>
              <p className="text-sm text-muted-foreground">
                Vaksinasi Covid-19 tetap penting untuk dilakukan, termasuk dosis booster untuk meningkatkan kekebalan tubuh. Kunjungi fasilitas kesehatan terdekat untuk informasi lebih lanjut.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="hipertensi" className="mt-4">
            <div className="space-y-4">
              <h3 className="font-medium">Kenali Hipertensi</h3>
              <p className="text-sm text-muted-foreground">
                Hipertensi atau tekanan darah tinggi adalah kondisi ketika tekanan darah terhadap dinding arteri terlalu tinggi. Tekanan darah normal adalah di bawah 120/80 mmHg. Tekanan darah antara 120/80 hingga 139/89 mmHg adalah prehipertensi.
              </p>
              <Separator />
              <h3 className="font-medium">Faktor Risiko Hipertensi</h3>
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li>Usia lanjut</li>
                <li>Riwayat keluarga</li>
                <li>Kelebihan berat badan</li>
                <li>Kurang aktif bergerak</li>
                <li>Konsumsi garam berlebih</li>
                <li>Konsumsi alkohol</li>
                <li>Stres</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="tips" className="mt-4">
            <div className="space-y-4">
              <h3 className="font-medium">Tips Mengelola Hipertensi</h3>
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li>Konsumsi obat secara teratur sesuai anjuran dokter</li>
                <li>Kurangi konsumsi garam (tidak lebih dari 1 sendok teh per hari)</li>
                <li>Perbanyak konsumsi buah, sayur, dan makanan rendah lemak</li>
                <li>Lakukan aktivitas fisik secara rutin (30 menit per hari, 5 kali seminggu)</li>
                <li>Pertahankan berat badan ideal</li>
                <li>Kurangi stres</li>
                <li>Hindari konsumsi alkohol dan rokok</li>
                <li>Periksa tekanan darah secara teratur</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const Login: React.FC = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Login berhasil!",
        description: "Selamat datang kembali di IMO Mantap",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login gagal",
        description: error instanceof Error ? error.message : "Terjadi kesalahan saat login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout requireAuth={false}>
      <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md animate-fade-in">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-healthcare-blue flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">IMO Mantap</CardTitle>
            <CardDescription className="text-center">
              Ingat Minum Obat - Masuk untuk mengakses akun Anda
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Kata Sandi</Label>
                  <Link to="/forgot-password" className="text-sm text-healthcare-blue hover:underline">
                    Lupa kata sandi?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-healthcare-blue hover:bg-blue-600" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Masuk...
                  </span>
                ) : (
                  'Masuk'
                )}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <p>
                Tips: Untuk demo, gunakan:<br />
                Email: patient@example.com, nurse@example.com, atau admin@example.com<br />
                Password: password
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Belum memiliki akun? <Link to="/register" className="text-healthcare-blue hover:underline">Daftar</Link>
            </p>
          </CardFooter>
        </Card>
        
        <HealthInfo />
      </div>
    </Layout>
  );
};

export default Login;
