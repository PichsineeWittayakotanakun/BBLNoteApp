import {CommentItem} from '@/model/response_body/comments/getAllCommentsResponseBody';
import {NoteItem} from '@/model/response_body/notes/getAllNotesResponseBody';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type StackProps = {
  screen: string;
  params?: unknown;
};

export type RootStackParamList = {
  AuthStack: StackProps;
  Login: undefined;
  MainStack: StackProps;
  Home: undefined;
  Note: {noteItem: NoteItem};
  Comment: {commentItem: CommentItem};
};
export type DefaultNavigationProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
