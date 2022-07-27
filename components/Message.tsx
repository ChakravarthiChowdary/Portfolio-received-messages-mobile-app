import { Ionicons } from "@expo/vector-icons";
import React, { Dispatch, useCallback } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { COLORS } from "../constants/colors";
import { HomeStackNavigationProp } from "../navigation/Home";
import { deleteMessage, markAsResponded } from "../store/action";
import { useAppSelector } from "../store/store";
import { Message as MessageType } from "../types";
import { windowWidth } from "../utils/deviceInfo";
import { moderateScale } from "../utils/fontScaling";

interface IMessageProps {
  message: MessageType;
  navigation: HomeStackNavigationProp;
}

const Message: React.FC<IMessageProps> = ({ message, navigation }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const messageState = useAppSelector((state) => state.data.message);
  const { markAsRespondedLoading, deleteMessageLoading, dark } = useAppSelector(
    (state) => state.data
  );

  const truncateString = useCallback((string: string, length: number) => {
    if (string.length > length) return `${string.slice(0, length)}...`;
    else return string;
  }, []);

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: dark ? COLORS.black : "hsl(250, 92%, 85%)",
        marginBottom: moderateScale(20, 0.5),
        shadowColor: dark ? "white" : "black",
      }}
      key={message.id}
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate("MessageDetails", { message: message });
      }}
    >
      <View>
        <View style={styles.nameContainer}>
          <Text
            style={{
              ...styles.headingText,
              color: dark ? "hsl(280, 8%, 85%)" : COLORS.black,
            }}
          >
            Name - {truncateString(message.name, 20)}
          </Text>
          {message.responded && (
            <Ionicons
              name="checkmark-circle"
              color={dark ? "hsl(280, 8%, 85%)" : COLORS.primaryColor}
              size={23}
            />
          )}
        </View>
        <Text
          style={{
            ...styles.headingText,
            color: dark ? "hsl(280, 8%, 85%)" : COLORS.black,
          }}
        >
          Email - {truncateString(message.email, 40)}
        </Text>
        <Text
          style={{
            ...styles.headingText,
            color: dark ? "hsl(280, 8%, 85%)" : COLORS.black,
          }}
        >
          Message -{" "}
          <Text style={styles.messageText}>
            {" "}
            {truncateString(message.message, 70)}
          </Text>
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        {!message.responded ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              dispatch(markAsResponded({ ...message, responded: true }))
            }
          >
            <View style={styles.markAsRespondedContainer}>
              {messageState &&
              markAsRespondedLoading &&
              messageState.id === message.id ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={{ fontFamily: "Regular", color: "white" }}>
                  Mark as responded
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => dispatch(deleteMessage(message))}
        >
          <View style={styles.deleteButtonContainer}>
            {messageState &&
            deleteMessageLoading &&
            messageState.id === message.id ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={{ fontFamily: "Regular", color: "white" }}>
                Delete
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "hsl(280, 70%, 96%)",
    padding: moderateScale(15, 0.5),
    marginBottom: moderateScale(15, 0.5),
    marginHorizontal: moderateScale(15, 0.5),
    borderRadius: moderateScale(5, 0.5),
    minHeight: moderateScale(windowWidth / 2.3, 0.5),
    justifyContent: "space-between",
    elevation: 8,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingText: {
    fontFamily: "Medium",
    fontSize: moderateScale(15, 0.5),
    color: COLORS.white,
  },
  markAsRespondedContainer: {
    backgroundColor: COLORS.primaryColor,
    padding: moderateScale(5, 0.5),
    paddingHorizontal: moderateScale(10, 0.5),
    borderRadius: moderateScale(5, 0.5),
    minWidth: moderateScale(150, 0.5),
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateScale(25, 0.5),
  },
  deleteButtonContainer: {
    backgroundColor: COLORS.red,
    padding: moderateScale(5, 0.5),
    borderRadius: moderateScale(3, 0.5),
    paddingHorizontal: moderateScale(10, 0.5),
  },
  messageText: {
    fontFamily: "Regular",
    fontSize: moderateScale(15, 0.5),
  },
});

export default Message;
