import { StyleSheet } from "react-native";
import { Themes } from "@themes";
import { ScreenUtils } from "@helpers";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  childContainer: {
    paddingTop: ScreenUtils.calculatorHeight(18),
    paddingHorizontal: ScreenUtils.calculatorWidth(10),
  },
  title: {
    ...Themes.font.bold,
    fontSize: 24,
    color: Themes.colors.textPrimary,
  },
  input: {
    marginTop: ScreenUtils.calculatorHeight(48),
  },
  button: {
    marginTop: ScreenUtils.calculatorHeight(56),
  },
});
