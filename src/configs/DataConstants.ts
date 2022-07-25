import {
  goToCheckAndScanScreen,
  goToHomeScreen,
  goToListInventoryScreen,
  goToPickingScreen,
  goToReceiveScreen,
  goToScanCodScreen,
  goToScanShipmentCodeScreen,
  goToShipmentManagementScreen,
  goToUpdateLocationScreen,
  goToUserInformationScreen,
} from "@navigation";
import { Images } from "@themes";
// import { goToScanShipmentCodeScreen } from "./../navigation/NavigationManagement";

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
    title: "label.homeItems.receive.title",
    // content: "label.homeItems.receive.content",
    icon: Images.claimAndInquiries,
    onPress: goToReceiveScreen,
  },
  {
    id: 1,
    title: "label.homeItems.exploitShipment.title",
    // content: "label.homeItems.exploitShipment.content",
    icon: Images.icExploit,
    onPress: goToScanShipmentCodeScreen,
  },
  {
    id: 2,
    title: "label.homeItems.checkAndScan.title",
    // content: "label.homeItems.checkAndScan.content",
    icon: Images.checkAndScan,
    onPress: goToCheckAndScanScreen,
  },
  {
    id: 3,
    title: "label.homeItems.cod.title",
    // content: "label.homeItems.cod.content",
    icon: Images.cod,
    onPress: goToScanCodScreen,
  },
  {
    id: 4,
    title: "label.homeItems.changeLocation.title",
    // content: "label.homeItems.changeLocation.content",
    icon: Images.icLocation,
    onPress: goToUpdateLocationScreen,
  },
  {
    id: 5,
    title: "label.homeItems.shipmentManagement.title",
    // content: "label.homeItems.shipmentManagement.content",
    icon: Images.shipmentManagement,
    onPress: goToShipmentManagementScreen,
  },
  {
    id: 6,
    title: "label.homeItems.inventoryManagement.title",
    // content: "label.homeItems.inventoryManagement.content",
    icon: Images.icInventory,
    onPress: goToListInventoryScreen,
  },
  {
    id: 7,
    title: "screens.picking.deliveryBill",
    // content: "label.homeItems.inventoryManagement.content",
    icon: Images.icInventory,
    onPress: goToPickingScreen,
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
    onPress: goToShipmentManagementScreen,
  },
  // {
  //   id: 4,
  //   title: "label.menuItem.claimAndInquiries",
  //   icon: Images.icMenuClaim,
  //   onPress: () => {},
  // },
  // {
  //   id: 5,
  //   title: "label.menuItem.setting",
  //   icon: Images.icMenuSetting,
  //   onPress: () => {},
  // },
  {
    id: 6,
    title: "label.menuItem.userInfo",
    icon: Images.icMenuUser,
    onPress: goToUserInformationScreen,
  },
];

const suffixImage = {
  shipmentAddServices: "shipment_add_service_suffix",
  shipmentCod: "shipment_cod_suffix",
  shipmentImages: "shipment_images_suffix",
};

const shipmentStatus = [
  { key: 0, value: "shipmentStatus.created" },
  { key: 5, value: "shipmentStatus.AcceptedAtSendingOPCenter" },
  { key: 6, value: "shipmentStatus.ReExploit" },
  { key: 7, value: "shipmentStatus.HasStoppedMining" },
  { key: 8, value: "shipmentStatus.WattingInfomation" },
  { key: 9, value: "shipmentStatus.PartnerAddedInfomation" },
  { key: 10, value: "shipmentStatus.WaitProcess" },
  { key: 20, value: "shipmentStatus.ShipmentProcessed" },
  { key: 30, value: "shipmentStatus.Bagged" },
  { key: 40, value: "shipmentStatus.DispatchClosedInland" },
  {
    key: 50,
    value: "shipmentStatus.ArrivedAtDestinationOperationCenterInland",
  },
  { key: 60, value: "shipmentStatus.DispatchClosedInternational" },
  { key: 70, value: "shipmentStatus.DoingExportCustomsProcedures" },
  { key: 80, value: "shipmentStatus.ExportCustomsClearanceSucceeded" },
  { key: 90, value: "shipmentStatus.NeedAddCustomsClearanceDocs" },
  { key: 110, value: "shipmentStatus.ExportCustomsClearanceRejected" },
  { key: 110, value: "shipmentStatus.WaitingForExportProcedures" },
  { key: 120, value: "shipmentStatus.FlightArranged" },
  { key: 130, value: "shipmentStatus.VesselArranged" },
  { key: 140, value: "shipmentStatus.TruckerArranged" },
  { key: 150, value: "shipmentStatus.DeliveredToAirline" },
  { key: 160, value: "shipmentStatus.DeliveredToShippingCompany" },
  { key: 170, value: "shipmentStatus.DeliveredToTruckingCompany" },
  { key: 175, value: "shipmentStatus.ExportedFromCountry" },
  { key: 180, value: "shipmentStatus.ArrivedAtDestinationCountry" },
  { key: 190, value: "shipmentStatus.DoingImportCustomsProcedures" },
  { key: 200, value: "shipmentStatus.ImportCustomsClearanceSucceeded" },
  { key: 200, value: "shipmentStatus.ImportCustomsClearanceRejected" },
  { key: 220, value: "shipmentStatus.WaitingForImportProcedures" },
  {
    key: 230,
    value: "shipmentStatus.ArrivedAtDestinationOperationCenterInternational",
  },
  { key: 240, value: "shipmentStatus.DeliveredToDeliveryPartner" },
  { key: 245, value: "shipmentStatus.Shipping" },
  { key: 250, value: "shipmentStatus.Delivered" },
  { key: 260, value: "shipmentStatus.DeliveryFailed" },
  { key: 270, value: "shipmentStatus.Refunded" },
  { key: 280, value: "shipmentStatus.Cancelled" },
  { key: 330, value: "shipmentStatus.ShipmentExport" },
  { key: 380, value: "shipmentStatus.HandedOverTheExportPartner" },
  { key: 381, value: "shipmentStatus.SubmittedComplaint" },
  { key: 382, value: "shipmentStatus.ComplaintHandled" },
];

export const DATA_CONSTANT = {
  SHIPMENT_SERVICE: shipmentService,
  LANGUAGE_CODE: languageCodes,
  SHIPMENT_MODE: shipmentMode,
  HOME_ITEMS: homeItems,
  MENU_ITEMS: menuItems,
  SUFFIX_IMAGE: suffixImage,
  SHIPMENT_STATUS: shipmentStatus,
};
