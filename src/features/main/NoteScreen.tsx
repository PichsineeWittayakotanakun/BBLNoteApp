import React, {useCallback, useEffect, useState} from 'react';
import components from '@/components';
import LayoutNoteContents from './components/LayoutNoteContents';
import {DefaultNavigationProps} from '@/route/RootStackParamList';
import LayoutCommentList from './components/LayoutCommentList';
import {useAtomValue, useSetAtom} from 'jotai';
import headerAtomService from '@/atoms/headerAtomService';
import getAllCommentsAtomService from '@/atoms/comments/getAllCommentsAtomService';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {CommentItem} from '@/model/response_body/comments/getAllCommentsResponseBody';
import {View, StyleSheet, Alert} from 'react-native';
import {Size} from '@/shared/style/size';
import createNewCommentAtomService from '@/atoms/comments/createNewCommentAtomService';
import {CreateNewCommentRequest} from '@/model/request_body/comments/createNewCommentRequestBody';
import ModalNewComment from './components/ModalNewComment';

const {LayoutMain, HeaderMain, TextMain, TextInputMultiline} = components;
type MainProps = DefaultNavigationProps<'Note'>;

const style = StyleSheet.create({
  CommentContainer: {
    rowGap: Size.size8,
  },
});
export default function NoteScreen({route}: MainProps) {
  const {noteItem} = route.params;
  const isFocused = useIsFocused();
  const navigation = useNavigation<MainProps['navigation']>();
  const header = useAtomValue(headerAtomService.header);
  const fetchAllComment = useSetAtom(getAllCommentsAtomService.fetchData);
  const fetchCreateComment = useSetAtom(createNewCommentAtomService.fetchData);
  const isCreateCommentError = useAtomValue(
    createNewCommentAtomService.isError,
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onGetComments = useCallback(() => {
    const controller = new AbortController();
    fetchAllComment(controller.signal, header, noteItem.id, false).catch(
      error => {
        console.error('Error onGetComments LayoutNoteContents', error);
      },
    );
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (isFocused) {
      onGetComments();
    }
  }, [isFocused]);

  const onPressComment = (commentItem: CommentItem) => {
    navigation.navigate('Comment', {commentItem});
  };

  const alertError = () =>
    Alert.alert(`Can not add new comment\nPlease try again`);

  const onHandleCreateNewComment = ({body}) => {
    const bodyCreate: CreateNewCommentRequest = {
      noteId: noteItem.id,
      body,
    };
    const controller = new AbortController();
    fetchCreateComment(controller.signal, header, bodyCreate, false)
      .catch(error => {
        console.error('Error onHandleCreateContent Note', error);
        alertError();
      })
      .finally(() => {
        if (isCreateCommentError) {
          alertError();
        } else {
          setIsVisible(false);
          onGetComments();
        }
      });

    return () => controller.abort();
  };

  return (
    <LayoutMain header={<HeaderMain />}>
      <LayoutNoteContents item={noteItem} />
      <View style={style.CommentContainer}>
        <LayoutCommentList onPressComment={onPressComment} />
        <TextMain
          title="+ add new comment"
          fontColor="grey_2"
          onPress={() => {
            setIsVisible(true);
          }}
        />
        <ModalNewComment
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          title="Create New Comment!"
          onHandleCreateContent={onHandleCreateNewComment}
        />
      </View>
    </LayoutMain>
  );
}
