import { combineReducers } from "redux";
import {
  accountReducer,
  defaultState as accountDefaultState,
  IUserState,
} from "./AccountReducer";

export interface IRootState {
  account: IUserState;
}

export const RootStateDefault: IRootState = {
  account: accountDefaultState,
};

const reducers = combineReducers<IRootState>({
  account: accountReducer,
});

export default reducers;
