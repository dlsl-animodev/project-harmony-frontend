"use client";

import React, { useEffect } from "react";
import { Description, SubTitle } from "../reusables/texts";
import { BentoContainer } from "../reusables/bento-container";
import { Calendar, ChevronRight } from "lucide-react";
import { useDates } from "@/context/dates-context";
import { ScrollArea } from "../ui/scroll-area";
import { DateType } from "@/lib/types";
import CustomShortcut from "../custom-shortcut/custom-shortcut";

import { useIsTablet } from "@/hooks/use-tablet";
import { getAllMonthsInYear } from "@/lib/utils";
import Link from "next/link";

interface DaysSidebarProps {
    className?: string;
    formattedDates: DateType[];
}

const DaysSidebar: React.FC<DaysSidebarProps> = ({
    className,
    formattedDates,
}) => {
    const months = getAllMonthsInYear();
    const todaysYear = new Date().getFullYear();

    const isTablet = useIsTablet();

    const { setDates } = useDates();

    useEffect(() => {
        setDates(formattedDates);
    }, [formattedDates, setDates]);

    // Memoitized the dates list to prevent unnecessary re-renders
    // Also check if the pathname equals the date and add an active class

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
            <header className="border-b pb-4 mb-2">
                <section className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Calendar size={20} />
                        <SubTitle> Choose Month </SubTitle>
                    </div>
                    <CustomShortcut />
                </section>
                <Description className="text-background">
                    Today&apos;s year is {new Date().getFullYear()}
                </Description>
            </header>

            <main>
                <nav>
                    <ScrollArea
                        className="h-[calc(100vh-14rem)] transition pr-2"
                        type="always"
                    >
                        <ul className="text-sm">
                            {months.map((month) => (
                                <Link key={month.id} href={`/month/${month.text.toLowerCase()}?year=${todaysYear}`}>
                                <li  className="
                                    flex items-center justify-between
                                    text-white font-medium p-2 rounded-md mr-2 my-1
                                    hover:bg-accent hover:text-muted-foreground hover:cursor-pointer hover:pl-4
                                    transition-all                                
                                ">
                                    <span className="text-base font-medium">{month.text}</span>
                                    <ChevronRight />
                                </li>
                                    </Link>
                            ))}
                        </ul>

                        {/* <ul className="text-sm">
                            {datesMemo.length === 0 ? (
                                <Description className="p-2">
                                    No available dates yet.
                                </Description>
                            ) : (
                                datesMemo.map((date) => (
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
                                ))
                            )}
                        </ul> */}
                    </ScrollArea>
                </nav>
            </main>
        </BentoContainer>
    );
};

export default DaysSidebar;
