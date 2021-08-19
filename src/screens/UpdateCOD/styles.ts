import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: Themes.colors.white,
  },
  labelStyle: {
    fontSize: 14,
    color: Themes.colors.coolGray100,
    fontWeight: "600",
  },
  indicatorStyle: {
    backgroundColor: Themes.colors.brand60,
  },
  scene: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
