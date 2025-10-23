import { Description, Title } from "@/components/reusables/texts";
import { Button } from "@/components/ui/button";
import { Book, Disc3 } from "lucide-react";
import AudioWave from "../components/reusables/audio-wave";
import ANIMODEVLOGO from "@/public/animo-dev-logo.jpg";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const LandingPage = () => {
    return (
        <div className="h-full">
            <main className="h-[calc(100vh-10vh)] lg:h-[calc(100vh-0rem)] py-5 px-10 md:px-14 relative">
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
                        </div>
                        <span className="flex gap-2 mt-2 lg:mt-0">
                            <Link href={"/signIn"}>
                                <Button variant={"outline"}>Sign In</Button>
                            </Link>
                            <AboutAndLegals />
                        </span>
                    </div>

                    <div className="mt-20 md:mt-0 space-y-10">
                        <div className="w-full flex items-center justify-center md:justify-start lg:justify-start mb-4">
                            <div className="text-white flex items-center rounded-lg text-sm text-center gap-4 px-4 py-2 shadow-md bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500 font-bold border">
                                <Disc3 className=" animate-spin size-8 md:size-5" />{" "}
                                <span>
                                    Developed and maintained by
                                    <Link href={"#"} className="underline">
                                        {" "}
                                        ANIMO.DEV
                                    </Link>{" "}
                                </span>
                                <Disc3 className=" animate-spin size-8 md:size-5" />{" "}
                            </div>
                        </div>
                        <Title className="text-5xl sm:text-6xl lg:text-7xl mb-4 font-bold break-words text-center md:text-left">
                            Never
                            <span className="text-primary">
                                {" "}
                                Lose Track{" "}
                            </span>{" "}
                            of a Beat, <br className="hidden lg:block" /> or
                            <span className="text-primary"> Who is </span>
                            in the
                            <span className="text-primary"> Room.</span>{" "}
                        </Title>
                        <Description className="text-sm  md:text-xl lg:text-2xl font-medium text-center md:text-left">
                            The official website for the Iot-powered Musikalista
                            Room Tracker <br className="hidden md:block " />{" "}
                            that monitors check-ins and check-outs.
                        </Description>
                        <Description className="text-xs md:text-sm lg:text-base text-center md:text-left">
                            Musikalista IoT-powered Room Tracker monitors every
                            entry and exit in the Music Club Room,{" "}
                            <br className="hidden md:block " /> syncing data to
                            this website&apos;s dashboard so club heads and
                            members always know who is practicing,{" "}
                            <br className="hidden md:block " /> when the
                            room&apos;s occupied, and who last used it, all
                            without manual logs.
                        </Description>

                        <div className="flex items-center justify-between">
                            <Link href={"/home"}>
                                <Button> Get started </Button>
                            </Link>
                            <AudioWave />
                        </div>
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
