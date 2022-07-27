import { AnyAction } from "redux";
import { Data } from "../types";
import {
  CHANGE_DARK_MODE,
  DELETE_MESSAGE_FAIL,
  DELETE_MESSAGE_START,
  DELETE_MESSAGE_SUCCESS,
  GET_MESSAGES_FAIL,
  GET_MESSAGES_START,
  GET_MESSAGES_SUCCESS,
  MARK_AS_RESPONDED_FAIL,
  MARK_AS_RESPONDED_START,
  MARK_AS_RESPONDED_SUCCESS,
} from "./action";

const initialState: Data = {
  loading: false,
  error: null,
  messages: [],
  dark: false,
  refreshing: false,
  markAsRespondedError: null,
  markAsRespondedLoading: false,
  message: null,
  deleteMessageLoading: false,
  deleteMessageError: null,
};

export const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_MESSAGES_START:
      return {
        ...state,
        loading: !action.payload,
        refreshing: action.payload,
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        messages: action.payload,
        refreshing: false,
      };
    case GET_MESSAGES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        refreshing: false,
      };
    case MARK_AS_RESPONDED_START:
      return {
        ...state,
        markAsRespondedLoading: true,
        message: action.payload,
        markAsRespondedError: null,
      };
    case MARK_AS_RESPONDED_SUCCESS:
      return {
        ...state,
        markAsRespondedLoading: true,
        message: null,
        markAsRespondedError: null,
      };
    case MARK_AS_RESPONDED_FAIL:
      return {
        ...state,
        markAsRespondedLoading: false,
        message: null,
        markAsRespondedError: action.payload,
      };
    case DELETE_MESSAGE_START:
      return {
        ...state,
        deleteMessageLoading: true,
        message: action.payload,
        deleteMessageError: null,
      };
    case DELETE_MESSAGE_SUCCESS:
      return {
        ...state,
        deleteMessageLoading: true,
        message: null,
        deleteMessageError: null,
      };
    case DELETE_MESSAGE_FAIL:
      return {
        ...state,
        deleteMessageLoading: false,
        message: null,
        deleteMessageError: action.payload,
      };
    case CHANGE_DARK_MODE:
      return {
        ...state,
        dark: !state.dark,
      };
    default:
      return state;
  }
};
