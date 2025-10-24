"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import {
    BentoContainer,
    BentoContainerHeader,
} from "../reusables/bento-container";
import { Description, SubTitle } from "../reusables/texts";
import React from "react";
import { formatDateForRender, formatTimeForRender } from "@/lib/utils";

export interface Columns {
    id: string;
    partner_id: string | number;
    email_address: string;
    section: string;
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
        accessorKey: "section",
        header: "Section",
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
    tableClassName?: string;
    date: string;
    data: Columns[];
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({
    className,
    tableClassName,
    date,
    data,
}) => {
    return (
        <BentoContainer
            className={`${className} flex flex-col h-full overflow-hidden bg-background`}
        >
            <BentoContainerHeader>
                <SubTitle>
                    {" "}
                    Record for day: {formatDateForRender(date)}{" "}
                </SubTitle>
                <Description>
                    {" "}
                    List of all the checkins and outs for the selected day{" "}
                </Description>
            </BentoContainerHeader>

            <DataTable
                className="flex-1 min-h-0"
                tableClassName={tableClassName}
                data={data}
                columns={columns}
            />
        </BentoContainer>
    );
};

export default AttendanceTable;
