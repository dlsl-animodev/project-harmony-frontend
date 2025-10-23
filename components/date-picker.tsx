"use client";

import { Button } from "./ui/button";
import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { formatDateForRender } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

// extends to the button props
interface DatePickerProps  {
    state: Date | undefined;
    setState: React.Dispatch<React.SetStateAction<Date | undefined>>;
    className? : string;
    onDateSelect? : (date: Date) => void;
    children? : React.ReactNode;
}

const DatePicker: React.FC<DatePickerProps> = ({ state, setState, className, onDateSelect, children }) => {
    const [popoverOpen, setPopoverOpen] = useState(false);

    const isFutureDate = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        return date.getTime() > today.getTime();
    };

    const handleOnSelect = (date: Date | undefined) => {
        if (!date) return;

        setState(date);
        setPopoverOpen(false);

        if (onDateSelect) onDateSelect(date);
    };

    return (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!state}
                    className={twMerge(`data-[empty=true]:text-muted-foreground w-full  justify-start text-left font-semibold mt-2 space-x-1 py-4.5`,className)}
                >
                    <CalendarIcon  />
                    {state ? formatDateForRender(state.toLocaleDateString()) : <span className="font-medium">Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={state}
                    onSelect={handleOnSelect}
                    disabled={(date) => isFutureDate(date)}
                    defaultMonth={state ?? new Date()}
                />
                {children && children}
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;
