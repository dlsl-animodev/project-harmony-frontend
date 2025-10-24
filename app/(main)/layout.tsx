import { LoadingProvider } from "@/context/loading-context";
import { SidebarOpenProvider } from "@/context/sidebar-open-context";
import { DatesProvider } from "@/context/dates-context";
import Header from "@/components/header";
import DaysSidebarServer from "@/components/days/days-sidebar-server";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import React, { Suspense } from "react";
import DaysSidebarLoader from "@/components/days/days-sidebar-loader";

export const dynamic = "force-dynamic";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <LoadingProvider>
            <SidebarOpenProvider>
                <div className="flex flex-col h-[100dvh] overflow-hidden">
                    <NextTopLoader />
                    <Header />

                    <main className="flex-1 overflow-y-auto flex flex-col lg:flex-row gap-4 lg:p-8">
                        <DatesProvider>
                            <Suspense fallback={<DaysSidebarLoader />}>
                                <DaysSidebarServer className="lg:basis-[20%] shrink-0" />
                            </Suspense>
                            <section className="flex-1 flex flex-col">
                                {children}
                            </section>
                        </DatesProvider>
                    </main>
                    <Toaster />
                </div>
            </SidebarOpenProvider>
        </LoadingProvider>
    );
};

export default MainLayout;
