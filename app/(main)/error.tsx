"use client";

import { ErrorBoundaryProps } from "@/lib/error-types";
import FetchFailed from "@/components/error/fetch-failed";

const ErrorPage: React.FC<ErrorBoundaryProps> = ({ error, reset }) => {
    return <FetchFailed error={error} reset={reset} />;
};

export default ErrorPage;