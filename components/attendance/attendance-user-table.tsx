import React from "react";
import { DataTable } from "../ui/attendance-tracker";

export default function AttendanceUserTable() {
  return (
    <div>
      <h2>Attendance User Table</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
