import Loader from "@/components/reusables/loader";

const Loading = () => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-background">
            <Loader
                className="w-full bg-background h-full"
                mainText="Loading record data..."
                subText="Please wait while we fetch the records"
            />
        </div>
    );
};

export default Loading;
