"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Title, Description } from "../reusables/texts";
import { BentoContainer } from "../reusables/bento-container";

const authSchema = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"), // 6 characters minimum by Supabase
});

const ACTIONS = {
    SIGN_IN: "signIn",
    SIGN_UP: "signUp",
} as const;

interface AuthFormProps {
    formTitle : string;
    formDescription : string;
    alternative : {
        message : string;
        buttonText : string;
        linkText : string;
        href : string;
    }
    // TEMPORARY FOR CHECKING IF SIGN IN OR SIGN UP, REPLACE WITH SERVER ACTION OR API ROUTE LATER INSIDE AUTH FORM
    action : string;
}

const AuthForm : React.FC<AuthFormProps> = ({
    formTitle,
    formDescription,
    alternative,
    action
}) => {
    const form = useForm({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof authSchema>) => {
        console.log(values);

        switch (action) {
            case ACTIONS.SIGN_IN:
                // sign in logic here 
                break;
            case ACTIONS.SIGN_UP:
                // sign up logic here
                break;
            default:
                // INVALID ACTION 
                console.error("Invalid action in auth form");
                return;
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center h-[calc(100vh-3rem)] w-screen"
        >
            <div>
                <p> backend auth logic not yet implemented </p>
                <Link href={"/home"} className="text-primary underline">
                    Go to Home Page
                </Link>
            </div>

            <BentoContainer
                className="bg-gradient-to-tl from-[#f9f5ff] via-[#f0e7ff] to-[#e2d9ff] shadow-md space-y-8 w-[30rem]"
            >
                <section>
                    <Title className="text-center"> {formTitle} </Title>
                    <Description className="text-center">
                        {formDescription}
                    </Description>
                </section>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        We will never share your email with
                                        anyone else.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Must be at least 6 characters.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <section className="flex flex-col gap-2 ">
                            <Button type="submit">
                                {alternative.buttonText}
                            </Button>
                            <div className="text-sm  text-center">
                                <span className="text-muted-foreground">
                                    {alternative.message}{" "}
                                </span>
                                <Link
                                    href={alternative.href}
                                    className="text-primary underline font-medium"
                                >
                                    {alternative.linkText}
                                </Link>
                            </div>
                        </section>
                    </form>
                </Form>
            </BentoContainer>
        </div>
    );
};

export default AuthForm;
