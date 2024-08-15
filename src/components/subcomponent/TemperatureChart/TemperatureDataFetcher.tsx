import { TemperatureRecord } from '../../../types/TemperatureRecordInterfaces';
import { API_URL } from '../../../App';

class TemperatureDataFetcher {
    static async fetchTemperatureData(id: string): Promise<TemperatureRecord[]> {
        const response = await fetch(`${API_URL}/temperature/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
}

export default TemperatureDataFetcher;
