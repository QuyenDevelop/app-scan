import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.colGray10,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginTop: ScreenUtils.calculatorHeight(20),
  },
  headerImage: {
    width: "100%",
    height: ScreenUtils.calculatorHeight(213),
  },
  headerView: {
    flexDirection: "row",
    paddingTop: ScreenUtils.calculatorHeight(17),
    paddingHorizontal: ScreenUtils.calculatorWidth(20),
  },
  menu: {
    marginRight: ScreenUtils.calculatorWidth(10),
  },
});
