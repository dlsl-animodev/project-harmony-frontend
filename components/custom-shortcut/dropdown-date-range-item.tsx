"use client";

import { useState } from "react";
import DatePicker from "../ui/date-picker";
import { Button } from "../ui/button";

import { DropdownMenuItem } from "../ui/dropdown-menu";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import { formatDateAsYYYYMMDD } from "@/lib/utils";
import { DropdownCustomItemProps } from "../custom-shortcut/custom-shortcut";
import { toast } from "sonner";

const DropdownDateRangeItem: React.FC<DropdownCustomItemProps> = ({
    setDropdownOpen,
    setSidebarOpen
}) => {
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    const router = useRouter();

    const handleSetCustomDateRange = () => {
        if (!startDate || !endDate) {
            toast.error("Please select both start and end dates.");
            return;
        }

        setSidebarOpen(false);
        setDropdownOpen(false);

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
                <Button onClick={handleSetCustomDateRange}>
                    Set custom date range view
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default DropdownDateRangeItem;
