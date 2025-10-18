import { fetchJSON, formatDatesWithIndexAsId } from "@/lib/utils";
import DaysSidebar from "./days-sidebar";
import { GetDatesResponse } from "@/app/api/getDates/route";
import NoDataMessage from "../no-data-message";


interface DaysSidebarProps {
    className?: string;
}

const DaysSidebarServer: React.FC<DaysSidebarProps> = async ({ className }) => {
    const route = `${process.env.NEXT_PUBLIC_BASE_URL}/api/getDates`;
    const data = await fetchJSON<GetDatesResponse>(route);

    if (!data.success) return <NoDataMessage />

    const formattedDates  = formatDatesWithIndexAsId(data.dates);

    return <DaysSidebar className={className} formattedDates={formattedDates} />;
};

export default DaysSidebarServer;