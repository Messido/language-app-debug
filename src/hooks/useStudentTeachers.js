import { useQuery } from "@tanstack/react-query";
import { useStudentProfile } from "./useStudentProfile";

async function fetchStudentTeachers(studentId) {
  if (!studentId) return [];

  const response = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/api/relationships/student/${studentId}/teachers`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch teachers");
  }

  return response.json();
}

export function useStudentTeachers() {
  const { profile } = useStudentProfile();

  return useQuery({
    queryKey: ["student-teachers", profile?.studentId],
    queryFn: () => fetchStudentTeachers(profile?.studentId),
    enabled: !!profile?.studentId,
  });
}
