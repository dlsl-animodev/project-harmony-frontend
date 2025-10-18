import { twMerge } from "tailwind-merge";
import { BentoContainer } from "./bento-container";

interface NoDataMessageProps {
    className?: string;
}
const NoDataMessage: React.FC<NoDataMessageProps> = ({ className }) => {
    return (
        <BentoContainer
            className={twMerge(
                `bg-transparent flex items-center justify-center`,
                className
            )}
        >
            <p className="text-red-500 font-medium">
                {" "}
                No data. Please refresh the page if you think this is a mistake.{" "}
            </p>
        </BentoContainer>
    );
};

export default NoDataMessage;
