import AuthForm from "@/components/auth/auth-form";
import Header from "@/components/header";

const FORM_TITLE = "Create your account";
const FORM_DESCRIPTION = "Create an account and wait to be verified.";

const ALTERNATIVE = {
    message: "Already have an account? ",
    linkText: "Sign In instead",
    href: "/signIn",
    buttonText : "Sign Up",
}

const SignUpPage = async () => {

    return (
        <div>
            <Header />
            <AuthForm 
                formTitle={FORM_TITLE}
                formDescription={FORM_DESCRIPTION}  
                alternative={ALTERNATIVE}
                // TEMPORARY FOR CHECKING IF SIGN IN OR SIGN UP, REPLACE WITH SERVER ACTION OR API ROUTE LATER INSIDE AUTH FORM
                action='signUp'
            />
        </div>
    )
};

export default SignUpPage;