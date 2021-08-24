import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  bottomModal: {
    maxHeight: "100%",
  },
  headerBottomSheet: {
    paddingHorizontal: ScreenUtils.calculatorWidth(20),
    paddingTop: ScreenUtils.calculatorHeight(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qrUserManual: {
    fontSize: 18,
    fontWeight: "600",
  },
  applyBtn: {
    backgroundColor: Themes.colors.bg,
    height: ScreenUtils.calculatorHeight(48),
    marginHorizontal: ScreenUtils.calculatorWidth(70),
    borderRadius: ScreenUtils.calculatorWidth(24),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: ScreenUtils.calculatorHeight(30),
  },
  applyTextBtn: {
    fontWeight: "600",
    color: Themes.colors.white,
  },
  modalIOS: {
    marginBottom: ScreenUtils.calculatorHeight(-10),
    marginHorizontal: ScreenUtils.calculatorWidth(0),
  },
});
