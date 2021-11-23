import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headerView: {
    flexDirection: "row",
    paddingHorizontal: ScreenUtils.scale(20),
    paddingVertical: ScreenUtils.scale(12),
    justifyContent: "space-between",
  },
  menu: {
    marginRight: ScreenUtils.scale(10),
  },
  changeLanguageContainer: {
    backgroundColor: Themes.colors.colGray10,
    borderRadius: ScreenUtils.scale(20),
    paddingVertical: ScreenUtils.scale(12),
    paddingHorizontal: ScreenUtils.scale(11),
    flexDirection: "row",
    alignItems: "center",
  },
  language: {
    ...Themes.font.medium,
    color: Themes.colors.coolGray60,
    fontSize: 14,
    marginLeft: ScreenUtils.scale(8),
    marginRight: ScreenUtils.scale(18),
  },
  iconGoBack: {
    alignSelf: "center",
  },
  headerLeftView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  efexImage: {
    width: ScreenUtils.scale(76),
    height: ScreenUtils.scale(22),
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: ScreenUtils.scale(20),
    paddingVertical: ScreenUtils.scale(16),
    borderTopWidth: 1,
    borderColor: Themes.colors.colGray10,
  },
  iconMenuItem: {
    width: ScreenUtils.scale(24),
    height: ScreenUtils.scale(24),
    marginRight: ScreenUtils.scale(16),
  },
  titleMenuItem: {
    fontWeight: "600",
    color: Themes.colors.coolGray100,
  },
  leftMenuItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "800",
  },
});
