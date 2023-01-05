import { Utils } from "@helpers";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { StatusBarStyle } from "react-native";

export const useStatusBar = (
  style: StatusBarStyle = "light-content",
  backgroundColor: string = "transparent",
) => {
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      Utils.changeStatusBar(style, backgroundColor);
    });
    return unsubscribe;
  }, [navigation, style, backgroundColor]);
};
