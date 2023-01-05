import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  listShipment: {
    flex: 1,
    marginTop: ScreenUtils.scale(20),
    marginHorizontal: ScreenUtils.scale(20),
  },
  shipmentContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: Themes.colors.white,
    borderRadius: ScreenUtils.scale(15),
    padding: ScreenUtils.scale(16),
    marginBottom: ScreenUtils.scale(12),
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
    marginBottom: ScreenUtils.scale(5),
  },
  iconShipment: {
    flexDirection: "row",
    width: ScreenUtils.scale(25),
    justifyContent: "flex-start",
    alignItems: "center",
  },
  shipmentStatus: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: ScreenUtils.scale(3),
    paddingHorizontal: ScreenUtils.scale(6),
    paddingVertical: ScreenUtils.scale(2),
  },
});
