/* eslint-disable react-native/no-inline-styles */
import { Header } from "@components";
import { CONSTANT, SCREENS } from "@configs";
import { Alert } from "@helpers";
import { useShow } from "@hooks";
import { PlatformAndroidStatic } from "@models";
import { BarcodeMask } from "@nartc/react-native-barcode-mask";
import { PickingParamsList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import { debounce } from "lodash";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { RNCamera } from "react-native-camera";
import styles from "./styles";

type NavigationRoute = RouteProp<PickingParamsList, SCREENS.PICKING_SCREEN>;

export interface PickingParams {
  id: string;
  tab: string;
}

export const PickingScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  // const insets = useSafeAreaInsets();
  const router = useRoute<NavigationRoute>();
  const params = router?.params;
  console.log("🚀🚀🚀 => params", params);
  const [isLoadingFetchData, showIsLoadingFetchData, hideIsLoadingFetchData] =
    useShow();
  const PlatformBrandConstraint = Platform.constants as PlatformAndroidStatic;
  const [location, setLocation] = useState<string>("");
  const [barcode, setBarcodes] = useState<string>("");
  const inputRef = useRef<TextInput>(null);

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

  return (
    <View style={styles.container}>
      <Header
        title={translate("screens.picking.picking")}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        titleColor={Themes.colors.white}
      />
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
            <Text style={styles.warningLocation} onPress={handlerClearLocation}>
              {location}
            </Text>
          </Text>
          <Text style={styles.text}>Nguyễn Ánh nguyệt</Text>
        </View>
      </View>
    </View>
  );
};
