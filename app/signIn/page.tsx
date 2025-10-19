import AuthForm from "@/components/auth/auth-form";
import Header from "@/components/header";

const FORM_TITLE = "Welcome back";
const FORM_DESCRIPTION = "Sign in to your account to continue.";

const ALTERNATIVE = {
    message: "Do not have an account?",
    buttonText : "Sign In",
    linkText: "Sign Up instead",
    href: "/signUp",
}

const SignInPage = async () => {
    return (
        <div>
            <Header />
            <AuthForm
                formTitle={FORM_TITLE}
                formDescription={FORM_DESCRIPTION}
                alternative={ALTERNATIVE}
                // TEMPORARY FOR CHECKING IF SIGN IN OR SIGN UP, REPLACE WITH SERVER ACTION OR API ROUTE LATER INSIDE AUTH FORM
                action='signIn'
            />
        </div>
    );
};

export default SignInPage;
