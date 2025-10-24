"use client";

import { Frown } from "lucide-react";
import {
    BentoContainer,
    BentoContainerHeader,
} from "../reusables/bento-container";
import { twMerge } from "tailwind-merge";
import { Description, Title } from "../reusables/texts";
import { Button } from "../ui/button";
import { ErrorBoundaryProps } from "@/lib/error-types";
import { useRouter } from "next/navigation";

// extend the error boundary props to have the className
interface FetchFailedProps extends ErrorBoundaryProps {
    className?: string;
}

const FetchFailed: React.FC<FetchFailedProps> = ({
    error,
    reset,
    className,
}) => {
    const router = useRouter();

    return (
        <div
            className={twMerge(
                `flex flex-col items-center justify-center h-full`,
                className
            )}
        >
            <BentoContainer className="bg-transparent space-y-4 flex flex-col items-center border-none">
                <BentoContainerHeader className="text-center">
                    <Title className="inline-flex items-end gap-2">
                        Something went wrong <Frown />
                    </Title>
                    <Description>{error.message}</Description>
                </BentoContainerHeader>
                <Button
                    onClick={() => {
                        if (reset) {
                            reset();
                        } else {
                            router.refresh();
                        }
                    }}
                >
                    Try again
                </Button>
            </BentoContainer>
        </div>
    );
};

export default FetchFailed;
