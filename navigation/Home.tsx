import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import { FONT_SIZE } from "../constants/fonts";
import Home from "../screens/Home";
import { moderateScale } from "../utils/fontScaling";
import { useDispatch } from "react-redux";
import { CHANGE_DARK_MODE } from "../store/action";
import { useAppSelector } from "../store/store";
import MessageDetails from "../screens/MessageDetails";
import { Message } from "../types";

type HomeStackParams = {
  Home: undefined;
  MessageDetails: {
    message: Message;
  };
};

export type HomeStackRouteProp = RouteProp<HomeStackParams, "Home">;

export type HomeStackNavigationProp = NativeStackNavigationProp<
  HomeStackParams,
  "Home"
>;

export type MessageDetailsRouteProp = RouteProp<
  HomeStackParams,
  "MessageDetails"
>;

export type MessageDetailsNavigationProp = NativeStackNavigationProp<
  HomeStackParams,
  "MessageDetails"
>;

const HomeStack = createNativeStackNavigator<HomeStackParams>();

export const HomeStackNavigator = () => {
  const dispatch = useDispatch();
  const { dark } = useAppSelector((state) => state.data);
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitle: "My Portfolio",
        headerTitleStyle: {
          fontFamily: "Medium",
          fontSize: moderateScale(FONT_SIZE.large, 0.5),
          color: COLORS.white,
        },
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
        headerRight: () => (
          <Ionicons
            name={dark ? "sunny" : "moon"}
            size={15}
            color={COLORS.white}
            onPress={() => dispatch({ type: CHANGE_DARK_MODE })}
          />
        ),
        headerBackVisible: false,
        headerStyle: {
          backgroundColor: dark ? "#000" : "hsl(250, 69%, 61%)",
        },
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen
        name="MessageDetails"
        component={MessageDetails}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              name={"ios-arrow-back"}
              size={23}
              color={COLORS.white}
              onPress={() => navigation.goBack()}
            />
          ),
          headerTitle: "Message Details",
        })}
      />
    </HomeStack.Navigator>
  );
};
