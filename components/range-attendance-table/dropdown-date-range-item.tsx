"use client";

import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import DatePicker from "../date-picker";
import { Button } from "../ui/button";

import { DropdownMenuItem } from "../ui/dropdown-menu";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import { formatDateAsYYYYMMDD } from "@/lib/utils";

interface DropdownDateRangeItemProps {
    setOpen : Dispatch<SetStateAction<boolean>>
}

const DropdownDateRangeItem : React.FC<DropdownDateRangeItemProps> = ({
    setOpen,
}) => {
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    const router = useRouter();

    const handleSetCustomDateRange = () => {
        setOpen(false);

        const formattedStartDate = formatDateAsYYYYMMDD(startDate);
        const formattedEndDate = formatDateAsYYYYMMDD(endDate);

        router.push(
            `/day/range?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Get records for a date range
                </DropdownMenuItem>
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

export default DropdownDateRangeItem;
