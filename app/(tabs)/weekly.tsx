import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSearch } from '@/components/SearchContext';
import WeeklyChart from '@/components/WeeklyChart';
import WeeklyWeather from '@/components/WeeklyWeather';

export default function WeeklyScreen() {
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
              <WeeklyChart weatherData={weatherData} />
              <WeeklyWeather weatherData={weatherData} />
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