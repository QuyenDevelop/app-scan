import { Themes } from "@themes";
import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("screen");
export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  image: {
    width: width,
    height: height,
  },
  swiper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Themes.colors.black,
  },
  dot: {
    backgroundColor: Themes.colors.white,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
});
