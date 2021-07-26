import { StyleSheet } from "react-native";
import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";

export const styles = StyleSheet.create({
  footer: {
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
});
