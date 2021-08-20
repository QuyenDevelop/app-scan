import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  homeItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Themes.colors.white,
    padding: ScreenUtils.calculatorHeight(16),
    marginHorizontal: ScreenUtils.calculatorWidth(20),
    borderRadius: ScreenUtils.calculatorHeight(15),
    marginBottom: ScreenUtils.calculatorHeight(8),
  },
  iconHomeItem: {
    width: ScreenUtils.calculatorWidth(60),
    height: ScreenUtils.calculatorWidth(60),
    marginRight: ScreenUtils.calculatorWidth(16),
  },
  contentHomeItem: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  titleHomeItem: {
    color: Themes.colors.coolGray100,
    fontWeight: "600",
  },
  subtitleHomeItem: {
    color: Themes.colors.coolGray80,
    fontWeight: "400",
    fontSize: 12,
  },
});
