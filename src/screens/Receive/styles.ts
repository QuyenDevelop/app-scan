import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  cameraView: {
    height: 200,
  },
  camera: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  receiveBtn: {
    backgroundColor: Themes.colors.bg,
    marginHorizontal: ScreenUtils.calculatorWidth(16),
    marginBottom: ScreenUtils.calculatorHeight(20),
    borderRadius: ScreenUtils.calculatorHeight(8),
    justifyContent: "center",
    alignItems: "center",
  },
  receiveTextBtn: {
    color: Themes.colors.white,
    fontWeight: "700",
  },
  receiveItem: {
    borderBottomWidth: 1,
    borderColor: Themes.colors.colGray20,
    paddingVertical: ScreenUtils.calculatorHeight(16),
    marginHorizontal: ScreenUtils.calculatorWidth(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  receiveChildBtn: {
    width: "100%",
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: ScreenUtils.calculatorHeight(10),
    paddingHorizontal: ScreenUtils.calculatorWidth(16),
  },
  input: {
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: ScreenUtils.calculatorWidth(12),
    height: ScreenUtils.calculatorHeight(40),
    paddingVertical: 0,
    borderColor: Themes.colors.colGray20,
  },
  addCode: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: ScreenUtils.calculatorWidth(16),
  },
});
