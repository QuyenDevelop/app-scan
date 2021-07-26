import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  tabBarIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarText: {
    marginTop: ScreenUtils.calculatorHeight(6),
    textAlign: "center",
    ...Themes.font.medium,
    fontSize: 11,
  },
});
