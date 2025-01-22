// Dictionnaire des codes WMO
export const WMO_CODE_DESCRIPTIONS = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Drizzle: Light intensity',
    53: 'Drizzle: Moderate intensity',
    55: 'Drizzle: Dense intensity',
    56: 'Freezing Drizzle: Light intensity',
    57: 'Freezing Drizzle: Dense intensity',
    61: 'Rain: Slight intensity',
    63: 'Rain: Moderate intensity',
    65: 'Rain: Heavy intensity',
    66: 'Freezing Rain: Light intensity',
    67: 'Freezing Rain: Heavy intensity',
    71: 'Snow fall: Slight intensity',
    73: 'Snow fall: Moderate intensity',
    75: 'Snow fall: Heavy intensity',
    77: 'Snow grains',
    80: 'Rain showers: Slight intensity',
    81: 'Rain showers: Moderate intensity',
    82: 'Rain showers: Violent intensity',
    85: 'Snow showers: Slight intensity',
    86: 'Snow showers: Heavy intensity',
    95: 'Thunderstorm: Slight or moderate',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
};

// Fonction pour interpréter les codes WMO
export function getWeatherDescription(weatherCode: number) {
    return WMO_CODE_DESCRIPTIONS[weatherCode as keyof typeof WMO_CODE_DESCRIPTIONS] || 'Unknown weather condition';
}

export const WMO_CODE_ICONS = {
    0: 'day-sunny',
    1: 'day-sunny',
    2: 'day-cloudy',
    3: 'cloudy',
    45: 'fog',
    48: 'fog',
    51: 'rain-drizzle',
    53: 'rain-drizzle',
    55: 'rain-drizzle',
    56: 'rain',
    57: 'rain',
    61: 'rain',
    63: 'rain',
    65: 'rain-heavy',
    66: 'rain-mix',
    67: 'rain-mix',
    71: 'snow',
    73: 'snow',
    75: 'snow',
    77: 'snow',
    80: 'rain',
    81: 'rain',
    82: 'rain',
    85: 'snow',
    86: 'snow',
    95: 'lightning',
    96: 'lightning',
    99: 'lightning'
};

export const WMO_CODE_COLORS = {
    0: '#FFD700', 
    1: '#FFD700', 
    2: '#33f9e5', 
    3: '#808080', 
    45: '#778899',
    48: '#778899',
    51: '#4682B4',
    53: '#4682B4',
    55: '#4682B4',
    56: '#00CED1',
    57: '#00CED1',
    61: '#1E90FF',
    63: '#1E90FF',
    65: '#00008B',
    66: '#4682B4',
    67: '#4682B4',
    71: '#ADD8E6',
    73: '#87CEEB',
    75: '#B0E0E6',
    77: '#B0E0E6',
    80: '#1E90FF',
    81: '#1E90FF',
    82: '#00008B',
    85: '#ADD8E6',
    86: '#B0E0E6',
    95: '#FFA500',
    96: '#FFA500',
    99: '#FF4500' 
};

export function getWeatherIcon(code: number) {
    return WMO_CODE_ICONS[code as keyof typeof WMO_CODE_ICONS] || 'close';
};

export function getWeatherColor(code: number) {
    return WMO_CODE_COLORS[code as keyof typeof WMO_CODE_COLORS] || '#808080';
};