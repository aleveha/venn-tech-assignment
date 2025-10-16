import { MainPage } from "@/pages/main";
import { Toaster } from "sonner";

export const App = () => {
    // Routing should be handled here; for this task it just show the main page
    return (
        <>
            <MainPage />
            <Toaster />
        </>
    );
};
