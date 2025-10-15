import * as v from "valibot";

export const onboardingUserSchema = v.object({
    firstName: v.pipe(
        v.string("First name is required"),
        v.nonEmpty("First name is required"),
        v.maxLength(50, "First name must be 50 characters or less")
    ),

    lastName: v.pipe(
        v.string("Last name is required"),
        v.nonEmpty("Last name is required"),
        v.maxLength(50, "Last name must be 50 characters or less")
    ),

    phone: v.pipe(
        v.string("Phone number is required"),
        v.nonEmpty("Phone number is required"),
        v.regex(
            /^\+1[0-9]{10}$/,
            "Invalid Canadian phone number (must be +1 followed by 10 digits)"
        )
    ),

    corporationNumber: v.pipe(
        v.string("Corporation number is required"),
        v.nonEmpty("Corporation number is required"),
        v.length(9, "Corporation number must be exactly 9 characters")
    )
});

export type OnboardingUserData = v.InferOutput<typeof onboardingUserSchema>;
