import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  cameraView: {
    height: 150,
  },
  camera: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  centerView: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
  },
  loadingView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: ScreenUtils.scale(10),
    paddingHorizontal: ScreenUtils.scale(16),
  },
  input: {
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: ScreenUtils.scale(12),
    height: ScreenUtils.scale(48),
    paddingVertical: 0,
    borderColor: Themes.colors.colGray20,
  },
  addCode: {
    justifyContent: "center",
    alignItems: "center",
    padding: ScreenUtils.scale(8),
  },
  warningLocation: {
    ...Themes.font.medium,
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "400",
    color: Themes.colors.danger60,
    marginLeft: ScreenUtils.scale(16),
  },
  textInline: {
    marginHorizontal: ScreenUtils.scale(8),
    paddingHorizontal: ScreenUtils.scale(8),
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: ScreenUtils.scale(4),
  },
  text: {
    ...Themes.font.medium,
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "400",
    color: Themes.colors.coolGray100,
  },
});
