import { ShipmentCODResponse } from "@models";
import React, { FunctionComponent } from "react";
import { ListShipment } from "./ListShipment";
interface Props {
  item: ShipmentCODResponse;
}

export const ShipmentInformationTab: FunctionComponent<Props> = props => {
  const { item } = props;

  return <ListShipment shipments={item.shipments} refId={item.Id} />;
};
