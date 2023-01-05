import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
  },
  content: {
    flex: 1,
    marginTop: ScreenUtils.scale(25),
  },
  logoutButton: {
    backgroundColor: Themes.colors.colGray10,
    borderRadius: 45,
    width: ScreenUtils.WIDTH - 40,
    marginTop: ScreenUtils.scale(100),
  },
  logoutButtonTitle: {
    color: Themes.colors.coolGray100,
  },
  postOfficeBtn: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Themes.colors.colGray20,
    paddingHorizontal: ScreenUtils.scale(16),
    paddingVertical: ScreenUtils.scale(10),
    marginBottom: ScreenUtils.scale(10),
    borderRadius: ScreenUtils.scale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
});
