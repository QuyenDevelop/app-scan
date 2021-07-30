import { shipmentApi } from "@api";
import { Header } from "@components";
import { CONSTANT } from "@configs";
import { useIsMounted, useShow } from "@hooks";
import { Account, ShipmentResponse } from "@models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AccountAction, IRootState } from "@redux";
import { Icon } from "@shared";
import { Metrics, Themes } from "@themes";
import debounce from "lodash/debounce";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { ListShipment } from "./components/ListShipment";
import { Logout } from "./components/Logout";
import styles from "./styles";
export const ScanScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const profile = useSelector(
    (state: IRootState) => state.account.profile,
  ) as Account | null;
  const [isLoading, showIsLoading, hideIsLoading] = useShow(true);
  const [isLoadingFetchData, showIsLoadingFetchData, hideIsLoadingFetchData] =
    useShow();
  const [content, setContent] = useState<string>("");
  const [isShowQrCode, showQrCode, hideQrCode] = useShow(true);
  const [shipments, setShipments] = useState<Array<ShipmentResponse>>([]);
  const isMounted = useIsMounted();

  const onRead = (e: any) => {
    setContent(e.data);
    getShipment(e.data);
  };

  const getShipment = (value: string) => {
    showIsLoadingFetchData;
    console.log("🚀🚀🚀 => fetchData => value", value);
    shipmentApi
      .scanShipment(value)
      ?.then(shipment => {
        setShipments(shipment?.data || []);
        hideQrCode();
      })
      .finally(() => {
        Keyboard.dismiss();
        hideIsLoadingFetchData();
      });
  };

  const getShipmentOnType = useRef(debounce(getShipment, 500)).current;

  const searchShipments = (value: string) => {
    setContent(value);
    getShipmentOnType(value);
  };

  const authenticate = async (): Promise<void> => {
    const accessToken = await AsyncStorage.getItem(
      CONSTANT.TOKEN_STORAGE_KEY.ACCESS_TOKEN,
    );

    if (accessToken) {
      console.log("🚀🚀🚀 => authenticate => accessToken", accessToken);
      dispatch(
        AccountAction.userInfo(
          {},
          {
            onSuccess: () => {
              hideIsLoading();
            },
            onFinish: () => {
              hideIsLoading();
            },
            onFailure: () => {
              hideIsLoading();
            },
          },
        ),
      );
      return;
    } else {
      hideIsLoading();
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
          },
        ]}
      >
        <Header title="Check and scan" />
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <ActivityIndicator />
        </View>
      </View>
    );
  }

  const onFocus = () => {
    hideQrCode();
  };
  const onBlur = () => {
    if (content === "" && shipments.length === 0) {
      showQrCode();
    }
  };
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Check and scan" />
      {profile ? (
        <>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.header}>
              <Text>Scan or type shipment/reference no</Text>
              <View style={styles.input}>
                <TextInput
                  placeholder="Scan or type"
                  style={styles.inputCode}
                  defaultValue={content}
                  onChangeText={searchShipments}
                  placeholderTextColor={Themes.colors.collGray40}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
                <TouchableOpacity
                  style={styles.scanButton}
                  onPress={showQrCode}
                >
                  <Icon
                    name="ic_scanner"
                    size={Metrics.icons.medium}
                    color={Themes.colors.black}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.scanButton}>
                  <Icon
                    name="ic_arrow_right"
                    size={Metrics.icons.medium}
                    color={Themes.colors.black}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
          {isLoadingFetchData ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <ActivityIndicator />
            </View>
          ) : isShowQrCode ? (
            <QRCodeScanner
              onRead={onRead}
              reactivate={true}
              reactivateTimeout={2000}
              showMarker
              fadeIn={true}
              cameraStyle={{ width: "100%", height: "100%" }}
              // customMarker={<View style={styles.markerView} />}
            />
          ) : (
            <ListShipment shipments={shipments} />
          )}
        </>
      ) : (
        <Logout />
      )}
    </View>
  );
};
