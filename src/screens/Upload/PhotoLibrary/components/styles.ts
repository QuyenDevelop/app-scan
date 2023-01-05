import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("screen");
export default StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    // opacity: "0.5",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  loading: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
});
