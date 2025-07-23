import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ForecastItem from "../components/ForecastItem";
import { getWeather } from "../utils/api";
import styles from "./home-style";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.warn("Location permission not granted");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const currentstatus = "weather";
        const forecaststatus = "forecast";
        const [weatherData, forecastData] = await Promise.all([
          getWeather(latitude, longitude, currentstatus),
          getWeather(latitude, longitude, forecaststatus),
        ]);

        setWeather(weatherData);
        setForecast(forecastData);
        //setForecast(null);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weather || !forecast) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.cards}>
        <WeatherCard weather={weather} />
      </View> */}
      <View style={styles.hours}>
        <Text style={styles.sectionTitle}>Hourly Forecast</Text>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/forecast",
              params: { forecast: JSON.stringify(forecast) },
            })
          }
        >
          <Text style={styles.sectionTitle}>Next hours ></Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <FlatList
          data={forecast.list}
          renderItem={ForecastItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false} // Set to true if you want page-by-page scrolling
          decelerationRate="fast"
          // snapToInterval={width * 0.8} // Optional: snap to items
          snapToAlignment="center"
          contentContainerStyle={styles.flatListContent}
          testID="horizontal-flatlist" // Important for Maestro testing
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
