import { SagaIterator } from "redux-saga";
import { all, call } from "redux-saga/effects";
import accountSaga from "./AccountSaga";

export default function* rootSaga(): SagaIterator {
  yield all([call(accountSaga)]);
}
