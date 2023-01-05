import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Zocial from "react-native-vector-icons/Zocial";

const icoMoonConfig = require("./selection.json");
const EzbileIcon = createIconSetFromIcoMoon(
  icoMoonConfig,
  "icomoon",
  "icomoon.ttf",
);

export const Icons = {
  AntDesign: AntDesign,
  Entypo: Entypo,
  EvilIcons: EvilIcons,
  Fontisto: Fontisto,
  Feather: Feather,
  FontAwesome: FontAwesome,
  Foundation: Foundation,
  Ionicons: Ionicons,
  MaterialIcons: MaterialIcons,
  MaterialCommunityIcons: MaterialCommunityIcons,
  Octicons: Octicons,
  Zocial: Zocial,
  SimpleLineIcons: SimpleLineIcons,
  EzbileIcon: EzbileIcon,
};
