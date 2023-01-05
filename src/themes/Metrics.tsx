import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const Resize = 1;
export const Metrics = {
  baseMargin: Resize * 2,
  baseRadius: Resize * 5,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  icons: {
    smallSmallTiny: Resize * 6,
    smallTiny: Resize * 10,
    tiny: Resize * 14,
    smallSmall: Resize * 16,
    small: Resize * 20,
    medium: Resize * 24,
    mediumLittleLarge: Resize * 27,
    mediumLarge: Resize * 28,
    large: Resize * 30,
    xl: Resize * 40,
    xxl: Resize * 48,
  },
};
