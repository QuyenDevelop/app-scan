// import { OrderStatus } from "@models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { Platform, StatusBar, StatusBarStyle } from "react-native";

export const Utils = {
  comparePrice: (minPrice: number, maxPrice: number) => {
    return minPrice < maxPrice;
  },
  storeTokenResponse: async (tokenResponse: any) => {
    Object.keys(tokenResponse).map(async t => {
      await AsyncStorage.setItem(t, String(tokenResponse[t]));
    });
  },
  changeStatusBar: (
    style: StatusBarStyle = "light-content",
    backgroundColor: string = "transparent",
  ) => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(backgroundColor);
      StatusBar.setTranslucent(true);
    }
    StatusBar.setBarStyle(style);
  },
  isEqualZero: (value: number) => {
    return value > 0;
  },
  isValidEmail: (email: any) => {
    return (
      email &&
      new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}$/g).test(email)
    );
  },
  isValidPassword: (password: string) => {
    return (
      password &&
      new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/).test(password)
    );
  },

  isMatchPassword: (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  },

  isEmpty: (value: string) => {
    return value && value != "" && value != null;
  },
  isPhone: (value: string) => {
    return (
      value &&
      new RegExp(
        /^[+]?\d{2,}?[(]?\d{2,}[)]?[-\s.]?\d{2,}?[-\s.]?\d{2,}[-\s.]?\d{0,9}$/im,
      ).test(value)
    );
  },
  date: {
    formatDateTime: (datetime: any) =>
      moment(datetime).format("HH:mm DD/MM/YYYY"),
    formatDate: (datetime: any) => moment(datetime).format("DD/MM/YYYY"),
    formatYYMMDD: (datetime: any) => moment(datetime).format("YYYY-MM-DD"),
    formatYearDate: (datetime: any) => moment(datetime).format("yyyy-MM-dd"),
    formatDay: (datetime: any) => moment(datetime).format("DD"),
    formatMonth: (datetime: any) => moment(datetime).format("MM"),
    formatYear: (datetime: any) => moment(datetime).format("YYYY"),
    formatTime: (datetime: any) => moment(datetime).format("HH:mm:ss"),
    formatTimeA: (datetime: any) => moment(datetime).format("hh:mm A"),
    convert: (datetime: any, oldFormat: any, newFormat: any) =>
      moment(datetime, oldFormat).format(newFormat),
    parse: (date: any, format: any) => moment(date, format || "DD/MM/YYYY"),
    parse2String: (dateStr: any, format: any) =>
      moment(dateStr).format(format || "DD/MM/YYYY"),
    countingTime: (datetime: any) => {
      moment.locale("vi");
      return moment().diff(datetime);
    },
    diffDate: (datetime: any) => {
      return moment().diff(datetime, "days");
    },
    seconds2MinuteSeconds: (seconds: number) => {
      return moment().startOf("day").seconds(seconds).format("mm:ss");
    },
  },
  str2moneyFormat: (value: string) => {
    if (value) {
      value = value.toString();
      if (value.length > 3) {
        var values = [];
        var padding = value.length % 3;
        var removedPadding = value.substr(padding);
        for (var i = 0; i < removedPadding.length; i += 3) {
          values.push(removedPadding.substr(i, 3));
          if (i !== removedPadding.length - 3) {
            values.push(",");
          }
        }
        return (
          (padding ? value.substr(0, padding) + "," : "") + values.join("")
        );
      }
    }
    return value;
  },

  str2moneyFormatAdvanced: (value: number, currency: string) => {
    return (
      currency +
      " " +
      value
        ?.toFixed(
          currency === "VND" || currency === "JPY" || currency === "¥" ? 0 : 2,
        )
        .replace(/./g, function (c, i, a) {
          return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        })
    );
  },
  onChangeFomatText: (val: string) => {
    val = val.replace("-", "");
    val = val.replace(/,/g, "");
    const x = Number(val);
    return Utils.str2moneyFormat(x.toString());
  },
  round: (num: number, decimalPlaces: number) => {
    let p = Math.pow(10, decimalPlaces);
    let e = Number.EPSILON * num * p;
    return Math.round(num * p + e) / p;
  },
  range(length: number) {
    return Array.from({ length: length }, (_, index) => index + 1);
  },
  stripEmptyHtmlTags(html?: string): string | undefined {
    if (!html) {
      return undefined;
    }
    return html.replace(/<[^>]*>?/gm, "");
  },
  formatMoney: (money: string | number | null, replace?: string) => {
    if (money === null || money === "") {
      return "0";
    }
    let moneyString = "";
    moneyString = money
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, replace ? replace : ",");
    return moneyString;
  },
  // getLogo: (refType: string) => {
  //   switch (refType) {
  //     case CONSTANT.BRAND_PRODUCT_CONSTANT.MERCARI:
  //       return Images.mercari;
  //     case CONSTANT.BRAND_PRODUCT_CONSTANT.RAKUTEN:
  //       return Images.rakuten;
  //     case CONSTANT.BRAND_PRODUCT_CONSTANT.AMAZON:
  //       return Images.amazon;
  //     case CONSTANT.BRAND_PRODUCT_CONSTANT.YAHOO_AUCTION:
  //       return Images.yAuction;
  //   }
  // },
  getTextOverCount: (quantity: number) => {
    return quantity >= 100 ? "99+" : quantity.toString();
  },
  step_bid: (p: number, t: number) => {
    var step = 10;
    if (p >= 1000 && p < 5000) {
      step = 100;
    }
    if (p >= 5000 && p < 10000) {
      step = 250;
    }
    if (p >= 10000 && p < 20000) {
      step = 500;
    }
    if (p >= 20000) {
      step = 1000;
    }
    if (t === 1) {
      return p + step;
    } else if (p - step < 0) {
      return 0;
    } else {
      return p - step;
    }
  },
  // genTextOrderStatus: (orderStatus: number) => {
  //   switch (orderStatus) {
  //     case OrderStatus.ChoTatToan:
  //       return "orderStatus.ChoTatToan";
  //     case OrderStatus.ChoXuLy:
  //       return "orderStatus.ChoXuLy";
  //     case OrderStatus.DaHuy:
  //       return "orderStatus.DaHuy";
  //     case OrderStatus.DaGiaoHang:
  //       return "orderStatus.DaGiaoHang";
  //     case OrderStatus.DaMuaHang:
  //       return "orderStatus.DaMuaHang";
  //     case OrderStatus.DangGiaoHang:
  //       return "orderStatus.DangGiaoHang";
  //     case OrderStatus.DangVanChuyen:
  //       return "orderStatus.DangVanChuyen";
  //     case OrderStatus.DaNhapKho:
  //       return "orderStatus.DaNhapKho";
  //     case OrderStatus.MuaHang:
  //       return "orderStatus.MuaHang";
  //     case OrderStatus.TamUng:
  //       return "orderStatus.TamUng";
  //     case OrderStatus.YeuCauHuy:
  //       return "orderStatus.YeuCauHuy";
  //   }
  // },
  convertMoneyTextToNumber: (money: string) => {
    return parseInt(money.replace(/\D/g, ""), 10) || 0;
  },
};
