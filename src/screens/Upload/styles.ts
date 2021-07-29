import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { Dimensions, StyleSheet } from "react-native";
const { width: WIDTH } = Dimensions.get("screen");
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bottomCamera: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: ScreenUtils.calculatorHeight(5),
    paddingHorizontal: ScreenUtils.calculatorWidth(10),
  },
  image: {
    width: ScreenUtils.calculatorWidth(70),
    height: ScreenUtils.calculatorHeight(70),
    borderRadius: 10,
  },
  capture: {
    width: ScreenUtils.calculatorWidth(70),
    height: ScreenUtils.calculatorWidth(70),
    borderRadius: ScreenUtils.calculatorWidth(35),
    backgroundColor: Themes.colors.error,
  },
});
