import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  childContainer: {
    paddingTop: ScreenUtils.scale(18),
    paddingHorizontal: ScreenUtils.scale(10),
  },
  title: {
    ...Themes.font.bold,
    fontSize: 24,
    color: Themes.colors.textPrimary,
  },
  textContainer: {
    alignItems: "flex-start",
    marginTop: ScreenUtils.scale(8),
  },
  text: {
    ...Themes.font.medium,
    fontSize: 14,
    color: Themes.colors.coolGray,
  },
  emailContainer: {
    backgroundColor: Themes.colors.colGray10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: ScreenUtils.scale(14),
    marginTop: ScreenUtils.scale(62),
  },
  textEmail: {
    ...Themes.font.medium,
    fontSize: 14,
    fontWeight: "400",
    color: Themes.colors.coolGray60,
  },
  contentContainer: {
    justifyContent: "flex-start",
    marginTop: ScreenUtils.scale(32),
  },
  firstContentContainer: {
    height: ScreenUtils.scale(90),
  },
  firstContent: {
    ...Themes.font.medium,
    fontSize: 14,
    fontWeight: "400",
    color: Themes.colors.coolGray100,
    lineHeight: ScreenUtils.scale(21),
  },
  secondContent: {
    ...Themes.font.medium,
    fontSize: 14,
    fontWeight: "400",
    color: Themes.colors.coolGray100,
    lineHeight: ScreenUtils.scale(21),
    marginTop: ScreenUtils.scale(10),
  },
  button: {
    marginTop: ScreenUtils.scale(56),
  },
});
