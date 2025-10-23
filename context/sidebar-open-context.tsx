"use client";

import { useState } from "react";
import { createContext, useContext, ReactNode } from "react";

type SidebarOpenContextType = {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
};

const SidebarOpenContext = createContext<SidebarOpenContextType | undefined>(
    undefined
);

export const SidebarOpenProvider = ({ children }: { children: ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <SidebarOpenContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
            {children}
        </SidebarOpenContext.Provider>
    );
};

export const useSidebarOpen = () => {
    const context = useContext(SidebarOpenContext);

    if (!context) {
        throw new Error("useSidebarOpen must be used within a SidebarOpenProvider");
    }

    return context;
};
