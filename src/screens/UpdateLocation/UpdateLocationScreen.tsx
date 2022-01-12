import { inventoryApi, shipmentApi } from "@api";
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
  FlatList,
  Keyboard,
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
  const postOfficesId = useSelector(
    (state: IRootState) => state.account.profile?.postOfficeId,
  );
  const [location, setLocation] = useState<String>("A-01-01-03");
  const [shipmentCode, setShipmentCode] = useState<Array<String>>([]);
  const [shipmentValue, setShipmentValue] = useState<string>("");

  const onRead = async ({ barcodes }: { barcodes: Array<any> }) => {
    if (barcodes.length > 0 && !!barcodes[0].data) {
      if (!location) {
        Vibration.vibrate();
        getLocation(barcodes[0].data.trim());
      } else {
        Vibration.vibrate();
        getShipment(barcodes[0]?.data.trim());
      }
    }
  };

  const toggleClearLocation = () => {
    setLocation("");
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
    inventoryApi
      .scanLocation({
        LocationName: value,
        PostOfficeId: postOfficesId || "",
      })
      ?.then(response => {
        if (response.Status) {
          setLocation(value);
        }
      })
      .catch(() => {
        Alert.error("error.errorServer");
      });
  };

  const getShipment = (value: string | null) => {
    if (!value || value === "") {
      Alert.error("error.errBarCode");
      return;
    }
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
          Alert.error("shipment?.message");
        }
      })
      .catch(() => {
        Alert.error("error.errorServer");
      })
      .finally(() => {
        Keyboard.dismiss();
        setShipmentValue("");
      });
  };

  const toggleChangeLocationShipment = () => {
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
      .catch(() => Alert.error("error.errorSever"));
  };

  return (
    <>
      <Header
        title={translate("label.changeLocation")}
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
