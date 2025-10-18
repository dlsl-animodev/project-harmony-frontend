'use client'

import { Button } from "./ui/button";
import { useState } from "react";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
    state: Date | undefined;
    setState: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const DatePicker: React.FC<DatePickerProps> = ({ state, setState }) => {
    const [open, setOpen] = useState(false);
    const handleOnSelect = (date: Date | undefined) => {
        setState(date);
        setOpen(false);
    };

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
                <Calendar
                    mode="single"
                    selected={state}
                    onSelect={handleOnSelect}
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;