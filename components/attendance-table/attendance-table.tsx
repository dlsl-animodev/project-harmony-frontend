"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { BentoContainer } from "../bento-container";
import { Description, SubTitle } from "../texts";
import React from "react";
import ShareButton from "./share-button";
import { formatDateForRender, formatTimeForRender } from "@/lib/utils";

export interface Columns {
    id: string;
    partner_id: string | number;
    email_address: string;
    department: string;
    checkIn: string;
    check_out: string;
}

const columns: ColumnDef<Columns>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "partner_id",
        header: "Partner ID",
    },
    {
        accessorKey: "email_address",
        header: "Email Address",
    },
    {
        accessorKey: "department",
        header: "Department",
    },
    {
        accessorKey: "checkIn",
        header: "Check In",
        cell: ({ row }) => formatTimeForRender(row.original.checkIn),
    },
    {
        accessorKey: "check_out",
        header: "Check Out",
        cell: ({ row }) => formatTimeForRender(row.original.check_out),
    },
];

interface AttendanceTableProps {
    className?: string;
    date: string;
    data: Columns[];
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({
    className,
    date,
    data,
}) => {
    return (
        <BentoContainer className={`${className} bg-background`}>
            <header className="border-b pb-2">
                <SubTitle>
                    {" "}
                    Record for day: {formatDateForRender(date)}{" "}
                </SubTitle>
                <Description>
                    {" "}
                    List of all the checkins and outs for the selected day{" "}
                </Description>
            </header>

            {/* 
                THE CHILDREN OF THE DATA TABLE IS THE BUTTONS IN THE RIGHT SIDE FOR ADDITIONAL CONTROLS  
                THE BUTTONS CAN NOT DIRECTLY INTERACT WITH THE DATATABLE BUT THROUGH THE DATA STATE PROPS
            */}
            <DataTable className={className} data={data} columns={columns}>
                <ShareButton />
            </DataTable>
        </BentoContainer>
    );
};

export default AttendanceTable;
