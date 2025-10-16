"use client";

import React, { useEffect } from "react";
import { Description, SubTitle } from "../texts";
import {BentoContainer} from "../bento-container";
import DaysSidebarItem from "./days-sidebar-item";
import { Calendar } from "lucide-react";
import { useDates } from "@/context/dates-context";
import { ScrollArea } from "../ui/scroll-area";
import { DateType } from "@/lib/types";

interface DaysSidebarProps {
    className?: string;
    formattedDates: DateType[];
}

const DaysSidebar: React.FC<DaysSidebarProps> = ({
    className,
    formattedDates,
}) => {
    const { dates, setDates } = useDates();

    useEffect(() => {
        setDates(formattedDates);
    }, [formattedDates, setDates]);

    return (
        <BentoContainer
            className={`flex flex-col ${className} 
                text-background 
                bg-gradient-to-br from-[#1c38f8] via-[#eb75fb] to-[#f93ed4]
            `}
        >
            <header className="border-b pb-2 mb-2">
                <div className="flex items-center gap-2">
                    <Calendar size={20} />
                    <SubTitle> Choose Day </SubTitle>
                </div>
                <Description className="text-background">
                    Select a day to view records.
                </Description>
            </header>

            <main>
                <nav>
                    <ScrollArea className="h-[calc(100vh-16rem)] transition pr-2" type="always">
                        <ul className="text-sm">
                            {dates.map((date) => (
                                <DaysSidebarItem
                                    key={date.id}
                                    date={date}
                                    className="
                                        text-white font-medium p-2 rounded-md mr-2 my-1
                                        hover:bg-accent hover:text-muted-foreground hover:cursor-pointer hover:pl-4
                                        transition-all
                                    "
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
