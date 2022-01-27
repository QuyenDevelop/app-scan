import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  receiveItemContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: ScreenUtils.scale(10),
    borderBottomWidth: 0.5,
    borderBottomColor: Themes.colors.coolGray30,
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
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: ScreenUtils.scale(5),
  },
  deleteItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.2,
    // justifyContent: "space-between",
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
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 0.7,
    marginVertical: ScreenUtils.scale(5),
    borderColor: Themes.colors.coolGray30,
  },
  deleteItemContainer: {
    width: ScreenUtils.scale(40),
    justifyContent: "center",
    alignItems: "center",
  },
  bag: {
    ...Themes.font.medium,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: ScreenUtils.scale(8),
  },
  Pieces: {
    marginHorizontal: ScreenUtils.scale(5),
    ...Themes.font.medium,
    fontSize: 14,
  },
});
