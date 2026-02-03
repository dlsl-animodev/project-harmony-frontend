"use client";

import React, { useState } from "react";
import { BentoContainer } from "../reusables/bento-container";
import { cn } from "@/lib/utils";
import { useDates } from "@/context/dates-context";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet } from "lucide-react";
import { Description } from "../reusables/texts";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

interface MonthCalendarProps {
    monthName: string;
    year: number;
}

const MonthCalendar: React.FC<MonthCalendarProps> = ({ monthName, year }) => {
    const router = useRouter();
    const { dates } = useDates();

    const [isHovering, setIsHovering] = useState({
        hovering: false,
        id: "",
    });

    const monthNames = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
    ];

    const monthIndex = monthNames.indexOf(monthName.toLowerCase());

    if (monthIndex === -1)
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center">
                <Description>Invalid month selected.</Description>
            </div>
        );

    const firstDayOfMonth = new Date(year, monthIndex, 1);
    const lastDayOfMonth = new Date(year, monthIndex + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay(); // 0 (Sun) to 6 (Sat)

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: startingDay }, (_, i) => i);

    const isLoading = dates === null;

    const isToday = (day: number) => {
        const today = new Date();
        return (
            today.getDate() === day &&
            today.getMonth() === monthIndex &&
            today.getFullYear() === year
        );
    };

    const getAvailableDateId = (day: number) => {
        if (!dates) return null;
        const targetDate = new Date(year, monthIndex, day);
        const targetDateStr = targetDate.toLocaleDateString("en-CA");
        return dates.find((d) => d.text === targetDateStr)?.text;
    };

    const handleNavigation = (day: number) => {
        // 2025-10-21

        // 1. get the number of the monthName
        const monthNumber = monthIndex + 1; // because monthIndex is 0-based
        // 2. construct the date string for the first day of the month
        const dateString = `${year}-${monthNumber.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        // 3. navigate to that day
        router.push(`/day/${dateString}`);
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-7 gap-2 sm:gap-4">
                {Array.from({ length: 31 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-16 sm:h-24 md:h-32 w-full bg-muted/20 animate-pulse rounded-md"
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-7 gap-2 text-center font-bold text-muted-foreground uppercase text-[10px] sm:text-xs">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div key={d} className="py-2">
                        {d}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 ">
                {emptyDays.map((i) => (
                    <div key={`empty-${i}`} className="h-16 sm:h-24 md:h-32" />
                ))}
                {days.map((day) => {
                    const dateText = getAvailableDateId(day);
                    const available = !!dateText;
                    const today = isToday(day);

                    return (
                        <BentoContainer
                            key={day}
                            className={cn(
                                "border border-neutral-300 rounded-none flex flex-col items-center justify-between p-1 sm:p-2 h-16 sm:h-24 md:h-32 transition-all relative overflow-hidden group",
                                available
                                    ? "bg-gradient-to-tl from-[#f9f5ff] via-[#f0e7ff] to-[#e2d9ff] border-primary/20 hover:shadow-md"
                                    : "bg-muted/10 opacity-40",
                                today &&
                                    "ring-2 ring-primary border-primary/50",
                                isHovering.hovering &&
                                    isHovering.id === day.toString() &&
                                    !available &&
                                    "bg-accent transition-colors",
                            )}
                            onMouseEnter={() =>
                                setIsHovering({
                                    hovering: true,
                                    id: day.toString(),
                                })
                            }
                            onMouseLeave={() =>
                                setIsHovering({
                                    hovering: false,
                                    id: day.toString(),
                                })
                            }
                            onClick={() => handleNavigation(day)}
                        >
                            {isHovering.hovering &&
                                isHovering.id === day.toString() &&
                                !available && (
                                    <div className="absolute h-full w-full hover:cursor-pointer flex items-center text-center font-medium">
                                        No record for this specific day.
                                    </div>
                                )}

                            <div className="flex justify-between w-full items-start">
                                <span
                                    className={cn(
                                        "text-sm sm:text-lg font-bold",
                                        available
                                            ? "text-primary"
                                            : "text-muted-foreground",
                                        today &&
                                            "text-primary font-black underline underline-offset-4",
                                    )}
                                >
                                    {day}{" "}
                                    {available && (
                                        <Badge
                                            variant={"outline"}
                                            className="text-xs font-medium border-neutral-300 text-muted-foreground"
                                        >
                                            Record Exist
                                        </Badge>
                                    )}
                                </span>
                                {today && (
                                    <span className="text-[8px] sm:text-[10px] bg-primary text-primary-foreground px-1 rounded-sm uppercase font-bold">
                                        Today
                                    </span>
                                )}
                            </div>

                            {available && (
                                <Link
                                    href={`/day/${dateText}`}
                                    className="w-full mt-auto"
                                >
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="w-full h-6 sm:h-8 px-1 shadow-sm"
                                    >
                                        <Sheet className="size-2 sm:size-3 mr-1" />{" "}
                                        <span className="text-xs">View Record</span>
                                    </Button>
                                </Link>
                            )}
                        </BentoContainer>
                    );
                })}
            </div>
        </div>
    );
};

export default MonthCalendar;
