import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  content: {
    flex: 1,
    paddingTop: ScreenUtils.scale(24),
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: ScreenUtils.scale(20),
    height: ScreenUtils.scale(45),
  },
  infoText: {
    fontSize: 13,
  },
});
