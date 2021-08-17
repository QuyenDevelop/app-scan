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
    paddingHorizontal: ScreenUtils.calculatorWidth(20),
  },
  image: {
    width: ScreenUtils.calculatorWidth(48),
    height: ScreenUtils.calculatorWidth(48),
    borderRadius: 5,
  },
  capture: {
    width: ScreenUtils.calculatorWidth(70),
    height: ScreenUtils.calculatorWidth(70),
    borderRadius: ScreenUtils.calculatorWidth(35),
    backgroundColor: Themes.colors.error,
  },
  flashText: {
    ...Themes.font.medium,
    color: Themes.colors.white,
  },
  flex1: {
    flex: 1,
  },
  coverView: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: ScreenUtils.calculatorWidth(20),
  },
  takePicture: {
    width: ScreenUtils.calculatorWidth(72),
    height: ScreenUtils.calculatorWidth(72),
  },
  imageThumbnail: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imageThumbnailText: {
    fontSize: 12,
    color: Themes.colors.white,
    marginTop: ScreenUtils.calculatorHeight(4),
  },
});
