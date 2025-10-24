import Loader from "@/components/reusables/loader";

const LoadingStudentPage = () => {
    return (
        <Loader
            className="w-full bg-background h-full"
            mainText="Loading record data..."
            subText="Please wait while we fetch the records"
        />
    );
};

export default LoadingStudentPage;
