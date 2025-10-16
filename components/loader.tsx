import {BentoContainer} from "./bento-container";
import { Loader2 } from "lucide-react";

import { SubTitle, Description } from "./texts";

interface LoaderProps {
    className?: string;
    mainText: string;
    subText: string;
}
const Loader: React.FC<LoaderProps> = ({ className, mainText, subText }) => {
    return (
        <BentoContainer
            className={`flex flex-col items-center justify-center ${className}`}
        >
            <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" />
                <SubTitle> {mainText} </SubTitle>
            </span>
            <Description> {subText} </Description>
        </BentoContainer>
    );
};

export default Loader;

