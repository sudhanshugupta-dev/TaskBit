import { StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { FontSize, fontWeight } from "../constants/FontFamily";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: Colors.primaryColor,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: FontSize.HeaderTitle,
    fontWeight: fontWeight.fontWeightType,
    marginLeft: 12,
    color: Colors.secoundaryColor,
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingBottom: 15,
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  date: {
    fontWeight: "bold",
    fontSize: FontSize.SideBarSize,
    marginBottom: 4,
    color: Colors.secoundaryColor,
  },
  temp: {
    color: Colors.secoundaryColor,
    fontSize: FontSize.SideBarSize,
  },
  condition: {
    fontSize: FontSize.SideBarSize,
    color: Colors.screenTextColor,
  },
  time: {
    fontSize: FontSize.SideBarSize,
    color: Colors.secoundaryColor,
    alignSelf: "flex-start",
  },
});

export default styles;
