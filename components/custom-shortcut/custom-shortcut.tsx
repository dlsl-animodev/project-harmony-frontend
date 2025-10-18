"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DropdownStudentOnDateItem from "./dropdown-student-on-date-item";
import DropdownDateRangeItem from "./dropdown-date-range-item";

import { Button } from "../ui/button";
import { useState } from "react";

import { Dispatch, SetStateAction } from "react";

// Used by the items in the custom shortcut dropdown menu
export interface DropdownCustomItemProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const CustomShortcut = () => {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button>Custom</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Custom Shortcuts</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownStudentOnDateItem setOpen={setOpen} />
                <DropdownDateRangeItem setOpen={setOpen} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CustomShortcut;
