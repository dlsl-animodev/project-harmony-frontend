import { config } from "@/config/env";
import { StudentInfo } from "@/lib/types";

/**
 * Fetches student information from the external API
 * @param studentId - The student's partner_id aka student ID
 * @returns The student information in Google Sheets format
*/

export async function getStudentInfo(studentId: string): Promise<StudentInfo> {
  try {

    const url = `${config.externalApiUrl}/api/student`;
    const urlWithParams = `${url}?id=${encodeURIComponent(studentId)}`;

    const response = await fetch(urlWithParams, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error || errorData.message || `HTTP ${response.status}`;
      throw new Error(`External API Error: ${errorMessage}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`API Service Error:`, error.message);
      throw new Error(`External API Error: ${error.message}`);
    }
    throw error;
  }
}
