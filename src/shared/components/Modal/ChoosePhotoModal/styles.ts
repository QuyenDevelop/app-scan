import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  bottomModal: {
    maxHeight: "100%",
  },
  itemSelect: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: ScreenUtils.calculatorHeight(12),
    borderBottomWidth: 1,
    borderBottomColor: Themes.colors.colGray20,
    marginHorizontal: ScreenUtils.calculatorWidth(20),
  },
});
