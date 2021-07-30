import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.white,
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
    paddingHorizontal: ScreenUtils.calculatorWidth(30),
    marginVertical: ScreenUtils.calculatorHeight(10),
  },
  inputCode: {
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: ScreenUtils.calculatorWidth(15),
    paddingVertical: ScreenUtils.calculatorHeight(10),
    borderColor: Themes.colors.collGray40,
    borderRadius: ScreenUtils.calculatorWidth(10),
    marginRight: ScreenUtils.calculatorWidth(15),
  },
  header: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: ScreenUtils.calculatorHeight(10),
  },
  scanButton: {
    marginHorizontal: ScreenUtils.calculatorWidth(5),
  },
  markerView: {
    borderWidth: 1,
    borderColor: Themes.colors.green22,
    width: "50%",
    height: "50%",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
});
