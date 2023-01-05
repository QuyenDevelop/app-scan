import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bottomCamera: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: ScreenUtils.scale(5),
    paddingHorizontal: ScreenUtils.scale(10),
  },
  image: {
    width: ScreenUtils.scale(70),
    height: ScreenUtils.scale(70),
    borderRadius: 10,
  },
  capture: {
    width: ScreenUtils.scale(70),
    height: ScreenUtils.scale(70),
    borderRadius: ScreenUtils.scale(35),
    backgroundColor: Themes.colors.error,
  },
  flashButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  flashText: {
    ...Themes.font.medium,
    color: Themes.colors.white,
  },
  imageLibrary: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  iconCheck: {
    position: "absolute",
    bottom: ScreenUtils.scale(8),
    right: ScreenUtils.scale(8),
  },
  imageView: {
    width: (ScreenUtils.WIDTH - ScreenUtils.scale(32)) / 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: ScreenUtils.scale(4),
  },
  content: {
    marginHorizontal: ScreenUtils.scale(12),
    flex: 1,
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: ScreenUtils.scale(12),
    paddingHorizontal: ScreenUtils.scale(48),
  },
  loadingView: {
    flex: 1,
    top: -20,
    bottom: -20,
    left: -20,
    right: -20,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Themes.colors.transparentBlack,
  },
  titleRight: {
    color: Themes.colors.white,
    fontSize: 16,
  },
  contentContainer: {
    paddingVertical: ScreenUtils.scale(12),
  },
});
