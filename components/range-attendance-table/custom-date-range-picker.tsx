"use client";

import { useState } from "react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

import { useRouter } from "next/navigation";

import { formatDateAsYYYYMMDD } from "@/lib/utils";

const CustomDateRangerPicker = () => {
    const router = useRouter();

    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    const handleSetCustomDateRange = () => {
        const formattedStartDate = formatDateAsYYYYMMDD(startDate);
        const formattedEndDate = formatDateAsYYYYMMDD(endDate);

        router.push(
            `/day/range?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Custom</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Custom Date Range</DialogTitle>
                    <DialogDescription>
                        Select the starting and end dates for your custom date
                        range.
                    </DialogDescription>
                </DialogHeader>
                <section className="space-y-4 grid grid-cols-2 gap-4">
                    <div>
                        <Label>Start Date:</Label>
                        <DatePicker state={startDate} setState={setStartDate} />
                    </div>

                    <div>
                        <Label> End Date: </Label>
                        <DatePicker state={endDate} setState={setEndDate} />
                    </div>
                </section>
                <DialogClose asChild>
                    <Button onClick={handleSetCustomDateRange}>
                        Set custom date range view
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default CustomDateRangerPicker;

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "../ui/label";

interface DatePickerProps {
    state: Date | undefined;
    setState: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const DatePicker: React.FC<DatePickerProps> = ({ state, setState }) => {
    const [open, setOpen] = useState(false);
    const handleOnSelect = (date: Date | undefined) => {
        setState(date);
        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!state}
                    className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal mt-2"
                >
                    <CalendarIcon />
                    {state ? format(state, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={state} onSelect={handleOnSelect} />
            </PopoverContent>
        </Popover>
    );
};
