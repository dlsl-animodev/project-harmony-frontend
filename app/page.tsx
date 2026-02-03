import { Title, Description } from "@/components/reusables/texts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ANIMODEVLOGO from "@/public/animo-dev-logo.jpg";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Book } from "lucide-react";
import AnimoDevBadge from "@/components/reusables/animo-dev-badge";

const TestLandingPage = () => {
    return (
        <div className="h-dvh w-dvw">
            <header className="flex items-center justify-between px-8 h-[8rem] mb-[2rem] md:mb-[0rem]">
                {/* Left Side  */}
                <section className="flex gap-4 items-center">
                    <Image
                        src={ANIMODEVLOGO}
                        alt="animo-dev-logo"
                        width={1024}
                        height={768}
                        className="w-[3rem] h-[3rem] lg:w-[4rem] lg:h-[4rem] rounded-lg border shadow-md"
                    />
                    <div className="w-[3rem] h-[3rem] lg:w-[4rem] lg:h-[4rem] rounded-lg border shadow-md flex items-center text-sm text-center font-semibold">
                        {" "}
                        musikalista logo{" "}
                    </div>
                </section>
                {/* Right Side */}
                <section className="flex gap-4 items-center">
                    <Link href={"/signIn"}>
                        <Button size={"md"} variant={"outline"}>
                            Sign in
                        </Button>
                    </Link>
                    {/* <AboutAndLegals /> */}
                </section>
            </header>
            <main className="flex flex-col gap-6 items-center h-[calc(100dvh-16rem)] justify-center p-2">
                <div className="flex flex-col gap-4 items-center ">
                    <AnimoDevBadge />
                    <div>
                        <Title className="mt-[1rem] md:mt-[0rem] text-4xl sm:text-6xl lg:text-7xl mb-4 font-bold break-words text-center">
                            Never Lose Track of a Beat, <br className="hidden md:block" /> or Who is in the
                            Room.
                        </Title>
                        <Description className="text-sm  md:text-xl lg:text-2xl font-medium text-center">
                            The official website for the Iot-powered Musikalista
                            Room Tracker that monitors check-ins and check-outs.
                        </Description>
                    </div>
                </div>
                <Description className="text-xs md:text-sm lg:text-base text-center mx-auto max-w-5xl">
                    Musikalista IoT-powered Room Tracker monitors every entry
                    and exit in the Music Club Room, syncing data to this
                    website&apos;s dashboard so club heads and members
                    always know who is practicing, when the room&apos;s
                    occupied, and who last used it, all without manual logs.
                </Description>

                <Link href={"/home"}>
                    <Button size={"lg"}> Get started </Button>
                </Link>
            </main>
        </div>
    );
};

export default TestLandingPage;

// USE THIS WHEN DOCUMENTS ARE READY 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AboutAndLegals = () => {
    const items = [
        { label: "About", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"} size={"md"}>
                    {" "}
                    <Book />{" "}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {items.map((item) => (
                    <DropdownMenuItem key={item.label} asChild>
                        <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
