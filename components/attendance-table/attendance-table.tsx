"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import BentoContainer from "../bento-container";
import { Description, SubTitle } from "../texts";
import React from "react";
import ShareButton from "./share-button";

export interface Columns {
    id: string;
    time_in: string;
    name: string;
    email: string;
    time_out: string;
    isMember: boolean;
}

const columns: ColumnDef<Columns>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "time_in",
        header: "Time In",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "time_out",
        header: "Time Out",
    },
    {
        accessorKey: "isMember",
        header: "Is Member",
        cell: ({ row }) => (row.original.isMember ? "Yes" : "No"),
    },
];

interface AttendanceTableProps {
    className?: string;
    dayId: string | string[] | undefined;
    data: Columns[];
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({
    className,
    dayId,
    data,
}) => {
    return (
        <BentoContainer className={`${className} bg-background`}>
            <header className="border-b pb-2">
                <SubTitle> Record for Day {dayId} </SubTitle>
                <Description>
                    {" "}
                    List of all the checkins and outs for the selected day{" "}
                </Description>
            </header>

            {/* 
                THE CHILDREN OF THE DATA TABLE WILL BE THE BUTTONS IN THE RIGHT SIDE FOR ADDITIONAL CONTROLS  
                THE BUTTONS CAN NOT DIRECTLY INTERACT WITH THE DATATABLE BUT THROUGH THE DATA STATE PROPS
            */}
            <DataTable className={className} data={data} columns={columns} >
                <section className="flex gap-2">
                    <ShareButton />
                </section>
            </DataTable>
        </BentoContainer>
    );
};

export default AttendanceTable;
