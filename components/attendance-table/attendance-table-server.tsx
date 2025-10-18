import { DateResponse } from "@/lib/types";
import { BentoContainer } from "../bento-container";
import { SubTitle, Description } from "../texts";
import AttendanceTable from "./attendance-table";
import { fetchJSON } from "@/lib/utils";
import NoDataMessage from "../no-data-message";

interface AttendanceTableServerProps {
    className?: string;
    date: string;
}
const AttendanceTableServer: React.FC<AttendanceTableServerProps> = async ({
    date,
    className,
}) => {
    if (!date) return <NoDayChosen />;

    const route = `${process.env.NEXT_PUBLIC_BASE_URL}/api/reports/date/${date}`;
    const data = await fetchJSON<DateResponse>(route);

    if (!data.success) return <NoDataMessage className={className} />

    const formattedData =
        data.data.data?.map((item, index) => {
            return {
                id: index.toString(),
                partner_id: item[4] as string | number,
                email_address: item[5] as string,
                section: item[6] as string,
                checkIn: item[10] as string,
                check_out: item[11] as string,
            };
        }) || [];

    return (
        <AttendanceTable
            className={className}
            date={date}
            data={formattedData}
        />
    );
};

export default AttendanceTableServer;

interface NoDayChosenProps {
    className?: string;
}

const NoDayChosen: React.FC<NoDayChosenProps> = ({ className }) => {
    return (
        <BentoContainer
            className={`flex flex-col items-center justify-center ${className}`}
        >
            <SubTitle> No day chosen </SubTitle>
            <Description>
                {" "}
                Select a day in the sidebar to show attendance{" "}
            </Description>
        </BentoContainer>
    );
};
