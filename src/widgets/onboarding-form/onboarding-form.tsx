import {
    onboardingUserSchema,
    type OnboardingUserData
} from "@/entities/onboarding-user";
import { submitOnboarding } from "@/features/submit-onboarding";
import { Button } from "@/shared/ui/button";
import { Field, FieldError, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const OnboardingForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<OnboardingUserData>({
        resolver: valibotResolver(onboardingUserSchema),
        mode: "onBlur"
    });

    const onSubmit = async (data: OnboardingUserData) => {
        const result = await submitOnboarding(data);

        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="w-full max-w-2xl rounded-2xl bg-white p-8 border flex flex-col gap-6">
            <p className="text-center text-3xl">Onboarding Form</p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Field>
                        <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                        <Input
                            id="firstName"
                            {...register("firstName")}
                            aria-invalid={!!errors.firstName}
                            placeholder="John"
                        />
                        {errors.firstName ? (
                            <FieldError>{errors.firstName.message}</FieldError>
                        ) : null}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                        <Input
                            id="lastName"
                            {...register("lastName")}
                            aria-invalid={!!errors.lastName}
                            placeholder="Doe"
                        />
                        {errors.lastName ? (
                            <FieldError>{errors.lastName.message}</FieldError>
                        ) : null}
                    </Field>
                </div>

                <Field>
                    <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                    <Input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        aria-invalid={!!errors.phone}
                        maxLength={12}
                        placeholder="+1 (234) 567-8900"
                    />
                    {errors.phone ? (
                        <FieldError>{errors.phone.message}</FieldError>
                    ) : null}
                </Field>

                <Field>
                    <FieldLabel htmlFor="corporationNumber">
                        Corporation Number
                    </FieldLabel>
                    <Input
                        id="corporationNumber"
                        {...register("corporationNumber")}
                        aria-invalid={!!errors.corporationNumber}
                        maxLength={9}
                        placeholder="123456789"
                    />
                    {errors.corporationNumber ? (
                        <FieldError>
                            {errors.corporationNumber.message}
                        </FieldError>
                    ) : null}
                </Field>

                <Button type="submit">
                    Submit
                    <ArrowRight className="size-4" />
                </Button>
            </form>
        </div>
    );
};
