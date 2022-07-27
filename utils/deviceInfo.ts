import { Dimensions, Platform } from "react-native";

export const windowWidth: number = Dimensions.get("window").width;
export const windowHeight: number = Dimensions.get("window").height;

export const isAndroid: boolean = Platform.OS === "android";
export const isiOS: boolean = Platform.OS === "ios";
