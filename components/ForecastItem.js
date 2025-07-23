import { Image, Text, View, Dimensions } from "react-native";
import { kelvinToCelsius, unixToTime } from "../utils/conversion";
import styles from "./ForecastItem-style";

const ForecastItem = ({ item, index }) => {
  const getWeatherIcon = (main) => {
    const icons = {
      Clear: require("../assets/sun.png"),
      Cloudy: require("../assets/cloudy.png"),
    };
    return icons[main] || require("../assets/cloudy.png");
  };

  const { width } = Dimensions.get("window");
  const time = unixToTime(item?.dt);
  const temp = kelvinToCelsius(item?.main?.temp); // assuming item.main.temp exists

  return (
    <View style={styles.card} testID={`list-item-${index}`}>
      <Image
        source={getWeatherIcon(item.weather[0].main)}
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={styles.testStyle}>{time}</Text>
      <Text style={styles.testStyle}>{temp}°C</Text>
    </View>
  );
};

export default ForecastItem;
