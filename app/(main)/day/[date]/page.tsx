import { Suspense } from "react";
import AttendanceTableServer from "@/components/attendance-table/attendance-table-server";
import Loader from "@/components/loader";

interface SingleDayPageProps {
    // When a page component is async, Next.js may provide params as a thenable.
    params: Promise<{ date: string }>;
}
const SingleDayPage = async ({ params }: SingleDayPageProps) => {
    const date = (await params).date;

    return (
        <div className="flex h-full w-full">
            <Suspense
                fallback={
                    <Loader
                        className="w-full bg-background"
                        mainText="Loading record data..."
                        subText="Please wait while we fetch the records"
                    />
                }
            >
                <AttendanceTableServer className="w-full h-full" date={date} />
            </Suspense>
        </div>
    );
};

export default SingleDayPage;
