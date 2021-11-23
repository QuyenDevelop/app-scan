import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.colGray10,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginTop: ScreenUtils.scale(20),
  },
  headerImage: {
    width: "100%",
    height: ScreenUtils.scale(213),
  },
  headerView: {
    flexDirection: "row",
    paddingTop: ScreenUtils.scale(17),
    paddingHorizontal: ScreenUtils.scale(20),
  },
  menu: {
    marginRight: ScreenUtils.scale(10),
  },
});
