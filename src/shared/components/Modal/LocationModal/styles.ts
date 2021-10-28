import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  serviceSelect: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: ScreenUtils.calculatorHeight(58),
    borderBottomWidth: 1,
    borderBottomColor: Themes.colors.colGray20,
    marginHorizontal: ScreenUtils.calculatorWidth(20),
  },
  bottomModal: {
    height: "100%",
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
  noData: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "500",
    marginTop: ScreenUtils.calculatorHeight(50),
  },
  searchInput: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: ScreenUtils.calculatorWidth(12),
    paddingVertical: ScreenUtils.calculatorHeight(8),
    marginHorizontal: ScreenUtils.calculatorWidth(16),
    borderRadius: ScreenUtils.calculatorWidth(5),
    borderColor: Themes.colors.collGray40,
  },
});
