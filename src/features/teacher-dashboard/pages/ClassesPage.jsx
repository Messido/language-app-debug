import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  UserGroupIcon,
  CalendarIcon,
  PlusIcon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useTeacherGroups,
  useCreateGroup, // Restored
  useDeleteGroup,
  useAddStudentsToGroup,
} from "@/hooks/useGroups";
import { useTeacherStudents } from "@/hooks/useTeacherStudents"; // Restored
import { useTeacherProfile } from "@/hooks/useTeacherProfile"; // Added debug import // Restored

export default function ClassesPage() {
  const { data: groups, isLoading } = useTeacherGroups();
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const deleteGroupMutation = useDeleteGroup();

  // Debug
  const {
    profile,
    isLoading: isProfileLoading,
    refreshProfile,
  } = useTeacherProfile();
  const { user } = useUser();
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);

  // Debug log
  // console.log("ClassesPage Profile State:", { profile, isProfileLoading });

  if (isLoading || isProfileLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue-1" />
      </div>
    );
  }

  // Temporary Onboarding Handling
  if (!profile) {
    const handleCreateProfile = async () => {
      try {
        setIsCreatingProfile(true);
        const { createTeacherProfile } = await import("@/services/userApi");

        await createTeacherProfile({
          clerkUserId: user.id,
          teachingLanguages: ["French"],
          instructionLanguage: "English",
          experience: {
            years: 0,
            studentsTaught: 0,
            hoursTaught: 0,
          },
        });

        // Refresh to get the new profile
        await refreshProfile();
      } catch (error) {
        console.error("Failed to create profile:", error);
        alert("Failed to create teacher profile. Please try again.");
      } finally {
        setIsCreatingProfile(false);
      }
    };

    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4 text-center">
        <div className="bg-blue-50 p-4 rounded-full">
          <UserGroupIcon className="h-12 w-12 text-brand-blue-1" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">One Last Step!</h2>
        <p className="text-gray-500 max-w-md">
          To start managing classes, we need to set up your teacher profile.
          This will only take a second.
        </p>
        <Button
          onClick={handleCreateProfile}
          disabled={isCreatingProfile}
          className="mt-4"
        >
          {isCreatingProfile && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Complete Teacher Setup
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-primary-dark">
            My Classes
          </h1>
          <p className="text-gray-500 dark:text-secondary-dark mt-1">
            Organize students into groups for easier management.
          </p>
        </div>
        <Button
          onClick={() => setShowCreateGroup(true)}
          className="flex items-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          Create Class
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups?.map((group) => (
          <Card
            key={group.id}
            className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-brand-blue-1 group relative"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm("Are you sure you want to delete this group?")) {
                  deleteGroupMutation.mutate(group.id);
                }
              }}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="secondary" className="mb-2">
                  {group.level}
                </Badge>
                <span className="text-xs text-gray-400 font-mono">
                  {group.id.slice(0, 8)}...
                </span>
              </div>
              <CardTitle className="text-lg pr-6">{group.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-secondary-dark">
                  <UserGroupIcon className="h-4 w-4" />
                  <span>
                    {group.studentCount}{" "}
                    {group.studentCount === 1 ? "Student" : "Students"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-secondary-dark">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{group.schedule || "No schedule set"}</span>
                </div>
                {/* Visual indicator for students would require fetching student details or storing basic info in group */}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Empty State Action */}
        <button
          onClick={() => setShowCreateGroup(true)}
          className="flex flex-col items-center justify-center h-full min-h-[200px] border-2 border-dashed border-gray-200 dark:border-subtle-dark rounded-xl text-gray-400 hover:text-brand-blue-1 hover:border-brand-blue-1 hover:bg-brand-blue-1/5 transition-all"
        >
          <PlusIcon className="h-10 w-10 mb-2" />
          <span className="font-medium">Create New Class</span>
        </button>
      </div>

      {showCreateGroup && (
        <CreateGroupModal onClose={() => setShowCreateGroup(false)} />
      )}
    </div>
  );
}

function CreateGroupModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-card-dark rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-subtle-dark">
          <h2 className="text-xl font-bold text-gray-900 dark:text-primary-dark">
            Create New Class
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <CreateGroupForm onClose={onClose} />
      </div>
    </div>
  );
}

function CreateGroupForm({ onClose }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("A1");
  const [schedule, setSchedule] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const { data: students, isLoading: isLoadingStudents } = useTeacherStudents();
  const createGroupMutation = useCreateGroup();
  const addStudentsMutation = useAddStudentsToGroup();

  const toggleStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((s) => s !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    try {
      const newGroup = await createGroupMutation.mutateAsync({
        name,
        level,
        schedule,
      });

      if (selectedStudents.length > 0) {
        await addStudentsMutation.mutateAsync({
          groupId: newGroup.id,
          studentIds: selectedStudents,
        });
      }

      onClose();
    } catch (error) {
      console.error("Failed to create class:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-secondary-dark">
          Class Name
        </label>
        <Input
          placeholder="e.g., A1 Morning Batch"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-secondary-dark">
            Level
          </label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            {["A1", "A2", "B1", "B2", "C1", "C2"].map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-secondary-dark">
            Schedule (Optional)
          </label>
          <Input
            placeholder="e.g., Mon/Wed 9AM"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-secondary-dark">
          Select Students ({selectedStudents.length})
        </label>
        <div className="border rounded-md max-h-40 overflow-y-auto p-2 bg-gray-50 dark:bg-elevated-2">
          {isLoadingStudents ? (
            <div className="flex justify-center p-4">
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            </div>
          ) : !students || students.length === 0 ? (
            <p className="text-sm text-gray-400 p-2">
              No students found. Link students from the 'My Students' page
              first.
            </p>
          ) : (
            <div className="space-y-1">
              {students.map((student) => (
                <div
                  key={student.studentId}
                  onClick={() => toggleStudent(student.studentId)}
                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                    selectedStudents.includes(student.studentId)
                      ? "bg-brand-blue-1/10 border border-brand-blue-1/20"
                      : "hover:bg-gray-100 dark:hover:bg-elevated-3 border border-transparent"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      selectedStudents.includes(student.studentId)
                        ? "bg-brand-blue-1 border-brand-blue-1"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedStudents.includes(student.studentId) && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-primary-dark">
                      {student.name || "Student"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {student.level || "N/A"} • {student.studentId}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={
            !name ||
            createGroupMutation.isPending ||
            addStudentsMutation.isPending
          }
        >
          {(createGroupMutation.isPending || addStudentsMutation.isPending) && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Create Class
        </Button>
      </div>
    </form>
  );
}
