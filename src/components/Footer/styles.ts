import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ScreenUtils.scale(22),
    paddingVertical: ScreenUtils.scale(8),
    borderTopColor: Themes.colors.colGray20,
    borderTopWidth: ScreenUtils.scale(0.5),
  },
  right: {
    marginLeft: ScreenUtils.scale(13),
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
