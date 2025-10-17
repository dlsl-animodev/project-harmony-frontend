// GET /api/getDates
// get all available dates from google sheets

import { NextResponse } from "next/server";
import { getAvailableDates } from "@/lib/services/sheets-service";
import { formatTimestamp } from "@/lib/utils/transformers";

export interface GetDatesResponse {
    success: boolean;
    count: number;
    dates: string[];
    timestamp: string;
}

export async function GET(): Promise<
    NextResponse<GetDatesResponse | { error: string }>
> {
    try {

        // use the local service instead of calling the deprecated backend
        const response = await getAvailableDates();

        return NextResponse.json({
            success: true,
            message: response.message,
            count: response.count,
            dates: response.dates,
            timestamp: formatTimestamp(),
        });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
