import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  receiveItem: {
    borderBottomWidth: 1,
    borderColor: Themes.colors.colGray20,
    paddingVertical: ScreenUtils.scale(8),
    marginHorizontal: ScreenUtils.scale(16),
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
  code: {
    ...Themes.font.medium,
    fontSize: 16,
    fontWeight: "bold",
    flex: 0.6,
  },
  deleteItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.4,
    justifyContent: "space-between",
  },
  quantityInput: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: ScreenUtils.scale(5),
    paddingVertical: ScreenUtils.scale(1),
    paddingLeft: ScreenUtils.scale(8),
    borderColor: Themes.colors.collGray40,
  },
  deleteBtn: {
    marginLeft: ScreenUtils.scale(16),
  },
});
