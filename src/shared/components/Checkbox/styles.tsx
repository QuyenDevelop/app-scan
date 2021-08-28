import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  childContainer: {
    width: ScreenUtils.calculatorHeight(20),
    height: ScreenUtils.calculatorHeight(20),
    borderColor: Themes.colors.collGray40,
    borderRadius: ScreenUtils.calculatorWidth(2),
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    ...Themes.font.regular,
    fontSize: 14,
    color: Themes.colors.textPrimary,
    marginLeft: ScreenUtils.calculatorWidth(8),
  },
  hitSlop: {
    top: 20,
    bottom: 0,
    left: 20,
    right: 20,
  },
});
