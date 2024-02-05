import { useCallback, useState } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const request =useCallback(async (url: string, method = 'GET', body = null, headers = {'Content-type': 'application/JSON'}) => {
        setLoading(true);

        try{
            const response = await fetch(url, {method, body, headers});
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();

            setLoading(false);
            return data;
        } catch(e) {
            setLoading(false);
            if (e instanceof Error) {
                // Check if 'e' is an instance of Error
                setError(e.message);
            } else {
                setError("An unknown error occurred");
            }
            throw e;
        }


    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading, error, request, clearError}
}