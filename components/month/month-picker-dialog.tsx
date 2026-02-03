"use client";

import Link from "next/link";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const MonthPickerDialog = () => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Select Month</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select Month (2026)</DialogTitle>
                </DialogHeader>
                {/* MAIN  */}
                {/* CREATE A GRID OF THE MONTHS ABOVE  */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {months.map((month) => (
                        <Link
                                key={month}
                                href={`/month/${month.toLowerCase()}?year=${new Date().getFullYear()}`}
                        >
                            <Button
                                variant="outline"
                                className="w-full"
                            >
                                {month}
                            </Button>
                        </Link>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MonthPickerDialog;
