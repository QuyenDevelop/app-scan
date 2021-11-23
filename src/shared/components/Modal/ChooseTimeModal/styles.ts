import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  bottomModal: {
    maxHeight: "100%",
  },
  headerBottomSheet: {
    paddingHorizontal: ScreenUtils.scale(20),
    paddingTop: ScreenUtils.scale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qrUserManual: {
    fontSize: 18,
    fontWeight: "600",
  },
  applyBtn: {
    backgroundColor: Themes.colors.bg,
    height: ScreenUtils.scale(48),
    marginHorizontal: ScreenUtils.scale(70),
    borderRadius: ScreenUtils.scale(24),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: ScreenUtils.scale(30),
  },
  applyTextBtn: {
    fontWeight: "600",
    color: Themes.colors.white,
  },
  modalIOS: {
    marginBottom: ScreenUtils.scale(-10),
    marginHorizontal: ScreenUtils.scale(0),
  },
});
