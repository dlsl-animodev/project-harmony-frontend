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
} from "@/components/days/day-cards";
import { ScrollArea } from "@/components/ui/scroll-area";
import AlertMessage from "@/components/reusables/alert-message";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = () => {
    const { dates } = useDates();

    // Filter dates to only show current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const currentMonthDates = dates?.filter((item) => {
        const date = new Date(item.text);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }) ?? [];

    const isLoading = dates === null;
    const isEmpty = dates && currentMonthDates.length === 0;

    const currentMonthName = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    return (
        <ScrollArea className="flex-1 overflow-auto" type="always">
            <BentoContainer className="border-none space-y-8 bg-background ">
                <BentoContainerHeader>
                    <Title> Recent </Title>
                    <Description>
                        Showing records for {currentMonthName}. Select a day to view detailed records.
                    </Description>
                </BentoContainerHeader>

                {isLoading && (
                    <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Array.from({ length: 4 }).map((_, dayIndex) => (
                                <Skeleton
                                    key={dayIndex}
                                    className="h-32 w-full rounded-md"
                                />
                            ))}
                        </div>
                    </div>
                )}

                {isEmpty && (
                    <AlertMessage title={`No reports available for ${currentMonthName}.`} />
                )}

                {!isLoading && !isEmpty && (
                    <DayCards>
                        {currentMonthDates.map((item) => (
                            <DayCardItem item={item} key={item.id} />
                        ))}
                    </DayCards>
                )}
            </BentoContainer>
        </ScrollArea>
    );
};

export default HomePage;
