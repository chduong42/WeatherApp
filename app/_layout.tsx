import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) 
      SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded)
    return null;

  const image = { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShUjxsKqZhWGNm2noi6y_wYKXOE6LUFdDNTQ&s"}
  return (
    <ThemeProvider value={DefaultTheme}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='+not-found' />
      </Stack>
      </ImageBackground>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});