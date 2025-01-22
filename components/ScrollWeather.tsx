import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Fontisto, Feather, FontAwesome6 } from '@expo/vector-icons';
import { getWeatherIcon, getWeatherColor } from '@/constants/WeatherCode';
import { WeatherData } from '@/components/SearchContext';

interface ScrollWeatherProps {
    weatherData: WeatherData;
}

export default function ScrollWeather({ weatherData }: ScrollWeatherProps) {
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} persistentScrollbar={true} indicatorStyle={'white'}>
            {weatherData.hourly.time.slice(0, 24).map((time, index) => (
                <View key={time.getTime()} style={styles.hourlyItem}>
                    <Text style={styles.hourText}>
                        {new Date(time).getUTCHours().toString().padStart(2, '0')}h
                    </Text>

                    <Fontisto
                        size={40}
                        name={getWeatherIcon(weatherData.hourly.weatherCode[index])}
                        color={getWeatherColor(weatherData.hourly.weatherCode[index])}
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <FontAwesome6 name="temperature-half" size={18} color="#f8f8f8" />
                        <Text style={styles.temperature}>
                            {weatherData.hourly.temperature[index].toFixed(1)}°C
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Feather size={18} name="wind" color="#7fddfa" />
                        <Text style={styles.windSpeed}>
                            {weatherData.hourly.windSpeed[index].toFixed(1)}km/h
                        </Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    hourlyItem: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 5,
        paddingBottom: 41,
        gap: 15,
        backgroundColor: '#0b0c0de3',
    },
    hourText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#ffffff',
    },
    temperature: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#ffffff',
    },
    windSpeed: {
        fontSize: 14,
        color: '#ffffff',
        textAlign: 'right',
    },
}); 