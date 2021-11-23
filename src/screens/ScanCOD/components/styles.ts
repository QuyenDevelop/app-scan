import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  bottomModal: {
    marginBottom: ScreenUtils.scale(20),
  },
  qrUserManual: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerBottomSheet: {
    paddingHorizontal: ScreenUtils.scale(20),
    paddingVertical: ScreenUtils.scale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  enterCode: {
    borderBottomWidth: 1,
    marginHorizontal: ScreenUtils.scale(20),
    marginBottom: ScreenUtils.scale(33),
    paddingVertical: ScreenUtils.scale(12),
    borderColor: Themes.colors.colGray20,
  },
});
