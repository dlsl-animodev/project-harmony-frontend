"use client";

import { Description, SubTitle} from "@/components/reusables/texts";
import { Calendar } from "lucide-react";
import {
    BentoContainer,
} from "@/components/reusables/bento-container";
import { Skeleton } from "@/components/ui/skeleton";

import { useIsTablet } from "@/hooks/use-tablet";

const DaysSidebarLoader = () => {
    const isTablet = useIsTablet();

    return (
        !isTablet && (
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
        )
    );
};

export default DaysSidebarLoader;
