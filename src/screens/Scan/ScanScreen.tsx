import { shipmentApi } from "@api";
import { SCREENS } from "@configs";
import { Alert } from "@helpers";
import { useShow } from "@hooks";
import {
  goToShipmentDetail,
  goToShipmentsScreen,
  ScanParamsList,
} from "@navigation";
import {
  RouteProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
  View,
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EnterCodeModal } from "./components/EnterCodeModal";
import styles from "./styles";

type NavigationRoute = RouteProp<ScanParamsList, SCREENS.SCAN_SCREEN>;

export interface ScanScreenParams {
  searchContent?: string;
}

export const ScanScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [isLoadingFetchData, showIsLoadingFetchData, hideIsLoadingFetchData] =
    useShow();
  const [content, setContent] = useState<string>("");
  const [isShowEnterCode, showEnterCode, hideEnterCode] = useShow();
  const [errorContent, setErrorContent] = useState<string>("");

  const onRead = (e: any) => {
    setContent(e.data);
    getShipment(e.data);
  };

  const getShipment = (value: string) => {
    if (value === "") {
      return;
    }
    showIsLoadingFetchData();
    shipmentApi
      .scanShipment(value)
      ?.then(shipment => {
        if (shipment?.success && shipment?.data) {
          if (shipment.data.length === 0) {
            setErrorContent(translate("error.noShipment"));
            return;
          }

          if (shipment.data.length === 1) {
            goToShipmentDetail({ item: shipment.data[0] });
            return;
          }

          goToShipmentsScreen({
            refNumber: content,
            shipments: shipment.data,
          });
        } else {
          setErrorContent(shipment?.message || "");
        }
      })
      .catch(() => {
        Alert.error("error.errorServer");
      })
      .finally(() => {
        Keyboard.dismiss();
        hideIsLoadingFetchData();
      });
  };

  return (
    <View style={styles.container}>
      {isFocused && (
        <QRCodeScanner
          onRead={onRead}
          reactivate={true}
          reactivateTimeout={2000}
          fadeIn={true}
          cameraStyle={styles.camera}
        />
      )}
      <View style={styles.markerView}>
        <View style={styles.topView}>
          {!!errorContent && (
            <>
              <Icon
                name="ic_shipment"
                size={Metrics.icons.tiny}
                color={Themes.colors.warningMain}
              />
              <Text style={styles.errorContent}>{errorContent}</Text>
            </>
          )}
        </View>
        <View style={styles.centerView}>
          <View style={styles.centerLeftView} />
          <View style={styles.centerCenterView}>
            {isLoadingFetchData && (
              <View style={styles.loadingView}>
                <ActivityIndicator color={Themes.colors.collGray40} />
              </View>
            )}
          </View>
          <View style={styles.centerLeftView} />
        </View>
        <View
          style={[styles.bottomView, { paddingBottom: insets.bottom + 30 }]}
        >
          <View>
            <Text style={styles.qrUserManual}>
              {translate("label.qrUserManual")}
            </Text>
            <TouchableOpacity
              style={styles.enterKeyboardButton}
              onPress={showEnterCode}
            >
              <Icon
                name="ic_keyboad"
                size={Metrics.icons.tiny}
                color={Themes.colors.white}
              />
              <Text style={styles.qrUserManual}>
                {translate("button.enterCode")}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="ic_close_circle"
              size={Metrics.icons.large}
              color={Themes.colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
      <EnterCodeModal
        isShowModal={isShowEnterCode}
        closeModal={hideEnterCode}
        code={content}
        onChangeCode={setContent}
        onCheckCode={getShipment}
      />
      {/* <Header title={translate("screens.checkAndScan")} />
      {profile ? (
        <>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.header}>
              <Text>{translate("label.scanOrTypeShipment")}</Text>
              <View style={styles.input}>
                <View style={styles.inputCode}>
                  <TextInput
                    placeholder={translate("placeholder.scanOrType")}
                    style={styles.flex1}
                    defaultValue={content}
                    onChangeText={searchShipments}
                    placeholderTextColor={Themes.colors.collGray40}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    returnKeyType="search"
                    returnKeyLabel={translate("button.search")}
                    onSubmitEditing={value => {
                      searchShipments(value.nativeEvent.text);
                      getShipment(value.nativeEvent.text);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.scanButton}
                    onPress={() => {
                      Keyboard.dismiss();
                      getShipment(content);
                    }}
                  >
                    <Icon
                      name="ic_search"
                      size={Metrics.icons.small}
                      color={Themes.colors.black}
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.scanButton}
                  onPress={() => {
                    Keyboard.dismiss();
                    showQrCode();
                  }}
                >
                  <Icon
                    name="qr_code"
                    size={Metrics.icons.medium}
                    color={Themes.colors.black}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
          {isLoadingFetchData ? (
            <View style={styles.loadingView}>
              <ActivityIndicator color={Themes.colors.collGray40} />
            </View>
          ) : isShowQrCode && isFocused ? (
            <QRCodeScanner
              onRead={onRead}
              reactivate={true}
              reactivateTimeout={2000}
              showMarker
              fadeIn={true}
              cameraStyle={styles.camera}
            />
          ) : (
            <ListShipment shipments={shipments} />
          )}
        </>
      ) : (
        <Logout />
      )} */}
    </View>
  );
};
