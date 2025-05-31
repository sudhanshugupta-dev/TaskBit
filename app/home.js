import * as Location from 'expo-location';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import ForecastItem from "../components/ForecastItem";
import WeatherCard from "../components/WeatherCard";
import { getCurrentWeather, getForecast } from '../utils/api';
import { unixToTime } from "../utils/conversion";

export default function HomeScreen() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const weatherData = await getCurrentWeather(latitude, longitude);
      const forecastData = await getForecast(latitude, longitude);

      setWeather(weatherData);
      setForecast(forecastData);
    })();
  }, []);

  if (!weather || !forecast) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20, height: '60%' }}>
        <WeatherCard weather={weather} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <Text style={styles.sectionTitle}>Hourly Forecast</Text>
        <TouchableOpacity onPress={() => router.push("/forecast")}>
          <Text style={styles.sectionTitle}>Next hours ></Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: '20%' }}>
        <FlatList
          data={forecast.list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ForecastItem time={unixToTime(item.dt)} temp={item.temp} item={item} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#F0F8FF"
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: 'grey'
  }
});
