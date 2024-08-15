import { ChartOptions, TooltipItem } from 'chart.js';
import { TemperatureRecord } from '../types/TemperatureRecordInterfaces';
import DataAggregator from '../components/subcomponent/TemperatureChart/TemperatureDataAggregator';
import ColorUtils from '../utils/ColourUtils';

// Define an interface for the options parameters
interface ChartOptionsProps {
    fixedYAxisRange: boolean;
    yAxisMin?: number;
    yAxisMax?: number;
}

export const generateChartOptions = ({
    fixedYAxisRange,
    yAxisMin = 20,
    yAxisMax = 110
}: ChartOptionsProps): ChartOptions<'line'> => {
    return {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context: TooltipItem<'line'>) {
                        const temperature = context.raw as number;
                        return `Temperature: ${temperature.toFixed(1)} °C`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                ...(fixedYAxisRange ? { min: yAxisMin, max: yAxisMax } : {}),
                ticks: {
                    // Customize y-axis ticks if needed
                }
            },
            x: {
                // Optional: Customize x-axis if needed
                // For example, you can set the time scale or other options
            }

        }
    };
};

export const generateChartData = (
    temperatureData: TemperatureRecord[],
    selectedTab: string
) => {
    if (!temperatureData || temperatureData.length === 0) {
        console.warn("No temperature data provided.");
        return {
            labels: [],
            datasets: []
        };
    }

    const processData = (data: TemperatureRecord[], tab: string): TemperatureRecord[] => {
        const intervals = {
            'Last Minute': { timeLimit: 60 * 1000, dataCount: 30 },
            '5 Minutes': { timeLimit: 5 * 60 * 1000, dataCount: 150 },
            '60 Minutes': { timeLimit: 60 * 60 * 1000, intervalMs: 60 * 1000 },
            '6 Hours': { timeLimit: 6 * 60 * 60 * 1000, intervalMs: 15 * 60 * 1000 }, // 15 minutes
            '24 Hours': { timeLimit: 24 * 60 * 60 * 1000, intervalMs: 30 * 60 * 1000 }, // 30 minutes
            '7 days': { timeLimit: 7 * 24 * 60 * 60 * 1000, intervalMs: 6 * 60 * 60 * 1000 }, // 6 hours
            '30 days': { timeLimit: 30 * 24 * 60 * 60 * 1000, intervalMs: 6 * 60 * 60 * 1000 }, // 6 hours
            '1 Year': { timeLimit: 365 * 24 * 60 * 60 * 1000, intervalMs: 7 * 24 * 60 * 60 * 1000 }, // 7 days
        };

        const config = intervals[tab as keyof typeof intervals] || intervals['Last Minute'];

        if (!Array.isArray(data) || data.length === 0) {
            console.warn("Invalid or empty data array.");
            return [];
        }


        const latestRecordTime = new Date(data[data.length - 1].timestamp).getTime();
        console.log("Latest record time:", latestRecordTime);

        const filteredData = data
            .filter(record => {
                if (!record || !record.timestamp) {
                    console.warn("Invalid record detected:", record);
                    return false;
                }
                const recordTime = new Date(record.timestamp).getTime();
                return latestRecordTime - recordTime <= config.timeLimit;
            })
            .sort((a, b) => {
                if (!a.timestamp || !b.timestamp) {
                    console.warn("Record missing timestamp:", a, b);
                    return 0;
                }
                return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
            });

        if ('intervalMs' in config) {
            return DataAggregator.aggregateData(filteredData, config.intervalMs);
        }

        return filteredData;
    };

    try {
        const processedData = processData(temperatureData, selectedTab);

        return {
            labels: processedData.map(record => new Date(record.timestamp).toLocaleTimeString()),
            datasets: [
                {
                    label: '°C',
                    data: processedData.map(record => {
                        if (record?.temperature === undefined) {
                            console.warn("Record missing temperature:", record);
                        }
                        return record?.temperature;
                    }),
                    fill: false,
                    borderColor: processedData.map(record => ColorUtils.getColour(record.temperature)),
                    pointBackpointBorderColorgroundColor: processedData.map(record => ColorUtils.getColour(record.temperature)),
                    backgroundColor: processedData.map(record => ColorUtils.getColour(record.temperature)),
                    pointBackgroundColor: processedData.map(record => ColorUtils.getColour(record.temperature)),
                    borderWidth: 4,
                    pointRadius: 4,

                },
            ],
        };
    } catch (error) {
        console.error("Error generating chart data:", error);
        return {
            labels: [],
            datasets: [],
            options: {}
        };
    }
};
