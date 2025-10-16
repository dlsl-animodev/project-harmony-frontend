import { NextResponse } from "next/server";
import { getTodayAttendance } from "@/lib/services/sheets-service";
import { formatTimestamp } from "@/lib/utils/transformers";

// GET /api/reports/today
// get all attendance records for today

export async function GET() {
  try {
    const data = await getTodayAttendance();

    return NextResponse.json(
      {
        success: true,
        message: "Today's attendance retrieved successfully",
        data: data,
        timestamp: formatTimestamp(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`${new Date().toISOString()} Error in getTodayReport:`, error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred :<";

    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve today's attendance",
        message: errorMessage,
        timestamp: formatTimestamp(),
      },
      { status: 500 }
    );
  }
}
