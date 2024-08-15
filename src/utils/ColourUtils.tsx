class ColourUtils {
    static getColour(value: number, lowerBound: number = 30, upperBound: number = 90, brightness: number = 255): string {
        if (value <= lowerBound) return 'blue';
        if (value >= upperBound) return 'red';

        const ratio = (value - lowerBound) / (upperBound - lowerBound);
        const red = Math.floor(brightness * ratio);
        const green = 0;
        const blue = Math.floor(brightness * (1 - ratio));

        return `rgb(${red}, ${green}, ${blue})`;
    }

    static getGradientColour(temperature1: number, temperature2: number, lowerBound: number = 30, upperBound: number = 90, brightness: number = 255): string {
        // Calculate the average temperature
        const averageTemperature = (temperature1 + temperature2) / 2;

        // Use the getColour method to get the color corresponding to the average temperature
        return this.getColour(averageTemperature, lowerBound, upperBound, brightness);

    }
}

export default ColourUtils;
