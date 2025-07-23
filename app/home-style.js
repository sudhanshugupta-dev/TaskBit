import { StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { FontSize, fontWeight } from "../constants/FontFamily";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    color: Colors.backgroundColor,
  },
  sectionTitle: {
    fontWeight: fontWeight.fontWeightType,
    fontSize: FontSize.SideBarSize,
    color: Colors.screenTextColor,
  },
  cards: { marginTop: 20, height: "68%" },
  hours: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  section: { height: "25%", backgroundColor: "yellow" },
  flatListContent: {
    paddingHorizontal: 15,
    //backgroundColor: "red",
  },
});

export default styles;
