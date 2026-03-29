import { Student } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Calendar, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface StudentCardProps {
  student: Student;
  onDelete?: (id: string) => void;
}

export function StudentCard({ student, onDelete }: StudentCardProps) {
  return (
    <div className="rounded-2xl border bg-card p-5 card-hover">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {student.faceImage ? (
            <img src={student.faceImage} alt={student.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-6 h-6 text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{student.name}</h3>
          <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
          <Badge variant="outline" className="mt-1.5 text-xs bg-accent/50 text-accent-foreground border-primary/20">
            {student.department}
          </Badge>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Mail className="w-3.5 h-3.5" />
          <span className="truncate">{student.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5" />
          <span>{student.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>Semester {student.semester}</span>
        </div>
      </div>

      {onDelete && (
        <div className="mt-4 pt-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5"
            onClick={() => onDelete(student.id)}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
