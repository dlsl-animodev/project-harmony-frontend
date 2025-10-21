"use client";

import { Description, Title } from "@/components/texts";
import { Button } from "@/components/ui/button";
import { Book, Disc3 } from "lucide-react";
import AudioWave from "../components/audio-wave";
import { Badge } from "@/components/ui/badge";
import { useIsTablet } from "@/hooks/use-tablet";
import ANIMODEVLOGO from "@/public/animo-dev-logo.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const LandingPage = () => {
    const isTablet = useIsTablet();
    const [discSize, setDiscSize] = useState<number>(45);

    useEffect(() => {
        if (isTablet) {
            setDiscSize(30);
        } else {
            setDiscSize(45);
        }
    }, [isTablet]);

    return (
        <div className="h-full">
            <main className="h-[calc(100vh-3rem)] p-10 relative ">
                <AudioWave />
                {/* HERO SECTION  */}
                <section className="flex flex-col justify-between h-full ">
                    <div className="flex justify-between">
                        <div className="flex gap-4 flex-col lg:flex-row">
                            <div className="flex space-x-2">
                                <Image
                                    src={ANIMODEVLOGO}
                                    alt="animo-dev-logo"
                                    width={1024}
                                    height={768}
                                    className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] lg:w-[5rem]  lg:h-[5rem] rounded-lg border shadow-md"
                                />
                                <div className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] lg:w-[5rem]  lg:h-[5rem] rounded-lg border shadow-md flex items-center text-sm text-center font-semibold">
                                    {" "}
                                    musikalista logo{" "}
                                </div>
                            </div>
                            <p className="w-[120%] md:w-[100%] lg:w-[60%]  text-sm md:text-base lg:text-lg">
                                Musikalista IoT-powered Room Tracker monitors
                                every entry and exit in the Music Club Room,
                                syncing data to this website&apos;s dashboard so
                                club heads and members always know who is
                                practicing, when the room&apos;s occupied, and
                                who last used it, all without manual logs.
                            </p>
                        </div>
                        <span className="flex gap-2 mt-2 lg:mt-0">
                            <Link href={"/signIn"}>
                                <Button variant={"outline"}>Sign In</Button>
                            </Link>
                            <AboutAndLegals />
                        </span>
                    </div>

                    <div className="mt-20 md:mt-0 ">
                        <Badge className="bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500">
                            {" "}
                            Developed and maintained by
                            <Link href={"#"} className="underline">
                                {" "}
                                ANIMO.DEV
                            </Link>{" "}
                        </Badge>
                        <Title className="text-5xl sm:text-6xl lg:text-7xl sm:w-[46rem] md:w-[50rem] lg:w-full mb-4 font-bold break-words">
                            Never
                            <span className="text-primary">
                                {" "}
                                L
                                <Disc3
                                    className="inline animate-spin"
                                    size={discSize}
                                />
                                se Track{" "}
                            </span>{" "}
                            <br className="block md:hidden" />
                            of a Beat, <br className="hidden lg:block" /> or
                            <span className="text-primary">
                                {" "}
                                Wh
                                <Disc3
                                    className="inline animate-spin"
                                    size={discSize}
                                />{" "}
                                <br className="block md:hidden" />
                                is{" "}
                            </span>
                            in the
                            <span className="text-primary"> Room</span>.
                        </Title>
                        <Description className="text-sm  md:text-xl lg:text-2xl font-medium mb-14">
                            The official website for the Iot-powered Musikalista
                            Room Tracker <br className="hidden md:block " />{" "}
                            that monitors check-ins and check-outs.
                        </Description>

                        <Link href={"/home"}>
                            <Button> Get started </Button>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LandingPage;

const AboutAndLegals = () => {
    const items = [
        { label: "About", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                    {" "}
                    <Book />{" "}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {items.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
