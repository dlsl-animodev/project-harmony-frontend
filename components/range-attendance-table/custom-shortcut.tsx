"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DropdownDateRangeItem from "./dropdown-date-range-item";

import { Button } from "../ui/button";
import { useState } from "react";

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
                <DropdownDateRangeItem setOpen={setOpen} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CustomShortcut;
