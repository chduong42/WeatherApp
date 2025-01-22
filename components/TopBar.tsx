import { useState, useEffect, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSearch } from './SearchContext';
import { Location } from './SearchContext';
import _ from 'lodash';

interface TopBarProps {
  onLocationPress: () => void;
}

interface GeocodingResponse {
  results?: Location[];
}

const TopBar: React.FC<TopBarProps> = ({ onLocationPress }) => {
  const { setLocation, setError } = useSearch();
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);

  const debouncedFetch = useCallback(_.debounce(async (name: string) => {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}`);
    const data: GeocodingResponse = await response.json();
    setSuggestions(data.results || []);
  }, 300), []);

  useEffect(() => {
    debouncedFetch(inputValue);
    return () => debouncedFetch.cancel();
  }, [inputValue]);

  const handleSubmit = () => {
    suggestions.length > 0
      ? (setLocation(suggestions[0]), setError(null))
      : (setLocation(null), setError('Could not find any result for the supplied address or coordinates.'));
    setInputValue('');
    setSuggestions([]);
  };

  const handleLocationPress = (location: Location) => {
    setLocation(location);
    setError(null);
    setInputValue('');
    setSuggestions([]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#a10303" style={styles.searchIcon} />

          <TextInput
            style={styles.input}
            placeholder="Search location..."
            placeholderTextColor="#888"
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={() => handleSubmit()}
            returnKeyType="search"
          />

          {inputValue.length > 0 && (
            <TouchableOpacity
              onPress={() => setInputValue('')}
              style={styles.clearButton}
              accessibilityLabel="Clear search"
              accessibilityRole="button"
            >
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity onPress={onLocationPress} style={styles.locationButton}>
          <Ionicons name="navigate" size={24} color="#c70202" />
        </TouchableOpacity>

        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleLocationPress(item)} style={styles.LocationItem} >
                <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                <Text>, {item.admin1}, {item.country}</Text>
              </TouchableOpacity>
            )}
            style={styles.SuggestionsList}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
    zIndex: 1000,
    elevation: 5,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffb9',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  locationButton: {
    marginLeft: 5,
    padding: 4,
  },
  SuggestionsList: {
    position: 'absolute',
    top: 40,
    left: 15,
    right: 50,
    maxHeight: 210,
    borderRadius: 8,
    borderWidth: 1,
    zIndex: 1000,
    elevation: 5,
  },
  LocationItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#faf8f8',
  },
  locationText: {
    fontSize: 14,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  safeArea: {
    zIndex: 1000,
    elevation: 5,
  },
});

export default TopBar;