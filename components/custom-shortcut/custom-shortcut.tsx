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
import React, { useState } from "react";

import { Dispatch, SetStateAction } from "react";

// Used by the items in the custom shortcut dropdown menu
export interface DropdownCustomItemProps {
    setDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

type CustomShortcutProps = React.ComponentProps<typeof Button>

const CustomShortcut : React.FC<CustomShortcutProps> = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
                <Button {...props}>Custom</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Custom Shortcuts</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownStudentOnDateItem setDropdownOpen={setDropdownOpen} />
                <DropdownDateRangeItem setDropdownOpen={setDropdownOpen} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CustomShortcut;
