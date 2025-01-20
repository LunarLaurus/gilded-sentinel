import { ChartOptions, TooltipItem } from 'chart.js';
import 'chartjs-adapter-moment'; // Ensure moment adapter is imported for time scaling
import { TemperatureRecord } from '../types/TemperatureRecordInterfaces';
import DataAggregator from '../components/subcomponent/TemperatureChart/TemperatureDataAggregator';
import ColourUtils from '../utils/ColourUtils';

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
}: ChartOptionsProps, selectedTab: string): ChartOptions<'line'> => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's local timezone

    const timeUnitMap: { [key: string]: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year' } = {
        'Last Minute': 'second',
        '5 Minutes': 'second',
        '60 Minutes': 'minute',
        '6 Hours': 'minute',
        '24 Hours': 'hour',
        '7 Days': 'day',
        '30 Days': 'day',
        '1 Year': 'month',
    };

    const timeUnit = timeUnitMap[selectedTab] || 'minute'; // Fallback to minute if tab not found

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
                    },
                    title: function (tooltipItems) {
                        const timestamp = tooltipItems[0].parsed.x; // Get the raw timestamp from the tooltip
                        return new Date(timestamp).toLocaleString('en-US', {
                            timeZone: userTimezone, // Ensure the correct timezone (handles DST)
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        });
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
                type: 'time', // Use time scale for x-axis
                time: {
                    unit: timeUnit, // Dynamic time unit based on selected interval
                    tooltipFormat: 'MMM D, YYYY, h:mm:ss a',
                    displayFormats: {
                        second: 'h:mm:ss a',
                        minute: 'h:mm a',
                        hour: 'MMM D, h A',
                        day: 'MMM D',
                        week: 'MMM D',
                        month: 'MMM YYYY',
                        year: 'YYYY'
                    }
                },
                ticks: {
                    callback: function (value) {
                        const date = new Date(value);
                        return date.toLocaleString('en-US', {
                            timeZone: userTimezone, // Ensure tick labels show correct timezone with DST adjustment
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                        });
                    }
                }
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
            'Last Minute': { timeLimit: 60 * 1000, dataCount: 40 }, // 2 seconds
            '5 Minutes': { timeLimit: 5 * 60 * 1000, intervalMs: 1 * 1000 }, // 10 seconds
            '60 Minutes': { timeLimit: 60 * 60 * 1000, intervalMs: 120 * 1000 }, // 2 minute
            '6 Hours': { timeLimit: 6 * 60 * 60 * 1000, intervalMs: 15 * 60 * 1000 }, // 15 minutes
            '24 Hours': { timeLimit: 24 * 60 * 60 * 1000, intervalMs: 30 * 60 * 1000 }, // 30 minutes
            '7 Days': { timeLimit: 7 * 24 * 60 * 60 * 1000, intervalMs: 8 * 60 * 60 * 1000 }, // 6 hours
            '30 Days': { timeLimit: 30 * 24 * 60 * 60 * 1000, intervalMs: 12 * 60 * 60 * 1000 }, // 12 hours
            '1 Year': { timeLimit: 365 * 24 * 60 * 60 * 1000, intervalMs: 7 * 24 * 60 * 60 * 1000 }, // 7 days
        };

        const config = intervals[tab as keyof typeof intervals] || intervals['Last Minute'];

        const latestRecordTime = new Date(data[data.length - 1].timestamp).getTime();
        const filteredData = data
            .filter(record => {
                const recordTime = new Date(record.timestamp).getTime();
                return latestRecordTime - recordTime <= config.timeLimit;
            })
            .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

        // Aggregate data if required
        if ('intervalMs' in config) {
            return DataAggregator.aggregateTemperatureData(filteredData, config.intervalMs, config.timeLimit);
        }

        return filteredData;
    };

    try {
        const processedData = processData(temperatureData, selectedTab);

        return {
            labels: processedData.map(record => new Date(record.timestamp).toISOString()),
            datasets: [
                {
                    label: '°C',
                    data: processedData.map(record => record.temperature),
                    fill: false,
                    borderColor: processedData.map(record => ColourUtils.getColour(record.temperature)),
                    pointBackgroundColor: processedData.map(record => ColourUtils.getColour(record.temperature)),
                    backgroundColor: processedData.map(record => ColourUtils.getColour(record.temperature)),
                    borderWidth: processedData.map(record => record.temperature * 2 / 15),
                    pointRadius: processedData.map(record => record.temperature * 2 / 20),
                },
            ],
        };
    } catch (error) {
        console.error("Error generating chart data:", error);
        return {
            labels: [],
            datasets: []
        };
    }
};
