
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Bell, MessageSquare, FileText, Calendar as CalendarIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data
const patients = [
  { 
    id: 1, 
    name: 'Budi Santoso', 
    age: 65, 
    adherence: 85, 
    lastReading: { systolic: 132, diastolic: 82, date: '2023-05-18' },
    avatarUrl: 'https://i.pravatar.cc/150?img=11'
  },
  { 
    id: 2, 
    name: 'Ani Wijaya', 
    age: 58, 
    adherence: 60, 
    lastReading: { systolic: 145, diastolic: 95, date: '2023-05-17' },
    avatarUrl: 'https://i.pravatar.cc/150?img=12'
  },
  { 
    id: 3, 
    name: 'Hendra Gunawan', 
    age: 72, 
    adherence: 90, 
    lastReading: { systolic: 138, diastolic: 88, date: '2023-05-18' },
    avatarUrl: 'https://i.pravatar.cc/150?img=13'
  }
];

const alerts = [
  { id: 1, patient: 'Ani Wijaya', message: 'Melewatkan obat 2 hari berturut-turut', severity: 'high' },
  { id: 2, patient: 'Hendra Gunawan', message: 'Tekanan darah melebihi ambang batas', severity: 'medium' }
];

const upcomingSchedule = [
  { id: 1, time: '09:00', patient: 'Budi Santoso', type: 'Check-up' },
  { id: 2, time: '11:30', patient: 'Ani Wijaya', type: 'Konsultasi' },
  { id: 3, time: '14:00', patient: 'Hendra Gunawan', type: 'Check-up' }
];

const NurseDashboard: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard Perawat</h1>
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
              Total Pasien
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{patients.length}</div>
            <div className="text-sm text-muted-foreground">
              2 membutuhkan perhatian
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-healthcare-red">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Bell className="h-4 w-4 mr-2 text-healthcare-red" />
              Peringatan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{alerts.length}</div>
            <div className="text-sm text-muted-foreground">
              1 dengan tingkat keparahan tinggi
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-healthcare-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-healthcare-green" />
              Pesan Baru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <div className="text-sm text-muted-foreground">
              Sejak kemarin
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient List */}
      <Card>
        <CardHeader>
          <CardTitle>Pasien Saya</CardTitle>
          <CardDescription>
            Status terkini pasien dalam pengawasan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-muted-foreground uppercase border-b">
                  <th className="text-left py-3 px-4 font-medium">Pasien</th>
                  <th className="text-left py-3 px-4 font-medium">Usia</th>
                  <th className="text-left py-3 px-4 font-medium">Kepatuhan</th>
                  <th className="text-left py-3 px-4 font-medium">Tekanan Darah Terakhir</th>
                  <th className="text-left py-3 px-4 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={patient.avatarUrl} alt={patient.name} />
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{patient.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{patient.age}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Progress value={patient.adherence} className="h-2 w-20" />
                        <span className={`text-xs ${
                          patient.adherence < 70 ? 'text-healthcare-red' : 'text-healthcare-green'
                        }`}>
                          {patient.adherence}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${
                        patient.lastReading.systolic > 140 || patient.lastReading.diastolic > 90
                          ? 'text-healthcare-red'
                          : 'text-healthcare-green'
                      }`}>
                        {patient.lastReading.systolic}/{patient.lastReading.diastolic}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {new Date(patient.lastReading.date).toLocaleDateString('id-ID')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-sm text-healthcare-blue hover:underline">
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Peringatan</CardTitle>
            <CardDescription>
              Notifikasi yang memerlukan perhatian
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border ${
                    alert.severity === 'high' ? 'border-l-4 border-l-healthcare-red' : 'border-l-4 border-l-healthcare-yellow'
                  }`}
                >
                  <div className="font-medium">{alert.patient}</div>
                  <div className="text-sm text-muted-foreground">{alert.message}</div>
                  <div className="mt-2 flex justify-end">
                    <button className="text-xs text-healthcare-blue hover:underline">
                      Tangani
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Jadwal Hari Ini</CardTitle>
            <CardDescription>
              Jadwal check-up dan konsultasi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSchedule.map((schedule) => (
                <div 
                  key={schedule.id} 
                  className="p-4 rounded-lg border border-l-4 border-l-healthcare-blue flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{schedule.patient}</div>
                    <div className="text-sm text-muted-foreground">
                      {schedule.type}
                    </div>
                  </div>
                  <div className="bg-healthcare-light-blue text-healthcare-blue px-3 py-1 rounded-full text-sm font-medium">
                    {schedule.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NurseDashboard;
