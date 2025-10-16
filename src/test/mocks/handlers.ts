import { API_BASE_URL } from "@/shared/api";
import { http, HttpResponse } from "msw";

const VALID_CORPORATION_NUMBERS = [
    "826417395",
    "158739264",
    "123456789",
    "591863427",
    "312574689",
    "265398741",
    "762354918",
    "468721395",
    "624719583"
];

export const handlers = [
    http.get(`${API_BASE_URL}/corporation-number/:number`, ({ params }) => {
        const { number } = params;

        if (VALID_CORPORATION_NUMBERS.includes(number as string)) {
            return HttpResponse.json({
                corporationNumber: number,
                valid: true
            });
        }

        return HttpResponse.json({
            valid: false,
            message: "Invalid corporation number"
        });
    }),

    http.post(`${API_BASE_URL}/profile-details`, async ({ request }) => {
        const body = await request.json();

        if (
            !body ||
            typeof body !== "object" ||
            !("firstName" in body) ||
            !("lastName" in body) ||
            !("phone" in body) ||
            !("corporationNumber" in body)
        ) {
            return HttpResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        if (!/^\+1[0-9]{10}$/.test(body.phone)) {
            return HttpResponse.json(
                { message: "Invalid phone number" },
                { status: 400 }
            );
        }

        return HttpResponse.json({}, { status: 200 });
    })
];
