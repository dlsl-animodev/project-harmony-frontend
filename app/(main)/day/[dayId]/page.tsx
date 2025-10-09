import { Suspense } from "react";
import AttendanceTableServer from "@/components/attendance-table/attendance-table-server";
import Loader from "@/components/loader";

interface SingleDayPageProps {
    // When a page component is async, Next.js may provide params as a thenable.
    params: Promise<{ dayId: string }>;
}
const SingleDayPage = async ({ params }: SingleDayPageProps) => {
    const dayId = (await params).dayId;

    return (
        <div className="flex gap-4 h-full w-full">
            <Suspense
                fallback={
                    <Loader
                        className="w-full bg-background"
                        mainText="Loading record data..."
                        subText="Please wait while we fetch the records"
                    />
                }
            >
                <AttendanceTableServer className="w-full" dayId={dayId} />
            </Suspense>
        </div>
    );
};

export default SingleDayPage;
