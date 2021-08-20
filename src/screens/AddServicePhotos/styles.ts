import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  content: {
    margin: ScreenUtils.calculatorWidth(15),
    flex: 1,
  },
  imageLibrary: {
    width: (ScreenUtils.WIDTH - ScreenUtils.calculatorWidth(40)) / 3,
    height: (ScreenUtils.WIDTH - ScreenUtils.calculatorWidth(37)) / 3,
  },
  iconCheck: {
    position: "absolute",
    bottom: ScreenUtils.calculatorHeight(8),
    right: ScreenUtils.calculatorHeight(8),
  },
  imageView: {
    flex: 1 / 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: ScreenUtils.calculatorHeight(12),
    paddingHorizontal: ScreenUtils.calculatorHeight(48),
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
});
