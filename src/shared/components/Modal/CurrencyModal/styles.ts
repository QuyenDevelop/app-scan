import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  serviceSelect: {
    borderWidth: 1,
    marginHorizontal: ScreenUtils.scale(15),
    marginTop: ScreenUtils.scale(20),
    paddingHorizontal: ScreenUtils.scale(10),
    paddingVertical: ScreenUtils.scale(10),
    borderColor: Themes.colors.collGray40,
    borderRadius: ScreenUtils.scale(15),
  },
  bottomModal: {
    marginBottom: ScreenUtils.scale(20),
  },
});
