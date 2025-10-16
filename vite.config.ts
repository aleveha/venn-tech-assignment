import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        react(),
        // @ts-expect-error -- type error expected, tailwindcss works fine
        tailwindcss()
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/test/setup.ts",
        css: true,
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            include: ["src/**/*.{ts,tsx}"],
            exclude: [
                "src/**/*.test.{ts,tsx}",
                "src/test/**",
                "src/main.tsx",
                "src/**/*.d.ts",
                "src/components/ui/**"
            ]
        }
    }
});
