import { Suspense } from "react";
import AttendanceTableServer from "@/components/attendance-table/attendance-table-server";
import Loader from "@/components/loader";

interface SingleDayPageProps {
    params: { dayId: string };
}
const SingleDayPage: React.FC<SingleDayPageProps> = async ({ params }) => {
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
