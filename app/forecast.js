import { Ionicons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { getForecast } from "../utils/api";
import { kelvinToCelsius } from "../utils/conversion";

export default function ForecastScreen() {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          setLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        const data = await getForecast(latitude, longitude);
        setForecast(data);
      } catch (error) {
        console.error("Error fetching forecast:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  if (!forecast || !forecast.list) {
    return (
      <View style={styles.container}>
        <Text>No forecast data available.</Text>
      </View>
    );
  }

  function formatDateWithDayAndMonthName(dt_txt) {
    const date = new Date(dt_txt);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayName = days[date.getDay()];
    const day = date.getDate().toString().padStart(2, '0');
    const monthName = months[date.getMonth()];
    return `${dayName}, ${day} ${monthName}`;
  }

  function getWeatherIcon(main) {
    const icons = {
      Clear: require('../assets/sun.png'),
      Cloudy: require('../assets/cloudy.png'),
    };
    return icons[main] || require('../assets/cloudy.png');
  }

  const renderItem = ({ item }) => {
    const time = new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <View style={styles.row}>
        <Image
          source={getWeatherIcon(item.weather[0].main)}
          style={styles.icon}
          resizeMode="contain"
        />
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.date}>{formatDateWithDayAndMonthName(item.dt_txt)}</Text>
            <Text style={styles.temp}>
              {kelvinToCelsius(item.main.temp_max)}° / {kelvinToCelsius(item.main.temp_min)}°
            </Text>
            <Text style={styles.condition}>{item.weather[0].main}</Text>
          </View>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forecast</Text>
      </View>

      <FlatList
        data={forecast.list.slice(0, 10)}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#7DF9FF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 12,
    color: '#fff'
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  date: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
    color: '#fff'
  },
  temp: {
    color: "#0077B6",
    fontSize: 16,
  },
  condition: {
    fontSize: 14,
    color: "#555",
  },
  time: {
    fontSize: 16,
    color: '#333',
    alignSelf: 'flex-start',
  },
});
