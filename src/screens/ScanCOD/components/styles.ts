import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  bottomModal: {
    marginBottom: ScreenUtils.calculatorHeight(20),
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
  enterCode: {
    borderBottomWidth: 1,
    marginHorizontal: ScreenUtils.calculatorWidth(20),
    marginBottom: ScreenUtils.calculatorHeight(33),
    paddingVertical: ScreenUtils.calculatorHeight(12),
    borderColor: Themes.colors.colGray20,
  },
});
