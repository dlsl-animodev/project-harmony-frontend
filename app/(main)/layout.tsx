import { LoadingProvider } from "@/context/loading-context";
import Header from "@/components/header";
import { Toaster } from "sonner";
import React from "react";
import DaysSidebarServer from "@/components/days/days-sidebar-server";
import NextTopLoader from "nextjs-toploader";
import { DatesProvider } from "@/context/dates-context";

export const dynamic = "force-dynamic";

interface MainLayoutProps {
    children: React.ReactNode;
}
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div>
            <NextTopLoader />
            <LoadingProvider>
                <Header />
                <main className="w-full h-[calc(100vh-3rem)] lg:p-8 flex flex-col lg:flex-row items-stretch gap-4">
                    <DatesProvider>
                        <DaysSidebarServer className="lg:basis-[20%] lg:shrink-0 lg:grow-0" />
                        <section className="flex-1 flex flex-col">
                            {children}
                        </section>
                    </DatesProvider>
                    <Toaster />
                </main>
            </LoadingProvider>
        </div>
    );
};

export default MainLayout;
