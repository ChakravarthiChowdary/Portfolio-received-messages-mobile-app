import React, { Dispatch, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch } from "react-redux";
import Message from "../components/Message";
import { COLORS } from "../constants/colors";
import { HomeStackNavigationProp } from "../navigation/Home";
import { getMessages } from "../store/action";
import { useAppSelector } from "../store/store";

interface IHomeProps {
  navigation: HomeStackNavigationProp;
}

const Home: React.FC<IHomeProps> = ({ navigation }) => {
  const dispatch: Dispatch<any> = useDispatch();

  const { dark, messages, refreshing } = useAppSelector((state) => state.data);

  useEffect(() => {
    let interval: NodeJS.Timer;
    dispatch(getMessages());

    interval = setInterval(() => {
      dispatch(getMessages());
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: dark ? "#000000" : COLORS.white,
      }}
    >
      <Text>{dark}</Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Message message={item} navigation={navigation} />
        )}
        onRefresh={() => dispatch(getMessages(true))}
        refreshing={refreshing}
        maxToRenderPerBatch={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default Home;
