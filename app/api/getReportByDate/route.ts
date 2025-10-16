import { NextRequest, NextResponse } from "next/server";

export interface AttendanceRow {
    0: number | string;
    1: string;
    2: number | string;
    3: number | string;
    4: number | string;
    5: string;
    6: string;
    7: string;
    8: number | string;
    9: string;
    10: string;
    11: string;
}

export interface AttendanceData {
    status: string;
    headers: string[];
    sheetName: string;
    totalRows: number;
    data: AttendanceRow[];
}

export interface ReportResponse {
    success: boolean;
    message: string;
    data: AttendanceData;
    timestamp: string;
}

/*
    IN THIS GET FUNCTION:
    1. EXTRACT THE DATE PARAMETER FROM THE REQUEST URL
    2. MAKE A FETCH REQUEST TO THE BACKEND SERVER TO GET THE REPORT FOR THE GIVEN DATE
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
        const route = process.env.BACKEND_BASE_URL + `/api/reports/date/${date}`;
        const response = await fetch(
            route,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch report" },
                { status: 500 }
            );
        }

        const report: ReportResponse = await response.json();
        return NextResponse.json(report);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
