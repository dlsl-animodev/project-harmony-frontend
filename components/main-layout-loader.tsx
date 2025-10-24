"use client";

import { Description, SubTitle, Title } from "@/components/reusables/texts";
import { Calendar } from "lucide-react";
import {
    BentoContainer,
    BentoContainerHeader,
} from "@/components/reusables/bento-container";
import { Skeleton } from "@/components/ui/skeleton";
import AlertMessage from "@/components/reusables/alert-message";

import { useIsTablet } from "@/hooks/use-tablet";

const MainLayoutLoader = () => {
    const isTablet = useIsTablet();

    return (
        <>
            {/* THE ASSUMED SIDEBAR  */}
            {!isTablet && (
                <BentoContainer
                    className={`flex flex-col lg:basis-[20%] shrink-0 
                text-background 
                bg-gradient-to-br from-[#1c38f8] via-[#eb75fb] to-[#f93ed4]
            `}
                >
                    <div className="border-b pb-2 mb-2">
                        <section className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar size={20} />
                                <SubTitle> Choose Day </SubTitle>
                            </div>
                            <Skeleton className="h-8 w-16 rounded-md" />
                        </section>
                        <Description className="text-background">
                            Select a day to view records.
                        </Description>
                    </div>
                    <div className="flex-1 space-y-2 overflow-hidden">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-10 w-full rounded-md"
                            />
                        ))}
                    </div>
                </BentoContainer>
            )}

            {/* THE ASSUME MAIN CONTENT */}
            <BentoContainer className="flex-1 flex flex-col border-none space-y-8 bg-background">
                <BentoContainerHeader>
                    <Title> Dashboard </Title>
                    <Description>
                        Welcome to the Project Harmony Dashboard! Select a day
                        to view detailed records.
                    </Description>
                </BentoContainerHeader>

                <AlertMessage title="If a date does not appear below, refresh the page or it means that there is no report for that day" />

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
            </BentoContainer>
        </>
    );
};

export default MainLayoutLoader;
