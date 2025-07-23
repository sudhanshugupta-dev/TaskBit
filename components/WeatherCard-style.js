import { StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { FontSize, fontWeight } from "../constants/FontFamily";

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 25,
    padding: 16,
    height: "95%",
  },
  city: {
    color: Colors.secoundaryColor,
    fontSize: FontSize.MediumSize,
    fontWeight: fontWeight.fontWeightType,
    marginTop: 10,
  },
  temp: {
    color: Colors.secoundaryColor,
    fontSize: FontSize.MainFontSzie,
    fontWeight: fontWeight.fontWeightType,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderTopWidth: 1,
    height: "15%",
    borderColor: Colors.secoundaryColor,
    paddingTop: 10,
    marginTop: 10,
  },
  smallView: {
    width: "50%",
    paddingHorizontal: 5,
  },
  smallView2: {
    borderLeftWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.secoundaryColor,
    width: "50%",
    paddingHorizontal: 5,
  },
  text: {
    color: Colors.secoundaryColor,
    fontSize: FontSize.SideBarSize,
    fontWeight: fontWeight.fontWeightType,
    marginLeft: 8,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 2,
    marginBottom: 8,
  },
  ImageContainer: { alignItems: "center", justifyContent: "center" },
});

export default styles;
