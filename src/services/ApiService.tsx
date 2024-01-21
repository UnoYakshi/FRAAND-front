import { useHttp } from "../hooks/http.hook";

const useApiService = () => {
    const {loading, request, error, clearError} = useHttp();

    const getAllItems = async () => {
        const res = await request('http://134.122.72.107/items/crud/');
        return res
    }

    return {loading, error, getAllItems};
}

export default useApiService;