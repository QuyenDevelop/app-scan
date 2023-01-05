import { AccountAction } from "@redux";
import { useDispatch } from "react-redux";

export const useLoading = () => {
  const dispatch = useDispatch();
  const changeLoadingStatus = (isLoading: boolean) => {
    dispatch(AccountAction.changeLoading({ loading: isLoading }));
  };

  const showLoading = () => {
    changeLoadingStatus(true);
  };

  const hideLoading = () => {
    changeLoadingStatus(false);
  };

  return { showLoading, hideLoading };
};
