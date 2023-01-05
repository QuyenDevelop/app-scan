import { IRootState } from "@redux";
import { Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSelector } from "react-redux";
import styles from "./styles";
interface Props {
  isVisible: boolean;
  closeModal: () => void;
  date: Date;
  apply: (date: Date) => void;
}

export const ChooseTimeModal: FunctionComponent<Props> = props => {
  const { isVisible, closeModal, date, apply } = props;
  const language = useSelector((state: IRootState) => state.account.language);

  const onApply = (value: Date) => {
    closeModal();
    apply?.(value);
  };

  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode="date"
      onConfirm={onApply}
      onCancel={closeModal}
      date={date}
      locale={language || "vi-VN"}
      modalStyleIOS={styles.modalIOS}
      // isHeaderVisibleIOS={true}
      customHeaderIOS={() => (
        <View style={styles.headerBottomSheet}>
          <Text style={styles.qrUserManual}>
            {translate("label.chooseDate")}
          </Text>
          <TouchableOpacity onPress={closeModal}>
            <Icon
              name="ic_close"
              size={Metrics.icons.large}
              color={Themes.colors.coolGray60}
            />
          </TouchableOpacity>
        </View>
      )}
      customCancelButtonIOS={() => <View />}
      customConfirmButtonIOS={value => (
        <TouchableOpacity style={styles.applyBtn} onPress={value.onPress}>
          <Text style={styles.applyTextBtn}>{translate("button.apply")}</Text>
        </TouchableOpacity>
      )}
    />
    // <BaseBottomSheet isShowModal={isVisible} onCloseModal={closeModal}>
    //   <View style={styles.bottomModal}>
    //     <View style={styles.headerBottomSheet}>
    //       <Text style={styles.qrUserManual}>
    //         {translate("label.chooseDate")}
    //       </Text>
    //       <TouchableOpacity onPress={closeModal}>
    //         <Icon
    //           name="ic_close"
    //           size={Metrics.icons.large}
    //           color={Themes.colors.coolGray60}
    //         />
    //       </TouchableOpacity>
    //     </View>
    //     <DateTimePicker
    //       value={selectDate || new Date()}
    //       mode="date"
    //       is24Hour={true}
    //       display="default"
    //       onChange={onChange}
    //       locale="vi-VN"
    //       maximumDate={new Date()}
    //     />
    //     <TouchableOpacity style={styles.applyBtn} onPress={onApply}>
    //       <Text style={styles.applyTextBtn}>{translate("button.apply")}</Text>
    //     </TouchableOpacity>
    //   </View>
    // </BaseBottomSheet>
  );
};
