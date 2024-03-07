import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import component from '@/components';
import {Size} from '@/shared/style/size';
import {Colors} from '@/shared/style/colors';
import {NoteItem} from '@/model/response_body/notes/getAllNotesResponseBody';

const {TextMain, LineBreak} = component;

type LayoutNoteDetailsProps = {
  item: NoteItem;
  index: number;
  onPressItem: (value: NoteItem) => void;
};
const style = StyleSheet.create({
  ContentBox: {
    padding: Size.size16,
    borderRadius: Size.size8,
    rowGap: Size.size4,
    shadowColor: '#000',
    shadowOffset: {
      width: Size.size0,
      height: Size.size2,
    },
    shadowOpacity: Size.sizeShadowOpacity,
    shadowRadius: Size.sizeShadowRadius,
    marginHorizontal: Size.size24,
  },
});

export default function LayoutNoteDetails({
  item,
  onPressItem,
}: Readonly<LayoutNoteDetailsProps>) {
  const {body, title} = item;

  return (
    <TouchableOpacity
      style={[style.ContentBox, {backgroundColor: Colors.white}]}
      // style={[style.ContentBox, {backgroundColor: color[index % color.length]}]}
      onPress={() => onPressItem(item)}>
      <TextMain title={title} fontSize="font18" fontWeight="bold" />
      <LineBreak color="primary" />
      <TextMain title={body} numberOfLines={2} fontColor="grey_2" />
    </TouchableOpacity>
  );
}
