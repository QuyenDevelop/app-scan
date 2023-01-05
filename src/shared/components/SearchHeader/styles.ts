import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: ScreenUtils.scale(20),
    paddingVertical: ScreenUtils.scale(10),
    backgroundColor: Themes.colors.bg,
    alignItems: "center",
  },
  searchView: {
    flex: 1,
    backgroundColor: Themes.colors.white,
    marginLeft: ScreenUtils.scale(20),
    height: ScreenUtils.scale(40),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: ScreenUtils.scale(20),
    paddingHorizontal: ScreenUtils.scale(16),
    marginVertical: ScreenUtils.scale(10),
  },
  searchInput: {
    ...Themes.font.medium,
    flex: 1,
    paddingHorizontal: ScreenUtils.scale(8),
    alignItems: "center",
    ...Platform.select({
      android: {
        paddingVertical: 0,
      },
    }),
  },
});
