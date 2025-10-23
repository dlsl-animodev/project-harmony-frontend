import { fetchJSON, formatDatesWithIndexAsId } from "@/lib/utils";
import DaysSidebar from "./days-sidebar";
import NoDataMessage from "../reusables/no-data-message";
import { AvailableDatesResponse } from "@/lib/types";


interface DaysSidebarProps {
    className?: string;
}

const DaysSidebarServer: React.FC<DaysSidebarProps> = async ({ className }) => {
    const route = `${process.env.NEXT_PUBLIC_BASE_URL}/api/reports/dates`;
    const data = await fetchJSON<AvailableDatesResponse>(route);

    if (!data.success) return <NoDataMessage />

    const formattedDates  = formatDatesWithIndexAsId(data.dates);

    return <DaysSidebar className={className} formattedDates={formattedDates} />;
};

export default DaysSidebarServer;