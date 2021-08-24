import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: ScreenUtils.calculatorWidth(20),
    paddingVertical: ScreenUtils.calculatorHeight(10),
    backgroundColor: Themes.colors.bg,
    alignItems: "center",
  },
  searchView: {
    flex: 1,
    backgroundColor: Themes.colors.white,
    marginLeft: ScreenUtils.calculatorWidth(20),
    height: ScreenUtils.calculatorHeight(40),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: ScreenUtils.calculatorWidth(20),
    paddingHorizontal: ScreenUtils.calculatorWidth(16),
    marginVertical: ScreenUtils.calculatorHeight(10),
  },
  searchInput: {
    ...Themes.font.medium,
    flex: 1,
    paddingHorizontal: ScreenUtils.calculatorWidth(8),
    alignItems: "center",
    ...Platform.select({
      android: {
        paddingVertical: 0,
      },
    }),
  },
});
