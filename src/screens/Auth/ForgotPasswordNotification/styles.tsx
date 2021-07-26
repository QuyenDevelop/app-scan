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
  textContainer: {
    alignItems: "flex-start",
    marginTop: ScreenUtils.calculatorHeight(8),
  },
  text: {
    ...Themes.font.medium,
    fontSize: 14,
    color: Themes.colors.coolGray,
  },
  emailContainer: {
    backgroundColor: Themes.colors.colGray10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: ScreenUtils.calculatorHeight(14),
    marginTop: ScreenUtils.calculatorHeight(62),
  },
  textEmail: {
    ...Themes.font.medium,
    fontSize: 14,
    fontWeight: "400",
    color: Themes.colors.coolGray60,
  },
  contentContainer: {
    justifyContent: "flex-start",
    marginTop: ScreenUtils.calculatorHeight(32),
  },
  firstContentContainer: {
    height: ScreenUtils.calculatorHeight(70),
  },
  firstContent: {
    ...Themes.font.medium,
    fontSize: 14,
    fontWeight: "400",
    color: Themes.colors.coolGray100,
    lineHeight: ScreenUtils.calculatorHeight(21),
  },
  secondContent: {
    ...Themes.font.medium,
    fontSize: 14,
    fontWeight: "400",
    color: Themes.colors.coolGray100,
    lineHeight: ScreenUtils.calculatorHeight(21),
    marginTop: ScreenUtils.calculatorHeight(10),
  },
  button: {
    marginTop: ScreenUtils.calculatorHeight(56),
  },
});
