import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  indicatorStyle: {
    backgroundColor: Themes.colors.primary,
    height: ScreenUtils.scale(4),
    borderTopLeftRadius: ScreenUtils.scale(4),
    borderTopRightRadius: ScreenUtils.scale(4),
    width: ScreenUtils.WIDTH / 3 - ScreenUtils.scale(32),
    marginHorizontal: ScreenUtils.scale(16),
  },
  tabBarLabel: {
    ...Themes.font.medium,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "500",
    textAlign: "center",
  },
});
