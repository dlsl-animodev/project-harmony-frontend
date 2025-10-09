import RenderDaySidebar from "./days-sidebar";

interface DaysSidebarProps {
    className?: string;
}

const DaysSidebarServer: React.FC<DaysSidebarProps> = async ({ className }) => {
    const dummy = [
        {
            id: 1,
            text: "March 3, 2025",
        },
        {
            id: 2,
            text: "April 15, 2025",
        },
        {
            id: 3,
            text: "July 1, 2025",
        },
        {
            id: 4,
            text: "December 25, 2025",
        },
        {
            id: 5,
            text: "January 1, 2026",
        },
        {
            id: 6,
            text: "January 5, 2026",
        },
        {
            id: 7,
            text: "January 10, 2026",
        },
        {
            id: 8,
            text: "January 15, 2026",
        },
        {
            id: 9,
            text: "January 20, 2026",
        },
        {
            id: 10,
            text: "January 25, 2026",
        },
        {
            id: 11,
            text: "February 1, 2026",
        },
        {
            id: 12,
            text: "February 5, 2026",
        },
        {
            id: 13,
            text: "February 10, 2026",
        },
        {
            id: 14,
            text: "February 15, 2026",
        },
        {
            id: 15,
            text: "February 20, 2026",
        },
        {
            id: 16,
            text: "February 25, 2026",
        },
        {
            id: 17,
            text: "March 1, 2026",
        },
        {
            id: 18,
            text: "March 5, 2026",
        },
        {
            id: 19,
            text: "March 10, 2026",
        },
        {
            id: 20,
            text: "March 15, 2026",
        },
        {
            id: 21,
            text: "March 20, 2026",
        },
        {
            id: 22,
            text: "March 25, 2026",
        },
        {
            id: 23,
            text: "April 1, 2026",
        },
        {
            id: 24,
            text: "April 5, 2026",
        },
        {
            id: 25,
            text: "April 10, 2026",
        },
        {
            id: 26,
            text: "April 15, 2026",
        },
        {
            id: 27,
            text: "April 20, 2026",
        },
        {
            id: 28,
            text: "April 25, 2026",
        },
        {
            id: 29,
            text: "May 1, 2026",
        },
        {
            id: 30,
            text: "May 5, 2026",
        },
    ];

    return <RenderDaySidebar className={className} dummy={dummy} />;
};

export default DaysSidebarServer;
