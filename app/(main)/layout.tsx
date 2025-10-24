import { LoadingProvider } from "@/context/loading-context";
import { SidebarOpenProvider } from "@/context/sidebar-open-context";
import { DatesProvider } from "@/context/dates-context";
import Header from "@/components/header";
import DaysSidebarServer from "@/components/days/days-sidebar-server";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import React, { Suspense } from "react";
import Loader from "@/components/reusables/loader";

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
                    <Suspense
                        fallback={
                            <Loader
                                className="h-full bg-transparent"
                                mainText="Welcome to Project Harmony Dashboard!"
                                subText="Please wait while we set up things for you"
                            />
                        }
                    >
                        <main className="flex-1 overflow-y-auto flex flex-col lg:flex-row gap-4 lg:p-8">
                            <DatesProvider>
                                <DaysSidebarServer className="lg:basis-[20%] shrink-0" />
                                <section className="flex-1 flex flex-col">
                                    {children}
                                </section>
                            </DatesProvider>
                        </main>
                    </Suspense>
                    <Toaster />
                </div>
            </SidebarOpenProvider>
        </LoadingProvider>
    );
};

export default MainLayout;
