import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  shipmentContainer: {
    flexDirection: "column",
    marginHorizontal: ScreenUtils.calculatorWidth(20),
    padding: ScreenUtils.calculatorHeight(16),
    marginBottom: ScreenUtils.calculatorHeight(12),
    backgroundColor: Themes.colors.white,
    borderRadius: ScreenUtils.calculatorWidth(15),
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
  shipmentStatus: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: ScreenUtils.calculatorWidth(3),
    paddingHorizontal: ScreenUtils.calculatorWidth(6),
    paddingVertical: ScreenUtils.calculatorHeight(2),
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
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontWeight: "400",
    color: Themes.colors.coolGray100,
  },
  headerFilter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: ScreenUtils.calculatorWidth(20),
  },
  titleHeader: {
    fontSize: 18,
    fontWeight: "600",
  },
  resetBtn: {
    fontWeight: "400",
    color: Themes.colors.brand60,
  },
  edgeHeaderItem: {
    flex: 0.2,
    flexDirection: "row",
  },
  contentFilter: {
    flex: 1,
    paddingTop: ScreenUtils.calculatorHeight(30),
    paddingHorizontal: ScreenUtils.calculatorWidth(20),
  },
  selectedBtn: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    borderBottomWidth: 1,
    borderColor: Themes.colors.colGray20,
    paddingVertical: ScreenUtils.calculatorHeight(13),
    marginBottom: ScreenUtils.calculatorHeight(24),
  },
  selectTitleBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginTop: ScreenUtils.calculatorHeight(20),
    borderColor: Themes.colors.colGray20,
    paddingVertical: ScreenUtils.calculatorHeight(10),
    borderRadius: 5,
  },
  removeItemButton: {
    position: "absolute",
    right: ScreenUtils.calculatorWidth(16),
  },
  hitSlop: {
    top: 10,
    bottom: 0,
    left: 0,
    right: 0,
  },
  selectTitle: {
    fontWeight: "600",
  },
  selectTimeView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: ScreenUtils.calculatorHeight(24),
  },
  selectTime: {
    flex: 0.5,
    flexDirection: "column",
    paddingRight: ScreenUtils.calculatorWidth(5),
    borderBottomWidth: 1,
    borderBottomColor: Themes.colors.colGray20,
    marginRight: ScreenUtils.calculatorWidth(10),
  },
  dateButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: ScreenUtils.calculatorHeight(12),
    marginBottom: ScreenUtils.calculatorHeight(7),
  },
  smallText: {
    fontSize: 12,
    color: Themes.colors.coolGray60,
  },
  timeText: {
    fontSize: 16,
  },
  applyBtn: {
    backgroundColor: Themes.colors.bg,
    height: ScreenUtils.calculatorHeight(48),
    marginHorizontal: ScreenUtils.calculatorWidth(20),
    borderRadius: ScreenUtils.calculatorWidth(24),
    justifyContent: "center",
    alignItems: "center",
  },
  applyTextBtn: {
    fontWeight: "600",
    color: Themes.colors.white,
  },
});
