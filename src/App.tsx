/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { CONSTANT } from "@configs";
import {
  autoUpload,
  DropdownMessageHolder,
  NavigationUtils,
  ScreenUtils,
} from "@helpers";
import { RootNavigator } from "@navigation";
import { NavigationContainer } from "@react-navigation/native";
import { Themes } from "@themes";
import React, { useCallback, useEffect, useState } from "react";
import {
  AppState,
  DeviceEventEmitter,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import DropdownAlert from "react-native-dropdownalert";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  const [isAllowUpdate, setIsAllowUpdate] = useState<boolean>(true);

  const handleAppStateChange = useCallback(
    (nextAppState: string) => {
      if (nextAppState === "active") {
        autoUpload(isAllowUpdate, setIsAllowUpdate);
      }
    },
    [isAllowUpdate],
  );

  const uploadEvent = useCallback(() => {
    autoUpload(isAllowUpdate, setIsAllowUpdate);
  }, [isAllowUpdate]);

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    DeviceEventEmitter.addListener(
      CONSTANT.EVENT_KEY.UPLOAD_IMAGES,
      uploadEvent,
    );
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.content}>
        <StatusBar />
        <NavigationContainer ref={NavigationUtils.navigationRef}>
          <RootNavigator />
        </NavigationContainer>
      </View>
      <DropdownAlert
        ref={(ref: DropdownAlert) => DropdownMessageHolder.setDropDown(ref)}
        closeInterval={5000}
        updateStatusBar={Platform.OS === "ios"}
      />
      {/* <ConfirmDialog
        message={translate("label.needUpdate")}
        isVisible={isShowModal}
        onDismiss={() => setIsShowModal(false)}
        onDeclinePress={() => {
          setIsShowModal(false);
        }}
        onAcceptPress={() => confirmUpdate()}
        acceptText={translate("button.confirm")}
      /> */}
      {/* {loading && renderFullPageLoader()} */}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Themes.colors.black025,
    zIndex: 1,
  },
  loading: {
    width: ScreenUtils.calculatorWidth(30),
    height: ScreenUtils.calculatorWidth(30),
  },
});

export default App;
