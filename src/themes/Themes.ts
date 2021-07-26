import { DefaultTheme } from "@react-navigation/native";

export const FontFamily = {
  bold: "SFProText-Bold",
  semiBold: "SFProText-Semibold",
  medium: "SFProText-Medium",
  regular: "SFProText-Regular",
  currency: "Oswald-Medium",
  currencyRegular: "Oswald-Regular",
};

export const Themes = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    blue008: "#0080E4",
    green22: "#229F26",
    red0033: "#FF0033",
    red0722: "#FF0722",
    text: "#000000",
    gradient: "#00AEE4",
    primary: "#005DF8",
    textPrimary: "#121619",
    secondary: "#414757",
    surface: "#EEEEEE",
    error: "#f13a59",
    coolGray: "#A1A9B0",
    coolGray30: "#C0C7CD",
    coolGray60: "#687077",
    coolGray70: "#4C5358",
    coolGray80: "#333A3F",
    coolGray100: "#121619",
    collGray40: "#A1A9B0",
    colGray20: "#DDE1E6",
    colGray10: "#F2F4F8",
    white: "#ffffff",
    google: "#E24E46",
    facebook: "#3C5791",
    twitter: "#009AE6",
    black025: "rgba(0,0,0,0.25)",
    black07: "rgba(0,0,0,0.7)",
    brand60: "#B81010",
    info10: "#ECF5FE",
    info60: "#005DF8",
    warning50: "#FFAA4E",
    sBrand60: "#00194F",
    danger60: "#E11F2F",
    danger4933: "#D04933",
    black80: "#232F3ECC",
    black4C53: "#4C5358",
    blue3DC9: "#003DC9",
    bP60: "#8E35F6",
    grayC4: "#C4C4C4",
    success60: "#229F26",
    success70: "#237804",
    success10: "#F5FFEE",
    warningMain: "#FF8D30",
    border: "#EEEEEF",
    backgroundOpacity: "rgba(255,255,255,0.54)",
    transparent: "#ffffff00",
    pinkHeart: "#FF99FF",
    red10: "#FF0000",
    red20: "rgba(255,7,34,0.8)",
    yellow: "#FFD858",
    yellow279: "#FFE279",
    black: "#000000",
  },
  font: {
    bold: {
      fontFamily: FontFamily.bold,
    },
    semiBold: {
      fontFamily: FontFamily.semiBold,
    },
    medium: {
      fontFamily: FontFamily.medium,
    },
    regular: {
      fontFamily: FontFamily.regular,
    },
    currency: {
      fontFamily: FontFamily.currency,
    },
    currencyRegular: {
      fontFamily: FontFamily.currencyRegular,
    },
  },
};
