import { API_BASE_URL } from "@/shared/api";
import { server } from "@/test/mocks/server";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { validateCorporation } from "./validate-corporation";

describe("validateCorporation", () => {
    it("should return true for valid corporation number", async () => {
        server.use(
            http.get(`${API_BASE_URL}/corporation-number/:number`, () => {
                return HttpResponse.json({
                    corporationNumber: "123456789",
                    valid: true
                });
            })
        );

        const result = await validateCorporation("123456789");
        expect(result).toBe(true);
    });

    it("should return false for invalid corporation number", async () => {
        server.use(
            http.get(`${API_BASE_URL}/corporation-number/:number`, () => {
                return HttpResponse.json({
                    valid: false,
                    message: "Invalid corporation number"
                });
            })
        );

        const result = await validateCorporation("999999999");
        expect(result).toBe(false);
    });

    it("should return false when API returns non-ok response", async () => {
        server.use(
            http.get(`${API_BASE_URL}/corporation-number/:number`, () => {
                return new HttpResponse(null, { status: 500 });
            })
        );

        const result = await validateCorporation("500ERROR1");
        expect(result).toBe(false);
    });

    it("should return false when API returns invalid response format", async () => {
        server.use(
            http.get(`${API_BASE_URL}/corporation-number/:number`, () => {
                return HttpResponse.json({
                    invalidField: "some value"
                });
            })
        );

        const result = await validateCorporation("INVALID01");
        expect(result).toBe(false);
    });

    it("should return false and handle network errors", async () => {
        server.use(
            http.get(`${API_BASE_URL}/corporation-number/:number`, () => {
                return HttpResponse.error();
            })
        );

        const result = await validateCorporation("NETERROR");
        expect(result).toBe(false);
    });

    it("should cache validation results", async () => {
        let callCount = 0;
        server.use(
            http.get(`${API_BASE_URL}/corporation-number/:number`, () => {
                callCount++;
                return HttpResponse.json({
                    corporationNumber: "CACHETEST",
                    valid: true
                });
            })
        );

        await validateCorporation("CACHETEST");
        await validateCorporation("CACHETEST");

        expect(callCount).toBe(1);
    });
});
