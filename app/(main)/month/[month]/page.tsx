"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import {
    BentoContainer,
    BentoContainerHeader,
} from "@/components/reusables/bento-container";
import { Title } from "@/components/reusables/texts";
import MonthCalendar from "@/components/days/month-calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MonthPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const year = searchParams.get("year");
    const pathname = usePathname();
    const month = pathname.split("/")[2];

    const [customYear, setCustomYear] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        if (!year || !month) {
            router.replace("/home");
        }
    }, [year, month, router]);

    // Prevent render while redirecting
    if (!year || !month) return null;

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

    const currentMonthIndex = monthNames.indexOf(month.toLowerCase());
    const currentYear = parseInt(year);

    const prevMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
    const prevYear = currentMonthIndex === 0 ? currentYear - 1 : currentYear;

    const nextMonthIndex = currentMonthIndex === 11 ? 0 : currentMonthIndex + 1;
    const nextYear = currentMonthIndex === 11 ? currentYear + 1 : currentYear;

    const handleClick = () => {
        if (!customYear) {
            return;
        }

        setDialogOpen(false);

        router.push(`/month/${month}?year=${customYear}`);
    };

    return (
        <ScrollArea className="flex-1 overflow-auto" type="always">
            <BentoContainer className="border-none space-y-8 bg-background">
                <BentoContainerHeader className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center justify-between">
                                <Title className="capitalize">
                                    {month} {year}
                                </Title>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/month/${monthNames[prevMonthIndex]}?year=${prevYear}`}
                                    >
                                        <Button size="icon">
                                            <ChevronLeft className="size-4" />
                                        </Button>
                                    </Link>
                                    <Link
                                        href={`/month/${monthNames[nextMonthIndex]}?year=${nextYear}`}
                                    >
                                        <Button size="icon">
                                            <ChevronRight className="size-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="font-medium mb-2 text-muted-foreground">
                            Controls
                        </p>
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant={"outline"}>Edit year</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Input Year</DialogTitle>
                                    <DialogDescription>
                                        Jump to any year fast.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="year">
                                        Your Custom Year
                                    </Label>
                                    <Input
                                        name="year"
                                        id="year"
                                        placeholder="e.g. 2026"
                                        value={customYear}
                                        onChange={(e) =>
                                            setCustomYear(e.target.value)
                                        }
                                    />{" "}
                                    <Button onClick={handleClick}>
                                        {" "}
                                        Set year{" "}
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <p className="font-medium mb-2 text-muted-foreground pt-2">
                        Months
                    </p>
                    <div className="flex flex-wrap gap-2 pb-2 ">
                        {monthNames.map((m) => (
                            <Link key={m} href={`/month/${m}?year=${year}`}>
                                <Button
                                    variant={
                                        month.toLowerCase() === m
                                            ? "default"
                                            : "secondary"
                                    }
                                    size="sm"
                                    className="capitalize text-[10px] sm:text-xs h-8"
                                >
                                    {m.slice(0, 3)}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </BentoContainerHeader>

                <main>
                    <MonthCalendar monthName={month} year={currentYear} />
                </main>
            </BentoContainer>
        </ScrollArea>
    );
};

export default MonthPage;
