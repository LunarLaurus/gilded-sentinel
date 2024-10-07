import React, { useState, useEffect, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { TemperatureRecord } from '../../../types/TemperatureRecordInterfaces';
import TabButtons from '../../tabs/TabButtons';
import TemperatureDataFetcher from './TemperatureDataFetcher';
import { generateChartData, generateChartOptions } from '../../../utils/ChartUtils';

Chart.register(...registerables);

const TAB_INTERVAL_OPTIONS = ['Last Minute', '5 Minutes', '60 Minutes', '6 Hours', '24 Hours', '7 Days', '30 Days', '1 Year'];

interface TemperatureChartProps {
    id: string;
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ id }) => {

    const [temperatureRecords, setTemperatureRecords] = useState<TemperatureRecord[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [selectedTimeInterval, setSelectedTimeInterval] = useState(TAB_INTERVAL_OPTIONS[0]);

    const fetchTemperatureRecords = useCallback(() => {
        TemperatureDataFetcher.fetchTemperatureData(id, selectedTimeInterval)
            .then(fetchedData => setTemperatureRecords(fetchedData))
            .catch(fetchErr => setFetchError(fetchErr.message));
    }, [id, selectedTimeInterval]);

    const temperatureChartData = generateChartData(temperatureRecords, selectedTimeInterval);
    const isValidChartData = temperatureChartData?.datasets?.[0]?.data?.length > 0;

    let minTemperature = 10;
    let maxTemperature = 110;

    if (isValidChartData) {
        const temperatures = temperatureChartData.datasets[0].data as number[]; // Ensure data is numeric
        minTemperature = Math.floor(Math.min(...temperatures) / 10) * 10;
        maxTemperature = Math.ceil(Math.max(...temperatures) / 10) * 10;

        // Ensure the range is balanced if maxTemperature is close to minTemperature
        if (maxTemperature - minTemperature <= 15) {
            maxTemperature = minTemperature + 20;
        }
    } else {
        console.warn("No valid temperature data available to calculate minTemperature and maxTemperature.");
    }

    const chartOptions = generateChartOptions({ fixedYAxisRange: true, yAxisMin: minTemperature, yAxisMax: maxTemperature }, selectedTimeInterval);

    useEffect(() => {
        const intervalMapping: { [key: string]: number } = {
            'Last Minute': 5000,
            '5 Minutes': 15000,
            '60 Minutes': 15000,
            '6 Hours': 60000,
            '24 Hours': 60000,
            '7 Days': 60000 * 60 * 6,
            '30 Days': 60000 * 60 * 6,
        };

        const intervalDuration = intervalMapping[selectedTimeInterval];
        let fetchIntervalId: NodeJS.Timeout | null = null;

        fetchTemperatureRecords();

        if (intervalDuration) {
            fetchIntervalId = setInterval(fetchTemperatureRecords, intervalDuration);
        }

        return () => {
            if (fetchIntervalId) clearInterval(fetchIntervalId);
        };
    }, [selectedTimeInterval, fetchTemperatureRecords]);

    if (fetchError) {
        return (
            <div>
                <p>Error loading temperature data: {fetchError}</p>
                <button onClick={fetchTemperatureRecords}>Retry</button>
            </div>
        );
    }

    return (
        <div>
            <TabButtons selectedTab={selectedTimeInterval} onTabSelect={setSelectedTimeInterval} tabs={TAB_INTERVAL_OPTIONS} />
            <Line data={temperatureChartData} options={chartOptions} />
        </div>
    );
};

export default TemperatureChart;
