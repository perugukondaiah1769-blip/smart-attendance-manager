import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentAttendance } from '@/components/dashboard/RecentAttendance';
import { useStudents } from '@/hooks/useStudents';
import { useAttendance } from '@/hooks/useAttendance';
import { Users, UserCheck, UserX, TrendingUp, Camera, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { students } = useStudents();
  const { getTodayRecords, getAttendanceStats } = useAttendance();

  const stats = getAttendanceStats(students.length);
  const todayRecords = getTodayRecords();

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Welcome back! Here's today's attendance overview.
            </p>
          </div>
          <Link to="/mark-attendance">
            <Button className="gap-2">
              <Camera className="w-4 h-4" />
              Mark Attendance
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={<Users className="w-5 h-5" />}
            variant="primary"
          />
          <StatCard
            title="Present Today"
            value={stats.presentToday}
            icon={<UserCheck className="w-5 h-5" />}
            variant="success"
          />
          <StatCard
            title="Absent Today"
            value={stats.absentToday}
            icon={<UserX className="w-5 h-5" />}
            variant="destructive"
          />
          <StatCard
            title="Avg Attendance"
            value={`${stats.averageAttendance}%`}
            icon={<TrendingUp className="w-5 h-5" />}
            trend={{ value: 5, isPositive: true }}
            variant="default"
          />
        </div>

        {/* Recent Activity */}
        <RecentAttendance records={todayRecords} />

        {/* Quick Actions */}
        <div className="rounded-xl border bg-card p-5">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link to="/mark-attendance">
              <div className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Camera className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Mark Attendance</p>
                  <p className="text-xs text-muted-foreground">Scan face to verify</p>
                </div>
              </div>
            </Link>
            <Link to="/register">
              <div className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                <div className="p-2 rounded-lg bg-success/10">
                  <UserPlus className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-sm">Add Student</p>
                  <p className="text-xs text-muted-foreground">Register new face</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
