import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  content: {
    flex: 1,
  },
  cameraView: {
    height: 150,
  },
  camera: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  inventoryBtn: {
    backgroundColor: Themes.colors.bg,
    marginHorizontal: ScreenUtils.calculatorWidth(16),
    // marginBottom: ScreenUtils.calculatorHeight(20),
    borderRadius: ScreenUtils.calculatorHeight(8),
    justifyContent: "center",
    alignItems: "center",
  },
  inventoryTextBtn: {
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
  inventoryChildBtn: {
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
  toolView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: ScreenUtils.calculatorWidth(16),
    marginTop: ScreenUtils.calculatorHeight(12),
  },
  locationBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  locationText: {
    marginHorizontal: ScreenUtils.calculatorWidth(4),
  },
  requestInventoryItem: {
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: ScreenUtils.calculatorHeight(12),
    marginBottom: ScreenUtils.calculatorHeight(8),
    marginHorizontal: ScreenUtils.calculatorWidth(16),
    borderColor: Themes.colors.collGray40,
    borderRadius: ScreenUtils.calculatorWidth(5),
  },
  contentHeader: {
    marginHorizontal: ScreenUtils.calculatorWidth(16),
    marginVertical: ScreenUtils.calculatorHeight(12),
  },
  noLocation: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: ScreenUtils.calculatorHeight(16),
  },
  noLocationText: {
    marginLeft: ScreenUtils.calculatorWidth(8),
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: ScreenUtils.calculatorHeight(10),
  },
});
