import { NextResponse } from "next/server";

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
        const route = process.env.BACKEND_BASE_URL + "/api/reports/dates";
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
                { error: "Failed to fetch dates" },
                { status: 500 }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
