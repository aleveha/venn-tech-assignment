import type { OnboardingUserData } from "@/entities/onboarding-user";
import { API_BASE_URL } from "@/shared/api";
import { server } from "@/test/mocks/server";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { submitOnboarding } from "./submit-onboarding";

const validFormData: OnboardingUserData = {
    firstName: "John",
    lastName: "Doe",
    phone: "+13062776103",
    corporationNumber: "826417395"
};

describe("submitOnboarding", () => {
    it("should return success for valid submission", async () => {
        server.use(
            http.post(`${API_BASE_URL}/profile-details`, () => {
                return HttpResponse.json({}, { status: 200 });
            })
        );

        const result = await submitOnboarding(validFormData);

        expect(result.success).toBe(true);
        expect(result.message).toBe("Profile submitted successfully");
    });

    it("should return error for 400 response with message", async () => {
        server.use(
            http.post(`${API_BASE_URL}/profile-details`, () => {
                return HttpResponse.json(
                    { message: "Invalid phone number" },
                    { status: 400 }
                );
            })
        );

        const result = await submitOnboarding(validFormData);

        expect(result.success).toBe(false);
        expect(result.message).toBe("Invalid phone number");
    });

    it("should handle invalid error response format", async () => {
        server.use(
            http.post(`${API_BASE_URL}/profile-details`, () => {
                return HttpResponse.json(
                    { invalidField: "some value" },
                    { status: 400 }
                );
            })
        );

        const result = await submitOnboarding(validFormData);

        expect(result.success).toBe(false);
        expect(result.message).toBe("Failed to submit profile");
    });

    it("should handle network errors", async () => {
        server.use(
            http.post(`${API_BASE_URL}/profile-details`, () => {
                return HttpResponse.error();
            })
        );

        const result = await submitOnboarding(validFormData);

        expect(result.success).toBe(false);
        expect(result.message).toBe(
            "Failed to submit profile. Please try again."
        );
    });

    it("should handle server errors (500)", async () => {
        server.use(
            http.post(`${API_BASE_URL}/profile-details`, () => {
                return HttpResponse.json(
                    { message: "Internal server error" },
                    { status: 500 }
                );
            })
        );

        const result = await submitOnboarding(validFormData);

        expect(result.success).toBe(false);
        expect(result.message).toBe("Internal server error");
    });
});
