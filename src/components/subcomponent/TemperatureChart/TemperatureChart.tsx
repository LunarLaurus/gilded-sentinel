import React, { useState, useEffect, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { TemperatureRecord } from '../../../types/TemperatureRecordInterfaces';
import TabButtons from '../../TabButtons';
import TemperatureDataFetcher from './TemperatureDataFetcher';
import { generateChartData, generateChartOptions } from '../../../utils/ChartUtils';

Chart.register(...registerables);

const TAB_OPTIONS = ['Last Minute', '5 Minutes', '60 Minutes', '6 Hours', '24 Hours', '7 Days', '30 Days', '1 Year'];

interface TemperatureChartProps {
    id: string;
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ id }) => {

    const [temperatureData, setTemperatureData] = useState<TemperatureRecord[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState(TAB_OPTIONS[0]);
    const fetchData = useCallback(() => {
        TemperatureDataFetcher.fetchTemperatureData(id)
            .then(data => setTemperatureData(data))
            .catch(err => setError(err.message));
    }, [id]);

    const chartData = generateChartData(temperatureData, selectedTab);
    const hasValidData = chartData.datasets && chartData.datasets.length > 0 && chartData.datasets[0].data.length > 0;
    let minTemp = 10;
    let maxTemp = 110;
    if (hasValidData) {
        minTemp = Math.floor(Math.min(...chartData.datasets[0].data) / 10) * 10;
        maxTemp = Math.ceil(Math.max(...chartData.datasets[0].data) / 10) * 10;
    } else {
        console.warn("No valid data available to calculate minTemp and maxTemp.");
    }
    const chartOptions = generateChartOptions({ fixedYAxisRange: true, yAxisMin: minTemp, yAxisMax: maxTemp });

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;
        fetchData();
        if (selectedTab === 'Last Minute') {
            intervalId = setInterval(fetchData, 5000);
        }
        if (selectedTab === '5 Minutes' || selectedTab === '60 Minutes') {
            intervalId = setInterval(fetchData, 15000);
        }
        if (selectedTab === '6 Hours' || selectedTab === '24 Hours') {
            intervalId = setInterval(fetchData, 60000);
        }
        if (selectedTab === '7 Days' || selectedTab === '30 Days') {
            intervalId = setInterval(fetchData, 60000 * 60 * 6);
        }
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [selectedTab, fetchData]);
    if (error) {
        return <div>Error loading temperature data: {error}</div>;
    }
    return (
        <div>
            <TabButtons selectedTab={selectedTab} onTabSelect={setSelectedTab} tabs={TAB_OPTIONS} />
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default TemperatureChart;
