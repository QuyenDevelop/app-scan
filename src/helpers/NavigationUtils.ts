import { NavigationContainerRef } from "@react-navigation/native";
import * as React from "react";

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate<T extends object>(name?: string, params?: T) {
  if (navigationRef?.current) {
    navigationRef.current.navigate(name || "", params);
  }
}

export function goBack() {
  if (navigationRef?.current?.canGoBack()) {
    navigationRef.current.goBack();
  }
}
