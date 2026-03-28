import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { WebcamCapture } from '@/components/attendance/WebcamCapture';
import { useStudents } from '@/hooks/useStudents';
import { useAttendance } from '@/hooks/useAttendance';
import { CheckCircle2, User, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Student } from '@/types';

export default function MarkAttendance() {
  const { students } = useStudents();
  const { markAttendance } = useAttendance();
  const [verifiedStudent, setVerifiedStudent] = useState<Student | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCapture = async (imageData: string) => {
    setIsProcessing(true);

    // Simulate face recognition processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // For demo: randomly match a student (no threshold distance)
    const randomStudent = students[Math.floor(Math.random() * students.length)];

    if (randomStudent) {
      setVerifiedStudent(randomStudent);

      const now = new Date();
      const hours = now.getHours();
      const isLate = hours >= 9 && hours < 10;

      const result = markAttendance({
        studentId: randomStudent.id,
        studentName: randomStudent.name,
        rollNumber: randomStudent.rollNumber,
        department: randomStudent.department,
        date: now,
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: isLate ? 'late' : 'present',
        verificationMethod: 'face',
      });

      if (result.success) {
        toast.success(`Attendance marked for ${randomStudent.name}`, {
          description: `Status: ${isLate ? 'Late' : 'Present'}`,
        });
      } else {
        toast.warning(result.message);
      }
    } else {
      toast.error('No students registered. Please register students first.');
    }

    setIsProcessing(false);
  };

  const handleReset = () => {
    setVerifiedStudent(null);
  };

  return (
    <MainLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mark Attendance</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Position your face within the frame for automatic recognition
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Camera Section */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border bg-card p-5">
              <WebcamCapture onCapture={handleCapture} mode="verify" />
              {isProcessing && (
                <div className="mt-4 flex items-center justify-center gap-2 text-primary">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-medium">Processing face recognition...</span>
                </div>
              )}
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            {verifiedStudent ? (
              <div className="rounded-xl border bg-card p-5 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Verified!</h3>
                  <p className="font-medium mt-1">{verifiedStudent.name}</p>
                  <p className="text-sm text-muted-foreground">{verifiedStudent.rollNumber}</p>
                  <p className="text-sm text-muted-foreground">{verifiedStudent.department}</p>
                </div>
                <Button onClick={handleReset} variant="outline" className="w-full">
                  Mark Another Student
                </Button>
              </div>
            ) : (
              <div className="rounded-xl border bg-card p-5">
                <h3 className="font-semibold mb-3">Instructions</h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="font-semibold text-foreground">1.</span>
                    Click "Start Camera" to begin
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-foreground">2.</span>
                    Position your face within the frame
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-foreground">3.</span>
                    Wait for "Face Detected" indicator
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-foreground">4.</span>
                    Click "Verify & Mark" to record attendance
                  </li>
                </ol>
              </div>
            )}

            {/* Today's Stats */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-semibold mb-3">Today's Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Students</span>
                  <span className="font-medium">{students.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Time</span>
                  <span className="font-medium">
                    {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
