import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  listShipment: {
    flex: 1,
    marginTop: ScreenUtils.calculatorHeight(20),
    marginHorizontal: ScreenUtils.calculatorWidth(20),
  },
  shipmentContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: Themes.colors.white,
    borderRadius: ScreenUtils.calculatorWidth(15),
    padding: ScreenUtils.calculatorWidth(16),
  },
  shipment: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shipmentNumber: {
    fontWeight: "600",
    color: Themes.colors.coolGray100,
  },
  infoText: {
    fontWeight: "400",
    color: Themes.colors.coolGray100,
  },
  shipmentInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: ScreenUtils.calculatorHeight(5),
  },
  iconShipment: {
    flexDirection: "row",
    width: ScreenUtils.calculatorWidth(25),
    justifyContent: "flex-start",
    alignItems: "center",
  },
  shipmentStatus: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: ScreenUtils.calculatorWidth(3),
    paddingHorizontal: ScreenUtils.calculatorWidth(6),
    paddingVertical: ScreenUtils.calculatorHeight(2),
  },
});
