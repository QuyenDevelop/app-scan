import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: Themes.colors.bP60,
    marginTop: ScreenUtils.calculatorHeight(10),
  },
  labelStyle: {
    ...Themes.font.bold,
    fontSize: 14,
    color: Themes.colors.white,
  },
  indicatorStyle: {
    backgroundColor: Themes.colors.white,
  },
  tabContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
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
  contentInfo: {
    ...Themes.font.bold,
    fontSize: 14,
    color: Themes.colors.textPrimary,
  },
  inputInfo: {
    borderWidth: 1,
    paddingHorizontal: ScreenUtils.calculatorWidth(10),
    paddingVertical: ScreenUtils.calculatorHeight(5),
    marginHorizontal: ScreenUtils.calculatorWidth(5),
    borderColor: Themes.colors.collGray40,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    maxWidth: ScreenUtils.calculatorWidth(150),
  },
  serviceSelect: {
    borderWidth: 1,
    marginHorizontal: ScreenUtils.calculatorWidth(15),
    marginTop: ScreenUtils.calculatorHeight(20),
    paddingHorizontal: ScreenUtils.calculatorWidth(10),
    paddingVertical: ScreenUtils.calculatorHeight(10),
    borderColor: Themes.colors.collGray40,
    borderRadius: ScreenUtils.calculatorWidth(15),
  },
  serviceButton: {
    borderWidth: 1,
    paddingHorizontal: ScreenUtils.calculatorWidth(10),
    paddingVertical: ScreenUtils.calculatorHeight(5),
    marginHorizontal: ScreenUtils.calculatorWidth(5),
    borderColor: Themes.colors.collGray40,
    flexDirection: "row",
    alignItems: "center",
  },
  itemInfoContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    borderWidth: 1,
    paddingHorizontal: ScreenUtils.calculatorWidth(10),
    paddingVertical: ScreenUtils.calculatorHeight(10),
    marginHorizontal: ScreenUtils.calculatorWidth(10),
    marginVertical: ScreenUtils.calculatorHeight(10),
    borderColor: Themes.colors.collGray40,
    borderRadius: ScreenUtils.calculatorWidth(10),
  },
  images: {
    width: 100,
    height: 100,
  },
  serviceInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: ScreenUtils.calculatorWidth(10),
    paddingVertical: ScreenUtils.calculatorHeight(5),
  },
  infoItem: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: ScreenUtils.calculatorWidth(10),
  },
  serviceLabel: {
    ...Themes.font.medium,
    fontSize: 14,
    color: Themes.colors.textPrimary,
    marginHorizontal: ScreenUtils.calculatorWidth(10),
    flex: 1,
  },
  button: {
    marginHorizontal: ScreenUtils.calculatorWidth(10),
  },
  hView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
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
  logoutContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutTitle: {
    ...Themes.font.bold,
    fontSize: 18,
    color: Themes.colors.textPrimary,
    marginBottom: ScreenUtils.calculatorHeight(15),
  },
  generalTab: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  generalInfo: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  updateButton: {
    minWidth: ScreenUtils.calculatorWidth(100),
  },
  addServiceBtn: {
    marginVertical: ScreenUtils.calculatorHeight(20),
  },
  bottomModal: {
    marginBottom: ScreenUtils.calculatorHeight(20),
  },
  loadingView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
