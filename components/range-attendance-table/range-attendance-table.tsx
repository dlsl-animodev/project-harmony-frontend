"use client";

import React, { useEffect, useState } from "react";
import { fetchJSON, groupDateRangeByDay } from "@/lib/utils";
import Loader from "@/components/loader";
import NoDataMessage from "../no-data-message";
import AttendanceTable from "../attendance-table/attendance-table";
import { ScrollArea } from "../ui/scroll-area";
import { BentoContainer } from "../bento-container";
import { AttendanceRecord, DateRangeResponse } from "@/lib/types";

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
    const [data, setData] = useState<DateRangeResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            const route = `${process.env.NEXT_PUBLIC_BASE_URL}/api/reports/range?start=${startDate}&end=${endDate}`;
            const res = await fetchJSON<DateRangeResponse>(route);

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

    if (!data || !data.data || data.data.length === 0) {
        return <NoDataMessage />;
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
        <ScrollArea className={`w-full h-full  overflow-y-auto ${className}`} type="always">
            <BentoContainer className="border-none bg-background">
                {Object.entries(formattedDates).map(([date, records]) => (
                    <div key={date} className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{date}</h2>
                        <AttendanceTable
                            date={date}
                            data={records}
                            className={className}
                            tableClassName="h-fit"
                        />
                    </div>
                ))}
            </BentoContainer>
        </ScrollArea>
    );
};

export default RangeAttendanceTable;
