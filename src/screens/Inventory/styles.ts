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
  },
  cameraView: {
    height: 150,
  },
  camera: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  inventoryBtn: {
    backgroundColor: Themes.colors.bg,
    marginHorizontal: ScreenUtils.scale(8),
    // marginBottom: ScreenUtils.calculatorHeight(20),
    borderRadius: ScreenUtils.scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  inventoryTextBtn: {
    color: Themes.colors.white,
    fontWeight: "700",
  },
  // receiveItem: {
  //   borderBottomWidth: 1,
  //   borderColor: Themes.colors.colGray20,
  //   paddingVertical: ScreenUtils.scale(16),
  //   marginHorizontal: ScreenUtils.scale(16),
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  // },
  receiveItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inventoryChildBtn: {
    width: "100%",
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: ScreenUtils.scale(10),
    paddingHorizontal: ScreenUtils.scale(16),
  },
  input: {
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: ScreenUtils.scale(12),
    height: ScreenUtils.scale(40),
    paddingVertical: 0,
    borderColor: Themes.colors.colGray20,
  },
  addCode: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: ScreenUtils.scale(5),
    paddingLeft: ScreenUtils.scale(16),
  },
  code: {
    ...Themes.font.medium,
    fontSize: 16,
    fontWeight: "bold",
  },
  toolView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: ScreenUtils.scale(16),
    marginTop: ScreenUtils.scale(12),
  },
  locationBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  locationText: {
    marginHorizontal: ScreenUtils.scale(4),
  },
  requestInventoryItem: {
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: ScreenUtils.scale(12),
    marginBottom: ScreenUtils.scale(8),
    marginHorizontal: ScreenUtils.scale(16),
    borderColor: Themes.colors.collGray40,
    borderRadius: ScreenUtils.scale(5),
  },
  contentHeader: {
    marginHorizontal: ScreenUtils.scale(16),
    marginVertical: ScreenUtils.scale(12),
  },
  noLocation: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: ScreenUtils.scale(16),
  },
  noLocationText: {
    marginLeft: ScreenUtils.scale(8),
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: ScreenUtils.scale(10),
    marginHorizontal: ScreenUtils.scale(16),
  },
  qrUserManual: {
    textAlign: "center",
    color: Themes.colors.blue008,
    marginLeft: ScreenUtils.scale(8),
  },
  enterKeyboardButton: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Themes.colors.blue008,
    borderRadius: ScreenUtils.scale(23),
    paddingVertical: ScreenUtils.scale(12),
    marginHorizontal: "10%",
    // paddingHorizontal: ScreenUtils.scale(60),
  },
  // receiveItemContainer: {
  //   flexDirection: "column",
  //   justifyContent: "space-between",
  //   marginHorizontal: ScreenUtils.scale(8),
  // },
  receiveItemContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: ScreenUtils.scale(10),
    borderBottomWidth: 0.5,
    borderBottomColor: Themes.colors.coolGray30,
  },
  // leftContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   flex: 0.6,
  //   marginHorizontal: ScreenUtils.scale(8),
  //   marginVertical: ScreenUtils.scale(5),
  //   borderBottomWidth: 0.6,
  //   borderColor: Themes.colors.coolGray30,
  // },
  leftContainer: {
    flex: 0.7,
    marginVertical: ScreenUtils.scale(5),
    borderColor: Themes.colors.coolGray30,
  },
  deleteItemContainer: {
    width: ScreenUtils.scale(40),
    justifyContent: "center",
    alignItems: "center",
  },
  // deleteItem: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   flex: 0.5,
  //   justifyContent: "space-between",
  // },
  deleteItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.2,
    // justifyContent: "space-between",
  },
  hitSlop: {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  },
  deleteBtn: {
    marginLeft: ScreenUtils.scale(16),
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#8fb1aa",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  checkbox: {
    marginLeft: ScreenUtils.scale(8),
  },
  kHeader: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  Pieces: {
    marginHorizontal: ScreenUtils.scale(5),
    ...Themes.font.medium,
    fontSize: 15,
  },
  loading: {
    marginTop: ScreenUtils.scale(40),
  },
});
