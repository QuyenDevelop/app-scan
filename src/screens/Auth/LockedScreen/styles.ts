import { StyleSheet } from "react-native";
import { Themes } from "@themes";
import { ScreenUtils } from "@helpers";

export default StyleSheet.create({
  countDown: {
    marginTop: ScreenUtils.calculatorHeight(20),
    alignItems: "center",
  },
  countDownText: {
    ...Themes.font.bold,
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  contentContainer: {
    marginTop: ScreenUtils.calculatorHeight(100),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: ScreenUtils.calculatorWidth(220),
    marginVertical: ScreenUtils.calculatorHeight(20),
  },
  footer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ScreenUtils.calculatorWidth(22),
    paddingVertical: ScreenUtils.calculatorHeight(8),
    borderTopColor: Themes.colors.colGray20,
    borderTopWidth: ScreenUtils.calculatorWidth(0.5),
  },
  right: {
    marginLeft: ScreenUtils.calculatorWidth(13),
  },
  help: {
    ...Themes.font.regular,
    color: Themes.colors.coolGray60,
    fontSize: 12,
  },
  contact: {
    ...Themes.font.bold,
    fontSize: 14,
    color: Themes.colors.primary,
  },
  title: {
    ...Themes.font.bold,
    fontSize: 16,
    color: Themes.colors.coolGray100,
    marginBottom: ScreenUtils.calculatorHeight(10),
  },
  description: {
    textAlign: "center",
    color: Themes.colors.coolGray60,
    ...Themes.font.regular,
    fontSize: 14,
  },
});
