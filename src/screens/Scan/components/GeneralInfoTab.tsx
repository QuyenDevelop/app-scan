import { serviceApi, shipmentApi } from "@api";
import { DATA_CONSTANT } from "@configs";
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
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Switch } from "react-native-switch";
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
  subShipments: Array<SubShipment>;
  mode: number;
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
    mode,
  } = props;
  const [subShipments, setSubShipments] =
    useState<Array<SubShipment>>(sShipments);
  const [selectedService, setSelectedService] =
    useState<ServiceShipmentResponse>(DATA_CONSTANT.SHIPMENT_SERVICE[0]);
  const [isShowServiceModal, showServiceModal, hideServiceModal] = useShow();
  const [isShowModeModal, showModeModal, hideModeModal] = useShow();
  const [isLoadingUpdate, showLoadingUpdate, hideLoadingUpdate] = useShow();
  const [shipmentStatus, toggle] = useToggle();
  const [listService, setListService] =
    useState<Array<ServiceShipmentResponse>>();
  const [listMode, setListMode] = useState<Array<ModeShipmentResponse>>([]);
  const [selectedMode, setSelectedMode] = useState<ModeShipmentResponse>();
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
    fetchShipmentService();
    fetchMode();
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
    if (!selectedService) {
      Alert.warning("label.notChooseService");
      return;
    }
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
        shipmentNumber: shipment,
        cargoSPServiceId: selectedService.Id,
        cargoSPServiceCode: selectedService.Code,
        volumetricWeight: selectedService.VolumetricDivisor,
        subShipments: subShipmentRequest,
      })
      ?.then(() => {
        Alert.success("success.updateSuccess");
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
              {selectedService?.Name || translate("label.selectService")}
            </Text>
            <Icon
              name="ic_arrow_down"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.black}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.spaceBetween}>
          <View style={styles.generalInfoRow}>
            <Text style={styles.labelInfo}>Mode:</Text>
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
          <Switch
            value={shipmentStatus}
            onValueChange={() => toggle()}
            disabled={false}
            activeText={translate("button.go")}
            inActiveText={translate("button.hold")}
            circleSize={30}
            barHeight={35}
            circleBorderWidth={0}
            backgroundActive={Themes.colors.green22}
            backgroundInactive={Themes.colors.red0722}
            circleActiveColor={Themes.colors.white}
            circleInActiveColor={Themes.colors.white}
            renderActiveText={true}
            renderInActiveText={true}
            switchLeftPx={2.2}
            switchRightPx={2.2}
            switchWidthMultiplier={3}
            switchBorderRadius={30}
            circleBorderActiveColor={Themes.colors.green22}
            circleBorderInactiveColor={Themes.colors.green22}
          />
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

  const FooterComponent = () => {
    return (
      <TouchableOpacity style={styles.addMorePiece}>
        <Icon
          name="ic_plus"
          size={Metrics.icons.medium}
          color={Themes.colors.primary}
        />
        <Text style={styles.addMorePieceText}>
          {translate("button.addMorePiece")}
        </Text>
      </TouchableOpacity>
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
