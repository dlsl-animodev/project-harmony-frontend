import { twMerge } from "tailwind-merge";
import { BentoContainer } from "./bento-container";

interface DataLoadingFailedProps {
    className?: string;
}
const DataLoadingFailed: React.FC<DataLoadingFailedProps> = ({ className }) => {
    return (
        <BentoContainer className={twMerge(`bg-transparent flex items-center justify-center`, className)}>
            <p className="text-red-500 font-medium"> Failed to load data. Please refresh the page. </p>
        </BentoContainer>
    );
};

export default DataLoadingFailed;
