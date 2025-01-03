import { useState } from 'react';
import { API_URL } from '../App';
import axios from 'axios';

type ApiResponse<T> = T; // Define a generic type for the API response

const useEndpointWithArguments = <T,>() => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const call = async (path: string, args: any) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post<ApiResponse<T>>(`${API_URL}${path}`, args);
            setData(response.data);
            return response.data;
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Error fetching data');
            } else {
                setError('Unexpected error occurred');
            }
            throw err; // Re-throw to allow handling in the component
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, call };
};

export default useEndpointWithArguments;
