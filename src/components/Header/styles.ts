import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: ScreenUtils.calculatorWidth(20),
    paddingVertical: ScreenUtils.calculatorHeight(10),
    backgroundColor: Themes.colors.bg,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    // paddingTop: ScreenUtils.calculatorWidth(2)
  },
  leftIconButton: {
    marginRight: ScreenUtils.calculatorWidth(4),
    paddingRight: ScreenUtils.calculatorWidth(6),
    paddingVertical: ScreenUtils.calculatorWidth(8),
  },
  leftIcon: {
    alignSelf: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    // paddingTop: ScreenUtils.calculatorWidth(2)
  },
  rightIconButton: {
    marginLeft: ScreenUtils.calculatorWidth(4),
    paddingLeft: ScreenUtils.calculatorWidth(6),
    paddingVertical: ScreenUtils.calculatorWidth(8),
  },
  rightIcon: {
    alignSelf: "center",
  },
  titleRightStyle: {
    fontSize: 12,
    ...Themes.font.medium,
    color: Themes.colors.primary,
  },
  titleCenter: {
    flex: 1,
    fontSize: 18,
    ...Themes.font.semiBold,
    alignSelf: "center",
    textAlign: "center",
    marginHorizontal: ScreenUtils.calculatorWidth(4),
  },
  goBackContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  goBack: {
    ...Themes.font.medium,
    fontSize: 16,
    color: Themes.colors.primary,
    marginLeft: ScreenUtils.calculatorWidth(10),
  },
  iconGoBack: {
    alignSelf: "center",
  },
  changeLanguageContainer: {
    backgroundColor: Themes.colors.colGray10,
    borderRadius: ScreenUtils.calculatorWidth(20),
    paddingVertical: ScreenUtils.calculatorHeight(12),
    paddingHorizontal: ScreenUtils.calculatorWidth(11),
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  language: {
    ...Themes.font.medium,
    color: Themes.colors.coolGray60,
    fontSize: 14,
    marginLeft: ScreenUtils.calculatorWidth(8),
    marginRight: ScreenUtils.calculatorWidth(18),
  },
});
