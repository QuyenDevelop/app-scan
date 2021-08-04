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
export const DATA_CONSTANT = {
  SHIPMENT_SERVICE: shipmentService,
  LANGUAGE_CODE: languageCodes,
  SHIPMENT_MODE: shipmentMode,
};
