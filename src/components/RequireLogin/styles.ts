import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  logoutContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutTitle: {
    ...Themes.font.bold,
    fontSize: 18,
    color: Themes.colors.textPrimary,
    marginBottom: ScreenUtils.scale(15),
  },
});
