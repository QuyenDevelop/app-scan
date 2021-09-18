import { serviceApi, shipmentApi } from "@api";
import { Alert, ScreenUtils } from "@helpers";
import { useShow, useToggle } from "@hooks";
import { SubShipment } from "@models";
import { Button, Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ModeShipmentResponse,
  ServiceShipmentResponse,
} from "src/models/Response/ServiceResponse";
import { ModeModal } from "./ModeModal";
import { ServiceModal } from "./ServiceModal";
import styles from "./styles";
import { SubShipmentItem } from "./SubShipmentItem";
interface Props {
  shipment: string;
  shipmentId: string;
  reference: string;
  customer: string;
  cnee: string;
  service: string;
  // subShipments: Array<SubShipment>;
  mode: number;
  isDirectShipment: boolean;
}

export const GeneralInfoTab: FunctionComponent<Props> = props => {
  const insets = useSafeAreaInsets();
  const {
    shipment,
    shipmentId,
    reference,
    customer,
    cnee,
    service,
    // subShipments: sShipments,
    mode,
    isDirectShipment,
  } = props;
  const [subShipments, setSubShipments] = useState<Array<SubShipment>>([
    { Length: 0, Width: 0, Height: 0, TotalGrossWeight: 0 },
  ]);
  const [selectedService, setSelectedService] =
    useState<ServiceShipmentResponse>();
  const [isShowServiceModal, showServiceModal, hideServiceModal] = useShow();
  const [isShowModeModal, showModeModal, hideModeModal] = useShow();
  const [isLoadingUpdate, showLoadingUpdate, hideLoadingUpdate] = useShow();
  const [shipmentStatus, toggleShipmentStatus] = useToggle(
    isDirectShipment || false,
  );
  const [listService, setListService] =
    useState<Array<ServiceShipmentResponse>>();
  const [listMode, setListMode] = useState<Array<ModeShipmentResponse>>([]);
  const [selectedMode, setSelectedMode] = useState<ModeShipmentResponse>();

  const getSubShipments = () => {
    shipmentApi
      .getDetailShipment({
        shipmentId: shipmentId,
        option: 2,
      })
      ?.then(response => {
        if (
          response &&
          response.success &&
          response.data.SubShipments.length > 0
        ) {
          setSubShipments(response.data.SubShipments);
        }
      });
  };

  const fetchShipmentService = () => {
    serviceApi.getAll()?.then(response => {
      setListService(response?.data || []);
      const finService = response?.data.filter(s => s.Id === service);
      if (finService) {
        setSelectedService(finService[0]);
      }
    });
  };

  const fetchMode = () => {
    serviceApi.getModes()?.then(response => {
      setListMode(response?.data || []);
      const findMode = response?.data.filter(s => s.Code === mode);
      if (findMode) {
        setSelectedMode(findMode[0]);
      }
    });
  };

  useEffect(() => {
    getSubShipments();
    fetchShipmentService();
    fetchMode();
  }, []);

  const updateInfoSubShipment = useCallback(
    (subShipment: SubShipment, index: number) => {
      const newSub = [...subShipments];
      newSub[index] = subShipment;
      setSubShipments(newSub);
    },
    [subShipments],
  );

  const addMoreSubShipment = () => {
    setSubShipments(subS => [
      ...subS,
      { Length: 0, Width: 0, Height: 0, TotalGrossWeight: 0 },
    ]);
  };

  const deleteSubShipment = useCallback(
    (index: number) => {
      const newSub = [...subShipments];
      if (newSub[index].Id) {
        shipmentApi
          .deleteSubShipment({
            ShipmentId: shipmentId,
            SubShipmentId: newSub[index].Id!,
          })
          ?.then(response => {
            if (response?.success) {
              newSub.splice(index, 1);
              setSubShipments(newSub);
            } else {
              Alert.error(response.message, true);
            }
          })
          .catch(error => {
            Alert.error(error, true);
          });
      } else {
        newSub.splice(index, 1);
        setSubShipments(newSub);
      }
    },
    [shipmentId, subShipments],
  );

  const updateDirectShipment = (value: boolean) => {
    shipmentApi
      .updateDirectShipment({ ShipmentId: shipmentId, IsDirectShipment: value })
      ?.then(response => {
        if (response.success) {
          toggleShipmentStatus();
        } else {
          Alert.error(response.message, true);
        }
      })
      .catch(error => {
        Alert.error(error, true);
      });
  };

  const keyExtractor = useCallback(
    (item: SubShipment, index: number) => `${item.ShipmentId}_${index}`,
    [],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: SubShipment; index: number }) => {
      return (
        <SubShipmentItem
          subShipment={item}
          index={index}
          updateSubShipment={updateInfoSubShipment}
          deleteSubShipment={deleteSubShipment}
          totalSubShipments={subShipments.length}
        />
      );
    },
    [deleteSubShipment, subShipments.length, updateInfoSubShipment],
  );

  const updateShipmentInformation = () => {
    if (!selectedService) {
      Alert.warning("label.notChooseService");
      return;
    }

    if (!selectedMode) {
      Alert.warning("label.notMode");
      return;
    }

    showLoadingUpdate();
    const subShipmentRequest = subShipments.map((subShipment: SubShipment) => {
      return {
        id: subShipment.Id,
        totalGrossWeight: subShipment.TotalGrossWeight * 1000,
        height: subShipment.Height,
        width: subShipment.Width,
        length: subShipment.Length,
        locationName: subShipment.LocationName,
      };
    });

    shipmentApi
      .updateShipmentInformation({
        id: shipmentId,
        shipmentNumber: shipment,
        referenceNumber: reference,
        cargoSPServiceId: selectedService.Id,
        cargoSPServiceCode: selectedService.Code,
        volumetricWeight: selectedService.VolumetricDivisor,
        cargoShippingMethod: selectedMode.Code,
        cargoShippingMethodText: selectedMode.Name,
        subShipments: subShipmentRequest,
      })
      ?.then(response => {
        if (response?.success) {
          Alert.success("success.updateSuccess");
        } else {
          Alert.error("error.errorServer");
        }
      })
      .catch(() => {
        Alert.error("error.errorServer");
      })
      .finally(() => {
        hideLoadingUpdate();
      });
  };

  const HeaderComponent = () => {
    return (
      <View style={styles.generalInfo}>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>
            {translate("label.shipmentNumber")}
          </Text>
          <Text style={[styles.contentInfo, { color: Themes.colors.info60 }]}>
            {shipment}
          </Text>
        </View>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>{translate("label.refNumber")}</Text>
          <Text style={styles.contentInfo}>{reference}</Text>
        </View>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>{translate("label.customer")}</Text>
          <Text style={styles.contentInfo}>{customer}</Text>
        </View>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>
            {translate("label.consigneeName")}
          </Text>
          <Text style={styles.contentInfo}>{cnee}</Text>
        </View>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>
            {translate("label.shippingMode")}
          </Text>
          <View style={styles.switch}>
            <Switch
              trackColor={{
                false: Themes.colors.red0722,
                true: Themes.colors.green22,
              }}
              thumbColor={Themes.colors.white}
              ios_backgroundColor={Themes.colors.red0722}
              onValueChange={updateDirectShipment}
              value={shipmentStatus}
            />
            <Text
              style={[
                styles.labelInfo,
                { marginLeft: ScreenUtils.calculatorWidth(8) },
              ]}
            >
              {shipmentStatus
                ? translate("button.go")
                : translate("button.hold")}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.serviceButton}
            onPress={showModeModal}
          >
            <Text
              style={[
                styles.labelInfo,
                { marginRight: ScreenUtils.calculatorWidth(5) },
              ]}
            >
              {selectedMode?.Name || translate("label.selectMode")}
            </Text>
            <Icon
              name="ic_arrow_down"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.black}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.generalInfoRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.labelInfo}>{translate("label.service")}</Text>
          <TouchableOpacity
            style={styles.serviceButton}
            onPress={showServiceModal}
          >
            <Text
              style={[
                styles.labelInfo,
                { marginRight: ScreenUtils.calculatorWidth(5) },
              ]}
            >
              {selectedService?.Name || translate("label.selectService")}
            </Text>
            <Icon
              name="ic_arrow_down"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.black}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const FooterComponent = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.addMorePiece}
          onPress={addMoreSubShipment}
        >
          <Icon
            name="ic_plus_fill"
            size={Metrics.icons.medium}
            color={Themes.colors.brand60}
          />
          <Text style={styles.addMorePieceText}>
            {translate("button.addMorePiece")}
          </Text>
        </TouchableOpacity>
        <Button
          title="Update"
          onPress={updateShipmentInformation}
          isLoading={isLoadingUpdate}
          buttonChildStyle={styles.updateButton}
        />
      </View>
    );
  };

  return (
    <View style={styles.generalTab}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "android" ? -400 : 100}
      >
        <FlatList
          data={subShipments}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={<HeaderComponent />}
          ListFooterComponent={<FooterComponent />}
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          showsVerticalScrollIndicator={false}
        />
        <ServiceModal
          isShowModal={isShowServiceModal}
          closeModal={hideServiceModal}
          onSelectService={setSelectedService}
          services={listService || []}
        />
        <ModeModal
          isShowModal={isShowModeModal}
          closeModal={hideModeModal}
          onSelectMode={setSelectedMode}
          modes={listMode || []}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
