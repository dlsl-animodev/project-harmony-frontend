import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AttendanceRecord, DateType } from "./types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDateForRender(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function formatDateAsYYYYMMDD(date: Date | undefined) {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export function formatTimeForRender(isoString: string) {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

export function groupDatesByMonth(dates: DateType[]) {
    return dates.reduce((acc: Record<string, typeof dates>, item) => {
        const date = new Date(item.text);
        const monthYear = date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });

        if (!acc[monthYear]) {
            acc[monthYear] = [];
        }
        acc[monthYear].push(item);

        return acc;
    }, {});
}

export function groupDateRangeByDay(data: AttendanceRecord[] | null) {
    if (!data) return {};

    return data.reduce((acc: Record<string, typeof data>, item) => {
        const date = new Date(item.checkIn);

        if (!item.checkIn || isNaN(date.getTime())) {
            console.warn("Skipping invalid date for item:", item);
            return acc;
        }

        const dayKey = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        if (!acc[dayKey]) {
            acc[dayKey] = [];
        }

        acc[dayKey].push(item);
        return acc;
    }, {});
}

export function formatDatesWithIndexAsId(dates: string[] = []): DateType[] {
    return dates.map((dateStr, index) => ({
        id: index,
        text: dateStr,
    }));
}

export async function fetchJSON<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(url, options);
    return res.json() as Promise<T>;
}
