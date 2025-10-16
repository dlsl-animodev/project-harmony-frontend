"use client";

import { usePathname } from "next/navigation";

import { Button } from "../ui/button";
import { Share } from "lucide-react";
import { toast } from "sonner";
import { DateType } from "@/lib/types";

interface ShareButtonProps extends React.ComponentProps<typeof Button> {
    fromHome? : boolean;
    date? : DateType;
}

const ShareButton: React.FC<ShareButtonProps> = ( { fromHome, date, ...buttonProps }) => {
    const pathname = usePathname();

    const handleShareClick = () => {
        if (fromHome && date) {
            const shareUrl = `${
                process.env.NEXT_PUBLIC_BASE_URL
            }/day/${date.text}`;
            
            navigator.clipboard.writeText(shareUrl);
            toast.success("Link copied to clipboard!");
            return;
        };

        const shareUrl = `${
            process.env.NEXT_PUBLIC_BASE_URL
        }${pathname}`;
        
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
    };

    return (
        <Button onClick={handleShareClick} {...buttonProps}>
            <Share /> Share
        </Button>
    );
};

export default ShareButton;
