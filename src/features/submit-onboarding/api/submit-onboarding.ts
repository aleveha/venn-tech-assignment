import type { OnboardingUserData } from "@/entities/onboarding-user";
import { API } from "@/shared/api";
import { safeParseAsync } from "valibot";
import {
    apiErrorResponseSchema,
    type SubmitOnboardingResult
} from "../model/types";

export const submitOnboarding = async (
    data: OnboardingUserData
): Promise<SubmitOnboardingResult> => {
    try {
        const response = await fetch(API.profile.submit, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            return {
                success: true,
                message: "Profile submitted successfully"
            };
        }

        const errorResult = await response.json();
        const parsedError = await safeParseAsync(
            apiErrorResponseSchema,
            errorResult
        );

        if (!parsedError.success) {
            console.error("Unexpected API error response format:", errorResult);
            return {
                success: false,
                message: "Failed to submit profile"
            };
        }

        return {
            success: false,
            message: parsedError.output.message
        };
    } catch (error) {
        console.error("Failed to submit profile:", error);
        return {
            success: false,
            message: "Failed to submit profile. Please try again."
        };
    }
};
