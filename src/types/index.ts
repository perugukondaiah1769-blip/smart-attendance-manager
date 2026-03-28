export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  semester: number;
  email: string;
  phone: string;
  faceImage: string;
  registeredAt: Date;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  department: string;
  date: Date;
  time: string;
  status: 'present' | 'absent' | 'late';
  verificationMethod: 'face' | 'manual';
}

export interface DashboardStats {
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  averageAttendance: number;
}
