import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.background,
  },
  headerContainer: {
    margin: ScreenUtils.scale(8),
    padding: ScreenUtils.scale(8),
    backgroundColor: Themes.colors.white,
    borderRadius: ScreenUtils.scale(8),
  },
  inline: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    ...Themes.font.medium,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
    color: Themes.colors.coolGray60,
  },
  shipmentCode: {
    ...Themes.font.medium,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "700",
    color: Themes.colors.coolGray100,
  },
  shipmentReason: {
    color: Themes.colors.coolGray100,
  },
  flatListContainer: {
    flex: 1,
    backgroundColor: Themes.colors.white,
    marginHorizontal: ScreenUtils.scale(8),
    marginBottom: ScreenUtils.scale(8),
    borderRadius: ScreenUtils.scale(8),
    paddingVertical: ScreenUtils.scale(8),
  },
  footer: {
    width: ScreenUtils.WIDTH,
    paddingTop: ScreenUtils.scale(8),
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Themes.colors.white,
    paddingHorizontal: ScreenUtils.scale(4),
  },
  touchableOpacity: {
    flex: 1,
    marginHorizontal: ScreenUtils.scale(4),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: ScreenUtils.scale(8),
    borderWidth: 2 * StyleSheet.hairlineWidth,
    paddingVertical: ScreenUtils.scale(8),
    borderColor: Themes.colors.info60,
    backgroundColor: Themes.colors.info60,
  },
  pickUpText: {
    ...Themes.font.medium,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
    color: Themes.colors.white,
  },
});
