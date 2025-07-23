import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
import { kelvinToCelsius, unixToTime } from "../utils/conversion";

import styles from "./WeatherCard-style";

export default function WeatherCard({ weather }) {
  return (
    <View style={styles.card} testID="WeatherCard">
      <Text style={styles.city}>{weather.name}</Text>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.city}>Today Weather</Text>
        <Image
          source={require("../assets/cloudy.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.temp}>
          {kelvinToCelsius(weather?.main?.temp)}°C
        </Text>
      </View>

      <View style={styles.mainView}>
        <View style={styles.smallView}>
          <View style={styles.iconRow}>
            <FontAwesome5 name="temperature-low" size={16} color="#fff" />
            <Text style={styles.text}>
              Feels like: {"\n"} {"\t"}
              {kelvinToCelsius(weather?.main?.feels_like)}°C
            </Text>
          </View>
        </View>
        <View style={styles.smallView2}>
          <View style={styles.iconRow}>
            <Feather name="wind" size={16} color="#fff" />
            <Text style={styles.text}>
              Wind Speed: {"\n"} {"\t"} {"\t"}
              {weather?.wind?.speed} m/s
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.mainView}>
        <View style={styles.smallView}>
          <View style={styles.iconRow}>
            <Feather name="sunrise" size={16} color="#fff" />
            <Text style={styles.text}>
              Sunrise: {"\n"} {"\t"}
              {unixToTime(weather?.sys?.sunrise)}
            </Text>
          </View>
        </View>
        <View style={styles.smallView2}>
          <View style={styles.iconRow}>
            <Feather name="activity" size={16} color="#fff" />
            <Text style={styles.text}>
              Pressure: {"\n"}
              {weather?.main?.pressure} hPa
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
