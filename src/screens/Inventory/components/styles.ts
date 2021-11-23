import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  receiveItemContainer: {
    borderBottomWidth: 1,
    borderColor: Themes.colors.colGray20,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: ScreenUtils.scale(16),
    marginHorizontal: ScreenUtils.scale(16),
  },
  receiveItem: {
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
  },
  deleteItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.4,
    justifyContent: "space-between",
  },
  quantityInput: {
    borderWidth: 1,
    width: ScreenUtils.scale(50),
    paddingHorizontal: ScreenUtils.scale(4),
    borderRadius: ScreenUtils.scale(5),
    paddingVertical: ScreenUtils.scale(5),
    borderColor: Themes.colors.collGray40,
  },
  deleteBtn: {
    marginLeft: ScreenUtils.scale(16),
  },
  leftContainer: {
    flex: 0.6,
    marginHorizontal: ScreenUtils.scale(16),
  },
  deleteItemContainer: {
    width: ScreenUtils.scale(50),
    justifyContent: "center",
    alignItems: "center",
  },
  bag: {
    ...Themes.font.medium,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: ScreenUtils.scale(8),
  },
});
