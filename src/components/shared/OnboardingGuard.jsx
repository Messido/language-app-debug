import { useStudentProfile } from "@/hooks/useStudentProfile";
import StudentOnboardingModal from "@/features/auth/components/StudentOnboardingModal";

export default function OnboardingGuard({ children }) {
  const { needsOnboarding, isLoading, refreshProfile } = useStudentProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-body-dark">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-blue-1 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
            Checking profile...
          </p>
        </div>
      </div>
    );
  }

  if (needsOnboarding) {
    return (
      <StudentOnboardingModal
        onComplete={() => {
          refreshProfile();
        }}
      />
    );
  }

  return <>{children}</>;
}
