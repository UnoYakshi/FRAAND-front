import { useHttp } from "../hooks/http.hook";

const API_URL = process.env.REACT_APP_API_URL;
interface LoginCredentials {
  username: string;
  password: string;
}
const useApiService = () => {
  const { loading, request, error, clearError } = useHttp();

  const getItemsWithPagination = async (limit: number, skip: number) => {
    const res = await request(
      `${API_URL}/items/crud/?should_search_in_name=true&should_search_in_description=true&skip=${skip}&limit=${limit}`
    );
    return res;
  };

  const getAllItemsLength = async () => {
    const res = await request(
      `${API_URL}/items/crud/?should_search_in_name=true&should_search_in_description=true`
    );
    return res.length;
  };

  const login = async (credentials: LoginCredentials) => {
    const res = await request(
      `${API_URL}/auth/jwt/login`,
      "POST",
      credentials,
      {
        "Content-type": "application/x-www-form-urlencoded",
      },
      true
    );

    return res;
  };

  return { loading, error, getItemsWithPagination, getAllItemsLength, login };
};

export default useApiService;
