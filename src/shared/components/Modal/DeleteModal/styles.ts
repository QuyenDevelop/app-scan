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
  },
  message: {
    fontSize: 16,
    fontWeight: "500",
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
  icon: {
    alignSelf: "center",
    marginVertical: ScreenUtils.scale(12),
  },
});
