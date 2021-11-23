import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

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
});
