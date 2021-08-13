import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: Themes.colors.white,
  },
  imageLibrary: {
    width: "100%",
    height: 80,
    flex: 1,
    margin: 2,
  },
});
