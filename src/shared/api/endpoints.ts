export const API_BASE_URL = "https://fe-hometask-api.qa.vault.tryvault.com";

export const API = {
    corporation: {
        validate: (number: string) =>
            `${API_BASE_URL}/corporation-number/${number}`
    },
    profile: {
        submit: `${API_BASE_URL}/profile-details`
    }
} as const;
