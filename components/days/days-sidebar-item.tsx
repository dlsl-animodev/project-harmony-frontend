"use client";

import { useLoading } from "@/context/loading-context";
import { DateType } from "@/lib/types";
import { formatDateForRender } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

interface DaysSidebarItemProps {
    date: DateType;
    className?: string;
}
const DaysSidebarItem: React.FC<DaysSidebarItemProps> = ({
    date,
    className,
}) => {
    const { setIsLoading } = useLoading();

    const pathname = usePathname();
    const lastSlashIndex = pathname.lastIndexOf("/");
    const result = pathname.substring(lastSlashIndex + 1);
    const router = useRouter();
    const handleDayClick = async () => {
        if (result === String(date.id)) {
            toast.error("You are already viewing this day.");
            return;
        }

        setIsLoading(true);
        router.push(`/day/${date.text}`);
    };

    return (
        <li
            className={twMerge(
                "flex items-center gap-2",
                className,
                result === String(date.id) &&
                    "text-primary font-bold bg-muted pl-4"
            )}
            onClick={handleDayClick}
        >
            {formatDateForRender(date.text)}
            <ChevronRight className="ml-auto" size={20} />
        </li>
    );
};

export default DaysSidebarItem;
