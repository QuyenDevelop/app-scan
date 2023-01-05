import { SagaIterator } from "redux-saga";
import { all, call } from "redux-saga/effects";
import accountSaga from "./AccountSaga";
import shipmentInfoSaga from "./ShipmentInfoSaga";

export default function* rootSaga(): SagaIterator {
  yield all([call(accountSaga), call(shipmentInfoSaga)]);
}
