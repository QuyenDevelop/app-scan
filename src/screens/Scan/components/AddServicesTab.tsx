import { addServiceApi } from "@api";
import { ShipmentAddServiceResponse } from "@models";
import React, { FunctionComponent, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { AddServiceShipmentResponse } from "src/models/Response/ServiceResponse";
import { ServiceInfo } from "./ServiceInfo";
import styles from "./styles";
interface Props {
  addServices: Array<ShipmentAddServiceResponse>;
}
export const AddServicesTab: FunctionComponent<Props> = props => {
  const { addServices } = props;
  const idServices = addServices.map(service => service.CargoAddServiceId);
  const [listService, setListService] =
    useState<Array<AddServiceShipmentResponse>>();
  const [selectService, setSelectedService] =
    useState<Array<string>>(idServices);

  const fetchShipmentService = () => {
    addServiceApi.getAll()?.then(response => {
      const services = response?.data || [];
      const selected = services.filter(service =>
        idServices.includes(service.Id),
      );
      const nonSelected = services.filter(
        service => !idServices.includes(service.Id),
      );
      setListService([...selected, ...nonSelected]);
    });
  };

  useEffect(() => {
    fetchShipmentService();
  }, []);

  const isSelectedService = (serviceId: string) => {
    return selectService.filter(service => service === serviceId).length > 0;
  };
  const selectedService = (serviceSelect: AddServiceShipmentResponse) => {
    const isSelected = isSelectedService(serviceSelect.Id);

    if (isSelected) {
      setSelectedService(services =>
        services.filter(service => service !== serviceSelect.Id),
      );
    } else {
      setSelectedService(services => [...services, serviceSelect.Id]);
    }
  };
  const renderItem = ({ item }: { item: AddServiceShipmentResponse }) => {
    const isSelected = isSelectedService(item.Id);
    const onSelect = () => {
      selectedService(item);
    };
    return (
      <ServiceInfo item={item} isSelected={isSelected} onSelect={onSelect} />
    );
  };
  return (
    <View style={styles.tabContainer}>
      <FlatList
        data={listService}
        keyExtractor={item => item.Id}
        renderItem={renderItem}
      />
    </View>
  );
};
