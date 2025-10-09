import BentoContainer from "@/components/bento-container";
import { Description, SubTitle, Title } from "@/components/texts";
import { ChevronRight, UserCheck, UserX } from "lucide-react";
import Link from "next/link";

const HomePage = async () => {
    const dummy = [
        {
            day: "Monday",
            checkIns: 3,
            checkouts: 2,
        },
        {
            day: "Tuesday",
            checkIns: 5,
            checkouts: 4,
        },
        {
            day: "Wednesday",
            checkIns: 8,
            checkouts: 7,
        },
        {
            day: "Thursday",
            checkIns: 4,
            checkouts: 4,
        },
        {
            day: "Friday",
            checkIns: 7,
            checkouts: 6,
        },
        {
            day: "Saturday",
            checkIns: 2,
            checkouts: 1,
        },
        {
            day: "Sunday",
            checkIns: 1,
            checkouts: 1,
        },
    ];

    return (
        <BentoContainer className="border-none space-y-8 bg-background">
            <header>
                <Title> Dashboard </Title>
                <Description>
                    Welcome to the Project Harmony Dashboard! Select a day to
                    view detailed records.
                </Description>
            </header>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dummy.map((item, index) => (
                    <li key={index}>
                        <Link href="/day/1">
                            <BentoContainer className="space-y-12 px-6 bg-gradient-to-tl from-[#f9f5ff] via-[#f0e7ff] to-[#e2d9ff] shadow-md transition">
                                <header className="flex items-center justify-between ">
                                    <SubTitle>{item.day} </SubTitle>
                                    <ChevronRight className="text-[#f93ed4]" />
                                </header>
                                <main className="text-[#f93ed4] text-sm font-medium">
                                    <div className="flex flex-col justify-center gap-2">
                                        <div className="flex items-center gap-2">
                                            <UserCheck
                                                size={20}
                                            /> Check-Ins: {item.checkIns}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <UserX size={20} /> Checkouts:{" "}
                                            {item.checkouts}
                                        </div>
                                    </div>
                                </main>
                            </BentoContainer>
                        </Link>
                    </li>
                ))}
            </ul>
        </BentoContainer>
    );
};

export default HomePage;
