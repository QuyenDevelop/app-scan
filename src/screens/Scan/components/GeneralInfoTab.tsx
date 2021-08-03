import { serviceApi, shipmentApi } from "@api";
import { DATA_CONSTANT } from "@configs";
import { Alert, ScreenUtils } from "@helpers";
import { useShow } from "@hooks";
import { SubShipment } from "@models";
import { Button, Icon } from "@shared";
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
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ServiceShipmentResponse } from "src/models/Response/ServiceResponse";
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
  subShipments: Array<SubShipment>;
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
    subShipments: sShipments,
  } = props;
  const [subShipments, setSubShipments] =
    useState<Array<SubShipment>>(sShipments);
  const [selectedService, setSelectedService] =
    useState<ServiceShipmentResponse>(DATA_CONSTANT.SHIPMENT_SERVICE[0]);
  const [isShowServiceModal, showServiceModal, hideServiceModal] = useShow();
  const [isLoadingUpdate, showLoadingUpdate, hideLoadingUpdate] = useShow();
  const [listService, setListService] =
    useState<Array<ServiceShipmentResponse>>();
  const fetchShipmentService = () => {
    serviceApi.getAll()?.then(response => {
      setListService(response?.data || []);
      const finService = response?.data.filter(s => s.Id === service);
      if (finService) {
        setSelectedService(finService[0]);
      }
    });
  };

  useEffect(() => {
    fetchShipmentService();
  }, []);

  const updateInfoSubShipment = useCallback((subShipment: SubShipment) => {
    console.log("🚀🚀🚀 => updateInfoSubShipment => subShipment", subShipment);
    setSubShipments(listSub =>
      listSub.map(s => {
        if (s.Id === subShipment.Id) {
          return subShipment;
        }
        return s;
      }),
    );
  }, []);

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
        />
      );
    },
    [updateInfoSubShipment],
  );

  const updateShipmentInformation = () => {
    showLoadingUpdate();
    const subShipmentRequest = subShipments.map((subShipment: SubShipment) => {
      return {
        id: subShipment.Id,
        totalGrossWeight: subShipment.TotalGrossWeight,
        height: subShipment.Height,
        width: subShipment.Width,
        length: subShipment.Length,
      };
    });

    shipmentApi
      .updateShipmentInformation({
        id: shipmentId,
        cargoSPServiceId: selectedService.Id,
        cargoSPServiceCode: selectedService.Code,
        volumetricWeight: selectedService.VolumetricDivisor,
        subShipments: subShipmentRequest,
      })
      ?.then(() => {
        Alert.success("Cập nhật thành công", true);
      })
      .catch(() => {
        Alert.error("Đã có lỗi xảy ra. Vui lòng thử lại!", true);
      })
      .finally(() => {
        hideLoadingUpdate();
      });
  };

  const HeaderComponent = () => {
    return (
      <View style={styles.generalInfo}>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>Shipment:</Text>
          <Text style={styles.contentInfo}>{shipment}</Text>
        </View>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>Ref:</Text>
          <Text style={styles.contentInfo}>{reference}</Text>
        </View>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>Customer:</Text>
          <Text style={styles.contentInfo}>{customer}</Text>
        </View>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>Cnee:</Text>
          <TouchableOpacity>
            <Text
              style={[styles.contentInfo, { textDecorationLine: "underline" }]}
            >
              {cnee}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>Service:</Text>
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
              {selectedService?.Name}
            </Text>
            <Icon
              name="ic_arrow_down"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.black}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.generalInfoRow, { justifyContent: "center" }]}>
          <Button
            title="Update"
            onPress={updateShipmentInformation}
            isLoading={isLoadingUpdate}
            buttonChildStyle={styles.updateButton}
          />
        </View>
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
          contentContainerStyle={{ paddingBottom: insets.bottom }}
        />
        <ServiceModal
          isShowModal={isShowServiceModal}
          closeModal={hideServiceModal}
          onSelectService={setSelectedService}
          services={listService || []}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
