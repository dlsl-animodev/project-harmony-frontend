import React from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
    className?: string;
    children: React.ReactNode;
}

const Title: React.FC<TextProps> = ({ children, className }) => {
    return <h1 className={twMerge('text-xl font-semibold', className)}> {children} </h1>;
};

const SubTitle: React.FC<TextProps> = ({ children, className }) => {
    return <h2 className={twMerge(`text-lg font-medium`, className)}>{children}</h2>;
};

const Description: React.FC<TextProps> = ({ children, className }) => {
    return <p className={twMerge('text-sm text-muted-foreground', className)}>{children}</p>;
};

export { Title, SubTitle, Description };