import { TemperatureRecord } from '../../../types/TemperatureRecordInterfaces';
import { API_URL } from '../../../App';

class TemperatureDataFetcher {

    // Reusable fetch function for different intervals
    private static async fetchTemperatureDataByEndpoint(id: string, endpoint: string): Promise<TemperatureRecord[]> {
        const response = await fetch(`${API_URL}/temperature/${id}/${endpoint}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: TemperatureRecord[] = await response.json();

        // Convert timestamp to Date object
        return data.map(record => ({
            ...record,
            timestamp: new Date(record.timestamp).toISOString(), // Ensure correct Date format
        }));
    }

    // Mapping from string intervals to API endpoints
    private static readonly intervalToEndpointMap: { [key: string]: string } = {
        'Last Minute': 'minute',
        '5 Minutes': 'fiveminute',
        '60 Minutes': 'hour',
        '6 Hours': 'sixhour',
        '24 Hours': 'day',
        '7 Days': 'week',
        '30 Days': 'month',
    };

    static async fetchTemperatureData(id: string, selectedTimeInterval: string): Promise<TemperatureRecord[]> {
        const endpoint = TemperatureDataFetcher.intervalToEndpointMap[selectedTimeInterval];
        if (!endpoint) {
            throw new Error(`Invalid time interval: ${selectedTimeInterval}`);
        }
        return TemperatureDataFetcher.fetchTemperatureDataByEndpoint(id, endpoint);
    }
}

export default TemperatureDataFetcher;
