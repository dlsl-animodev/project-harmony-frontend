import { NextRequest, NextResponse } from "next/server";
import { getAttendanceByEmail } from "@/lib/services/sheets-service";
import { formatTimestamp } from "@/lib/utils/transformers";

// GET /api/reports/email/[email]?date=YYYY-MM-DD
// get attendance records filtered by email

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await params;
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing parameter",
          message: "Email parameter is required",
        },
        { status: 400 }
      );
    }

    const targetDate = date ? date : undefined;
    const data = await getAttendanceByEmail(email, targetDate);

    return NextResponse.json(
      {
        success: true,
        message: `Attendance for ${email} retrieved successfully`,
        totalRecords: data.length,
        data: data,
        timestamp: formatTimestamp(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`${new Date().toISOString()} Error in getEmailReport:`,error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred :<";

    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve attendance by email",
        message: errorMessage,
        timestamp: formatTimestamp(),
      },
      { status: 500 }
    );
  }
}
