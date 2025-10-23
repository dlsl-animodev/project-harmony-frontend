import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AlertMessageProps {
    title: string;
    description?: string;
}
const AlertMessage: React.FC<AlertMessageProps> = ({
    title,
    description = "If you think it is an error, please contact the developers.",
}) => {
    return (
        <Alert className="bg-gradient-to-tl from-[#f9f5ff] via-[#f0e7ff] to-[#e2d9ff] shadow-md text-primary">
            <Terminal />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    );
};

export default AlertMessage;
