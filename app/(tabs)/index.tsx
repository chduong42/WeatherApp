import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSearch } from '@/components/SearchContext';
import { fetchWeatherApi } from 'openmeteo';
import { getWeatherDescription, getWeatherIcon, getWeatherColor } from '@/constants/WeatherCode';
import { Fontisto, FontAwesome6, Feather, } from '@expo/vector-icons';


export default function CurrentlyScreen() {
  const { location, error, setError, weatherData, setWeatherData } = useSearch();

  useEffect(() => {
    async function fetchWeather() {
      if (!location) return;
      setError(null);

      try {
        const responses = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", {
          "latitude": location.latitude,
          "longitude": location.longitude,
          "current": ["temperature_2m", "weather_code", "wind_speed_10m"],
          "hourly": ["temperature_2m", "weather_code", "wind_speed_10m"],
          "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min"],
          "timezone": "Europe/Berlin",
          "models": "best_match",
        });

        // Helper function to form time ranges
        const range = (start: number, stop: number, step: number) =>
          Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

        const response = responses[0];
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const current = response.current()!;
        const hourly = response.hourly()!;
        const daily = response.daily()!;

        setWeatherData({
          current: {
            temperature: current.variables(0)!.value(),
            weatherCode: current.variables(1)!.value(),
            windSpeed: current.variables(2)!.value(),
          },
          hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
              (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature: hourly.variables(0)!.valuesArray()!,
            weatherCode: hourly.variables(1)!.valuesArray()!,
            windSpeed: hourly.variables(2)!.valuesArray()!,
          },
          daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
              (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            weatherCode: daily.variables(0)!.valuesArray()!,
            temperatureMax: daily.variables(1)!.valuesArray()!,
            temperatureMin: daily.variables(2)!.valuesArray()!,
          },
        });
      } catch (err) {
        setError("The service connection is lost, please check your internet connection or try again later.");
        setWeatherData(null);
      }
    }

    fetchWeather();
  }, [location]);

  return (
    <View style={styles.container}>
      {error ?
        <Text style={styles.error}>{error}</Text>
        :
        <View style={styles.locationContainer}>
          {weatherData && (
            <>
              <View style={styles.locationText}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: "#fff" }}>{location?.name}</Text>
                <Text style={styles.location}>{location?.admin1}, {location?.country}</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 40 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <FontAwesome6 name="temperature-half" size={30} color="#f8f8f8" />
                  <Text style={{ fontSize: 26, color: '#f8f8f8' }}>
                    {weatherData.current.temperature.toFixed(1)}°C
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Feather name="wind" size={30} color="#7fddfa" />
                  <Text style={{ fontSize: 26, color: '#f8f8f8' }}>{weatherData.current.windSpeed.toFixed(1)} km/h</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <Fontisto size={150}
                  name={getWeatherIcon(weatherData.current.weatherCode)}
                  color={getWeatherColor(weatherData.current.weatherCode)}
                />
                <Text style={styles.description}>{getWeatherDescription(weatherData.current.weatherCode)}</Text>
              </View>

            </>
          )}
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  locationContainer: {
    alignItems: 'center',
    gap: 40,
  },
  locationText: {
    alignItems: 'center',
    gap: 5,
  },
  weatherContainer: {
    alignItems: 'center',
    padding: 20,
  },
  location: {
    fontSize: 24,
    fontWeight: '500',
    color: '#fff',
  },
  description: {
    fontSize: 30,
    textTransform: 'capitalize',
    color: '#fff',
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
});
