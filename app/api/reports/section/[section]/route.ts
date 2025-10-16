import { NextRequest, NextResponse } from "next/server";
import { getAttendanceBySection } from "@/lib/services/sheets-service";
import { formatTimestamp } from "@/lib/utils/transformers";

// GET /api/reports/section/[section]?date=YYYY-MM-DD
// get attendance records filtered by section

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const { section } = await params;
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!section) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing parameter",
          message: "Section parameter is required",
        },
        { status: 400 }
      );
    }

    const targetDate = date ? date : undefined;
    const data = await getAttendanceBySection(section, targetDate);

    return NextResponse.json(
      {
        success: true,
        message: `Attendance for ${section} retrieved successfully`,
        totalRecords: data.length,
        data: data,
        timestamp: formatTimestamp(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`${new Date().toISOString()} Error in getSectionReport:`,error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred :<";

    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve attendance by section",
        message: errorMessage,
        timestamp: formatTimestamp(),
      },
      { status: 500 }
    );
  }
}
