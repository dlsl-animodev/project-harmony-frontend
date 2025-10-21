"use client";

import React, { useEffect, useMemo } from "react";
import { Description, SubTitle } from "../texts";
import { BentoContainer } from "../bento-container";
import DaysSidebarItem from "./days-sidebar-item";
import { Calendar } from "lucide-react";
import { useDates } from "@/context/dates-context";
import { ScrollArea } from "../ui/scroll-area";
import { DateType } from "@/lib/types";
import { usePathname } from "next/navigation";
import CustomShortcut from "../custom-shortcut/custom-shortcut";

import { useIsTablet } from "@/hooks/use-tablet";

interface DaysSidebarProps {
    className?: string;
    formattedDates: DateType[];
}

const DaysSidebar: React.FC<DaysSidebarProps> = ({
    className,
    formattedDates,
}) => {
    const isTablet = useIsTablet();

    const { dates, setDates } = useDates();

    useEffect(() => {
        setDates(formattedDates);
    }, [formattedDates, setDates]);

    const pathname = usePathname();

    // Memoitized the dates list to prevent unnecessary re-renders
    // Also check if the pathname equals the date and add an active class
    const datesMemo = useMemo(() => {
        return dates.map((date) => ({
            ...date,
            isActive: pathname === `/day/${date.text}`,
        }));
    }, [dates, pathname]);

    if (isTablet) {
        return null;
    }

    return (
        <BentoContainer
            className={`flex flex-col ${className} 
                text-background 
                bg-gradient-to-br from-[#1c38f8] via-[#eb75fb] to-[#f93ed4]
            `}
        >
            <header className="border-b pb-2 mb-2">
                <section className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Calendar size={20} />
                        <SubTitle> Choose Day </SubTitle>
                    </div>
                    <CustomShortcut />
                </section>
                <Description className="text-background">
                    Select a day to view records.
                </Description>
            </header>

            <main>
                <nav>
                    <ScrollArea
                        className="h-[calc(100vh-16rem)] transition pr-2"
                        type="always"
                    >
                        <ul className="text-sm">
                            {datesMemo.map((date) => (
                                <DaysSidebarItem
                                    key={date.id}
                                    date={date}
                                    className={`
                                        text-white font-medium p-2 rounded-md mr-2 my-1
                                        hover:bg-accent hover:text-muted-foreground hover:cursor-pointer hover:pl-4
                                        transition-all
                                        ${
                                            date.isActive
                                                ? "bg-accent text-primary hover:text-primary pl-4"
                                                : ""
                                        }`}
                                />
                            ))}
                        </ul>
                    </ScrollArea>
                </nav>
            </main>
        </BentoContainer>
    );
};

export default DaysSidebar;
