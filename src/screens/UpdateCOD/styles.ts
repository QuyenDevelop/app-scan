import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBar: {
    backgroundColor: Themes.colors.bP60,
  },
  labelStyle: {
    ...Themes.font.bold,
    fontSize: 14,
    color: Themes.colors.white,
  },
  indicatorStyle: {
    backgroundColor: Themes.colors.white,
  },
  indicator: {
    backgroundColor: Themes.colors.white,
  },
});
