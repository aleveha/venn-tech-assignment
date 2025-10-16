import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { OnboardingForm } from "./onboarding-form";

vi.mock("sonner", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}));

describe("OnboardingForm", () => {
    describe("Form Rendering", () => {
        it("should render all form fields", () => {
            render(<OnboardingForm />);

            expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
            expect(
                screen.getByLabelText(/corporation number/i)
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", { name: /submit/i })
            ).toBeInTheDocument();
        });

        it("should have proper placeholders", () => {
            render(<OnboardingForm />);

            expect(screen.getByPlaceholderText("John")).toBeInTheDocument();
            expect(screen.getByPlaceholderText("Doe")).toBeInTheDocument();
            expect(
                screen.getByPlaceholderText("+1 (234) 567-8900")
            ).toBeInTheDocument();
            expect(
                screen.getByPlaceholderText("123456789")
            ).toBeInTheDocument();
        });
    });

    describe("First Name Validation", () => {
        it("should show error when first name is empty on blur", async () => {
            const user = userEvent.setup();
            render(<OnboardingForm />);

            const firstNameInput = screen.getByLabelText(/first name/i);
            await user.click(firstNameInput);
            await user.tab();

            await waitFor(() => {
                expect(
                    screen.getByText(/first name is required/i)
                ).toBeInTheDocument();
            });
        });

        it("should show error when first name exceeds 50 characters", async () => {
            const user = userEvent.setup();
            render(<OnboardingForm />);

            const firstNameInput = screen.getByLabelText(/first name/i);
            await user.type(
                firstNameInput,
                "This is a very long name that exceeds fifty characters"
            );
            await user.tab();

            await waitFor(() => {
                expect(
                    screen.getByText(
                        /first name must be 50 characters or less/i
                    )
                ).toBeInTheDocument();
            });
        });

        it("should accept valid first name", async () => {
            const user = userEvent.setup();
            render(<OnboardingForm />);

            const firstNameInput = screen.getByLabelText(/first name/i);
            await user.type(firstNameInput, "John");
            await user.tab();

            await waitFor(() => {
                expect(
                    screen.queryByText(/first name is required/i)
                ).not.toBeInTheDocument();
            });
        });
    });

    describe("Last Name Validation", () => {
        it("should show error when last name is empty on blur", async () => {
            const user = userEvent.setup();
            render(<OnboardingForm />);

            const lastNameInput = screen.getByLabelText(/last name/i);
            await user.click(lastNameInput);
            await user.tab();

            await waitFor(() => {
                expect(
                    screen.getByText(/last name is required/i)
                ).toBeInTheDocument();
            });
        });

        it("should show error when last name exceeds 50 characters", async () => {
            const user = userEvent.setup();
            render(<OnboardingForm />);

            const lastNameInput = screen.getByLabelText(/last name/i);
            await user.type(
                lastNameInput,
                "This is a very long surname that definitely exceeds fifty characters"
            );
            await user.tab();

            await waitFor(() => {
                expect(
                    screen.getByText(/last name must be 50 characters or less/i)
                ).toBeInTheDocument();
            });
        });
    });

    describe("Phone Number Validation", () => {
        it("should show error when phone is empty on blur", async () => {
            const user = userEvent.setup();
            render(<OnboardingForm />);

            const phoneInput = screen.getByLabelText(/phone number/i);
            await user.click(phoneInput);
            await user.tab();

            await waitFor(() => {
                expect(
                    screen.getByText(/phone number is required/i)
                ).toBeInTheDocument();
            });
        });

        it("should show error for invalid phone format", async () => {
            const user = userEvent.setup();
            render(<OnboardingForm />);

            const phoneInput = screen.getByLabelText(/phone number/i);
            await user.type(phoneInput, "1234567890");
            await user.tab();

            await waitFor(() => {
                expect(
                    screen.getByText(/invalid canadian phone number/i)
                ).toBeInTheDocument();
            });
        });

        it("should accept valid Canadian phone number", async () => {
            const user = userEvent.setup();
            render(<OnboardingForm />);

            const phoneInput = screen.getByLabelText(/phone number/i);
            await user.type(phoneInput, "+13062776103");
            await user.tab();

            await waitFor(() => {
                expect(
                    screen.queryByText(/invalid canadian phone number/i)
                ).not.toBeInTheDocument();
            });
        });
    });

    describe("Corporation Number Validation", () => {
        it("should show error when corporation number is empty on blur", async () => {
            const user = userEvent.setup();
            render(<OnboardingForm />);

            const corpInput = screen.getByLabelText(/corporation number/i);
            await user.click(corpInput);
            await user.tab();

            await waitFor(() => {
                expect(
                    screen.getByText(/corporation number is required/i)
                ).toBeInTheDocument();
            });
        });

        it("should show error when corporation number is not 9 characters", async () => {
            const user = userEvent.setup();
            render(<OnboardingForm />);

            const corpInput = screen.getByLabelText(/corporation number/i);
            await user.type(corpInput, "12345");
            await user.tab();

            await waitFor(() => {
                expect(
                    screen.getByText(
                        /corporation number must be exactly 9 characters/i
                    )
                ).toBeInTheDocument();
            });
        });

        it("should show error for invalid corporation number (API validation)", async () => {
            const user = userEvent.setup();
            render(<OnboardingForm />);

            const corpInput = screen.getByLabelText(/corporation number/i);
            await user.type(corpInput, "999999999");
            await user.tab();

            await waitFor(
                () => {
                    expect(
                        screen.getByText(/corporation number is invalid/i)
                    ).toBeInTheDocument();
                },
                { timeout: 3000 }
            );
        });

        it("should accept valid corporation number (API validation)", async () => {
            const user = userEvent.setup();
            render(<OnboardingForm />);

            const corpInput = screen.getByLabelText(/corporation number/i);
            await user.type(corpInput, "826417395");
            await user.tab();

            await waitFor(
                () => {
                    expect(
                        screen.queryByText(/corporation number is invalid/i)
                    ).not.toBeInTheDocument();
                },
                { timeout: 3000 }
            );
        });
    });

    describe("Form Submission", () => {
        it("should show all validation errors on submit with empty form", async () => {
            const user = userEvent.setup();
            render(<OnboardingForm />);

            const submitButton = screen.getByRole("button", {
                name: /submit/i
            });
            await user.click(submitButton);

            await waitFor(() => {
                expect(
                    screen.getByText(/first name is required/i)
                ).toBeInTheDocument();
                expect(
                    screen.getByText(/last name is required/i)
                ).toBeInTheDocument();
                expect(
                    screen.getByText(/phone number is required/i)
                ).toBeInTheDocument();
                expect(
                    screen.getByText(/corporation number is required/i)
                ).toBeInTheDocument();
            });
        });

        it("should successfully submit valid form", async () => {
            const user = userEvent.setup();
            const { toast } = await import("sonner");

            render(<OnboardingForm />);

            await user.type(screen.getByLabelText(/first name/i), "John");
            await user.type(screen.getByLabelText(/last name/i), "Doe");
            await user.type(
                screen.getByLabelText(/phone number/i),
                "+13062776103"
            );
            await user.type(
                screen.getByLabelText(/corporation number/i),
                "826417395"
            );

            await user.click(screen.getByRole("button", { name: /submit/i }));

            await waitFor(
                () => {
                    expect(toast.success).toHaveBeenCalledWith(
                        "Profile submitted successfully"
                    );
                },
                { timeout: 5000 }
            );
        });

        it("should not submit with invalid corporation number", async () => {
            const user = userEvent.setup();
            render(<OnboardingForm />);

            await user.type(screen.getByLabelText(/first name/i), "John");
            await user.type(screen.getByLabelText(/last name/i), "Doe");
            await user.type(
                screen.getByLabelText(/phone number/i),
                "+13062776103"
            );
            await user.type(
                screen.getByLabelText(/corporation number/i),
                "999999999"
            );
            await user.tab();

            await waitFor(
                () => {
                    expect(
                        screen.getByText(/corporation number is invalid/i)
                    ).toBeInTheDocument();
                },
                { timeout: 3000 }
            );

            const submitButton = screen.getByRole("button", {
                name: /submit/i
            });
            expect(submitButton).toBeInTheDocument();
        });

        it("should show error toast when backend returns error", async () => {
            const user = userEvent.setup();
            const { toast } = await import("sonner");
            const { server } = await import("@/test/mocks/server");
            const { http, HttpResponse } = await import("msw");
            const { API_BASE_URL } = await import("@/shared/api");

            server.use(
                http.post(`${API_BASE_URL}/profile-details`, () => {
                    return HttpResponse.json(
                        { message: "Invalid phone number" },
                        { status: 400 }
                    );
                })
            );

            render(<OnboardingForm />);

            await user.type(screen.getByLabelText(/first name/i), "John");
            await user.type(screen.getByLabelText(/last name/i), "Doe");
            await user.type(
                screen.getByLabelText(/phone number/i),
                "+13062776103"
            );
            await user.type(
                screen.getByLabelText(/corporation number/i),
                "826417395"
            );

            await user.click(screen.getByRole("button", { name: /submit/i }));

            await waitFor(
                () => {
                    expect(toast.error).toHaveBeenCalledWith(
                        "Invalid phone number"
                    );
                },
                { timeout: 3000 }
            );
        });
    });

    describe("Accessibility", () => {
        it("should have proper aria-invalid attributes on error", async () => {
            const user = userEvent.setup();
            render(<OnboardingForm />);

            const firstNameInput = screen.getByLabelText(/first name/i);
            await user.click(firstNameInput);
            await user.tab();

            await waitFor(() => {
                expect(firstNameInput).toHaveAttribute("aria-invalid", "true");
            });
        });

        it("should associate labels with inputs", () => {
            render(<OnboardingForm />);

            const firstNameInput = screen.getByLabelText(/first name/i);
            const lastNameInput = screen.getByLabelText(/last name/i);
            const phoneInput = screen.getByLabelText(/phone number/i);
            const corpInput = screen.getByLabelText(/corporation number/i);

            expect(firstNameInput).toHaveAttribute("id", "firstName");
            expect(lastNameInput).toHaveAttribute("id", "lastName");
            expect(phoneInput).toHaveAttribute("id", "phone");
            expect(corpInput).toHaveAttribute("id", "corporationNumber");
        });
    });
});
