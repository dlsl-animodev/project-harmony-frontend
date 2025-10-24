import Loader from "@/components/reusables/loader";

const Loading = () => {
    return (
        <div className="flex h-full w-full">
            <Loader
                className="w-full bg-background"
                mainText="Loading record data..."
                subText="Please wait while we fetch the records"
            />
        </div>
    );
};

export default Loading;
