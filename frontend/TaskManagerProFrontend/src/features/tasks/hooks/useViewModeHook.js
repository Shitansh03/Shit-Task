import { useSearchParams } from "react-router-dom";

export const useViewModeHook = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const view = searchParams.get("view") || "grid";

    const setView = (mode) => {
        setSearchParams({ view: mode });
    };

    return { view, setView };
};