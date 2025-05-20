
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Settings, FileText, Calendar as CalendarIcon } from 'lucide-react';

// Mock data
const userStats = {
  patients: 28,
  nurses: 5,
  admins: 2,
  totalActive: 35,
  newThisWeek: 3
};

const contentStats = {
  totalArticles: 24,
  newThisWeek: 2,
  popularCategories: [
    { name: 'Diet & Nutrisi', count: 8 },
    { name: 'Manajemen Stres', count: 6 },
    { name: 'Olahraga', count: 5 }
  ]
};

const recentUsers = [
  { id: 1, name: 'Dewi Sartika', role: 'patient', date: '2023-05-16' },
  { id: 2, name: 'Dr. Ahmad Sulaiman', role: 'nurse', date: '2023-05-15' },
  { id: 3, name: 'Eko Prasetyo', role: 'patient', date: '2023-05-14' }
];

const AdminDashboard: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard Admin</h1>
        <div className="text-sm text-gray-500 flex items-center">
          <CalendarIcon className="h-4 w-4 mr-1" />
          {currentDate}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-healthcare-blue">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="h-4 w-4 mr-2 text-healthcare-blue" />
              Total Pengguna
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userStats.totalActive}</div>
            <div className="text-sm text-muted-foreground">
              {userStats.newThisWeek} pengguna baru minggu ini
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-healthcare-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="h-4 w-4 mr-2 text-healthcare-green" />
              Total Artikel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{contentStats.totalArticles}</div>
            <div className="text-sm text-muted-foreground">
              {contentStats.newThisWeek} artikel baru minggu ini
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-healthcare-blue">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Settings className="h-4 w-4 mr-2 text-healthcare-blue" />
              Status Sistem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium text-healthcare-green">Aktif</div>
            <div className="text-sm text-muted-foreground">
              Semua layanan berfungsi normal
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribusi Pengguna</CardTitle>
          <CardDescription>
            Ringkasan pengguna berdasarkan peran
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-healthcare-light-blue rounded-lg p-4">
              <div className="text-2xl font-bold text-healthcare-blue">{userStats.patients}</div>
              <div className="text-sm font-medium">Pasien</div>
            </div>
            <div className="bg-healthcare-light-green rounded-lg p-4">
              <div className="text-2xl font-bold text-healthcare-green">{userStats.nurses}</div>
              <div className="text-sm font-medium">Perawat</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-700">{userStats.admins}</div>
              <div className="text-sm font-medium">Admin</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Pengguna Terbaru</CardTitle>
            <CardDescription>
              Pengguna yang baru terdaftar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div 
                  key={user.id} 
                  className="flex justify-between items-center p-3 rounded-lg border"
                >
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.role === 'patient' ? 'Pasien' : user.role === 'nurse' ? 'Perawat' : 'Admin'}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(user.date).toLocaleDateString('id-ID')}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-sm text-healthcare-blue hover:underline">
                Lihat Semua Pengguna
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Popular Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Kategori Populer</CardTitle>
            <CardDescription>
              Kategori artikel paling populer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentStats.popularCategories.map((category, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center p-3 rounded-lg border"
                >
                  <div className="font-medium">{category.name}</div>
                  <div className="bg-healthcare-light-blue text-healthcare-blue px-3 py-1 rounded-full text-sm font-medium">
                    {category.count} artikel
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-sm text-healthcare-blue hover:underline">
                Kelola Kategori Konten
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
