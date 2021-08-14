import { ScreenUtils } from "@helpers";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  headerImage: {
    width: "100%",
    height: ScreenUtils.calculatorHeight(213),
  },
});
