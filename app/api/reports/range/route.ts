import { NextRequest, NextResponse } from "next/server";
import { getAttendanceByDateRange } from "@/lib/services/sheets-service";
import { formatTimestamp } from "@/lib/utils/transformers";
import { DateRangeResponse } from "@/lib/types";

// GET /api/reports/range?start=YYYY-MM-DD&end=YYYY-MM-DD
// get attendance records for a date range

export async function GET(
    request: NextRequest
): Promise<NextResponse<DateRangeResponse | { error: string }>> {
    try {
        const { searchParams } = new URL(request.url);
        const start = searchParams.get("start");
        const end = searchParams.get("end");

        if (!start || !end) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing parameters",
                    message:
                        "Both 'start' and 'end' date parameters are required",
                },
                { status: 400 }
            );
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(start) || !dateRegex.test(end)) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid date format",
                    message: "Dates must be in YYYY-MM-DD format",
                },
                { status: 400 }
            );
        }

        const data = await getAttendanceByDateRange(start, end);

        return NextResponse.json(
            {
                success: true,
                message: `Attendance from ${start} to ${end} retrieved successfully`,
                totalRecords: data.length,
                data: data,
                timestamp: formatTimestamp(),
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            `${new Date().toISOString()} Error in getDateRangeReport:`,
            error
        );
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Unknown error occurred :<";

        return NextResponse.json(
            {
                success: false,
                error: "Failed to retrieve attendance range",
                message: errorMessage,
                timestamp: formatTimestamp(),
            },
            { status: 500 }
        );
    }
}
