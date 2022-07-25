import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

interface Props {}

export const WaitingPickingComponent: FunctionComponent<Props> = props => {
  const {} = props;

  return (
    <View style={styles.container}>
      <Text>WaitingPickingComponent</Text>
    </View>
  );
};
