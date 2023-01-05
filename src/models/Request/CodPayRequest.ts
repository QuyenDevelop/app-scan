export interface UpdateAmountCodRequest {
  customerId: string;
  customerCode: string;
  trackingNumber: string;
  currencyCode: string;
  amountLocal: number;
  rate: number;
  amountPay: number;
}

export interface ShipmentCodAmount {
  shipmentId: string;
  codAmountPay: number;
}
