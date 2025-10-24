import { Disc3 } from "lucide-react";
import Link from "next/link";

const AnimoDevBadge = () => {
    return (
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
    );
};

export default AnimoDevBadge;
