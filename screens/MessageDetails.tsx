import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch } from "react";
import {
  MessageDetailsNavigationProp,
  MessageDetailsRouteProp,
} from "../navigation/Home";
import { COLORS } from "../constants/colors";
import { useAppSelector } from "../store/store";
import { moderateScale } from "../utils/fontScaling";
import { useDispatch } from "react-redux";
import { deleteMessage, markAsResponded } from "../store/action";

interface IMessageDetailsProps {
  navigation: MessageDetailsNavigationProp;
  route: MessageDetailsRouteProp;
}

interface IDisplayComponentProps {
  heading: string;
  value: string;
}

const DisplayComponent: React.FC<IDisplayComponentProps> = ({
  heading,
  value,
}) => {
  const { dark } = useAppSelector((state) => state.data);

  return (
    <View style={{ marginBottom: moderateScale(18, 0.5) }}>
      <Text
        style={{
          fontFamily: "Medium",
          fontSize: moderateScale(20, 0.5),
          color: dark ? COLORS.white : COLORS.black,
        }}
      >
        {heading}
      </Text>

      <Text
        style={{
          fontFamily: "Regular",
          fontSize: moderateScale(15, 0.5),
          color: dark ? COLORS.white : COLORS.black,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

const MessageDetails: React.FC<IMessageDetailsProps> = ({
  navigation,
  route,
}) => {
  const { dark } = useAppSelector((state) => state.data);
  const { message } = route.params;
  const dispatch: Dispatch<any> = useDispatch();
  const messageState = useAppSelector((state) => state.data.message);
  const { markAsRespondedLoading, deleteMessageLoading } = useAppSelector(
    (state) => state.data
  );
  return (
    <ScrollView
      style={{
        ...styles.container,
        backgroundColor: dark ? "#000000" : COLORS.white,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 2 }}>
          <DisplayComponent heading="Name" value={message.name} />
          <DisplayComponent heading="Email" value={message.email} />
          <DisplayComponent heading="Message" value={message.message} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.buttonsContainer}>
            {!message.responded ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.goBack();
                  dispatch(markAsResponded({ ...message, responded: true }));
                }}
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
              <View>
                <Text style={{ fontFamily: "Medium", color: COLORS.darkGrey }}>
                  Already responded
                </Text>
              </View>
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.goBack();
                dispatch(deleteMessage(message));
              }}
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
        </View>
      </View>
    </ScrollView>
  );
};

export default MessageDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(15, 0.5),
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
});
