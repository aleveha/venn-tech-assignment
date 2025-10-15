import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export const OnboardingForm = () => {
    return (
        <div className="w-full max-w-2xl rounded-2xl bg-white p-8 border flex flex-col gap-6">
            <p className="text-center text-3xl">Onboarding Form</p>

            <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Field>
                        <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                        <Input id="firstName" />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                        <Input id="lastName" />
                    </Field>
                </div>

                <Field>
                    <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                    <Input id="phone" type="tel" />
                </Field>

                <Field>
                    <FieldLabel htmlFor="corporationNumber">
                        Corporation Number
                    </FieldLabel>
                    <Input id="corporationNumber" />
                    <FieldError>Invalid Corporation Number</FieldError>
                </Field>

                <Button type="submit">
                    Submit
                    <ArrowRight className="size-4" />
                </Button>
            </form>
        </div>
    );
};
