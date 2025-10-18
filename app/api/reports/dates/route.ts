import { NextResponse } from "next/server";
import { getAvailableDates } from "@/lib/services/sheets-service";
import { formatTimestamp } from "@/lib/utils/transformers";

// GET /api/reports/dates
// get all available dates (sheet names) from google sheets
// returns an array of dates in YYYY-MM-DD format

export async function GET() {
  try {
    const response = await getAvailableDates();

    return NextResponse.json(
      {
        success: true,
        count: response.count,
        dates: response.dates,
        timestamp: formatTimestamp(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`${new Date().toISOString()} Error in getAvailableDatesReport:`, error);
    const errorMessage = error instanceof Error ? error.message : "an error occurred :<";

    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve available dates",
        message: errorMessage,
        timestamp: formatTimestamp(),
      },
      { status: 500 }
    );
  }
}
