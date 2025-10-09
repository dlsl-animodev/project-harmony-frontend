"use client";

import { useLoading } from "@/context/loading-context";
import { ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export interface SidebarItem {
    id: number;
    text: string;
}

interface DaysSidebarItemProps {
    day: SidebarItem;
    className?: string;
}
const DaysSidebarItem: React.FC<DaysSidebarItemProps> = ({
    day,
    className,
}) => {
    const { setIsLoading } = useLoading();

    const pathname = usePathname();
    const lastSlashIndex = pathname.lastIndexOf("/");
    const result = pathname.substring(lastSlashIndex + 1);
    const router = useRouter();
    const handleDayClick = async () => {
        if (result === String(day.id)) {
            toast.error("You are already viewing this day.");
            return;
        }

        setIsLoading(true);
        router.push(`/day/${day.id}`);
    };

    return (
        <li
            className={twMerge(
                "flex items-center gap-2",
                className,
                result === String(day.id) &&
                    "text-primary font-bold bg-muted pl-4"
            )}
            onClick={handleDayClick}
        >
            {day.text}
            <ChevronRight className="ml-auto" size={20} />
        </li>
    );
};

export default DaysSidebarItem;
