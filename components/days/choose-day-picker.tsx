"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { formatDateAsYYYYMMDD } from "@/lib/utils";

interface ChooseDayPickerProps {
    className?: string;
}

const ChooseDayPicker: React.FC<ChooseDayPickerProps> = ({ className }) => {
    const [date, setDate] = useState<Date | undefined>();
    const [popoverOpen, setPopoverOpen] = useState(false);

    const router = useRouter();

    const handleDaySelect = (selectedDate: Date | undefined) => {
        if (!selectedDate) return;

        setDate(selectedDate);
        setPopoverOpen(false);

        const formattedDate = formatDateAsYYYYMMDD(selectedDate);
        router.push(`/day/${formattedDate}`);
    };

    return (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
                <Button className={className}>Select Day</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDaySelect}
                    disabled={(date) =>
                        date > new Date() || date < new Date("2000-01-01")
                    }
                />
            </PopoverContent>
        </Popover>
    );
};

export default ChooseDayPicker;
