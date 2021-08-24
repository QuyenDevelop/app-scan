import {
  goToCheckAndScanScreen,
  goToHomeScreen,
  goToScanCodScreen,
  goToShipmentManagementScreen,
} from "@navigation";
import { Images } from "@themes";

const shipmentService = [
  {
    Active: true,
    Code: "001",
    DisplayOrder: 1,
    EntityCacheKey:
      "ichiba.cargospservice.id-0147b435-6c41-45d8-906a-a89d466f3518",
    Id: "0147b435-6c41-45d8-906a-a89d466f3518",
    IsDefault: false,
    Name: "Dịch vụ chuyển phát",
    Note: "EX",
    VolumetricDivisor: 5000,
  },
  {
    Active: true,
    Code: "002",
    DisplayOrder: 3,
    EntityCacheKey:
      "ichiba.cargospservice.id-93f2359f-6bd3-4dde-b0a9-c8d7aa7caeb0",
    Id: "93f2359f-6bd3-4dde-b0a9-c8d7aa7caeb0",
    IsDefault: true,
    Name: "Dịch vụ chuyển phát tiết kiệm",
    Note: "CS",
    VolumetricDivisor: 6000,
  },
];

const languageCodes = [
  { code: "vi", tag: "vi-VN" },
  { code: "en", tag: "en-US" },
  { code: "ja", tag: "ja-JP" },
  { code: "cn", tag: "zh-CN" },
  { code: "tw", tag: "zh-TW" },
];

const shipmentMode = [
  {
    Code: 1,
    Name: "Hàng không",
  },
  {
    Code: 2,
    Name: "Đường biển",
  },
  {
    Code: 3,
    Name: "Đường bộ",
  },
];

const homeItems = [
  {
    id: 0,
    title: "label.homeItems.checkAndScan.title",
    content: "label.homeItems.checkAndScan.content",
    icon: Images.checkAndScan,
    onPress: goToCheckAndScanScreen,
  },
  {
    id: 1,
    title: "label.homeItems.cod.title",
    content: "label.homeItems.cod.content",
    icon: Images.cod,
    onPress: goToScanCodScreen,
  },
  {
    id: 2,
    title: "label.homeItems.shipmentManagement.title",
    content: "label.homeItems.shipmentManagement.content",
    icon: Images.shipmentManagement,
    onPress: goToShipmentManagementScreen,
  },
  {
    id: 3,
    title: "label.homeItems.claimAndInquiries.title",
    content: "label.homeItems.claimAndInquiries.content",
    icon: Images.claimAndInquiries,
    onPress: () => {},
  },
];

const menuItems = [
  {
    id: 0,
    title: "label.menuItem.home",
    icon: Images.icMenuHome,
    onPress: goToHomeScreen,
  },
  {
    id: 1,
    title: "label.menuItem.checkAndScan",
    icon: Images.icMenuScanAndCheck,
    onPress: goToCheckAndScanScreen,
  },
  {
    id: 2,
    title: "label.menuItem.scanCod",
    icon: Images.icMenuScanCod,
    onPress: goToScanCodScreen,
  },
  {
    id: 3,
    title: "label.menuItem.shipmentManagement",
    icon: Images.icMenuShipmentManage,
    onPress: () => {},
  },
  {
    id: 4,
    title: "label.menuItem.claimAndInquiries",
    icon: Images.icMenuClaim,
    onPress: () => {},
  },
  {
    id: 5,
    title: "label.menuItem.setting",
    icon: Images.icMenuSetting,
    onPress: () => {},
  },
  {
    id: 6,
    title: "label.menuItem.userInfo",
    icon: Images.icMenuUser,
    onPress: () => {},
  },
];

const suffixImage = {
  shipmentAddServices: "shipment_add_service_suffix",
  shipmentCod: "shipment_cod_suffix",
};

export const DATA_CONSTANT = {
  SHIPMENT_SERVICE: shipmentService,
  LANGUAGE_CODE: languageCodes,
  SHIPMENT_MODE: shipmentMode,
  HOME_ITEMS: homeItems,
  MENU_ITEMS: menuItems,
  SUFFIX_IMAGE: suffixImage,
};
