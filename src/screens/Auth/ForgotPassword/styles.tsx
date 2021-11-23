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
    paddingHorizontal: ScreenUtils.scale(20),
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
  buttonForgot: {
    ...Themes.font.bold,
    fontSize: 14,
    color: Themes.colors.primary,
    marginLeft: ScreenUtils.scale(4),
  },
  input: {
    marginTop: ScreenUtils.scale(48),
  },
  button: {
    marginTop: ScreenUtils.scale(56),
  },
  header: { backgroundColor: Themes.colors.white },
  confirmBtn: {
    width: "100%",
    backgroundColor: Themes.colors.bg,
  },
});
