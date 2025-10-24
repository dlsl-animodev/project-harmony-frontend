"use client";

import {
    BentoContainer,
    BentoContainerHeader,
} from "@/components/reusables/bento-container";
import { Description, Title } from "@/components/reusables/texts";
import { useDates } from "@/context/dates-context";
import {
    DayCards,
    DayCardItem,
    DayCardsContainer,
} from "@/components/days/day-cards";
import { groupDatesByMonth } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import AlertMessage from "@/components/reusables/alert-message";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = () => {
    const { dates } = useDates();
    const groupedDates = groupDatesByMonth(dates);

    return (
        <ScrollArea className="flex-1 overflow-auto" type="always">
            <BentoContainer className="border-none space-y-8 bg-background ">
                <BentoContainerHeader>
                    <Title> Dashboard </Title>
                    <Description>
                        Welcome to the Project Harmony Dashboard! Select a day
                        to view detailed records.
                    </Description>
                </BentoContainerHeader>

                <AlertMessage title="If a date does not appear below, refresh the page or it means that there is no report for that day" />

                {Object.entries(groupedDates).length === 0 ? (
                    <div className="flex-1 space-y-4">
                        {Array.from({ length: 2 }).map((_, monthIndex) => (
                            <div key={monthIndex} className="space-y-2">
                                <Skeleton className="h-6 w-32 rounded-md" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {Array.from({
                                        length: 4,
                                    }).map((_, dayIndex) => (
                                        <Skeleton
                                            key={dayIndex}
                                            className="h-32 w-full rounded-md"
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    Object.entries(groupedDates).map(([monthYear, days]) => (
                        <DayCardsContainer key={monthYear} title={monthYear}>
                            <DayCards>
                                {days.map((item) => (
                                    <DayCardItem item={item} key={item.id} />
                                ))}
                            </DayCards>
                        </DayCardsContainer>
                    ))
                )}
            </BentoContainer>
        </ScrollArea>
    );
};

export default HomePage;
