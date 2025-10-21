"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";
import { Share } from "lucide-react";
import { toast } from "sonner";
import { DateType } from "@/lib/types";

interface ShareButtonProps extends React.ComponentProps<typeof Button> {
    fromHome? : boolean;
    fromRange? : boolean;
    date? : DateType;
    children? : React.ReactNode;
}

const ShareButton: React.FC<ShareButtonProps> = ( { fromHome, fromRange, date, children, ...buttonProps }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleShareClick = () => {
        if (fromHome && date) {
            const shareUrl = `${
                process.env.NEXT_PUBLIC_BASE_URL
            }/day/${date.text}`;
            
            navigator.clipboard.writeText(shareUrl);
            toast.success("Link copied to clipboard!");
            return;
        };

        if (fromRange) {
            const startDate = searchParams.get("startDate");
            const endDate = searchParams.get("endDate");

            if (!startDate || !endDate) {
                toast.error("Invalid date range");
                return;
            }

            const shareUrl = `${
                process.env.NEXT_PUBLIC_BASE_URL
            }/day/range?startDate=${startDate}&endDate=${endDate}`;
            navigator.clipboard.writeText(shareUrl);
            toast.success("Link copied to clipboard!");
            return;
        }

        const shareUrl = `${
            process.env.NEXT_PUBLIC_BASE_URL
        }${pathname}`;
        
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
    };

    return (
        <Button onClick={handleShareClick} {...buttonProps}>
            <Share /> {children ? children : "Share"}
        </Button>
    );
};

export default ShareButton;
