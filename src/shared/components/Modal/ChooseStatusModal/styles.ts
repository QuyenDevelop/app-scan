import { ScreenUtils } from "@helpers";
import { Themes } from "@themes";
import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: ScreenUtils.scale(20),
    paddingTop: ScreenUtils.scale(16),
  },
  title: {
    fontWeight: "bold",
  },
  searchView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ScreenUtils.scale(16),
    paddingVertical: ScreenUtils.scale(14),
    borderWidth: 1,
    borderColor: Themes.colors.colGray20,
    marginTop: ScreenUtils.scale(4),
    borderRadius: ScreenUtils.scale(25),
  },
  searchInput: {
    flex: 1,
    marginLeft: ScreenUtils.scale(8),
    ...Platform.select({
      android: {
        paddingVertical: 0,
      },
    }),
  },
  customers: {
    marginTop: ScreenUtils.scale(24),
    marginBottom: ScreenUtils.scale(10),
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Themes.colors.colGray10,
    height: 48,
    borderRadius: 8,
    marginBottom: ScreenUtils.scale(12),
    borderColor: Themes.colors.brand60,
  },
  itemText: {
    fontSize: 12,
    color: Themes.colors.coolGray70,
  },
  icon: {
    position: "absolute",
    top: -1,
    right: -1,
  },
});
