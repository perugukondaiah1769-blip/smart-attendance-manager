import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { WebcamCapture } from '@/components/attendance/WebcamCapture';
import { useStudents } from '@/hooks/useStudents';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const departments = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Electrical',
  'Information Technology',
];

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

export default function RegisterStudent() {
  const navigate = useNavigate();
  const { addStudent } = useStudents();
  const [faceImage, setFaceImage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    department: '',
    semester: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCapture = (imageData: string) => {
    setFaceImage(imageData);
    toast.success('Face captured successfully!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!faceImage) {
      toast.error('Please capture face image before registering');
      return;
    }

    if (!formData.name || !formData.rollNumber || !formData.department || !formData.semester) {
      toast.error('Please fill in all required fields');
      return;
    }

    addStudent({
      ...formData,
      semester: parseInt(formData.semester),
      faceImage,
    });

    toast.success('Student registered successfully!');
    navigate('/students');
  };

  return (
    <MainLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Register <span className="text-primary">Student</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Add a new student to the face recognition system
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border bg-card p-6 space-y-4">
              <h3 className="font-semibold">Student Information</h3>

              <div className="space-y-3">
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Full Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1.5 bg-secondary/50 border-border"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Roll Number *</Label>
                  <Input
                    value={formData.rollNumber}
                    onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                    className="mt-1.5 bg-secondary/50 border-border"
                    placeholder="e.g., CS2024001"
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Department *</Label>
                  <Select onValueChange={(value) => handleInputChange('department', value)}>
                    <SelectTrigger className="mt-1.5 bg-secondary/50 border-border">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Semester *</Label>
                  <Select onValueChange={(value) => handleInputChange('semester', value)}>
                    <SelectTrigger className="mt-1.5 bg-secondary/50 border-border">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((sem) => (
                        <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1.5 bg-secondary/50 border-border"
                    placeholder="student@college.edu"
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Phone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1.5 bg-secondary/50 border-border"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  {faceImage ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <User className="w-5 h-5 text-muted-foreground" />
                  )}
                  <h3 className="font-semibold">Face Registration</h3>
                </div>

                {faceImage ? (
                  <div className="space-y-4">
                    <div className="aspect-video rounded-xl overflow-hidden border border-success/30">
                      <img src={faceImage} alt="Captured face" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center gap-2 text-success text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      Face Captured
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setFaceImage('')}
                      className="w-full"
                    >
                      Retake Photo
                    </Button>
                  </div>
                ) : (
                  <WebcamCapture onCapture={handleCapture} mode="register" />
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6 justify-end">
            <Button type="button" variant="outline" onClick={() => navigate('/students')}>
              Cancel
            </Button>
            <Button type="submit" className="glow-primary">
              Register Student
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
