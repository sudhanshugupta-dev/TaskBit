import { Image, StyleSheet, Text, View } from "react-native";
import { kelvinToCelsius } from "../utils/conversion";




export default function ForecastItem({ time, temp, item }) {
    console.log("ds0", item.main.temp);

     function getWeatherIcon(main) {
    const icons = {
      Clear: require('../assets/sun.png'),
      Cloudy: require('../assets/cloudy.png'),
    };
    return icons[main] || require('../assets/cloudy.png');
  }

  return (
    <View style={styles.card}>
         <Image
                  source={getWeatherIcon(item.weather[0].main)}
                  style={styles.icon}
                  resizeMode="contain"
        />
      <Text>{time}</Text>
      <Text>{kelvinToCelsius(item.main.temp)}°C</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
   backgroundColor: "#7DF9FF",
    marginRight: 10,
    justifyContent:'center',
    borderRadius: 10,
    alignItems: "center",
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
});
