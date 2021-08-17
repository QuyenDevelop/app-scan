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
    width: (ScreenUtils.WIDTH - ScreenUtils.calculatorWidth(50)) / 3,
    height: (ScreenUtils.WIDTH - ScreenUtils.calculatorWidth(47)) / 3,
  },
  iconCheck: {
    position: "absolute",
    bottom: 2,
    right: 2,
  },
  imageView: {
    flex: 1 / 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  content: {
    margin: ScreenUtils.calculatorWidth(20),
    flex: 1,
  },
});
