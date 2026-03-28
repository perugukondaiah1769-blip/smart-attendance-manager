import { AttendanceRecord } from '@/types';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, XCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecentAttendanceProps {
  records: AttendanceRecord[];
}

const statusConfig = {
  present: {
    icon: CheckCircle2,
    label: 'Present',
    className: 'bg-success/10 text-success border-success/20',
  },
  late: {
    icon: Clock,
    label: 'Late',
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  absent: {
    icon: XCircle,
    label: 'Absent',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
};

export function RecentAttendance({ records }: RecentAttendanceProps) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="text-lg font-semibold mb-4">Today's Attendance</h3>
      {records.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No attendance records for today
        </p>
      ) : (
        <div className="space-y-3">
          {records.slice(0, 5).map((record) => {
            const status = statusConfig[record.status];
            const StatusIcon = status.icon;
            return (
              <div key={record.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{record.studentName}</p>
                    <p className="text-xs text-muted-foreground">
                      {record.rollNumber} • {record.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{record.time}</span>
                  <Badge variant="outline" className={cn("text-xs gap-1", status.className)}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
