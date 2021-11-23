import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  homeItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Themes.colors.white,
    padding: ScreenUtils.scale(16),
    marginHorizontal: ScreenUtils.scale(20),
    borderRadius: ScreenUtils.scale(15),
    marginBottom: ScreenUtils.scale(8),
  },
  iconHomeItem: {
    width: ScreenUtils.scale(60),
    height: ScreenUtils.scale(60),
    marginRight: ScreenUtils.scale(16),
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
