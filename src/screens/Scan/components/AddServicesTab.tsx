import { addServiceApi } from "@api";
import { ShipmentAddServiceResponse } from "@models";
import { Button, translate } from "@shared";
import React, { FunctionComponent, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { AddServiceShipmentResponse } from "src/models/Response/ServiceResponse";
import { ServiceInfo } from "./ServiceInfo";
import styles from "./styles";
interface Props {
  addServices: Array<ShipmentAddServiceResponse>;
  shipment: string;
}
export const AddServicesTab: FunctionComponent<Props> = props => {
  const { addServices, shipment } = props;
  const idServices = addServices.map(service => service.CargoAddServiceId);
  const servicesHandled = addServices.filter(service => service.IsProcessed);
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

  const isHandlerService = (serviceId: string) => {
    return (
      servicesHandled.filter(service => service.CargoAddServiceId === serviceId)
        .length > 0
    );
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
    const isHandled = isHandlerService(item.Id);
    const onSelect = () => {
      selectedService(item);
    };
    return (
      <ServiceInfo
        item={item}
        isSelected={isSelected}
        onSelect={onSelect}
        shipment={shipment}
        isHandled={isHandled}
      />
    );
  };
  return (
    <View style={styles.tabContainer}>
      <FlatList
        data={listService}
        keyExtractor={item => item.Id}
        renderItem={renderItem}
        ListFooterComponent={
          <Button
            title={translate("button.addService")}
            buttonStyle={styles.addServiceBtn}
          />
        }
      />
    </View>
  );
};
