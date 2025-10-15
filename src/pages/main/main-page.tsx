import { OnboardingForm } from "@/widgets/onboarding-form";

// The onboarding form should probably be used in onboarding page; for this task it's used in the main page
export const MainPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <OnboardingForm />
        </div>
    );
};
