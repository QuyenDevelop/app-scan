import { serviceApi, shipmentApi } from "@api";
import { ScreenUtils } from "@helpers";
import { useToggle } from "@hooks";
import { SubShipment } from "@models";
import { Icon, translate } from "@shared";
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
  const [subShipments, setSubShipments] = useState<Array<SubShipment>>([]);
  const [selectedService, setSelectedService] =
    useState<ServiceShipmentResponse>();
  const [shipmentStatus] = useToggle(isDirectShipment || false);

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
      })
      .catch(error => {
        console.log("🚀🚀🚀 => getSubShipments => error", error);
      });
  };

  const fetchShipmentService = () => {
    serviceApi.getAll()?.then(response => {
      const finService = response?.data.filter(s => s.Id === service);
      if (finService) {
        setSelectedService(finService[0]);
      }
    });
  };

  const fetchMode = () => {
    serviceApi.getModes()?.then(response => {
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

  const keyExtractor = useCallback(
    (item: SubShipment, index: number) => `${item.ShipmentId}_${index}`,
    [],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: SubShipment; index: number }) => {
      return <SubShipmentItem subShipment={item} index={index} />;
    },
    [],
  );

  const HeaderComponent = () => {
    return (
      <View style={styles.generalInfo}>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>
            {translate("label.shipmentNumber")}
          </Text>
          <Text style={styles.contentInfo}>{shipment}</Text>
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
                false: Themes.colors.coolGray60,
                true: Themes.colors.coolGray60,
              }}
              thumbColor={Themes.colors.white}
              ios_backgroundColor={Themes.colors.coolGray60}
              value={shipmentStatus}
              disabled={true}
            />
            <Text
              style={[styles.labelInfo, { marginLeft: ScreenUtils.scale(8) }]}
            >
              {shipmentStatus
                ? translate("button.go")
                : translate("button.hold")}
            </Text>
          </View>

          <TouchableOpacity style={styles.serviceButton} disabled={true}>
            <Text
              style={[styles.labelInfo, { marginRight: ScreenUtils.scale(5) }]}
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
          <TouchableOpacity style={styles.serviceButton} disabled={true}>
            <Text
              style={[styles.labelInfo, { marginRight: ScreenUtils.scale(5) }]}
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
      </KeyboardAvoidingView>
    </View>
  );
};
