import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTeacherProfile } from "@/hooks/useTeacherProfile";
import { useTeacherStudents } from "@/hooks/useTeacherStudents";

export default function MyStudentsPage() {
  const { profile } = useTeacherProfile();
  const { data: students, isLoading, error } = useTeacherStudents();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-primary-dark">
            My Students
          </h1>
          <p className="text-gray-500 dark:text-secondary-dark mt-1">
            Manage your student roster and track their progress.
          </p>
        </div>
        <Button>Add Student</Button>
      </div>

      {/* Teacher ID Info */}
      {profile && (
        <Card className="bg-brand-blue-1/5 border-brand-blue-1/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-blue-1">
                Your Teacher ID
              </p>
              <p className="text-2xl font-mono font-bold text-gray-900 dark:text-primary-dark">
                {profile.teacherId}
              </p>
              <p className="text-xs text-gray-500">
                Share this ID with students so they can link to you.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigator.clipboard.writeText(profile.teacherId)}
            >
              Copy ID
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading students...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && (!students || students.length === 0) && (
        <div className="text-center py-12 bg-gray-50 dark:bg-card-dark rounded-lg border border-dashed border-gray-200 dark:border-subtle-dark">
          <p className="text-gray-500 dark:text-secondary-dark">
            No students connected yet.
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Share your Teacher ID to get started.
          </p>
        </div>
      )}

      {/* Students List */}
      <div className="grid gap-4">
        {students?.map((student) => (
          <Card
            key={student.studentId}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-brand-blue-1/10 text-brand-blue-1 flex items-center justify-center font-bold text-lg">
                  {/* Fallback initial since name might not be available yet */}
                  {(student.name || "S").charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-primary-dark">
                    {student.name || "Student"}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-secondary-dark font-mono">
                    {student.studentId}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-secondary-dark uppercase tracking-wider">
                    Level
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-primary-dark">
                    {student.level || "N/A"}
                  </p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-gray-500 dark:text-secondary-dark uppercase tracking-wider">
                    Joined
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-primary-dark">
                    {new Date(student.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
