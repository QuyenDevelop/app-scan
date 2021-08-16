import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
  input: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ScreenUtils.calculatorWidth(30),
    marginVertical: ScreenUtils.calculatorHeight(10),
  },
  inputCode: {
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: ScreenUtils.calculatorWidth(15),
    borderColor: Themes.colors.collGray40,
    borderRadius: ScreenUtils.calculatorWidth(10),
    marginRight: ScreenUtils.calculatorWidth(15),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    ...Platform.select({
      ios: {
        paddingVertical: ScreenUtils.calculatorHeight(10),
      },
    }),
  },
  header: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: ScreenUtils.calculatorHeight(10),
  },
  scanButton: {
    marginHorizontal: ScreenUtils.calculatorWidth(5),
  },
  markerView: {
    position: "absolute",
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  loadingView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  camera: { width: "100%", height: "100%" },
  flex1: {
    flex: 1,
  },
  topView: {
    flex: 0.3,
    backgroundColor: Themes.colors.transparentBlack,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: ScreenUtils.calculatorWidth(30),
  },
  centerView: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
  },
  bottomView: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Themes.colors.transparentBlack,
    paddingTop: ScreenUtils.calculatorHeight(22),
  },
  qrUserManual: {
    textAlign: "center",
    color: Themes.colors.white,
    marginLeft: ScreenUtils.calculatorWidth(8),
  },
  enterKeyboardButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Themes.colors.white,
    borderRadius: ScreenUtils.calculatorWidth(23),
    paddingVertical: ScreenUtils.calculatorHeight(12),
    paddingHorizontal: ScreenUtils.calculatorWidth(60),
    marginTop: ScreenUtils.calculatorHeight(40),
  },
  centerLeftView: {
    width: ScreenUtils.calculatorWidth(45),
    backgroundColor: Themes.colors.transparentBlack,
  },
  centerCenterView: {
    borderWidth: 1,
    borderRadius: ScreenUtils.calculatorWidth(20),
    borderColor: Themes.colors.white,
    width: ScreenUtils.WIDTH - ScreenUtils.calculatorWidth(90),
  },
  errorContent: {
    fontSize: 16,
    fontWeight: "600",
    color: Themes.colors.warningMain,
    marginLeft: ScreenUtils.calculatorWidth(10),
  },
});
