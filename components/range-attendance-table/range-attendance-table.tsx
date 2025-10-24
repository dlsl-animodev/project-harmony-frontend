"use client";

import React, { useEffect, useState } from "react";
import {
    fetchJSON,
    formatDateForRender,
    groupDateRangeByDay,
} from "@/lib/utils";
import Loader from "@/components/reusables/loader";
import AttendanceTable from "../attendance-table/attendance-table";
import {
    BentoContainer,
    BentoContainerHeader,
} from "../reusables/bento-container";
import { AttendanceRecord, AttendanceRecordResponse } from "@/lib/types";
import { Description, Title } from "../reusables/texts";
import AlertMessage from "../reusables/alert-message";
import ShareButton from "../attendance-table/share-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { twMerge } from "tailwind-merge";

interface RangeAttendanceTableProps {
    startDate: string;
    endDate: string;
    className?: string;
}

const RangeAttendanceTable: React.FC<RangeAttendanceTableProps> = ({
    startDate,
    endDate,
    className,
}) => {
    const [data, setData] = useState<AttendanceRecordResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            const route = `${process.env.NEXT_PUBLIC_BASE_URL}/api/reports/range?start=${startDate}&end=${endDate}`;
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
    }, [startDate, endDate]);

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-background">
                <Loader
                    className="w-full bg-background h-full"
                    mainText="Loading record data..."
                    subText="Please wait while we fetch the records"
                />
            </div>
        );
    }

    if (!data?.success) {
        throw new Error(
            data?.message ||
                "Failed to fetch attendance data for the date range."
        );
    }

    const groupedDates = groupDateRangeByDay(data!.data);
    // reduce the fields to just the id, partenr_id, email_address, section, checkIn, check_out
    const formattedDates = Object.fromEntries(
        Object.entries(groupedDates).map(([date, records]) => [
            date,
            records.map((item: AttendanceRecord, index: number) => ({
                id: index.toString(),
                partner_id: item.partner_id,
                email_address: item.email_address,
                section: item.department,
                checkIn: item.checkIn,
                check_out: item.check_out,
            })),
        ])
    );

    return (
        <BentoContainer
            className={twMerge(
                `border-none bg-background space-y-8 w-full h-full overflow-y-auto`,
                className
            )}
        >
            <BentoContainerHeader className="flex items-center justify-between gap-10">
                <div>
                    <Title>
                        Attendance Records from {formatDateForRender(startDate)}{" "}
                        to {formatDateForRender(endDate)}
                    </Title>
                    <Description>
                        Click the custom button again to change the date range.
                    </Description>
                </div>
                <ShareButton fromRange={true}>Share Record Range</ShareButton>
            </BentoContainerHeader>

            <AlertMessage title="If you do not see any records for certain dates, it may be because there were no attendance records for those dates." />

            <Tabs defaultValue={Object.keys(formattedDates)[0]}>
                <TabsList className="mb-4 overflow-x-auto">
                    {Object.keys(formattedDates).map((date) => (
                        <TabsTrigger
                            key={date}
                            value={date}
                            className="whitespace-nowrap"
                        >
                            {formatDateForRender(date)}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {Object.entries(formattedDates).map(([date, records]) => (
                    <TabsContent key={date} value={date}>
                        <AttendanceTable date={date} data={records} />
                    </TabsContent>
                ))}
            </Tabs>
        </BentoContainer>
    );
};

export default RangeAttendanceTable;
