import { NextRequest, NextResponse } from "next/server";
import { getAttendanceByDate } from "@/lib/services/sheets-service";
import { formatTimestamp } from "@/lib/utils/transformers";

// GET /api/reports/date/[date]
// get attendance records for a specific date
// @param date - date in YYYY-MM-DD format

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  try {
    const { date } = await params;

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid date format",
          message: "Date must be in YYYY-MM-DD format (e.g., 2025-10-11)",
        },
        { status: 400 }
      );
    }

    const data = await getAttendanceByDate(date);

    return NextResponse.json(
      {
        success: true,
        message: `Attendance for ${date} retrieved successfully`,
        data: data,
        timestamp: formatTimestamp(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`${new Date().toISOString()} Error in getDateReport:`, error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred :<";

    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve attendance",
        message: errorMessage,
        timestamp: formatTimestamp(),
      },
      { status: 500 }
    );
  }
}
