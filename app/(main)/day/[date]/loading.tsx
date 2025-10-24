import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
    return (
        <div className="flex flex-col h-full w-full p-4">
            <Skeleton className="h-10 w-1/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-4" />
            <Skeleton className="flex-1 w-full" />
            
        </div>
    );
};

export default Loading;
