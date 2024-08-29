import axios from "axios";
import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const request = useCallback(
    async (
      url: string,
      method = "GET",
      body: any = null,
      headers: {} = { "Content-type": "application/JSON" },
      withCredentials = false
    ) => {
      setLoading(true);

      try {
        const response = await axios({
          url,
          method,
          data: body,
          headers,
          withCredentials,
        });

        setLoading(false);
        return response.data;
      } catch (e) {
        setLoading(false);
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred");
        }
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError };
};
