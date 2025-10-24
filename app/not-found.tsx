import AudioWave from "@/components/reusables/audio-wave";
import { Description, Title } from "@/components/reusables/texts";
import { Frown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Disc3 } from "lucide-react";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col gap-[6rem] items-center justify-center h-screen">
            <header className="flex flex-col items-center">
                <p className="font-bold text-lg mb-4 text-primary">
                    Project Harmony
                </p>
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
            </header>

            <main className="flex flex-col items-center">
                <AudioWave />
                <Title className="mt-4 inline-flex items-center gap-2">
                    404 - Page Not Found <Frown />{" "}
                </Title>
                <Description>
                    The page you’re looking for doesn’t exist.
                </Description>
            </main>

            <footer className="flex flex-col items-center gap-4">
                <div className="space-x-2">
                    <Link href="/home">
                        <Button className="mt-4">Go to Dashboard</Button>
                    </Link>
                    <Link href="/">
                        <Button variant="outline" className="mt-6">
                            Go to landing page
                        </Button>
                    </Link>
                </div>
                <small>
                    Contact support if you believe this is an error.
                </small>
            </footer>
        </div>
    );
};

export default NotFoundPage;
