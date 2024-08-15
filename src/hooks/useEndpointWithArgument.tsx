import { useState, useEffect } from 'react';
import { API_URL } from '../App';
import axios from 'axios';

type ApiResponse<T> = T; // Define a generic type for the API response

const useEndpointWithArgument = <T,>(path: string, id: string | undefined) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            console.info("ID is not provided, skipping fetch");
            setLoading(false); // Set loading to false if no ID is provided
            return;
        }

        console.info("Trying to lookup " + id);
        console.info("Fetching data from " + `${API_URL}/${path}/${id}`); // Correct URL construction

        const fetchData = async () => {
            try {
                const response = await axios.get<ApiResponse<T>>(`${API_URL}/${path}/${id}`);
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
    }, [path, id]);

    return { data, loading, error };
};

export default useEndpointWithArgument;
