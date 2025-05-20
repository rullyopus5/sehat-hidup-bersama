
export type UserRole = 'patient' | 'nurse' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Patient extends User {
  role: 'patient';
  bloodPressureReadings: BloodPressureReading[];
  medications: Medication[];
  assignedNurse?: string; // ID of assigned nurse
}

export interface Nurse extends User {
  role: 'nurse';
  patients: string[]; // IDs of assigned patients
  specialization: string;
}

export interface Admin extends User {
  role: 'admin';
}

export interface BloodPressureReading {
  id: string;
  date: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string; // e.g., "twice daily"
  schedule: string[]; // e.g., ["08:00", "20:00"]
  startDate: string;
  endDate?: string;
  instructions?: string;
}

export interface HealthTip {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  category: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}
