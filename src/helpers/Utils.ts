// import { OrderStatus } from "@models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import round from "lodash/round";
import moment from "moment";
import { Platform, StatusBar, StatusBarStyle } from "react-native";

const formatDecimalText = (value: string): string => {
  return value
    .replace(/[^0-9.]/g, "")
    .replace(".", "x")
    .replace(/\./g, "")
    .replace("x", ".");
};

export const Utils = {
  delay: (ms: number) => new Promise(res => setTimeout(res, ms)),
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
  formatMoney: (
    money: string | number | null | undefined,
    replace?: string,
  ) => {
    if (money === null || money === "" || money === undefined) {
      return "0";
    }
    const moneyArray = money.toString().split(".");
    let moneyString = "";
    moneyString = moneyArray[0]
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, replace ? replace : ",");
    if (moneyArray[1]) {
      moneyString += "." + moneyArray[1];
    }
    return moneyString;
  },
  formatMoneyDecimal: (money: string | number | null | undefined) => {
    if (money === null || money === "" || money === undefined) {
      return "0";
    }
    const moneyArray = money.toString().split(".");
    let moneyString = "";
    moneyString = moneyArray[0]
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (money.toString().includes(".")) {
      moneyString += ".";
    }
    if (moneyArray[1]) {
      moneyString += moneyArray[1];
    }
    return moneyString;
  },
  getTextOverCount: (quantity: number) => {
    return quantity >= 100 ? "99+" : quantity.toString();
  },
  convertMoneyTextToNumber: (money: string) => {
    return round(Number(formatDecimalText(money)) || 0, 3);
  },
  convertDecimalText: (money: string) => {
    const lastCharacter = money.charAt(money.length - 1);
    let newMoney = money;

    if (money.charAt(0) === "0") {
      newMoney = money.substr(1);
    }

    if (isNaN(Number(lastCharacter))) {
      newMoney = money.substring(0, money.length - 1) + ".";
    }

    return formatDecimalText(newMoney);
  },
};
