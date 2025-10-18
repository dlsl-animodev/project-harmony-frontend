import { NextRequest, NextResponse } from "next/server";
import { getAttendanceByPartnerId } from "@/lib/services/sheets-service";
import { formatTimestamp } from "@/lib/utils/transformers";
import { AttendanceRecordResponse } from "@/lib/types";

// GET /api/reports/student/[partnerId]?date=YYYY-MM-DD
// get attendance records filtered by partner ID (student ID)

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ partnerId: string }> }
): Promise<NextResponse<AttendanceRecordResponse>> {
    try {
        const { partnerId } = await params;
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");

        if (!partnerId) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing parameter",
                    message: "Partner ID parameter is required",
                    timestamp: formatTimestamp(),
                    data: [],
                    totalRecords: 0,
                },
                { status: 400 }
            );
        }

        const targetDate = date ? date : undefined;
        const data = await getAttendanceByPartnerId(partnerId, targetDate);

        return NextResponse.json(
            {
                success: true,
                message: `Attendance for student ${partnerId} retrieved successfully`,
                totalRecords: data.length,
                data: data,
                timestamp: formatTimestamp(),
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            `${new Date().toISOString()} Error in getStudentReport:`,
            error
        );
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Unknown error occurred :<";

        return NextResponse.json(
            {
                success: false,
                totalRecords: 0,
                data: [],
                error: "Failed to retrieve attendance by student",
                message: errorMessage,
                timestamp: formatTimestamp(),
            },
            { status: 500 }
        );
    }
}
