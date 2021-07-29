import { serviceApi } from "@api";
import { SubShipment } from "@models";
import React, { FunctionComponent, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { ServiceShipmentResponse } from "src/models/Response/ServiceResponse";
import { SubShipmentItem } from "./SubShipmentItem";
interface Props {
  shipment: string;
  reference: string;
  customer: string;
  cnee: string;
  service: string;
  subShipments: Array<SubShipment>;
}
export const GeneralInfoTab: FunctionComponent<Props> = props => {
  const { shipment, reference, customer, cnee, service, subShipments } = props;
  const [selectedService, setSelectedService] = useState<
    ServiceShipmentResponse | undefined
  >();
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
  const keyExtractor = (item: SubShipment, index: number) =>
    `${item.ShipmentId}_${index}`;

  const renderItem = ({ item }: { item: SubShipment }) => {
    return (
      <SubShipmentItem
        shipment={shipment}
        reference={reference}
        subShipment={item}
        customer={customer}
        cnee={cnee}
        service={selectedService}
        services={listService}
        setSelectedService={setSelectedService}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={subShipments}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};
