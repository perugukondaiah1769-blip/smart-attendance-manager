import { useState, useEffect } from 'react';
import { AttendanceRecord } from '@/types';
import { mockAttendanceRecords } from '@/data/mockData';

export function useAttendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedRecords = localStorage.getItem('attendanceRecords');
    if (storedRecords) {
      setRecords(JSON.parse(storedRecords));
    } else {
      setRecords(mockAttendanceRecords);
      localStorage.setItem('attendanceRecords', JSON.stringify(mockAttendanceRecords));
    }
    setIsLoading(false);
  }, []);

  const markAttendance = (record: Omit<AttendanceRecord, 'id'>) => {
    const today = new Date().toDateString();
    const existingRecord = records.find(
      (r) => r.studentId === record.studentId && new Date(r.date).toDateString() === today
    );

    if (existingRecord) {
      return { success: false, message: 'Attendance already marked for today' };
    }

    const newRecord: AttendanceRecord = {
      ...record,
      id: Date.now().toString(),
    };
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    localStorage.setItem('attendanceRecords', JSON.stringify(updatedRecords));
    return { success: true, record: newRecord };
  };

  const getTodayRecords = () => {
    const today = new Date().toDateString();
    return records.filter((r) => new Date(r.date).toDateString() === today);
  };

  const getRecordsByDate = (date: Date) => {
    return records.filter(
      (r) => new Date(r.date).toDateString() === date.toDateString()
    );
  };

  const getStudentAttendance = (studentId: string) => {
    return records.filter((r) => r.studentId === studentId);
  };

  const getAttendanceStats = (totalStudents: number) => {
    const todayRecords = getTodayRecords();
    const presentToday = todayRecords.filter((r) => r.status === 'present' || r.status === 'late').length;
    const absentToday = totalStudents - presentToday;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentRecords = records.filter((r) => new Date(r.date) >= thirtyDaysAgo);
    const averageAttendance = totalStudents > 0
      ? Math.round((recentRecords.length / (totalStudents * 30)) * 100)
      : 0;

    return {
      totalStudents,
      presentToday,
      absentToday,
      averageAttendance: Math.min(averageAttendance, 100),
    };
  };

  return {
    records,
    isLoading,
    markAttendance,
    getTodayRecords,
    getRecordsByDate,
    getStudentAttendance,
    getAttendanceStats,
  };
}
