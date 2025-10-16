import { config } from "@/config/env";
import {
  AttendanceRecord,
  SheetsGetResponse,
  SheetsAttendanceData,
  SheetsResponse,
  AvailableDatesResponse,
} from "@/lib/types";

/**
 format date as YYYY-MM-DD for sheet name
*/

function formatDateForSheet(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Saves attendance data to Google Sheets via Apps Script Web App
 * @param data - The attendance data to save
 * @returns Response from Google Sheets Apps Script
*/

export async function saveToGoogleSheets(
  data: SheetsAttendanceData
): Promise<SheetsResponse> {
  try {
    const response = await fetch(config.sheetsWebAppUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Google Sheets Error: ${errorData.message || `HTTP ${response.status}`}`
      );
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(`[Sheets Service] Error calling Google Sheets:`, error);
    if (error instanceof Error) {
      throw new Error(`Google Sheets Error: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Fetches all attendance records from Google Sheets for a specific date
 * @param sheetName - The sheet name (date in YYYY-MM-DD format) to fetch from
 * @returns All rows from the sheet with headers and data
*/

export async function getAttendanceFromSheets(
  sheetName: string
): Promise<SheetsGetResponse> {
  try {
    const url = `${config.sheetsWebAppUrl}?sheetName=${encodeURIComponent(sheetName)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Google Sheets Error: ${errorData.message || `HTTP ${response.status}`}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Google Sheets Error: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Get attendance records for a specific date
 * @param date - Date string in YYYY-MM-DD format or Date object
*/

export async function getAttendanceByDate(
  date: string | Date
): Promise<SheetsGetResponse> {
  const sheetName =
    typeof date === "string" ? date : formatDateForSheet(date);
  return await getAttendanceFromSheets(sheetName);
}

// get attendance record for today

export async function getTodayAttendance(): Promise<SheetsGetResponse> {
  const today = formatDateForSheet(new Date());
  return await getAttendanceFromSheets(today);
}

/**
 * Get attendance records for a date range
 * @param startDate - Start date (YYYY-MM-DD or Date)
 * @param endDate - End date (YYYY-MM-DD or Date)
*/

export async function getAttendanceByDateRange(
  startDate: string | Date,
  endDate: string | Date
): Promise<AttendanceRecord[]> {
  const start =
    typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;

  const allRecords: AttendanceRecord[] = [];
  const currentDate = new Date(start);

  while (currentDate <= end) {
    try {
      const response = await getAttendanceByDate(currentDate);

      if (response.status === "success" && response.data) {
        const records = response.data.map((row) => ({
          count: row[0] as number,
          regkey: row[1] as string,
          whitelist: row[2] as number,
          card_tag: row[3] as string,
          partner_id: row[4] as string,
          email_address: row[5] as string,
          department: row[6] as string,
          guest_fullname: row[7] as string,
          reg_guest: row[8] as number,
          card_tag_uid: row[9] as string,
          checkIn: row[10] as string,
          check_out: row[11] as string,
        }));

        allRecords.push(...records);
      }
    } catch (error) {
      console.error(
        `Error fetching attendance for ${formatDateForSheet(currentDate)}:`,
        error
      );
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return allRecords;
}

/**
 * Get attendance records filtered by email
 * @param email - Student email address
 * @param date - Optional specific date, otherwise searches today
*/

export async function getAttendanceByEmail(
  email: string,
  date?: string | Date
): Promise<AttendanceRecord[]> {
  const targetDate = date || new Date();
  const response = await getAttendanceByDate(targetDate);

  if (response.status !== "success" || !response.data) {
    return [];
  }

  const filteredData = response.data.filter(
    (row) => row[5] === email
  );

  return filteredData.map((row) => ({
    count: row[0] as number,
    regkey: row[1] as string,
    whitelist: row[2] as number,
    card_tag: row[3] as string,
    partner_id: row[4] as string,
    email_address: row[5] as string,
    department: row[6] as string,
    guest_fullname: row[7] as string,
    reg_guest: row[8] as number,
    card_tag_uid: row[9] as string,
    checkIn: row[10] as string,
    check_out: row[11] as string,
  }));
}

/**
 * Get attendance records filtered by section/department
 * @param section - Department code (e.g., "C1A", "P1A")
 * @param date - Optional specific date, otherwise searches today
*/

export async function getAttendanceBySection(
  section: string,
  date?: string | Date
): Promise<AttendanceRecord[]> {
  const targetDate = date || new Date();
  const response = await getAttendanceByDate(targetDate);

  if (response.status !== "success" || !response.data) {
    return [];
  }

  const filteredData = response.data.filter(
    (row) => row[6] === section
  );

  return filteredData.map((row) => ({
    count: row[0] as number,
    regkey: row[1] as string,
    whitelist: row[2] as number,
    card_tag: row[3] as string,
    partner_id: row[4] as string,
    email_address: row[5] as string,
    department: row[6] as string,
    guest_fullname: row[7] as string,
    reg_guest: row[8] as number,
    card_tag_uid: row[9] as string,
    checkIn: row[10] as string,
    check_out: row[11] as string,
  }));
}

/**
 * Get attendance records filtered by partner ID (student ID)
 * @param partnerId - Student partner ID
 * @param date - Optional specific date, otherwise searches today
*/

export async function getAttendanceByPartnerId(
  partnerId: string,
  date?: string | Date
): Promise<AttendanceRecord[]> {
  const targetDate = date || new Date();
  const response = await getAttendanceByDate(targetDate);

  if (response.status !== "success" || !response.data) {
    return [];
  }

  const filteredData = response.data.filter(
    (row) => row[4]?.toString() === partnerId
  );

  return filteredData.map((row) => ({
    count: row[0] as number,
    regkey: row[1] as string,
    whitelist: row[2] as number,
    card_tag: row[3] as string,
    partner_id: row[4] as string,
    email_address: row[5] as string,
    department: row[6] as string,
    guest_fullname: row[7] as string,
    reg_guest: row[8] as number,
    card_tag_uid: row[9] as string,
    checkIn: row[10] as string,
    check_out: row[11] as string,
  }));
}

/**
 * Check if student has an active check-in (no check-out) today
 * @param email - Student email
 * @param partnerId - Partner ID
*/

export async function hasActiveCheckIn(
  email: string,
  partnerId: string
): Promise<boolean> {
  try {
    const todayRecords = await getAttendanceByEmail(email, new Date());

    return todayRecords.some(
      (record) =>
        record.checkIn &&
        !record.check_out &&
        record.partner_id?.toString() === partnerId
    );
  } catch (error) {
    console.error("Error checking active check-in:", error);
    return false;
  }
}

/**
 * Get all available dates (which are the sheet names) from Google Sheets
 * @returns A chronologically-sorted array of date strings in YYYY-MM-DD format
*/

export async function getAvailableDates(): Promise<AvailableDatesResponse> {
  try {
    const url = `${config.sheetsWebAppUrl}?action=getDates`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Google Sheets Error: ${errorData.message || `HTTP ${response.status}`}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`[Sheets Service] Error fetching dates:`, error);
    if (error instanceof Error) {
      throw new Error(`Google Sheets Error: ${error.message}`);
    }
    throw error;
  }
}
