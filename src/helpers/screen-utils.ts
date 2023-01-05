import { Dimensions, PixelRatio, Platform, StatusBar } from "react-native";
import deviceInfoModule from "react-native-device-info";
const { width, height } = Dimensions.get("screen");
const lagerValue = width > height ? width : height;
const smallValue = width > height ? height : width;

export const isIphoneX = () => {
  const dimension = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimension.height === 780 ||
      dimension.width === 780 ||
      dimension.height === 812 ||
      dimension.width === 812 ||
      dimension.height === 844 ||
      dimension.width === 844 ||
      dimension.height === 896 ||
      dimension.width === 896 ||
      dimension.height === 926 ||
      dimension.width === 926)
  );
};

const standardLength = deviceInfoModule.isTablet() ? smallValue : lagerValue;
const offset =
  width > height
    ? 0
    : Platform.OS === "ios"
    ? 78
    : StatusBar.currentHeight || 0; // iPhone X style SafeAreaView size in portrait
const deviceHeight =
  isIphoneX() || Platform.OS === "android"
    ? standardLength - offset
    : standardLength;

export const ScreenUtils = {
  WIDTH: width,
  HEIGHT: height,
  scale(value: number) {
    const heightPercent = (value * deviceHeight) / 667;
    return PixelRatio.roundToNearestPixel(heightPercent);
  },
};
