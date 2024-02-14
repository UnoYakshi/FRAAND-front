import { useHttp } from "../hooks/http.hook";

const API_URL = process.env.REACT_APP_API_URL;
const useApiService = () => {
  const { loading, request, error, clearError } = useHttp();

  const getAllItems = async (limit: number) => {
    const res = await request(
      `${API_URL}/items/crud/?should_search_in_name=true&should_search_in_description=true&skip=0&limit=${limit}`
    );
    return res;
  };

  return { loading, error, getAllItems };
};

export default useApiService;
