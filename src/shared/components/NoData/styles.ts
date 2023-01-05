import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: ScreenUtils.scale(219),
    height: ScreenUtils.scale(219),
  },
  noDataTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Themes.colors.textPrimary,
  },
});
