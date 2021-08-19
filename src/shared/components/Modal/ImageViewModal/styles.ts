import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: Themes.colors.white,
  },
  imageLibrary: {
    width: (ScreenUtils.WIDTH - ScreenUtils.calculatorWidth(40)) / 3,
    height: (ScreenUtils.WIDTH - ScreenUtils.calculatorWidth(37)) / 3,
  },
  content: {
    margin: ScreenUtils.calculatorWidth(15),
    flex: 1,
  },
  imageView: {
    flex: 1 / 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
});
