import { fetchJSON, formatDatesWithIndexAsId } from "@/lib/utils";
import DaysSidebar from "./days-sidebar";
import { AvailableDatesResponse } from "@/lib/types";
import FetchFailed from "../error/fetch-failed";
import { Description } from "../reusables/texts";

interface DaysSidebarProps {
    className?: string;
}

const DaysSidebarServer: React.FC<DaysSidebarProps> = async ({ className }) => {
    const route = `${process.env.NEXT_PUBLIC_BASE_URL}/api/reports/dates`;
    const data = await fetchJSON<AvailableDatesResponse>(route, {
        cache: "default",
    });

    // since this component is not used by a page
    // manually return the error component
    if (!data.success) {
        const error = new Error(
            data.message || "Failed to fetch available dates"
        );
        return <FetchFailed error={error} />;
    }

    // prevent unecessary client rendering
    if (!data.dates || data.dates.length === 0) {
        return <Description> No available dates yet. </Description>;
    }

    const formattedDates = formatDatesWithIndexAsId(data.dates);

    return (
        <DaysSidebar className={className} formattedDates={formattedDates} />
    );
};

export default DaysSidebarServer;
