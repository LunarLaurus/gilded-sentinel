import { TemperatureRecord } from '../../../types/TemperatureRecordInterfaces';
import { API_URL } from '../../../App';

class TemperatureDataFetcher {
    static async fetchTemperatureData(id: string): Promise<TemperatureRecord[]> {
        const response = await fetch(`${API_URL}/temperature/${id}`);
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
}

export default TemperatureDataFetcher;
