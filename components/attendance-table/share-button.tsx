"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";
import { Share } from "lucide-react";
import { toast } from "sonner";

const ShareButton = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleShareClick = () => {
        const shareUrl = `${
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }${pathname}?${searchParams.toString()}`;
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
    };

    return (
        <Button onClick={handleShareClick}>
            <Share /> Share
        </Button>
    );
};

export default ShareButton;
