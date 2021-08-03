import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
    // paddingHorizontal: ScreenUtils.calculatorWidth(20)
  },
  banner: {
    width: "100%",
    height: ScreenUtils.calculatorHeight(361),
  },
  textContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: ScreenUtils.calculatorHeight(30),
  },
  title: {
    width: "100%",
    textAlign: "center",
    ...Themes.font.bold,
    color: Themes.colors.coolGray100,
    fontSize: 16,
  },
  description: {
    width: "100%",
    textAlign: "center",
    ...Themes.font.regular,
    paddingHorizontal: ScreenUtils.calculatorWidth(50),
    marginTop: ScreenUtils.calculatorHeight(10),
    color: Themes.colors.coolGray60,
    lineHeight: 21,
    fontSize: 12,
  },
  containerModal: {
    borderRadius: 12,
    backgroundColor: Themes.colors.white,
    paddingTop: ScreenUtils.calculatorWidth(20),
    paddingHorizontal: ScreenUtils.calculatorWidth(20),
  },
  firstLaunchContainer: {
    flex: 1,
  },
  backgroundImg: {
    marginTop: ScreenUtils.calculatorHeight(-12),
    width: "100%",
    height: "100%",
  },
  loadingView: {
    position: "absolute",
    bottom: ScreenUtils.calculatorHeight(70),
    justifyContent: "center",
    alignSelf: "center",
    width: ScreenUtils.calculatorWidth(120),
    height: ScreenUtils.calculatorHeight(120),
  },
});
