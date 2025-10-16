import { object, string, type InferOutput } from "valibot";

export const apiErrorResponseSchema = object({
    message: string()
});

export type ApiErrorResponse = InferOutput<typeof apiErrorResponseSchema>;
