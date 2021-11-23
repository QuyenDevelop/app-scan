import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  childContainer: {
    paddingTop: ScreenUtils.scale(18),
    paddingHorizontal: ScreenUtils.scale(10),
  },
  title: {
    ...Themes.font.bold,
    fontSize: 24,
    color: Themes.colors.textPrimary,
  },
  noAccountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: ScreenUtils.scale(8),
  },
  noAccount: {
    ...Themes.font.medium,
    fontSize: 14,
    color: Themes.colors.coolGray,
  },
  buttonCreate: {
    ...Themes.font.bold,
    fontSize: 14,
    color: Themes.colors.primary,
    marginLeft: ScreenUtils.scale(4),
  },
  input: {
    marginTop: ScreenUtils.scale(48),
  },
  button: {
    marginTop: ScreenUtils.scale(56),
  },
  loginSocialContainer: {
    marginTop: ScreenUtils.scale(16),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: ScreenUtils.scale(47),
    backgroundColor: Themes.colors.colGray20,
    height: ScreenUtils.scale(2),
  },
  orLogin: {
    ...Themes.font.regular,
    fontSize: 14,
    color: Themes.colors.coolGray60,
    marginHorizontal: ScreenUtils.scale(11),
  },
  buttonGoogle: {
    borderColor: Themes.colors.google,
    borderWidth: ScreenUtils.scale(2),
    backgroundColor: Themes.colors.white,
  },
  buttonFacebook: {
    borderColor: Themes.colors.facebook,
    borderWidth: ScreenUtils.scale(2),
    backgroundColor: Themes.colors.white,
  },
  buttonSocial: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: ScreenUtils.scale(38),
    height: ScreenUtils.scale(38),
    borderRadius: ScreenUtils.scale(38),
    borderWidth: 2,
  },
});
