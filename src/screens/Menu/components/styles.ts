import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headerView: {
    flexDirection: "row",
    paddingHorizontal: ScreenUtils.calculatorWidth(20),
    paddingVertical: ScreenUtils.calculatorHeight(12),
    justifyContent: "space-between",
  },
  menu: {
    marginRight: ScreenUtils.calculatorWidth(10),
  },
  changeLanguageContainer: {
    backgroundColor: Themes.colors.colGray10,
    borderRadius: ScreenUtils.calculatorWidth(20),
    paddingVertical: ScreenUtils.calculatorHeight(12),
    paddingHorizontal: ScreenUtils.calculatorWidth(11),
    flexDirection: "row",
    alignItems: "center",
  },
  language: {
    ...Themes.font.medium,
    color: Themes.colors.coolGray60,
    fontSize: 14,
    marginLeft: ScreenUtils.calculatorWidth(8),
    marginRight: ScreenUtils.calculatorWidth(18),
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
    width: ScreenUtils.calculatorWidth(76),
    height: ScreenUtils.calculatorHeight(22),
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: ScreenUtils.calculatorWidth(20),
    paddingVertical: ScreenUtils.calculatorHeight(16),
    borderTopWidth: 1,
    borderColor: Themes.colors.colGray10,
  },
  iconMenuItem: {
    width: ScreenUtils.calculatorWidth(24),
    height: ScreenUtils.calculatorWidth(24),
    marginRight: ScreenUtils.calculatorWidth(16),
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
  serviceSelect: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: ScreenUtils.calculatorHeight(16),
    borderBottomWidth: 1,
    borderBottomColor: Themes.colors.colGray20,
    marginHorizontal: ScreenUtils.calculatorWidth(20),
  },
  bottomModal: {
    maxHeight: "100%",
    paddingBottom: ScreenUtils.calculatorHeight(10),
  },
  qrUserManual: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerBottomSheet: {
    paddingHorizontal: ScreenUtils.calculatorWidth(20),
    paddingVertical: ScreenUtils.calculatorHeight(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
