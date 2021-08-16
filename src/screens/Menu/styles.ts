import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  content: {
    flex: 1,
    marginTop: ScreenUtils.calculatorHeight(25),
  },
  logoutButton: {
    backgroundColor: Themes.colors.colGray10,
    borderRadius: 45,
    width: ScreenUtils.WIDTH - 40,
    marginTop: ScreenUtils.calculatorHeight(100),
  },
  logoutButtonTitle: {
    color: Themes.colors.coolGray100,
  },
});
