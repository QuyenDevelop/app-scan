import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bottomCamera: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: ScreenUtils.calculatorHeight(5),
    paddingHorizontal: ScreenUtils.calculatorWidth(10),
  },
  image: {
    width: ScreenUtils.calculatorWidth(70),
    height: ScreenUtils.calculatorHeight(70),
    borderRadius: 10,
  },
  capture: {
    width: ScreenUtils.calculatorWidth(70),
    height: ScreenUtils.calculatorWidth(70),
    borderRadius: ScreenUtils.calculatorWidth(35),
    backgroundColor: Themes.colors.error,
  },
  flashButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  flashText: {
    ...Themes.font.medium,
    color: Themes.colors.white,
  },
  imageLibrary: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  iconCheck: {
    position: "absolute",
    bottom: ScreenUtils.calculatorHeight(8),
    right: ScreenUtils.calculatorHeight(8),
  },
  imageView: {
    width: (ScreenUtils.WIDTH - ScreenUtils.calculatorWidth(32)) / 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: ScreenUtils.calculatorHeight(4),
  },
  content: {
    marginHorizontal: ScreenUtils.calculatorWidth(12),
    flex: 1,
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: ScreenUtils.calculatorHeight(12),
    paddingHorizontal: ScreenUtils.calculatorWidth(48),
  },
  loadingView: {
    flex: 1,
    top: -20,
    bottom: -20,
    left: -20,
    right: -20,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Themes.colors.transparentBlack,
  },
  titleRight: {
    color: Themes.colors.white,
    fontSize: 16,
  },
  contentContainer: {
    paddingVertical: ScreenUtils.calculatorWidth(12),
  },
});
