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
import { BentoContainer } from "@/components/bento-container";
import { Description, SubTitle, Title } from "@/components/texts";
import { ScrollArea } from "@/components/ui/scroll-area";
import NoDataMessage from "@/components/no-data-message";

interface StudentOnDatePageProps {
    // params of the studentId
    // searchParams of the date
    params: Promise<{ studentId: string }>;
    searchParams: Promise<{ date: string }>;
}

const StudentOnDatePage: React.FC<StudentOnDatePageProps> = async ({
    params,
    searchParams,
}) => {
    const studentId = (await params).studentId;
    const date = (await searchParams).date;

    const route =
        process.env.NEXT_PUBLIC_BASE_URL +
        `/api/reports/student/${studentId}?date=${date}`;

    const data = await fetchJSON<AttendanceRecordResponse>(route);

    if (!data.success) return <NoDataMessage />

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

    // Format the data.data to just the checkIn and check_out fields
    const formattedData = data.data.map((item) => {
        return {
            checkIn: item.checkIn,
            check_out: item.check_out,
        };
    });

    return (
        <div className="flex flex-col h-full w-full space-y-8">
            <div>
                <Title>
                    Student Record for {studentId} on{" "}
                    {formatDateForRender(date)}
                </Title>
                <Description>
                    If data is missing, it means the student did not check in or out
                    on that date. Refresh the page if you believe this is an error.
                </Description>
            </div>

            {/* STUDENT PROFILE */}
            <section className="grid grid-cols-3 gap-4">
                {student.map(({ value, label }) => (
                    <BentoContainer
                        key={label}
                        className="space-y-12 px-6 bg-gradient-to-tl from-[#f9f5ff] via-[#f0e7ff] to-[#e2d9ff] shadow-md transition h-[10rem] hover:border-2 hover:border-purple-200 flex flex-col justify-between"
                    >
                        <SubTitle>{value}</SubTitle>
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
        </div>
    );
};

export default StudentOnDatePage;
