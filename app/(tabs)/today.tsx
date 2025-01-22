import { View, Text, StyleSheet } from 'react-native';
import { useSearch } from '@/components/SearchContext';
import ScrollWeather from '@/components/ScrollWeather';
import WeatherChart from '@/components/WeatherChart';

export default function TodayScreen() {
  const { location, weatherData, error } = useSearch();

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <View>
          <View style={styles.locationContainer}>
            <Text style={styles.city}>{location?.name}</Text>
            <Text style={styles.location}>{location?.admin1}, {location?.country}</Text>
          </View>

          {weatherData && (
            <>
              <WeatherChart weatherData={weatherData} />
              <ScrollWeather weatherData={weatherData} />
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  locationContainer: {
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#c70202',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  location: {
    fontSize: 16,
    color: '#ffffff',
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
});
