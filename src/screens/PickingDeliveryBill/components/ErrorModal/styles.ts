import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Themes.colors.transparentBlack,
  },
  content: {
    width: ScreenUtils.WIDTH - ScreenUtils.scale(32),
    backgroundColor: Themes.colors.white,
    marginHorizontal: ScreenUtils.scale(24),
    padding: ScreenUtils.scale(8),
    borderRadius: ScreenUtils.scale(8),
  },
  title: {
    ...Themes.font.medium,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: Themes.colors.coolGray100,
    textAlign: "center",
  },
  message: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
    textAlign: "center",
    marginTop: ScreenUtils.scale(4),
  },
  confirm: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: ScreenUtils.scale(10),
  },
  button: {
    flex: 1,
    marginHorizontal: ScreenUtils.scale(4),
    paddingVertical: ScreenUtils.scale(8),
    borderRadius: ScreenUtils.scale(8),
    borderWidth: 2 * StyleSheet.hairlineWidth,
    backgroundColor: Themes.colors.white,
    borderColor: Themes.colors.info60,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCancel: {
    ...Themes.font.medium,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
    color: Themes.colors.info60,
  },
  error: {
    ...Themes.font.medium,
    fontSize: 12,
    lineHeight: 18,
    color: Themes.colors.danger60,
    marginTop: ScreenUtils.scale(4),
    marginHorizontal: ScreenUtils.scale(8),
  },
});
