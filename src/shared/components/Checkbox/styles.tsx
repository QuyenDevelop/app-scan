import { StyleSheet } from "react-native";
import { Themes } from "@themes";
import { ScreenUtils } from "@helpers";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  childContainer: {
    width: ScreenUtils.calculatorHeight(22),
    height: ScreenUtils.calculatorHeight(22),
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
});
