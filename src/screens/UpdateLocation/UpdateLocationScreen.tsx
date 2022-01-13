import { shipmentApi } from "@api";
import { Header } from "@components";
import { Alert } from "@helpers";
import { useShow } from "@hooks";
import { UpdateLocationRequest } from "@models";
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
import { EnterCodeModal } from "../Scan/components/EnterCodeModal";
import styles from "./styles";

export const UpdateLocationScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const [isShowEnterCode, showEnterCode, hideEnterCode] = useShow();
  const [isLoadingFetchData, showIsLoadingFetchData, hideIsLoadingFetchData] =
    useShow();
  const postOfficesId = useSelector(
    (state: IRootState) => state.account.profile?.postOfficeId,
  );
  const [location, setLocation] = useState<String>("");
  const [shipmentCode, setShipmentCode] = useState<Array<String>>([]);
  const [shipmentValue, setShipmentValue] = useState<string>("");
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  const validateShipmentCode = (value: string) => {
    return new RegExp(/^([0-9A-Z]){9,20}$/g).test(value);
  };

  const onRead = async ({ barcodes }: { barcodes: Array<any> }) => {
    if (barcodes.length > 0 && !!barcodes[0].data) {
      const checkShipment = shipmentCode.filter(shipment => {
        const itemData = shipment ? shipment.toUpperCase() : "".toUpperCase();
        const textSearch = barcodes[0].data.trim().toUpperCase();
        return itemData.indexOf(textSearch) > -1;
      });

      if (location && checkShipment.length) {
        // nếu đã có location và shipment đã tồn tại thì break
        console.log("🚀🚀🚀 => shipment: " + JSON.stringify(checkShipment));
        return;
      }

      if (!isLoadingFetchData) {
        if (!location && showHeader) {
          setTimeout(() => {
            getLocation(barcodes[0].data.trim());
          }, 500);
          return;
        }

        if (
          location &&
          !checkShipment.length &&
          validateShipmentCode(barcodes[0].data.trim())
        ) {
          Vibration.vibrate();
          getShipment(barcodes[0]?.data.trim());
          return;
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
    const newData = shipmentCode.filter(item => item !== value);
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
      .catch(() => {})
      .finally(() => {
        Keyboard.dismiss();
        setTimeout(() => {
          hideIsLoadingFetchData();
        }, 500);
      });
  };

  const getShipment = (value: string) => {
    if (!value || value === "" || value === null) {
      // nếu value không có gì thì return luôn
      Alert.error("error.errBarCode");
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
          // Logic after get shipment success
          setShipmentCode(s => [...s, shipment?.data[0].ShipmentNumber]);
        } else {
          Alert.error("error.errorServer");
        }
      })
      .catch(() => {
        Alert.error("error.errorServer");
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
    setIsLoading(true);
    if (shipmentCode.length <= 0) {
      Alert.error("error.noShipment");
      return;
    }
    const data: UpdateLocationRequest = {
      postOfficeId: postOfficesId || "",
      locationName: location,
      shipmentNumbers: shipmentCode,
    };
    console.log("data: " + JSON.stringify(data));
    shipmentApi
      .changeLocation(data)
      ?.then(response => {
        // console.log("response: " + JSON.stringify(response));
        if (response.Status) {
          Alert.success("success.success");
          setShipmentCode([]);
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
        iconLeftOnPress={[() => navigation.goBack()]}
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
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.receiveItem}>
                      <Text style={styles.code}>{item}</Text>
                      <TouchableOpacity
                        onPress={() => toggleDeleteShipment(item.toString())}
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
                  {translate("button.addCode")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.noLocation}>
            <Icon
              name="ic_search"
              size={Metrics.icons.large}
              color={Themes.colors.info60}
            />
            <Text style={styles.noLocationText}>
              {translate("label.scanLocation")}
            </Text>
          </View>
        )}
        <View style={styles.buttonBox}>
          <View style={styles.halfButtonBox}>
            <Button
              isLoading={isLoading}
              onPress={() => toggleChangeLocationShipment()}
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
      </View>
      <EnterCodeModal
        isShowModal={isShowEnterCode}
        closeModal={hideEnterCode}
        code={shipmentValue}
        onChangeCode={setShipmentValue}
        onCheckCode={getShipment}
      />
    </>
  );
};
