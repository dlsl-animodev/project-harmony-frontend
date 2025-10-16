"use client";

import {
    BentoContainer,
    BentoContainerHeader,
} from "@/components/bento-container";
import { Description, Title } from "@/components/texts";
import { useDates } from "@/context/dates-context";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    DayCards,
    DayCardItem,
    DayCardsContainer,
} from "@/components/days/day-cards";
import { groupDatesByMonth } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const HomePage = () => {
    const { dates } = useDates();
    const groupedDates = groupDatesByMonth(dates);

    return (
        <ScrollArea
            className="h-[calc(100vh-9rem)] overflow-auto pr-6"
            type="always"
        >
            <BentoContainer className="border-none space-y-8 bg-background ">
                <BentoContainerHeader>
                    <Title> Dashboard </Title>
                    <Description>
                        Welcome to the Project Harmony Dashboard! Select a day
                        to view detailed records.
                    </Description>
                </BentoContainerHeader>

                <Alert className="bg-gradient-to-tl from-[#f9f5ff] via-[#f0e7ff] to-[#e2d9ff] shadow-md text-primary">
                    <Terminal />
                    <AlertTitle>
                        If a date does not appear below, refresh the page or it
                        means that there is no report for that day
                    </AlertTitle>
                    <AlertDescription>
                        If you think it is an error, please contact the
                        developers.
                    </AlertDescription>
                </Alert>

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
