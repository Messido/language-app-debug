const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Check if the user has completed onboarding.
 * @param {string} userId - Clerk User ID
 * @returns {Promise<{isComplete: boolean, studentId: string | null, role: string | null}>}
 */
export async function checkOnboardingStatus(userId) {
  const response = await fetch(
    `${API_URL}/api/students/check?user_id=${userId}`
  );
  if (!response.ok) {
    throw new Error("Failed to check onboarding status");
  }
  return response.json();
}

/**
 * Create a new student profile.
 * @param {Object} profileData - The student profile data
 * @returns {Promise<Object>} The created profile
 */
export async function createStudentProfile(profileData) {
  const response = await fetch(`${API_URL}/api/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error("Failed to create student profile");
  }
  return response.json();
}

/**
 * Get the current student's profile.
 * @param {string} userId - Clerk User ID
 * @returns {Promise<Object>} The student profile
 */
export async function getStudentProfile(userId) {
  const response = await fetch(`${API_URL}/api/students/me?user_id=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch student profile");
  }
  return response.json();
}

/**
 * Get placement test questions.
 * @param {string} language - Target language (e.g., "French")
 * @returns {Promise<{questions: Array}>}
 */
export async function getPlacementTest(language) {
  const response = await fetch(
    `${API_URL}/api/students/placement-test?language=${language}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch placement test");
  }
  return response.json();
}
