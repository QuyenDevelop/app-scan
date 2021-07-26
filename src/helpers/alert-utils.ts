import { translate } from "@shared";
import { isEmpty } from "lodash";
import DropdownAlert from "react-native-dropdownalert";

export class DropdownMessageHolder {
  static dropDown: DropdownAlert;
  static setDropDown(dropDown: DropdownAlert) {
    this.dropDown = dropDown;
  }
  static getDropDown() {
    return this.dropDown;
  }
}

export const Alert = {
  error(message: string, isTranslated = false) {
    if (!isEmpty(message)) {
      DropdownMessageHolder.dropDown.alertWithType(
        "error",
        translate("label.error"),
        isTranslated ? message : translate(message),
      );
    }
  },

  warning(message: string, isTranslated = false) {
    if (!isEmpty(message)) {
      DropdownMessageHolder.dropDown.alertWithType(
        "warn",
        translate("label.warning"),
        isTranslated ? message : translate(message),
      );
    }
  },

  success(message: string, isTranslated = false) {
    if (!isEmpty(message)) {
      DropdownMessageHolder.dropDown.alertWithType(
        "success",
        translate("label.success"),
        isTranslated ? message : translate(message),
      );
    }
  },
};
