import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  shipmentItem: {
    paddingHorizontal: ScreenUtils.scale(4),
    paddingVertical: ScreenUtils.scale(8),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2 * StyleSheet.hairlineWidth,
    borderBottomColor: Themes.colors.colGray20,
  },
  shipment: {
    ...Themes.font.medium,
    fontSize: 14,
    lineHeight: 18,
    color: Themes.colors.coolGray100,
  },
  staff: {
    textAlign: "left",
    ...Themes.font.medium,
    fontSize: 12,
    lineHeight: 18,
    color: Themes.colors.coolGray60,
  },
  location: {
    textAlign: "left",
    ...Themes.font.medium,
    fontSize: 12,
    lineHeight: 18,
    color: Themes.colors.coolGray60,
  },
  quantity: {
    textAlign: "center",
    ...Themes.font.medium,
    fontSize: 12,
    lineHeight: 18,
    color: Themes.colors.coolGray60,
  },
});
