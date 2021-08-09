import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  generalInfo: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  generalTab: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  generalInfoRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: ScreenUtils.calculatorWidth(10),
    paddingVertical: ScreenUtils.calculatorHeight(10),
  },
  labelInfo: {
    ...Themes.font.medium,
    fontSize: 14,
    color: Themes.colors.textPrimary,
    marginRight: ScreenUtils.calculatorWidth(5),
  },
  serviceButton: {
    borderWidth: 1,
    paddingHorizontal: ScreenUtils.calculatorWidth(10),
    paddingVertical: ScreenUtils.calculatorHeight(5),
    marginHorizontal: ScreenUtils.calculatorWidth(5),
    borderColor: Themes.colors.collGray40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputInfo: {
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: ScreenUtils.calculatorWidth(10),
    paddingVertical: ScreenUtils.calculatorHeight(5),
    marginHorizontal: ScreenUtils.calculatorWidth(5),
    borderColor: Themes.colors.collGray40,
    flexDirection: "row",
    alignItems: "center",
  },
  flex1: {
    flex: 1,
  },
  confirmPaymentBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Themes.colors.blue008,
    paddingVertical: ScreenUtils.calculatorHeight(10),
    marginTop: ScreenUtils.calculatorHeight(10),
    borderRadius: ScreenUtils.calculatorHeight(5),
    marginHorizontal: ScreenUtils.calculatorWidth(50),
  },
  confirmPaymentText: {
    ...Themes.font.medium,
    color: Themes.colors.white,
    fontSize: 14,
  },
  contentInfo: {
    ...Themes.font.bold,
  },
  shipmentContainer: {
    flexDirection: "column",
    borderWidth: 1,
    margin: ScreenUtils.calculatorWidth(10),
    padding: ScreenUtils.calculatorHeight(10),
    borderColor: Themes.colors.collGray40,
    borderRadius: ScreenUtils.calculatorWidth(10),
  },
  subShipmentContainer: {
    flexDirection: "column",
    borderWidth: 1,
    margin: ScreenUtils.calculatorWidth(10),
    padding: ScreenUtils.calculatorHeight(10),
    borderColor: Themes.colors.collGray40,
    borderRadius: ScreenUtils.calculatorWidth(10),
  },
  shipment: {
    flexDirection: "row",
    alignItems: "center",
  },
});
