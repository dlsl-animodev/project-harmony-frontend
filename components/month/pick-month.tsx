"use client";

import { Calendar1, ChevronDown } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

import { useState } from "react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSidebarOpen } from "@/context/sidebar-open-context";

import Link from "next/link";

const PickMonth = () => {
    const [collapsibleOpen, setCollapsibleOpen] = useState(false);

    const { setSidebarOpen } = useSidebarOpen();

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

    return (
        <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
            <CollapsibleTrigger
                className="
                    flex items-center justify-between gap-2 text-muted-foreground px-2.5 py-2 rounded-md
                    hover:bg-accent hover:text-muted-foreground hover:cursor-pointer hover:pl-4
                    transition-all font-medium text-sm w-full 
                "
            >
                <div className="flex items-center gap-2">
                    <Calendar1 size={17} /> Pick month (
                    {new Date().getFullYear()})
                </div>
                <ChevronDown
                    size={16}
                    className={`
                        transition-transform 
                        ${collapsibleOpen ? "rotate-180" : "rotate-0"}
                    `}
                />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <ul>
                    <ScrollArea
                        className="flex flex-col mt-2 mb-4 pl-4 h-[15rem]"
                        type="always"
                    >
                        {monthNames.map((month, index) => (
                            <li key={index}>
                                <Link
                                    // month/february?year=2026
                                    href={`/month/${month}?year=${new Date().getFullYear()}`}
                                    className="
                                            flex items-center gap-2 text-muted-foreground px-2.5 ml-2 py-2 rounded-md
                                            hover:bg-accent hover:text-muted-foreground hover:cursor-pointer hover:pl-4
                                            transition-all text-sm font-medium mb-2
                                        "
                                    onClick={() => {
                                        setSidebarOpen(false);
                                    }}
                                >
                                    {month.charAt(0).toUpperCase() +
                                        month.slice(1)}
                                </Link>
                            </li>
                        ))}
                    </ScrollArea>
                </ul>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default PickMonth;
