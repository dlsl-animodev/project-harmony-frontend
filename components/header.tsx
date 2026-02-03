"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
    CalendarCog,
    Home,
    Menu,
    User,
    Calendar1,
    ChevronDown,
} from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useIsTablet } from "@/hooks/use-tablet";
import { useState } from "react";
import { useMemo } from "react";
import DatePicker from "./ui/date-picker";
import { useRouter } from "next/navigation";
import { formatDateAsYYYYMMDD } from "@/lib/utils";
import { useSidebarOpen } from "@/context/sidebar-open-context";
import CustomShortcut from "./custom-shortcut/custom-shortcut";
import ChooseDayPicker from "./days/choose-day-picker";
import { ScrollArea } from "./ui/scroll-area";

const Header = () => {
    const isTablet = useIsTablet();

    const renderHeader = () => {
        if (isTablet) return <MobileHeaderContent />;
        return <DesktopHeaderContent />;
    };

    return (
        <header
            className="
                shrink-0 sticky top-0 overflow-hidden
                h-14 z-50
                flex items-center justify-between 
                px-[1rem] lg:px-[2rem] rounded-b-lg
                text-primary bg-[#c9d1ff]
            "
        >
            {renderHeader()}
        </header>
    );
};

export default Header;

const DesktopHeaderContent = () => {
    return (
        <>
            <section className="relative z-20 flex items-center gap-16">
                <Link href="/" className="font-bold text-lg">
                    Project Harmony
                </Link>
                <nav>
                    <ul className="font-medium text-sm flex items-center gap-4">
                        <li className="hover:opacity-70">
                            <Link href="/home">
                                <Button className="bg-[#c9d1ff] text-primary hover:bg-[#c9d1ff] active:bg-[#c9d1ff]">
                                    Home
                                </Button>
                            </Link>
                        </li>
                        <li className="hover:opacity-70">
                            <ChooseDayPicker className="bg-[#c9d1ff] text-primary hover:bg-[#c9d1ff] active:bg-[#c9d1ff]" />
                        </li>
                    </ul>
                </nav>
            </section>

            <section className="flex items-center gap-2 z-20 ">
                <Link href="/account">
                    <Button>
                        {" "}
                        <User /> Account{" "}
                    </Button>
                </Link>
            </section>
        </>
    );
};

const ICON_SIZE = 19 as const;

const MobileHeaderContent = () => {
    const { sidebarOpen, setSidebarOpen } = useSidebarOpen();
    const [collapsibleOpen, setCollapsibleOpen] = useState(false);

    const [date, setDate] = useState<Date | undefined>(undefined);

    const navs = useMemo(
        () => [
            { href: "/home", label: "Home", icon: <Home size={ICON_SIZE} /> },
            {
                href: "/account",
                label: "Account",
                icon: <User size={ICON_SIZE} />,
            },
        ],
        [],
    );

    const router = useRouter();
    const handleDateSelect = (d: Date) => {
        if (!d) return;

        setSidebarOpen(false);

        const formattedDate = formatDateAsYYYYMMDD(d);
        router.push(`/day/${formattedDate}`);
    };

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
        <>
            <section className="relative z-20 flex items-center gap-14">
                <Link href="/" className="font-bold text-lg">
                    Project Harmony
                </Link>
            </section>

            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                    <Button className="z-20">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent className="rounded-l-2xl ">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                        <SheetDescription>
                            Quickly navigate to different sections.
                        </SheetDescription>
                    </SheetHeader>
                    <section className="border-t border-t-muted-foreground/20 pt-3 space-y-2 ">
                        <DatePicker
                            state={date}
                            setState={setDate}
                            onDateSelect={handleDateSelect}
                        >
                            <CustomShortcut
                                variant={"link"}
                                className="flex text-blue-500 underline font-semibold hover:cursor-pointer items-center justify-center gap-2 px-2.5 py-2 w-full border text-sm"
                            >
                                <CalendarCog size={20} /> Custom date
                            </CustomShortcut>
                        </DatePicker>

                        <Collapsible 
                            open={collapsibleOpen}
                            onOpenChange={setCollapsibleOpen}
                        >
                            <CollapsibleTrigger
                                className="
                                        flex items-center justify-between gap-2 text-muted-foreground px-2.5 py-2 rounded-md
                                        hover:bg-accent hover:text-muted-foreground hover:cursor-pointer hover:pl-4
                                        transition-all font-medium text-sm w-full 
                                    "
                            >
                                <div className="flex items-center gap-2">
                                    <Calendar1 size={17} /> Pick month ({new Date().getFullYear()})
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
                                                    href={
                                                        `/month/${month}?year=${new Date().getFullYear()}`
                                                    }
                                                    className="
                                                        flex items-center gap-2 text-muted-foreground px-2.5 ml-2 py-2 rounded-md
                                                        hover:bg-accent hover:text-muted-foreground hover:cursor-pointer hover:pl-4
                                                        transition-all text-sm font-medium mb-2
                                                    "
                                                    onClick={() => {
                                                        setSidebarOpen(false);
                                                    }}
                                                >
                                                    {month
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        month.slice(1)}
                                                        
                                                </Link>
                                            </li>
                                        ))}
                                    </ScrollArea>
                                </ul>
                            </CollapsibleContent>
                        </Collapsible>

                        <nav>
                            <ul className="flex flex-col gap-2 font-medium text-sm">
                                {navs.map((nav) => (
                                    <li key={nav.href}>
                                        <Link
                                            href={nav.href}
                                            className="
                                                flex items-center gap-2 text-muted-foreground px-2.5 py-2 rounded-md
                                                hover:bg-accent hover:text-muted-foreground hover:cursor-pointer hover:pl-4
                                                transition-all
                                            "
                                            onNavigate={() => {
                                                setSidebarOpen(false);
                                            }}
                                        >
                                            {nav.icon} {nav.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </section>
                </SheetContent>
            </Sheet>
        </>
    );
};
