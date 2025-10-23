import Loader from "@/components/reusables/loader";

const LoadingHomePage = () => {
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

export default LoadingHomePage;
