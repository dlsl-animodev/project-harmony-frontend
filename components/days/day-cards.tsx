import { BentoContainer } from "../reusables/bento-container";
import { SubTitle, Description, SubHeading } from "../reusables/texts";
import { Sheet } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { formatDateForRender } from "@/lib/utils";
import React from "react";
import { DateType } from "@/lib/types";

interface DayCardsContainerProps {
    children: React.ReactNode;
    title: string;
}

const DayCardsContainer: React.FC<DayCardsContainerProps> = ({
    children,
    title,
}) => {
    return (
        <div className="space-y-4">
            <SubHeading className="text-primary text-[20px]">{title}</SubHeading>

            {children}
        </div>
    );
};

interface DayCardsProps {
    children: React.ReactNode;
}

const DayCards: React.FC<DayCardsProps> = ({ children }) => {
    return (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {children}
        </ul>
    );
};

interface DayCardItemProps {
    item: DateType;
}
const DayCardItem: React.FC<DayCardItemProps> = ({ item }) => {
    return (
        <li>
            <BentoContainer className="space-y-6 sm:space-y-12 px-4 bg-gradient-to-tl from-[#f9f5ff] via-[#f0e7ff] to-[#e2d9ff] shadow-sm h-full flex flex-col justify-between">
                <header>
                    <SubTitle className="text-base md:text-[18px]">{formatDateForRender(item.text)}</SubTitle>
                    <Description>
                        {item.text === new Date().toLocaleDateString("en-CA") &&
                            "Today"}
                        {item.text ===
                            (() => {
                                const tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() - 1);
                                return tomorrow.toLocaleDateString("en-CA");
                            })() && "Yesterday"}
                    </Description>
                </header>

                <Link href={`/day/${item.text}`} className="w-full">
                    <Button variant={'secondary'} className="text-xs w-full whitespace-normal">
                         <Sheet /> View Attendance
                    </Button>
                </Link>
            </BentoContainer>
        </li>
    );
};

export { DayCardsContainer, DayCards, DayCardItem };
