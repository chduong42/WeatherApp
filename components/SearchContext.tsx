// SearchContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react';

export interface Location {
    name: string;
    country: string;
    admin1: string;
    latitude: number;
    longitude: number;
}

export interface WeatherData {
    current: {
        temperature: number;
        weatherCode: number;
        windSpeed: number;
    };
    hourly: {
        time: Date[];
        temperature: Float32Array;
        weatherCode: Float32Array;
        windSpeed: Float32Array;
    };
    daily: {
        time: Date[];
        weatherCode: Float32Array;
        temperatureMax: Float32Array;
        temperatureMin: Float32Array;
    };
}

interface SearchContextType {
    location: Location | null;
    setLocation: (location: Location | null) => void;
    weatherData: WeatherData | null;
    setWeatherData: (weatherData: WeatherData | null) => void;
    error: string | null;
    setError: (error: string | null) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [location, setLocation] = useState<Location | null>(null);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    return (
        <SearchContext.Provider
            value={{
                location,
                setLocation,
                weatherData,
                setWeatherData,
                error,
                setError
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === undefined)
        throw new Error('useSearch must be used within a SearchProvider');
    return context;
};