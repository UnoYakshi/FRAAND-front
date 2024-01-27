import { useHttp } from "../hooks/http.hook";

const useApiService = () => {
    const {loading, request, error, clearError} = useHttp();

    const getAllItems = async (limit: number) => {
        const res = await request(`http://134.122.72.107/items/crud/?should_search_in_name=true&should_search_in_description=true&skip=0&limit=${limit}`);
        return res
    }

    return {loading, error, getAllItems};
}

export default useApiService;