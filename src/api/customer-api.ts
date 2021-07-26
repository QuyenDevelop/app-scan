import { BaseApi } from "./base-api";

class CustomerApi extends BaseApi {
  // getListAddress(accountId?: string) {
  //   return this.get<BaseResponseEntity<Array<Address>>>("getlistbyaccountid", {
  //     accountId,
  //   });
  // }

  // getAddress(id: number) {
  //   return this.get<BaseResponseEntity<Address>>("getcustomeraddressbyid", {
  //     id,
  //   });
  // }

  // addAddress(data: any) {
  //   return this.post("addcustomeraddress", data, {});
  // }

  // updateAddress(data: Address) {
  //   return this.put("updatecustomeraddress", data, {});
  // }

  // updateCustomer(data: UpdateCustomerRequest) {
  //   return this.put("updatecustomer", data, {});
  // }

  // setDefaultAddress(id: number) {
  //   return this.post("setdefaultcustomeraddress", { id }, {});
  // }

  // deleteAddress(id: number) {
  //   return this.delete("deletecustomeraddress", { id }, {});
  // }

  // getCustomerWallet() {
  //   return this.get<BaseResponseEntity<Wallet[]>>("getcustomerwallet", {});
  // }

  // getCashAvailable() {
  //   return this.get<BaseResponseEntity<number>>("getcashavailable", {});
  // }

  // getCustomerLevel() {
  //   return this.get<BaseResponseEntity<CustomerLevelResponse>>(
  //     "getcustomerlevel",
  //     {},
  //   );
  // }

  updateDeviceId(deviceTokenMobile: string) {
    return this.post("updatedevicetoken", { deviceTokenMobile }, {});
  }

  // getSignalToken(anonymousId: string) {
  //   return this.get<BaseResponseEntity<string>>("generatesignaltoken", {
  //     anonymousId,
  //   });
  // }

  // depositPaypal(depositRequest: DepositRequest) {
  //   return this.post("depositpaypal", depositRequest, {});
  // }

  // getAllBank() {
  //   return this.get<BaseResponseEntity<Array<BankIcResponse>>>(
  //     "getallbank",
  //     {},
  //   );
  // }

  // createDepositFromBank(amount: number, bankName: string, bankNumber: string) {
  //   return this.post(
  //     "createdepositfrombank",
  //     {
  //       amount: amount,
  //       bankName: bankName,
  //       bankNumber: bankNumber,
  //     },
  //     {},
  //   );
  // }

  // getDepositDetail(transactionId: number) {
  //   return this.get<BaseResponseEntity<DepositTransactionResponse>>(
  //     "getdepositdetail",
  //     { transactionId: transactionId },
  //   );
  // }

  // getTransactionHistory = (
  //   transactionHistoryRequest: TransactionHistoryRequest,
  // ) => {
  //   return this.get<
  //     BasePagingResponseEntity<Array<TransactionHistoryResponse>>
  //   >("gettransactionhistory", transactionHistoryRequest);
  // };
}

export default new CustomerApi("customer");
