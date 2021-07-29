import { ScreenUtils } from "@helpers";
import { useShow } from "@hooks";
import { SubShipment } from "@models";
import { Icon } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ServiceShipmentResponse } from "src/models/Response/ServiceResponse";
import { ServiceModal } from "./ServiceModal";
import styles from "./styles";
interface Props {
  shipment: string;
  reference: string;
  customer: string;
  cnee: string;
  subShipment: SubShipment;
  service: ServiceShipmentResponse | undefined;
  services: Array<ServiceShipmentResponse> | undefined;
  setSelectedService: (service: ServiceShipmentResponse) => void;
}
export const SubShipmentItem: FunctionComponent<Props> = props => {
  const {
    shipment,
    reference,
    customer,
    cnee,
    subShipment,
    service,
    services,
    setSelectedService,
  } = props;
  const [isShowServiceModal, showServiceModal, hideServiceModal] = useShow();
  const [weight, setWeight] = useState<number>(
    subShipment.TotalGrossWeight || 0,
  );
  const [length, setLength] = useState<number>(subShipment.Length || 0);
  const [width, setWidth] = useState<number>(subShipment.Width || 0);
  const [height, setHeight] = useState<number>(subShipment.Height || 0);

  const updateWeight = (value: string) => {
    setWeight(parseFloat(value) || 0);
  };
  const updateLength = (value: string) => {
    setLength(parseFloat(value) || 0);
  };
  const updateWidth = (value: string) => {
    setWidth(parseFloat(value) || 0);
  };
  const updateHeight = (value: string) => {
    setHeight(parseFloat(value) || 0);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.subShipmentContainer}>
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
          <Text style={styles.labelInfo}>GW:</Text>
          <TextInput
            placeholder="Nhập trọng lượng"
            style={styles.inputInfo}
            keyboardType="number-pad"
            contextMenuHidden={true}
            placeholderTextColor={Themes.colors.collGray40}
            defaultValue={(weight * 1000).toString()}
            onChangeText={updateWeight}
          />
          <Text style={styles.contentInfo}>gram</Text>
        </View>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>Dimensions:</Text>
          <TextInput
            placeholder="length"
            style={styles.inputInfo}
            keyboardType="number-pad"
            contextMenuHidden={true}
            placeholderTextColor={Themes.colors.collGray40}
            defaultValue={length.toString()}
            onChangeText={updateLength}
          />
          <Text style={styles.contentInfo}>x</Text>
          <TextInput
            placeholder="width"
            style={styles.inputInfo}
            keyboardType="number-pad"
            contextMenuHidden={true}
            placeholderTextColor={Themes.colors.collGray40}
            defaultValue={width.toString()}
            onChangeText={updateWidth}
          />
          <Text style={styles.contentInfo}>x</Text>
          <TextInput
            placeholder="height"
            style={styles.inputInfo}
            keyboardType="number-pad"
            contextMenuHidden={true}
            placeholderTextColor={Themes.colors.collGray40}
            defaultValue={height.toString()}
            onChangeText={updateHeight}
          />
          <Text style={styles.contentInfo}>cm</Text>
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
              {service?.Name}
            </Text>
            <Icon
              name="ic_arrow_down"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.black}
            />
          </TouchableOpacity>
        </View>
        <ServiceModal
          isShowModal={isShowServiceModal}
          closeModal={hideServiceModal}
          onSelectService={setSelectedService}
          services={services || []}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
