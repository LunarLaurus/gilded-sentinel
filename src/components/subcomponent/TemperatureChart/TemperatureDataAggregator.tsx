import { TemperatureRecord } from '../../../types/TemperatureRecordInterfaces';

interface AggregatedData {
    sum: number;
    count: number;
}

class TemperatureDataAggregator {
    static aggregateData(data: TemperatureRecord[], intervalMs: number): TemperatureRecord[] {
        // Using Record type for better readability
        const aggregated: Record<number, AggregatedData> = {};

        data.forEach(record => {
            const recordTime = new Date(record.timestamp).getTime();
            const intervalStart = Math.floor(recordTime / intervalMs) * intervalMs;

            if (!aggregated[intervalStart]) {
                aggregated[intervalStart] = { sum: 0, count: 0 };
            }

            aggregated[intervalStart].sum += record.temperature;
            aggregated[intervalStart].count += 1;
        });

        return Object.entries(aggregated).map(([key, { sum, count }]) => ({
            timestamp: new Date(Number(key)).toISOString(),
            temperature: sum / count
        }));
    }
}

export default TemperatureDataAggregator;
