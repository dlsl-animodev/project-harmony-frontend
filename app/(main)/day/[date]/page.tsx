import AttendanceTableServer from "@/components/attendance-table/attendance-table-server";

interface SingleDayPageProps {
    // When a page component is async, Next.js may provide params as a thenable.
    params: Promise<{ date: string }>;
}
const SingleDayPage = async ({ params }: SingleDayPageProps) => {
    const date = (await params).date;

    return (
        <div className="flex h-full w-full">
            <AttendanceTableServer className="w-full h-full" date={date} />
        </div>
    );
};

export default SingleDayPage;