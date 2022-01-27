/* eslint-disable react-native/no-inline-styles */
import { inventoryApi } from "@api";
import { Header } from "@components";
import { CONSTANT, SCREENS } from "@configs";
import { Alert, getAsyncItem, ScreenUtils, Utils } from "@helpers";
import { useShow } from "@hooks";
import { InventoryDetailTemp, RequestInventoryResponse } from "@models";
import { BarcodeMask, useBarcodeRead } from "@nartc/react-native-barcode-mask";
import { InventoryParamsList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { useIsFocused } from "@react-navigation/native";
import { IRootState } from "@redux";
import {
  Button,
  Checkbox,
  ConfirmModal,
  DeleteModal,
  Icon,
  Text,
  translate,
} from "@shared";
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
  Keyboard,
  LayoutAnimation,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Vibration,
  View,
} from "react-native";
import { RNCamera } from "react-native-camera";
import { useSelector } from "react-redux";
import { useImmer } from "use-immer";
import { ChooseLocationModal } from "../ExploitShipmentScreen/components/ChooseLocationModal";
import { ShipmentItem } from "./components/ShipmentItem";
import styles from "./styles";
import { ActivityIndicator } from "react-native";

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
  const [ShipmentNotBag, setShipmentNotBag] = useImmer<
    Array<InventoryDetailTemp>
  >([]);
  const [titleShow, setTitleShow] = useImmer<
    Array<{
      key: number;
      ExpectedPieces: number;
      DispatchBagNumber: string | null;
      Data: Array<InventoryDetailTemp>;
    }>
  >([]);
  const [isLoadingFetchData, showLoadingInventory, hideLoadingInventory] =
    useShow();
  const [isShowDeleteModal, setShowDeleteModal] = useImmer<boolean>(false);
  const [isShowConfirmModal, showConfirmModal, hideConfirmModal] = useShow();
  const [isShowLocationModal, showLocationModal, hideLocationModal] = useShow();
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
  const [listSearchText, setListSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  // ------------ merge two list: ShipmentNoBag List and Bag list
  useEffect(() => {
    const convertToArrInventory: Array<InventoryDetailTemp> = [];
    titleShow.forEach(item => {
      if (item.DispatchBagNumber) {
        item.Data.forEach(i => convertToArrInventory.push(i));
      }
    });
    // console.log("Data: ", JSON.stringify(convertToArrInventory));
    setCodes([...ShipmentNotBag, ...convertToArrInventory]);
  }, [titleShow, ShipmentNotBag]);

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
      // TODO: update API - code = BagNumber
      if (!isValidBarcode(code)) {
        return;
      }
      const findCodeIndex = codes.findIndex(
        c => c.ShipmentNumber === code.trim(),
      );

      const dataRequest = {
        numberCode: code.trim(),
        createdByUserName: userInfo?.preferred_username || "",
        createdBy: userInfo?.sub || "",
        warehouseInventoryId: requestInventory.Id,
        postOfficeId: userInfo?.postOfficeId || "",
        locationName: locationScanned,
      };
      console.log("🚀🚀🚀 => dataRequest: ", dataRequest);
      if (findCodeIndex < 0) {
        await inventoryApi
          .scanInventory(dataRequest)
          ?.then(response => {
            // console.log("Inventory Response: ", JSON.stringify(response.Data));
            if (response.Status) {
              setCodes(draft => {
                response.Data;
                draft.unshift(...response.Data);
                // console.log("🚀🚀🚀 => draft", draft);
              });
              // TODO:
              // const dataTerm: Array<InventoryDetailTemp> = [];
              // response.Data.forEach((data: InventoryDetailTemp) => {
              //   if (data.DispatchBagNumber === null) {
              //     setShipmentNotBag(draft => {
              //       data;
              //       draft.unshift(data);
              //     });
              //   }
              //   if (data.DispatchBagNumber !== null) {
              //     dataTerm.push(data);
              //   }
              // });
              // setTitleShow(draft => {
              //   response.Data;
              //   draft.unshift(...convertToBags(dataTerm));
              //   // console.log("🚀🚀🚀 => draft", draft);
              // });
            } else {
              Alert.error(
                translate("error.shipmentNotFound", { name: code.trim() }),
                true,
              );
            }
          })
          .catch(() => {
            Alert.error("error.errorServer");
          })
          .finally(() => {
            inventoryRef?.current?.scrollToIndex({ animated: true, index: 0 });
            inputRef.current?.clear();
          });
      } else {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setCodes(draft => {
          draft[findCodeIndex].Pieces = draft[findCodeIndex].Pieces + 1;
          let data = draft[findCodeIndex];
          draft.splice(findCodeIndex, 1);
          draft.unshift(data);
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

  const convertToBags = (data: Array<InventoryDetailTemp>) => {
    const result = [...new Set(data.map(x => x.DispatchBagNumber))].map(
      (y, index: number) => ({
        key: index,
        ExpectedPieces: 1,
        DispatchBagNumber: y,
        Data: [] as Array<InventoryDetailTemp>,
      }),
    );
    data.forEach(x =>
      result
        ?.find(y => y?.DispatchBagNumber === x?.DispatchBagNumber)
        .Data.push(x),
    );

    return result;
  };

  const getDataLocation = (location: string) => {
    showLoadingInventory();
    setIsLoading(true);
    const dataRequest = {
      LocationName: location,
      PostOfficeId: postOfficesId || "",
      WarehouseInventoryId: requestInventory.Id,
    };
    console.log("🚀🚀🚀 => location data: ", JSON.stringify(dataRequest));
    inventoryApi
      .scanLocation(dataRequest)
      ?.then(response => {
        // console.log("🚀🚀🚀 => location data: ", response);
        if (response.Status) {
          setLocationScanned(location);
          setCodes(
            response.Data.map((code: InventoryDetailTemp) => ({
              ...code,
              PositionTrue: true,
            })),
          );
          // setTitleShow(convertToBags(response.Data));
          // setShipmentNotBag(
          //   response.Data.filter(
          //     (code: InventoryDetailTemp) => !code.DispatchBagNumber,
          //   ),
          // );
          const dataTerm: Array<InventoryDetailTemp> = [];
          response.Data.forEach((data: InventoryDetailTemp) => {
            if (data.DispatchBagNumber === null) {
              setShipmentNotBag(draft => {
                data;
                draft.push(data);
              });
            }
            if (data.DispatchBagNumber !== null) {
              dataTerm.push(data);
            }
          });
          setTitleShow(draft => {
            response.Data;
            draft.push(...convertToBags(dataTerm));
            // console.log("🚀🚀🚀 => draft", draft);
          });
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
        setIsLoading(false);
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
            changeLocation();
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
            changeLocation();
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

  const deleteShipmentItem = useCallback(
    async (code: number) => {
      setShipmentNotBag(draft => {
        draft.splice(code, 1);
      });
    },
    [setShipmentNotBag],
  );
  const updateShipmentPieces = useCallback(
    async (index: number, value: number) => {
      setShipmentNotBag(draft => {
        draft[index].Pieces = isNaN(value) || value < 0 ? 0 : value;
      });
    },
    [setShipmentNotBag],
  );
  // const setShowDataItem = useCallback(
  //   (value: string | "") => {
  //     setListSearchText(value);
  //     if (value === "XXX") {
  //       setListSearchText("XXX");
  //     }
  //     if (value === listSearchText) {
  //       setListSearchText("");
  //       return;
  //     }
  //   },
  //   [listSearchText, codes],
  // );

  const updateBagPieces = useCallback(async (index: number, value: number) => {
    setTitleShow(draft => {
      draft[index].ExpectedPieces = isNaN(value) || value < 0 ? 0 : value;
      // TODO: Pieces Item = Pieces of Bag * Pieces of Item
      draft[index].Data.forEach(
        i => (i.Pieces = isNaN(value) || value < 0 ? 0 : i.Pieces * value),
      );
    });
  }, []);

  const confirmDeleteBag = useCallback(
    // reRender code list by format
    async (value: string) => {
      setTitleShow(draft =>
        draft.filter(item => item.DispatchBagNumber !== value),
      );
    },
    [],
  );
  const plusBagPieces = (index: number, value: number) => {
    // console.log("index: " + index + " code: " + code + " value: " + value);
    updateBagPieces(index, value);
  };
  const minusBagPieces = (index: number, value: number) => {
    updateBagPieces(index, value);
  };
  const toggleShowDeleteModal = (value: string) => {
    setListSearchText(value);
    setShowDeleteModal(true);
  };
  // ---------- render List Bag
  const RenderBagItem = ({ item, index }: { item: any; index: number }) => {
    // const ind = index + 1;
    return (
      <View style={styles.receiveItemContainer}>
        <View style={[styles.receiveItem]}>
          <Checkbox
            checked={item.Pieces === item.ExpectedPieces}
            onChange={() => {
              updateBagPieces(index, 1);
            }}
          />
          <View
            style={[
              styles.leftContainer,
              // { backgroundColor: getBackgroundColor() },
            ]}
          >
            <Text style={styles.code}>{item.DispatchBagNumber}</Text>
            <Text>Túi : {item.Data[0].DispatchBagName}</Text>
          </View>
          {/* <TouchableOpacity
            onPress={() => setShowDataItem(item.DispatchBagNumber)}
          >
            <Text style={styles.code}>
              {item.DispatchBagNumber ? item.DispatchBagNumber : "Khác"}
            </Text>
            <Text>Túi : {item.Data[0].DispatchBagName}</Text>
          </TouchableOpacity> */}
          <View style={styles.deleteItem}>
            <TouchableOpacity
              hitSlop={styles.hitSlop}
              onPress={() => minusBagPieces(index, item.ExpectedPieces - 1)}
            >
              <Icon
                name="ic_minus"
                color={Themes.colors.danger60}
                size={Metrics.icons.small}
              />
            </TouchableOpacity>
            <Text style={styles.Pieces}>1/{item.ExpectedPieces}</Text>
            <TouchableOpacity
              hitSlop={styles.hitSlop}
              onPress={() => plusBagPieces(index, item.ExpectedPieces + 1)}
            >
              <Icon
                name="ic_plus"
                color={Themes.colors.danger60}
                size={Metrics.icons.small}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.deleteItemContainer}>
            <TouchableOpacity
              onPress={() => toggleShowDeleteModal(item.DispatchBagNumber)}
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
        </View>
        {/* {listSearchText === item.DispatchBagNumber &&
          item.Data.map((i: InventoryDetailTemp, index: number) => {
            return (
              <InventoryItem
                item={i}
                index={index}
                pieces={item.ExpectedPieces}
              />
            );
          })} */}
      </View>
    );
  };
  const RenderShipmentItem = useCallback(
    ({ item, index }: { item: InventoryDetailTemp; index: number }) => {
      return (
        <ShipmentItem
          item={item}
          index={index}
          Delete={deleteShipmentItem}
          Upgrades={updateShipmentPieces}
        />
      );
    },
    [ShipmentNotBag],
  );
  const RenderHeaderListBag = () => {
    return ShipmentNotBag.length > 0 ? (
      <>
        <FlatList
          data={ShipmentNotBag}
          keyExtractor={(item, index) => item.Id || index.toString()}
          renderItem={RenderShipmentItem}
          keyboardDismissMode="on-drag"
        />
      </>
    ) : (
      <View />
    );
  };

  const onPressAddCode = async () => {
    await addNewCode(inputValue.current.trim(), true);
  };

  const changeLocation = () => {
    setLocationScanned("");
    setListSearchText("");
    setCodes([]);
    setShipmentNotBag([]);
    setTitleShow([]);
  };

  const onCheckAll = () => {
    setTitleShow(draft => {
      draft.forEach(item => {
        item.ExpectedPieces = 1;
      });
    });
    setShipmentNotBag(draft => {
      draft.forEach(item => {
        item.Pieces = item.ExpectedPieces;
      });
    });
    setCodes(draft => {
      draft.forEach(item => {
        item.Pieces = item.ExpectedPieces;
      });
    });
  };

  const checkAll = (): boolean => {
    return (
      codes.every(value => value.Pieces === value.ExpectedPieces) &&
      titleShow.every(value => value.ExpectedPieces === 1)
    );
  };

  const checkPositionTrue = (): boolean => {
    return codes.every(value => value.PositionTrue);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          {isLoading ? (
            <ActivityIndicator
              style={styles.loading}
              size="large"
              color={Themes.colors.collGray40}
            />
          ) : locationScanned ? (
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
                <TouchableOpacity
                  style={styles.addCode}
                  onPress={onPressAddCode}
                >
                  <Icon
                    name="ic_plus"
                    color={Themes.colors.bg}
                    size={Metrics.icons.small}
                  />
                </TouchableOpacity>
              </View>
              <FlatList
                ref={inventoryRef}
                data={titleShow.filter(item => item.DispatchBagNumber !== null)}
                keyExtractor={(item, index) =>
                  item.DispatchBagNumber + index.toString()
                }
                renderItem={RenderBagItem}
                ListHeaderComponent={RenderHeaderListBag}
                // ListFooterComponent={RenderFooterListBag}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="handled"
              />
              {/* {codes && codes.length > 0 && ( */}
              <View style={styles.footer}>
                <Checkbox
                  style={styles.checkbox}
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
              {/* )} */}
            </>
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
                  {translate("label.scanLocation")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <ConfirmModal
          isVisible={isShowConfirmModal}
          closeModal={hideConfirmModal}
          message={translate("alert.confirmInventory", {
            number: codes.length,
          })}
          onConfirm={inventoryCode}
        />
        <ChooseLocationModal
          isVisible={isShowLocationModal}
          closeModal={hideLocationModal}
          onSelectLocation={local => getDataLocation(local.Name)}
        />
        <DeleteModal
          isVisible={isShowDeleteModal}
          closeModal={() => setShowDeleteModal(false)}
          message={translate("alert.deleteReceive", {
            number: listSearchText,
          })}
          confirmDelete={() => confirmDeleteBag(listSearchText)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
