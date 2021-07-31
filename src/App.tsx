/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { uploadApi } from "@api";
import { CONSTANT } from "@configs";
import { getAsyncItem, NavigationUtils, ScreenUtils } from "@helpers";
import { StorageImages } from "@models";
import { RootNavigator } from "@navigation";
import { NavigationContainer } from "@react-navigation/native";
import { Themes } from "@themes";
import React, { useEffect } from "react";
import { DeviceEventEmitter, StatusBar, StyleSheet, View } from "react-native";
import BackgroundTimer from "react-native-background-timer";
import { SafeAreaProvider } from "react-native-safe-area-context";
const App = () => {
  const autoUpload = () => {
    BackgroundTimer.runBackgroundTimer(async () => {
      const listImages = await getAsyncItem(
        CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES,
      );
      if (!listImages || listImages.length === 0) {
        BackgroundTimer.stopBackgroundTimer();
      } else {
        listImages.map(item => {
          const { shipment, service, photos } = item;
          const uploadSuccess = [];
          photos.map(photo => {
            const fileName = `${shipment}_${service}_${new Date().getTime()}.jpg`;
            console.log(
              "🚀🚀🚀 => BackgroundTimer.runBackgroundTimer => fileName",
              fileName,
            );
            const imageForm = new FormData();
            imageForm.append("files", {
              uri: photo,
              type: "image/jpeg",
              name: fileName,
            });
            uploadApi
              .uploadImage(imageForm)
              ?.then(response => {
                uploadSuccess.push(photo);
                console.log(
                  "🚀🚀🚀 => uploadApi.uploadImage => response",
                  response,
                );
              })
              .catch(err => {
                console.log("🚀🚀🚀 => uploadApi.uploadImage => err", err);
              });
          });
        });
      }
    }, 1000000);
  };

  const uploadImage = () => {};

  useEffect(() => {
    autoUpload();
    DeviceEventEmitter.addListener(
      CONSTANT.EVENT_KEY.UPLOAD_IMAGES,
      (value: StorageImages) => {
        console.log("🚀🚀🚀 => useEffect => value", value);
        // autoUpload();
      },
    );
    return () => {
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
      {/* <DropdownAlert
        ref={(ref: DropdownAlert) => DropdownMessageHolder.setDropDown(ref)}
        closeInterval={5000}
        updateStatusBar={Platform.OS === "ios"}
      />
      <ConfirmDialog
        message={translate("label.needUpdate")}
        isVisible={isShowModal}
        onDismiss={() => setIsShowModal(false)}
        onDeclinePress={() => {
          setIsShowModal(false);
        }}
        onAcceptPress={() => confirmUpdate()}
        acceptText={translate("button.confirm")}
      />
      {loading && renderFullPageLoader()} */}
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
