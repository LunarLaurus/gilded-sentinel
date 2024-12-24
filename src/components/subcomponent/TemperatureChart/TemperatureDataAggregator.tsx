import { TemperatureRecord } from '../../../types/TemperatureRecordInterfaces';

interface AggregatedTemperatureData {
    temperatureSum: number;
    dataCount: number;
    id: number;
    owner: string;
}

class TemperatureDataAggregator {
    /**
     * Aggregates temperature records based on a dynamic interval.
     * @param records Array of temperature records to be aggregated.
     * @param intervalMs Milliseconds for each aggregation interval.
     * @param totalTimeSpanMs Total time span (in milliseconds) to help adjust interval.
     */
    static aggregateTemperatureData(records: TemperatureRecord[], intervalMs: number, totalTimeSpanMs: number): TemperatureRecord[] {
        const aggregatedRecords: Record<number, AggregatedTemperatureData> = {};

        // Adjust interval dynamically based on total time span
        const adjustedIntervalMs = this.getDynamicInterval(totalTimeSpanMs, intervalMs);

        records.forEach(record => {
            const recordTimestampMs = new Date(record.timestamp).getTime();
            const intervalStart = Math.floor(recordTimestampMs / adjustedIntervalMs) * adjustedIntervalMs;

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

    /**
     * Determines an appropriate aggregation interval based on the total time span.
     * For long periods, this increases the granularity to avoid overloading charts.
     * @param totalTimeSpanMs Total time span in milliseconds (e.g., 7 days, 30 days).
     * @param baseIntervalMs Base interval in milliseconds.
     */
    private static getDynamicInterval(totalTimeSpanMs: number, baseIntervalMs: number): number {
        const ONE_DAY_MS = 24 * 60 * 60 * 1000; // One day in milliseconds
        const SEVEN_DAYS_MS = 7 * ONE_DAY_MS; // One week in milliseconds
        const THIRTY_DAYS_MS = 30 * ONE_DAY_MS; // One month in milliseconds

        if (totalTimeSpanMs >= THIRTY_DAYS_MS) {
            return 6 * 60 * 60 * 1000; // Aggregate by 6 hours for large spans like 30 days
        } else if (totalTimeSpanMs >= SEVEN_DAYS_MS) {
            return 3 * 60 * 60 * 1000; // Aggregate by 3 hours for medium spans like 7 days
        } else {
            return baseIntervalMs; // Use the base interval for short spans like minutes or hours
        }
    }
}

export default TemperatureDataAggregator;
