import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  serviceSelect: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: ScreenUtils.scale(58),
    borderBottomWidth: 1,
    borderBottomColor: Themes.colors.colGray20,
    marginHorizontal: ScreenUtils.scale(20),
  },
  bottomModal: {
    height: "100%",
    paddingBottom: ScreenUtils.scale(10),
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
  noData: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "500",
    marginTop: ScreenUtils.scale(50),
  },
  searchInput: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: ScreenUtils.scale(12),
    paddingVertical: ScreenUtils.scale(8),
    marginHorizontal: ScreenUtils.scale(16),
    borderRadius: ScreenUtils.scale(5),
    borderColor: Themes.colors.collGray40,
  },
});
