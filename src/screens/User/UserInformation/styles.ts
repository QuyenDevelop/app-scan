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
    paddingTop: ScreenUtils.calculatorHeight(24),
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: ScreenUtils.calculatorWidth(20),
    height: ScreenUtils.calculatorHeight(45),
  },
  infoText: {
    fontSize: 13,
  },
});
