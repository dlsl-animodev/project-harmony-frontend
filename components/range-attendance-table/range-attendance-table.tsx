"use client";

import React, { useEffect, useState } from "react";
import {
    fetchJSON,
    formatDateForRender,
    groupDateRangeByDay,
} from "@/lib/utils";
import Loader from "@/components/loader";
import NoDataMessage from "../no-data-message";
import AttendanceTable from "../attendance-table/attendance-table";
import { ScrollArea } from "../ui/scroll-area";
import { BentoContainer, BentoContainerHeader } from "../bento-container";
import { AttendanceRecord, DateRangeResponse } from "@/lib/types";
import { Description, Title } from "../texts";
import AlertMessage from "../alert-message";
import ShareButton from "../attendance-table/share-button";

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
        <ScrollArea
            className={`w-full h-full  overflow-y-auto ${className}`}
            type="always"
        >
            <BentoContainer className="border-none bg-background space-y-8">
                <BentoContainerHeader className="flex items-center justify-between">
                    <div>
                        <Title>
                            Attendance Records from{" "}
                            {formatDateForRender(startDate)} to{" "}
                            {formatDateForRender(endDate)}
                        </Title>
                        <Description>
                            Click the custom button again to change the date
                            range.
                        </Description>
                    </div>
                    <ShareButton fromRange={true}>Share Record Range</ShareButton>
                </BentoContainerHeader>

                <AlertMessage title="If you do not see any records for certain dates, it may be because there were no attendance records for those dates." />

                {Object.entries(formattedDates).map(([date, records]) => (
                    <div key={date} className="mb-8">
                        <AttendanceTable
                            date={date}
                            data={records}
                            className={className}
                            tableClassName="h-fit"
                            withShareButton={false}
                        />
                    </div>
                ))}
            </BentoContainer>
        </ScrollArea>
    );
};

export default RangeAttendanceTable;
