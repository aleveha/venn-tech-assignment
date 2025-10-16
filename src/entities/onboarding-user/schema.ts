import { validateCorporation } from "@/entities/corporation-validation";
import {
    checkAsync,
    length,
    maxLength,
    nonEmpty,
    objectAsync,
    pipe,
    pipeAsync,
    regex,
    string,
    type InferOutput
} from "valibot";

export const onboardingUserSchema = objectAsync({
    firstName: pipe(
        string("First name is required"),
        nonEmpty("First name is required"),
        maxLength(50, "First name must be 50 characters or less")
    ),
    lastName: pipe(
        string("Last name is required"),
        nonEmpty("Last name is required"),
        maxLength(50, "Last name must be 50 characters or less")
    ),
    phone: pipe(
        string("Phone number is required"),
        nonEmpty("Phone number is required"),
        regex(
            /^\+1[0-9]{10}$/,
            "Invalid Canadian phone number (must be +1 followed by 10 digits)"
        )
    ),
    corporationNumber: pipeAsync(
        string("Corporation number is required"),
        nonEmpty("Corporation number is required"),
        length(9, "Corporation number must be exactly 9 characters"),
        checkAsync(validateCorporation, "Corporation number is invalid")
    )
});

export type OnboardingUserData = InferOutput<typeof onboardingUserSchema>;
