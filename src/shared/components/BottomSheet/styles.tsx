import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 0,
    justifyContent: "flex-end",
  },
  titleModalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: ScreenUtils.calculatorWidth(16),
    marginVertical: ScreenUtils.calculatorHeight(10),
  },
  titleModalText: {
    ...Themes.font.semiBold,
    fontSize: 18,
    color: Themes.colors.coolGray100,
  },
  headerContainer: {
    backgroundColor: Themes.colors.collGray40,
    marginBottom: ScreenUtils.calculatorHeight(6),
    alignSelf: "center",
    width: ScreenUtils.calculatorWidth(46),
    height: ScreenUtils.calculatorHeight(5),
    borderRadius: 1000,
  },
  contentContainer: {
    borderTopLeftRadius: ScreenUtils.calculatorWidth(16),
    borderTopRightRadius: ScreenUtils.calculatorWidth(16),
    backgroundColor: Themes.colors.white,
    paddingTop: ScreenUtils.calculatorHeight(12),
  },
  itemContainer: {
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: ScreenUtils.calculatorWidth(16),
    borderBottomWidth: 1,
    borderBottomColor: Themes.colors.colGray20,
    paddingVertical: ScreenUtils.calculatorHeight(14),
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contentDetailContainer: {
    marginTop: ScreenUtils.calculatorHeight(10),
  },
  icon: {
    marginRight: ScreenUtils.calculatorWidth(12),
  },
  text: {
    flex: 1,
    ...Themes.font.semiBold,
    fontSize: 16,
    color: Themes.colors.textPrimary,
  },
  textContent: {
    flex: 1,
    ...Themes.font.regular,
    fontSize: 14,
    color: Themes.colors.black4C53,
    lineHeight: 18,
  },
  searchBarContainer: {
    flexDirection: "row",
  },
  search: {
    backgroundColor: Themes.colors.colGray10,
    borderRadius: ScreenUtils.calculatorWidth(20),
    paddingLeft: ScreenUtils.calculatorWidth(20),
    borderBottomWidth: 0,
  },
});
