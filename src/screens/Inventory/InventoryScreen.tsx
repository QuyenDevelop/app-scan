/* eslint-disable react-native/no-inline-styles */
import { inventoryApi } from "@api";
import { Header } from "@components";
import { CONSTANT, SCREENS } from "@configs";
import { Alert, getAsyncItem, Utils } from "@helpers";
import { useShow } from "@hooks";
import { InventoryDetailTemp, RequestInventoryResponse } from "@models";
import { BarcodeMask, useBarcodeRead } from "@nartc/react-native-barcode-mask";
import { InventoryParamsList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { useIsFocused } from "@react-navigation/native";
import { IRootState } from "@redux";
import { Button, Checkbox, ConfirmModal, Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  LayoutAnimation,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { RNCamera } from "react-native-camera";
import { useSelector } from "react-redux";
import { useImmer } from "use-immer";
import { InventoryItem } from "./components/InventoryItem";
import styles from "./styles";

export interface InventoryScreenParams {
  requestInventory: RequestInventoryResponse;
}

type NavigationRoute = RouteProp<InventoryParamsList, SCREENS.INVENTORY_SCREEN>;

const getStoreBarcode = async (): Promise<Array<InventoryDetailTemp>> => {
  const barcodes = await getAsyncItem(
    CONSTANT.TOKEN_STORAGE_KEY.INVENTORY_BARCODES,
  );
  return barcodes && Array.isArray(barcodes) ? barcodes : [];
};

export const InventoryScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const routes = useRoute<NavigationRoute>();
  const { requestInventory } = routes?.params || {};
  const postOfficesId = useSelector(
    (state: IRootState) => state.account.profile?.postOfficeId,
  );
  const [codes, setCodes] = useImmer<Array<InventoryDetailTemp>>([]);
  const [isLoadingFetchData, showLoadingInventory, hideLoadingInventory] =
    useShow();
  const [isShowConfirmModal, showConfirmModal, hideConfirmModal] = useShow();
  const inputValue = useRef<string>("");
  const inputRef = useRef<TextInput>(null);
  const inventoryRef = useRef<FlatList>(null);
  const userInfo = useSelector((state: IRootState) => state.account.profile);
  const isFocused = useIsFocused();
  const [isShowDetectCode, showDetectCode, hideDetectCode] = useShow();
  const [locationScanned, setLocationScanned] = useState<string>("");
  const [positionCode, setPositionCode] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const { barcodeRead, onBarcodeRead, onBarcodeFinderLayoutChange } =
    useBarcodeRead(
      isFocused,
      barcodeData => {
        return barcodeData;
      },
      async processedBarcodeData => {
        await addNewCode(processedBarcodeData.trim());
      },
      3000,
    );

  useEffect(() => {
    getStoreBarcode().then((barcodes: Array<InventoryDetailTemp>) => {
      setCodes(barcodes);
    });
  }, []);

  const isValidBarcode = (code: string): boolean => {
    const refactoredCode = code.trim();
    if (
      !refactoredCode ||
      refactoredCode.length < 10 ||
      /[^a-z0-9]/i.test(code)
    ) {
      return false;
    }
    return true;
  };

  const addNewCode = useCallback(
    async (code: string, noVibration?: boolean) => {
      if (!isValidBarcode(code)) {
        return;
      }

      const findCodeIndex = codes.findIndex(
        c => c.ShipmentNumber === code.trim(),
      );

      if (findCodeIndex < 0) {
        await inventoryApi
          .scanInventory({
            numberCode: code.trim(),
            createdByUserName: userInfo?.preferred_username || "",
            createdBy: userInfo?.sub || "",
            warehouseInventoryId: requestInventory.Id,
            postOfficeId: userInfo?.postOfficeId || "",
            locationName: locationScanned,
          })
          ?.then(response => {
            if (response.Status) {
              setCodes(draft => {
                draft.unshift(response.Data);
              });
            } else {
              Alert.error(
                translate("error.shipmentNotFound", { name: code.trim() }),
                true,
              );
            }
          })
          .catch(() => {
            Alert.error("error.errorServer");
          });
      } else {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setCodes(draft => {
          draft[findCodeIndex].Pieces = draft[findCodeIndex].Pieces + 1;
          let data = draft[findCodeIndex];
          draft.splice(findCodeIndex, 1);
          draft.splice(0, 0, data);
        });
      }
      inventoryRef?.current?.scrollToIndex({ animated: true, index: 0 });
      inputRef.current?.clear();
      if (!noVibration) {
        Vibration.vibrate();
      }
    },
    [
      codes,
      locationScanned,
      requestInventory.Id,
      setCodes,
      userInfo?.postOfficeId,
      userInfo?.preferred_username,
      userInfo?.sub,
    ],
  );

  const getDataLocation = (location: string) => {
    showLoadingInventory();
    inventoryApi
      .scanLocation({
        LocationName: location,
        PostOfficeId: postOfficesId || "",
        WarehouseInventoryId: requestInventory.Id,
      })
      ?.then(response => {
        if (response.Status) {
          setLocationScanned(location);
          setCodes(
            response.Data.map((code: InventoryDetailTemp) => ({
              ...code,
              PositionTrue: true,
            })),
          );
        } else {
          setLocationScanned("");
          Alert.error("error.errorServer");
        }
      })
      .catch(() => {
        setLocationScanned("");
        Alert.error("error.errorServer");
      })
      .finally(async () => {
        await Utils.delay(1000);
        hideLoadingInventory();
      });
  };

  const onRead = async ({ barcodes }: { barcodes: Array<any> }) => {
    if (isLoadingFetchData || barcodeRead) {
      return;
    }

    if (barcodes.length > 0) {
      if (!locationScanned) {
        barcodes[0].data && getDataLocation(barcodes[0].data.trim());
        return;
      }
      setPositionCode({
        top: barcodes[0].bounds.origin.y,
        left: barcodes[0].bounds.origin.x,
        width: barcodes[0].bounds.size.width,
        height: barcodes[0].bounds.size.height,
      });
      showDetectCode();
      setTimeout(() => {
        hideDetectCode();
      }, 200);
      onBarcodeRead(barcodes[0]);
    }
  };

  const inventoryCode = () => {
    showLoadingInventory();
    if (checkAll() && checkPositionTrue()) {
      inventoryApi
        .confirmAllStill({
          LocationName: locationScanned,
          PostOfficeId: postOfficesId || "",
          WarehouseInventoryId: requestInventory.Id,
        })
        ?.then(response => {
          if (response.Status) {
            Alert.success("success.inventorySuccess");
            navigation.goBack();
          } else {
            Alert.error("error.errorServer");
          }
        })
        .catch(() => {
          Alert.error("error.errorServer");
        })
        .finally(() => {
          hideLoadingInventory();
        });
    } else {
      inventoryApi
        .confirmProcessedLocation({
          LocationName: locationScanned,
          WarehouseInventoryId: requestInventory.Id,
          InventoryDetailTemps: codes,
        })
        ?.then(response => {
          if (response.Status) {
            Alert.success("success.inventorySuccess");
            navigation.goBack();
          } else {
            Alert.error("error.errorServer");
          }
        })
        .catch(() => {
          Alert.error("error.errorServer");
        })
        .finally(() => {
          hideLoadingInventory();
        });
    }
  };

  const keyExtractor = useCallback(
    (item: InventoryDetailTemp) => `${item.Id}`,
    [],
  );

  const deleteItem = useCallback(
    async (index: number) => {
      setCodes(draft => {
        draft.splice(index, 1);
      });
    },
    [setCodes],
  );

  const updatePieces = useCallback(
    async (index: number, value: number) => {
      setCodes(draft => {
        draft[index].Pieces = isNaN(value) || value < 0 ? 0 : value;
      });
    },
    [setCodes],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: InventoryDetailTemp; index: number }) => {
      return (
        <InventoryItem
          item={item}
          index={index}
          deleteItem={deleteItem}
          updatePieces={updatePieces}
        />
      );
    },
    [deleteItem, updatePieces],
  );

  const onPressAddCode = async () => {
    await addNewCode(inputValue.current.trim(), true);
  };

  const changeLocation = () => {
    setLocationScanned("");
    setCodes([]);
  };

  const onCheckAll = () => {
    setCodes(draft => {
      draft.forEach(item => {
        item.Pieces = item.ExpectedPieces;
      });
    });
  };

  const checkAll = (): boolean => {
    return codes.every(value => value.Pieces === value.ExpectedPieces);
  };

  const checkPositionTrue = (): boolean => {
    return codes.every(value => value.PositionTrue);
  };

  return (
    <View style={styles.container}>
      <Header
        title={requestInventory.Name || translate("screens.inventory")}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        titleColor={Themes.colors.white}
      />
      <View style={styles.content}>
        <View style={styles.cameraView}>
          {isFocused && (
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
                onLayoutChange={onBarcodeFinderLayoutChange}
              />
            </RNCamera>
          )}

          {isShowDetectCode && (
            <View
              style={{
                position: "absolute",
                top: positionCode.top,
                left: positionCode.left,
                height: 2,
                width: positionCode.width,
                backgroundColor: Themes.colors.success60,
              }}
            />
          )}
        </View>
        {locationScanned ? (
          <>
            <View style={styles.toolView}>
              <TouchableOpacity
                style={styles.locationBtn}
                onPress={changeLocation}
              >
                <Icon
                  name="ic_search"
                  size={Metrics.icons.smallSmall}
                  color={Themes.colors.coolGray60}
                />
                <Text style={styles.locationText}>
                  {locationScanned || translate("button.scanLocation")}
                </Text>
                <Icon
                  name="ic_location"
                  size={Metrics.icons.smallSmall}
                  color={Themes.colors.red0722}
                />
              </TouchableOpacity>
              <Text>
                -/- {translate("label.system")}/{translate("label.reality")}
              </Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                ref={inputRef}
                placeholder={translate("placeholder.scanOrType")}
                style={styles.input}
                contextMenuHidden={true}
                onChangeText={text => (inputValue.current = text)}
                onSubmitEditing={_e => {
                  onPressAddCode();
                }}
                returnKeyType="done"
                returnKeyLabel="Add"
                blurOnSubmit={false}
              />
              <TouchableOpacity style={styles.addCode} onPress={onPressAddCode}>
                <Icon
                  name="ic_plus"
                  color={Themes.colors.bg}
                  size={Metrics.icons.small}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              ref={inventoryRef}
              data={codes || []}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
            />
            {codes && codes.length > 0 && (
              <View style={styles.footer}>
                <Checkbox
                  title={translate("label.sufficientQuantity")}
                  onChange={onCheckAll}
                  checked={checkAll()}
                />
                <Button
                  title={translate("button.inventory")}
                  onPress={showConfirmModal}
                  buttonStyle={styles.inventoryBtn}
                  buttonChildStyle={styles.inventoryChildBtn}
                  titleStyle={styles.inventoryTextBtn}
                  isLoading={isLoadingFetchData}
                />
              </View>
            )}
          </>
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
      </View>
      <ConfirmModal
        isVisible={isShowConfirmModal}
        closeModal={hideConfirmModal}
        message={translate("alert.confirmInventory", { number: codes.length })}
        onConfirm={inventoryCode}
      />
    </View>
  );
};
