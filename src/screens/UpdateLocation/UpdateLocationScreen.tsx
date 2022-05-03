/* eslint-disable react-native/no-inline-styles */
import { shipmentApi } from "@api";
import { Header } from "@components";
import { Alert, ScreenUtils } from "@helpers";
import { useShow } from "@hooks";
import { ShipmentResponse, UpdateLocationRequest } from "@models";
import { BarcodeMask } from "@nartc/react-native-barcode-mask";
import { useNavigation } from "@react-navigation/native";
import { IRootState } from "@redux";
import { Button, Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Platform,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { RNCamera } from "react-native-camera";
import { useSelector } from "react-redux";
import { ChooseLocationModal } from "../ExploitShipmentScreen/components/ChooseLocationModal";
import { EnterCodeModal } from "../Scan/components/EnterCodeModal";
import styles from "./styles";

export const UpdateLocationScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const [isShowEnterCode, showEnterCode, hideEnterCode] = useShow();
  const [isShowLocationModal, showLocationModal, hideLocationModal] = useShow();
  const [isLoadingFetchData, showIsLoadingFetchData, hideIsLoadingFetchData] =
    useShow();
  const postOfficesId = useSelector(
    (state: IRootState) => state.account.profile?.postOfficeId,
  );
  const [location, setLocation] = useState<String>("");
  const [shipmentCode, setShipmentCode] = useState<Array<ShipmentResponse>>([]);
  const [shipmentValue, setShipmentValue] = useState<string>("");
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  const isShipmentCode = (value: string) => {
    return new RegExp(/^([0-9A-Z]){9,20}$/g).test(value);
  };
  const isLocationCode = (value: string) => {
    return new RegExp(/^[A-z](\-[0-9A-Z]{2}){1,3}$/g).test(value);
  };
  const onSelectLocation = (value: string) => {
    setLocation(value);
    setShowHeader(false);
  };

  const onRead = async ({ barcodes }: { barcodes: Array<any> }) => {
    // TODO: scan and check location code... alert fail message
    // TODO: scan and check shipment code... alert fail message
    if (barcodes.length > 0 && !!barcodes[0].data) {
      const checkShipment = shipmentCode.filter(shipment => {
        const itemData = shipment
          ? shipment.ShipmentNumber.toUpperCase()
          : "".toUpperCase();
        const textSearch = barcodes[0].data.trim().toUpperCase();
        return itemData.indexOf(textSearch) > -1;
      });

      if (!isLoadingFetchData) {
        // get location
        if (
          !location &&
          showHeader &&
          isLocationCode(barcodes[0].data.trim())
        ) {
          Vibration.vibrate();
          getLocation(barcodes[0].data.trim());
          return;
        } else {
        }
        // get shipment
        if (
          location &&
          !checkShipment.length &&
          isShipmentCode(barcodes[0].data.trim())
        ) {
          Vibration.vibrate();
          await getShipment(barcodes[0]?.data.trim());
          return;
        } else {
        }
      }
    }
  };

  const toggleClearLocation = () => {
    setLocation("");
    setShowHeader(true);
    setShipmentCode([]);
  };
  const toggleDeleteShipment = (value: string) => {
    const newData = shipmentCode.filter(item => item.ShipmentNumber !== value);
    setShipmentCode(newData);
  };

  const getLocation = (value: string | null) => {
    if (!value || value === "") {
      Alert.error("error.errBarCode");
      return;
    }
    showIsLoadingFetchData();
    shipmentApi
      .scanLocation({
        LocationName: value,
        PostOfficeId: postOfficesId || "",
      })
      ?.then(response => {
        if (response.Status) {
          setLocation(value);
          setShowHeader(false);
        }
      })
      .catch(err => {
        Alert.error(err, true);
      })
      .finally(() => {
        Keyboard.dismiss();
        setShowHeader(false);
        setTimeout(() => {
          hideIsLoadingFetchData();
        }, 500);
      });
  };

  const getShipment = (value: string) => {
    if (!value || value === "" || value === null) {
      Alert.error("error.errBarCode");
      return;
    }
    const checkShipment = shipmentCode.filter(shipment => {
      const itemData = shipment
        ? shipment.ShipmentNumber.toUpperCase()
        : "".toUpperCase();
      const textSearch = value.trim().toUpperCase();
      return itemData.indexOf(textSearch) > -1;
    });
    if (checkShipment.length > 0) {
      Alert.error("label.haveShipment");
      return;
    }

    showIsLoadingFetchData();
    shipmentApi
      .scanShipment(value)
      ?.then(shipment => {
        if (shipment?.success && shipment?.data) {
          if (shipment.data.length === 0) {
            Alert.error("error.noShipment");
            return;
          }
          setShipmentCode(s => [...s, shipment?.data[0]]);
        } else {
          Alert.error("error.noShipment");
        }
      })
      .catch(err => {
        Alert.error(err, true);
      })
      .finally(() => {
        Keyboard.dismiss();
        setShipmentValue("");
        setTimeout(() => {
          hideIsLoadingFetchData();
        }, 500);
      });
  };

  const toggleChangeLocationShipment = () => {
    if (shipmentCode.length <= 0) {
      Alert.error("error.noShipment");
      return;
    }

    setIsLoading(true);
    const data: UpdateLocationRequest = {
      postOfficeId: postOfficesId || "",
      locationName: location,
      shipmentNumbers: shipmentCode.map(shipment => shipment.ShipmentNumber),
    };
    shipmentApi
      .changeLocation(data)
      ?.then(response => {
        if (response.Status) {
          Alert.success("success.success");
          setShipmentCode([]);
          setLocation("");
        } else {
          Alert.error(response.errorCode);
        }
      })
      .catch(() => Alert.error("error.errorSever"))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Header
        title={
          showHeader
            ? translate("label.location")
            : translate("label.scanOrTypeShipment")
        }
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[navigation.goBack]}
        isCenterTitle
        titleColor={Themes.colors.white}
      />
      <View style={styles.container}>
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
              {isLoadingFetchData && Platform.OS === "ios" ? (
                <View style={styles.loadingView}>
                  <ActivityIndicator color={Themes.colors.collGray40} />
                </View>
              ) : (
                <></>
              )}
            </View>
          </RNCamera>
        </View>
        {location ? (
          <View>
            <View style={styles.toolView}>
              <Text style={styles.locationText}>{location}</Text>
              <TouchableOpacity
                style={styles.locationBtn}
                onPress={toggleClearLocation}
              >
                <Icon
                  name="ic_close"
                  size={Metrics.icons.small}
                  color={Themes.colors.red0033}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.receiveItemContainer}>
              <FlatList
                data={shipmentCode}
                keyExtractor={(item, index) =>
                  `${item.ShipmentNumber}_${index.toString()}`
                }
                renderItem={({ item }) => {
                  // console.log("🚀🚀🚀 => item", item);
                  return (
                    <View style={styles.receiveItem}>
                      <Text style={styles.code}>{item.ShipmentNumber}</Text>
                      <Text style={styles.Pieces}>
                        SL: {item.ExpectedPieces}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          toggleDeleteShipment(item.ShipmentNumber.toString())
                        }
                        hitSlop={styles.hitSlop}
                        style={styles.deleteBtn}
                      >
                        <Icon
                          name="ic_delete"
                          color={Themes.colors.collGray40}
                          size={Metrics.icons.small}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.enterKeyboardButton}
                onPress={showEnterCode}
              >
                <Icon
                  name="ic_keyboad"
                  size={Metrics.icons.tiny}
                  color={Themes.colors.blue008}
                />
                <Text style={styles.qrUserManual}>
                  {translate("button.addShipment")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ marginVertical: ScreenUtils.scale(8) }}>
            <TouchableOpacity
              style={styles.enterKeyboardButton}
              onPress={showLocationModal}
            >
              <Icon
                name="ic_search"
                size={Metrics.icons.large}
                color={Themes.colors.info60}
              />
              <Text style={styles.qrUserManual}>
                {translate("label.scanLocationBefore")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {!showHeader && (
          <View style={styles.buttonBox}>
            <View style={styles.halfButtonBox}>
              <Button
                isLoading={isLoading}
                onPress={toggleChangeLocationShipment}
                title={translate("button.submit")}
                buttonChildStyle={{ width: "80%" }}
              />
            </View>
            <View style={styles.halfButtonBox}>
              <Button
                onPress={() => navigation.goBack()}
                title={translate("button.cancel")}
                buttonChildStyle={{ width: "80%" }}
              />
            </View>
          </View>
        )}
      </View>
      <EnterCodeModal
        isShowModal={isShowEnterCode}
        closeModal={hideEnterCode}
        code={shipmentValue}
        onChangeCode={setShipmentValue}
        onCheckCode={getShipment}
      />
      <ChooseLocationModal
        isVisible={isShowLocationModal}
        closeModal={hideLocationModal}
        onSelectLocation={local => onSelectLocation(local.Name)}
      />
    </>
  );
};
