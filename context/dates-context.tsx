"use client"

import { DateType } from "@/lib/types";
import { createContext, useContext, useState, ReactNode } from "react";

type DatesContextType = {
    dates : DateType[];
    setDates: (dates: DateType[]) => void;
};

const DatesContext = createContext<DatesContextType | undefined>(undefined);

export const DatesProvider = ({ children }: { children: ReactNode }) => {
    const [dates, setDates] = useState<DateType[]>([]);

    return (
        <DatesContext.Provider value={{ dates, setDates }}>
            {children}
        </DatesContext.Provider>
    );
}

export const useDates = () => {
    const context = useContext(DatesContext);

    if (!context) {
        throw new Error("useDates must be used within a DatesProvider");
    }
    return context;
}