import { Alert, StyleSheet, ImageBackground } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { SearchProvider, useSearch } from '@/components/SearchContext';
import CurrentlyScreen from './index';
import TodayScreen from './today';
import WeeklyScreen from './weekly';
import TopBar from '@/components/TopBar';
import Geocoder from 'react-native-geocoding';

type TabBarIconProps = { color: string; };
const Tab = createMaterialTopTabNavigator();
Geocoder.init(process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string, { language: 'en' });

function TabLayoutContent() {
  const { setLocation, setError } = useSearch();

  const requestLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Location Permission Denied',
        'GeoLocation is not available, please enable it in your App settings',
        [{ text: 'OK' }]
      );
      setError('GeoLocation is not available, please enable it in your App settings');
    } else {
      const currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const { latitude, longitude } = currentLocation.coords;

      Geocoder.from({
        latitude: latitude,
        longitude: longitude
      }).then(json => {
        if (json.results && json.results.length > 0) {
          const result = json.results[0];
          const locationComponents = result.address_components;
          const city = locationComponents.find(comp => comp.types.includes('locality'))?.long_name || '';
          const region = locationComponents.find(comp => comp.types.includes('administrative_area_level_1'))?.long_name || '';
          const country = locationComponents.find(comp => comp.types.includes('country'))?.long_name || '';
          setLocation({ name: city, country: country, admin1: region, latitude: latitude, longitude: longitude });
        }
        setError(null);
      }).catch(error => {
        console.log(error);
        setError('Could not find any result for the supplied address or coordinates.');
      });
    }
  };

  useEffect(() => { requestLocation(); }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/background.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <TopBar onLocationPress={requestLocation} />
      <Tab.Navigator tabBarPosition="bottom"
        screenOptions={{
          tabBarActiveTintColor: '#f9f9fa',
          tabBarIndicatorStyle: { backgroundColor: '#c70202' },
          tabBarStyle: { backgroundColor: 'transparent' },
          sceneStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Tab.Screen name="Currently" component={CurrentlyScreen}
          options={{
            title: 'Currently',
            tabBarIcon: ({ color }: TabBarIconProps) => <Ionicons name="time" size={24} color={color} />,
            tabBarStyle: { backgroundColor: '#000000' },
          }}
        />
        <Tab.Screen name="Today" component={TodayScreen}
          options={{
            title: 'Today',
            tabBarIcon: ({ color }: TabBarIconProps) => <Ionicons name="today" size={24} color={color} />,
            tabBarStyle: { backgroundColor: '#000000' },

          }}
        />
        <Tab.Screen name="Weekly" component={WeeklyScreen}
          options={{
            title: 'Weekly',
            tabBarIcon: ({ color }: TabBarIconProps) => <Ionicons name="calendar" size={24} color={color} />,
            tabBarStyle: { backgroundColor: '#000000' },
          }}
        />
      </Tab.Navigator>
    </ImageBackground>
  );
}

export default function TabLayout() {
  return (
    <SearchProvider>
      <TabLayoutContent />
    </SearchProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
