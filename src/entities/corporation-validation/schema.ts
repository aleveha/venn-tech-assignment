import { literal, object, string, union, type InferOutput } from "valibot";

export const corporationValidationSchema = union([
    object({
        corporationNumber: string(),
        valid: literal(true)
    }),
    object({
        message: string(),
        valid: literal(false)
    })
]);

export type CorporationValidationResponse = InferOutput<
    typeof corporationValidationSchema
>;
