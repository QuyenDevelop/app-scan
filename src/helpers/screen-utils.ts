import { Dimensions, Platform, StatusBar } from "react-native";

const { width, height } = Dimensions.get("screen");

export const ScreenUtils = {
  calculatorWidth(width: number) {
    return Dimensions.get("screen").width / (375 / width);
  },
  calculatorHeight(height: number) {
    return Dimensions.get("screen").height / (812 / height);
  },
  getStatusBarHeight(skipAndroid: boolean = false) {
    const X_WIDTH = 375;
    const X_HEIGHT = 812;

    const XSMAX_WIDTH = 414;
    const XSMAX_HEIGHT = 896;
    let isIPhoneX = false;
    const { height, width } = Dimensions.get("window");
    const W_HEIGHT = height > width ? height : width;
    const W_WIDTH = height > width ? width : height;

    if (Platform.OS === "ios" && !Platform.isPad && !Platform.isTVOS) {
      isIPhoneX =
        (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) ||
        (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT);
    }

    return Platform.select({
      ios: isIPhoneX ? 44 : 20,
      android: skipAndroid ? 0 : StatusBar.currentHeight,
      default: 0,
    });
  },
  WIDTH: width,
  HEIGHT: height,
};
