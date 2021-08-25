import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  childContainer: {
    paddingHorizontal: ScreenUtils.calculatorWidth(20),
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
    marginTop: ScreenUtils.calculatorHeight(32),
  },
  forgotPasswordBtn: {
    marginTop: ScreenUtils.calculatorHeight(20),
    alignSelf: "center",
  },
  forgotPasswordTextBtn: {
    fontSize: 13,
    color: Themes.colors.info60,
  },
});
