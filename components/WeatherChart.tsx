import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { WeatherData } from '@/components/SearchContext';

interface WeatherChartProps {
  weatherData: WeatherData;
}

export default function WeatherChart({ weatherData }: WeatherChartProps) {
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
    labels: weatherData.hourly.time
      .slice(0, 24)
      .map((time, index) => {
        const localHour = (time.getHours() + 24 - 1) % 24;
        return index % 2 === 0 ? localHour.toString().padStart(2, '0') : '';
      }),
    datasets: [{
      data: weatherData.hourly.temperature.slice(0, 24),
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
    }],
  };

  return (
    <LineChart
      data={{
        legend: ['Today temperature'],
        labels: data.labels,
        datasets: [{
          data: Array.from(data.datasets[0].data), // Convert Float32Array to regular array
          color: data.datasets[0].color
        }]
      }}
      width={screenWidth}
      yAxisSuffix="°C"
      height={380}
      chartConfig={chartConfig}
      bezier
      fromZero={true}
      style={{opacity: 0.85, marginBottom: 0}}
    />
  );
} 