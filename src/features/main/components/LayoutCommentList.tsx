import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import component from '@/components';
import {useAtomValue, useSetAtom} from 'jotai';
import getProfileAtomService from '@/atoms/profile/getProfileAtomService';
import {Size} from '@/shared/style/size';
import {Colors, ColorsArray} from '@/shared/style/colors';
import {NoteItem} from '@/model/response_body/notes/getAllNotesResponseBody';
import img from '@/assets';
import headerAtomService from '@/atoms/headerAtomService';
import getAllCommentsAtomService from '@/atoms/comments/getAllCommentsAtomService';
import {CommentItem} from '@/model/response_body/comments/getAllCommentsResponseBody';
const {bin} = img;
const {TextMain, LineBreak} = component;

type LayoutCommentListProps = {
  onPressComment: (commentItem: CommentItem) => void;
};
const style = StyleSheet.create({
  ContentBox: {
    rowGap: Size.size8,
  },
  ButtonBox: {
    flexDirection: 'row',
    columnGap: Size.size4,
  },
  Container: {
    flex: Size.size1,
  },
});

export default function LayoutCommentList({
  onPressComment,
}: LayoutCommentListProps) {
  const responseAllComment = useAtomValue(getAllCommentsAtomService.response);

  return (
    <View style={style.ContentBox}>
      <TextMain title="Comments..." fontWeight="bold" />
      {responseAllComment.map(item => (
        <TouchableOpacity
          key={item.id}
          onPress={() => onPressComment(item)}
          style={style.ButtonBox}>
          <TextMain title={`\u25C9`} numberOfLines={2} />
          <View style={style.Container}>
            <TextMain title={item.body} numberOfLines={2} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
