import { NextRequest, NextResponse } from "next/server";
import { getStudentInfo } from "@/lib/services/api-service";
import { saveToGoogleSheets } from "@/lib/services/sheets-service";
import { formatTimestamp } from "@/lib/utils/transformers";
import { config } from "@/config/env";


//   GET /api/student?id=<student_id>
//   main api endpoint called by Arduino to log attendance

//  flow:
// 1. receive student ID from Arduino
// 2. fetch student info from external API (our qol api)
// 3. save attendance to Google Sheets
// 4. return response to Arduino

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("id");

    if (!studentId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required parameter: id",
          message: "Please provide a student ID",
        },
        { status: 400 }
      );
    }

    const studentData = await getStudentInfo(studentId);

    const localCheckIn = formatTimestamp(new Date());

    const sheetsData = {
      count: studentData.count || 0,
      regKey: studentData.regkey?.toString() || config.regKey || "",
      whitelist:
        typeof studentData.whitelist === "string"
          ? parseInt(studentData.whitelist)
          : studentData.whitelist || 1,
      card_tag: studentData.card_tag?.toString() || studentData.partner_id,
      partner_id: studentData.partner_id,
      email_address: studentData.email_address,
      department: studentData.department || "",
      guest_fullname: studentData.guest_fullname || "",
      reg_guest:
        typeof studentData.reg_guest === "string"
          ? parseInt(studentData.reg_guest)
          : studentData.reg_guest || 0,
      card_tag_uid: studentData.card_tag_uid || studentData.partner_id,
      checkIn: localCheckIn,
    };

    console.log(
      `${new Date().toISOString()} Data prepared for sheets:`,
      JSON.stringify(sheetsData, null, 2)
    );

    const sheetsResponse = await saveToGoogleSheets(sheetsData);

    console.log(
      `${new Date().toISOString()} Google Sheets response:`,
      JSON.stringify(sheetsResponse, null, 2)
    );

    return NextResponse.json(
      {
        success: true,
        message: `Attendance logged successfully. Action: ${sheetsResponse.action}`,
        studentData: studentData,
        googleSheets: sheetsResponse,
        timestamp: formatTimestamp(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      `${new Date().toISOString()} Error in handleStudentAttendance:`,
      error
    );

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred :<";

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: errorMessage,
        timestamp: formatTimestamp(),
      },
      { status: 500 }
    );
  }
}
