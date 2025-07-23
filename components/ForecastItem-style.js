import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: Colors.primaryColor,
    marginRight: 10,
    justifyContent: "center",
    borderRadius: 10,
    width: width * 0.8,
    height: 180,
    alignItems: "center",
  },
  testStyle: {
    color: Colors.secoundaryColor,
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
});

export default styles;
