import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  childContainer: {
    paddingTop: ScreenUtils.calculatorHeight(18),
    paddingHorizontal: ScreenUtils.calculatorWidth(20),
  },
  title: {
    ...Themes.font.bold,
    fontSize: 24,
    color: Themes.colors.textPrimary,
  },
  textContainer: {
    alignItems: "flex-start",
    marginTop: ScreenUtils.calculatorHeight(8),
  },
  text: {
    ...Themes.font.medium,
    fontSize: 14,
    color: Themes.colors.coolGray,
  },
  buttonForgot: {
    ...Themes.font.bold,
    fontSize: 14,
    color: Themes.colors.primary,
    marginLeft: ScreenUtils.calculatorWidth(4),
  },
  input: {
    marginTop: ScreenUtils.calculatorHeight(48),
  },
  button: {
    marginTop: ScreenUtils.calculatorHeight(56),
  },
  header: { backgroundColor: Themes.colors.white },
  confirmBtn: {
    width: "100%",
    backgroundColor: Themes.colors.bg,
  },
});
