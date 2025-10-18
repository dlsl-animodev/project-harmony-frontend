export interface DateType {
  id : string | number;
  text : string;
}

// backend types migrated from Express backend

export interface StudentInfo {
  count?: number;
  regkey?: number;
  whitelist?: string | number;
  card_tag?: number;
  partner_id: string;
  email_address: string;
  department: string;
  guest_fullname?: string;
  reg_guest?: string | number;
  member?: unknown[];
  card_tag_uid?: string;
  checkIn?: string;
  [key: string]: unknown;
}

export interface SheetsAttendanceData {
  count: number;
  regKey: string;
  whitelist: number;
  card_tag: string;
  partner_id: string;
  email_address: string;
  department: string;
  guest_fullname: string;
  reg_guest: number;
  card_tag_uid: string;
  checkIn?: string;
  check_out?: string;
}

export interface SheetsResponse {
  status: string;
  message: string;
  action?: "check_in" | "check_out";
}

export interface AvailableDatesResponse {
  success: string;
  count: number;
  dates: string[];
  timestamp : string;
}

export interface AttendanceRecord {
  count: number;
  regkey: string;
  whitelist: number;
  card_tag: string;
  partner_id: string;
  email_address: string;
  department: string;
  guest_fullname: string;
  reg_guest: number;
  card_tag_uid: string;
  checkIn: string;
  check_out: string;
}

export interface SheetsGetResponse {
  status: string;
  sheetName: string;
  totalRows: number;
  headers: string[];
  data: unknown[][];
}

export interface DateResponse {
  success : boolean;
  message : string;
  data : SheetsGetResponse;
  timestamp : string;
}

export interface ExternalApiResponse {
  success: boolean;
  message: string;
  student: {
    email_address: string;
    department: string;
    partner_id: string;
    card_tag_uid: string;
  };
  attendance: {
    id: string;
    student_id: string;
    student_name: string;
    email_address: string;
    tapped_at: string;
    event_id: string;
  };
  event: {
    id: string;
    event_name: string;
    event_code: string;
    event_date: string;
  };
}

export interface GoogleSheetsRow {
  count: number;
  regKey: string;
  whitelist: number;
  card_tag: string;
  partner_id: string;
  email_address: string;
  department: string;
  guest_fullname: string;
  reg_guest: number;
  card_tag_uid: string;
}

export interface GoogleSheetsResponse {
  status: string;
  message: string;
  action?: "check_in" | "check_out";
}

export interface AttendanceResponse {
  success: boolean;
  message: string;
  externalApi: ExternalApiResponse;
  googleSheets: GoogleSheetsResponse;
  timestamp: string;
}

export interface AttendanceRecordResponse {
  success: boolean;
  message: string;
  totalRecords: number;
  data: AttendanceRecord[];
  timestamp: string;
}