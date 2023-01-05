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
  input: {
    marginTop: ScreenUtils.scale(48),
  },
  button: {
    marginTop: ScreenUtils.scale(56),
  },
});
