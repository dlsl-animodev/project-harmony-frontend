"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// 1️⃣ Define the context type (optional if using TS)
type LoadingContextType = {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
};

// 2️⃣ Create the context
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// 3️⃣ Provider component
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

// 4️⃣ Custom hook for convenience
export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};
