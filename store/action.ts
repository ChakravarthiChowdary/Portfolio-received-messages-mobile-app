import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { Message } from "../types";
import { RootState } from "./store";

export const GET_MESSAGES_START = "GET_MESSAGES_START";
export const GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS";
export const GET_MESSAGES_FAIL = "GET_MESSAGES_FAIL";

export const MARK_AS_RESPONDED_START = "MARK_AS_RESPONDED_START";
export const MARK_AS_RESPONDED_SUCCESS = "MARK_AS_RESPONDED_SUCCESS";
export const MARK_AS_RESPONDED_FAIL = "MARK_AS_RESPONDED_FAIL";

export const DELETE_MESSAGE_START = "DELETE_MESSAGE_START";
export const DELETE_MESSAGE_SUCCESS = "DELETE_MESSAGE_SUCCESS";
export const DELETE_MESSAGE_FAIL = "DELETE_MESSAGE_FAIL";

export const CHANGE_DARK_MODE = "CHANGE_DARK_MODE";

export const getMessages = (
  refreshing?: boolean,
  markAsResponded?: boolean,
  deleteMessage?: boolean
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_MESSAGES_START,
        payload: refreshing ? refreshing : false,
      });

      const response = await fetch(
        "https://myportfolio-af284-default-rtdb.firebaseio.com/messages.json"
      );
      const result = await response.json();

      const messages: Message[] = [];

      for (let key in result) {
        const { name, message, receivedDate, email, responded } = result[key];
        messages.push({
          name,
          message,
          id: key,
          receivedDate: new Date(receivedDate),
          responded,
          email,
        });
      }

      messages.sort(
        (a, b) => b.receivedDate.valueOf() - a.receivedDate.valueOf()
      );

      dispatch({ type: GET_MESSAGES_SUCCESS, payload: messages });

      if (markAsResponded) {
        dispatch({ type: MARK_AS_RESPONDED_SUCCESS });
      }

      if (deleteMessage) {
        dispatch({ type: DELETE_MESSAGE_SUCCESS });
      }
    } catch (error) {
      dispatch({ type: GET_MESSAGES_FAIL, payload: error });
    }
  };
};

export const markAsResponded = (
  message: Message
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: MARK_AS_RESPONDED_START,
        payload: message,
      });

      await fetch(
        `https://myportfolio-af284-default-rtdb.firebaseio.com/messages/${message.id}.json`,
        { method: "PATCH", body: JSON.stringify(message) }
      );

      dispatch(getMessages(false, true));
    } catch (error) {
      dispatch({ type: MARK_AS_RESPONDED_FAIL, payload: error });
    }
  };
};

export const deleteMessage = (
  message: Message
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_MESSAGE_START,
        payload: message,
      });

      await fetch(
        `https://myportfolio-af284-default-rtdb.firebaseio.com/messages/${message.id}.json`,
        { method: "DELETE" }
      );

      dispatch(getMessages(false, false, true));
    } catch (error) {
      console.log(error);
      dispatch({ type: DELETE_MESSAGE_FAIL, payload: error });
    }
  };
};
