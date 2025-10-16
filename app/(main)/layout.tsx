import { LoadingProvider } from "@/context/loading-context";
import Header from "@/components/header";
import { Toaster } from "sonner";
import React from "react";
import DaysSidebarServer from "@/components/days/days-sidebar-server";
import NextTopLoader from "nextjs-toploader";
import { DatesProvider } from "@/context/dates-context";

export const dynamic = 'force-dynamic';

interface MainLayoutProps {
    children: React.ReactNode;
}
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div>
            <NextTopLoader />
            <LoadingProvider>
                <Header />
                <main className="w-full h-[calc(100vh-5rem)] p-8 flex gap-4">
                    <DatesProvider>
                        <DaysSidebarServer className="flex-[20%]" />
                        <section className="flex-[80%]">{children}</section>
                    </DatesProvider>
                    <Toaster />
                </main>
            </LoadingProvider>
        </div>
    );
};

export default MainLayout;
