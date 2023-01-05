import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: Themes.colors.transparentBlack,
  },
  content: {
    backgroundColor: Themes.colors.white,
    marginHorizontal: ScreenUtils.scale(40),
    padding: ScreenUtils.scale(16),
    borderRadius: ScreenUtils.scale(5),
    alignItems: "center",
  },
  message: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: ScreenUtils.scale(24),
  },
  confirm: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 0.5,
  },
  buttonChild: {
    width: "95%",
    backgroundColor: Themes.colors.bg,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: ScreenUtils.scale(4),
    marginTop: ScreenUtils.scale(12),
  },
  passwordInput: {
    borderWidth: StyleSheet.hairlineWidth,
    width: "100%",
    height: ScreenUtils.scale(40),
    marginVertical: ScreenUtils.scale(16),
    paddingHorizontal: ScreenUtils.scale(8),
    paddingVertical: 0,
    borderRadius: ScreenUtils.scale(5),
    borderColor: Themes.colors.collGray40,
  },
});
