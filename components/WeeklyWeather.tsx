import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { getWeatherIcon, getWeatherColor } from '@/constants/WeatherCode';
import { WeatherData } from '@/components/SearchContext';

interface WeeklyWeatherProps {
    weatherData: WeatherData;
}

export default function WeeklyWeather({ weatherData }: WeeklyWeatherProps) {
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} persistentScrollbar={true} indicatorStyle={'white'}>
            {weatherData.daily.time.map((time, index) => (
                <View key={time.getTime()} style={styles.dailyItem}>
                    <Text style={styles.dayText}>
                        {time.toLocaleDateString('fr-FR', { weekday: 'short' })}
                    </Text>

                    <Fontisto
                        size={40}
                        name={getWeatherIcon(weatherData.daily.weatherCode[index])}
                        color={getWeatherColor(weatherData.daily.weatherCode[index])}
                    />

                    <View style={styles.temperatureContainer}>
                        <Text style={[styles.temperatureMax, {fontSize: 20}]}>
                            {weatherData.daily.temperatureMax[index].toFixed(1)}°
                        </Text>
                        <Text style={[styles.temperatureMin, {fontSize: 20}]}>
                            {weatherData.daily.temperatureMin[index].toFixed(1)}°
                        </Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    dailyItem: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 8,
        paddingBottom: 18,
        gap: 15,
        backgroundColor: '#0b0c0de7',
    },
    dayText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#ffffff',
        textTransform: 'capitalize',
    },
    temperatureContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
    },
    temperatureMax: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6B6B',
    },
    temperatureMin: {
        fontSize: 16,
        color: '#4DABF7',
    },
}); 