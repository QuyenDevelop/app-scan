import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

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
    paddingVertical: ScreenUtils.scale(7),
    paddingLeft: ScreenUtils.scale(4),
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
    marginTop: ScreenUtils.scale(8),
  },
  leftIcon: {
    marginRight: ScreenUtils.scale(4),
    alignSelf: "center",
  },
  rightIcon: {
    marginLeft: ScreenUtils.scale(12),
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
