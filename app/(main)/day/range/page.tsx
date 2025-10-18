import RangeAttendanceTable from "@/components/range-attendance-table/range-attendance-table";

interface CustomDateRangePageProps {
    // search params will have startDate and endDate as YYYY-MM-DD strings as Promise
    searchParams: Promise<{ startDate: string; endDate: string }>;
}

const CustomDateRangePage: React.FC<CustomDateRangePageProps> = async ({
    searchParams,
}) => {
    const { startDate = "", endDate = "" } = (await searchParams) ?? {};

    return (
        <div className="flex h-full w-full">
            <RangeAttendanceTable
                key={`${startDate}-${endDate}`}
                className="w-full"
                startDate={startDate}
                endDate={endDate}
            />
        </div>
    );
};

export default CustomDateRangePage;
