import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  receiveItem: {
    borderBottomWidth: 1,
    borderColor: Themes.colors.colGray20,
    paddingVertical: ScreenUtils.calculatorHeight(16),
    marginHorizontal: ScreenUtils.calculatorWidth(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hitSlop: {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  },
});
