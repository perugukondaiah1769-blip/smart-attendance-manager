import { useState, useEffect } from 'react';
import { Student } from '@/types';
import { mockStudents } from '@/data/mockData';

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    } else {
      setStudents(mockStudents);
      localStorage.setItem('students', JSON.stringify(mockStudents));
    }
    setIsLoading(false);
  }, []);

  const addStudent = (student: Omit<Student, 'id' | 'registeredAt'>) => {
    const newStudent: Student = {
      ...student,
      id: Date.now().toString(),
      registeredAt: new Date(),
    };
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    return newStudent;
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    const updatedStudents = students.map((s) =>
      s.id === id ? { ...s, ...updates } : s
    );
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const deleteStudent = (id: string) => {
    const updatedStudents = students.filter((s) => s.id !== id);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const getStudentById = (id: string) => students.find((s) => s.id === id);

  return {
    students,
    isLoading,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
  };
}
