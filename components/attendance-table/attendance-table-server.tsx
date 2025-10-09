import BentoContainer from "../bento-container";
import { SubTitle, Description } from "../texts";
import AttendanceTable, { Columns } from "./attendance-table";

interface AttendanceTableServerProps {
    className? : string;
      dayId: string | string[] | undefined;

}
const AttendanceTableServer : React.FC<AttendanceTableServerProps> = async ({
    dayId,
    className
}) => {
     if (!dayId) {
        // RENDER A NO DAY SELECTED MESSAGE
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
    }

    // SIMULATE A SERVER FETCH
    await new Promise((resolve) => setTimeout(resolve, 2000));

        const data: Columns[] = [
        {
            id: "1",
            time_in: "2023-06-10T09:00:00",
            name: "John Doe",
            email: "john.doe@example.com",
            time_out: "2023-06-10T17:00:00",
            isMember: true,
        },
        {
            id: "2",
            time_in: "2023-06-10T09:15:00",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            time_out: "2023-06-10T17:30:00",
            isMember: false,
        },
        {
            id: "3",
            time_in: "2023-06-10T08:45:00",
            name: "Bob Johnson",
            email: "bob.johnson@example.com",
            time_out: "2023-06-10T16:45:00",
            isMember: true,
        },
        {
            id: "1",
            time_in: "2023-06-10T09:00:00",
            name: "John Doe",
            email: "john.doe@example.com",
            time_out: "2023-06-10T17:00:00",
            isMember: true,
        },
        {
            id: "2",
            time_in: "2023-06-10T09:15:00",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            time_out: "2023-06-10T17:30:00",
            isMember: false,
        },
        {
            id: "3",
            time_in: "2023-06-10T08:45:00",
            name: "Bob Johnson",
            email: "bob.johnson@example.com",
            time_out: "2023-06-10T16:45:00",
            isMember: true,
        },
        {
            id: "1",
            time_in: "2023-06-10T09:00:00",
            name: "John Doe",
            email: "john.doe@example.com",
            time_out: "2023-06-10T17:00:00",
            isMember: true,
        },
        {
            id: "2",
            time_in: "2023-06-10T09:15:00",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            time_out: "2023-06-10T17:30:00",
            isMember: false,
        },
        {
            id: "3",
            time_in: "2023-06-10T08:45:00",
            name: "Bob Johnson",
            email: "bob.johnson@example.com",
            time_out: "2023-06-10T16:45:00",
            isMember: true,
        },
        {
            id: "1",
            time_in: "2023-06-10T09:00:00",
            name: "John Doe",
            email: "john.doe@example.com",
            time_out: "2023-06-10T17:00:00",
            isMember: true,
        },
        {
            id: "2",
            time_in: "2023-06-10T09:15:00",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            time_out: "2023-06-10T17:30:00",
            isMember: false,
        },
        {
            id: "3",
            time_in: "2023-06-10T08:45:00",
            name: "Bob Johnson",
            email: "bob.johnson@example.com",
            time_out: "2023-06-10T16:45:00",
            isMember: true,
        },
        {
            id: "1",
            time_in: "2023-06-10T09:00:00",
            name: "John Doe",
            email: "john.doe@example.com",
            time_out: "2023-06-10T17:00:00",
            isMember: true,
        },
        {
            id: "2",
            time_in: "2023-06-10T09:15:00",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            time_out: "2023-06-10T17:30:00",
            isMember: false,
        },
        {
            id: "3",
            time_in: "2023-06-10T08:45:00",
            name: "Bob Johnson",
            email: "bob.johnson@example.com",
            time_out: "2023-06-10T16:45:00",
            isMember: true,
        },
        {
            id: "1",
            time_in: "2023-06-10T09:00:00",
            name: "John Doe",
            email: "john.doe@example.com",
            time_out: "2023-06-10T17:00:00",
            isMember: true,
        },
        {
            id: "2",
            time_in: "2023-06-10T09:15:00",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            time_out: "2023-06-10T17:30:00",
            isMember: false,
        },
        {
            id: "3",
            time_in: "2023-06-10T08:45:00",
            name: "Bob Johnson",
            email: "bob.johnson@example.com",
            time_out: "2023-06-10T16:45:00",
            isMember: true,
        },
        {
            id: "1",
            time_in: "2023-06-10T09:00:00",
            name: "John Doe",
            email: "john.doe@example.com",
            time_out: "2023-06-10T17:00:00",
            isMember: true,
        },
        {
            id: "2",
            time_in: "2023-06-10T09:15:00",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            time_out: "2023-06-10T17:30:00",
            isMember: false,
        },
        {
            id: "3",
            time_in: "2023-06-10T08:45:00",
            name: "Bob Johnson",
            email: "bob.johnson@example.com",
            time_out: "2023-06-10T16:45:00",
            isMember: true,
        },
    ];

    return (
        <AttendanceTable className={className} dayId={dayId} data={data} />
    )
};

export default AttendanceTableServer;