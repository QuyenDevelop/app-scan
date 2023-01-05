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
    paddingHorizontal: ScreenUtils.scale(20),
  },
  image: {
    width: ScreenUtils.scale(48),
    height: ScreenUtils.scale(48),
    borderRadius: 5,
  },
  capture: {
    width: ScreenUtils.scale(70),
    height: ScreenUtils.scale(70),
    borderRadius: ScreenUtils.scale(35),
    backgroundColor: Themes.colors.error,
  },
  flashText: {
    ...Themes.font.medium,
    color: Themes.colors.white,
  },
  flex1: {
    flex: 1,
  },
  coverView: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: ScreenUtils.scale(20),
  },
  takePicture: {
    width: ScreenUtils.scale(72),
    height: ScreenUtils.scale(72),
  },
  imageThumbnail: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imageThumbnailText: {
    fontSize: 12,
    color: Themes.colors.white,
    marginTop: ScreenUtils.scale(4),
  },
});
