import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from "react-native";
import { kelvinToCelsius, unixToTime } from "../utils/conversion";

export default function WeatherCard({ weather }) {
  console.log(weather);

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{weather.name}</Text>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.city}>Today Weather</Text>
        <Image
          source={require('../assets/cloudy.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.temp}>{kelvinToCelsius(weather?.main?.temp)}°C</Text>
      </View>

      <View style={styles.mainView}>
        <View style={styles.smallView}>
          <View style={styles.iconRow}>
            <FontAwesome5 name="temperature-low" size={16} color="#fff" />
            <Text style={styles.text}>Feels like: {kelvinToCelsius(weather?.main?.feels_like)}°C</Text>
          </View>
        </View>
        <View style={styles.smallView}>
          <View style={styles.iconRow}>
            <Feather name="wind" size={16} color="#fff" />
            <Text style={styles.text}>Wind Speed: {weather?.wind?.speed} m/s</Text>
          </View>
        </View>
      </View>

      <View style={styles.mainView}>
        <View style={styles.smallView}>
          <View style={styles.iconRow}>
            <Feather name="sunrise" size={16} color="#fff" />
            <Text style={styles.text}>Sunrise: {unixToTime(weather?.sys?.sunrise)}</Text>
          </View>
        </View>
        <View style={styles.smallView}>
          <View style={styles.iconRow}>
            <Feather name="activity" size={16} color="#fff" />
            <Text style={styles.text}>Pressure: {weather?.main?.pressure} hPa</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#7DF9FF",
    borderRadius: 25,
    padding: 16,
    height: '95%',
  },
  city: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  temp: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#fff',
    paddingTop: 10,
    marginTop: 10,
  },
  smallView: {
    width: '50%',
    
    paddingHorizontal: 5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
});
