
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar as CalendarIcon, Clock, Heart, Bell } from 'lucide-react';

// Mock data
const medicationReminders = [
  { id: 1, medication: 'Amlodipine', dosage: '5mg', time: '08:00', taken: true },
  { id: 2, medication: 'Lisinopril', dosage: '10mg', time: '14:00', taken: false },
  { id: 3, medication: 'Amlodipine', dosage: '5mg', time: '20:00', taken: false }
];

const bloodPressureReadings = [
  { date: '2023-05-14', systolic: 140, diastolic: 90 },
  { date: '2023-05-15', systolic: 138, diastolic: 88 },
  { date: '2023-05-16', systolic: 135, diastolic: 87 },
  { date: '2023-05-17', systolic: 137, diastolic: 85 },
  { date: '2023-05-18', systolic: 132, diastolic: 82 }
];

const healthTips = [
  { 
    id: 1, 
    title: 'Makanan Rendah Garam', 
    content: 'Kurangi asupan garam untuk membantu mengontrol tekanan darah Anda.',
    author: 'Dr. Siti'
  },
  { 
    id: 2, 
    title: 'Manfaat Rutin Berjalan Kaki', 
    content: 'Berjalan kaki selama 30 menit setiap hari dapat membantu menurunkan tekanan darah.',
    author: 'Dr. Budi'
  }
];

const PatientDashboard: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Calculate medication adherence
  const adherencePercentage = (medicationReminders.filter(med => med.taken).length / medicationReminders.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard Pasien</h1>
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
              <Clock className="h-4 w-4 mr-2 text-healthcare-blue" />
              Jadwal Obat Hari Ini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{medicationReminders.length}</div>
            <div className="text-sm text-muted-foreground">
              {medicationReminders.filter(med => med.taken).length} sudah diminum
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-healthcare-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Heart className="h-4 w-4 mr-2 text-healthcare-green" />
              Tekanan Darah Terakhir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {bloodPressureReadings[bloodPressureReadings.length - 1].systolic}/
              {bloodPressureReadings[bloodPressureReadings.length - 1].diastolic}
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date(bloodPressureReadings[bloodPressureReadings.length - 1].date).toLocaleDateString('id-ID')}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-healthcare-blue">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Bell className="h-4 w-4 mr-2 text-healthcare-blue" />
              Kepatuhan Obat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={adherencePercentage} className="h-2" />
              <div className="text-sm text-muted-foreground">
                {adherencePercentage}% minggu ini
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medication Reminders */}
      <Card>
        <CardHeader>
          <CardTitle>Pengingat Obat Hari Ini</CardTitle>
          <CardDescription>
            Jadwal pengobatan harian Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medicationReminders.map((reminder) => (
              <div 
                key={reminder.id} 
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  reminder.taken ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-2 h-10 rounded-full mr-4 ${
                    reminder.taken ? 'bg-gray-300' : 'bg-healthcare-blue'
                  }`} />
                  <div>
                    <div className="font-medium">{reminder.medication} {reminder.dosage}</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {reminder.time}
                    </div>
                  </div>
                </div>
                <div>
                  {reminder.taken ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Diminum
                    </span>
                  ) : (
                    <button className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded text-white bg-healthcare-blue hover:bg-blue-600 transition-colors">
                      Tandai Diminum
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Tips Kesehatan</CardTitle>
          <CardDescription>
            Artikel dan tips untuk membantu Anda mengelola tekanan darah
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthTips.map((tip) => (
              <div 
                key={tip.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              >
                <h3 className="font-semibold">{tip.title}</h3>
                <p className="text-sm text-muted-foreground my-2">{tip.content}</p>
                <p className="text-xs text-right text-healthcare-blue">Oleh: {tip.author}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboard;
