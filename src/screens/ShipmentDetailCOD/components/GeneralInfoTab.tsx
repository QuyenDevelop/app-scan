import { serviceApi, shipmentApi } from "@api";
import { Alert, ScreenUtils, Utils } from "@helpers";
import { useToggle } from "@hooks";
import { SubShipment } from "@models";
import { translate } from "@shared";
import { Themes } from "@themes";
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
  const [shipmentStatus, toggleShipmentStatus] = useToggle(
    isDirectShipment || false,
  );

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
          <TouchableOpacity>
            <Text
              style={[styles.contentInfo, { textDecorationLine: "underline" }]}
            >
              {cnee}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spaceBetween}>
          <View style={styles.generalInfoRow}>
            <Text style={styles.labelInfo}>
              {translate("label.shippingMode")}
            </Text>
            <Text
              style={[
                styles.labelInfo,
                { marginRight: ScreenUtils.calculatorWidth(5) },
              ]}
            >
              {selectedMode?.Name}
            </Text>
          </View>
          <Switch
            value={shipmentStatus}
            onValueChange={updateDirectShipment}
            disabled={true}
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
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>{translate("label.service")}</Text>
          <Text
            style={[
              styles.labelInfo,
              { marginRight: ScreenUtils.calculatorWidth(5) },
            ]}
          >
            {selectedService?.Name}
          </Text>
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
        {subShipments.length === 1 ? (
          <>
            <HeaderComponent />
            <View style={styles.generalInfoRow}>
              <Text style={styles.labelInfo}>
                {translate("label.subShipmentWeight")}
              </Text>
              <Text style={styles.contentInfo}>
                {Utils.formatMoney(
                  (subShipments[0].TotalGrossWeight || 0) * 1000,
                )}{" "}
              </Text>
              <Text style={styles.contentInfo}>{translate("label.gram")}</Text>
            </View>
            <View style={styles.generalInfoRow}>
              <Text style={styles.labelInfo}>
                {translate("label.dimension")}
              </Text>

              <Text style={styles.contentInfo}>
                {subShipments[0].Length?.toString() || "0"} x{" "}
                {subShipments[0].Length?.toString() || "0"} x{" "}
                {subShipments[0].Length?.toString() || "0"}{" "}
                {translate("label.cm")}
              </Text>
            </View>
          </>
        ) : (
          <FlatList
            data={subShipments}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListHeaderComponent={<HeaderComponent />}
            contentContainerStyle={{ paddingBottom: insets.bottom }}
          />
        )}
      </KeyboardAvoidingView>
    </View>
  );
};
