import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { WeatherData } from '@/components/SearchContext';

interface WeeklyChartProps {
    weatherData: WeatherData;
}

export default function WeeklyChart({ weatherData }: WeeklyChartProps) {
    const screenWidth = Dimensions.get("window").width;

    const chartConfig = {
        backgroundColor: "#000000",
        backgroundGradientFrom: "#000000",
        backgroundGradientTo: "#000000",
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2,
        decimalPlaces: 1,
        propsForBackgroundLines: {
            stroke: "#333333",
            strokeWidth: 1,
            strokeDasharray: [],
        }
    };

    const data = {
        labels: weatherData.daily.time.map((time, index) => {
            return time.toLocaleDateString('fr-FR', { weekday: 'short' });
        }),
        datasets: [{
            data: weatherData.daily.temperatureMax,
            color: (opacity = 1) => `rgba(255, 99, 99, ${opacity})`
        }, {
            data: weatherData.daily.temperatureMin,
            color: (opacity = 1) => `rgba(77, 171, 247, ${opacity})`
        }],
    };

    return (
        <LineChart
            data={{
                legend: ['Max', 'Min'],
                labels: data.labels,
                datasets: data.datasets.map(dataset => ({
                    data: Array.from(dataset.data),
                    color: dataset.color
                }))
            }}
            width={screenWidth}
            yAxisSuffix="°C"
            height={400}
            chartConfig={chartConfig}
            bezier
            fromZero={true}
            style={{ opacity: 0.85, marginBottom: 0 }}
        />
    );
} 