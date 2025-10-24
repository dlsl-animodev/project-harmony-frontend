"use client";

import {
    BentoContainer,
    BentoContainerHeader,
} from "../reusables/bento-container";
import { twMerge } from "tailwind-merge";
import { Description, Title } from "../reusables/texts";
import { Button } from "../ui/button";
import { ErrorBoundaryProps } from "@/lib/error-types";
import { useRouter } from "next/navigation";
import AnimoDevBadge from "../reusables/animo-dev-badge";

// extend the error boundary props to have the className
interface FetchFailedProps extends ErrorBoundaryProps {
    className?: string;
    showMessage?: boolean;
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
                `flex flex-col items-center justify-center h-[100dvh]`,
                className
            )}
        >
            <BentoContainer className="bg-transparent space-y-4 flex flex-col items-center border-none">
                <AnimoDevBadge />
                <BentoContainerHeader className="text-center">
                    <Title>
                        Something went wrong: {error.name}
                    </Title>
                    <Description>
                        Unexpected error. Try again or contact support
                    </Description>
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
