import { useHttp } from "../hooks/http.hook";

const API_URL = process.env.REACT_APP_API_URL;
const useApiService = () => {
  const { loading, request, error, clearError } = useHttp();

  const getItemsWithPagination = async (limit: number, skip: number) => {
    const res = await request(
      `${API_URL}/items/crud/?should_search_in_name=true&should_search_in_description=true&skip=${skip}&limit=${limit}`
    );
    return res;
  };

  return { loading, error, getItemsWithPagination };
};

export default useApiService;
