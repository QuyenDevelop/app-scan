/* eslint-disable react-native/no-inline-styles */
import { Header } from "@components";
import { CONSTANT, SCREENS } from "@configs";
import { Alert, getAsyncItem, ScreenUtils } from "@helpers";
import { useShow } from "@hooks";
import { PlatformAndroidStatic, PostOfficeItemResponse } from "@models";
import { BarcodeMask } from "@nartc/react-native-barcode-mask";
import { PickingParamsList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { IRootState } from "@redux";
import { Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import { debounce } from "lodash";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { RNCamera } from "react-native-camera";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { ConfirmModal } from "../components/ConfirmModal";
import { ShipmentItemNormal } from "./components/ShipmentItemNomal";
import { ShipmentItemTokyo } from "./components/ShipmentItemTokyo";
import styles from "./styles";

type NavigationRoute = RouteProp<PickingParamsList, SCREENS.PICKING_SCREEN>;

export interface PickingParams {
  id: string;
  tab: string;
}

export const PickingScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const router = useRoute<NavigationRoute>();
  const params = router?.params;
  console.log("🚀🚀🚀 => params", params);
  const [isLoadingFetchData, showIsLoadingFetchData, hideIsLoadingFetchData] =
    useShow();
  const inputRef = useRef<TextInput>(null);
  const postOfficesData = useSelector(
    (state: IRootState) => state.account.postOffices,
  );
  const [postOffices, setPostOffice] = useState<PostOfficeItemResponse>();
  const PlatformBrandConstraint = Platform.constants as PlatformAndroidStatic;
  const [location, setLocation] = useState<string>("");
  const [barcode, setBarcodes] = useState<string>("");
  const [isShowModalConfirm, showModalConfirm, hideModalConfirm] = useShow();
  const [reason, setReason] = useState<string>("");
  const [loading, showLoading, hideLoading] = useShow();
  const [loadingSubmit, showLoadingSubmit, hideLoadingSubmit] = useShow();
  const [dataShipments, setDataShipment] = useState<Array<any>>([]);

  useEffect(() => {
    const getPostoffice = async () => {
      const postOfficeId = await getAsyncItem(
        CONSTANT.TOKEN_STORAGE_KEY.ICHIBA_POSTOFFICE_ID,
      );
      if (postOfficeId) {
        const postOffice = postOfficesData.find(
          item => item.Id === postOfficeId,
        );
        setPostOffice(postOffice);
      }
    };
    getPostoffice();
  }, [postOfficesData]);

  useEffect(() => {
    showLoading();

    setTimeout(() => {
      setDataShipment([
        {
          shipmentId: "IC220665871JP",
          tracking: "256245828750",
          location: "B-01-01-02",
          quantity: 1,
          staff: "Lê Thị Hương",
          isPicked: false,
        },
      ]);
      hideLoading();
    }, 500);
  }, []);

  useEffect(() => {
    PlatformBrandConstraint.Brand === CONSTANT.PLATFORM_BRAND.HONEYWELL &&
      inputRef.current &&
      inputRef.current.focus();
  }, [PlatformBrandConstraint.Brand]);

  const isShipmentCode = (value: string) => {
    return new RegExp(/^([0-9A-Z]){9,20}$/g).test(value);
  };
  const isLocationCode = (value: string) => {
    return new RegExp(/^[A-z](-[0-9A-Z]{2}){1,3}$/g).test(value);
  };
  const onRead = async ({ barcodes }: { barcodes: Array<any> }) => {
    if (barcodes.length > 0 && !!barcodes[0].data) {
      // const checkShipment = shipmentCode.filter(shipment => {
      //   const itemData = shipment
      //     ? shipment.ShipmentNumber.toUpperCase()
      //     : "".toUpperCase();
      //   const textSearch = barcodes[0].data.trim().toUpperCase();
      //   return itemData.indexOf(textSearch) > -1;
      // });
      if (!isLoadingFetchData) {
        // get location
        if (!location && isLocationCode(barcodes[0].data.trim())) {
          Vibration.vibrate();
          getLocation(barcodes[0].data.trim());
          return;
        }
        // get shipment
        if (location && isShipmentCode(barcodes[0].data.trim())) {
          Vibration.vibrate();
          await getShipment(barcodes[0]?.data.trim());
          return;
        }
      }
    }
  };

  const onScan = async (barcodes: string) => {
    if (!barcodes || barcodes === "") {
      Alert.error("error.errBarCode");
      return;
    }
    if (!isLoadingFetchData) {
      // get location
      if (!location && isLocationCode(barcodes.trim())) {
        Vibration.vibrate();
        getLocation(barcodes.trim());
        return;
      }
      // get shipment
      if (location && isShipmentCode(barcodes.trim())) {
        Vibration.vibrate();
        await getShipment(barcodes.trim());
        return;
      }

      Alert.error("error.errBarCode");
      setBarcodes("");
    }
  };

  const getLocation = (value: string | null) => {
    if (!value || value === "") {
      Alert.error("error.errBarCode");
      return;
    }
    showIsLoadingFetchData();

    setTimeout(() => {
      setLocation(value);
      hideIsLoadingFetchData();
      setBarcodes("");
    }, 500);
  };

  const getShipment = (value: string) => {
    if (!value || value === "" || value === null) {
      Alert.error("error.errBarCode");
      return;
    }
    // const checkShipment = shipmentCode.filter(shipment => {
    //   const itemData = shipment
    //     ? shipment.ShipmentNumber.toUpperCase()
    //     : "".toUpperCase();
    //   const textSearch = value.trim().toUpperCase();
    //   return itemData.indexOf(textSearch) > -1;
    // });
    // if (checkShipment.length > 0) {
    //   setShipmentText("");
    //   Alert.error("label.haveShipment");
    //   return;
    // }

    showIsLoadingFetchData();
    // shipmentApi
    //   .scanShipment(value)
    //   ?.then(shipment => {
    //     if (shipment?.success && shipment?.data) {
    //       if (shipment.data.length === 0) {
    //         Alert.error("error.noShipment");
    //         return;
    //       }
    //       setShipmentCode(s => [...s, shipment?.data[0]]);
    //       setShipmentText("");
    //     } else {
    //       Alert.error("error.noShipment");
    //       setShipmentText("");
    //     }
    //   })
    //   .catch(err => {
    //     setShipmentText("");
    //     Alert.error(err, true);
    //   })
    //   .finally(() => {
    //     Keyboard.dismiss();
    //     setShipmentValue("");
    //     setShipmentText("");
    //     hideIsLoadingFetchData();
    //   });
  };

  const handlerClearLocation = () => {
    setLocation("");
  };

  const autoSubmitScan = debounce((value: string) => {
    onScan(value.trim());
  }, 1000);

  const handleCompletePicking = () => {
    showLoadingSubmit();

    setTimeout(() => {
      console.log("🚀🚀🚀 => reason", reason);
      hideLoadingSubmit();
      hideModalConfirm();
    }, 500);
  };

  const keyExtractor = (item: any, index: number) => index.toString();
  const renderItem = ({ item }: { item: any }) => {
    return postOffices?.Code !== "08" ? (
      <ShipmentItemNormal item={item} />
    ) : (
      <ShipmentItemTokyo item={item} />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={translate("screens.picking.picking")}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        titleColor={Themes.colors.white}
      />
      {loading ? (
        <ActivityIndicator
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          color={Themes.colors.coolGray100}
        />
      ) : (
        <>
          <View style={{ flex: 1 }}>
            {PlatformBrandConstraint.Brand !==
              CONSTANT.PLATFORM_BRAND.HONEYWELL && (
              <View style={styles.cameraView}>
                <RNCamera
                  style={styles.camera}
                  type={RNCamera.Constants.Type.back}
                  flashMode={RNCamera.Constants.FlashMode.on}
                  captureAudio={false}
                  onGoogleVisionBarcodesDetected={onRead}
                >
                  <BarcodeMask
                    width={280}
                    height={100}
                    edgeWidth={20}
                    edgeHeight={20}
                    edgeRadius={20}
                    showAnimatedLine={false}
                    maskOpacity={0.7}
                    backgroundColor={Themes.colors.black}
                    // onLayoutChange={onBarcodeFinderLayoutChange}
                  />
                  <View style={styles.centerView}>
                    {isLoadingFetchData && Platform.OS === "ios" && (
                      <View style={styles.loadingView}>
                        <ActivityIndicator color={Themes.colors.collGray40} />
                      </View>
                    )}
                  </View>
                </RNCamera>
              </View>
            )}
            <View style={styles.inputView}>
              <TextInput
                value={barcode}
                placeholder={translate("placeholder.scanOrType")}
                style={styles.input}
                contextMenuHidden={true}
                onChangeText={value => {
                  setBarcodes(value);
                  autoSubmitScan(value);
                }}
                onSubmitEditing={_e => {
                  onScan(barcode);
                }}
                ref={inputRef}
                clearTextOnFocus={true}
                returnKeyType="done"
                returnKeyLabel="Add"
                blurOnSubmit={false}
              />
              <TouchableOpacity
                style={styles.addCode}
                onPress={() => onScan(barcode)}
              >
                <Icon
                  name="ic_plus"
                  color={Themes.colors.bg}
                  size={Metrics.icons.small}
                />
              </TouchableOpacity>
            </View>
            {location === "" && (
              <Text style={styles.warningLocation}>
                {translate("label.scanLocationBefore")}
              </Text>
            )}
            <View style={styles.textInline}>
              <Text style={styles.text}>
                {translate("screens.picking.finished")}: 0/3
              </Text>
              <Text style={styles.text}>{params?.id}</Text>
            </View>
            <View style={styles.textInline}>
              <Text style={styles.text}>
                {translate("label.location")}:{" "}
                <Text
                  style={styles.warningLocation}
                  onPress={handlerClearLocation}
                >
                  {location}
                </Text>
              </Text>
              <Text style={styles.text}>Nguyễn Ánh nguyệt</Text>
            </View>
            <View
              style={{
                paddingHorizontal: ScreenUtils.scale(8),
                marginTop: ScreenUtils.scale(8),
              }}
            >
              <FlatList
                data={dataShipments}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
              />
            </View>
          </View>
          <View
            style={[
              styles.footer,
              {
                paddingBottom: insets.bottom
                  ? insets.bottom
                  : ScreenUtils.scale(8),
              },
            ]}
          >
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={showModalConfirm}
            >
              <Text style={styles.pickUpText}>
                {translate("screens.picking.doneButton")}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <ConfirmModal
        isVisible={isShowModalConfirm}
        closeModal={hideModalConfirm}
        isShowReason={true}
        onConfirm={handleCompletePicking}
        isLoadingSubmit={loadingSubmit}
        onChangeReason={setReason}
      />
    </View>
  );
};
