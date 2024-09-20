import { TemperatureRecord } from '../../../types/TemperatureRecordInterfaces';

interface AggregatedTemperatureData {
    temperatureSum: number;
    dataCount: number;
    id: number;
    owner: string;
}

class TemperatureDataAggregator {
    static aggregateTemperatureData(records: TemperatureRecord[], intervalMs: number): TemperatureRecord[] {
        const aggregatedRecords: Record<number, AggregatedTemperatureData> = {};

        records.forEach(record => {
            const recordTimestampMs = new Date(record.timestamp).getTime();
            const intervalStart = Math.floor(recordTimestampMs / intervalMs) * intervalMs;

            if (!aggregatedRecords[intervalStart]) {
                aggregatedRecords[intervalStart] = {
                    temperatureSum: 0,
                    dataCount: 0,
                    id: record.id,
                    owner: record.owner
                };
            }

            aggregatedRecords[intervalStart].temperatureSum += record.temperature;
            aggregatedRecords[intervalStart].dataCount += 1;
        });

        return Object.entries(aggregatedRecords).map(([intervalStart, { temperatureSum, dataCount, id, owner }]) => ({
            id,
            owner,
            timestamp: new Date(Number(intervalStart)).toISOString(),
            temperature: temperatureSum / dataCount
        }));
    }
}

export default TemperatureDataAggregator;
