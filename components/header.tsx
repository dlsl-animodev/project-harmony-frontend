"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { CalendarCog, Home, Menu, User } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { useIsTablet } from "@/hooks/use-tablet";
import { useState } from "react";
import { useMemo } from "react";
import DatePicker from "./ui/date-picker";
import { useRouter } from "next/navigation";
import { formatDateAsYYYYMMDD } from "@/lib/utils";
import { useSidebarOpen } from "@/context/sidebar-open-context";
import CustomShortcut from "./custom-shortcut/custom-shortcut";

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
                h-12 shadow-md border-b z-50
                flex items-center justify-between 
                px-[1rem] lg:px-[2rem] rounded-lg
                text-primary
                bg-gradient-to-b from-[#c9d1ff] via-[#e1b8ff] to-[#fcb5f8]
            "
        >
            {/* Light overlay for soft depth */}
            <div className="absolute inset-0 bg-gradient-to-tl from-white/40 to-transparent rounded-b-lg pointer-events-none z-0"></div>

            {/* Animated light beam (between bg and text) */}
            <div className="absolute inset-0 overflow-hidden rounded-b-lg pointer-events-none z-10">
                <div className="animate-shine absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent w-[200%]"></div>
            </div>

            {renderHeader()}
        </header>
    );
};

export default Header;

const DesktopHeaderContent = () => {
    return (
        <>
            <section className="relative z-20 flex items-center gap-14">
                <Link href="/" className="font-bold text-lg">
                    Project Harmony
                </Link>
                <nav>
                    <ul className="font-medium text-sm flex items-center gap-6">
                        <li>
                            <Link href="/home">Home</Link>
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
        []
    );

    const router = useRouter();
    const handleDateSelect = (d: Date) => {
        if (!d) return;

        setSidebarOpen(false);

        const formattedDate = formatDateAsYYYYMMDD(d);
        router.push(`/day/${formattedDate}`);
    };

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
                    <section className="border-t border-t-muted-foreground/20 pt-3 space-y-2">
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
