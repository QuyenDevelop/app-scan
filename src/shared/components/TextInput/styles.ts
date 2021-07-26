import { StyleSheet } from "react-native";
import { Themes } from "@themes";
import { ScreenUtils } from "@helpers";

export const styles = StyleSheet.create({
  inputDefaultContainer: {
    borderBottomWidth: 0.8,
    borderBottomColor: Themes.colors.coolGray,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputErrorContainer: {
    borderBottomWidth: 0.8,
    borderBottomColor: Themes.colors.error,
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    ...Themes.font.regular,
    fontSize: 16,
    color: Themes.colors.textPrimary,
    alignSelf: "center",
    flex: 1,
    paddingVertical: ScreenUtils.calculatorHeight(7),
    paddingLeft: ScreenUtils.calculatorWidth(4),
  },
  label: {
    ...Themes.font.bold,
    fontSize: 14,
  },
  required: {
    ...Themes.font.bold,
    color: Themes.colors.error,
  },
  error: {
    color: Themes.colors.error,
    ...Themes.font.regular,
    fontSize: 13,
    marginTop: ScreenUtils.calculatorHeight(8),
  },
  leftIcon: {
    marginRight: ScreenUtils.calculatorWidth(4),
    alignSelf: "center",
  },
  rightIcon: {
    marginLeft: ScreenUtils.calculatorWidth(12),
    alignSelf: "center",
  },
  countryCodeWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  countryCode: {
    fontSize: 16,
    ...Themes.font.regular,
    color: Themes.colors.coolGray100,
  },
});
