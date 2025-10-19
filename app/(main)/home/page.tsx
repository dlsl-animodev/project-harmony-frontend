"use client";

import {
    BentoContainer,
    BentoContainerHeader,
} from "@/components/bento-container";
import { Description, Title } from "@/components/texts";
import { useDates } from "@/context/dates-context";
import {
    DayCards,
    DayCardItem,
    DayCardsContainer,
} from "@/components/days/day-cards";
import { groupDatesByMonth } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import AlertMessage from "@/components/alert-message";

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

                <AlertMessage title="If a date does not appear below, refresh the page or it meansthat there is no report for that day" />

                {Object.entries(groupedDates).map(([monthYear, days]) => (
                    <DayCardsContainer key={monthYear} title={monthYear}>
                        <DayCards>
                            {days.map((item) => (
                                <DayCardItem item={item} key={item.id} />
                            ))}
                        </DayCards>
                    </DayCardsContainer>
                ))}
            </BentoContainer>
        </ScrollArea>
    );
};

export default HomePage;
