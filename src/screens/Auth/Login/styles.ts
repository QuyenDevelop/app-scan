import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  childContainer: {
    paddingTop: ScreenUtils.calculatorHeight(18),
    paddingHorizontal: ScreenUtils.calculatorWidth(10),
  },
  title: {
    ...Themes.font.bold,
    fontSize: 24,
    color: Themes.colors.textPrimary,
  },
  noAccountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: ScreenUtils.calculatorHeight(8),
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
    marginLeft: ScreenUtils.calculatorWidth(4),
  },
  input: {
    marginTop: ScreenUtils.calculatorHeight(48),
  },
  space: {
    marginTop: ScreenUtils.calculatorHeight(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  forgotPasswordContainer: {},
  forgotPassword: {
    ...Themes.font.regular,
    color: Themes.colors.primary,
  },
  button: {
    marginTop: ScreenUtils.calculatorHeight(56),
  },
  loginSocialContainer: {
    marginTop: ScreenUtils.calculatorHeight(16),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: ScreenUtils.calculatorWidth(47),
    backgroundColor: Themes.colors.colGray20,
    height: ScreenUtils.calculatorHeight(2),
  },
  orLogin: {
    ...Themes.font.regular,
    fontSize: 14,
    color: Themes.colors.coolGray60,
    marginHorizontal: ScreenUtils.calculatorWidth(11),
  },
  buttonSocial: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: ScreenUtils.calculatorWidth(38),
    height: ScreenUtils.calculatorWidth(38),
    borderRadius: ScreenUtils.calculatorWidth(38),
    borderWidth: 2,
  },
});
