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
import { useSidebarOpen } from "@/context/sidebar-open-context";

// Used by the items in the custom shortcut dropdown menu
export interface DropdownCustomItemProps {
    setDropdownOpen: Dispatch<SetStateAction<boolean>>;
   setSidebarOpen : (open: boolean) => void;
}

interface CustomShortcutProps {
    children?: React.ReactNode;
    variant?: "default" | "link";
    className?: string;
}

const CustomShortcut: React.FC<CustomShortcutProps> = ({
    children,
    variant,
    className,
}) => {
    // sidebar open handler
    const { setSidebarOpen } = useSidebarOpen();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
                {children ? (
                    <div className={className}>{children}</div>
                ) : (
                    <Button className={className} variant={variant}>
                        Custom
                    </Button>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Custom Shortcuts</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownStudentOnDateItem setDropdownOpen={setDropdownOpen} setSidebarOpen={setSidebarOpen} />
                <DropdownDateRangeItem setDropdownOpen={setDropdownOpen} setSidebarOpen={setSidebarOpen} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CustomShortcut;
