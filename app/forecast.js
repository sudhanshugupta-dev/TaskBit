import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useLocalSearchParams } from "expo-router";
import { kelvinToCelsius } from "../utils/conversion";
import styles from "./forecast-styles";

export default function ForecastScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const forecast = JSON.parse(params.forecast);

  if (!forecast || !forecast.list) {
    return (
      <View style={styles.container}>
        <Text>No forecast data available.</Text>
      </View>
    );
  }

  function formatDateWithDayAndMonthName(dt_txt) {
    const date = new Date(dt_txt);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayName = days[date.getDay()];
    const day = date.getDate().toString().padStart(2, "0");
    const monthName = months[date.getMonth()];
    return `${dayName}, ${day} ${monthName}`;
  }

  function getWeatherIcon(main) {
    const icons = {
      Clear: require("../assets/sun.png"),
      Cloudy: require("../assets/cloudy.png"),
    };
    return icons[main] || require("../assets/cloudy.png");
  }

  const renderItem = ({ item, index }) => {
    const time = new Date(item.dt_txt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <SafeAreaView style={styles.row} testID={`ForeCastItem_${index}`}>
        <Image
          source={getWeatherIcon(item.weather[0].main)}
          style={styles.icon}
          resizeMode="contain"
        />
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.date}>
              {formatDateWithDayAndMonthName(item.dt_txt)}
            </Text>
            <Text style={styles.temp}>
              {kelvinToCelsius(item.main.temp_max)}° /{" "}
              {kelvinToCelsius(item.main.temp_min)}°
            </Text>
            <Text style={styles.condition}>{item.weather[0].main}</Text>
          </View>
          <Text style={styles.time}>{time}</Text>
        </View>
      </SafeAreaView>
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
      <View style={{ height: "80%" }}>
        <FlatList
          data={forecast.list.slice(0, 10)}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={renderItem}
        />
      </View>
      <Button
        title="next"
        style={{ marginBottom: 15 }}
        onPress={() => router.push("/blackscreen")}
      />
    </View>
  );
}
