import { ScreenUtils } from "@helpers";
import { BaseBottomSheet, Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import { ServiceShipmentResponse } from "src/models/Response/ServiceResponse";
import styles from "./styles";

interface Props {
  isShowModal: boolean;
  closeModal: () => void;
  onSelectService: (value: ServiceShipmentResponse) => void;
  services: Array<ServiceShipmentResponse>;
}
export const ServiceModal: FunctionComponent<Props> = props => {
  const { isShowModal, closeModal, onSelectService, services } = props;
  const Service = ({ service }: { service: ServiceShipmentResponse }) => {
    const selectService = () => {
      closeModal();
      onSelectService(service);
    };
    return (
      <TouchableOpacity onPress={selectService}>
        <View style={styles.serviceSelect}>
          <Icon
            name="ic_status"
            size={Metrics.icons.small}
            color={Themes.colors.brand60}
          />
          <Text style={{ marginLeft: ScreenUtils.scale(8) }}>
            {service.Name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <BaseBottomSheet isShowModal={isShowModal} onCloseModal={closeModal}>
      <View style={styles.bottomModal}>
        <View style={styles.headerBottomSheet}>
          <Text style={styles.qrUserManual}>{translate("label.service")}</Text>
          <TouchableOpacity onPress={closeModal}>
            <Icon
              name="ic_close"
              size={Metrics.icons.large}
              color={Themes.colors.coolGray60}
            />
          </TouchableOpacity>
        </View>
        {services &&
          services.map(service => (
            <Service service={service} key={service.Id} />
          ))}
      </View>
    </BaseBottomSheet>
  );
};
