"use client";

import { AttendanceRecordResponse } from "@/lib/types";
import {
    fetchJSON,
    formatDateForRender,
    formatTimeForRender,
} from "@/lib/utils";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    BentoContainer,
    BentoContainerHeader,
} from "@/components/reusables/bento-container";
import { Description, SubTitle, Title } from "@/components/reusables/texts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface StudentOnDateProps {
    studentId: string;
    date: string;
}
const StudentOnDate: React.FC<StudentOnDateProps> = ({ studentId, date }) => {
    const [data, setData] = useState<AttendanceRecordResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            const route = `/api/reports/student/${studentId}?date=${date}`;
            const res = await fetchJSON<AttendanceRecordResponse>(route);
            if (isMounted) {
                setData(res);
                setLoading(false);
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, [studentId, date]);

    if (loading) {
        return (
            <BentoContainer className="flex flex-col h-full w-full space-y-8 bg-transparent border-none">
                <BentoContainerHeader>
                    <Title>
                        Student Record for {studentId} on{" "}
                        {formatDateForRender(date)}
                    </Title>
                    <Description>
                        If data is missing, it means the student did not check
                        in or out on that date. Refresh the page if you believe
                        this is an error.
                    </Description>
                </BentoContainerHeader>
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[1, 2, 3].map((item) => (
                        <Skeleton
                            key={item}
                            className="h-[3rem] sm:h-[10rem] flex gap-10 sm:gap-0 sm:flex-col "
                        />
                      
                    ))}
                </section>
                <Skeleton className="h-1/2 w-full" />
            </BentoContainer>
        );
    }

    if (!data?.success) {
        throw new Error(
            data?.message || "Failed to fetch student attendance data."
        );
    }

    if (!data.data || data.data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full bg-transparent ">
                <Title className="text-center">
                    No Attendance Records for {studentId} on{" "}
                    {formatDateForRender(date)}
                </Title>
                <Description className="text-center">
                    The student did not check in or out on this date.
                </Description>
            </div>
        );
    }

    const student = [
        {
            label: "Partner Id",
            value:
                data.data.length > 0 ? data.data[0].partner_id : "Unknown ID",
        },
        {
            label: "Email",
            value:
                data.data.length > 0
                    ? data.data[0].email_address
                    : "Unknown Email",
        },
        {
            label: "Section",
            value:
                data.data.length > 0
                    ? data.data[0].department
                    : "Unknown Section",
        },
    ];

    const formattedData = data.data.map((item) => {
        return {
            checkIn: item.checkIn,
            check_out: item.check_out,
        };
    });

    return (
        <BentoContainer className="flex flex-col h-full w-full space-y-8 bg-transparent border-none">
            <BentoContainerHeader>
                <Title>
                    Student Record for {studentId} on{" "}
                    {formatDateForRender(date)}
                </Title>
                <Description>
                    If data is missing, it means the student did not check in or
                    out on that date. Refresh the page if you believe this is an
                    error.
                </Description>
            </BentoContainerHeader>

            {/* STUDENT PROFILE */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {student.map(({ value, label }) => (
                    <BentoContainer
                        key={label}
                        className="bg-gradient-to-tl from-[#f9f5ff] via-[#f0e7ff] to-[#e2d9ff] shadow-md transition h-fit sm:h-[10rem] hover:border-2 hover:border-purple-200 flex gap-10 sm:gap-0 sm:flex-col justify-between"
                    >
                        <SubTitle className="wrap-anywhere">{value}</SubTitle>
                        <Description>{label}</Description>
                    </BentoContainer>
                ))}
            </section>

            <div className="flex-1 min-h-0">
                <ScrollArea className="h-full w-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Check In</TableHead>
                                <TableHead>Check Out</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {formattedData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {formatTimeForRender(item.checkIn)}
                                    </TableCell>
                                    <TableCell>
                                        {formatTimeForRender(item.check_out)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </div>
        </BentoContainer>
    );
};

export default StudentOnDate;
