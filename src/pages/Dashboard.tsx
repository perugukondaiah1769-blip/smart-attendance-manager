import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentAttendance } from '@/components/dashboard/RecentAttendance';
import { useStudents } from '@/hooks/useStudents';
import { useAttendance } from '@/hooks/useAttendance';
import { Users, UserCheck, UserX, TrendingUp, Camera, UserPlus, ArrowRight } from 'lucide-react';
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
            <h1 className="text-3xl font-bold tracking-tight">
              Dash<span className="text-primary">board</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Real-time attendance overview powered by AI face recognition.
            </p>
          </div>
          <Link to="/mark-attendance">
            <Button className="gap-2 glow-primary">
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
        <div className="rounded-2xl border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link to="/mark-attendance">
              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/30 card-hover cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/15">
                    <Camera className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Mark Attendance</p>
                    <p className="text-xs text-muted-foreground">Scan face to verify</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
            <Link to="/register">
              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/30 card-hover cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-success/15">
                    <UserPlus className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Add Student</p>
                    <p className="text-xs text-muted-foreground">Register new face</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-success transition-colors" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
