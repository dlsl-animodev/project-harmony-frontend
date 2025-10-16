import { NextRequest, NextResponse } from "next/server";
import { getAttendanceByDate } from "@/lib/services/sheets-service";
import { formatTimestamp } from "@/lib/utils/transformers";
import { SheetsGetResponse } from "@/lib/types";

export interface ReportResponse {
    success: boolean;
    message: string;
    data: SheetsGetResponse;
    timestamp: string;
}

/*
    IN THIS GET FUNCTION:
    1. EXTRACT THE DATE PARAMETER FROM THE REQUEST URL
    2. MAKE A FETCH REQUEST TO THE BACKEND SERVER TOGET THE REPORT FOR THE GIVEN DATE
    3. RETURN THE REPORT AS A JSON RESPONSE
*/

export async function GET(
    request: NextRequest
): Promise<NextResponse<ReportResponse | { error: string }>> {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
        return NextResponse.json(
            { error: "Date parameter is required" },
            { status: 400 }
        );
    }

    try {

        // use the local service instead of calling the deprecated backend
        const data = await getAttendanceByDate(date);

        return NextResponse.json({
            success: true,
            message: `Attendance for ${date} retrieved successfully`,
            data: data,
            timestamp: formatTimestamp(),
        });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
