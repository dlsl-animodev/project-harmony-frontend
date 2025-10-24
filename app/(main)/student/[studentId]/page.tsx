import StudentOnDate from "@/components/student/student-on-date";

interface StudentOnDatePageProps {
    // params of the studentId
    // searchParams of the date
    params: Promise<{ studentId: string }>;
    searchParams: Promise<{ date: string }>;
}

const StudentOnDatePage: React.FC<StudentOnDatePageProps> = async ({
    params,
    searchParams,
}) => {
    const studentId = (await params).studentId;
    const date = (await searchParams).date;

    return <StudentOnDate studentId={studentId} date={date} />;
};

export default StudentOnDatePage;
