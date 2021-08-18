import { ScreenUtils } from "@helpers";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: ScreenUtils.calculatorWidth(219),
    height: ScreenUtils.calculatorWidth(219),
  },
});
