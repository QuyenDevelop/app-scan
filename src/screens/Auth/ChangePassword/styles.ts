import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  childContainer: {
    paddingHorizontal: ScreenUtils.scale(20),
  },
  title: {
    ...Themes.font.bold,
    fontSize: 24,
    color: Themes.colors.textPrimary,
  },
  input: {
    marginTop: ScreenUtils.scale(48),
  },
  button: {
    marginTop: ScreenUtils.scale(32),
  },
  forgotPasswordBtn: {
    marginTop: ScreenUtils.scale(20),
    alignSelf: "center",
  },
  forgotPasswordTextBtn: {
    fontSize: 13,
    color: Themes.colors.info60,
  },
});
