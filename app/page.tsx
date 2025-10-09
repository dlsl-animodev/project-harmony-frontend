import BentoContainer from "@/components/bento-container";
import Header from "@/components/header";
import { Description, SubTitle } from "@/components/texts";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
    return (
        <div>
            <Header />
            <main className="flex items-center justify-center w-full h-[calc(100vh-5rem)]">
                <BentoContainer className="bg-gradient-to-tl from-[#f9f5ff] via-[#f0e7ff] to-[#e2d9ff]">
                    <SubTitle> Under development! </SubTitle>
                    <Description>
                        This landing page is currently under development. Please
                        check back later.
                    </Description>
                    <Link href="/home">
                        <Button className="mt-4">
                            <Home className="ml-2" />
                            Go to Dashboard
                        </Button>
                    </Link>
                </BentoContainer>
            </main>
        </div>
    );
};

export default LandingPage;
