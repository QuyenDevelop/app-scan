import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  receiveItem: {
    marginHorizontal: ScreenUtils.scale(10),
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
    flex: 0.6,
  },
  deleteItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.5,
    justifyContent: "space-between",
  },
  quantityInput: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: ScreenUtils.scale(5),
    paddingVertical: ScreenUtils.scale(1),
    paddingLeft: ScreenUtils.scale(8),
    borderColor: Themes.colors.collGray40,
  },
  deleteBtn: {
    marginLeft: ScreenUtils.scale(16),
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: Themes.colors.transparentBlack,
  },
  content: {
    backgroundColor: Themes.colors.white,
    marginHorizontal: ScreenUtils.scale(40),
    padding: ScreenUtils.scale(16),
    borderRadius: ScreenUtils.scale(5),
  },
  message: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: Themes.colors.coolGray100,
    marginBottom: ScreenUtils.scale(16),
  },
  messageText: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    color: Themes.colors.coolGray60,
    marginBottom: ScreenUtils.scale(16),
  },
  confirm: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 0.5,
  },
  buttonChild: {
    width: "95%",
    backgroundColor: Themes.colors.bg,
  },
  icon: {
    alignSelf: "center",
    marginVertical: ScreenUtils.scale(12),
  },
  waitingModalContainer: {
    flex: 1,
    height: ScreenUtils.HEIGHT,
    width: ScreenUtils.WIDTH,
    justifyContent: "center",
    alignItems: "center",
    // opacity: "0.5",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  loading: {
    height: ScreenUtils.HEIGHT,
    width: ScreenUtils.WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  imageView: {
    width: (ScreenUtils.WIDTH - ScreenUtils.scale(32)) / 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: ScreenUtils.scale(4),
  },
  imageLibrary: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  iconCheck: {
    position: "absolute",
    bottom: ScreenUtils.scale(8),
    right: ScreenUtils.scale(8),
  },
  bottomModal: {
    maxHeight: "100%",
    paddingBottom: ScreenUtils.scale(10),
  },
  serviceSelect: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: ScreenUtils.scale(20),
    borderBottomWidth: 1,
    borderBottomColor: Themes.colors.colGray20,
    marginHorizontal: ScreenUtils.scale(20),
  },
  imagesListContainer: {
    paddingHorizontal: ScreenUtils.scale(8),
  },
  ImageButton: {
    width: ScreenUtils.scale(40),
    height: ScreenUtils.scale(40),
    marginHorizontal: ScreenUtils.scale(4),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: ScreenUtils.scale(4),
    overflow: "hidden",
  },
  images: {
    width: ScreenUtils.scale(40),
    height: ScreenUtils.scale(40),
  },
});
