import { Icon, Text } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Modal, View } from "react-native";
import { DownloadProgress } from "react-native-code-push";
import { Bar } from "react-native-progress";
import styles from "./styles";
interface OwnProps {
  title: string;
  message: string;
  isVisible: boolean;
  progress: DownloadProgress;
}

type Props = OwnProps;

export const UpdateModal: FunctionComponent<Props> = props => {
  const { isVisible, message, title, progress } = props;

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      statusBarTranslucent={true}
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Icon
            name="ic_check-circle-outline"
            size={Metrics.icons.large}
            color={Themes.colors.success60}
          />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.message}>
            {progress.receivedBytes}/{progress.totalBytes}
          </Text>
          <View style={styles.confirm}>
            <Bar
              progress={progress.receivedBytes / progress.totalBytes}
              width={200}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
