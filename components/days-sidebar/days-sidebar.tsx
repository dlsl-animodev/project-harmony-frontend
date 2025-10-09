"use client";

import React, {  useMemo} from "react";
import { Description, SubTitle } from "../texts";
import BentoContainer from "../bento-container";
import DaysSidebarItem from "./days-sidebar-item";
import { Calendar } from "lucide-react";

interface RenderDaySidebarProps {
    className?: string;
    dummy: {
        id: number;
        text: string;
    }[];
}

const RenderDaySidebar: React.FC<RenderDaySidebarProps> = ({
    className,
    dummy,
}) => {
    // IMITATE AN AWAIT WITH TIMEOUT FOR 5 SECONDS

    // DUMMY DATA TO RENDER THE DAYS
    const days = useMemo(() => dummy, [dummy]);

    return (
        <BentoContainer
            className={`flex flex-col ${className} 
                text-background 
                bg-gradient-to-br from-[#1c38f8] via-[#eb75fb] to-[#f93ed4]
            `}
        >
            <header className="border-b pb-2 mb-2">
                <div className="flex items-center gap-2">
                    <Calendar size={20} />
                    <SubTitle> Choose Day </SubTitle>
                </div>
                <Description className="text-background">
                    Select a day to view records.
                </Description>
            </header>

            <main>
                <nav>
                    <ul className="text-sm overflow-y-auto h-[calc(100vh-17rem)] transition custom-scrollbar">
                        {days.map((day) => (
                            <DaysSidebarItem
                                key={day.id}
                                day={day}
                                className="
                                        text-white font-medium p-2 rounded-md mr-2 my-1
                                        hover:bg-accent hover:text-muted-foreground hover:cursor-pointer hover:pl-4
                                        transition-all
                                    "
                            />
                        ))}
                    </ul>
                </nav>
            </main>
        </BentoContainer>
    );
};

export default RenderDaySidebar;
