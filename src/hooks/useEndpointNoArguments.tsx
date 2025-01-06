import { useState, useEffect } from 'react';
import { API_URL } from '../App';
import axios from 'axios';

type ApiResponse<T> = T; // Define a generic type for the API response

const useEndpointNoArguments = <T,>(path: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('Ok');

    useEffect(() => {
        console.info("Fetching data from " + API_URL + "/" + path);
        const fetchData = async () => {
            try {
                const response = await axios.get<ApiResponse<T>>(`${API_URL}/${path}`);
                setData(response.data);
            } catch (err: unknown) {
                if (axios.isAxiosError(err) && err.response) {
                    setError(err.response.data.message || 'Error fetching data');
                } else {
                    setError('Unexpected error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [path]);

    return { data, loading, error };
};

export default useEndpointNoArguments;


/**
 * Fetches data from a given endpoint.
 * @param path - API path to fetch data from.
 * @returns The fetched data or throws an error.
 */
export const FetchEndpoint = async <T,>(path: string): Promise<T> => {
    try {
        const response = await axios.get<T>(`${API_URL}/${path}`);
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
            throw new Error(err.response.data.message || 'Error fetching data');
        }
        throw new Error('Unexpected error occurred');
    }
};