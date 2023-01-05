import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  itemContainer: {
    marginHorizontal: ScreenUtils.scale(8),
    marginTop: ScreenUtils.scale(8),
    paddingHorizontal: ScreenUtils.scale(8),
    paddingVertical: ScreenUtils.scale(8),
    borderWidth: 2 * StyleSheet.hairlineWidth,
    borderColor: Themes.colors.colGray20,
    backgroundColor: Themes.colors.white,
    borderRadius: ScreenUtils.scale(8),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  billCodeText: {
    ...Themes.font.medium,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "700",
    color: Themes.colors.coolGray100,
  },
  createdDate: {
    ...Themes.font.medium,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "400",
    color: Themes.colors.coolGray60,
  },
  rightContent: {
    width: ScreenUtils.WIDTH / 3,
    alignItems: "center",
    justifyContent: "center",
  },
  reasonContent: {
    width: ScreenUtils.WIDTH / 2,
  },
  reason: {
    ...Themes.font.medium,
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "700",
    color: Themes.colors.coolGray60,
  },
  picker: {
    ...Themes.font.medium,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "700",
    color: Themes.colors.coolGray60,
    marginTop: ScreenUtils.scale(4),
  },
  button: {
    width: ScreenUtils.WIDTH / 3,
    paddingVertical: ScreenUtils.scale(8),
    alignItems: "center",
    borderRadius: ScreenUtils.scale(8),
    backgroundColor: Themes.colors.info60,
  },
  buttonText: {
    ...Themes.font.medium,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
    color: Themes.colors.white,
  },
  status: {
    ...Themes.font.medium,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
    color: Themes.colors.coolGray100,
  },
});
