import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
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
  centerView: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
  },
  loadingView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  toolView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: ScreenUtils.scale(16),
    paddingVertical: ScreenUtils.scale(12),
    borderBottomWidth: 0.5,
  },
  locationText: {
    // marginHorizontal: ScreenUtils.scale(8),
    fontSize: 18,
  },
  locationBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonBox: {
    width: "100%",
    height: 60,
    position: "absolute",
    bottom: ScreenUtils.scale(12),
    flexDirection: "row",
  },
  halfButtonBox: {
    width: "50%",
  },
  qrUserManual: {
    textAlign: "center",
    color: Themes.colors.blue008,
    marginLeft: ScreenUtils.scale(8),
  },
  enterKeyboardButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Themes.colors.blue008,
    borderRadius: ScreenUtils.scale(8),
    paddingVertical: ScreenUtils.scale(12),
    marginHorizontal: ScreenUtils.scale(16),
    marginTop: ScreenUtils.scale(10),
  },
  receiveItemContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: ScreenUtils.scale(10),
    marginHorizontal: ScreenUtils.scale(16),
  },
  receiveItem: {
    marginVertical: ScreenUtils.scale(5),
    marginHorizontal: ScreenUtils.scale(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hitSlop: {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  },
  code: {
    ...Themes.font.medium,
    fontSize: 16,
    fontWeight: "bold",
  },
  Pieces: {
    ...Themes.font.medium,
    fontSize: 13,
  },
  deleteBtn: {
    marginLeft: ScreenUtils.scale(16),
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
    height: ScreenUtils.scale(48),
    paddingVertical: 0,
    borderColor: Themes.colors.colGray20,
  },
  addCode: {
    justifyContent: "center",
    alignItems: "center",
    padding: ScreenUtils.scale(8),
  },
});
