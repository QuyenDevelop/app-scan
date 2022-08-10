/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { deliveryBillApi } from "@api";
import { Header } from "@components";
import { CONSTANT, SCREENS } from "@configs";
import { Alert, ScreenUtils } from "@helpers";
import { useShow } from "@hooks";
import {
  DeliveryBillItemResponse,
  PlatformAndroidStatic,
  ShipmentSourceItem,
} from "@models";
import { BarcodeMask } from "@nartc/react-native-barcode-mask";
import { PickingParamsList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { IRootState } from "@redux";
import { Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import { debounce } from "lodash";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { ShipmentItemTokyo } from "./components/ShipmentItemTokyo";
import styles from "./styles";

type NavigationRoute = RouteProp<PickingParamsList, SCREENS.PICKING_SCREEN>;

export interface PickingTokyoParams {
  item: DeliveryBillItemResponse;
  tab: string;
}

export const PickingTokyoScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const router = useRoute<NavigationRoute>();
  const params = router?.params;
  const { item } = params;
  const [isLoadingFetchData, showIsLoadingFetchData, hideIsLoadingFetchData] =
    useShow();
  const inputRef = useRef<TextInput>(null);
  const profile = useSelector((state: IRootState) => state.account.profile);
  const PlatformBrandConstraint = Platform.constants as PlatformAndroidStatic;
  const [location, setLocation] = useState<string>("");
  const [barcode, setBarcodes] = useState<string>("");
  const [isShowModalConfirm, showModalConfirm, hideModalConfirm] = useShow();
  const [reason, setReason] = useState<string>("");
  const [loading, showLoading, hideLoading] = useShow();
  const [loadingSubmit, showLoadingSubmit, hideLoadingSubmit] = useShow();
  const [data, setData] = useState<any>({});
  const [dataShipments, setDataShipment] = useState<Array<ShipmentSourceItem>>(
    [],
  );
  const [isShowReason, setShowReason] = useState<boolean>(false);
  const [errorReason, setErrorReason] = useState<string>("");

  const getData = useCallback(() => {
    deliveryBillApi
      .getDeliveryBillDetail({
        deliveryBillId: item?.Id,
      })
      ?.then(response => {
        if (response.data) {
          setData(response.data);
          if (
            response.data.ShipmentSourceItems &&
            response.data.ShipmentPickedItems &&
            response.data.ShipmentSourceItems.length >
              response.data.ShipmentPickedItems.length
          ) {
            setShowReason(true);
          }
          if (
            response.data.ShipmentSourceItems &&
            response.data.ShipmentSourceItems.length > 0
          ) {
            if (location !== "") {
              const shipmentData = response.data.ShipmentSourceItems.filter(
                (i: ShipmentSourceItem) => i.LocationName === location,
              );
              setDataShipment(shipmentData);
            } else {
              setDataShipment(response.data.ShipmentSourceItems);
            }
          } else {
            setDataShipment([]);
          }
        }
      })
      .finally(() => {
        hideLoading();
      });
  }, [location]);

  useEffect(() => {
    showLoading();
    getData();
  }, [location]);

  useEffect(() => {
    PlatformBrandConstraint.Brand === CONSTANT.PLATFORM_BRAND.HONEYWELL &&
      inputRef.current &&
      inputRef.current.focus();
  }, [PlatformBrandConstraint.Brand]);

  const isShipmentCode = (value: string) => {
    return new RegExp(/^([0-9A-Z]){9,20}$/g).test(value);
  };
  const isLocationCodeV1 = (value: string) => {
    return new RegExp(/^[A-z](-[0-9A-Z]{2}){1,3}$/g).test(value);
  };
  const isLocationCodeV2 = (value: string) => {
    return new RegExp(/^([0-9A-Z]{2}-){1,3}$/g).test(value);
  };

  const onRead = async ({ barcodes }: { barcodes: Array<any> }) => {
    if (barcodes.length > 0 && !!barcodes[0].data) {
      if (!isLoadingFetchData) {
        // get location
        if (
          !location &&
          (isLocationCodeV1(barcodes[0].data.trim()) ||
            isLocationCodeV2(barcodes[0].data.trim() + "-"))
        ) {
          Vibration.vibrate();
          getLocation(barcodes[0].data.trim());
          return;
        }
        // get shipment
        if (location && isShipmentCode(barcodes[0].data.trim())) {
          Vibration.vibrate();
          getShipment(barcodes[0]?.data.trim());
          return;
        }
      }
    }
  };

  const onScan = (barcodes: string) => {
    if (!barcodes || barcodes === "") {
      Alert.error("error.errBarCode");
      return;
    }
    if (!isLoadingFetchData) {
      // get location
      if (
        !location &&
        (isLocationCodeV1(barcodes.trim()) ||
          isLocationCodeV2(barcodes.trim() + "-"))
      ) {
        Vibration.vibrate();
        getLocation(barcodes.trim());
        return;
      }
      // get shipment
      if (location && isShipmentCode(barcodes.trim())) {
        Vibration.vibrate();
        getShipment(barcodes.trim());
        return;
      }

      Alert.error("error.errBarCode");
      setBarcodes("");
    }
  };

  const getLocation = (value: string | null) => {
    if (!value || value === "") {
      Alert.error("error.errBarCode");
      setBarcodes("");
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
    const checkShipment = dataShipments.filter(
      shipment => shipment.ShipmentNumber === value,
    );
    if (!value || value === "" || value === null || checkShipment.length < 0) {
      Alert.error("error.errBarCode");
      setBarcodes("");
      return;
    }

    showIsLoadingFetchData();
    deliveryBillApi
      .pickShipment({
        subShipmentNumber: value,
        locationName: location,
        deliveryBillId: item?.Id,
      })
      ?.then(response => {
        if (response.data && response.data.Status) {
          Alert.success(response.data.Message, true);
          getData();
        }
      })
      .catch(() => {
        Alert.error("error.errBarCode");
      })
      .finally(() => {
        setBarcodes("");
        hideIsLoadingFetchData();
      });
  };

  const handlerClearLocation = () => {
    setLocation("");
  };

  const autoSubmitScan = debounce((value: string) => {
    onScan(value.trim());
  }, 1000);

  const handleCompletePicking = () => {
    if (isShowReason && reason.trim() === "") {
      setErrorReason(translate("screens.picking.fillReason"));
      return;
    }

    showLoadingSubmit();
    deliveryBillApi
      .assignPickDeliveryBill({
        DeliveryBillIds: [item.Id],
        pickedBy: profile?.sub,
        pickedByUserName: profile?.preferred_username,
        StartDatePick: null,
        EndDatePick: new Date(),
      })
      ?.then(response => {
        if (response && response.success) {
          navigation.reset({
            index: 0,
            routes: [{ name: SCREENS.DELIVERY_BILL_MANAGEMENT_SCREEN }],
          });
        }
      })
      .catch(error => {
        Alert.error(error);
      })
      .finally(() => {
        hideLoadingSubmit();
        hideModalConfirm();
        setErrorReason("");
      });
  };

  const keyExtractor = (items: ShipmentSourceItem, index: number) =>
    `${items.Id}_${index}`;
  const renderItem = ({ item }: { item: ShipmentSourceItem }) => {
    return <ShipmentItemTokyo item={item} />;
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

      <>
        <View style={{ flex: 1 }}>
          {PlatformBrandConstraint.Brand !==
          CONSTANT.PLATFORM_BRAND.HONEYWELL ? (
            <>
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
              <View style={styles.inputView}>
                <TextInput
                  value={barcode}
                  placeholder={translate("placeholder.scanOrType")}
                  style={styles.input}
                  contextMenuHidden={true}
                  onChangeText={value => {
                    setBarcodes(value);
                  }}
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
            </>
          ) : (
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
          )}

          {location === "" && (
            <Text
              style={[
                styles.warningLocation,
                {
                  marginBottom: ScreenUtils.scale(4),
                },
              ]}
            >
              {translate("label.scanLocationBefore")}
            </Text>
          )}
          <View style={styles.textInline}>
            <Text style={styles.text}>
              {translate("screens.picking.finished")}:{" "}
              {data?.ShipmentPickedItems ? data?.ShipmentPickedItems.length : 0}
              /
              {data?.ShipmentSourceItems ? data?.ShipmentSourceItems.length : 0}
            </Text>
            <Text style={styles.text}>{data?.RefNo}</Text>
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
            {!!data?.ConsigneeName && (
              <Text style={styles.text}>{data?.ConsigneeName}</Text>
            )}
          </View>
          <View
            style={{
              width: "100%",
              height: ScreenUtils.scale(1),
              marginTop: ScreenUtils.scale(4),
              backgroundColor: Themes.colors.colGray20,
            }}
          />

          <View
            style={{
              flex: 1,
              paddingHorizontal: ScreenUtils.scale(8),
            }}
          >
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
              <FlatList
                data={dataShipments}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
              />
            )}
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

      <ConfirmModal
        isVisible={isShowModalConfirm}
        closeModal={hideModalConfirm}
        isShowReason={isShowReason}
        onConfirm={handleCompletePicking}
        isLoadingSubmit={loadingSubmit}
        reason={reason}
        onChangeReason={setReason}
        errorReason={errorReason}
      />
    </View>
  );
};
