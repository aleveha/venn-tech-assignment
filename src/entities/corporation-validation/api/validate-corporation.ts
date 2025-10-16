import { API } from "@/shared/api";
import { safeParseAsync } from "valibot";
import { corporationValidationSchema } from "../schema";

const cache = new Map<string, boolean>();

export const validateCorporation = async (number: string): Promise<boolean> => {
    const cached = cache.get(number);
    if (cached !== undefined) {
        return cached;
    }

    try {
        const response = await fetch(API.corporation.validate(number));

        if (!response.ok) {
            cache.set(number, false);
            return false;
        }

        const result = await response.json();

        const parsedResult = await safeParseAsync(
            corporationValidationSchema,
            result
        );

        if (!parsedResult.success) {
            cache.set(number, false);
            return false;
        }

        cache.set(number, parsedResult.output.valid);
        return parsedResult.output.valid;
    } catch (error) {
        console.error("Corporation validation error:", error);
        cache.set(number, false);
        return false;
    }
};
