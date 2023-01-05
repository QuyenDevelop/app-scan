import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  shipmentContainer: {
    flexDirection: "column",
    marginHorizontal: ScreenUtils.scale(20),
    padding: ScreenUtils.scale(16),
    marginBottom: ScreenUtils.scale(12),
    backgroundColor: Themes.colors.white,
    borderRadius: ScreenUtils.scale(15),
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
    borderRadius: ScreenUtils.scale(3),
    paddingHorizontal: ScreenUtils.scale(6),
    paddingVertical: ScreenUtils.scale(2),
  },
  shipmentInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: ScreenUtils.scale(8),
  },
  iconShipment: {
    flexDirection: "row",
    width: ScreenUtils.scale(25),
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    flex: 1,
    fontWeight: "400",
    color: Themes.colors.coolGray100,
    marginLeft: ScreenUtils.scale(4),
  },
  headerFilter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: ScreenUtils.scale(20),
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
    paddingTop: ScreenUtils.scale(30),
    paddingHorizontal: ScreenUtils.scale(20),
  },
  selectedBtn: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    borderBottomWidth: 1,
    borderColor: Themes.colors.colGray20,
    paddingVertical: ScreenUtils.scale(13),
    marginBottom: ScreenUtils.scale(24),
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
    marginTop: ScreenUtils.scale(20),
    borderColor: Themes.colors.colGray20,
    paddingVertical: ScreenUtils.scale(10),
    borderRadius: 5,
  },
  removeItemButton: {
    position: "absolute",
    right: ScreenUtils.scale(16),
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
    marginTop: ScreenUtils.scale(24),
  },
  selectTime: {
    flex: 0.5,
    flexDirection: "column",
    paddingRight: ScreenUtils.scale(5),
    borderBottomWidth: 1,
    borderBottomColor: Themes.colors.colGray20,
    marginRight: ScreenUtils.scale(10),
  },
  dateButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: ScreenUtils.scale(12),
    marginBottom: ScreenUtils.scale(7),
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
    height: ScreenUtils.scale(48),
    marginHorizontal: ScreenUtils.scale(20),
    borderRadius: ScreenUtils.scale(24),
    justifyContent: "center",
    alignItems: "center",
  },
  applyTextBtn: {
    fontWeight: "600",
    color: Themes.colors.white,
  },
});
