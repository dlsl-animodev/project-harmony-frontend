import React from "react";
import { twMerge } from "tailwind-merge";

interface BentoContainerProps {
    children: React.ReactNode;
    className?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick? : () => void;
}
const BentoContainer: React.FC<BentoContainerProps> = ({
    children,
    className,
    onMouseEnter,
    onMouseLeave,
    onClick
}) => {
    return (
        <div
            className={twMerge(
                "bg-card p-4 rounded-md ",
                className
            )}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

const BentoContainerHeader : React.FC<BentoContainerProps> = ({
    children,
    className,
}) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export { BentoContainer, BentoContainerHeader };