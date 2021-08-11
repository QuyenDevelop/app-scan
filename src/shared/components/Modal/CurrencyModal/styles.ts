import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  serviceSelect: {
    borderWidth: 1,
    marginHorizontal: ScreenUtils.calculatorWidth(15),
    marginTop: ScreenUtils.calculatorHeight(20),
    paddingHorizontal: ScreenUtils.calculatorWidth(10),
    paddingVertical: ScreenUtils.calculatorHeight(10),
    borderColor: Themes.colors.collGray40,
    borderRadius: ScreenUtils.calculatorWidth(15),
  },
  bottomModal: {
    marginBottom: ScreenUtils.calculatorHeight(20),
  },
});
