import AudioWave from "@/components/reusables/audio-wave";
import { Description, Title } from "@/components/reusables/texts";
import { Frown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimoDevBadge from "@/components/reusables/animo-dev-badge";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col gap-[6rem] items-center justify-center h-[100dvh]">
            <header className="flex flex-col items-center">
                <p className="font-bold text-lg mb-4 text-primary">
                    Project Harmony
                </p>
                <AnimoDevBadge />
            </header>

            <main className="flex flex-col items-center">
                <AudioWave />
                <Title className="mt-4 inline-flex items-center gap-2">
                    404 - Page Not Found <Frown />{" "}
                </Title>
                <Description>
                    The page you are looking for does not exist.
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
