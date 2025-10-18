"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DropdownCustomItemProps } from "./custom-shortcut";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn, formatDateAsYYYYMMDD, formatDateForRender } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
    studentId: z.string().min(1, "Student ID is required"),
    date: z.date({ error: "Date is required" }),
});

const DropdownStudentOnDateItem: React.FC<DropdownCustomItemProps> = ({
    setDropdownOpen,
}) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            studentId: "",
            date: undefined,
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (!values.studentId || !values.date) {
            toast.error("Please provide both Student ID and Date.");
            return;
        }

        setDropdownOpen(false);
        setDialogOpen(false);

        const formattedDate = formatDateAsYYYYMMDD(values.date);

        const studentOnDateUrl = `/student/${values.studentId}?date=${formattedDate}`;
        router.push(studentOnDateUrl);
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Get student record on date
                </DropdownMenuItem>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Student Record on Date</DialogTitle>
                    <DialogDescription>
                        Type the student ID and select the date to view their
                        attendance record.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="studentId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Student ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="student123"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        formatDateForRender(
                                                            field.value.toLocaleDateString()
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() ||
                                                    date <
                                                        new Date("2000-01-01")
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            Set studentId and date for record
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default DropdownStudentOnDateItem;
