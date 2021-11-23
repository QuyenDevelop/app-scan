import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  countDown: {
    marginTop: ScreenUtils.scale(20),
    alignItems: "center",
  },
  countDownText: {
    ...Themes.font.bold,
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  contentContainer: {
    marginTop: ScreenUtils.scale(100),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: ScreenUtils.scale(220),
    marginVertical: ScreenUtils.scale(20),
  },
  footer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ScreenUtils.scale(22),
    paddingVertical: ScreenUtils.scale(8),
    borderTopColor: Themes.colors.colGray20,
    borderTopWidth: ScreenUtils.scale(0.5),
  },
  right: {
    marginLeft: ScreenUtils.scale(13),
  },
  help: {
    ...Themes.font.regular,
    color: Themes.colors.coolGray60,
    fontSize: 12,
  },
  contact: {
    ...Themes.font.bold,
    fontSize: 14,
    color: Themes.colors.primary,
  },
  title: {
    ...Themes.font.bold,
    fontSize: 16,
    color: Themes.colors.coolGray100,
    marginBottom: ScreenUtils.scale(10),
  },
  description: {
    textAlign: "center",
    color: Themes.colors.coolGray60,
    ...Themes.font.regular,
    fontSize: 14,
  },
});
