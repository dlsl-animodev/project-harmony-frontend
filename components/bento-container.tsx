import React from "react";
import { twMerge } from "tailwind-merge";

interface BentoContainerProps {
    children: React.ReactNode;
    className?: string;
}
const BentoContainer: React.FC<BentoContainerProps> = ({
    children,
    className,
}) => {
    return (
        <div
            className={twMerge(
                "border-2  border-b-white border-r-white border-t-[#e2d9ff] border-l-[#e2d9ff] bg-card p-4 rounded-md ",
                className
            )}
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