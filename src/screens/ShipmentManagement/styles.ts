import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  checkView: {
    backgroundColor: Themes.colors.white,
    flexDirection: "row",
    alignItems: "center",
    height: ScreenUtils.scale(44),
    paddingHorizontal: ScreenUtils.scale(20),
  },
  checkbox: {
    marginRight: ScreenUtils.scale(8),
  },
  checkText: {
    fontSize: 13,
  },
  filterView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: ScreenUtils.scale(16),
    paddingHorizontal: ScreenUtils.scale(20),
    justifyContent: "space-between",
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  numberOrdersText: {
    fontSize: 13,
    fontWeight: "600",
  },
  filterText: {
    fontSize: 13,
    fontWeight: "500",
    color: Themes.colors.brand60,
    marginLeft: ScreenUtils.scale(4),
  },
  searchView: {
    flex: 1,
    backgroundColor: Themes.colors.white,
    marginLeft: ScreenUtils.scale(20),
    height: ScreenUtils.scale(40),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: ScreenUtils.scale(20),
    paddingHorizontal: ScreenUtils.scale(8),
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
  clearText: {
    height: ScreenUtils.scale(24),
    width: ScreenUtils.scale(24),
    borderRadius: ScreenUtils.scale(12),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Themes.colors.colGray20,
  },
});
