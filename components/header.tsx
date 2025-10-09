import Link from "next/link";
import { Button } from "./ui/button";
import { User } from "lucide-react";

const Header = () => {
    return (
        <header
            className="
    relative overflow-hidden
    h-12 shadow-md border-b 
    flex items-center justify-between 
    px-[3rem] mt-4 mx-6 rounded-lg
    text-primary
    bg-gradient-to-b from-[#c9d1ff] via-[#e1b8ff] to-[#fcb5f8]
  "
        >
            {/* Light overlay for soft depth */}
            <div className="absolute inset-0 bg-gradient-to-tl from-white/40 to-transparent rounded-lg pointer-events-none z-0"></div>

            {/* Animated light beam (between bg and text) */}
            <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none z-10">
                <div className="animate-shine absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent w-[200%]"></div>
            </div>

            {/* Header content */}
            <section className="relative z-20 flex items-center gap-14">
                <Link href="/" className="font-bold text-lg">
                    Project Harmony
                </Link>
                <nav>
                    <ul className="font-medium text-sm flex items-center gap-6">
                        <li>
                            <Link href="/home">Home</Link>
                        </li>
                    </ul>
                </nav>
            </section>

            {/* RIGHT SECTION FOR FUTURE ELEMENTS  */}
            <section className="flex items-center gap-2 z-20">
                <Button> <User/> Account </Button>
            </section>
        </header>
    );
};

export default Header;
