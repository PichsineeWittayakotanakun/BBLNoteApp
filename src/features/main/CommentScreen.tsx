import React from 'react';
import {StyleSheet} from 'react-native';
import components from '@/components';
import {DefaultNavigationProps} from '@/route/RootStackParamList';
import {useAtomValue, useSetAtom} from 'jotai';
import headerAtomService from '@/atoms/headerAtomService';
import deleteCommentByIdAtomService from '@/atoms/comments/deleteCommentByIdAtomService';

const {LayoutMain, HeaderMain, TextMain, ButtonDelete} = components;
type MainProps = DefaultNavigationProps<'Comment'>;
const style = StyleSheet.create({
  Container: {
    flex: 1,
  },
});

export default function CommentScreen({route}: MainProps) {
  const {commentItem} = route.params;
  const {body, id} = commentItem;

  const header = useAtomValue(headerAtomService.header);
  const fetchDeleteComment = useSetAtom(deleteCommentByIdAtomService.fetchData);
  const isLoadDeleteComment = useAtomValue(
    deleteCommentByIdAtomService.isLoading,
  );
  const isErrorDeleteComment = useAtomValue(
    deleteCommentByIdAtomService.isError,
  );

  const onConfirmDelete = () => {
    const controller = new AbortController();
    fetchDeleteComment(controller.signal, header, id, false).catch(error => {
      console.error('Error onConfirmDelete CommentScreen', error);
    });

    return () => controller.abort();
  };

  return (
    <LayoutMain
      header={
        <HeaderMain
          title="Comment"
          icon={
            <ButtonDelete
              onConfirmDelete={onConfirmDelete}
              isLoadDelete={isLoadDeleteComment}
              isDeleteError={isErrorDeleteComment}
            />
          }
        />
      }>
      <TextMain title={body} />
    </LayoutMain>
  );
}
