"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { BentoContainer, BentoContainerHeader } from "@/components/reusables/bento-container";
import { Title, Description } from "@/components/reusables/texts";
import MonthCalendar from "@/components/days/month-calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const MonthPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const year = searchParams.get("year");
    const pathname = usePathname();
    const month = pathname.split("/")[2];

    if (!year || !month) {
        if (typeof window !== "undefined") {
            router.push("/home");
        }
        return null;
    }

    const monthNames = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];

    const currentMonthIndex = monthNames.indexOf(month.toLowerCase());
    const currentYear = parseInt(year);

    const prevMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
    const prevYear = currentMonthIndex === 0 ? currentYear - 1 : currentYear;
    
    const nextMonthIndex = currentMonthIndex === 11 ? 0 : currentMonthIndex + 1;
    const nextYear = currentMonthIndex === 11 ? currentYear + 1 : currentYear;

    return (
        <ScrollArea className="flex-1 overflow-auto" type="always">
            <BentoContainer className="border-none space-y-8 bg-background">
                <BentoContainerHeader className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <Title className="capitalize">
                                {month} {year}
                            </Title>
                            <Description>
                                Viewing all records for the month of {month}.
                            </Description>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link href={`/month/${monthNames[prevMonthIndex]}?year=${prevYear}`}>
                                <Button variant="outline" size="icon">
                                    <ChevronLeft className="size-4" />
                                </Button>
                            </Link>
                            <Link href={`/month/${monthNames[nextMonthIndex]}?year=${nextYear}`}>
                                <Button variant="outline" size="icon">
                                    <ChevronRight className="size-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pb-2">
                        {monthNames.map((m) => (
                            <Link key={m} href={`/month/${m}?year=${year}`}>
                                <Button 
                                    variant={month.toLowerCase() === m ? "default" : "secondary"} 
                                    size="sm"
                                    className="capitalize text-[10px] sm:text-xs h-8"
                                >
                                    {m.slice(0, 3)}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </BentoContainerHeader>

                <main>
                    <MonthCalendar monthName={month} year={currentYear} />
                </main>
            </BentoContainer>
        </ScrollArea>
    );
};

export default MonthPage;
