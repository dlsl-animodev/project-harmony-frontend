import { fetchJSON, formatDatesWithIndexAsId } from "@/lib/utils";
import DaysSidebar from "./days-sidebar";
import { AvailableDatesResponse } from "@/lib/types";
import FetchFailed from "../error/fetch-failed";

interface DaysSidebarProps {
    className?: string;
}

const DaysSidebarServer: React.FC<DaysSidebarProps> = async ({ className }) => {
    const route = `${process.env.NEXT_PUBLIC_BASE_URL}/api/reports/dates`;
    const data = await fetchJSON<AvailableDatesResponse>(route);

    // since this component is not used by a page
    // manually return the error component
    if (!data.success) {
        const error = new Error(
            data.message || "Failed to fetch available dates"
        );
        return <FetchFailed error={error} />;
    }

    const formattedDates = formatDatesWithIndexAsId(data.dates);

    return (
        <DaysSidebar className={className} formattedDates={formattedDates} />
    );
};

export default DaysSidebarServer;
