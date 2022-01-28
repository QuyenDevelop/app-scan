import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  homeItem: {
    flex: 1,
    width: ScreenUtils.WIDTH / 3 - 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Themes.colors.white,
    // padding: ScreenUtils.scale(16),
    marginHorizontal: ScreenUtils.scale(5),
    marginVertical: ScreenUtils.scale(5),
    borderRadius: ScreenUtils.scale(15),
  },
  iconHomeItem: {
    width: ScreenUtils.scale(60),
    height: ScreenUtils.scale(60),
    marginHorizontal: ScreenUtils.scale(5),
    marginVertical: ScreenUtils.scale(5),
    // marginRight: ScreenUtils.scale(16),
  },
  contentHomeItem: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: ScreenUtils.scale(5),
  },
  titleHomeItem: {
    color: Themes.colors.coolGray100,
    fontWeight: "600",
  },
  subtitleHomeItem: {
    color: Themes.colors.coolGray80,
    fontWeight: "400",
    fontSize: 12,
  },
});
