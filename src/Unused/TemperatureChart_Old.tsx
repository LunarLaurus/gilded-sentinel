import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { API_URL } from '../App';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { TemperatureRecord } from '../types/TemperatureRecordInterfaces';
import TabButtons from '../components/TabButtons';

Chart.register(...registerables);

const TAB_OPTIONS = ['Last Minute', '5 Minutes', '60 Minutes', '6 Hours', '24 Hours', '1 Year'];

interface TemperatureChartProps {
    id: string;
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ id }) => {
    const [temperatureData, setTemperatureData] = useState<TemperatureRecord[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [selectedTab, setSelectedTab] = useState(TAB_OPTIONS[0]);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/temperature/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: TemperatureRecord[] = await response.json();
            setTemperatureData(data);
        } catch (error) {
            setError((error as Error).message);
        }
    }, [id]);

    const aggregateData = useCallback((data: TemperatureRecord[], intervalMs: number) => {
        const aggregated: { [key: number]: { sum: number; count: number } } = {};
        
        for (const record of data) {
            const recordTime = new Date(record.timestamp).getTime();
            const intervalStart = Math.floor(recordTime / intervalMs) * intervalMs;
            
            if (!aggregated[intervalStart]) {
                aggregated[intervalStart] = { sum: 0, count: 0 };
            }
            
            aggregated[intervalStart].sum += record.temperature;
            aggregated[intervalStart].count += 1;
        }

        return Object.entries(aggregated).map(([key, value]) => ({
            timestamp: new Date(Number(key)).toISOString(),
            temperature: value.sum / value.count
        }));
    }, []);

    const updateChartData = useCallback((tab: string, updatedTemperatureData: TemperatureRecord[]) => {
        if (updatedTemperatureData.length === 0) return;

        const latestRecordTime = new Date(updatedTemperatureData[updatedTemperatureData.length - 1].timestamp).getTime();
        let timeLimit: number;
        let dataCount: number;
        let intervalMs: number | null = null;

        switch (tab) {
            case 'Last Minute':
                timeLimit = 60 * 1000; // Last 60 seconds
                dataCount = 30;
                break;
            case '5 Minutes':
                timeLimit = 5 * 60 * 1000; // Last 5 minutes
                dataCount = 30 * 5;
                break;
            case '60 Minutes':
                timeLimit = 60 * 60 * 1000; // Last 60 minutes
                dataCount = 30 * 5 * 12;
                intervalMs = 60 * 1000; // Minutely aggregation
                break;
            case '6 Hours':
                timeLimit = 6 * 60 * 60 * 1000; // Last 6 hours
                dataCount = 30 * 5 * 12 * 6;
                intervalMs = 60 * 60 * 1000; // Hourly aggregation
                break;
            case '24 Hours':
                timeLimit = 24 * 60 * 60 * 1000; // Last 24 hours
                dataCount = 2400;
                intervalMs = 24 * 60 * 60 * 1000; // Daily aggregation
                break;
            case '1 Year':
                timeLimit = 365 * 24 * 60 * 60 * 1000; // Last 1 year
                dataCount = 3650;
                intervalMs = 30 * 24 * 60 * 60 * 1000; // Monthly aggregation
                break;
            default:
                timeLimit = 60 * 1000; // Default to last 60 seconds
                dataCount = 30;
                break;
        }

        const filteredData = updatedTemperatureData
            .filter(record => latestRecordTime - new Date(record.timestamp).getTime() <= timeLimit)
            .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

        const aggregatedData = intervalMs ? aggregateData(filteredData, intervalMs) : filteredData;
        const temperatures = aggregatedData.map(record => record.temperature);
        const times = aggregatedData.map(record => new Date(record.timestamp).toLocaleTimeString());

        setData(temperatures.slice(-dataCount));
        setLabels(times.slice(-dataCount));
    }, [aggregateData]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        // Fetch initial data
        fetchData();

        // Enable polling only for tabs that require it
        if (selectedTab === 'Last Minute' || selectedTab === '5 Minutes' || selectedTab === '60 Minutes') {
            intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId); // Cleanup interval on tab change or component unmount
            }
        };
    }, [selectedTab, fetchData]); // Now fetchData is included in the dependency array

    useEffect(() => {
        if (temperatureData.length > 0) {
            updateChartData(selectedTab, temperatureData);
        }
    }, [temperatureData, selectedTab, updateChartData]);

    const getColor = (value: number, lowerBound: number = 30, upperBound: number = 90, brightness: number = 255): string => {
        if (value <= lowerBound) return 'blue';
        if (value >= upperBound) return 'red';

        const ratio = (value - lowerBound) / (upperBound - lowerBound);
        const red = Math.floor(brightness * ratio);
        const green = 0;
        const blue = Math.floor(brightness * (1 - ratio));

        return `rgb(${red}, ${green}, ${blue})`;
    };

    const chartData = useMemo(() => ({
        labels,
        datasets: [
            {
                label: '°C',
                data,
                fill: false,
                borderColor: data.map(value => getColor(value)),
                backgroundColor: data.map(value => getColor(value)),
                pointBackgroundColor: data.map(value => getColor(value)),
                pointBorderColor: data.map(value => getColor(value)),
                borderWidth: 2,
                pointRadius: 4,
            },
        ],
    }), [data, labels]);

    if (error) {
        return <div>Error loading temperature data: {error}</div>;
    }

    return (
        <div>
            <TabButtons selectedTab={selectedTab} onTabSelect={setSelectedTab} tabs={TAB_OPTIONS} />
            <Line data={chartData} />
        </div>
    );
};

export default TemperatureChart;
