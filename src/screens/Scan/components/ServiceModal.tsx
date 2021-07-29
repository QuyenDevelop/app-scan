import { BaseBottomSheet } from "@shared";
import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
      <TouchableOpacity style={styles.serviceSelect} onPress={selectService}>
        <Text>{service.Name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <BaseBottomSheet isShowModal={isShowModal} onCloseModal={closeModal}>
      <View>
        {services &&
          services.map(service => (
            <Service service={service} key={service.Id} />
          ))}
      </View>
    </BaseBottomSheet>
  );
};
