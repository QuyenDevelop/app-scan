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
  autoUploadImageService,
  DropdownMessageHolder,
  NavigationUtils,
  ScreenUtils,
} from "@helpers";
import { useShow } from "@hooks";
import { RootNavigator } from "@navigation";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "@redux";
import { UpdateModal } from "@shared";
import { Themes } from "@themes";
import React, { useCallback, useEffect, useState } from "react";
import {
  AppState,
  AppStateStatus,
  DeviceEventEmitter,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import codePush, { DownloadProgress } from "react-native-code-push";
import DropdownAlert from "react-native-dropdownalert";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

const App = () => {
  const [isExitsUpdate, showUpdateModal] = useShow();
  const [progressUpdate, setProgress] = useState<DownloadProgress>({
    receivedBytes: 0,
    totalBytes: 1,
  });

  const codePushStatusDidChange = (_status: codePush.SyncStatus) => {
    return;
  };

  const codePushDownloadDidProgress = (progress: DownloadProgress) => {
    setProgress(progress);
  };

  const sync = useCallback(() => {
    codePush.checkForUpdate().then(update => {
      if (update) {
        showUpdateModal();
        codePush.sync(
          {
            installMode: codePush.InstallMode.IMMEDIATE,
          },
          codePushStatusDidChange,
          codePushDownloadDidProgress,
        );
      }
    });
  }, [showUpdateModal]);

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (nextAppState === "active") {
        sync();
        autoUploadImageService();
      }
    },
    [sync],
  );

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    DeviceEventEmitter.addListener(
      CONSTANT.EVENT_KEY.UPLOAD_IMAGES,
      autoUploadImageService,
    );

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
      DeviceEventEmitter.removeAllListeners();
    };
  }, [handleAppStateChange]);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View style={styles.content}>
          <StatusBar />
          <NavigationContainer ref={NavigationUtils.navigationRef}>
            <RootNavigator />
          </NavigationContainer>
        </View>
        <DropdownAlert
          ref={(ref: DropdownAlert) => DropdownMessageHolder.setDropDown(ref)}
          closeInterval={2000}
          updateStatusBar={Platform.OS === "ios"}
        />
        <UpdateModal
          isVisible={isExitsUpdate}
          title="Cập nhật phần mềm"
          message="Phần mềm đang được cập nhật, vui lòng chờ trong giây lát!"
          progress={progressUpdate}
        />
      </SafeAreaProvider>
    </Provider>
  );
};

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
};

const EfexWarehouse = codePush(codePushOptions)(App);

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
    width: ScreenUtils.scale(30),
    height: ScreenUtils.scale(30),
  },
});

export default EfexWarehouse;
