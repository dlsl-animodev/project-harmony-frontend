import { LoadingProvider } from "@/context/loading-context";
import Header from "@/components/header";
import { Toaster } from "sonner";
import React from "react";
import DaysSidebarServer from "@/components/days-sidebar/days-sidebar-server";

interface MainLayoutProps {
    children: React.ReactNode;
}
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div>
            <LoadingProvider>
                <Header />
                <main className="w-full h-[calc(100vh-5rem)] p-8 flex gap-4">
                    <DaysSidebarServer className="flex-[20%]" />
                    <section className="flex-[80%]">{children}</section>
                    <Toaster />
                </main>
            </LoadingProvider>
        </div>
    );
};

export default MainLayout;
