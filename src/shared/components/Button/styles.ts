import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  title: {
    ...Themes.font.semiBold,
    fontSize: 16,
    color: Themes.colors.white,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    height: 48,
    minWidth: ScreenUtils.calculatorWidth(42),
    paddingHorizontal: ScreenUtils.calculatorWidth(27),
    backgroundColor: Themes.colors.primary,
    borderRadius: ScreenUtils.calculatorHeight(24),
  },
});
