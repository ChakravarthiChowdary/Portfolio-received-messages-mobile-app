export interface Message {
  name: string;
  message: string;
  email: string;
  receivedDate: Date;
  id: string;
  responded: boolean;
}

export interface Data {
  dark: boolean;
  messages: Message[];
  loading: boolean;
  error: null | { message: string };
  refreshing: boolean;
  markAsRespondedLoading: boolean;
  message: Message | null;
  markAsRespondedError: null | { message: boolean };
  deleteMessageLoading: boolean;
  deleteMessageError: null | { message: boolean };
}
