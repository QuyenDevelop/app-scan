import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
  input: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ScreenUtils.scale(30),
    marginTop: ScreenUtils.scale(10),
  },
  inputCode: {
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: ScreenUtils.scale(15),
    paddingVertical: ScreenUtils.scale(10),
    borderColor: Themes.colors.collGray40,
    borderRadius: ScreenUtils.scale(10),
    marginRight: ScreenUtils.scale(15),
  },
  header: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: ScreenUtils.scale(30),
  },
  scanButton: {
    marginHorizontal: ScreenUtils.scale(5),
  },
  tabBar: {
    backgroundColor: Themes.colors.white,
  },
  labelStyle: {
    fontSize: 14,
    color: Themes.colors.coolGray100,
    fontWeight: "600",
  },
  indicatorStyle: {
    backgroundColor: Themes.colors.brand60,
  },
  scene: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
