import { twMerge } from "tailwind-merge";

import { Disc3 } from "lucide-react";
import Link from "next/link";

interface AnimoDevBadgeProps {
    className?: string;
}

const AnimoDevBadge: React.FC<AnimoDevBadgeProps> = ({ className }) => {
    return (
        <div
            className={twMerge(
                `text-white flex items-center w-fit rounded-lg text-xs text-center gap-4 px-4 py-2 shadow-md bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500 font-bold border`,
                className,
            )}
        >
            <SpinningDisk />
            <span>
                Developed by
                <Link href={"#"} className="underline">
                    {" "}
                    ANIMO.DEV
                </Link>{" "}
            </span>
            <SpinningDisk />
        </div>
    );
};

export default AnimoDevBadge;

const SpinningDisk = () => {
    return <Disc3 className=" animate-spin " />;
};
