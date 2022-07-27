import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { HomeStackNavigator } from "./navigation/Home";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function App() {
  const [loaded] = useFonts({
    Bold: require("./assets/fonts/Poppins-Bold.ttf"),
    Light: require("./assets/fonts/Poppins-Light.ttf"),
    Medium: require("./assets/fonts/Poppins-Medium.ttf"),
    Regular: require("./assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
